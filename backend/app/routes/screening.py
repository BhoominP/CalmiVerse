import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import Session
from app import models, schemas
from app.db import Base, get_db

router = APIRouter(
    prefix="/api/screening",
    tags=["screening"]
)

# -------------------------------
# Save screening result
# -------------------------------
@router.post("/save", response_model=schemas.ScreeningSnapshot)
def save_screening(result: schemas.ScreeningResultCreate, db: Session = Depends(get_db)):
    # 1. Find user by firebase_uid (preferred) or email
    user = None
    if hasattr(result, "firebase_uid") and result.firebase_uid:
        user = db.query(models.User).filter(models.User.firebase_uid == result.firebase_uid).first()

    if not user:
        user = db.query(models.User).filter(models.User.email == result.email).first()

    # 2. If no user → create one
    if not user:
        user = models.User(
            firebase_uid=getattr(result, "firebase_uid", None),
            email=result.email,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # 3. Update firebase_uid if missing
    if not user.firebase_uid and hasattr(result, "firebase_uid"):
        user.firebase_uid = result.firebase_uid
        db.commit()

    # 4. Save screening result
    new_entry = models.ScreeningResult(
    user_id=user.id,
    mood=result.mood,
    score=result.score,
    overall=result.overall,
    challenges=",".join(result.challenges) if result.challenges else None,
    sleep_hours=result.sleepHours,
    support_style=result.supportStyle,
    name=result.name,
    year=result.year,
    course=result.course,
    hobbies=json.dumps(result.hobbies) if result.hobbies else None,
    sos_contacts=json.dumps(result.sosContacts) if result.sosContacts else None
    # ❌ remove firebase_uid=result.firebase_uid
)

    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)

    return _to_schema(new_entry)


# -------------------------------
# Get latest screening result by firebase_uid
# -------------------------------

@router.get("/latest/{firebase_uid}", response_model=schemas.ScreeningSnapshot)
def get_latest_screening(firebase_uid: str, db: Session = Depends(get_db)):
    # 1. Find the user with this firebase_uid
    user = db.query(models.User).filter(models.User.firebase_uid == firebase_uid).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 2. Get their most recent screening result
    result = (
        db.query(models.ScreeningResult)
        .filter(models.ScreeningResult.user_id == user.id)
        .order_by(models.ScreeningResult.created_at.desc())
        .first()
    )

    if not result:
        raise HTTPException(status_code=404, detail="No screening results found")
    # 3. Convert DB → schema
    return _to_schema(result)




# -------------------------------
# Get snapshot for dashboard by user_id
# -------------------------------
@router.get("/snapshot/{user_id}", response_model=schemas.ScreeningSnapshot)
def get_snapshot(user_id: int, db: Session = Depends(get_db)):
    snapshot = (
        db.query(models.ScreeningResult)
        .filter(models.ScreeningResult.user_id == user_id)
        .order_by(models.ScreeningResult.created_at.desc())
        .first()
    )

    if not snapshot:
        raise HTTPException(status_code=404, detail="No snapshot found")

    return _to_schema(snapshot)


# -------------------------------
# Utility: convert DB → Schema
# -------------------------------
def _to_schema(entry: models.ScreeningResult):
    return schemas.ScreeningSnapshot(
        id=entry.id,
        mood=entry.mood,
        score=entry.score,
        overall=entry.overall,
        challenges=entry.challenges.split(",") if entry.challenges else [],
        sleepHours=entry.sleep_hours,
        supportStyle=entry.support_style,
        created_at=entry.created_at,
        name=entry.name,
        year=entry.year,
        course=entry.course,
        hobbies=json.loads(entry.hobbies) if entry.hobbies else [],
        sosContacts=json.loads(entry.sos_contacts) if entry.sos_contacts else [],
    )

