// ManageCommunityItem.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageCommunityItem.css';

const ManageCommunityItem = () => {
  const navigate = useNavigate();
  const [isJoined, setIsJoined] = useState(true);

  const communities = [
    {
      id: 1,
      name: 'Music',
      description: "Reddit's #1 Music Community",
      isJoined: true
    },
    {
      id: 2,
      name: 'testtestists',
      description: "test",
      isJoined: true
    }
  ];

  const handleJoinToggle = (communityId) => {
    setIsJoined(!isJoined);
    // In a real app, this would toggle join status for the specific community
    alert(`Toggled join status for community ${communityId}`);
  };

  const handleCommunityClick = (communityName) => {
    navigate(`/r/${communityName}`);
  };

  return (
    <div className="manage-communities-container">
      {communities.map((community) => (
        <div key={community.id} className="manage-community-item">
          <div
            className="community-info"
            onClick={() => handleCommunityClick(community.name)}
          >
            <div className="community-header">
              <span className="community-prefix">r/</span>
              <h3 className="community-name">{community.name}</h3>
            </div>
            <p className="community-description">{community.description}</p>
          </div>
          
          <div className="community-actions">
            <button 
              className={`join-status ${community.isJoined ? 'joined' : 'not-joined'}`}
              onClick={() => handleJoinToggle(community.id)}
            >
              {community.isJoined ? 'Joined' : 'Join'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageCommunityItem;