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
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Update parent state (App.js) if callback provided
      if (onAuthSuccess) {
        onAuthSuccess(data.user);
      } else {
        // Navigate to home page on successful login
        navigate("/");
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