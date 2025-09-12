import React from "react";
import { Sparkles, CornerDownLeft } from "lucide-react";
import "../styles/Dashboard.css";

export default function AIFirstAid() {
  return (
    <div className="firstaid-card">
      <h2 className="firstaid-title">
        <Sparkles className="title-icon" /> AI-Guided First Aid
      </h2>
      <p className="firstaid-subtext">
        Feeling overwhelmed? Share what's on your mind. I'm here to help.
      </p>

      <div className="chat-container">
        <div className="chat-messages">
          {/* Example bubbles */}
          <div className="chat-bubble user">I feel anxious about exams...</div>
          <div className="chat-bubble ai">
            That’s understandable. Would you like some calming exercises?
          </div>
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
