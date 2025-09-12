# 🌿 CalmiVerse – Digital Mental Health Support Platform

CalmiVerse is an AI-powered digital mental health support system designed for **college students**.  
It provides **confidential, real-time mental health assistance** through AI-guided first aid, counselor booking, peer support forums, and wellness tools.

---

## 📌 Features

- 🤖 **AI-Guided First Aid** – Chatbot with coping strategies (Rasa + Transformers).
- 🔒 **Confidential Booking** – Anonymous counselor booking via Google Calendar.
- 📚 **Resource Hub** – Articles, videos, and multilingual self-help guides.
- 🤝 **Peer Support Forum** – Anonymous forum with AI moderation.
- 🪞 **AI Mood Mirror** – Detects emotions using FER + OpenCV.
- 🆘 **SOS Circle Alerts** – Sends alerts via Twilio (SMS) or SendGrid (Email).
- 🎮 **Gamification** – Points & badges for journaling and wellness tasks.
- 📊 **Admin Dashboard** – Anonymous analytics for institutions.

---

## 🏗️ Tech Stack

### Frontend
- **React.js (Vite)**
- Components: Chatbot, Forum, Mood Mirror, Gamification, SOS Circle, Resources
- Firebase Authentication (Anonymous Login)
- Axios for API calls

### Backend
- **FastAPI** (Python)
- AI/NLP: `rasa`, `transformers`, `torch`
- Mood Detection: `fer`, `opencv-python`
- Alerts: `twilio`, `sendgrid`
- Database/Auth: Firebase Firestore + Firebase Auth
- Scheduling: Google Calendar API
- Deployment-ready (Uvicorn/Gunicorn)

---

## ⚙️ Installation & Setup

### 1. Clone Repo
```bash
git clone https://github.com/your-username/CalmiVerse.git
cd CalmiVerse


2. Frontend Setup (React)
cd frontend
npm install
npm run dev

Frontend runs at: http://localhost:5173

3. Backend Setup (FastAPI)
Create Virtual Environment
cd backend
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

Install Dependencies
pip install -r requirements.txt

Run Backend
uvicorn app.main:app --reload --port 8000



Backend runs at: http://localhost:8000

Docs (Swagger UI): http://localhost:8000/docs
