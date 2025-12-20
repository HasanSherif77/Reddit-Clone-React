// LoginForm.jsx - Page component with login logic
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../Components/Login/AuthForm";
import { API_BASE } from "../../utils/api";

const LoginForm = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email : emailOrUsername, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Clear all vote-related localStorage items from previous user
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('vote_') || key.startsWith('comment_vote_')) {
          localStorage.removeItem(key);
        }
      });

      // Save token to localStorage for backend communication
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Save userId if available
      let userId = null;
      if (data.user?.id || data.user?._id || data.userId) {
        userId = data.user?.id || data.user?._id || data.userId;
        localStorage.setItem("userId", userId);
      }

      // Dispatch event to notify components of auth change
      window.dispatchEvent(new Event('authChanged'));

      // Update parent state (App.js) if callback provided
      if (onAuthSuccess) {
        onAuthSuccess(data.user);
      } else {
        // Navigate to home page with isSignedIn=true
        if (userId) {
          navigate(`/feed/${userId}`);
        } else {
          navigate("/");
        }
      }

    } catch (err) {
      setError("Network error");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      title="Log In"
      emailOrUsername={emailOrUsername}
      setEmailOrUsername={setEmailOrUsername}
      password={password}
      setPassword={setPassword}
      error={error}
      onSubmit={handleLogin}
      switchText="New to Reddit?"
      switchLinkText="Sign Up"
      onSwitch={() => navigate("/signup")}
      submitText="Log In"
      isLoading={isLoading}
    />
  );
};

export default LoginForm;