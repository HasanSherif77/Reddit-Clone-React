// src/Components/EditProfile/AccountSettings.jsx
import React from "react";
// Import components
import SettingRow from "./SettingRow";
import ToggleSwitch from "./ToggleSwitch";
import "./Settings.css"; // Import CSS for styling

// AccountSettings component - contains account-related settings
const AccountSettings = () => {
  return (
    <div className="account-settings">
      
      {/* GENERAL Section - basic account information */}
      <section className="settings-section">
        {/* Section label in uppercase */}
        <div className="section-label">GENERAL</div>
        
        {/* Card containing setting rows */}
        <div className="settings-card">
          {/* Email address setting */}
          <SettingRow
            title="Email address"
            description="Manage your email address and email preferences"
          />
          
          {/* Gender setting */}
          <SettingRow
            title="Gender"
            description="Share your gender identity on Reddit"
          />
          
          {/* Location customization setting */}
          <SettingRow
            title="Location customization"
            description="Allow Reddit to use your location to customize your experience"
          />
        </div>
      </section>

      {/* ACCOUNT AUTHORIZATION Section - third-party login connections */}
      <section className="settings-section">
        <div className="section-label">ACCOUNT AUTHORIZATION</div>
        <div className="settings-card">
          {/* Google login connection */}
          <SettingRow
            title="Google"
            description="Connect to log in to Reddit with your Google account"
          />
          
          {/* Apple login connection */}
          <SettingRow
            title="Apple"
            description="Connect to log in to Reddit with your Apple account"
          />
          
          {/* Two-factor authentication */}
          <SettingRow
            title="Two-factor authentication"
            description="Add an extra layer of security to your account"
          />
        </div>
      </section>

      {/* REDDIT PREMIUM Section - premium subscription */}
      <section className="settings-section">
        <div className="section-label">REDDIT PREMIUM</div>
        <div className="settings-card">
          {/* Premium subscription */}
          <SettingRow
            title="Get premium"
            description="Ad-free browsing, exclusive features, and more"
          />
        </div>
      </section>

    </div>
  );
};

export default AccountSettings;