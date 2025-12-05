// src/Components/EditProfile/SettingsHeader.jsx
import React from "react";

const TABS = ["Account", "Profile", "Privacy", "Preferences", "Notifications", "Email"];

const SettingsHeader = () => {
  return (
    <header className="settings-header">
      <h1 className="settings-title">Settings</h1>

      <nav className="settings-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={
              "settings-tab" + (tab === "Profile" ? " settings-tab--active" : "")
            }
            type="button"
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default SettingsHeader;
