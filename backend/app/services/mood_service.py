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
        prompt = prompt = """
You are an AI Mood Mirror. 
Analyze the face in this image and return strictly valid JSON, no markdown, no extra text. 
Format must be:

{
  "mood": "A short descriptive phrase (1–3 words, e.g. 'Calm', 'Stressed', 'Excited but tired')",
  "confidence": "High / Medium / Low",
  "activities": [
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3",
    "Suggestion 4",
    "Suggestion 5"
  ]
}

Rules for activities:
- Always give exactly 5.
- Make each suggestion unique and creative (avoid repeating generic advice).
- Tailor suggestions to the detected mood.
- Use a friendly, motivational coaching style.
- Keep each activity one full sentence, clear and supportive.
- Activities should vary across categories: (1) physical, (2) social, (3) creative, (4) relaxing, (5) self-reflective.
- Do not include quotation marks inside the text.
"""


        response = model.generate_content(
            [prompt, {"mime_type": file.content_type, "data": contents}]
        )

        cleaned = clean_json(response.text)

        return JSONResponse(content={"result": cleaned})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
