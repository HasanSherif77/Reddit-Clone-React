// TempSidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommunities } from '../Community/CommunityContext';
import './TempSidebar.css';

const TempSidebar = () => {
  const navigate = useNavigate();
  const { communities, joinedCommunities } = useCommunities();

  // Combine created and joined communities without duplicates (by id)
  const allCommunitiesMap = {};
  [...communities, ...joinedCommunities].forEach(c => {
    allCommunitiesMap[c.id] = c;
  });
  const allCommunities = Object.values(allCommunitiesMap);

  return (
    <div className="temp-sidebar">
      <div className="sidebar-header">
        <div className="header-content">
          <h3 className="sidebar-title">Navigation</h3>
          <div className="search-placeholder">
            <span className="search-icon">🔍</span>
            <span className="search-text">Search</span>
          </div>
        </div>
      </div>

      <div className="sidebar-content">
        <div className="nav-section">
          <div className="section-header">
            <span className="section-title">FEEDS</span>
          </div>
          <div className="nav-items">
            <div className="nav-item active">
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Home</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">🔥</span>
              <span className="nav-text">Popular</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">🆕</span>
              <span className="nav-text">All</span>
            </div>
            <div
              className="nav-item"
              onClick={() => navigate('/discover-communities')}
              style={{ cursor: 'pointer' }}
            >
              <span className="nav-icon">🌐</span>
              <span className="nav-text">Communities</span>
            </div>
            <div
              className="nav-item"
              onClick={() => navigate('/manage-communities')}
              style={{ cursor: 'pointer' }}
            >
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Manage</span>
            </div>
          </div>
        </div>

        <div className="nav-section">
          <div className="section-header">
            <span className="section-title">MY COMMUNITIES</span>
          </div>
          <div className="nav-items">
            {allCommunities.length === 0 ? (
              <div className="nav-item">
                <span className="nav-text" style={{ fontStyle: 'italic', color: '#7c7c7c' }}>
                  No communities yet
                </span>
              </div>
            ) : (
              allCommunities.slice(0, 5).map(community => (
                <div
                  key={community.id}
                  className="nav-item"
                  onClick={() => navigate(`/r/${community.name}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="nav-icon">r/</span>
                  <span className="nav-text">{community.name}</span>
                </div>
              ))
            )}
          </div>
        </div>


        <div className="create-section">
          <div className="create-post-btn">
            <span className="create-icon">+</span>
            <span className="create-text">Create Post</span>
          </div>
          <button
            className="start-community-btn"
            type="button"
            onClick={() => navigate('/add-topics')}
          >
            <span className="create-icon">+</span>
            <span className="create-text">Start Community</span>
          </button>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <span className="user-name">Username</span>
            <span className="user-karma">1 karma</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempSidebar;