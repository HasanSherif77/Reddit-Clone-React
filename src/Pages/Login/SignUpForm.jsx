// SignUpForm.jsx - Page component with signup logic
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../Components/Login/AuthForm";
import { API_BASE } from "../../utils/api";

const SignUpForm = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          emailOrUsername, 
          password,
          confirmPassword 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Sign up failed");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Update parent state (App.js) if callback provided
      if (onAuthSuccess) {
        onAuthSuccess(data.user);
      } else {
        // Navigate to home page on successful signup
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
      title="Sign Up"
      emailOrUsername={emailOrUsername}
      setEmailOrUsername={setEmailOrUsername}
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
      submitText="Sign Up"
      isLoading={isLoading}
    />
  );
};

export default SignUpForm;