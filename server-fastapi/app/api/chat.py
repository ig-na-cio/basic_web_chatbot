from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ai_agent.weather_api_connect import WeatherData
from app.models.chat import Chat
from app.models.chatMessage import ChatMessage
from app.models.user import User
from app.schemas.chat import ChatRequest, ChatResponse, ChatHistoryResponse, CreateChatResponse, MessageSchema
from app.core.database import SessionLocal
from ai_agent.weather_agent import weather_agent, AgentState
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage


router = APIRouter(prefix="/chat", tags=["chat"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create", response_model=CreateChatResponse)
def create_chat(user_id: int, db: Session = Depends(get_db)):

    if user_id is None:
        raise HTTPException(status_code=400, detail="user_id is required")
    if not db.query(User).filter_by(id=user_id).first():
        raise HTTPException(status_code=404, detail="User not found")

    chat = Chat(user_id=user_id)
    db.add(chat)
    db.commit()
    db.refresh(chat)

    response = CreateChatResponse(chat_id=chat.id)

    return response

@router.post("/", response_model=ChatResponse)
def chat(req: ChatRequest, db: Session = Depends(get_db)):

    # IN ChatRequest: {user_id: int, chat_id: int, message: str}
    # OUT ChatResponse: {response: str}
    
    if req.user_id is None:
        raise HTTPException(status_code=400, detail="user_id is required")
    if req.chat_id is None:
        raise HTTPException(status_code=400, detail="chat_id is required")
    if req.message is None:
        raise HTTPException(status_code=400, detail="message is required")
    if not db.query(User).filter_by(id=req.user_id).first():
        raise HTTPException(status_code=404, detail="User not found")
    if not db.query(Chat).filter_by(id=req.chat_id).first():
        raise HTTPException(status_code=404, detail="Chat not found")
    if db.query(Chat).filter_by(id=req.chat_id).first().user_id != req.user_id:
        raise HTTPException(status_code=403, detail="Chat does not belong to the user")
    if req.message.strip() == "":
        raise HTTPException(status_code=400, detail="message cannot be empty")

    # First chat matching the chat_id
    chat = db.query(Chat).filter_by(id=req.chat_id).first()
    # chat : {id, user_id, topic, weather_data, user, messages}
    history = chat.messages

    # We create the state for the agent
    # From the chat messages in the db,
    # We create a list of messages in the
    # format expected by the agent
    # AgentState: { "messages", "topic", "weather_data" }
    messages = []
    for msg in history:
        if msg.role == "user":
            messages.append(HumanMessage(content=msg.content))
        elif msg.role == "ai":
            messages.append(AIMessage(content=msg.content))
        elif msg.role == "system":
            messages.append(SystemMessage(content=msg.content))

    messages.append(HumanMessage(content=req.message))

    topic = chat.topic

    weather_data = None
    # With **wd, we match the keys of the dict
    # to the fields of the WeatherData model
    if chat.weather_data:
        weather_data = [WeatherData(**wd) for wd in chat.weather_data]

    # We create the state object
    state = AgentState(
        messages=messages,
        topic=topic,
        weather_data=weather_data
    )

    # We run the agent with the current state,
    # and we get the new state
    new_state = weather_agent().invoke(state)
    
    # We update the chat in the db with the new state
    chat.topic = new_state.get("topic")
    chat.weather_data = [
        wd.model_dump() for wd in (new_state.get("weather_data") or [])
    ]

    # Last AI message for the response
    last_ai = next(
        msg.content for msg in reversed(new_state["messages"]) if msg.type == "ai"
    )
    
    # We add the new messages to the db
    # (those that were after new_msgs was set)
    new_msgs = new_state["messages"][len(messages) - 1:]

    # For each new message, we add it to the db
    for msg in new_msgs:
        db.add(ChatMessage(
            chat_id=req.chat_id,
            role=msg.type,
            content=msg.content
        ))
    db.commit()

    return {"response": last_ai}


@router.delete("/")
def delete_chat(user_id: int, chat_id: int, db: Session = Depends(get_db)):
    if user_id is None:
        raise HTTPException(status_code=400, detail="user_id is required")
    if not db.query(User).filter_by(id=user_id).first():
        raise HTTPException(status_code=404, detail="User not found")
    if chat_id is None:
        raise HTTPException(status_code=400, detail="chat_id is required")
    chat = db.query(Chat).filter_by(id=chat_id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    if chat.user_id != user_id:
        raise HTTPException(status_code=403, detail="Chat does not belong to the user")

    db.delete(chat)
    db.commit()
    return {"message": "Chat deleted"}


# GET CHAT BY ID
@router.get("/{chat_id}", response_model=ChatHistoryResponse)
def get_chat_history(chat_id: int, user_id: int, db: Session = Depends(get_db)):
    chat = db.query(Chat).filter_by(id=chat_id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    if chat.user_id != user_id:
        raise HTTPException(status_code=403, detail="Chat does not belong to the user")


    messages = [MessageSchema(role=msg.role, content=msg.content) for msg in chat.messages]

    # But we have to erase the messages containing timestamps
    # Those are of content: "[something]"
    for msg in messages:
        if msg.content.startswith("[") and msg.content.endswith("]"):
            messages.remove(msg)

    response = ChatHistoryResponse(messages=messages)

    return response