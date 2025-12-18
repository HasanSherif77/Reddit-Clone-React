// src/Components/EditProfile/NotificationsSettings.jsx
import React from "react";
// Import components
import SettingRow from "./SettingRow";
import ToggleSwitch from "./ToggleSwitch";
import "./Settings.css"; // Import CSS for styling

// NotificationsSettings component - contains notification controls
const NotificationsSettings = () => {
  return (
    <div className="notifications-settings">
      
      {/* MESSAGES Section - message notification controls */}
      <section className="settings-section">
        <h2 className="section-subtitle">Messages</h2>
        
        <div className="settings-card">
          {/* Admin notifications */}
          <SettingRow
            title="Admin notifications"
            description="Important updates from Reddit admins"
          />
          
          {/* Chat requests notifications */}
          <SettingRow
            title="Chat requests"
            description="When someone requests to chat with you"
          />
        </div>
      </section>

      {/* ACTIVITY Section - activity notification controls */}
      <section className="settings-section">
        <h2 className="section-subtitle">Activity</h2>
        
        <div className="settings-card">
          {/* Comments on posts notifications - toggle */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Comments on your posts</div>
              <div className="setting-row-description">
                When someone comments on your posts
              </div>
            </div>
            <ToggleSwitch />
          </div>
          
          {/* Replies to comments notifications - toggle */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Replies to your comments</div>
              <div className="setting-row-description">
                When someone replies to your comments
              </div>
            </div>
            <ToggleSwitch />
          </div>
          
          {/* Upvotes on posts notifications - toggle */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Upvotes on your posts</div>
              <div className="setting-row-description">
                When someone upvotes your posts
              </div>
            </div>
            <ToggleSwitch />
          </div>
          
          {/* Upvotes on comments notifications - toggle */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Upvotes on your comments</div>
              <div className="setting-row-description">
                When someone upvotes your comments
              </div>
            </div>
            <ToggleSwitch />
          </div>
          
          {/* Username mentions notifications - toggle */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Username mentions</div>
              <div className="setting-row-description">
                When someone mentions your username
              </div>
            </div>
            <ToggleSwitch />
          </div>
          
          {/* New followers notifications - toggle */}
          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">New followers</div>
              <div className="setting-row-description">
                When someone starts following you
              </div>
            </div>
            <ToggleSwitch />
          </div>
        </div>
      </section>

    </div>
  );
};

export default NotificationsSettings;