// src/Pages/UserProfile/UserProfile.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Shared layout components
import TopBar from "../../Components/Shared/TopBar/TopBar";
import LeftSideBar from "../../Components/Shared/LeftSideBar/LeftSideBar";
import PostCard from "../../Components/Shared/Post/PostCard";

// User profile specific components
import ProfileHeader from "../../Components/UserProfile/ProfileHeader";
import ProfileTabs from "../../Components/UserProfile/ProfileTabs";
import FeedControls from "../../Components/UserProfile/FeedControls";
import UserStatsCard from "../../Components/UserProfile/UserStatsCard";
import AchievementsCard from "../../Components/UserProfile/AchievementsCard";
import SidebarSettingsWidget from "../../Components/UserProfile/SidebarSettingsWidget";

// CSS for this page (Updated path to current folder)
import "./UserProfile.css";
import defaultAvatar from "../../assets/default-avatars/default.svg";

const UserProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Check if user is signed in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSignedIn(!!token);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError("No user ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        // Fetch user info
  const userResponse = await fetch(`http://localhost:5000/users/info/${userId}`, {
          method: "GET",
          headers: headers,
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userInfo = await userResponse.json();
        
        setUserData({
          displayname: userInfo.displayname || userInfo.username || "Unknown",
          username: userInfo.username || "unknown",
          avatarUrl: userInfo.avatarUrl || defaultAvatar,
          description: userInfo.description || "",
        });

        // Fetch user posts
  const postsResponse = await fetch(`http://localhost:5000/posts/user/${userId}`, {
          method: "GET",
          headers: headers,
        });

        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          const postsArray = Array.isArray(postsData) ? postsData : [];

          // Map posts to PostCard format
          const mappedPosts = postsArray.map((post) => {
            // Extract user data
            let postUserId = null;
            let postUserData = null;
            if (post.userId) {
              if (typeof post.userId === 'object' && post.userId._id) {
                postUserId = String(post.userId._id);
                postUserData = {
                  displayname: post.userId.displayname || '',
                  username: post.userId.username || '',
                  avatarUrl: post.userId.avatarUrl || ''
                };
              } else if (typeof post.userId === 'string') {
                postUserId = post.userId;
              }
            }

            // Extract community data
            let postCommunityId = null;
            let postCommunityData = null;
            if (post.communityId !== null && post.communityId !== undefined) {
              if (typeof post.communityId === 'object' && post.communityId._id) {
                postCommunityId = String(post.communityId._id);
                postCommunityData = {
                  communityName: post.communityId.communityName || '',
                  communityIcon: post.communityId.communityIcon || ''
                };
              } else if (typeof post.communityId === 'string') {
                postCommunityId = post.communityId;
              }
            }

            return {
              id: post._id || post.id,
              userId: postUserId,
              communityId: postCommunityId,
              userData: postUserData,
              communityData: postCommunityData,
              timeAgo: formatTimeAgo(post.createdAt || post.created_at),
              title: post.title || '',
              text: post.body || '',
              mediaUrl: post.mediaUrl || null,
              votes: post.votesCount || 0,
              commentsCount: post.commentsCount || 0,
            };
          });

          setPosts(mappedPosts);
        }
      } catch (err) {
        setError(err.message || "Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Helper function to format time ago
  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
    return `${Math.floor(diffInSeconds / 31536000)}y ago`;
  };

  // Temporary data for the UserStatsCard
  const mockUser = {
    followers: 142,
    karma: 3200,
    cakeDay: "Oct 24, 2021",
    contributions: posts.length
  };

  if (loading) {
    return (
      <div className="page user-profile-page">
        <TopBar isSignedIn={isSignedIn} />
        <div className="layout-with-leftbar">
          <LeftSideBar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen((prev) => !prev)} isSignedIn={isSignedIn} />
          <main className="user-profile-layout">
            <div style={{ padding: '40px', textAlign: 'center' }}>Loading user profile...</div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="page user-profile-page">
        <TopBar isSignedIn={isSignedIn} />
        <div className="layout-with-leftbar">
          <LeftSideBar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen((prev) => !prev)} isSignedIn={isSignedIn} />
          <main className="user-profile-layout">
            <div style={{ padding: '40px', textAlign: 'center', color: '#ea0027' }}>
              Error: {error || 'User not found'}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="page user-profile-page">
      {/* Top navigation bar */}
      <TopBar isSignedIn={isSignedIn} />

      <div className="layout-with-leftbar">
        {/* Left sidebar menu */}
        <LeftSideBar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen((prev) => !prev)} isSignedIn={isSignedIn} />

        {/* Main profile content area */}
        <main className="user-profile-layout">
          <section>
            <ProfileHeader 
              displayname={userData.displayname}
              username={userData.username}
              avatarUrl={userData.avatarUrl}
              description={userData.description}
            />
            <ProfileTabs />
            <FeedControls showCreatePost={false} />
            
            {/* Display user posts */}
            {posts.length > 0 ? (
              <div style={{ marginTop: '20px' }}>
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
              <div style={{ padding: '40px', textAlign: 'center', color: '#7c7c7c' }}>
                No posts yet
              </div>
            )}
          </section>

          {/* Right sidebar area */}
          <aside className="user-profile-sidebar">
            <UserStatsCard user={mockUser} />
            <AchievementsCard />
            <SidebarSettingsWidget />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;