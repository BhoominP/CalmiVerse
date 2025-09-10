import React from "react";
import { Sparkles, CornerDownLeft } from "lucide-react";
import "../styles/Dashboard.css";

export default function AIFirstAid() {
  return (
    <div className="card ai-first-aid">
      <h2 className="card-title">
        <Sparkles className="title-icon" /> AI-Guided First Aid
      </h2>
      <p>Feeling overwhelmed? Share what's on your mind. I'm here to help.</p>

      <div className="chat-container">
        <div className="chat-messages">
          {/* Chat messages go here */}
        </div>
        <div className="chat-input">
          <textarea placeholder="For example: 'I feel anxious about my exams...'" />
          <button className="send-button">
            Send <CornerDownLeft size={16} style={{ marginLeft: "6px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
