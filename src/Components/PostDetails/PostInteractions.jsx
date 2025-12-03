import React from 'react';
import './PostInteractions.css';

const PostInteractions = ({ voteCount, commentCount }) => {
  return (
    <div className="post-footer">
      <div className="post-stats">
        <div className="vote-section">
          <button className="action-btn upvote-btn">
            <svg className="action-icon" viewBox="0 0 24 24">
              <path d="M12 4l9 9h-6v7H9v-7H3l9-9z" />
            </svg>
          </button>
          <div className="vote-count">{voteCount}</div>
          <button className="action-btn downvote-btn">
            <svg className="action-icon" viewBox="0 0 24 24">
              <path d="M12 20l-9-9h6V4h6v7h6l-9 9z" />
            </svg>
          </button>
        </div>
        
        <button className="action-btn comment-btn">
          <svg className="action-icon" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span>{commentCount}</span>
        </button>
        
        <button className="action-btn award-btn">
          <svg className="action-icon" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
          </svg>
          <span>Award</span>
        </button>
        
        <button className="action-btn share-btn">
          <svg className="action-icon" viewBox="0 0 24 24">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
          </svg>
          <span>Share</span>
        </button>
        
        <button className="action-btn save-btn">
          <svg className="action-icon" viewBox="0 0 24 24">
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
          </svg>
          <span>Save</span>
        </button>
        
        <button className="action-btn more-btn">
          <svg className="action-icon" viewBox="0 0 24 24">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
          <span>•••</span>
        </button>
      </div>
    </div>
  );
};

export default PostInteractions;