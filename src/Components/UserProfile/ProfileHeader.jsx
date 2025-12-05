import React from "react";

const ProfileHeader = () => {
  return (
    <header className="profile-header">
      <div className="profile-banner">
        
      </div>

      <div className="profile-header-bottom">
        <div className="profile-avatar-wrapper">
          <img
            src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_7.png"
            alt="Avatar"
            className="profile-avatar"
          />
        </div>

        <div className="profile-name-block">
          <div className="profile-display-name">IllHistory3645</div>
          <div className="profile-username">u/IllHistory3645</div>
        </div>

        <div className="profile-header-actions">
          <button className="btn-outline">Share</button>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
