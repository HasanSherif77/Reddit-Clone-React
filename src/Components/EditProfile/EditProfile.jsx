// src/Pages/EditProfile/EditProfile.jsx
import React, { useState } from "react";
// Import header component
import SettingsHeader from "../../Components/EditProfile/SettingsHeader";
// Import profile settings component
import ProfileSettings from "../../Components/EditProfile/ProfileSettings";
// Import CSS
import "../../Components/EditProfile/Settings.css";

// Main EditProfile page component
const EditProfile = () => {
  // State for active tab - default is Profile
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    // Main container with Reddit's gray background
    <div className="reddit-edit-profile-page">
      
      {/* Layout container */}
      <div className="edit-profile-container">
        
        {/* Main content area */}
        <div className="edit-profile-main">
          <div className="edit-profile-content">
            
            {/* Header with tabs */}
            <SettingsHeader activeTab={activeTab} onTabChange={setActiveTab} />
            
            {/* Profile settings content */}
            <div className="profile-sections">
              <ProfileSettings />
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default EditProfile;