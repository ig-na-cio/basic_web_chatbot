from fastapi import APIRouter
from app.api.users import router as users_router
from app.api.chat import router as chat_router

router = APIRouter()
router.include_router(users_router)
router.include_router(chat_router)