// Updated CommunityHeader.jsx - Reddit-style design
import React, { useState } from 'react';
import './CommunityHeader.css';

const CommunityHeader = ({ community }) => {
  const communityName = community?.name || 'Community';
  const communityDescription = community?.description || 'A community';
  const [activeTab, setActiveTab] = useState('posts');
  const [sortBy, setSortBy] = useState('hot');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const handleCreatePost = () => {
    alert('Create post functionality would open here');
  };

  const handleJoin = () => {
    alert('Join community functionality would go here');
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setIsSortMenuOpen(false);
  };

  const tabs = [
    { id: 'posts', label: 'Posts' },
    { id: 'about', label: 'About' }
  ];

  const sortOptions = [
    { value: 'hot', label: 'Hot' },
    { value: 'new', label: 'New' },
    { value: 'top', label: 'Top' },
    { value: 'rising', label: 'Rising' }
  ];

  return (
    <header className="community-header-container">
      {/* Banner area */}
      <div className="community-banner">
        <div className="banner-overlay" />
      </div>

      {/* Main header content */}
      <div className="community-header-content">
        {/* Community info with avatar */}
        <div className="community-info-section">
          <div className="community-avatar">
            <div className="avatar-placeholder" style={{ backgroundColor: community?.iconColor || '#0079d3' }}>
              <span className="avatar-text">{community?.icon || 'r/'}</span>
            </div>
          </div>
          <div className="community-details">
            <h1 className="community-name"><b>r/{communityName}</b></h1>
            <div className="community-meta">
              <span className="community-members">{community?.members || '0'} members</span>
              <span className="community-separator">•</span>
              <span className="community-online">0 online</span>
            </div>
          </div>
          <div className="community-actions">
            <button className="btn-create-post" onClick={handleCreatePost}>
              <span className="create-post-icon"></span>
              Create Post
            </button>
            <button className="btn-join-community" onClick={handleJoin}>
              Join
            </button>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="community-tabs">
          <div className="tabs-container">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort and view options */}
          <div className="header-actions">
            <div className="sort-dropdown">
              <button
                className="btn-sort"
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              >
                <span className="sort-icon">🔥</span>
                {sortOptions.find(option => option.value === sortBy)?.label}
                <span className="sort-caret">▼</span>
              </button>
              {isSortMenuOpen && (
                <div className="dropdown-content">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={sortBy === option.value ? 'active' : ''}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="view-toggle">
              <button className="view-btn active" aria-label="Card view">
                <span className="view-icon">⊞</span>
              </button>
              <button className="view-btn" aria-label="Compact view">
                <span className="view-icon">☰</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CommunityHeader;