// src/Components/EditProfile/AdvancedSection.jsx
import React from "react";
import SettingRow from "./SettingRow";

const AdvancedSection = () => {
  return (
    <section className="settings-section">
      <h2 className="settings-subtitle-heading">Advanced</h2>

      <div className="settings-section-card">
        <SettingRow
          title="Profile moderation tools"
          description="Access tools to help you moderate your profile."
        />
      </div>
    </section>
  );
};

export default AdvancedSection;
