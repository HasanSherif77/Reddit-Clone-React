// src/Components/EditProfile/AdvancedSection.jsx
import React from "react";
import SettingRow from "./SettingRow"; // Import SettingRow component
import "./Settings.css"; // Import CSS for styling

const AdvancedSection = () => {
  return (
    // Advanced settings section
    <section className="settings-section">
      {/* Section subtitle */}
      <h2 className="section-subtitle">Advanced</h2>

      {/* Card containing setting rows */}
      <div className="settings-card">
        {/* Profile moderation tools setting */}
        <SettingRow
          title="Profile moderation tools"
          description="Access tools to help you moderate your profile."
        />
      </div>
    </section>
  );
};

export default AdvancedSection;