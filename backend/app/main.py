import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from app.routes import mood  # your mood router
from app.routes import screening  # import your file

# FastAPI app
app = FastAPI(title="AI Backend with FastAPI")

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))  # ✅ correct env usage

# Enable CORS for frontend
origins = [
    "http://localhost:5173",  # React dev server
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include mood router
app.include_router(mood.router, prefix="/mood", tags=["Mood"])
app.include_router(screening.router, prefix="/api", tags=["Screening"])


# Schema for prompt requests
class PromptRequest(BaseModel):
    prompt: str

# Root endpoint
@app.get("/")
def root():
    return {"message": "AI Backend is running 🚀"}

# AI text analysis endpoint
@app.post("/api/ai/analyze")
async def analyze(request: PromptRequest):
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(request.prompt)
        return {"result": response.text}
    except Exception as e:
        return {"error": str(e)}
