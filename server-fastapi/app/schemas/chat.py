from pydantic import BaseModel

class ChatRequest(BaseModel):
    user_id: int
    chat_id: int
    message: str

class ChatResponse(BaseModel):
    response: str

class MessageSchema(BaseModel):
    role: str
    content: str

class ChatHistoryResponse(BaseModel):
    messages: list[MessageSchema]

class CreateChatResponse(BaseModel):
    chat_id: int