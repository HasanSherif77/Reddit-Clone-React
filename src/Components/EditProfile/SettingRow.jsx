// src/Components/EditProfile/SettingRow.jsx
import React from "react";

const SettingRow = ({ title, description }) => {
  return (
    <button className="setting-row" type="button">
      <div className="setting-row-text">
        <div className="setting-row-title">{title}</div>
        {description && (
          <div className="setting-row-description">{description}</div>
        )}
      </div>
      <span className="setting-row-arrow">›</span>
    </button>
  );
};

export default SettingRow;
