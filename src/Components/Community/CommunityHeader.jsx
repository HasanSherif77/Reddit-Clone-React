// Updated CommunityHeader.jsx - Reddit-style design
import React, { useState } from 'react';
import './CommunityHeader.css';

const CommunityHeader = ({ 
  community, 
  hasJoined = false, 
  isJoining = false, 
  onJoinClick, 
  onCreatePost,
  isSignedIn = false,
  activeTab = 'posts',
  onTabChange
}) => {
  const communityName = community?.name || 'Community';
  const communityDescription = community?.description || 'A community';
  const [sortBy, setSortBy] = useState('hot');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const handleCreatePost = () => {
    if (onCreatePost) {
      onCreatePost();
    }
  };

  const handleJoin = () => {
    if (onJoinClick) {
      onJoinClick();
    }
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
        {community?.banner && community.banner.trim() !== '' ? (
          <img 
            src={community.banner} 
            alt={`${communityName} banner`}
            className="banner-image"
          />
        ) : null}
        <div className="banner-overlay" />
      </div>

      {/* Main header content */}
      <div className="community-header-content">
        {/* Community info with avatar */}
        <div className="community-info-section">
          <div className="community-avatar">
            {community?.icon && community.icon.trim() !== '' ? (
              <img 
                src={community.icon} 
                alt={`${communityName} icon`}
                className="community-avatar-img"
                onError={(e) => {
                  // Fallback to placeholder if image fails
                  e.target.style.display = 'none';
                  const fallback = e.target.nextElementSibling;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
            ) : null}
            <div 
              className="avatar-placeholder" 
              style={{ 
                backgroundColor: community?.iconColor || '#0079d3',
                display: (community?.icon && community.icon.trim() !== '') ? 'none' : 'flex'
              }}
            >
              <span className="avatar-text">r/</span>
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
            <button 
              className="btn-create-post" 
              onClick={handleCreatePost}
              disabled={!isSignedIn}
            >
              <span className="create-post-icon"></span>
              Create Post
            </button>
            <button 
              className={`btn-join-community ${hasJoined ? 'joined' : ''}`}
              onClick={handleJoin}
              disabled={isJoining || !isSignedIn}
            >
              {isJoining ? '...' : (hasJoined ? 'Joined' : 'Join')}
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
                onClick={() => onTabChange && onTabChange(tab.id)}
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