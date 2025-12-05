// src/Pages/EditProfile/EditProfile.jsx
import React from "react";

// shared layout
import TopBar from "../../Components/Shared/TopBar/TopBar";
import LeftSideBar from "../../Components/Shared/LeftSideBar/LeftSideBar";

// settings content
import SettingsHeader from "../../Components/EditProfile/SettingsHeader";
import GeneralSection from "../../Components/EditProfile/GeneralSection";
import CurateProfileSection from "../../Components/EditProfile/CurateProfileSection";
import AdvancedSection from "../../Components/EditProfile/AdvancedSection";

// page styles
import "./Settings.css";

const EditProfilePage = () => {
  return (
    <div className="page settings-page">
      <TopBar />

      <div className="settings-layout-with-leftbar">
        <LeftSideBar />

        <main className="settings-main">
          <SettingsHeader />

          <section className="settings-content">
            <GeneralSection />
            <CurateProfileSection />
            <AdvancedSection />
          </section>
        </main>
      </div>
    </div>
  );
};

export default EditProfilePage;
