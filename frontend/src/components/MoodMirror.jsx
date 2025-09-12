import React, { useState, useRef } from "react";
import { Upload, X, Sparkles, Activity } from "lucide-react";
import "../styles/MoodMirror.css";

function MoodMirror() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setAnalysis(null); // Clear previous analysis
    }
  };

  // Trigger file picker
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Cancel image selection
  const handleCancelImage = () => {
    setSelectedImage(null);
    setSelectedImageFile(null);
    setAnalysis(null);
    fileInputRef.current.value = ""; // Reset file input
  };

  // Call backend API
  const handleAnalyze = async () => {
    if (!selectedImageFile) return;
    setIsLoading(true);
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedImageFile);

      const res = await fetch("http://localhost:8000/mood-service/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.result) {
        setAnalysis({
          mood: data.result.mood || "Unknown 🤔",
          activities: data.result.activities?.length
            ? data.result.activities
            : ["No suggestions available."],
        });
      } else {
        setAnalysis({
          mood: "Unknown 🤔",
          activities: ["Try again later."],
        });
      }
    } catch (error) {
      setAnalysis({
        mood: "Error ❌",
        activities: ["Could not connect to backend."],
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="mood-mirror-container">
      <h1 className="mood-mirror-title">AI Mood Mirror</h1>
      <p className="mood-mirror-subtitle">
        Upload a selfie to get a reflection of your current mood and personalized suggestions.
      </p>

      <div className="mood-mirror-grid">
        {/* Upload Card */}
        <div className="mood-mirror-card">
          <h2>1. Upload a Photo</h2>
          <p className="mood-mirror-note">
            Your image is processed for analysis and is not stored on our servers.
          </p>
          <div className="upload-section">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
              accept="image/*"
            />
            {selectedImage ? (
              <div className="image-preview-container">
                <img
                  src={selectedImage}
                  alt="Selfie preview"
                  className="image-preview"
                />
                <button onClick={handleCancelImage} className="cancel-button">
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="upload-placeholder" onClick={handleUploadClick}>
                <div className="upload-icon-container">
                  <Upload size={40} />
                </div>
                <button className="upload-button-placeholder">
                  Upload Photo
                </button>
              </div>
            )}
          </div>

          <button
            className="analyze-mood-button"
            onClick={handleAnalyze}
            disabled={!selectedImage || isLoading}
          >
            {isLoading ? "Analyzing..." : (
              <>
                <Sparkles size={20} style={{ marginRight: "8px" }} /> Analyze Mood
              </>
            )}
          </button>
        </div>

        {/* Analysis Card */}
        <div className="mood-mirror-card">
          <h2>2. Mood Analysis</h2>
          <p className="mood-mirror-note">Here's what the AI detected.</p>

          <div className="analysis-section">
            {isLoading ? (
              <div className="loader-container">
                <div className="spinner"></div>
                <p className="loader-text">Analyzing your mood...</p>
              </div>
            ) : analysis ? (
              <div>
                <div className="detected-mood">
                  <div className="detected-mood-title-container">
                    <Sparkles size={20} />
                    <h3 className="detected-mood-title">Detected Mood</h3>
                  </div>
                  <span className="mood-tag">{analysis.mood}</span>
                </div>
                <div className="suggested-activities">
                  <div className="suggested-activities-title-container">
                    <Activity size={20} />
                    <h3 className="suggested-activities-title">Suggested Activities</h3>
                  </div>
                  <ul>
                    {analysis.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="placeholder-text">Your analysis will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoodMirror;
