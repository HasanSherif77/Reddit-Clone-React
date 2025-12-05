// src/Components/EditProfile/CurateProfileSection.jsx
import React from "react";
import SettingRow from "./SettingRow";

const CurateProfileSection = () => {
  return (
    <section className="settings-section">
      <h2 className="settings-subtitle-heading">Curate your profile</h2>

      <div className="settings-section-card">
        <SettingRow
          title="Content and activity"
          description="Posts, comments, and communities you’re active in."
        />

        <SettingRow
          title="Profile visibility"
          description="Control who can see your profile content."
        />
      </div>
    </section>
  );
};

export default CurateProfileSection;
