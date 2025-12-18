// src/Pages/EditProfile/EditProfile.jsx
import React, { useState } from "react";

// Import header
import SettingsHeader from "../../Components/EditProfile/SettingsHeader";

// Import ALL settings pages
import ProfileSettings from "../../Components/EditProfile/ProfileSettings";
import AccountSettings from "../../Components/EditProfile/AccountSettings";
import PrivacySettings from "../../Components/EditProfile/PrivacySettings";
import PreferencesSettings from "../../Components/EditProfile/PreferencesSettings";
import NotificationsSettings from "../../Components/EditProfile/NotificationsSettings";
import EmailSettings from "../../Components/EditProfile/EmailSettings";

// Import CSS
import "../../Components/EditProfile/Settings.css";

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  // Function to render different settings pages
  const renderSettingsContent = () => {
    switch (activeTab) {
      case "Account":
        return <AccountSettings />;
      case "Profile":
        return <ProfileSettings />;
      case "Privacy":
        return <PrivacySettings />;
      case "Preferences":
        return <PreferencesSettings />;
      case "Notifications":
        return <NotificationsSettings />;
      case "Email":
        return <EmailSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="reddit-edit-profile-page">
      <div className="edit-profile-container">
        <div className="edit-profile-main">
          <div className="edit-profile-content">
            
            {/* Header with tabs */}
            <SettingsHeader activeTab={activeTab} onTabChange={setActiveTab} />
            
            {/* Dynamic content based on active tab */}
            <div className="profile-sections">
              {renderSettingsContent()}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;