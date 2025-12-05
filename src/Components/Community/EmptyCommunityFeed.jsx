// CommunityFeed.jsx - Shows posts for communities with posts, empty state for new communities
import React from 'react';
import './EmptyCommunityFeed.css';

const CommunityFeed = ({ community }) => {
  const handleCreatePost = () => {
    alert("Create post functionality would open here");
  };

  return (
    <div className="empty-community-feed">
      <div className="empty-feed-main">
        <div className="empty-feed-card">
          <div className="empty-feed-content">
           
            <p className="empty-feed-subtitle">
              <h2>This community doesn't have any posts yet.</h2> 
                Make one and get this feed started.
            </p>
          </div>

          <div className="empty-feed-actions">
            <button className="empty-feed-create-btn" onClick={handleCreatePost}>
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeed;