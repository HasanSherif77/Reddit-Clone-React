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
import defaultAvatar from "../../../assets/default-avatars/default.svg";

function PostCard({
  id,
  userId,
  communityId,
  userData: initialUserData,
  communityData: initialCommunityData,
  timeAgo,
  title,
  text,
  mediaUrl,
  votes,
  commentsCount,
  isSignedIn = true,
  preferCommunity = true
}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSummaryPopupOpen, setIsSummaryPopupOpen] = useState(false);
  const [summary, setSummary] = useState(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(null);
  const menuRef = useRef(null);
  const summaryPopupRef = useRef(null);

  // State for user and community data (use initial data if provided, otherwise fetch)
  const [userData, setUserData] = useState(initialUserData || null);
  const [communityData, setCommunityData] = useState(initialCommunityData || null);
  const [isLoadingData, setIsLoadingData] = useState(!initialUserData);

  // State for voting
  const [currentVotes, setCurrentVotes] = useState(votes || 0);
  const [voteStatus, setVoteStatus] = useState(() => {
    // Initialize vote status from localStorage
    if (id) {
      const savedVoteStatus = localStorage.getItem(`vote_${id}`);
      return savedVoteStatus || null;
    }
    return null;
  });
  const [isVoting, setIsVoting] = useState(false);

  // State for community join status
  const [hasJoined, setHasJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);

  // Update votes when prop changes
  useEffect(() => {
    setCurrentVotes(votes || 0);
  }, [votes]);

  // Fetch current user data to check joinedCommunities and ownership
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!isSignedIn) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const user = await response.json();
          setCurrentUserData(user);
          
          // Check if user has joined this community
          if (communityId) {
            const joinedCommunities = user.joinedCommunities || [];
            const communityIdString = String(communityId);
            const isJoined = joinedCommunities.some(commId => 
              String(commId) === communityIdString || 
              String(commId._id || commId) === communityIdString
            );
            setHasJoined(isJoined);
          }
        }
      } catch (error) {
        // Error fetching current user data
      }
    };

    fetchCurrentUser();
  }, [isSignedIn, communityId]);

  // Listen for community join/leave events to refresh join status
  useEffect(() => {
    const handleCommunityChange = async () => {
      // Refresh join status when any community join/leave happens
      if (!isSignedIn || !communityId) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const user = await response.json();
          setCurrentUserData(user);
          
          // Check if user has joined this community
          const joinedCommunities = user.joinedCommunities || [];
          const communityIdString = String(communityId);
          const isJoined = joinedCommunities.some(commId => 
            String(commId) === communityIdString || 
            String(commId._id || commId) === communityIdString
          );
          setHasJoined(isJoined);
        }
      } catch (error) {
        // Error fetching current user data
      }
    };

    window.addEventListener('communityJoined', handleCommunityChange);
    window.addEventListener('communityLeft', handleCommunityChange);

    return () => {
      window.removeEventListener('communityJoined', handleCommunityChange);
      window.removeEventListener('communityLeft', handleCommunityChange);
    };
  }, [communityId, isSignedIn]);

  // Fetch user and community data only if not already provided
  useEffect(() => {
    const fetchData = async () => {
      // If we already have populated data from backend, use it
      if (initialUserData && initialCommunityData !== undefined) {
        setUserData(initialUserData);
        setCommunityData(initialCommunityData);
        setIsLoadingData(false);
        return;
      }
      
      setIsLoadingData(true);
      
      try {
        // Fetch user data if not provided
        if (!initialUserData && userId) {
          const userIdString = String(userId);
          const userResponse = await fetch(`http://localhost:5000/users/info/${userIdString}`);
          if (userResponse.ok) {
            const user = await userResponse.json();
            setUserData(user);
          }
        }

        // Fetch community data if not provided and communityId exists
        if (!initialCommunityData && communityId) {
          const communityIdString = String(communityId);
          const communityResponse = await fetch(`http://localhost:5000/communities/info/${communityIdString}`);
          if (communityResponse.ok) {
            const community = await communityResponse.json();
            setCommunityData(community);
          }
        }
      } catch (error) {
        // Error fetching post data
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, [userId, communityId, id, initialUserData, initialCommunityData]);

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

  const handleSummarizeClick = async (e) => {
    e.stopPropagation();
    
    // Check if user is signed in
    if (!isSignedIn) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    // If summary already exists, just show the popup
    if (summary) {
      setIsSummaryPopupOpen(true);
      return;
    }

    // Check if there's text to summarize
    if (!text || text.trim().length === 0) {
      setSummaryError("No text content available to summarize.");
      setIsSummaryPopupOpen(true);
      return;
    }

    setIsSummaryPopupOpen(true);
    setIsSummaryLoading(true);
    setSummaryError(null);

    try {
      const response = await fetch('http://localhost:5000/ai/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: text
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/login");
          return;
        }
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      
      // Extract the summary text from the response
      // Adjust this based on your actual API response structure
      const summaryText = data.summary || data.text || data.message || JSON.stringify(data);
      setSummary(summaryText);
    } catch (err) {
      setSummaryError(err.message || 'Failed to generate summary. Please try again.');
    } finally {
      setIsSummaryLoading(false);
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

  const handleUpvote = async (e) => {
    e.stopPropagation();
    if (!isSignedIn) {
      navigate("/login");
      return;
    }

    if (!id) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // If already upvoted, remove vote
    if (voteStatus === 'upvoted') {
      // TODO: Implement remove vote endpoint if available
      return;
    }

    setIsVoting(true);
    try {
      const response = await fetch(`http://localhost:5000/posts/${id}/upvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Update vote count from response
        if (data.votesCount !== undefined) {
          setCurrentVotes(data.votesCount);
        } else if (data.post?.votesCount !== undefined) {
          setCurrentVotes(data.post.votesCount);
        } else if (data.votes !== undefined) {
          setCurrentVotes(data.votes);
        }
        // Set vote status to upvoted (this automatically clears downvote)
        setVoteStatus('upvoted');
        // Persist vote status to localStorage
        if (id) {
          localStorage.setItem(`vote_${id}`, 'upvoted');
        }
      } else {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/login");
        }
      }
    } catch (error) {
      // Error upvoting post
    } finally {
      setIsVoting(false);
    }
  };

  const handleDownvote = async (e) => {
    e.stopPropagation();
    if (!isSignedIn) {
      navigate("/login");
      return;
    }

    if (!id) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // If already downvoted, remove vote
    if (voteStatus === 'downvoted') {
      // TODO: Implement remove vote endpoint if available
      return;
    }

    setIsVoting(true);
    try {
      const response = await fetch(`http://localhost:5000/posts/${id}/downvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Update vote count from response
        if (data.votesCount !== undefined) {
          setCurrentVotes(data.votesCount);
        } else if (data.post?.votesCount !== undefined) {
          setCurrentVotes(data.post.votesCount);
        } else if (data.votes !== undefined) {
          setCurrentVotes(data.votes);
        }
        // Set vote status to downvoted (this automatically clears upvote)
        setVoteStatus('downvoted');
        // Persist vote status to localStorage
        if (id) {
          localStorage.setItem(`vote_${id}`, 'downvoted');
        }
      } else {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/login");
        }
      }
    } catch (error) {
      // Error downvoting post
    } finally {
      setIsVoting(false);
    }
  };

  const handleDeletePost = async (e) => {
    e.stopPropagation();
    
    if (!isSignedIn || !id) return;
    
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Confirm deletion
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Navigate to home page after successful deletion
        navigate("/");
        // Dispatch event to refresh posts list
        window.dispatchEvent(new CustomEvent('postDeleted', { detail: { postId: id } }));
      } else {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/login");
        } else if (response.status === 403) {
          alert("You don't have permission to delete this post");
        } else {
          alert("Failed to delete post. Please try again.");
        }
      }
    } catch (error) {
      alert("An error occurred while deleting the post");
    }
    
    setIsMenuOpen(false);
  };

  const handleJoinClick = async (e) => {
    e.stopPropagation();
    if (!isSignedIn) {
      navigate("/login");
      return;
    }

    if (!communityId) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setIsJoining(true);
    try {
      const communityIdString = String(communityId);
      const endpoint = hasJoined 
        ? `http://localhost:5000/users/communities/${communityIdString}/leave`
        : `http://localhost:5000/users/communities/${communityIdString}/join`;

      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Toggle join status
        setHasJoined(!hasJoined);
        
        // Update current user data
        if (currentUserData) {
          const updatedJoinedCommunities = hasJoined
            ? (currentUserData.joinedCommunities || []).filter(commId => 
                String(commId) !== communityIdString && 
                String(commId._id || commId) !== communityIdString
              )
            : [...(currentUserData.joinedCommunities || []), communityIdString];
          
          setCurrentUserData({
            ...currentUserData,
            joinedCommunities: updatedJoinedCommunities
          });
        }

        // Dispatch custom event to notify all PostCard components to refresh
        const eventName = hasJoined ? 'communityLeft' : 'communityJoined';
        window.dispatchEvent(new CustomEvent(eventName, {
          detail: { communityId: communityIdString }
        }));
      } else {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/login");
        }
      }
    } catch (error) {
      // Error joining/leaving community
    } finally {
      setIsJoining(false);
    }
  };

  // Format the display string
  const getDisplayString = () => {
    if (isLoadingData) return 'Loading...';
    
    // Use displayname if available and not empty, otherwise use username
    const displayName = (userData?.displayname && userData.displayname.trim() !== '') 
      ? userData.displayname 
      : (userData?.username || 'unknown');
    const userPart = `u/${displayName}`;
    
    // If preferCommunity is false, only show user
    if (!preferCommunity) {
      return userPart;
    }
    
    // If preferCommunity is true, show ONLY community if available
    if (communityData && communityData.communityName) {
      return `r/${communityData.communityName}`;
    }
    
    // Fallback to user if no community
    return userPart;
  };

  // Get the icon to display (user avatar or community icon)
  const getDisplayIcon = () => {
    // If preferCommunity is false, always show user avatar
    if (!preferCommunity) {
      if (userData && userData.avatarUrl) {
        return userData.avatarUrl;
      }
      return defaultAvatar;
    }
    
    // If preferCommunity is true, show ONLY community icon if available
    if (communityData && communityData.communityIcon) {
      return communityData.communityIcon;
    }
    
    // Fallback to user avatar if no community icon
    if (userData && userData.avatarUrl) {
      return userData.avatarUrl;
    }
    return defaultAvatar;
  };


  return (
    <article 
      className="postcard" 
      onClick={handlePostClick} 
      style={{ cursor: id ? 'pointer' : 'default' }}
    >
      <header className="postcard-header">
        <div className="postcard-header-main">
          <img
            src={getDisplayIcon()}
            alt={communityData?.communityName || userData?.displayname || userData?.username || 'user'}
            className="postcard-community-icon"
            onError={(e) => {
              // Fallback to default avatar if image fails to load
              if (e.target.src !== defaultAvatar) {
                e.target.src = defaultAvatar;
              }
            }}
          />
          <span className="postcard-community">{getDisplayString()}</span>
          <span className="postcard-dot">•</span>
          <span className="postcard-time">{timeAgo}</span>
        </div>

        <div className="postcard-header-actions">
          {communityId && (
            <button 
              className={`postcard-join-btn ${hasJoined ? 'postcard-join-btn-joined' : ''}`}
              onClick={handleJoinClick}
              disabled={isJoining || !isSignedIn}
            >
              {hasJoined ? 'Joined' : 'Join'}
            </button>
          )}
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
          {/* Show delete button only if current user is the post owner */}
          {currentUserData && userId && String(currentUserData._id || currentUserData.id) === String(userId) && (
            <button 
              className="postcard-menu-item postcard-menu-item-delete"
              onClick={handleDeletePost}
              style={{ color: '#ff4500' }}
            >
              <span>Delete Post</span>
            </button>
          )}
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
        <div className="postcard-vote-container">
          <button
            className={`postcard-vote-btn ${voteStatus === 'upvoted' ? 'postcard-vote-btn-active postcard-vote-btn-upvoted' : ''}`}
            onClick={handleUpvote}
            disabled={isVoting || !isSignedIn}
            title="Upvote"
          >
            <img
              src={likeIcon}
              alt="Upvote"
              className="postcard-action-icon postcard-like-icon"
            />
          </button>
          <span className="postcard-vote-count">{currentVotes}</span>
          <button
            className={`postcard-vote-btn ${voteStatus === 'downvoted' ? 'postcard-vote-btn-active postcard-vote-btn-downvoted' : ''}`}
            onClick={handleDownvote}
            disabled={isVoting || !isSignedIn}
            title="Downvote"
          >
            <img
              src={dislikeIcon}
              alt="Downvote"
              className="postcard-action-icon postcard-dislike-icon"
            />
          </button>
        </div>

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
              {isSummaryLoading ? (
                <p className="postcard-summary-loading">Generating summary...</p>
              ) : summaryError ? (
                <p className="postcard-summary-error">{summaryError}</p>
              ) : summary ? (
                <p className="postcard-summary-text">{summary}</p>
              ) : (
                <p className="postcard-summary-loading">Preparing to generate summary...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default PostCard;
