import React from "react";
import "../styles/auth.css";

function SignUp() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <p>Sign up for free to access all our products</p>

        <button className="social-btn google">Continue with Google</button>
        <button className="social-btn twitter">Continue with Twitter</button>

        <form className="auth-form">
          <label>Email Address</label>
          <input type="email" placeholder="designer@gmail.com" required />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />

          <div className="checkbox">
            <input type="checkbox" required />
            <span>
              Agree to our <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>
            </span>
          </div>

          <button type="submit" className="primary-btn">Sign Up</button>
        </form>

        <p className="auth-footer">
          Already have an account? <a href="/signin">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
