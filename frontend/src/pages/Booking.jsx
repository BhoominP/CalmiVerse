import React from "react";
import { Calendar } from "lucide-react";
import "../styles/booking.css";

const counselors = [
  {
    id: 1,
    name: "Dr. Anya Sharma",
    title: "PhD, Psychology",
    expertise: "Anxiety & Stress",
    available: ["Video", "Text"],
    img: "https://ui-avatars.com/api/?name=Anya+Sharma&background=8b5cf6&color=fff&size=128", // Indian female avatar
  },
  {
    id: 2,
    name: "Mr. Rohan Verma",
    title: "LCSW",
    expertise: "Depression & Burnout",
    available: ["Video", "Text"],
    img: "https://ui-avatars.com/api/?name=Rohan+Verma&background=2563eb&color=fff&size=128", // Indian male avatar
  },
  {
    id: 3,
    name: "Ms. Priya Singh",
    title: "M.A. Counseling",
    expertise: "Relationships",
    available: ["Video"],
    img: "https://ui-avatars.com/api/?name=Priya+Singh&background=10b981&color=fff&size=128", // Indian female avatar
  },
];

function Booking() {
  return (
    <div className="booking-container">
      <h2 className="booking-title">Confidential Booking</h2>
      <p className="booking-subtitle">
        Book an anonymous and secure session with a certified counselor.
      </p>

      <div className="counselor-grid">
        {counselors.map((counselor) => (
          <div key={counselor.id} className="counselor-card">
            <img src={counselor.img} alt={counselor.name} className="counselor-img" />

            <h3 className="counselor-name">{counselor.name}</h3>
            <p className="counselor-title">{counselor.title}</p>

            <span className="expertise-tag">{counselor.expertise}</span>

            <div className="availability">
              <span>Available for:</span>
              <div className="availability-options">
                {counselor.available.includes("Video") && (
                  <span className="availability-chip video">📹 Video</span>
                )}
                {counselor.available.includes("Text") && (
                  <span className="availability-chip text">💬 Text</span>
                )}
              </div>
            </div>

            <button className="book-btn">
              <Calendar size={16} />
              Book Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booking;
