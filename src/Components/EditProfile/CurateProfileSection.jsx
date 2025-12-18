// src/Components/EditProfile/CurateProfileSection.jsx
import React from "react";
import SettingRow from "./SettingRow"; // Import SettingRow component
import "./Settings.css"; // Import CSS for styling

const CurateProfileSection = () => {
  return (
    // Curate profile settings section
    <section className="settings-section">
      {/* Section subtitle */}
      <h2 className="section-subtitle">Curate your profile</h2>

      {/* Card containing setting rows */}
      <div className="settings-card">
        {/* Content and activity setting */}
        <SettingRow
          title="Content and activity"
          description="Posts, comments, and communities you're active in."
        />

        {/* Profile visibility setting */}
        <SettingRow
          title="Profile visibility"
          description="Control who can see your profile content."
        />
      </div>
    </section>
  );
};

export default CurateProfileSection;