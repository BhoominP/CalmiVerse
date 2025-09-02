import React, { useState } from "react";
import "../styles/components.css"; // custom styling

function Settings() {
  // States
  const [displayName, setDisplayName] = useState("Student #123");
  const [status, setStatus] = useState("University Student");

  const [forumMentions, setForumMentions] = useState(true);
  const [bookingReminders, setBookingReminders] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div className="settings-page">
      <h1 className="settings-title">Settings</h1>
      <p className="settings-subtitle">
        Manage your account and preferences.
      </p>

      {/* Profile Section */}
      <div className="settings-card">
        <h2 className="settings-section-title">👤 Profile</h2>
        <p className="settings-description">
          This is how your profile appears to others.
        </p>

        <div className="settings-input-group">
          <label>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div className="settings-input-group">
          <label>Status</label>
          <input type="text" value={status} readOnly />
        </div>

        <button className="btn-primary" onClick={handleSave}>
          Save Changes
        </button>
      </div>

      {/* Notifications Section */}
      <div className="settings-card">
        <h2 className="settings-section-title">🔔 Notifications</h2>
        <p className="settings-description">
          Manage how you receive notifications.
        </p>

        <div className="settings-toggle">
          <span>Forum Mentions</span>
          <input
            type="checkbox"
            checked={forumMentions}
            onChange={() => setForumMentions(!forumMentions)}
          />
        </div>

        <div className="settings-toggle">
          <span>Booking Reminders</span>
          <input
            type="checkbox"
            checked={bookingReminders}
            onChange={() => setBookingReminders(!bookingReminders)}
          />
        </div>

        <div className="settings-toggle">
          <span>Weekly Summary</span>
          <input
            type="checkbox"
            checked={weeklySummary}
            onChange={() => setWeeklySummary(!weeklySummary)}
          />
        </div>
      </div>

      {/* Appearance Section */}
      <div className="settings-card">
        <h2 className="settings-section-title">🎨 Appearance</h2>
        <p className="settings-description">
          Customize the look and feel of the app.
        </p>

        <div className="settings-toggle">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
