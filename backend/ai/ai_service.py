import os
import re
import google.generativeai as genai
from dotenv import load_dotenv
from flask import Flask, request, jsonify

# Load environment variables
load_dotenv()

# Configure API key (⚠️ don't hardcode the key, use .env instead)
genai.configure(api_key=os.getenv("AIzaSyCBcsdGz9GCaMnFjs7U-iuQ-fpINXMvZHY"))

# Initialize Flask
app = Flask(__name__)

# Helper: clean Gemini markdown

def parse_mood_response(text: str):
    """Extract mood and activities cleanly from Gemini response"""
    mood = "Unknown"
    activities = []

    # Find Mood (removes ** too)
    mood_match = re.search(r"(?i)Mood[:\s]*([^\n]*)", text)
    if mood_match:
        mood = mood_match.group(1).strip().replace("**", "")

    # Find Suggested Activities block
    activities_block = re.split(r"(?i)Suggested Activities[:\s]*", text)
    if len(activities_block) > 1:
        raw_activities = activities_block[1]
        # Split lines, remove markdown, numbers, and trim
        for line in raw_activities.splitlines():
            line = re.sub(r"\*\*(.*?)\*\*", r"\1", line)   # remove bold
            line = re.sub(r"^\d+\.\s*", "", line)          # remove numbered list
            line = re.sub(r"^[\*\-\+]\s*", "", line)       # remove bullet
            line = line.strip()
            if line:
                activities.append(line)

    return {"mood": mood, "activities": activities}


@app.route("/api/ai/analyze", methods=["POST"])
def analyze():
    try:
        data = request.json
        prompt = data.get("prompt", "")

        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)

        parsed = parse_mood_response(response.text)

        return jsonify(parsed)
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
