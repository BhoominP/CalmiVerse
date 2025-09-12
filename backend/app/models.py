from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base

# -------------------------------
# User Table
# -------------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String(255), unique=True, index=True, nullable=True)
    email = Column(String(255), unique=True, index=True, nullable=False)

    screenings = relationship("ScreeningResult", back_populates="user")



# -------------------------------
# Screening Result Table
# -------------------------------
class ScreeningResult(Base):
    __tablename__ = "screening_results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Screening fields
    mood = Column(String(255), nullable=True)
    score = Column(Integer, nullable=True)
    overall = Column(String(255), nullable=True)
    challenges = Column(String(500), nullable=True)   # stored as comma-separated
    sleep_hours = Column(Integer, nullable=True)
    support_style = Column(String(255), nullable=True)

    # Profile fields
    name = Column(String(255), nullable=True)
    year = Column(String(50), nullable=True)
    course = Column(String(255), nullable=True)
    hobbies = Column(Text, nullable=True)          # JSON string
    sos_contacts = Column(Text, nullable=True)     # JSON string

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="screenings")
