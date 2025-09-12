from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import google.generativeai as genai
import json

router = APIRouter()

@router.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    try:
        # Read uploaded image
        contents = await file.read()
        image_data = {
            "mime_type": file.content_type,
            "data": contents
        }

        # Load Gemini Vision model
        model = genai.GenerativeModel("gemini-1.5-flash")

        # Prompt Gemini for STRICT JSON output
        # Prompt Gemini for STRICT JSON output
        prompt = """
You are an AI Mood Mirror. Analyze the face in this selfie and return ONLY valid JSON.

JSON format (no text outside this object):
{
  "mood": "one-word mood (Happy, Sad, Stressed, Angry, Tired, Excited, Relaxed, Confused, Neutral, Lonely, Hopeful, Unknown)",
  "suggestions": ["short activity 1", "short activity 2", "short activity 3"]
}

Rules:
- Always output exactly one JSON object.
- Do not include any explanations, markdown, or text outside the JSON.
- If no face is detected, return mood: "Unknown" with 3 safe retry suggestions (e.g. "Retake in better lighting", "Adjust camera angle", "Try again").
"""


        response = model.generate_content([prompt, image_data])
        text = response.text.strip()

        # Clean JSON if wrapped in code fences
        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        # Parse JSON safely
        try:
            result = json.loads(text)
        except json.JSONDecodeError:
            # fallback in case Gemini adds extra words
            result = {
                "mood": "Unknown",
                "suggestions": ["Try again later"]
            }

        return JSONResponse(content=result)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
