from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# -------------------------------
# Screening Create (from frontend)
# -------------------------------
class ScreeningResultCreate(BaseModel):
    firebase_uid: str
    email: EmailStr
    mood: Optional[str] = None
    score: Optional[int] = None
    overall: Optional[str] = None
    challenges: List[str] = []
    sleepHours: Optional[int] = None
    supportStyle: Optional[str] = None
    name: Optional[str] = None
    year: Optional[str] = None
    course: Optional[str] = None
    hobbies: List[str] = []
    sosContacts: List[str] = []



class UserCreate(BaseModel):
    firebase_uid: str
    email: EmailStr



# -------------------------------
# User Response (for API)
# -------------------------------
class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True


# -------------------------------
# Snapshot (for dashboard)
# -------------------------------
class ScreeningSnapshot(BaseModel):
    id: int
    mood: Optional[str]
    score: Optional[int]
    overall: Optional[str]
    challenges: List[str]
    sleepHours: Optional[int]
    supportStyle: Optional[str]
    created_at: datetime

    # Profile fields
    name: Optional[str]
    year: Optional[str]
    course: Optional[str]
    hobbies: List[str]
    sosContacts: List[str]

    class Config:
        orm_mode = True


# -------------------------------
# Full Screening Response (optional)
# -------------------------------
class ScreeningResponse(ScreeningSnapshot):
    """Same as snapshot for now, but can be extended later
    with user info (like UserResponse) if needed.
    """
    pass
