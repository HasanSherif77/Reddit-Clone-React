// src/Pages/EditProfile/EditProfile.jsx
import React, { useState } from "react";

// Import sidebar and settings components
import SettingsSidebar from "../../Components/EditProfile/SettingsSidebar";
import SettingsHeader from "../../Components/EditProfile/SettingsHeader";
import GeneralSection from "../../Components/EditProfile/GeneralSection";
import CurateProfileSection from "../../Components/EditProfile/CurateProfileSection";
import AdvancedSection from "../../Components/EditProfile/AdvancedSection";

// Import modal components
import {
  EditAvatarModal,
  EditDisplayNameModal,
  EditBioModal
} from "../../Components/EditProfile/Modals";

// Import CSS files
import "../../Components/EditProfile/Settings.css";
import "../../Components/EditProfile/Modals/Modals.css";

const EditProfile = () => {
  // State to track which modal is currently open
  // Possible values: 'avatar', 'displayName', 'bio', or null
  const [activeModal, setActiveModal] = useState(null);
  
  // State for user data (in a real app, this would come from backend/API)
  const [userData, setUserData] = useState({
    displayName: "JohnDoe",
    bio: "I love programming and cats!",
    avatar: null,
    isMature: false
  });

  // Functions to open specific modals
  const openAvatarModal = () => setActiveModal('avatar');
  const openDisplayNameModal = () => setActiveModal('displayName');
  const openBioModal = () => setActiveModal('bio');
  
  // Function to close any modal
  const closeModal = () => setActiveModal(null);

  // Function to update user data
  const updateUserData = (field, value) => {
    setUserData(prev => ({
      ...prev, // Keep existing data
      [field]: value // Update specific field
    }));
  };

  return (
    // Main container for the entire edit profile page
    <div className="reddit-edit-profile-page">
      
      {/* Render modals conditionally based on activeModal state */}
      
      {/* Avatar editing modal */}
      <EditAvatarModal
        isOpen={activeModal === 'avatar'}
        onClose={closeModal}
        currentAvatar={userData.avatar}
        onSave={(newAvatar) => updateUserData('avatar', newAvatar)}
      />
      
      {/* Display name editing modal */}
      <EditDisplayNameModal
        isOpen={activeModal === 'displayName'}
        onClose={closeModal}
        currentName={userData.displayName}
        onSave={(newName) => updateUserData('displayName', newName)}
      />
      
      {/* Bio editing modal */}
      <EditBioModal
        isOpen={activeModal === 'bio'}
        onClose={closeModal}
        currentBio={userData.bio}
        onSave={(newBio) => updateUserData('bio', newBio)}
      />

      {/* Main layout wrapper for sidebar + content */}
      <div className="edit-profile-container">
        
        {/* Left sidebar navigation menu */}
        <SettingsSidebar />
        
        {/* Main content area (right side) */}
        <div className="edit-profile-main">
          <div className="edit-profile-content">
            
            {/* Page header with title */}
            <SettingsHeader />
            
            {/* Container for all profile setting sections */}
            <div className="profile-sections">
              
              {/* General profile settings section with modal handlers */}
              <GeneralSection
                onAvatarClick={openAvatarModal}
                onDisplayNameClick={openDisplayNameModal}
                onBioClick={openBioModal}
              />
              
              {/* Profile curation settings section */}
              <CurateProfileSection />
              
              {/* Advanced profile settings section */}
              <AdvancedSection />
              
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default EditProfile;