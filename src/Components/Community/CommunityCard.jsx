import React from 'react';
import { Link } from 'react-router-dom';

const CommunityCard = ({ community }) => {
  return (
    <div className="community-card border p-3 rounded shadow-sm">
      <Link to={`/c/${community.name}`}>
        <h3 className="text-lg font-bold">{community.name}</h3>
      </Link>
      <p className="text-sm text-gray-500">{community.description}</p>
      <span className="text-xs text-gray-400">{community.members} members</span>
    </div>
  );
};

export default CommunityCard;
