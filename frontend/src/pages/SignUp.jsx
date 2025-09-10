import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase"; // ✅ Firebase config
import "../styles/auth.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // === Email/Password Sign Up ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ User created with email:", email);

      navigate("/screening"); // go to screening flow
    } catch (error) {
      console.error("❌ Signup error:", error.message);
      alert(error.message);
    }
  };

  // === Google Sign Up ===
  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider); // 🚀 opens account picker
      const user = result.user;

      console.log("✅ Google signup success:", user.email);

      navigate("/screening"); // go to screening flow
    } catch (error) {
      console.error("❌ Google signup error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>
        <p className="auth-subtitle">Enter your information to create an account.</p>

        {/* Google Sign Up */}
        <button className="google-btn" onClick={handleGoogleSignup}>
          🔑 Sign up with Google
        </button>

        <div className="divider">OR CONTINUE WITH</div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">Sign up</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
