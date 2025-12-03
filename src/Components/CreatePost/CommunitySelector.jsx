import React from 'react';
import './CommunitySelector.css';

const CommunitySelector = ({ selectedCommunity, setSelectedCommunity }) => {
  const communities = [
    'AskReddit',
    'funny',
    'todayilearned',
    'worldnews',
    'gaming',
    'movies',
    'pics',
    'science',
    'technology'
  ];

  return (
    <div className="form-section">
      <div className="community-selector">
        <select 
          value={selectedCommunity}
          onChange={(e) => setSelectedCommunity(e.target.value)}
          className="community-dropdown"
        >
          <option value="">Select a community</option>
          {communities.map(community => (
            <option key={community} value={community}>r/{community}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CommunitySelector;