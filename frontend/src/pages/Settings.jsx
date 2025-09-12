import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import defaultAvatar from "../assets/calmiverse-avatar.png";
import "../styles/components.css";
import { auth } from "../firebase";


function Settings() {
  // Profile states
  const [displayName, setDisplayName] = useState("");
  const [status, setStatus] = useState("University Student");
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || null);
  const [email, setEmail] = useState("");

  // Notifications
  const [forumMentions, setForumMentions] = useState(true);
  const [bookingReminders, setBookingReminders] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);

  

  // ✅ Load user data from localStorage on mount
  useEffect(() => {
  const user = auth.currentUser;
  const savedUser = localStorage.getItem("user");

  if (user) {
    // Always prefer Firebase email (login/signup email)
    setEmail(user.email);
  }

  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    setDisplayName(parsedUser.displayName || "");
    setStatus(parsedUser.status || "University Student");
    setProfilePic(parsedUser.profilePic || null);

    // ✅ Only fallback to localStorage email if Firebase doesn't exist
    if (!user && parsedUser.email) {
      setEmail(parsedUser.email);
    }
  }
}, []);

  // ✅ Handle profile picture upload (preview + save)
  const handlePicChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result); // Base64 string
      localStorage.setItem("profilePic", reader.result);
    };
    reader.readAsDataURL(file); // Convert to Base64
  }
};


  // ✅ Save profile and notify Sidebar
  const handleSave = () => {
    const userData = {
      displayName,
      status,
      profilePic,
      email,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    window.dispatchEvent(new Event("userUpdated")); // notify Sidebar

    alert("Profile updated successfully!");
  };

  return (
    
    <div className="settings-page">
      <h1 className="settings-title">Settings</h1>
      <p className="settings-subtitle">Manage your account and preferences.</p>
      


      {/* Profile Section */}
      <div className="settings-card">
        <h2 className="settings-section-title">👤 Profile</h2>
        <p className="settings-description">This is how your profile appears to others.</p>

        <div className="profile-pic-container">
          <img
            src={profilePic || defaultAvatar}
            alt="Profile"
            className="profile-pic-preview"
          />
          <label className="upload-overlay">
            <input type="file" accept="image/*" onChange={handlePicChange} hidden />
            <Upload size={18} />
          </label>
        </div>

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

      {/* Account Section */}
      <div className="settings-card">
        <h2 className="settings-section-title">📧 Account</h2>
        <p className="settings-description">Manage your account information.</p>

        <div className="settings-input-group">
          <label>Email Address</label>
          <input type="email" value={email} readOnly />
        </div>
      </div>

      {/* Notifications Section */}
      <div className="settings-card">
        <h2 className="settings-section-title">🔔 Notifications</h2>
        <p className="settings-description">Manage how you receive notifications.</p>

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

      
    </div>
  );
}

export default Settings;
