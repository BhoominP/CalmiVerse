import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now just a mock authentication
    if (email && password) {
      // ✅ After successful login redirect to dashboard
      navigate("/");
    } else {
      alert("Please enter email and password!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <p className="auth-subtitle">Enter your email below to login to your account.</p>

        <button className="google-btn">Login with Google</button>

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
