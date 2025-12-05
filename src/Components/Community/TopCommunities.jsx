// TopCommunitiesSidebar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopCommunitiesSidebar.css';

const TopCommunitiesSidebar = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const communities = [
    { id: 1, name: 'funny', description: "Reddit's largest humor deposit...", members: '57M' },
    { id: 2, name: 'subreddit', description: "r/subreddit is the place to ask...", members: '57M' },
    { id: 3, name: 'gaming', description: "The Number One Gaming from...", members: '57M' },
    { id: 4, name: 'worldnews', description: "A place for major news from all...", members: '57M' },
    { id: 5, name: 'todayilearned', description: "You learn something new every...", members: '57M' },
    { id: 6, name: 'memes', description: "Memes! A way of describing us...", members: '58M' },
    { id: 7, name: 'news', description: "The place for news articles also...", members: '57M' },
    { id: 8, name: 'books', description: "This is a moderated subreddit...", members: '57M' },
    { id: 9, name: 'mildlyinteresting', description: "Jesus copies, I didn't know it'd...", members: '58M' },
    { id: 10, name: 'movies', description: "This community is a place to sit...", members: '58M' },
    { id: 11, name: 'pics', description: "The funniest sub on Reddit, Ms...", members: '58M' },
    { id: 12, name: 'gifs', description: "Reddit's main subreddit for vide...", members: '57M' },
    { id: 13, name: 'music', description: "The internet's number one pile...", members: '58M' },
    { id: 14, name: 'LIFEHACKS', description: "Tips that improve your life in o...", members: '58M' },
    { id: 15, name: 'aww', description: "Things that make you go AWW...", members: '58M' },
    { id: 16, name: 'Showerthoughts', description: "A subreddit for sharing those ...", members: '58M' },
    { id: 17, name: 'tifu', description: "Draw a discount information ex...", members: '58M' },
    { id: 18, name: 'askscience', description: "Ask a science question, get a ...", members: '58M' },
    { id: 19, name: 'GetMotivated', description: "Welcome to /r/GetMotivated...", members: '58M' },
    { id: 20, name: 'DIY', description: "What are you doing?", members: '57M' },
    { id: 21, name: 'personalfinance', description: "For tips and how you could ...", members: '58M' },
    { id: 22, name: 'ExplainLikeImFive', description: "The internet's largest community...", members: '58M' },
    { id: 23, name: 'IAmA', description: "I Am A, where the mundane be...", members: '58M' },
    { id: 24, name: 'LIFEHACKS', description: "Tips that improve your life in o...", members: '58M' },
    { id: 25, name: 'Fitness', description: "The internet's number one pile...", members: '58M' },
    { id: 26, name: 'GetMotivated', description: "Welcome to /r/GetMotivated...", members: '58M' },
    { id: 27, name: 'gadgets', description: "Gadgets", members: '58M' },
    { id: 28, name: 'IAmA', description: "I am A, where the mundane be...", members: '58M' },
  ];

  const displayedCommunities = showAll ? communities : communities.slice(0, 10);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleJoinCommunity = (communityName) => {
    alert(`Join ${communityName} functionality would go here`);
  };

  const handleViewCommunity = (communityName) => {
    navigate(`/r/${communityName}`);
  };

  return (
    <div className="top-communities-sidebar">
      <div className="communities-header">
        <h1 className="communities-main-title">Test of Reddit</h1>
        
        <div className="communities-section">
          <h2 className="communities-title">Top Communities</h2>
          <p className="communities-subtitle">Browse Reddit's largest communities</p>
        </div>
      </div>

      <div className="communities-list">
        {displayedCommunities.map((community, index) => (
          <div key={community.id} className="community-item">
            <div className="community-rank">{index + 1}</div>
            
            <div
              className="community-content"
              onClick={() => handleViewCommunity(community.name)}
            >
              <div className="community-header">
                <span className="community-prefix">r/</span>
                <h3 className="community-name">{community.name}</h3>
              </div>
              <p className="community-description">{community.description}</p>
              <div className="community-members">{community.members} members</div>
            </div>

            <button 
              className="join-button"
              onClick={(e) => {
                e.stopPropagation();
                handleJoinCommunity(community.name);
              }}
            >
              Join
            </button>
          </div>
        ))}
      </div>

      <button className="view-all-button" onClick={toggleShowAll}>
        {showAll ? 'Show Less' : 'View All'}
      </button>
    </div>
  );
};

export default TopCommunitiesSidebar;