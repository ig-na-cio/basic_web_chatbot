from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.core.ws_manager import ConnectionManager

router = APIRouter()
manager = ConnectionManager()

# Redefine

@router.websocket("/ws/games/{game_id}")
async def game_ws(websocket: WebSocket, game_id: int):
    await manager.connect(game_id, websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(game_id, websocket)