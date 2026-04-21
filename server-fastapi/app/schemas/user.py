from pydantic import BaseModel

# These are the classes defining the structure of requests
# and reponses content

class UserCreate(BaseModel):
    nombre: str

class UserResponse(BaseModel):
    id: int
    nombre: str

    class Config:
        from_attributes = True

class UsersChatsResponse(BaseModel):
    chat_ids: list[int]