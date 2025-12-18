// src/Pages/EditProfile/EditProfile.jsx
import React, { useState } from "react";
import TopBar from "../../Components/Shared/TopBar/TopBar";
import LeftSideBar from "../../Components/Shared/LeftSideBar/LeftSideBar";

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
import "./EditProfile.css";

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(true);

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
    <div className="App">
      <TopBar isSignedIn={isSignedIn} />
      <div className="leftsidebar-layout">
        <LeftSideBar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
          isSignedIn={isSignedIn}
        />
        <main className="edit-profile-content">
          <div className="edit-profile-container">
            <div className="edit-profile-main">
              {/* Header with tabs */}
              <SettingsHeader activeTab={activeTab} onTabChange={setActiveTab} />
              
              {/* Dynamic content based on active tab */}
              <div className="profile-sections">
                {renderSettingsContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;