from fastapi import APIRouter
from pydantic import BaseModel
from app.services.chatbot_service import chat_with_ai

router = APIRouter(prefix="/api/chatbot", tags=["Chatbot"])

class ChatRequest(BaseModel):
    message: str

@router.post("/ask")
async def ask_chatbot(request: ChatRequest):
    return {"reply": chat_with_ai(request.message)}
