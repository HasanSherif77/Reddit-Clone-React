// Updated CommunitySidebar.jsx
import React from 'react';
import './CommunitySidebar.css';

const CommunitySidebar = ({ community }) => {
  const communityName = community?.name || "Community";
  const createdAt = community?.joinedAt ? new Date(community.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently";
  const isPrivate = false; // Default to public for discovered communities
  const stats = {
    members: community?.members ? parseInt(community.members.toString().replace(/[^\d]/g, '')) || 0 : 0,
    online: 0 // We don't have online data for discovered communities
  };

  const moderators = [
    { username: "u/Admin" } // Default moderator
  ];

  const handleMessageMods = () => {
    alert("Message mods functionality would go here");
  };

  const handleInviteMod = () => {
    alert("Invite mod functionality would go here");
  };

  const handleAddGuide = () => {
    alert("Add community guide functionality would go here");
  };

  const handleViewAllModerators = () => {
    alert("View all moderators functionality would go here");
  };

  const handleCommunityAppearance = () => {
    alert("Community appearance settings would open here");
  };

  const handleEditWidgets = () => {
    alert("Edit widgets functionality would go here");
  };

  return (
    <div className="community-sidebar">
      <div className="sidebar-section community-info">
        <div className="community-header">
          <b className="community-sidebar-subtitle">{communityName}</b>
        </div>
        <div className="community-meta">
          <div className="community-created">
            <strong>Created</strong> {createdAt}
          </div>
          <div className="community-status">
            {isPrivate ? "Private" : "Public"}
          </div>
        </div>
        
        <button className="btn-add-guide" onClick={handleAddGuide}>
          + Add a community guide
        </button>
      </div>

      <div className="sidebar-section insights">
        <div className="insights-header">
          <h3>Insights <span className="insights-period">Past week &gt;</span></h3>
        </div>
        <div className="stats-container">
          <div className="stat">
            <div className="stat-number">{stats.members.toLocaleString()}</div>
            <div className="stat-label">Members</div>
          </div>
          <div className="stat">
            <div className="stat-number">{stats.online.toLocaleString()}</div>
            <div className="stat-label">Online</div>
          </div>
        </div>
      </div>

      <div className="sidebar-section moderators">
        <h3>MODERATORS</h3>
        <div className="moderator-list">
          {moderators.map((mod, index) => (
            <div key={index} className="moderator">
              {mod.username}
            </div>
          ))}
        </div>
        <div className="mod-actions">
          <button className="btn-message-mods" onClick={handleMessageMods}>
            Message Mods
          </button>
          <button className="btn-invite-mod" onClick={handleInviteMod}>
            Invite Mod
          </button>
        </div>
        <button className="btn-view-mods" onClick={handleViewAllModerators}>
          View all moderators
        </button>
      </div>

      <div className="sidebar-section community-settings">
        <h3>COMMUNITY SETTINGS</h3>
        <button className="btn-settings" onClick={handleCommunityAppearance}>
          Community Appearance
        </button>
        <button className="btn-settings" onClick={handleEditWidgets}>
          Edit Widgets
        </button>
      </div>

      <div className="sidebar-footer">
        <div className="footer-links">
          <a href="#" className="footer-link">Reddit Rules</a>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">User Agreement</a>
          <a href="#" className="footer-link">Accessibility</a>
        </div>
        <div className="copyright">
          Reddit, Inc. © 2025. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default CommunitySidebar;