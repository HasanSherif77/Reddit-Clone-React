// AuthForm.jsx - Reusable form component
import React from "react";
import "./AuthForm.css";
import googleLogo from "../../assets/google.svg";
import appleLogo from "../../assets/apple.svg";

const AuthForm = ({
  title,
  emailOrUsername,
  setEmailOrUsername,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  onSubmit,
  switchText,
  switchLinkText,
  onSwitch,
  showConfirmPassword = false,
  showUsername = false,
  showEmail = false,
  submitText = "Submit",
  isLoading = false
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="auth-content">
      <img
        src="https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png"
        className="reddit-logo"
        alt="Reddit"
      />

      <h2 className="auth-title">{title}</h2>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit}>
        {showUsername && (
          <input
            className="auth-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        )}

        {showEmail && (
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        )}

        {!showUsername && !showEmail && (
          <input
            className="auth-input"
            type="text"
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            disabled={isLoading}
          />
        )}

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        {showConfirmPassword && (
          <input
            className="auth-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
        )}

        <button 
          className="auth-btn login-btn" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : submitText}
        </button>
      </form>

      <p className="switch-text">
        {switchText}
        <span className="switch-link" onClick={onSwitch}> {switchLinkText}</span>
      </p>

      <div className="divider">
        <span>OR CONTINUE WITH</span>
      </div>

      <button className="social-btn" type="button" disabled={isLoading}>
        <img src={googleLogo} alt="Google" className="social-icon" /> Continue with Google
      </button>

      <button className="social-btn" type="button" disabled={isLoading}>
        <img src={appleLogo} alt="Apple" className="social-icon" /> Continue with Apple
      </button>
    </div>
  );
};

export default AuthForm;