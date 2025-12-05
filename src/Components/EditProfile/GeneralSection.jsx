// src/Components/EditProfile/GeneralSection.jsx
import React from "react";
import SettingRow from "./SettingRow";
import ToggleSwitch from "./ToggleSwitch";

const GeneralSection = () => {
  return (
    <section className="settings-section">
      <div className="settings-section-label">GENERAL</div>

      <div className="settings-section-card">
        <SettingRow
          title="Display name"
          description="Changing your display name won’t change your username."
        />

        <SettingRow
          title="About description"
          description="A short description that appears on your profile."
        />

        <SettingRow
          title="Avatar"
          description="Edit your avatar or upload an image."
        />

        <SettingRow
          title="Banner"
          description="Upload a profile background image."
        />

        <SettingRow
          title="Social links"
          description="Add links to your social media accounts."
        />

        <div className="setting-row setting-row--no-arrow">
          <div className="setting-row-text">
            <div className="setting-row-title">Mark as mature (18+)</div>
            <div className="setting-row-description">
              Label your profile as Not Safe for Work (NSFW) and ensure it&apos;s
              inaccessible to people under 18.
            </div>
          </div>
          <ToggleSwitch />
        </div>
      </div>
    </section>
  );
};

export default GeneralSection;
