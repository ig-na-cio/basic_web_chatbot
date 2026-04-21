from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.base import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, JSON


class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    topic = Column(String, nullable=True)
    weather_data = Column(JSON, nullable=True)
    
    user = relationship("User", back_populates="chats")
    messages = relationship("ChatMessage", back_populates="chat")