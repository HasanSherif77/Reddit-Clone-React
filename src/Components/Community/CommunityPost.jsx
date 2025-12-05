// PostComponent.jsx
import React, { useState } from 'react';
import './PostComponent.css';

const PostComponent = () => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [voteCount, setVoteCount] = useState(7800);
  const [commentCount, setCommentCount] = useState(412);
  const [isSaved, setIsSaved] = useState(false);

  const handleUpvote = () => {
    if (isUpvoted) {
      setIsUpvoted(false);
      setVoteCount(voteCount - 1);
    } else {
      setIsUpvoted(true);
      setIsDownvoted(false);
      setVoteCount(voteCount + 1);
    }
  };

  const handleDownvote = () => {
    if (isDownvoted) {
      setIsDownvoted(false);
      setVoteCount(voteCount + 1);
    } else {
      setIsDownvoted(true);
      setIsUpvoted(false);
      setVoteCount(voteCount - 1);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    alert("Share functionality would open here");
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="post-component">
      {/* Vote Buttons */}
      <div className="post-votes">
        <button 
          className={`vote-btn upvote ${isUpvoted ? 'active' : ''}`}
          onClick={handleUpvote}
          aria-label="Upvote"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 16H20L12 4Z" 
              fill={isUpvoted ? "#ff4500" : "none"} 
              stroke={isUpvoted ? "#ff4500" : "#878a8c"} 
              strokeWidth="2"
            />
          </svg>
        </button>
        
        <div className="vote-count">
          {formatNumber(voteCount)}
        </div>
        
        <button 
          className={`vote-btn downvote ${isDownvoted ? 'active' : ''}`}
          onClick={handleDownvote}
          aria-label="Downvote"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20L20 8H4L12 20Z" 
              fill={isDownvoted ? "#7193ff" : "none"} 
              stroke={isDownvoted ? "#7193ff" : "#878a8c"} 
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      {/* Post Content */}
      <div className="post-content">
        {/* Post Header */}
        <div className="post-header">
          <span className="post-author">u/Beautiful-Cress5695</span>
          <span className="post-time">• 8 hr. ago</span>
        </div>

        {/* Post Title */}
        <h2 className="post-title">
          TIL Walter Francis White was a Jim Crow era black man who had white skin, blonde hair, blue eyes, and used it to sneak in and document lynching
        </h2>

        {/* Post Link */}
        <div className="post-link">
          <a 
            href="https://www.abhmuseum.org/walter-white/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-content"
          >
            <span className="link-domain">abhmuseum.org</span>
            <span className="link-path">/walter-white/</span>
          </a>
        </div>

        {/* Post Actions */}
        <div className="post-actions">
          <button className="post-action">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 9.23952 2.42812 10.3777 3.14597 11.2853L2.08594 13.9141L4.71472 12.854C5.62231 13.5719 6.76048 14 8 14Z" 
                stroke="#878a8c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="action-text">{commentCount} Comments</span>
          </button>
          
          <button className="post-action" onClick={handleShare}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333" 
                stroke="#878a8c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 2H14V6" stroke="#878a8c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.66667 9.33333L14 2" stroke="#878a8c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="action-text">Share</span>
          </button>
          
          <button className="post-action">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 12.6667L3.33333 8H6.66667V3.33333H9.33333V8H12.6667L8 12.6667Z" 
                stroke="#878a8c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="action-text">Award</span>
          </button>
          
          <button className="post-action" onClick={handleSave}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33333 14V4C3.33333 3.64638 3.47381 3.30724 3.72386 3.05719C3.9739 2.80714 4.31304 2.66667 4.66667 2.66667H11.3333C11.687 2.66667 12.0261 2.80714 12.2761 3.05719C12.5262 3.30724 12.6667 3.64638 12.6667 4V14L8 11.3333L3.33333 14Z" 
                stroke={isSaved ? "#ff4500" : "#878a8c"} 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill={isSaved ? "#ff4500" : "none"}
              />
            </svg>
            <span className="action-text">Save</span>
          </button>
          
          <button className="post-action">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="7.99967" cy="3.99967" rx="1.33333" ry="1.33333" stroke="#878a8c" strokeWidth="1.5"/>
              <ellipse cx="3.99967" cy="7.99967" rx="1.33333" ry="1.33333" stroke="#878a8c" strokeWidth="1.5"/>
              <ellipse cx="11.9997" cy="7.99967" rx="1.33333" ry="1.33333" stroke="#878a8c" strokeWidth="1.5"/>
              <ellipse cx="7.99967" cy="11.9997" rx="1.33333" ry="1.33333" stroke="#878a8c" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;