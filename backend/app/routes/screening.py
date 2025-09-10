import json
import os
from fastapi import APIRouter, HTTPException

router = APIRouter()

# Absolute path (ensures it works no matter where uvicorn is started)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RESULTS_FILE = os.path.join(BASE_DIR, "..", "data", "snapshots", "screening_results.json")


@router.post("/screening/save")
def save_screening_result(result: dict):
    try:
        os.makedirs(os.path.dirname(RESULTS_FILE), exist_ok=True)
        with open(RESULTS_FILE, "w") as f:
            json.dump(result, f, indent=4)
        return {"message": f"Result saved at {RESULTS_FILE}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/screening/result")
def get_screening_result():
    try:
        if not os.path.exists(RESULTS_FILE):
            raise HTTPException(status_code=404, detail="No screening results found")
        with open(RESULTS_FILE, "r") as f:
            result = json.load(f)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
