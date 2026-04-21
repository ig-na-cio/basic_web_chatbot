from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.core.database import SessionLocal

router = APIRouter(prefix="/users", tags=["users"])

# Redefine

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# CREATE USER
@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.nombre == user.nombre).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = User(nombre=user.nombre)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# READ ALL USERS
@router.get("/", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


# READ ONE USER
@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# DELETE USER
@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.nombre == "admin":
        raise HTTPException(status_code=400, detail="Cannot delete the admin user")

    db.delete(user)
    db.commit()
    return {"message": "User deleted"}