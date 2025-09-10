import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase"; // ✅ Firebase config
import "../styles/auth.css";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // === Email/Password Login ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Logged in:", userCredential.user.email);

      // redirect to dashboard
      navigate("/");
    } catch (error) {
      console.error("❌ Login error:", error.message);
      alert(error.message);
    }
  };

  // === Google Login ===
  const handleGoogleSignin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider); // 🚀 opens account picker
      const user = result.user;

      console.log("✅ Google login success:", user.email);

      navigate("/"); // redirect to dashboard
    } catch (error) {
      console.error("❌ Google login error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <p className="auth-subtitle">Enter your email below to login to your account.</p>

        {/* Google Login */}
        <button className="google-btn" onClick={handleGoogleSignin}>
          🔑 Login with Google
        </button>

        <div className="divider">OR CONTINUE WITH</div>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@example.com" 
            required 
          />

          <label>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />

          <button type="submit" className="submit-btn">Sign in</button>
        </form>

        <p className="switch-auth">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
