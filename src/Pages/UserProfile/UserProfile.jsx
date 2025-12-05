// src/Pages/UserProfile/UserProfile.jsx
import React from "react";

// Shared layout components
import TopBar from "../../Components/Shared/TopBar/TopBar";
import LeftSideBar from "../../Components/Shared/LeftSideBar/LeftSideBar";

// User profile specific components
import ProfileHeader from "../../Components/UserProfile/ProfileHeader";
import ProfileTabs from "../../Components/UserProfile/ProfileTabs";
import FeedControls from "../../Components/UserProfile/FeedControls";
import EmptyState from "../../Components/UserProfile/EmptyState";
import UserStatsCard from "../../Components/UserProfile/UserStatsCard";
import AchievementsCard from "../../Components/UserProfile/AchievementsCard";
import SidebarSettingsWidget from "../../Components/UserProfile/SidebarSettingsWidget";

// CSS for this page (Updated path to current folder)
import "./UserProfile.css";

const UserProfilePage = () => {
  // Temporary data for the UserStatsCard to prevent crashing
  const mockUser = {
    followers: 142,
    karma: 3200,
    cakeDay: "Oct 24, 2021",
    contributions: 1250
  };

  return (
    <div className="page user-profile-page">
      {/* Top navigation bar */}
      <TopBar />

      <div className="layout-with-leftbar">
        {/* Left sidebar menu */}
        <LeftSideBar />

        {/* Main profile content area */}
        <main className="user-profile-layout">
          <section>
            <ProfileHeader />
            <ProfileTabs />
            <FeedControls />
            <EmptyState />
          </section>

          {/* Right sidebar area */}
          <aside className="user-profile-sidebar">
            {/* Pass the mockUser data to the card here */}
            <UserStatsCard user={mockUser} />
            <AchievementsCard />
            <SidebarSettingsWidget />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;