// src/Components/EditProfile/ProfileSettings.jsx
import React, { useState } from "react";
// Import modals
import {
  EditAvatarModal,
  EditDisplayNameModal,
  EditBioModal
} from "./Modals";
// Import components
import SettingRow from "./SettingRow";
import ToggleSwitch from "./ToggleSwitch";
import "./Settings.css";

const ProfileSettings = () => {
  const [activeModal, setActiveModal] = useState(null);
  
  const [userData, setUserData] = useState({
    displayName: "JohnDoe",
    bio: "I love programming and cats!",
    avatar: null,
    isMature: false
  });

  const openDisplayNameModal = () => {
    console.log("Opening display name modal");
    setActiveModal('displayName');
  };

  const openBioModal = () => {
    console.log("Opening bio modal");
    setActiveModal('bio');
  };

  const openAvatarModal = () => {
    console.log("Opening avatar modal");
    setActiveModal('avatar');
  };

  const closeModal = () => {
    console.log("Closing modal");
    setActiveModal(null);
  };

  return (
    <div className="profile-settings">
      
      <EditDisplayNameModal
        isOpen={activeModal === 'displayName'}
        onClose={closeModal}
        currentName={userData.displayName}
      />
      
      <EditBioModal
        isOpen={activeModal === 'bio'}
        onClose={closeModal}
        currentBio={userData.bio}
      />
      
      <EditAvatarModal
        isOpen={activeModal === 'avatar'}
        onClose={closeModal}
        currentAvatar={userData.avatar}
      />

      <section className="settings-section">
        <div className="section-label">GENERAL</div>

        <div className="settings-card">
          <SettingRow
            title="Display name"
            description="Changing your display name won't change your username."
            onClick={openDisplayNameModal}
          />

          <SettingRow
            title="About description"
            description="A short description that appears on your profile."
            onClick={openBioModal}
          />

          <SettingRow
            title="Avatar"
            description="Edit your avatar or upload an image."
            onClick={openAvatarModal}
          />

          <SettingRow
            title="Banner"
            description="Upload a profile background image."
          />

          <SettingRow
            title="Social links"
            description="Add links to your social media accounts."
          />

          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Mark as mature (18+)</div>
              <div className="setting-row-description">
                Label your profile as Not Safe for Work (NSFW) and ensure it's inaccessible to people under 18.
              </div>
            </div>
            <ToggleSwitch />
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h2 className="section-subtitle">Curate your profile</h2>
        <div className="settings-card">
          <SettingRow
            title="Content and activity"
            description="Posts, comments, and communities you're active in."
          />
          <SettingRow
            title="Profile visibility"
            description="Control who can see your profile content."
          />
        </div>
      </section>

      <section className="settings-section">
        <h2 className="section-subtitle">Advanced</h2>
        <div className="settings-card">
          <SettingRow
            title="Profile moderation tools"
            description="Access tools to help you moderate your profile."
          />
        </div>
      </section>

    </div>
  );
};

export default ProfileSettings;