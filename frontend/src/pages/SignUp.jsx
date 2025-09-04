import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css"; // keep this for signup styling

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Signup with:", { email, password });

    // ✅ After signup success → go to screening flow
    navigate("/screening");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>
        <p className="auth-subtitle">Enter your information to create an account.</p>

        <button className="google-btn">🔑 Sign up with Google</button>
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

          {/* Submit triggers handleSubmit → navigates to /screening */}
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
