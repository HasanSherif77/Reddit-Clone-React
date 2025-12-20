// SignUpForm.jsx - Page component with signup logic
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../Components/Login/AuthForm";
import { API_BASE } from "../../utils/api";

const SignUpForm = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setError("");

    // Validation
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/users/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username,
          email, 
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || "Sign up failed");
        return;
      }

      // Clear all vote-related localStorage items from any previous session
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
      title="Sign Up"
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      error={error}
      onSubmit={handleSignUp}
      switchText="Already have an account?"
      switchLinkText="Log In"
      onSwitch={() => navigate("/login")}
      showConfirmPassword={true}
      showUsername={true}
      showEmail={true}
      submitText="Sign Up"
      isLoading={isLoading}
    />
  );
};

export default SignUpForm;