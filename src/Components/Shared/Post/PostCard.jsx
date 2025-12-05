import React, { useState, useRef, useEffect } from "react";
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
  type,
  community,
  communityIcon,
  timeAgo,
  title,
  text,
  imageUrl,
  videoUrl,
  votes,
  commentsCount
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <article className="postcard">
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
          <button className="postcard-join-btn">Join</button>
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

      {type === "text" && text && (
        <p className="postcard-text">{text}</p>
      )}

      {type === "image" && imageUrl && (
        <div className="postcard-media">
          <img src={imageUrl} alt={title} className="postcard-image" />
        </div>
      )}

      {type === "video" && videoUrl && (
        <div className="postcard-media">
          <video
            src={videoUrl}
            className="postcard-video"
            controls
          />
        </div>
      )}

      <footer className="postcard-footer">
        <button className="postcard-action postcard-vote">
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

        <button className="postcard-action">
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
      </footer>
    </article>
  );
}

export default PostCard;
