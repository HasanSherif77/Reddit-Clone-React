// CommunityPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../../Components/Shared/TopBar/TopBar';
import LeftSideBar from '../../Components/Shared/LeftSideBar/LeftSideBar';
import CommunityHeader from '../../Components/Community/CommunityHeader';
import EmptyCommunityFeed from '../../Components/Community/EmptyCommunityFeed';
import CommunitySidebar from '../../Components/Community/CommunitySidebar';
import PostCard from '../../Components/Shared/Post/PostCard';
import './CommunityPage.css';
import '../../Components/Shared/Post/PostsList.css';

const CommunityPage = () => {
  const { communityName } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postsLoading, setPostsLoading] = useState(true);
  const [hasJoined, setHasJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');

  // Check if user is signed in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSignedIn(!!token);
  }, []);

  // Fetch community data and posts
  useEffect(() => {
    const fetchCommunityData = async () => {
      if (!communityName || communityName === 'home') {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        // First, fetch all communities to find the one matching the name
        const communitiesResponse = await fetch('http://localhost:5000/communities/', {
          method: 'GET',
          headers: headers,
        });

        if (!communitiesResponse.ok) {
          throw new Error('Failed to fetch communities');
        }

        const communitiesData = await communitiesResponse.json();
        const communitiesArray = Array.isArray(communitiesData) ? communitiesData : communitiesData.communities || [];
        
        // Find the community by name
        const foundCommunity = communitiesArray.find(
          comm => comm.communityName && comm.communityName.toLowerCase() === communityName.toLowerCase()
        );

        if (!foundCommunity) {
          setError('Community not found');
          setLoading(false);
          return;
        }

        // Map backend community data to frontend format
        const mappedCommunity = {
          id: foundCommunity._id || foundCommunity.id,
          name: foundCommunity.communityName || '',
          description: foundCommunity.communityDescription || '',
          members: foundCommunity.communityMembersCount || 0,
          icon: foundCommunity.communityIcon || '',
          iconColor: '#0079d3', // Default color
          banner: foundCommunity.communityBanner || '',
          createdAt: foundCommunity.createdAt || foundCommunity.created_at,
        };

        setCommunity(mappedCommunity);

        // Now fetch posts for this community
        const communityId = String(mappedCommunity.id);
        setPostsLoading(true);
        
        const postsResponse = await fetch(`http://localhost:5000/posts/community/${communityId}`, {
          method: 'GET',
          headers: headers,
        });

        if (!postsResponse.ok) {
          throw new Error('Failed to fetch posts');
        }

        const postsData = await postsResponse.json();
        const postsArray = Array.isArray(postsData) ? postsData : postsData.posts || [];

        // Map posts to PostCard format (similar to PostsList.jsx)
        const mappedPosts = postsArray.map((post) => {
          // Extract user data - backend populates userId with full user object
          let userId = null;
          let userData = null;
          if (post.userId) {
            if (typeof post.userId === 'object' && post.userId._id) {
              userId = String(post.userId._id);
              userData = {
                displayname: post.userId.displayname || '',
                username: post.userId.username || '',
                avatarUrl: post.userId.avatarUrl || ''
              };
            } else if (typeof post.userId === 'string') {
              userId = post.userId;
            }
          }
          
          // Extract community data - backend populates communityId with full community object
          let communityId = null;
          let communityData = null;
          if (post.communityId !== null && post.communityId !== undefined) {
            if (typeof post.communityId === 'object' && post.communityId._id) {
              communityId = String(post.communityId._id);
              communityData = {
                communityName: post.communityId.communityName || '',
                communityIcon: post.communityId.communityIcon || ''
              };
            } else if (typeof post.communityId === 'string') {
              communityId = post.communityId;
            }
          }

          return {
            id: post._id || post.id,
            userId: userId,
            communityId: communityId,
            userData: userData,
            communityData: communityData,
            timeAgo: formatTimeAgo(post.createdAt || post.created_at),
            title: post.title || '',
            text: post.body || '',
            mediaUrl: post.mediaUrl || null,
            votes: post.votesCount || 0,
            commentsCount: post.commentsCount || 0,
          };
        });

        setPosts(mappedPosts);
      } catch (err) {
        setError(err.message || 'Failed to load community');
      } finally {
        setLoading(false);
        setPostsLoading(false);
      }
    };

    fetchCommunityData();
  }, [communityName]);

  // Fetch current user data to check joinedCommunities
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!isSignedIn || !community || !community.id) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const user = await response.json();
          setCurrentUserData(user);
          
          // Check if user has joined this community
          const joinedCommunities = user.joinedCommunities || [];
          const communityIdString = String(community.id);
          const isJoined = joinedCommunities.some(commId => 
            String(commId) === communityIdString || 
            String(commId._id || commId) === communityIdString
          );
          setHasJoined(isJoined);
        }
      } catch (error) {
        // Error fetching current user data
      }
    };

    fetchCurrentUser();
  }, [isSignedIn, community]);

  // Listen for community join/leave events to refresh join status
  useEffect(() => {
    const handleCommunityChange = async () => {
      // Refresh join status when any community join/leave happens
      if (!isSignedIn || !community || !community.id) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const user = await response.json();
          setCurrentUserData(user);
          
          // Check if user has joined this community
          const joinedCommunities = user.joinedCommunities || [];
          const communityIdString = String(community.id);
          const isJoined = joinedCommunities.some(commId => 
            String(commId) === communityIdString || 
            String(commId._id || commId) === communityIdString
          );
          setHasJoined(isJoined);
        }
      } catch (error) {
        // Error fetching current user data
      }
    };

    window.addEventListener('communityJoined', handleCommunityChange);
    window.addEventListener('communityLeft', handleCommunityChange);

    return () => {
      window.removeEventListener('communityJoined', handleCommunityChange);
      window.removeEventListener('communityLeft', handleCommunityChange);
    };
  }, [community, isSignedIn]);

  // Handle join/leave community
  const handleJoinClick = async () => {
    if (!isSignedIn) {
      navigate("/login");
      return;
    }

    if (!community || !community.id) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setIsJoining(true);
    try {
      const communityIdString = String(community.id);
      const endpoint = hasJoined 
        ? `http://localhost:5000/users/communities/${communityIdString}/leave`
        : `http://localhost:5000/users/communities/${communityIdString}/join`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Toggle join status
        setHasJoined(!hasJoined);
        
        // Update current user data
        if (currentUserData) {
          const updatedJoinedCommunities = hasJoined
            ? (currentUserData.joinedCommunities || []).filter(commId => 
                String(commId) !== communityIdString && 
                String(commId._id || commId) !== communityIdString
              )
            : [...(currentUserData.joinedCommunities || []), communityIdString];
          
          setCurrentUserData({
            ...currentUserData,
            joinedCommunities: updatedJoinedCommunities
          });
        }

        // Dispatch custom event to notify other components to refresh
        const eventName = hasJoined ? 'communityLeft' : 'communityJoined';
        window.dispatchEvent(new CustomEvent(eventName, {
          detail: { communityId: communityIdString }
        }));
      } else {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/login");
        }
      }
    } catch (error) {
      // Error joining/leaving community
    } finally {
      setIsJoining(false);
    }
  };

  // Handle create post navigation
  const handleCreatePost = () => {
    if (!isSignedIn) {
      navigate("/login");
      return;
    }
    if (community && community.name) {
      navigate(`/create-post?community=${encodeURIComponent(community.name)}`);
    } else {
      navigate("/create-post");
    }
  };

  // Helper function to format time ago
  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Just now';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  // Handle home page case
  if (!communityName || communityName === 'home') {
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
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
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
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <p>Loading community...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Show error message if no community is available
  if (error || !community) {
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
                  {error || `The community r/${communityName} doesn't exist or has been removed.`}
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
            <CommunityHeader 
              community={community}
              hasJoined={hasJoined}
              isJoining={isJoining}
              onJoinClick={handleJoinClick}
              onCreatePost={handleCreatePost}
              isSignedIn={isSignedIn}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="content-wrapper">
              <section className="content-main">
                {activeTab === 'posts' ? (
                  <>
                    {postsLoading ? (
                      <div style={{ padding: '40px', textAlign: 'center' }}>
                        <p>Loading posts...</p>
                      </div>
                    ) : posts.length > 0 ? (
                      <div className="posts-list">
                        {posts.map((post) => (
                          <PostCard
                            key={post.id}
                            id={post.id}
                            userId={post.userId}
                            communityId={post.communityId}
                            userData={post.userData}
                            communityData={post.communityData}
                            timeAgo={post.timeAgo}
                            title={post.title}
                            text={post.text}
                            mediaUrl={post.mediaUrl}
                            votes={post.votes}
                            commentsCount={post.commentsCount}
                            isSignedIn={isSignedIn}
                            preferCommunity={true}
                          />
                        ))}
                      </div>
                    ) : (
                      <EmptyCommunityFeed community={community} />
                    )}
                  </>
                ) : (
                  <div className="about-tab-content" style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: '1px solid #edeff1',
                    padding: '24px',
                    marginTop: '16px'
                  }}>
                    <h2 style={{ 
                      color: '#1a1a1b', 
                      marginBottom: '16px', 
                      fontSize: '20px',
                      fontWeight: '500'
                    }}>
                      About r/{community.name}
                    </h2>
                    <p style={{ 
                      color: '#1a1a1b', 
                      fontSize: '14px',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {community.description || 'No description available.'}
                    </p>
                    <div style={{ 
                      marginTop: '24px',
                      paddingTop: '24px',
                      borderTop: '1px solid #edeff1'
                    }}>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '12px'
                      }}>
                        <span style={{ color: '#878a8c', fontSize: '14px' }}>Created</span>
                        <span style={{ color: '#1a1a1b', fontSize: '14px' }}>
                          {community.createdAt ? new Date(community.createdAt).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          }) : 'Unknown'}
                        </span>
                      </div>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                      }}>
                        <span style={{ color: '#878a8c', fontSize: '14px' }}>Members</span>
                        <span style={{ color: '#1a1a1b', fontSize: '14px' }}>
                          {community.members?.toLocaleString() || '0'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </section>
              {activeTab === 'posts' && (
                <section className="content-sidebar">
                  <CommunitySidebar community={community} />
                </section>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityPage;