// DiscoverCommunities.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TempSidebar from '../../Components/Shared/TempSidebar';
import TempTopNav from '../../Components/Shared/TempTopNav';
import { useCommunities } from '../../Components/Community/CommunityContext';
import './DiscoverCommunities.css';

const DiscoverCommunities = () => {
  const navigate = useNavigate();
  const { joinCommunity, isCommunityJoined, joinedCommunities } = useCommunities();
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    setForceUpdate(prev => prev + 1);
  }, [joinedCommunities]);

  const communities = [
    { id: 1, name: 'funny', description: "Reddit's largest humor deposit...", members: '67M', iconColor: '#FF4500', icon: '😄' },
    { id: 2, name: 'AskReddit', description: "r/AskReddit is the place to ask ...", members: '57M', iconColor: '#0079D3', icon: '❓' },
    { id: 3, name: 'gaming', description: "The Number One Gaming fowl...", members: '47M', iconColor: '#FF6B35', icon: '🎮' },
    { id: 4, name: 'worldnews', description: "A place for major news from a...", members: '47M', iconColor: '#46D160', icon: '🌍' },
    { id: 5, name: 'todayilearned', description: "You learn something new every...", members: '41M', iconColor: '#FFD635', icon: '📚' },
    { id: 6, name: 'Music', description: "Reddit's #1 Music Community", members: '38M', iconColor: '#FF66AC', icon: '🎵' },
    { id: 7, name: 'aww', description: "Things that make you go AWW...", members: '38M', iconColor: '#FF8B60', icon: '🐾' },
    { id: 8, name: 'movies', description: "/r/movies is the world's largest ...", members: '37M', iconColor: '#9494FF', icon: '🎬' },
    { id: 9, name: 'memes', description: "Memes! A way of describing our...", members: '36M', iconColor: '#DDBD37', icon: '🐸' },
    { id: 10, name: 'science', description: "This community is a place to sh...", members: '34M', iconColor: '#46D160', icon: '🔬' },
    { id: 11, name: 'Showerthoughts', description: "A subreddit for sharing those ...", members: '34M', iconColor: '#0079D3', icon: '🚿' },
    { id: 12, name: 'pics', description: "A place for photographs, pictur...", members: '33M', iconColor: '#7C4DFF', icon: '📷' },
    { id: 13, name: 'news', description: "The place for news articles also...", members: '31M', iconColor: '#46D160', icon: '📰' },
    { id: 14, name: 'jokes', description: "The funniest sub on Reddit. Hu...", members: '30M', iconColor: '#FF4500', icon: '😂' },
    { id: 15, name: 'space', description: "Share & discuss informative co...", members: '28M', iconColor: '#0E141B', icon: '🚀' },
    { id: 16, name: 'DIY', description: "DIY member", members: '27M', iconColor: '#FF8B60', icon: '🔧' },
    { id: 17, name: 'books', description: "This is a moderated subreddit. L...", members: '27M', iconColor: '#FFD635', icon: '📖' },
    { id: 18, name: 'videos', description: "Reddit's main subreddit for vid...", members: '27M', iconColor: '#9494FF', icon: '🎥' },
    { id: 19, name: 'askscience', description: "Ask a science question, get a sc...", members: '26M', iconColor: '#46D160', icon: '🧪' },
    { id: 20, name: 'nottheonion', description: "For true stories that you could ...", members: '26M', iconColor: '#FF4500', icon: '🧅' },
    { id: 21, name: 'mildlyinteresting', description: "Aww. cripes. I didn't know I'd h...", members: '25M', iconColor: '#7C4DFF', icon: '🤔' },
    { id: 22, name: 'food', description: "The internet's number one pike...", members: '24M', iconColor: '#FF8B60', icon: '🍕' },
    { id: 23, name: 'GetMotivated', description: "Welcome to /r/GetMotivated! ...", members: '24M', iconColor: '#FFD635', icon: '💪' },
    { id: 24, name: 'EarthPorn', description: "The internet's largest communi...", members: '24M', iconColor: '#46D160', icon: '🌄' },
  ];

  const handleJoinCommunity = (community) => {
    joinCommunity(community);
  };

  const handleViewCommunity = (communityName) => {
    navigate(`/r/${communityName}`);
  };

  return (
    <div className="discover-communities-page">
      <TempSidebar />

      <div className="discover-communities-page__content">
        <TempTopNav />

        <main className="main-content">
          <div className="discover-communities-container">
            {/* Header Section */}
            <div className="discover-header">
              <h1 className="discover-main-title"><b>Top Communities</b></h1>
              <p className="discover-subtitle">Browse Reddit's largest communities</p>
            </div>

            {/* Communities List */}
            <div key={`communities-grid-${forceUpdate}`} className="communities-grid">
        {communities.map((community, index) => (
          <div key={community.id} className="community-card">
            {/* Rank Number */}
            <div className="community-rank">
              <span className="rank-number">{index + 1}</span>
            </div>
            
            {/* Community Content */}
            <div
              className="community-content"
              onClick={() => handleViewCommunity(community.name)}
            >
              <div className="community-header">
                <div className="community-icon" style={{ backgroundColor: community.iconColor }}>
                  <span className="icon-placeholder">{community.icon}</span>
                </div>
                <div className="community-info">
                  <h3 className="community-name">r/{community.name}</h3>
                  <div className="community-members">{community.members} members</div>
                </div>
              </div>
              
              <p className="community-description">{community.description}</p>
            </div>
            
            {/* Join Button */}
            <button
              className={`join-button ${isCommunityJoined(community.id) ? 'joined' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (!isCommunityJoined(community.id)) {
                  handleJoinCommunity(community);
                }
              }}
            >
              {isCommunityJoined(community.id) ? 'Joined' : 'Join'}
            </button>
          </div>
        ))}
      </div>

     
           
          </div>
        </main>
      </div>
    </div>
  );
};

export default DiscoverCommunities;