import React from 'react';
import './PostImage.css';

const PostImage = ({ imageUrl }) => {
  return (
    <div className="post-image-container">
      <img 
        src={imageUrl} 
        alt="Post content" 
        className="post-image"
      />
    </div>
  );
};

export default PostImage;