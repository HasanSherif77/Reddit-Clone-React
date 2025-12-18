import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";

import likeIcon from "../../../assets/images/Like.svg";
import dislikeIcon from "../../../assets/images/Dislike.svg";
import commentIcon from "../../../assets/images/Comment.svg";
import shareIcon from "../../../assets/images/Share.svg";
import dotsIcon from "../../../assets/images/Dots.svg";
import bellIcon from "../../../assets/images/Bell.svg";
import hideIcon from "../../../assets/images/Hide.svg";
import saveIcon from "../../../assets/images/Save.svg";
import reportIcon from "../../../assets/images/Report.svg";

function PostCard({
  id,
  community,
  communityIcon,
  timeAgo,
  title,
  text,
  mediaUrl,
  votes,
  commentsCount,
  isSignedIn = true
}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSummaryPopupOpen, setIsSummaryPopupOpen] = useState(false);
  const [summary, setSummary] = useState(null);
  const menuRef = useRef(null);
  const summaryPopupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      if (summaryPopupRef.current && !summaryPopupRef.current.contains(e.target)) {
        setIsSummaryPopupOpen(false);
      }
    };

    if (isMenuOpen || isSummaryPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isSummaryPopupOpen]);

  // Determine if mediaUrl is a video based on file extension
  const isVideo = mediaUrl && /\.(mp4|webm|ogg|mov|avi)$/i.test(mediaUrl);

  const handleSummarizeClick = async () => {
    setIsSummaryPopupOpen(true);
    // TODO: Implement AI summarization logic here
    // For now, show a placeholder message
    if (!summary) {
      setSummary("AI summarization will be implemented here. This will analyze the post content and provide a concise summary.");
    }
  };

  const handlePostClick = (e) => {
    // Don't navigate if clicking on interactive elements
    if (
      e.target.closest('.postcard-header-actions') ||
      e.target.closest('.postcard-menu') ||
      e.target.closest('.postcard-action') ||
      e.target.closest('.postcard-summary-overlay')
    ) {
      return;
    }
    
    if (!isSignedIn) {
      navigate("/login");
      return;
    }
    
    if (id) {
      navigate(`/post/${id}`);
    }
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    if (id) {
      navigate(`/post/${id}`);
    }
  };

  const handleVoteClick = (e) => {
    e.stopPropagation();
    if (!isSignedIn) {
      navigate("/login");
      return;
    }
    // TODO: Implement vote logic here
  };

  const handleJoinClick = (e) => {
    e.stopPropagation();
    if (!isSignedIn) {
      navigate("/login");
      return;
    }
    // TODO: Implement join community logic here
  };

  return (
    <article 
      className="postcard" 
      onClick={handlePostClick} 
      style={{ cursor: id ? 'pointer' : 'default' }}
    >
      <header className="postcard-header">
        <div className="postcard-header-main">
          {communityIcon && (
            <img
              src={communityIcon}
              alt={community}
              className="postcard-community-icon"
            />
          )}
          <span className="postcard-community">{community}</span>
          <span className="postcard-dot">•</span>
          <span className="postcard-time">{timeAgo}</span>
        </div>

        <div className="postcard-header-actions">
          <button className="postcard-join-btn" onClick={handleJoinClick}>Join</button>
          <button
            className="postcard-dots-btn"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <img src={dotsIcon} alt="More options" />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="postcard-menu" ref={menuRef}>
          <button className="postcard-menu-item">
            <img src={bellIcon} alt="Follow post" />
            <span>Follow post</span>
          </button>
          <button className="postcard-menu-item">
            <img src={hideIcon} alt="Show fewer posts like this" />
            <span>Show fewer posts like this</span>
          </button>
          <button className="postcard-menu-item">
            <img src={saveIcon} alt="Save" />
            <span>Save</span>
          </button>
             <button className="postcard-menu-item">
            <img src={hideIcon} alt="Save" />
            <span>Hide</span>
          </button>
          <button className="postcard-menu-item">
            <img src={reportIcon} alt="Report" />
            <span>Report</span>
          </button>
        </div>
      )}

      <h3 className="postcard-title">{title}</h3>

      {text && (
        <p className="postcard-text">{text}</p>
      )}

      {mediaUrl && (
        <div className="postcard-media">
          {isVideo ? (
            <video
              src={mediaUrl}
              className="postcard-video"
              controls
            />
          ) : (
            <img src={mediaUrl} alt={title} className="postcard-image" />
          )}
        </div>
      )}

      <footer className="postcard-footer">
        <button className="postcard-action postcard-vote" onClick={handleVoteClick}>
          <img
            src={likeIcon}
            alt="Like"
            className="postcard-action-icon postcard-like-icon"
          />
          <span className="postcard-vote-count">{votes}</span>
          <img
            src={dislikeIcon}
            alt="Dislike"
            className="postcard-action-icon postcard-dislike-icon"
          />
        </button>

        <button className="postcard-action" onClick={handleCommentClick}>
          <img
            src={commentIcon}
            alt="Comments"
            className="postcard-action-icon"
          />
          <span>{commentsCount}</span>
        </button>

        <button className="postcard-action">
          <img
            src={shareIcon}
            alt="Share"
            className="postcard-action-icon"
          />
          <span>Share</span>
        </button>

        <button className="postcard-action" onClick={handleSummarizeClick}>
          <svg 
            className="postcard-action-icon" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span>Summarize</span>
        </button>
      </footer>

      {isSummaryPopupOpen && (
        <div className="postcard-summary-overlay">
          <div className="postcard-summary-popup" ref={summaryPopupRef}>
            <div className="postcard-summary-header">
              <h3 className="postcard-summary-title">AI Summary</h3>
              <button 
                className="postcard-summary-close"
                onClick={() => setIsSummaryPopupOpen(false)}
                aria-label="Close summary"
              >
                ×
              </button>
            </div>
            <div className="postcard-summary-content">
              {summary ? (
                <p className="postcard-summary-text">{summary}</p>
              ) : (
                <p className="postcard-summary-loading">Generating summary...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default PostCard;
