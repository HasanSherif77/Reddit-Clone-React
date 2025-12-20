import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommentItem.css';

const CommentItem = ({ comment, isReply = false, depth = 0, onAddReply, isSignedIn = true }) => {
  const navigate = useNavigate();
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [currentVotes, setCurrentVotes] = useState(comment.voteCount || 0);
  const [voteStatus, setVoteStatus] = useState(() => {
    // Initialize vote status from localStorage
    if (comment.id) {
      const savedVoteStatus = localStorage.getItem(`comment_vote_${comment.id}`);
      return savedVoteStatus || null;
    }
    return null;
  });
  const [isVoting, setIsVoting] = useState(false);

  // Update votes when comment prop changes
  useEffect(() => {
    setCurrentVotes(comment.voteCount || 0);
  }, [comment.voteCount]);

  const hasReplies = comment.replies && comment.replies.length > 0;
  const maxDepth = 6; // Maximum nesting depth to prevent infinite recursion

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (replyText.trim() && onAddReply) {
      await onAddReply(replyText.trim(), comment.id);
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  const handleUpvote = async (e) => {
    e.stopPropagation();
    if (!isSignedIn) {
      navigate("/login");
      return;
    }

    if (!comment.id) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // If already upvoted, don't do anything
    if (voteStatus === 'upvoted') {
      return;
    }

    setIsVoting(true);
    try {
      const response = await fetch(`http://localhost:5000/comments/${comment.id}/upvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Update vote count from response
        if (data.votes !== undefined) {
          setCurrentVotes(data.votes);
        } else if (data.comment?.votes !== undefined) {
          setCurrentVotes(data.comment.votes);
        }
        // Set vote status to upvoted
        setVoteStatus('upvoted');
        // Persist vote status to localStorage
        if (comment.id) {
          localStorage.setItem(`comment_vote_${comment.id}`, 'upvoted');
        }
      } else {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/login");
        }
      }
    } catch (error) {
      // Error upvoting comment
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

    if (!comment.id) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // If already downvoted, don't do anything
    if (voteStatus === 'downvoted') {
      return;
    }

    setIsVoting(true);
    try {
      const response = await fetch(`http://localhost:5000/comments/${comment.id}/downvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Update vote count from response
        if (data.votes !== undefined) {
          setCurrentVotes(data.votes);
        } else if (data.comment?.votes !== undefined) {
          setCurrentVotes(data.comment.votes);
        }
        // Set vote status to downvoted
        setVoteStatus('downvoted');
        // Persist vote status to localStorage
        if (comment.id) {
          localStorage.setItem(`comment_vote_${comment.id}`, 'downvoted');
        }
      } else {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/login");
        }
      }
    } catch (error) {
      // Error downvoting comment
    } finally {
      setIsVoting(false);
    }
  };

  if (depth >= maxDepth) {
    return null; // Prevent infinite nesting
  }

  return (
    <div className={`comment-item ${isReply ? 'reply-item' : ''} depth-${depth}`}>
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{comment.author}</span>
          {comment.isOP && <span className="op-badge">OP</span>}
          <span className="comment-time">· {comment.timeAgo}</span>
        </div>
        <div className="comment-text">{comment.content}</div>
        
        {/* Voting and actions in one row */}
        <div className="comment-actions-row">
          <div className="comment-vote-section">
            <button 
              className={`comment-vote-btn upvote ${voteStatus === 'upvoted' ? 'comment-vote-btn-active comment-vote-btn-upvoted' : ''}`}
              onClick={handleUpvote}
              disabled={isVoting || !isSignedIn}
              title="Upvote"
            >
              <svg className="vote-icon" viewBox="0 0 24 24">
                <path d="M12 4l9 9h-6v7H9v-7H3l9-9z" />
              </svg>
            </button>
            <div className="comment-vote-count">{currentVotes}</div>
            <button 
              className={`comment-vote-btn downvote ${voteStatus === 'downvoted' ? 'comment-vote-btn-active comment-vote-btn-downvoted' : ''}`}
              onClick={handleDownvote}
              disabled={isVoting || !isSignedIn}
              title="Downvote"
            >
              <svg className="vote-icon" viewBox="0 0 24 24">
                <path d="M12 20l-9-9h6V4h6v7h6l-9 9z" />
              </svg>
            </button>
          </div>
          
          <div className="comment-action-buttons">
            <button 
              className="comment-action-btn reply-btn"
              onClick={toggleReplyForm}
            >
              Reply
            </button>
            <button className="comment-action-btn">Give Award</button>
            <button className="comment-action-btn">Share</button>
            <button className="comment-action-btn">Report</button>
            <button className="comment-action-btn">Save</button>
            <button className="comment-action-btn">•••</button>
            
            {hasReplies && !isReply && (
              <button 
                className="view-replies-btn"
                onClick={toggleReplies}
              >
                {showReplies ? 'Hide' : 'View'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </button>
            )}
          </div>
        </div>

        {/* Reply form */}
        {showReplyForm && (
          <div className="reply-form">
            <textarea 
              className="reply-input" 
              placeholder="Write your reply..."
              rows="3"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="reply-form-actions">
              <button 
                className="reply-cancel-btn"
                onClick={() => setShowReplyForm(false)}
              >
                Cancel
              </button>
              <button 
                className="reply-submit-btn"
                onClick={handleSubmitReply}
                disabled={!replyText.trim()}
              >
                Reply
              </button>
            </div>
          </div>
        )}

        {/* Replies */}
        {hasReplies && showReplies && !isReply && (
          <div className="replies-section">
            {comment.replies.map(reply => (
              <CommentItem 
                key={reply.id} 
                comment={reply} 
                isReply={true}
                depth={depth + 1}
                onAddReply={onAddReply}
                isSignedIn={isSignedIn}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;