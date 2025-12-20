import React from 'react';
import './CommunitySelector.css';

const CommunitySelector = ({ selectedCommunity, setSelectedCommunity, communities = [], loading = false }) => {
  return (
    <div className="form-section">
      <div className="community-selector">
        <select 
          value={selectedCommunity}
          onChange={(e) => setSelectedCommunity(e.target.value)}
          className="community-dropdown"
          disabled={loading}
        >
          <option value="">Select a community</option>
          {communities.map(community => (
            <option key={community.id || community.name} value={community.id || ''}>
              r/{community.name}
            </option>
          ))}
        </select>
        <span className="community-optional-label">(Optional)</span>
      </div>
    </div>
  );
};

export default CommunitySelector;