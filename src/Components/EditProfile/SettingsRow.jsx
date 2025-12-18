// src/Components/EditProfile/SettingRow.jsx
import React from "react";
import "./Settings.css";

const SettingRow = ({ title, description, onClick, hasArrow = true }) => {
  return (
    <button 
      className={`setting-row ${!hasArrow ? 'no-arrow' : ''}`} 
      type="button"
      onClick={onClick || (() => console.log(`${title} clicked`))}
      style={{ 
        display: 'flex', 
        width: '100%', 
        background: 'none', 
        border: 'none',
        cursor: 'pointer'
      }}
    >
      <div className="setting-row-text">
        <div className="setting-row-title">{title}</div>
        {description && (
          <div className="setting-row-description">{description}</div>
        )}
      </div>
      {hasArrow && <span className="setting-row-arrow">›</span>}
    </button>
  );
};

export default SettingRow;