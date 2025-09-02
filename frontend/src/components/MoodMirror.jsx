import React, { useState } from "react";
import { Upload } from "lucide-react";
import "../styles/MoodMirror.css";

function MoodMirror() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysis, setAnalysis] = useState("Your analysis will appear here.");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setAnalysis("Processing image... 🤖");
      // Simulated AI response
      setTimeout(() => {
        setAnalysis("AI detected: 😊 You seem happy today!");
      }, 2000);
    }
  };

  return (
    <div className="moodmirror-container">
      <h1 className="moodmirror-title">AI Mood Mirror</h1>
      <p className="moodmirror-subtitle">
        Upload a selfie to get a reflection of your current mood and personalized suggestions.
      </p>

      <div className="moodmirror-grid">
        {/* Upload Card */}
        <div className="moodmirror-card">
          <h2>1. Upload Your Selfie</h2>
          <p className="moodmirror-note">
            Your image is processed for analysis and is not stored on our servers.
          </p>
          <label htmlFor="file-upload" className="upload-box">
            {selectedImage ? (
              <img src={selectedImage} alt="preview" className="preview-image" />
            ) : (
              <div className="upload-placeholder">
                <Upload size={32} />
                <span>Click to upload an image</span>
                <small>or drag and drop</small>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden-input"
              onChange={handleImageUpload}
            />
          </label>
          <button className="analyze-btn" disabled={!selectedImage}>
            ⚡ Analyze Mood
          </button>
        </div>

        {/* Analysis Card */}
        <div className="moodmirror-card">
          <h2>2. Mood Analysis</h2>
          <p className="moodmirror-note">Here’s what the AI detected.</p>
          <p className="analysis-text">{analysis}</p>
        </div>
      </div>
    </div>
  );
}

export default MoodMirror;
