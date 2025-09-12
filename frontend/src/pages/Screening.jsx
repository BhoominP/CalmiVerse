import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/screening.css";
import CalmiVerseLogo from "../assets/icons/CalmiVerse.svg";
import { auth } from "../firebase";   // 👈 MOVE HERE

function Screening() {
  const [step, setStep] = useState(1);
  const [sleepHours, setSleepHours] = useState(8);

  const [basicDetails, setBasicDetails] = useState({
  name: "",
  year: "",   // ✅ correct
  course: "",
  description: "",
  hobbies: []
});



  const [challenges, setChallenges] = useState([]);
  const [supportStyle, setSupportStyle] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const [sosContacts, setSosContacts] = useState([{ name: "", relation: "", contact: "" }]);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);  
  const [psychologyAnswers, setPsychologyAnswers] = useState({
  q1: "",
  q2: "",
  q3: "",
  q4: "",
  q5: "",
  q6: "",
});

  
  // === Webcam Controls ===
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, 320, 240);
      const imageData = canvasRef.current.toDataURL("image/png");
      setCapturedImage(imageData);
    }
  };

  const stopCamera = () => {
  if (videoRef.current?.srcObject) {
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    videoRef.current.srcObject = null;
  }
};

const calculateScore = () => {
  let score = 0;

  // Map Likert scale → numeric
  const scaleMap = { Never: 0, Sometimes: 1, Often: 2, Always: 3 };

  score += scaleMap[psychologyAnswers.q1] || 0;
  score += scaleMap[psychologyAnswers.q2] || 0;
  score += scaleMap[psychologyAnswers.q3] || 0;
  score += scaleMap[psychologyAnswers.q4] || 0;

  // Q5 & Q6 are Yes/No style
  if (psychologyAnswers.q5 === "No") score += 1;
  if (psychologyAnswers.q6 === "No") score += 1;

  return score;
};



  // === SOS Handlers ===
  const handleSOSChange = (index, field, value) => {
    const updated = [...sosContacts];
    updated[index][field] = value;
    setSosContacts(updated);
  };

  const addSOSContact = () => {
    if (sosContacts.length < 3) {
      setSosContacts([...sosContacts, { name: "", relation: "", contact: "" }]);
    }
  };

  const removeSOSContact = (index) => {
    const updated = sosContacts.filter((_, i) => i !== index);
    setSosContacts(updated);
  };


  

