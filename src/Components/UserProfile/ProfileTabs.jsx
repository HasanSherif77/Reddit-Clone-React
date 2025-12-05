// src/Components/UserProfile/ProfileTabs.jsx
import React, { useState } from "react";

const tabs = [
  "Overview",
  "Posts",
  "Comments",
  "Saved",
  "History",
  "Hidden",
  "Upvoted",
  "Downvoted",
];

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <nav className="profile-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={
            tab === activeTab ? "profile-tab profile-tab--active" : "profile-tab"
          }
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default ProfileTabs;
