// CommunityPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../../Components/Shared/TopBar/TopBar';
import LeftSideBar from '../../Components/Shared/LeftSideBar/LeftSideBar';
import CommunityHeader from '../../Components/Community/CommunityHeader';
import EmptyCommunityFeed from '../../Components/Community/EmptyCommunityFeed';
import CommunitySidebar from '../../Components/Community/CommunitySidebar';
import PostCard from '../../Components/Shared/Post/PostCard';
import { useCommunities } from '../../Components/Community/CommunityContext';
import './CommunityPage.css';
import '../../Components/Shared/Post/PostsList.css';

const CommunityPage = () => {
  const { communityName } = useParams();
  const { communities, joinedCommunities, getCommunityByNameExtended } = useCommunities();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(true);

  // Get all communities (created + joined) for fallback logic
  const allCommunities = [...communities, ...joinedCommunities];

  // Handle different cases
  let community = null;
  let isHomePage = false;

  if (!communityName || communityName === 'home') {
    // Home page - show first community or empty state
    isHomePage = true;
    community = allCommunities.length > 0 ? allCommunities[0] : null;
  } else {
    // Specific community page
    community = getCommunityByNameExtended(communityName);
  }

  // Redirect to discover communities if no communities exist and trying to access home
  useEffect(() => {
    if (allCommunities.length === 0 && (!communityName || communityName === 'home')) {
      navigate('/discover-communities');
    }
  }, [allCommunities.length, communityName, navigate]);

  // Show error message if no community is available and not home page
  if (!community && !isHomePage) {
    return (
      <div className="App">
        <TopBar isSignedIn={isSignedIn} />
        <div className="leftsidebar-layout">
          <LeftSideBar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((prev) => !prev)}
            isSignedIn={isSignedIn}
          />
          <main className="community-page-content">
            <div className="community-page-container">
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #edeff1',
                margin: '20px 0'
              }}>
                <h1 style={{ color: '#1a1a1b', marginBottom: '10px', fontSize: '24px' }}>Community Not Found</h1>
                <p style={{ color: '#7c7c7c', marginBottom: '20px', fontSize: '16px' }}>
                  The community r/{communityName} doesn't exist or has been removed.
                </p>
                <button
                  onClick={() => navigate('/discover-communities')}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#0079D3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  Browse Communities
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
  // Home page view
  if (isHomePage) {
    return (
      <div className="App">
        <TopBar isSignedIn={isSignedIn} />
        <div className="leftsidebar-layout">
          <LeftSideBar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((prev) => !prev)}
            isSignedIn={isSignedIn}
          />
          <main className="community-page-content">
            <div className="community-page-container">
              <div className="content-wrapper">
                <section className="content-main">
                  <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: '1px solid #edeff1',
                    padding: '40px 20px',
                    textAlign: 'center',
                    margin: '20px 0'
                  }}>
                    <h1 style={{ color: '#1a1a1b', marginBottom: '10px', fontSize: '28px' }}>Welcome to Reddit Clone</h1>
                    <p style={{ color: '#7c7c7c', marginBottom: '30px', fontSize: '16px' }}>
                      Your best source for what's new and trending across all communities.
                    </p>
                    <button
                      onClick={() => navigate('/discover-communities')}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#0079D3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '500',
                        marginRight: '10px'
                      }}
                    >
                      Discover Communities
                    </button>
                    <button
                      onClick={() => navigate('/add-topics')}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#46D160',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '500'
                      }}
                    >
                      Create Community
                    </button>
                  </div>
                </section>
                <section className="content-sidebar">
                  <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: '1px solid #edeff1',
                    padding: '20px',
                    margin: '20px 0'
                  }}>
                    <h3 style={{ marginBottom: '15px', color: '#1a1a1b' }}>Popular Communities</h3>
                    {allCommunities.slice(0, 5).map((comm) => (
                      <div key={comm.id} style={{
                        marginBottom: '10px',
                        padding: '8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        border: '1px solid #edeff1'
                      }} onClick={() => navigate(`/r/${comm.name}`)}>
                        <span style={{ fontWeight: 'bold' }}>r/{comm.name}</span>
                        <span style={{ color: '#7c7c7c', fontSize: '12px', marginLeft: '8px' }}>
                          {comm.members || '0'} members
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Specific community page
  return (
    <div className="App">
      <TopBar isSignedIn={isSignedIn} />
      <div className="leftsidebar-layout">
        <LeftSideBar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
          isSignedIn={isSignedIn}
        />
        <main className="community-page-content">
          <div className="community-page-container">
            <CommunityHeader community={community} />

            <div className="content-wrapper">
              <section className="content-main">
                {community.posts && community.posts.length > 0 ? (
                  <div className="posts-list">
                    {community.posts.map((post) => (
                      <PostCard
                        key={post.id}
                        community={`r/${community.name}`}
                        communityIcon={community.icon || community.iconUrl || null}
                        timeAgo={post.timeAgo || post.createdAt || 'Just now'}
                        title={post.title}
                        text={post.text || null}
                        mediaUrl={post.mediaUrl || null}
                        votes={post.votes || post.voteCount || 0}
                        commentsCount={post.commentsCount || post.commentCount || 0}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyCommunityFeed community={community} />
                )}
              </section>
              <section className="content-sidebar">
                <CommunitySidebar community={community} />
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityPage;