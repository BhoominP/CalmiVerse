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
        prompt = """
        You are an AI Mood Mirror. Analyze the face in this selfie and return JSON only.
        JSON format:
        {
          "mood": "one-word mood (e.g., Happy, Sad, Neutral, Excited, Stressed)",
          "suggestions": ["Activity 1", "Activity 2", "Activity 3"]
        }
        Do not add any explanation, only valid JSON.
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
