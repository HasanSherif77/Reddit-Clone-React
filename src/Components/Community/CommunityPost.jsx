import React from 'react';

function CommunityPost({ post }) {
  return (
    <div className="post border p-3 rounded shadow-sm mb-2">
      <h3 className="font-bold">{post.title}</h3>
      <p>{post.content}</p>
      <span className="text-xs text-gray-400">{post.author}</span>
    </div>
  );
}

export default CommunityPost;
