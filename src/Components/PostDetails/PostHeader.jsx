import React from 'react';
import './PostHeader.css';

const PostHeader = ({ subreddit, timeAgo, author, authorFlair }) => {
  return (
    <div className="post-header">
      <span className="subreddit">{subreddit}</span>
      <span className="post-time">· {timeAgo}</span>
      <div className="post-author">
        <span className="author-name">{author}</span>
        <span className="author-flair">{authorFlair}</span>
      </div>
    </div>
  );
};

export default PostHeader;