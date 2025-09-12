from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.db import get_db

router = APIRouter(
    prefix="/api/auth",
    tags=["auth"]
)

# -------------------------------
# Save / Verify Firebase User
# -------------------------------
@router.post("/save-user", response_model=schemas.UserResponse)
def save_user(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Called after Firebase signup/login.
    Ensures the user exists in MySQL.
    """

    # 1. Check if user exists by firebase_uid
    user = db.query(models.User).filter(models.User.firebase_uid == user_data.firebase_uid).first()

    if not user:
        # 2. If not found, check by email (in case of re-login)
        user = db.query(models.User).filter(models.User.email == user_data.email).first()

    if not user:
        # 3. Create new user
        user = models.User(
            firebase_uid=user_data.firebase_uid,
            email=user_data.email
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    else:
        # 4. Update firebase_uid if missing
        if not user.firebase_uid:
            user.firebase_uid = user_data.firebase_uid
            db.commit()
            db.refresh(user)

    return user
