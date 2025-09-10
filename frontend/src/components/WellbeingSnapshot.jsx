import React, { useEffect, useState } from "react";
import {
  Sparkles, User, GraduationCap, Heart, Smile, BarChart2,
  Bed, ListChecks, ShieldCheck, Book, Wind, BookOpen
} from "lucide-react";
import "../styles/Dashboard.css";

export default function WellbeingSnapshot() {
  const [screeningResult, setScreeningResult] = useState(null);

  useEffect(() => {
  fetch("http://localhost:8000/screening/result")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch result");
      return res.json();
    })
    .then((data) => setScreeningResult(data))
    .catch((err) => console.error("Error fetching screening result:", err));
}, []);


  if (!screeningResult) {
    return (
      <div className="card wellbeing-snapshot">
        <h2 className="card-title"><Sparkles className="title-icon" /> Your Wellbeing Snapshot</h2>
        <p>Loading your screening results...</p>
      </div>
    );
  }

  return (
    <div className="card wellbeing-snapshot">
      <h2 className="card-title"><Sparkles className="title-icon" /> Your Wellbeing Snapshot</h2>
      <div className="snapshot-grid">
        <div className="snapshot-item"><User size={20} /><span>Hi, {screeningResult.name}</span></div>
        <div className="snapshot-item"><Smile size={20} /><span>AI Mood Mirror: <span className="mood-tag">{screeningResult.mood}</span></span></div>
        <div className="snapshot-item"><GraduationCap size={20} /><span>{screeningResult.year} – {screeningResult.course}</span></div>
        <div className="snapshot-item"><BarChart2 size={20} /><span>Overall: <span className="stress-tag">{screeningResult.overall}</span></span></div>
        <div className="snapshot-item"><Heart size={20} /><div className="hobbies">{screeningResult.hobbies?.map((h, i) => <span key={i} className="hobby-tag">{h}</span>)}</div></div>
        <div className="snapshot-item"><Bed size={20} /><span>Sleep: ~{screeningResult.sleepHours} hrs/night</span></div>
      </div>
    </div>
  );
}
