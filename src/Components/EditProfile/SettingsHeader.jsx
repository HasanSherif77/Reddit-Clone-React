// src/Components/EditProfile/SettingsHeader.jsx
import React from "react";
import "./Settings.css";

const SettingsHeader = ({ activeTab, onTabChange }) => {
  const TABS = ["Account", "Profile", "Privacy", "Preferences", "Notifications", "Email", "My Posts"];

  return (
    <header className="settings-header">
      {/* Page title */}
      <h1 className="settings-title">Settings</h1>

      {/* Tabs navigation - NO LEFT SIDEBAR */}
      <div className="settings-tabs-container">
        <div className="settings-tabs-wrapper">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`settings-tab ${tab === activeTab ? "settings-tab--active" : ""}`}
              type="button"
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Bottom line under tabs */}
        <div className="tabs-bottom-line"></div>
      </div>
    </header>
  );
};

export default SettingsHeader;