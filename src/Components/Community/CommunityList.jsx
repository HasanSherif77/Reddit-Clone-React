import React from 'react';
import CommunityCard from './CommunityCard';

const CommunityList = ({ communities }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {communities.map((c) => (
        <CommunityCard key={c.id} community={c} />
      ))}
    </div>
  );
};

export default CommunityList;
