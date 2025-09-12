import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import { auth } from "../firebase";

export default function WellbeingSnapshot() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnapshot = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("No user logged in");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://127.0.0.1:8000/api/screening/latest/${user.uid}`
        );

        const d = res.data;

        setData(d);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch screening data");
      } finally {
        setLoading(false);
      }
    };

    fetchSnapshot();
  }, []);

  if (loading) return <p>Loading wellbeing snapshot...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>No wellbeing data found.</p>;

  return (
    <div className="wellbeing-card">
      <h2 className="title">✨ Your Wellbeing Snapshot</h2>

      {/* Header Section */}
      <div className="snapshot-header">
  <div className="user-info">
    <p>👋 Hi, {data.name?.toUpperCase()}!</p>
    <p>🎓 {data.year} Year – {data.course}</p>
    <div className="pill-container">
      {data.hobbies.map((hobby, i) => (
        <span key={i} className="pill">{hobby}</span>
      ))}
    </div>
  </div>

  {/* Status Section */}
  <div className="status-info">
    <div className="status-row">
      <span>🙂 AI Mood Mirror:</span>
      <span className="badge">{data.mood}</span>
    </div>
    <div className="status-row">
      <span>💤 Sleep:</span>
      <span>~{data.sleep_hours} hrs/night</span>
    </div>
  </div>
</div>

<hr />

{/* Challenges + Support */}
<div className="snapshot-body grid-2">
  <div>
    <h3>✅ Top Challenges</h3>
    <div className="pill-container">
      {data.challenges.map((ch, i) => (
        <span key={i} className="pill challenge">{ch}</span>
      ))}
    </div>
  </div>

  <div>
    <h3>🛡️ Safety & Support</h3>
    <p>
      SOS Contacts Added:{" "}
      <span className="badge">
        {data.sosContacts.length > 0
          ? `Yes (${data.sosContacts.length})`
          : "No"}
      </span>
    </p>
    <p>
      Preferred Support:{" "}
      <span className="support-badge teal">{data.support_style}</span>
    </p>
  </div>
</div>

      <hr />

      {/* Suggestions */}
      <div className="suggestions">
        <h3>🪄 Next Step Suggestions</h3>
        <div className="suggestion-btns">
          <button className="btn">📘 Try the Exam Stress Toolkit</button>
          <button className="btn">🧘 Start a 5-min Guided Relaxation</button>
          <button className="btn">🎯 Book a Counseling Session</button>
        </div>
      </div>

      {/* Last updated */}
      <p className="last-updated">
        Last updated: {new Date(data.created_at).toLocaleString()}
      </p>
    </div>
  );
}
