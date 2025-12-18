// src/Components/EditProfile/ToggleSwitch.jsx
import React from "react";
import "./Settings.css"; // Import CSS for styling

// ToggleSwitch component - a custom checkbox toggle
const ToggleSwitch = ({ checked = false }) => {
  return (
    // Label wrapping the toggle for better accessibility
    <label className="toggle-switch">
      {/* Hidden checkbox input */}
      <input type="checkbox" defaultChecked={checked} />
      {/* Visible slider part of the toggle */}
      <span className="toggle-switch-slider" />
    </label>
  );
};

export default ToggleSwitch;