import React, { useState } from 'react';
import './CommentItem.css';

const CommentItem = ({ comment, isReply = false, depth = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  const hasReplies = comment.replies && comment.replies.length > 0;
  const maxDepth = 6; // Maximum nesting depth to prevent infinite recursion

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      console.log('Submitting reply:', replyText);
      // Here you would typically send to backend
      setReplyText('');
      setShowReplyForm(false);
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
            <button className="comment-vote-btn upvote">
              <svg className="vote-icon" viewBox="0 0 24 24">
                <path d="M12 4l9 9h-6v7H9v-7H3l9-9z" />
              </svg>
            </button>
            <div className="comment-vote-count">{comment.voteCount}</div>
            <button className="comment-vote-btn downvote">
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;