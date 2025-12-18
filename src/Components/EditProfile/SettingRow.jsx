// src/Components/EditProfile/SettingRow.jsx
import React from "react";
import "./Settings.css";

// SettingRow component - a clickable settings item that opens modals
// Props:
// - title: The main text of the setting (required)
// - description: Additional explanatory text (optional)
// - onClick: Function to call when the row is clicked (optional)
// - hasArrow: Whether to show the right arrow icon (default: true)
const SettingRow = ({ 
  title, 
  description, 
  onClick, 
  hasArrow = true 
}) => {
  return (
    // Clickable button for each setting
    // Add 'no-arrow' class if hasArrow is false
    <button 
      className={`setting-row ${!hasArrow ? 'no-arrow' : ''}`} 
      type="button"
      onClick={onClick} // Call the onClick handler when clicked
    >
      {/* Container for text content */}
      <div className="setting-row-text">
        {/* Main setting title */}
        <div className="setting-row-title">{title}</div>
        {/* Optional description - only shown if provided */}
        {description && (
          <div className="setting-row-description">{description}</div>
        )}
      </div>
      {/* Right arrow icon - only shown if hasArrow is true */}
      {hasArrow && <span className="setting-row-arrow">›</span>}
    </button>
  );
};

export default SettingRow;