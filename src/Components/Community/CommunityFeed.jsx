// CommunityFeed.jsx
import React from 'react';
import './CommunityFeed.css';

const CommunityFeed = () => {
  const handleCreatePost = () => {
    alert("Create post functionality would open here");
  };

  return (
    <div className="empty-community-feed">
      <div className="empty-feed-container">
        <div className="empty-feed-message">
          <h2 className="empty-feed-title">
           <b>This community doesn't have any posts yet.</b> 
          </h2>
          <p className="empty-feed-subtitle">
            Make one and get this feed started.
          </p>
        </div>
        
        <button className="empty-feed-create-post-btn" onClick={handleCreatePost}>
          Create Post
        </button>
      </div>
    </div>
  );
};
 
export default CommunityFeed;