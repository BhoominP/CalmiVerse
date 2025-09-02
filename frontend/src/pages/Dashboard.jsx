import React from "react";
import "../styles/components.css"; // for Card + UI
import "../styles/theme.css";      // for colors, typography

import { Award, Flame, Sparkles } from "lucide-react";

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome to CalmiVerse</h1>
        <p className="dashboard-subtitle">
          Your universe of calm, right here when you need it.
        </p>
      </div>

      <div className="dashboard-grid">
        {/* AI-Guided First Aid */}
        <div className="card card-large">
          <h2 className="card-title">
            <Sparkles className="icon-purple" /> AI-Guided First Aid
          </h2>
          <p className="card-text">
            Feeling overwhelmed? Share what’s on your mind. I’m here to help.
          </p>
          <textarea
            placeholder="For example: 'I feel anxious about my exams...'"
            className="input-textarea"
            rows={3}
          />
          <button className="btn-primary">Send</button>
        </div>

        {/* Right Side – Progress + Wellness */}
        <div className="right-column">
          <div className="card">
            <h2 className="card-title">
              <Sparkles className="icon-purple" /> Your Progress
            </h2>
            <p className="points">1250 Points</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "75%" }}></div>
            </div>
            <p className="progress-text">
              1250 more points to unlock a new badge!
            </p>

            <div className="badges">
              <div className="badge">
                <Award className="icon-mint" />
                <p>Mindful Streak</p>
              </div>
              <div className="badge">
                <Award className="icon-purple" />
                <p>First Session</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="card-title">
              <Flame className="icon-orange" /> Wellness Journey
            </h2>
            <p className="points">0 Day Streak</p>
          </div>
        </div>
      </div>

      {/* Featured Resources */}
      <div>
        <h2 className="section-title">Featured Resources</h2>
        <div className="resources-grid">
          <div className="card resource-card">
            <img
              src="https://source.unsplash.com/400x200/?study,stress"
              alt="Exam Stress"
            />
            <h3 className="resource-title">Managing Exam Stress</h3>
            <p className="resource-text">Techniques to stay calm and focused.</p>
            <a href="#" className="link">Read more →</a>
          </div>

          <div className="card resource-card">
            <img
              src="https://source.unsplash.com/400x200/?journal,writing"
              alt="Journaling"
            />
            <h3 className="resource-title">The Power of Journaling</h3>
            <p className="resource-text">How writing can clear your mind.</p>
            <a href="#" className="link">Read more →</a>
          </div>

          <div className="card resource-card">
            <img
              src="https://source.unsplash.com/400x200/?sleep,night"
              alt="Sleep"
            />
            <h3 className="resource-title">Better Sleep Habits</h3>
            <p className="resource-text">Tips for a restful night.</p>
            <a href="#" className="link">Read more →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
