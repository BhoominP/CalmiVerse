import React from "react";
import "../styles/Dashboard.css";

// Import components
import WellbeingSnapshot from "../components/WellbeingSnapshot";
import PointsTasks from "../components/PointsTasks";
import { Gamification } from "../components/gamification";
import AIFirstAid from "../components/AIFirstAid";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to CalmiVerse</h1>
        <p>Your universe of calm, right here when you need it.</p>
      </header>

      <main className="dashboard-grid">
        <div className="left-column">
          <WellbeingSnapshot />
          <Gamification />
        </div>
        <div className="right-column">
          <AIFirstAid />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