// === Save Function ===
const handleFinish = async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("Please log in before finishing the screening");
    return false;
  }

  const payload = {
  firebase_uid: user.uid,
  email: user.email,
  mood: analysis?.mood || null,
  score: calculateScore(),
  overall: null, // or derive from answers if needed
  challenges,
  sleep_hours: sleepHours,
  support_style: supportStyle,
  name: basicDetails.name,
  year: basicDetails.year,
  course: basicDetails.course,
  hobbies: basicDetails.hobbies,
  sos_contacts: sosContacts,
};



  try {
    console.log("📤 Sending payload:", payload);

    const res = await fetch("http://127.0.0.1:8000/api/screening/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),       // 👈 FIXED here
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to save screening result");
    }

    const data = await res.json();
    console.log("✅ Saved result:", data);
    return true;
  } catch (err) {
    console.error("❌ Error saving:", err);
    alert("Error saving screening data");
    return false;
  }
};




  return (
    <div className="screening-container">
      {/* === Logo === */}
      <div className="logo-only">
        <img src={CalmiVerseLogo} alt="CalmiVerse Logo" />
      </div>

      {/* === Progress Bar === */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 7) * 100}%` }} />
      </div>

{/* === Step 1 === */}
{step === 1 && (
  <div className="screening-card">
    <h2>Step 1: Basic Details</h2>
    <p>Let’s get to know you. This helps us personalize your experience.</p>

    <div className="form-grid">
      <div>
        <label className="form-label">Name / Nickname</label>
        <input
          type="text"
          placeholder="e.g., Alex"
          value={basicDetails.name}
          onChange={(e) =>
            setBasicDetails({ ...basicDetails, name: e.target.value })
          }
        />
      </div>
      <div>
        <label className="form-label">Year of Study</label>
        <input
          type="text"
          placeholder="e.g., 2nd Year"
          value={basicDetails.year}
          onChange={(e) =>
            setBasicDetails({ ...basicDetails, year: e.target.value })
          }
        />
      </div>
    </div>

    <div>
      <label className="form-label">Course</label>
      <input
        type="text"
        placeholder="e.g., Computer Science"
        value={basicDetails.course}
        onChange={(e) =>
          setBasicDetails({ ...basicDetails, course: e.target.value })
        }
      />
    </div>

    <div>
      <label className="form-label">Hobbies & Interests</label>
      <div className="checkbox-grid">
        {["Reading", "Music", "Gaming", "Sports", "Cooking", "Movies"].map(
          (hobby) => (
            <label key={hobby}>
              <input
                type="checkbox"
                checked={basicDetails.hobbies.includes(hobby)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setBasicDetails({
                      ...basicDetails,
                      hobbies: [...basicDetails.hobbies, hobby],
                    });
                  } else {
                    setBasicDetails({
                      ...basicDetails,
                      hobbies: basicDetails.hobbies.filter(
                        (h) => h !== hobby
                      ),
                    });
                  }
                }}
              />{" "}
              {hobby}
            </label>
          )
        )}
      </div>
    </div>

    <div>
      <label className="form-label">Short Self-Description</label>
      <textarea
        placeholder="Describe yourself in 1–2 sentences..."
        value={basicDetails.description}
        onChange={(e) =>
          setBasicDetails({ ...basicDetails, description: e.target.value })
        }
      />
    </div>

    <button className="next-btn" onClick={nextStep}>
      Next Step →
    </button>
  </div>
)}




{/* === Step 2 === */}
{step === 2 && (
  <div className="screening-card">
    <h2>Step 2: Student Context</h2>
    <p>This will help us tailor resources and suggestions for you.</p>

    {/* Challenges */}
    <div className="question-block">
  <label className="form-label">
    What challenges do you face most as a student?
  </label>
  <div className="checkbox-grid">

    {/* Exam stress */}
    <label>
      <input
        type="checkbox"
        checked={challenges.includes("Exam stress")}
        onChange={(e) =>
          e.target.checked
            ? setChallenges([...challenges, "Exam stress"])
            : setChallenges(challenges.filter((c) => c !== "Exam stress"))
        }
      />
      Exam stress
    </label>

    {/* Time management */}
    <label>
      <input
        type="checkbox"
        checked={challenges.includes("Time management")}
        onChange={(e) =>
          e.target.checked
            ? setChallenges([...challenges, "Time management"])
            : setChallenges(challenges.filter((c) => c !== "Time management"))
        }
      />
      Time management
    </label>

    {/* Sleep issues */}
    <label>
      <input
        type="checkbox"
        checked={challenges.includes("Sleep issues")}
        onChange={(e) =>
          e.target.checked
            ? setChallenges([...challenges, "Sleep issues"])
            : setChallenges(challenges.filter((c) => c !== "Sleep issues"))
        }
      />
      Sleep issues
    </label>

    {/* Peer pressure */}
    <label>
      <input
        type="checkbox"
        checked={challenges.includes("Peer pressure")}
        onChange={(e) =>
          e.target.checked
            ? setChallenges([...challenges, "Peer pressure"])
            : setChallenges(challenges.filter((c) => c !== "Peer pressure"))
        }
      />
      Peer pressure
    </label>

    {/* Career anxiety */}
    <label>
      <input
        type="checkbox"
        checked={challenges.includes("Career anxiety")}
        onChange={(e) =>
          e.target.checked
            ? setChallenges([...challenges, "Career anxiety"])
            : setChallenges(challenges.filter((c) => c !== "Career anxiety"))
        }
      />
      Career anxiety
    </label>

    {/* Other */}
    <label>
      <input
        type="checkbox"
        checked={challenges.some((c) => c.startsWith("Other:"))}
        onChange={(e) => {
          if (!e.target.checked) {
            setChallenges(challenges.filter((c) => !c.startsWith("Other:")));
          }
        }}
      />
      Other:{" "}
      <input
        type="text"
        className="inline-input"
        placeholder="Please specify"
        value={
          challenges.find((c) => c.startsWith("Other:"))?.replace("Other: ", "") || ""
        }
        onChange={(e) => {
          const otherValue = `Other: ${e.target.value}`;
          setChallenges([
            ...challenges.filter((c) => !c.startsWith("Other:")),
            otherValue,
          ]);
        }}
      />
    </label>

  </div>
</div>


    {/* Sleep Hours */}
    <div className="question-block">
      <label className="form-label">
        How many hours of sleep do you get on average?
      </label>
      <div className="slider-group">
        <input
          type="range"
          min="0"
          max="12"
          step="1"
          value={sleepHours}
          onChange={(e) => setSleepHours(Number(e.target.value))}
          className="slider"
        />
        <span className="slider-value">{sleepHours} hours</span>
      </div>
    </div>

    {/* Support Style */}
<div className="question-block">
  <label className="form-label">Preferred Support Style:</label>
  <div className="radio-grid">
    <label>
      <input
        type="radio"
        name="support"
        value="Self–help guides"
        checked={supportStyle === "Self–help guides"}
        onChange={(e) => setSupportStyle(e.target.value)}
      /> 
      Self–help guides
    </label>

    <label>
      <input
        type="radio"
        name="support"
        value="Peer discussions"
        checked={supportStyle === "Peer discussions"}
        onChange={(e) => setSupportStyle(e.target.value)}
      /> 
      Peer discussions
    </label>

    <label>
      <input
        type="radio"
        name="support"
        value="Professional counseling"
        checked={supportStyle === "Professional counseling"}
        onChange={(e) => setSupportStyle(e.target.value)}
      /> 
      Professional counseling
    </label>

    <label>
      <input
        type="radio"
        name="support"
        value="AI chatbot"
        checked={supportStyle === "AI chatbot"}
        onChange={(e) => setSupportStyle(e.target.value)}
      /> 
      AI chatbot
    </label>
  </div>
</div>

    {/* Navigation */}
    <div className="actions">
      <button className="back-btn" onClick={prevStep}>← Back</button>
      <button className="next-btn" onClick={nextStep}>Next Step →</button>
    </div>
  </div>
)}

{/* === Step 3 === */}
{step === 3 && (
  <div className="screening-card">
    <h2>Step 3: Psychology & Behavior</h2>
    <p>Your answers are confidential and help us understand your needs.</p>

    {/* Q1 */}
    <div className="question-block">
      <label className="form-label">
        In the past 2 weeks, how often have you felt little interest or pleasure in doing things?
      </label>
      <div className="radio-options">
        {["Never", "Sometimes", "Often", "Always"].map((opt) => (
          <label key={opt}>
            <input
              type="radio"
              name="q1"
              value={opt}
              checked={psychologyAnswers.q1 === opt}
              onChange={(e) =>
                setPsychologyAnswers({ ...psychologyAnswers, q1: e.target.value })
              }
            />
            {opt}
          </label>
        ))}
      </div>
    </div>

    {/* Q2 */}
    <div className="question-block">
      <label className="form-label">
        In the past 2 weeks, how often have you felt down, depressed, or hopeless?
      </label>
      <div className="radio-options">
        {["Never", "Sometimes", "Often", "Always"].map((opt) => (
          <label key={opt}>
            <input
              type="radio"
              name="q2"
              value={opt}
              checked={psychologyAnswers.q2 === opt}
              onChange={(e) =>
                setPsychologyAnswers({ ...psychologyAnswers, q2: e.target.value })
              }
            />
            {opt}
          </label>
        ))}
      </div>
    </div>

    {/* Q3 */}
    <div className="question-block">
      <label className="form-label">
        How often do you feel nervous, anxious, or on edge?
      </label>
      <div className="radio-options">
        {["Never", "Sometimes", "Often", "Always"].map((opt) => (
          <label key={opt}>
            <input
              type="radio"
              name="q3"
              value={opt}
              checked={psychologyAnswers.q3 === opt}
              onChange={(e) =>
                setPsychologyAnswers({ ...psychologyAnswers, q3: e.target.value })
              }
            />
            {opt}
          </label>
        ))}
      </div>
    </div>

    {/* Q4 */}
    <div className="question-block">
      <label className="form-label">
        How often do you have trouble controlling your worries?
      </label>
      <div className="radio-options">
        {["Never", "Sometimes", "Often", "Always"].map((opt) => (
          <label key={opt}>
            <input
              type="radio"
              name="q4"
              value={opt}
              checked={psychologyAnswers.q4 === opt}
              onChange={(e) =>
                setPsychologyAnswers({ ...psychologyAnswers, q4: e.target.value })
              }
            />
            {opt}
          </label>
        ))}
      </div>
    </div>

    {/* Q5 */}
    <div className="question-block">
      <label className="form-label">Do you exercise regularly?</label>
      <div className="radio-options">
        {["Yes", "No"].map((opt) => (
          <label key={opt}>
            <input
              type="radio"
              name="q5"
              value={opt}
              checked={psychologyAnswers.q5 === opt}
              onChange={(e) =>
                setPsychologyAnswers({ ...psychologyAnswers, q5: e.target.value })
              }
            />
            {opt}
          </label>
        ))}
      </div>
    </div>

    {/* Q6 */}
    <div className="question-block">
      <label className="form-label">Do you meditate/journal?</label>
      <div className="radio-options">
        {["Yes", "No", "Occasionally"].map((opt) => (
          <label key={opt}>
            <input
              type="radio"
              name="q6"
              value={opt}
              checked={psychologyAnswers.q6 === opt}
              onChange={(e) =>
                setPsychologyAnswers({ ...psychologyAnswers, q6: e.target.value })
              }
            />
            {opt}
          </label>
        ))}
      </div>
    </div>

    <div className="actions">
      <button className="back-btn" onClick={prevStep}>← Back</button>
      <button className="next-btn" onClick={nextStep}>Next Step →</button>
    </div>
  </div>
)}


    {/* === Step 4: AI Mood Mirror === */}
      {step === 4 && (
        <div className="screening-card">
          <h2>Step 4: AI Mood Mirror</h2>
          <p>Let’s get a quick snapshot of your current mood.</p>

          <div className="info-box">
            <span>📷 Camera Access</span> This feature requires camera access to
            take a photo for analysis. Your image is not stored.
          </div>

          <div className="mood-mirror-grid">
            {/* === Left: Selfie Capture === */}
            <div className="selfie-box">
              <h3>1. Take a Selfie</h3>
              <p>
                Your image is processed for analysis and is not stored on our
                servers.
              </p>

              {!capturedImage ? (
                <div className="camera-placeholder">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    width="320"
                    height="240"
                  />
                  <canvas
                    ref={canvasRef}
                    width="320"
                    height="240"
                    style={{ display: "none" }}
                  />
                  <div className="actions">
                    <button className="btn-primary" onClick={startCamera}>
                      Allow Camera
                    </button>
                    <button className="btn-secondary" onClick={capturePhoto}>
                      📸 Take Picture
                    </button>
                  </div>
                </div>
              ) : (
                <div className="preview-box">
                  <img
                    src={capturedImage}
                    alt="Selfie"
                    className="captured-photo"
                  />
                  <div className="actions">
                    <button
                      className="btn-secondary"
                      onClick={() => setCapturedImage(null)}
                    >
                      Retake
                    </button>
                    <button
                      className="btn-primary"
                      onClick={async () => {
                        try {
                          setIsAnalyzing(true);

                          // Convert base64 → Blob
                          const res = await fetch(capturedImage);
                          const blob = await res.blob();
                          const formData = new FormData();
                          formData.append("file", blob, "selfie.png");

                          // Send to backend
                          const response = await fetch(
                            "http://localhost:8000/mood/analyze-image",
                            {
                              method: "POST",
                              body: formData,
                            }
                          );

                          const data = await response.json();
                          console.log("AI Analysis:", data);
                          setAnalysis(data); // save AI response
                        } catch (err) {
                          console.error("Upload failed:", err);
                          alert("Error analyzing mood. Try again.");
                        } finally {
                          setIsAnalyzing(false);
                        }
                      }}
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Mood"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* === Right: Analysis === */}
<div className="analysis-box">
  <h3>2. Mood Analysis</h3>
  <p>Here’s what the AI detected.</p>

  <div className="analysis-result">
    {isAnalyzing ? (
      <p>⏳ Analyzing your selfie...</p>
    ) : analysis ? (
      <>
        <div className="detected-mood">
          <span className="label">Mood:</span>
          <span className="mood-tag">{analysis.mood}</span>
        </div>

        <div className="suggestions">
          <h4>✨ Suggested Activities</h4>
          <ul>
  {analysis.suggestions?.map((act, i) => (
    <li key={i}>
      {act.replace(/^•\s*/, "")} {/* removes leading bullet if present */}
    </li>
  ))}
</ul>

        </div>
      </>
    ) : (
      <p className="placeholder">Your analysis will appear here after you take a photo.</p>
    )}
  </div>
</div>

          </div>

          {/* === Navigation === */}
          <div className="actions">
            <button className="back-btn" onClick={prevStep}>
              ← Back
            </button>
            <button
  className="next-btn"
  disabled={!analysis || isAnalyzing}
  onClick={nextStep}
>
  Next Step →
</button>

          </div>
        </div>
      )}

{/* === Step:5 === */}

      {step === 5 && (
  <div className="screening-card">
    <h2>Step 5: SOS Contact Setup 🛡️</h2>
    <p>In case we ever detect you may need urgent help, we can notify someone you trust.</p>

    {sosContacts.map((sos, idx) => (
  <div key={idx} className="sos-box">
    <div>
      <label className="form-label">Contact Name</label>
      <input
        type="text"
        placeholder="e.g., Jane Doe"
        value={sos.name}
        onChange={(e) => handleSOSChange(idx, "name", e.target.value)}
      />
    </div>

    <div>
      <label className="form-label">Relationship</label>
      <select
        value={sos.relation}
        onChange={(e) => handleSOSChange(idx, "relation", e.target.value)}
      >
        <option value="">Select a relationship</option>
        <option value="Parent">Parent</option>
        <option value="Sibling">Sibling</option>
        <option value="Friend">Friend</option>
        <option value="Mentor">Mentor</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div>
      <label className="form-label">Phone/Email</label>
      <input
        type="text"
        placeholder="jane.doe@example.com"
        value={sos.contact}
        onChange={(e) => handleSOSChange(idx, "contact", e.target.value)}
      />
    </div>

    {/* 👇 Remove Button */}
    {sosContacts.length > 1 && (
      <button
        className="btn-secondary remove-btn"
        onClick={() => removeSOSContact(idx)}
      >
        ❌ Remove
      </button>
    )}
  </div>
))}


    {/* Add Button */}
    <button
      className="btn-secondary"
      onClick={addSOSContact}
      disabled={sosContacts.length >= 3}
    >
      ➕ Add Another Contact (Max 3)
    </button>

    <div className="actions">
  <button className="back-btn" onClick={prevStep}>← Back</button>

  <div className="actions-right">
    <button className="btn-secondary" onClick={nextStep}>Skip for now</button>
    <button className="next-btn" onClick={nextStep}>Next Step →</button>
  </div>
</div>
  </div>
)}


{/* Step 6 */}
{step === 6 && (
  <div className="screening-card">
    <h2>Step 6: Finish Setup ✅</h2>
    <p>Please review your details below. You can always change them later in settings.</p>

    {/* Basic Details */}
    <div className="review-box">
      <h4>Basic Details</h4>
      <p><strong>Name:</strong> {basicDetails?.name || "Not provided"}</p>
      <p><strong>Age/Year:</strong> {basicDetails?.year || "Not provided"}</p>
      <p><strong>Course:</strong> {basicDetails?.course || "Not provided"}</p>
    </div>

    {/* Wellbeing */}
    <div className="review-box">
      <h4>Wellbeing Answers</h4>
      <p>Your confidential answers have been saved.</p>
    </div>

    {/* Mood Mirror */}
    <div className="review-box">
      <h4>Mood Mirror Result</h4>
      <p>
        Detected Mood:{" "}
        <span className="mood-tag">{analysis?.mood || "Not analyzed"}</span>
      </p>
    </div>

    {/* SOS Contacts */}
    <div className="review-box">
      <h4>SOS Contacts</h4>
      {sosContacts.length > 0 ? (
        <ul>
          {sosContacts.map((c, idx) => (
            <li key={idx}>
              {c.name} ({c.relation}) - {c.contact}
            </li>
          ))}
        </ul>
      ) : (
        <p>No SOS contact added</p>
      )}
    </div>

    {/* Actions */}
    <div className="actions">
  <button className="back-btn" onClick={prevStep}>← Back</button>
  <button className="next-btn" onClick={nextStep}>
    Confirm & Continue →
  </button>
</div>
  </div>
)}

{/* === Step 7: Congratulations === */}
{step === 7 && (
  <div className="screening-card finish-setup">
    <div className="finish-icon">🎉</div>
    <h2 className="finish-title">
      Awesome, {basicDetails.name?.toUpperCase() || "Friend"}!
    </h2>
    <p className="finish-subtitle">
      You’ve set up your CalmiVerse profile. Let’s begin your wellbeing journey.
    </p>
    <p className="finish-quote">
      "Remember: one small step today = a calmer tomorrow."
    </p>

    <button
  className="finish-btn"
  onClick={async () => {
    const success = await handleFinish();   // returns true/false
    if (success) {
      navigate("/");  // redirect only if save worked
    }
  }}
>
  Go to Dashboard
</button>
  </div>
)}




    </div>
  );
}

export default Screening;
