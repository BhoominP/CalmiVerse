import React from 'react';
import { Sparkles, User, GraduationCap, Heart, Smile, BarChart2, Bed, ListChecks, ShieldCheck, Book, Wind, BookOpen, Zap, Send, CornerDownLeft } from 'lucide-react';
import '../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to CalmiVerse</h1>
        <p>Your universe of calm, right here when you need it.</p>
      </header>

      <main className="dashboard-grid">
        <div className="left-column">
          <div className="card wellbeing-snapshot">
            <h2 className="card-title"><Sparkles className="title-icon" /> Your Wellbeing Snapshot</h2>
            <div className="snapshot-grid">
                <div className="snapshot-item">
                    <User size={20} />
                    <span>Hi, PATEL BHOOMIN</span>
                </div>
                <div className="snapshot-item">
                    <Smile size={20} />
                    <span>AI Mood Mirror: <span className="mood-tag">happy</span></span>
                </div>
                <div className="snapshot-item">
                    <GraduationCap size={20} />
                    <span>3rd Year – Computer Science</span>
                </div>
                <div className="snapshot-item">
                    <BarChart2 size={20} />
                    <span className="stress-anxiety-levels">Stress: <span className="stress-tag high">High</span> | Anxiety: <span className="anxiety-tag low">Low</span></span>
                </div>
                <div className="snapshot-item">
                    <Heart size={20} />
                    <div className="hobbies">
                        <span className="hobby-tag">cooking</span>
                        <span className="hobby-tag">reading</span>
                    </div>
                </div>
                <div className="snapshot-item">
                    <Bed size={20} />
                    <span>Sleep: ~9 hrs/night</span>
                </div>
            </div>

            <hr />

            <div className="snapshot-grid">
                <div className="snapshot-section">
                    <h3 className="section-title"><ListChecks size={20} /> Top Challenges</h3>
                    <span className="challenge-tag">peer-pressure</span>
                </div>
                <div className="snapshot-section">
                    <h3 className="section-title"><ShieldCheck size={20} /> Safety & Support</h3>
                    <p>SOS Contacts Added: <span className="sos-tag">Yes (0)</span></p>
                    <p>Preferred Support: <span className="support-tag">AI-chatbot</span></p>
                </div>
            </div>
            
            <hr />

            <div className="suggestions-section">
                <h3 className="section-title">Next Step Suggestions</h3>
                <div className="suggestion-buttons">
                    <button><Book size={16} /> Try the Exam Stress Toolkit</button>
                    <button><Wind size={16} /> Start a 5-min Guided Relaxation</button>
                    <button><BookOpen size={16} /> Book a Counseling Session</button>
                </div>
            </div>
          </div>

          <div className="card points-tasks">
            <h2 className="card-title">Your Points & Tasks</h2>
            <div className="points-section">
                <div className="points-info">
                    <Zap size={20} className="points-icon" />
                    <span className="points-title">Points</span>
                </div>
                <span className="points-total">0</span>
            </div>
            <p className="tasks-message">No new tasks right now. Try the AI First Aid if you need support.</p>
          </div>
        </div>

        <div className="right-column">
          <div className="card ai-first-aid">
  <h2 className="card-title">
    <Sparkles className="title-icon" /> AI-Guided First Aid
  </h2>
  <p>Feeling overwhelmed? Share what's on your mind. I'm here to help.</p>

  <div className="chat-container">
    {/* Chat messages will render here */}
    <div className="chat-messages">
      {/* Example message */}
      {/* <div className="message user">I feel stressed...</div>
      <div className="message ai">It's okay, let's try some breathing...</div> */}
    </div>

    <div className="chat-input">
      <textarea
        placeholder="For example: 'I feel anxious about my exams...'"
      />
      <button className="send-button">
        Send <CornerDownLeft size={16} style={{ marginLeft: "6px" }} />
      </button>
    </div>
  </div>
</div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;
