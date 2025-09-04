import os
import json
import re
from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import google.generativeai as genai

# Load env
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

router = APIRouter()

def clean_json(text: str):
    """Force Gemini output into valid JSON by stripping markdown & text."""
    # Remove code fences
    text = text.strip()
    text = re.sub(r"^```json", "", text)
    text = re.sub(r"```$", "", text)
    text = text.strip()

    try:
        return json.loads(text)
    except:
        # fallback if not JSON
        return {
            "mood": "Unknown 🤔",
            "activities": ["Try again later."]
        }

@router.post("/analyze")
async def analyze_mood(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        model = genai.GenerativeModel("gemini-1.5-flash")

        # ✅ Force JSON response
        prompt = """
        You are an AI Mood Mirror. 
        Analyze the face in this image and return strictly valid JSON, no markdown, no extra text. 
        Format must be:

        {
          "mood": "OneWord",
          "activities": ["Activity 1", "Activity 2", "Activity 3"]
        }
        """

        response = model.generate_content(
            [prompt, {"mime_type": file.content_type, "data": contents}]
        )

        cleaned = clean_json(response.text)

        return JSONResponse(content={"result": cleaned})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
