from pydantic import BaseModel, Field
from typing import List
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables (API key)
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


# -------------------------------
# Input Schema
# -------------------------------
class AiGuidedFirstAidInput(BaseModel):
    message: str = Field(..., description="The message from the student expressing their feelings of stress or anxiety.")


# -------------------------------
# Task Schema
# -------------------------------
class Task(BaseModel):
    title: str = Field(..., description="A short, actionable title for the task.")
    description: str = Field(..., description="A brief description of how to perform the task.")
    points: int = Field(..., description="The number of points awarded for completing the task.")


# -------------------------------
# Output Schema
# -------------------------------
class AiGuidedFirstAidOutput(BaseModel):
    response: str = Field(..., description="The AI-generated response providing coping strategies and guidance.")
    suggestedTasks: List[Task] = Field(..., description="A list of 5 suggested tasks for the user to complete.")


# -------------------------------
# Core AI Function
# -------------------------------
async def ai_guided_first_aid(input_data: AiGuidedFirstAidInput) -> AiGuidedFirstAidOutput:
    """
    Uses Google Generative AI (Gemini) to provide coping strategies + suggested tasks.
    Ensures output is parsed safely from JSON.
    """
    prompt = f"""
    You are an AI-powered chatbot designed to provide immediate support to college students experiencing stress or anxiety.

    A student has sent the following message:
    \"\"\"{input_data.message}\"\"\"

    Your goal is to offer coping strategies and guidance in a supportive and empathetic manner. 

    Please return ONLY valid JSON with the following schema:
    {{
      "response": "string",
      "suggestedTasks": [
        {{
          "title": "string",
          "description": "string",
          "points": 50
        }},
        {{
          "title": "string",
          "description": "string",
          "points": 100
        }},
        {{
          "title": "string",
          "description": "string",
          "points": 100
        }},
        {{
          "title": "string",
          "description": "string",
          "points": 150
        }},
        {{
          "title": "string",
          "description": "string",
          "points": 150
        }}
      ]
    }}
    """

    # Call Gemini Pro
    model = genai.GenerativeModel("gemini-1.5-flash")
    result = model.generate_content(prompt)

    import re, json
    text_output = result.text.strip() if result and hasattr(result, "text") else ""

    # Try to extract JSON with regex
    match = re.search(r"\{.*\}", text_output, re.DOTALL)
    if not match:
        # fallback safe default
        return AiGuidedFirstAidOutput(
            response="Take a deep breath. You're safe. Try a grounding exercise.",
            suggestedTasks=[
                Task(title="Mindful Breathing", description="Sit comfortably, close your eyes, and take deep breaths for 5 minutes.", points=50),
                Task(title="Journaling", description="Write down your thoughts for 10 minutes without judgment.", points=100),
                Task(title="Quick Stretch", description="Do a 5-minute stretch to release tension.", points=100),
                Task(title="Go for a Walk", description="Take a brisk 15-minute walk outdoors.", points=150),
                Task(title="Gratitude List", description="List 3 things you are grateful for.", points=150),
            ]
        )

    try:
        data = json.loads(match.group())
        return AiGuidedFirstAidOutput(**data)
    except Exception as e:
        # Final fallback in case JSON parsing fails
        return AiGuidedFirstAidOutput(
            response="I hear you. Let's try a calming activity together.",
            suggestedTasks=[
                Task(title="Breathing Exercise", description="Inhale for 4 seconds, hold for 4, exhale for 6. Repeat 5 times.", points=50),
                Task(title="Grounding Exercise", description="Notice 5 things you see, 4 touch, 3 hear, 2 smell, 1 taste.", points=100),
                Task(title="Write It Out", description="Jot down your thoughts in a journal for 10 minutes.", points=100),
                Task(title="Go for a Walk", description="Step outside for a 15-minute walk to reset your mind.", points=150),
                Task(title="Connect with a Friend", description="Send a supportive message to someone you trust.", points=150),
            ]
        )
