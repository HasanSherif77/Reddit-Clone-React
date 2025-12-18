// src/Components/EditProfile/EmailSettings.jsx
import React from "react";
// Import components
import SettingRow from "./SettingRow";
import ToggleSwitch from "./ToggleSwitch";
import "./Settings.css"; // Import CSS for styling

// EmailSettings component - contains email notification controls
const EmailSettings = () => {
  return (
    <div className="email-settings">
      
      {/* EMAIL NOTIFICATIONS Section - email notification controls */}
      <section className="settings-section">
        {/* Section label in uppercase */}
        <div className="section-label">EMAIL NOTIFICATIONS</div>
        
        <div className="settings-card">
          {/* Unread message summary - toggle */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Unread message summary</div>
              <div className="setting-row-description">
                Weekly emails about your unread messages
              </div>
            </div>
            <ToggleSwitch />
          </div>
          
          {/* Activity updates - toggle */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Activity updates</div>
              <div className="setting-row-description">
                Emails about comments, upvotes, and other activity
              </div>
            </div>
            <ToggleSwitch />
          </div>
          
          {/* New user welcome - toggle */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">New user welcome</div>
              <div className="setting-row-description">
                Helpful tips for new Reddit users
              </div>
            </div>
            <ToggleSwitch />
          </div>
          
          {/* Marketing emails - toggle */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Marketing emails</div>
              <div className="setting-row-description">
                News, surveys, and special offers from Reddit
              </div>
            </div>
            <ToggleSwitch />
          </div>
        </div>
      </section>

      {/* EMAIL FREQUENCY Section - how often to receive emails */}
      <section className="settings-section">
        <h2 className="section-subtitle">Email frequency</h2>
        
        <div className="settings-card">
          {/* Email frequency setting */}
          <SettingRow
            title="How often you get emails"
            description="Choose how frequently you receive emails from Reddit"
          />
        </div>
      </section>

    </div>
  );
};

export default EmailSettings;