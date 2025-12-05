import React from 'react';
import './PostTypeTabs.css';  

const PostTypeTabs = ({ postType, setPostType }) => {
  const postTypes = ['Text', 'Images & Video', 'Link', 'Poll'];

  return (
    <div className="post-type-tabs">
      {postTypes.map(type => (
        <button
          key={type}
          className={`post-type-tab ${postType === type ? 'active' : ''}`}
          onClick={() => setPostType(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default PostTypeTabs;