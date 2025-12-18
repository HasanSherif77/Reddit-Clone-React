// src/Components/EditProfile/PrivacySettings.jsx
import React from "react";
// Import components
import SettingRow from "./SettingRow";
import ToggleSwitch from "./ToggleSwitch";
import "./Settings.css"; // Import CSS for styling

// PrivacySettings component - contains privacy and visibility controls
const PrivacySettings = () => {
  return (
    <div className="privacy-settings">
      
      {/* SOCIAL INTERACTIONS Section - who can interact with you */}
      <section className="settings-section">
        {/* Section subtitle */}
        <h2 className="section-subtitle">Social interactions</h2>
        
        <div className="settings-card">
          {/* Allow people to follow you - toggle setting */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Allow people to follow you</div>
              <div className="setting-row-description">
                Let people follow you to see your profile posts in their home feed
              </div>
            </div>
            {/* Toggle switch */}
            <ToggleSwitch />
          </div>
          
          {/* Chat requests control */}
          <SettingRow
            title="Who can send you chat requests"
            description="Control who can send you chat requests"
          />
          
          {/* Blocked accounts management */}
          <SettingRow
            title="Blocked accounts"
            description="Manage accounts you've blocked"
          />
        </div>
      </section>

      {/* DISCOVERABILITY Section - profile visibility in search */}
      <section className="settings-section">
        <h2 className="section-subtitle">Discoverability</h2>
        
        <div className="settings-card">
          {/* Old Reddit profile listing - toggle setting */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">List your profile on old.reddit.com/users</div>
              <div className="setting-row-description">
                List your profile on old.reddit.com/users and allow posts to your profile to appear in /r/all
              </div>
            </div>
            <ToggleSwitch />
          </div>
          
          {/* Search engine visibility - toggle setting */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Show up in search results</div>
              <div className="setting-row-description">
                Allow search engines like Google to link to your profile in their search results
              </div>
            </div>
            <ToggleSwitch />
          </div>
        </div>
      </section>

      {/* ADVERTISING Section - ad personalization controls */}
      <section className="settings-section">
        <h2 className="section-subtitle">Advertising</h2>
        
        <div className="settings-card">
          {/* Ad personalization - toggle setting */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">
                Personalize ads on Reddit based on information and activity from our partners
              </div>
              <div className="setting-row-description">
                Allow us to use information from our partners to show you better ads on Reddit
              </div>
            </div>
            <ToggleSwitch />
          </div>
        </div>
      </section>

      {/* ADVANCED Section - additional privacy controls */}
      <section className="settings-section">
        <h2 className="section-subtitle">Advanced</h2>
        
        <div className="settings-card">
          {/* Download your data */}
          <SettingRow
            title="Download your data"
            description="Get a copy of your Reddit data"
          />
        </div>
      </section>

    </div>
  );
};

export default PrivacySettings;