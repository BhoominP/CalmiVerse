import React from "react";
import { Zap } from "lucide-react";
import "../styles/Dashboard.css";

export default function PointsTasks() {
  return (
    <div className="card points-tasks">
      <h2 className="card-title">Your Points & Tasks</h2>
      <div className="points-section">
        <div className="points-info">
          <Zap size={20} className="points-icon" />
          <span className="points-title">Points</span>
        </div>
        <span className="points-total">0</span>
      </div>
      <p className="tasks-message">
        No new tasks right now. Try the AI First Aid if you need support.
      </p>
    </div>
  );
}
