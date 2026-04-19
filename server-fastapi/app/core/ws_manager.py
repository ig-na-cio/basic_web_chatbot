from typing import Dict, List
from fastapi import WebSocket

# Redefine

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, List[WebSocket]] = {}

    async def connect(self, game_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.setdefault(game_id, []).append(websocket)

    def disconnect(self, game_id: int, websocket: WebSocket):
        self.active_connections[game_id].remove(websocket)

    async def broadcast(self, game_id: int, message: dict):
        for ws in self.active_connections.get(game_id, []):
            await ws.send_json(message)