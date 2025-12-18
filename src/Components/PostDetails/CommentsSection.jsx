import React, { useState } from 'react';
import './CommentsSection.css';
import CommentItem from './CommentItem';

const CommentsSection = ({ comments, onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() && onAddComment) {
      onAddComment(commentText.trim());
      setCommentText(''); // Clear the text field
    }
  };

  const handleCancel = () => {
    setCommentText('');
  };

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3 className="comments-title">Comments ({comments.length})</h3>
        <div className="comments-sort">
          <span className="sort-label">Sort by:</span>
          <button className="sort-btn active">Best</button>
          <button className="sort-btn">New</button>
          <button className="sort-btn">Top</button>
        </div>
      </div>

      <div className="add-comment">
        <div className="comment-avatar">T</div>
        <textarea 
          className="comment-input" 
          placeholder="Add your comment"
          rows="3"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div className="comment-actions">
          <button 
            className="comment-cancel-btn"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
          <button 
            className="comment-submit-btn"
            onClick={handleSubmit}
            disabled={!commentText.trim()}
            type="button"
          >
            Comment
          </button>
        </div>
      </div>

      <div className="comments-list">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      <button className="view-more-comments">
        View more comments
      </button>
    </div>
  );
};

export default CommentsSection;