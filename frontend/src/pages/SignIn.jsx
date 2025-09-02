import React from "react";
import "../styles/auth.css";

function SignIn() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In Page</h2>

        <button className="social-btn google">Google</button>
        <button className="social-btn twitter">Twitter</button>

        <div className="divider">OR</div>

        <form className="auth-form">
          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />

          <div className="forgot">
            <a href="#">Forgot your password?</a>
          </div>

          <button type="submit" className="primary-btn">Sign In</button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
