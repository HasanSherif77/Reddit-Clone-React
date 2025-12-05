// src/Components/EditProfile/ToggleSwitch.jsx
import React from "react";

const ToggleSwitch = ({ checked = false }) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" defaultChecked={checked} />
      <span className="toggle-switch-slider" />
    </label>
  );
};

export default ToggleSwitch;
