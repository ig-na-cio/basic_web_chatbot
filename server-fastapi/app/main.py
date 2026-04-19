from fastapi import FastAPI
from app.api.router import router
from app.core.database import engine
from app.db.base import Base
from fastapi.middleware.cors import CORSMiddleware
from app.api import ws
from dotenv import load_dotenv
import os

# We define a local database

load_dotenv()
FRONTEND_URL = os.getenv("FRONTEND_URL")

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ws.router)