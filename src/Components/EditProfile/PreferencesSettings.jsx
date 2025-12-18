// src/Components/EditProfile/PreferencesSettings.jsx
import React from "react";
// Import components
import SettingRow from "./SettingRow";
import ToggleSwitch from "./ToggleSwitch";
import "./Settings.css"; // Import CSS for styling

// PreferencesSettings component - contains user preference controls
const PreferencesSettings = () => {
  return (
    <div className="preferences-settings">
      
      {/* LANGUAGE Section - language preferences */}
      <section className="settings-section">
        <h2 className="section-subtitle">Language</h2>
        
        <div className="settings-card">
          {/* Display language setting */}
          <SettingRow
            title="Display language"
            description="Choose your preferred language"
          />
          
          {/* Content languages setting */}
          <SettingRow
            title="Content languages"
            description="Choose which languages you want to see content in"
          />
        </div>
      </section>

      {/* CONTENT Section - content filtering and display */}
      <section className="settings-section">
        <h2 className="section-subtitle">Content</h2>
        
        <div className="settings-card">
          {/* Mature content toggle */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Show mature content (I'm over 18)</div>
              <div className="setting-row-description">
                See Not Safe for Work mature and adult content in your feeds and search results
              </div>
            </div>
            <ToggleSwitch />
          </div>
          
          {/* Blur mature images toggle */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Blur mature (18+) images and media</div>
              <div className="setting-row-description">
                Blur Not Safe for Work images and media in your feeds
              </div>
            </div>
            <ToggleSwitch />
          </div>
          
          {/* Home feed recommendations */}
          <SettingRow
            title="Show recommendations in home feed"
            description="See recommended posts in your home feed"
          />
          
          {/* Muted communities management */}
          <SettingRow
            title="Muted communities"
            description="Manage communities you've muted"
          />
        </div>
      </section>

      {/* ACCESSIBILITY Section - accessibility features */}
      <section className="settings-section">
        <h2 className="section-subtitle">Accessibility</h2>
        
        <div className="settings-card">
          {/* Autoplay media control */}
          <SettingRow
            title="Autoplay media"
            description="Control autoplay settings for videos and GIFs"
          />
          
          {/* Reduce motion toggle */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Reduce Motion</div>
              <div className="setting-row-description">
                Reduce animations and motion effects
              </div>
            </div>
            <ToggleSwitch />
          </div>
        </div>
      </section>

    </div>
  );
};

export default PreferencesSettings;