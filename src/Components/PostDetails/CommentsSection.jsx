import React, { useState, useEffect } from 'react';
import './CommentsSection.css';
import CommentItem from './CommentItem';
import defaultAvatar from '../../assets/default-avatars/default.svg';

const CommentsSection = ({ comments, onAddComment, onAddReply, onDeleteComment, isSignedIn = true }) => {
  const [commentText, setCommentText] = useState('');
  const [userAvatar, setUserAvatar] = useState(defaultAvatar);

  // Fetch current user's avatar
  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (!isSignedIn) {
        setUserAvatar(defaultAvatar);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setUserAvatar(defaultAvatar);
        return;
      }

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
          if (user.avatarUrl && user.avatarUrl.trim() !== '') {
            setUserAvatar(user.avatarUrl);
          } else {
            setUserAvatar(defaultAvatar);
          }
        } else {
          setUserAvatar(defaultAvatar);
        }
      } catch (error) {
        setUserAvatar(defaultAvatar);
      }
    };

    fetchUserAvatar();
  }, [isSignedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim() && onAddComment) {
      await onAddComment(commentText.trim());
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
        <img 
          src={userAvatar} 
          alt="Your avatar" 
          className="comment-avatar-img"
          onError={(e) => {
            if (e.target.src !== defaultAvatar) {
              e.target.src = defaultAvatar;
            }
          }}
        />
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
          <CommentItem 
            key={comment.id} 
            comment={comment} 
            onAddReply={onAddReply}
            onDeleteComment={onDeleteComment}
            isSignedIn={isSignedIn}
          />
        ))}
      </div>

      <button className="view-more-comments">
        View more comments
      </button>
    </div>
  );
};

export default CommentsSection;