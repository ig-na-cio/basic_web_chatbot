from fastapi import APIRouter
from app.api.users import router as users_router


router = APIRouter()
router.include_router(users_router)
