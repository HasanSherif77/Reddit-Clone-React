// src/Components/EditProfile/SettingRow.jsx
import React from "react";
import "./Settings.css";

// SettingRow component - a clickable settings item
// Props:
// - title: Setting title (required)
// - description: Setting description (optional)
// - onClick: Function to call when clicked (optional)
// - hasArrow: Show/hide the right arrow (default: true)
const SettingRow = ({ 
  title, 
  description, 
  onClick, 
  hasArrow = true 
}) => {
  // Handle click event
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event bubbling
    
    console.log(`Clicked: ${title}`);
    
    // Call onClick if provided
    if (onClick && typeof onClick === 'function') {
      onClick();
    } else {
      console.warn(`No onClick handler for: ${title}`);
    }
  };

  return (
    // Clickable button element
    <button 
      className={`setting-row ${!hasArrow ? 'no-arrow' : ''}`} 
      type="button"
      onClick={handleClick} // Attach click handler
      // Inline styles to ensure clickability
      style={{ 
        display: 'flex', 
        width: '100%', 
        background: 'none', 
        border: 'none',
        cursor: 'pointer',
        padding: '16px',
        textAlign: 'left'
      }}
    >
      {/* Text content container */}
      <div className="setting-row-text">
        {/* Setting title */}
        <div className="setting-row-title">{title}</div>
        {/* Optional description */}
        {description && (
          <div className="setting-row-description">{description}</div>
        )}
      </div>
      {/* Right arrow (only if hasArrow is true) */}
      {hasArrow && <span className="setting-row-arrow">›</span>}
    </button>
  );
};

export default SettingRow;