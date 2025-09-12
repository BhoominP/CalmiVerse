from fastapi import APIRouter
from pydantic import BaseModel
from app.chatbot_models import (
    AiGuidedFirstAidInput,
    AiGuidedFirstAidOutput,
    ai_guided_first_aid,
)

chatbot_bp = APIRouter(   # 👈 this must match main.py include
    prefix="/api/chatbot",
    tags=["Chatbot"]
)

class ChatRequest(BaseModel):
    message: str

@chatbot_bp.post("/firstaid", response_model=AiGuidedFirstAidOutput)
async def firstaid_endpoint(request: ChatRequest):
    try:
        input_data = AiGuidedFirstAidInput(message=request.message)
        result = await ai_guided_first_aid(input_data)
        return result
    except Exception as e:
        return AiGuidedFirstAidOutput(
            response=f"⚠️ Sorry, I couldn’t process your request. ({str(e)})",
            suggestedTasks=[]
        )
