// src/Components/EditProfile/GeneralSection.jsx
import React from "react";

// Import components
import SettingRow from "./SettingRow";
import ToggleSwitch from "./ToggleSwitch";
import "./Settings.css"; // Import CSS for styling

// GeneralSection component - contains general profile settings
// Props:
// - onAvatarClick: Function to call when Avatar row is clicked
// - onDisplayNameClick: Function to call when Display Name row is clicked
// - onBioClick: Function to call when About Description row is clicked
const GeneralSection = ({ 
  onAvatarClick, 
  onDisplayNameClick, 
  onBioClick 
}) => {
  return (
    // General settings section container
    <section className="settings-section">
      {/* Section label (in uppercase) */}
      <div className="section-label">GENERAL</div>

      {/* Card containing all setting rows */}
      <div className="settings-card">
        {/* Display name setting - clickable */}
        <SettingRow
          title="Display name"
          description="Changing your display name won't change your username."
          onClick={onDisplayNameClick} // Opens display name modal
        />

        {/* About description setting - clickable */}
        <SettingRow
          title="About description"
          description="A short description that appears on your profile."
          onClick={onBioClick} // Opens bio modal
        />

        {/* Avatar setting - clickable */}
        <SettingRow
          title="Avatar"
          description="Edit your avatar or upload an image."
          onClick={onAvatarClick} // Opens avatar modal
        />

        {/* Banner setting (currently not clickable) */}
        <SettingRow
          title="Banner"
          description="Upload a profile background image."
          // onClick={onBannerClick} // Can add handler later
        />

        {/* Social links setting (currently not clickable) */}
        <SettingRow
          title="Social links"
          description="Add links to your social media accounts."
          // onClick={onSocialLinksClick} // Can add handler later
        />

        {/* Toggle setting (not clickable, contains a toggle switch) */}
        <div className="setting-row no-arrow">
          <div className="setting-row-text">
            <div className="setting-row-title">Mark as mature (18+)</div>
            <div className="setting-row-description">
              Label your profile as Not Safe for Work (NSFW) and ensure it's inaccessible to people under 18.
            </div>
          </div>
          {/* Toggle switch component */}
          <ToggleSwitch />
        </div>
      </div>
    </section>
  );
};

// Default props in case handlers aren't provided
// These will log to console for debugging
GeneralSection.defaultProps = {
  onAvatarClick: () => console.log('Avatar clicked'),
  onDisplayNameClick: () => console.log('Display name clicked'),
  onBioClick: () => console.log('Bio clicked')
};

export default GeneralSection;