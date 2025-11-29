import React from 'react';

const CommunityHeader = ({ community }) => {
  return (
    <div className="community-header bg-gray-100 p-4 rounded">
      <h1 className="text-2xl font-bold">{community.name}</h1>
      <p className="text-gray-600">{community.description}</p>
      <span className="text-sm text-gray-500">{community.members} members</span>
    </div>
  );
};

export default CommunityHeader;
