import React from "react";
import defaultAvatar from "../../assets/default-avatars/default.svg";

const ProfileHeader = ({ displayname, username, avatarUrl, description }) => {
  return (
    <header className="profile-header">
      <div className="profile-banner">
        
      </div>

      <div className="profile-header-bottom">
        <div className="profile-avatar-wrapper">
          <img
            src={avatarUrl || defaultAvatar}
            alt="Avatar"
            className="profile-avatar"
          />
        </div>

        <div className="profile-name-block">
          <div className="profile-display-name">{displayname || username || "Unknown User"}</div>
          <div className="profile-username">u/{username || "unknown"}</div>
          {description && (
            <div className="profile-description" style={{ marginTop: '8px', color: '#7c7c7c', fontSize: '14px' }}>
              {description}
            </div>
          )}
        </div>

        <div className="profile-header-actions">
          <button className="btn-outline">Share</button>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
