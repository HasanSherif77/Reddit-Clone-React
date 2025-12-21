// DiscoverCommunities.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../Components/Shared/TopBar/TopBar';
import LeftSideBar from '../../Components/Shared/LeftSideBar/LeftSideBar';
import './DiscoverCommunities.css';

const DiscoverCommunities = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joinStatus, setJoinStatus] = useState({}); // Map of communityId -> hasJoined
  const [joiningCommunities, setJoiningCommunities] = useState({}); // Map of communityId -> isJoining
  const [currentUserData, setCurrentUserData] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Check if user is signed in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSignedIn(!!token);
  }, []);

  // Fetch communities from backend
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

  const response = await fetch('http://localhost:5000/communities/', {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch communities');
        }

        const data = await response.json();
        const communitiesArray = Array.isArray(data) ? data : data.communities || [];
        
        // Map backend data to frontend format
        const mappedCommunities = communitiesArray.map((community, index) => {
          // Format members count
          const membersCount = community.communityMembersCount || 0;
          let formattedMembers = '';
          if (membersCount >= 1000000) {
            formattedMembers = `${(membersCount / 1000000).toFixed(1)}M`;
          } else if (membersCount >= 1000) {
            formattedMembers = `${(membersCount / 1000).toFixed(1)}K`;
          } else {
            formattedMembers = membersCount.toString();
          }

          // Generate a default icon color if no icon is provided
          const iconColors = ['#FF4500', '#0079D3', '#FF6B35', '#46D160', '#FFD635', '#FF66AC', '#FF8B60', '#9494FF', '#DDBD37', '#7C4DFF', '#0E141B'];
          const defaultIconColor = iconColors[index % iconColors.length];
          const defaultIcon = '🌐'; // Default emoji icon

          return {
            id: community._id || community.id || index,
            name: community.communityName || '',
            description: community.communityDescription || '',
            members: formattedMembers,
            membersCount: membersCount,
            iconColor: defaultIconColor,
            icon: defaultIcon,
            communityIcon: community.communityIcon || '',
          };
        });

        // Sort by members count (descending)
        mappedCommunities.sort((a, b) => b.membersCount - a.membersCount);

        setCommunities(mappedCommunities);
      } catch (err) {
        setError(err.message || 'Failed to load communities');
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // Force update when join status changes
  useEffect(() => {
    setForceUpdate(prev => prev + 1);
  }, [joinStatus]);

  // Fetch current user data to check joinedCommunities
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!isSignedIn) return;

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
          
          // Build join status map for all communities
          const joinedCommunities = user.joinedCommunities || [];
          const statusMap = {};
          
          communities.forEach(community => {
            const communityIdString = String(community.id);
            const isJoined = joinedCommunities.some(commId => 
              String(commId) === communityIdString || 
              String(commId._id || commId) === communityIdString
            );
            statusMap[communityIdString] = isJoined;
          });
          
          setJoinStatus(statusMap);
        }
      } catch (error) {
        // Error fetching current user data
      }
    };

    if (isSignedIn && communities.length > 0) {
      fetchCurrentUser();
    }
  }, [isSignedIn, communities]);

  // Listen for community join/leave events to refresh join status
  useEffect(() => {
    const handleCommunityChange = async () => {
      // Refresh join status when any community join/leave happens
      if (!isSignedIn) return;

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
          
          // Build join status map for all communities
          const joinedCommunities = user.joinedCommunities || [];
          const statusMap = {};
          
          communities.forEach(community => {
            const communityIdString = String(community.id);
            const isJoined = joinedCommunities.some(commId => 
              String(commId) === communityIdString || 
              String(commId._id || commId) === communityIdString
            );
            statusMap[communityIdString] = isJoined;
          });
          
          setJoinStatus(statusMap);
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
  }, [communities, isSignedIn]);

  const handleJoinCommunity = async (e, community) => {
    e.stopPropagation();
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

    const communityIdString = String(community.id);
    const hasJoined = joinStatus[communityIdString] || false;

    setJoiningCommunities(prev => ({ ...prev, [communityIdString]: true }));
    
    try {
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
        setJoinStatus(prev => ({
          ...prev,
          [communityIdString]: !hasJoined
        }));
        
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
      setJoiningCommunities(prev => ({ ...prev, [communityIdString]: false }));
    }
  };

  const handleViewCommunity = (communityName) => {
    navigate(`/r/${communityName}`);
  };

  return (
    <div className="App">
      <TopBar isSignedIn={isSignedIn} />
      <div className="leftsidebar-layout">
        <LeftSideBar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
          isSignedIn={isSignedIn}
        />
        <main className="discover-communities-content">
          <div className="discover-communities-container">
            {/* Header Section */}
            <div className="discover-header">
              <h1 className="discover-main-title"><b>Top Communities</b></h1>
              <p className="discover-subtitle">Browse Reddit's largest communities</p>
            </div>

            {/* Loading State */}
            {loading && (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <p>Loading communities...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#ff4500' }}>
                <p>Error: {error}</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && communities.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <p>No communities found.</p>
              </div>
            )}

            {/* Communities List */}
            {!loading && !error && communities.length > 0 && (
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
                      {community.communityIcon && community.communityIcon.trim() !== '' ? (
                        <img 
                          src={community.communityIcon} 
                          alt={`${community.name} icon`}
                          className="community-icon-img"
                          onError={(e) => {
                            // Fallback to colored icon if image fails
                            e.target.style.display = 'none';
                            const fallbackIcon = e.target.nextElementSibling;
                            if (fallbackIcon) {
                              fallbackIcon.style.display = 'flex';
                            }
                          }}
                        />
                      ) : null}
                      <div 
                        className="community-icon" 
                        style={{ 
                          backgroundColor: community.iconColor,
                          display: (community.communityIcon && community.communityIcon.trim() !== '') ? 'none' : 'flex'
                        }}
                      >
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
                    className={`join-button ${joinStatus[String(community.id)] ? 'joined' : ''}`}
                    onClick={(e) => handleJoinCommunity(e, community)}
                    disabled={joiningCommunities[String(community.id)] || !isSignedIn}
                  >
                    {joiningCommunities[String(community.id)] 
                      ? '...' 
                      : (joinStatus[String(community.id)] ? 'Joined' : 'Join')
                    }
                  </button>
                </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DiscoverCommunities;