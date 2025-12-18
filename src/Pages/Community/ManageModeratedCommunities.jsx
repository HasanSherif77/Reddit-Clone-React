// ManageModeratedCommunities.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../Components/Shared/TopBar/TopBar';
import LeftSideBar from '../../Components/Shared/LeftSideBar/LeftSideBar';
import { useCommunities } from '../../Components/Community/CommunityContext';
import './ManageModeratedCommunities.css';

const ManageModeratedCommunities = () => {
  const navigate = useNavigate();
  const [selectedCommunities, setSelectedCommunities] = useState([]);
  const { communities } = useCommunities();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(true);

  // Transform communities data to match the expected format
  const moderatedCommunities = communities.map(community => ({
    id: community.id,
    name: community.name,
    visitors: 0, // Placeholder - in a real app this would come from analytics
    contributions: 0, // Placeholder - in a real app this would come from analytics
    isActive: true, // Assume active since user is moderating
    createdAt: community.createdAt
  }));

  const handleCommunitySelect = (communityId) => {
    if (selectedCommunities.includes(communityId)) {
      setSelectedCommunities(selectedCommunities.filter(id => id !== communityId));
    } else {
      setSelectedCommunities([...selectedCommunities, communityId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedCommunities.length === moderatedCommunities.length) {
      setSelectedCommunities([]);
    } else {
      setSelectedCommunities(moderatedCommunities.map(community => community.id));
    }
  };

  const handleTransferModeration = () => {
    if (selectedCommunities.length === 0) {
      alert('Please select at least one community to transfer');
      return;
    }
    
    const selectedNames = moderatedCommunities
      .filter(community => selectedCommunities.includes(community.id))
      .map(community => community.name);
    
    alert(`Transfer moderation for communities: r/${selectedNames.join(', r/')}\nThis would open a transfer dialog in a real application.`);
  };

  const handleRemoveModeration = () => {
    if (selectedCommunities.length === 0) {
      alert('Please select at least one community to remove');
      return;
    }
    
    const selectedNames = moderatedCommunities
      .filter(community => selectedCommunities.includes(community.id))
      .map(community => community.name);
    
    alert(`Remove moderation for communities: r/${selectedNames.join(', r/')}\nThis would open a removal dialog in a real application.`);
  };

  const handleLearnMore = () => {
    alert('Learn more about moderation limits and guidelines.\nThis would open a help page in a real application.');
  };

  const handleContactSupport = () => {
    alert('Contacting u/ModSupportBot...\nThis would open a message dialog in a real application.');
  };

  const handleNavigateToCommunity = (communityName) => {
    navigate(`/r/${communityName}`);
  };

  return (
    <div className="App">
      <TopBar isSignedIn={isSignedIn} />
      <div className="leftsidebar-layout">
        <LeftSideBar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
          isSignedIn={isSignedIn}
        />
        <main className="manage-moderated-content">
          <div className="manage-moderated-container">
            {/* Header Section */}
            <div className="manage-header">
              <h1 className="manage-title"><b>Manage moderated communities</b></h1>
              <p className="manage-description">
          You can moderate up to 5 high-traffic communities. 
          <button 
            className="support-link" 
            onClick={handleContactSupport}
          >
            Reach out to u/ModSupportBot
          </button> 
          to check if you are past the limit. 
          <button 
            className="learn-more-link" 
            onClick={handleLearnMore}
          >
            Learn more about this.
          </button>
        </p>
      </div>

      {/* Action Bar */}
      <div className="action-bar">
        <div className="select-all">
          <label className="select-all-label">
            <input
              type="checkbox"
              checked={selectedCommunities.length === moderatedCommunities.length}
              onChange={handleSelectAll}
              className="select-all-checkbox"
            />
            <span className="select-all-text">Select all</span>
          </label>
        </div>
        
        <div className="action-buttons">
          <button 
            className="action-btn transfer-btn"
            onClick={handleTransferModeration}
            disabled={selectedCommunities.length === 0}
          >
            Transfer moderation
          </button>
          <button 
            className="action-btn remove-btn"
            onClick={handleRemoveModeration}
            disabled={selectedCommunities.length === 0}
          >
            Remove moderation
          </button>
        </div>
      </div>

      {/* Communities List */}
      <div className="communities-list">
        {moderatedCommunities.length === 0 ? (
          <div className="empty-communities">
            <div className="empty-communities-content">
              <h3 className="empty-communities-title">No moderated communities yet</h3>
              <p className="empty-communities-description">
                Communities you create will appear here for management.
              </p>
            </div>
          </div>
        ) : (
          moderatedCommunities.map((community) => (
          <div
            key={community.id}
            className={`community-item ${selectedCommunities.includes(community.id) ? 'selected' : ''}`}
          >
            <div className="community-select">
              <input
                type="checkbox"
                checked={selectedCommunities.includes(community.id)}
                onChange={() => handleCommunitySelect(community.id)}
                className="community-checkbox"
                id={`community-${community.id}`}
              />
              <label
                htmlFor={`community-${community.id}`}
                className="community-label"
              >
                <span className="checkmark"></span>
              </label>
            </div>

            <div className="community-content">
              <div className="community-header">
                <div className="community-icon">
                  <span className="icon-text">r/</span>
                </div>
                <div className="community-info">
                  <h3
                    className="community-name"
                    onClick={() => handleNavigateToCommunity(community.name)}
                    style={{ cursor: 'pointer' }}
                  >
                    r/{community.name}
                  </h3>
                  <div className="community-stats">
                    {community.visitors} visitor{community.visitors !== 1 ? 's' : ''} -
                    {' '}{community.contributions} contribution{community.contributions !== 1 ? 's' : ''} last week
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))
        )}
      </div>

            {/* Footer Info */}
            <div className="footer-info">
              <p className="footer-text">
                <strong>Note:</strong> Removing moderation will permanently remove you as a moderator.
                This action cannot be undone.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageModeratedCommunities;