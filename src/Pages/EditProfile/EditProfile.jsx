// src/Pages/EditProfile/EditProfile.jsx
import React from "react";
import "./Settings.css";

// Shared Layout Components
import TopBar from "../../Components/Shared/TopBar/TopBar";
import LeftSideBar from "../../Components/Shared/LeftSideBar/LeftSideBar";

// Settings Content Components
import SettingsHeader from "../../Components/EditProfile/SettingsHeader";
import GeneralSection from "../../Components/EditProfile/GeneralSection";
import CurateProfileSection from "../../Components/EditProfile/CurateProfileSection";
import AdvancedSection from "../../Components/EditProfile/AdvancedSection";

const EditProfile = () => {
  return (
    <div className="page settings-page">
      <TopBar />
      
      {/* 1. Grid Layout Wrapper (272px Sidebar | Content) */}
      <div className="settings-layout-wrapper">
        
        {/* Left Column: Sidebar */}
        <div className="settings-sidebar-container">
           <LeftSideBar />
        </div>
        
        {/* Right Column: Main Content Area */}
        <main className="settings-main-content">
          
          {/* 2. Content Limiter: This div has the max-width: 840px set in CSS. 
              It prevents all inner content from stretching across the screen. */}
          <div className="settings-content-limiter">
            <SettingsHeader />
            
            {/* 3. The actual content sections */}
            <div className="settings-body">
              <GeneralSection />
              <CurateProfileSection />
              <AdvancedSection />
            </div>
          </div>

        </main>

      </div>
    </div>
  );
};

export default EditProfile;