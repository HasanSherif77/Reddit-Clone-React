import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TopBar.css";
import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";
import FloatingChat from "../../../Pages/DirectMesseges/FloatingChat";

import redditLogoImage from "../../../assets/images/Logo.png";
import searchIconImage from "../../../assets/images/Search.svg";
import adImage from "../../../assets/images/Ad.svg";
import bellImage from "../../../assets/images/Bell.svg";
import chatImage from "../../../assets/images/Chat.svg";
import createImage from "../../../assets/images/Create.svg";
import defaultAvatar from "../../../assets/default-avatars/default.svg";

function TopBar({ isSignedIn = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: null,
    displayName: null,
    avatarUrl: null,
    id: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Load search query from localStorage on mount
  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    setSearchQuery(savedQuery);
  }, []);

  // Sync with URL query parameter when on search results page
  useEffect(() => {
    if (location.pathname === '/search') {
      const urlParams = new URLSearchParams(location.search);
      const urlQuery = urlParams.get('q') || '';
      if (urlQuery) {
        setSearchQuery(urlQuery);
        localStorage.setItem('searchQuery', urlQuery);
      }
    }
  }, [location]);

  // Save search query to localStorage whenever it changes
  useEffect(() => {
    if (searchQuery !== '') {
      localStorage.setItem('searchQuery', searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      // Don't clear search query - keep it for navigation
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Fetch user data when signed in
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isSignedIn) {
        setUserData({ username: null, displayName: null, avatarUrl: null });
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userId = data._id || data.id || data.user?._id || data.user?.id || localStorage.getItem("userId");
          setUserData({
            username: data.username || data.user?.username || null,
            displayName: data.displayname || data.displayName || data.user?.displayname || data.user?.displayName || null,
            avatarUrl: data.avatarUrl || data.avatar || data.user?.avatarUrl || data.user?.avatar || null,
            id: userId,
          });
          if (userId) {
            localStorage.setItem("userId", userId);
          }
        } else {
          console.error("Failed to fetch user data");
          // If token is invalid, clear it
          if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isSignedIn]);

  // Listen for custom events to refresh user data when profile is updated
  useEffect(() => {
    const handleProfileUpdate = async () => {
      if (!isSignedIn) return;
      
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userId = data._id || data.id || data.user?._id || data.user?.id || localStorage.getItem("userId");
          setUserData({
            username: data.username || data.user?.username || null,
            displayName: data.displayname || data.displayName || data.user?.displayname || data.user?.displayName || null,
            avatarUrl: data.avatarUrl || data.avatar || data.user?.avatarUrl || data.user?.avatar || null,
            id: userId,
          });
          if (userId) {
            localStorage.setItem("userId", userId);
          }
        }
      } catch (error) {
        console.error("Error refreshing user data:", error);
      }
    };
    
    window.addEventListener('profileUpdated', handleProfileUpdate);
    window.addEventListener('avatarUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
      window.removeEventListener('avatarUpdated', handleProfileUpdate);
    };
  }, [isSignedIn]);

  // Load userId from localStorage on mount if not in userData
  useEffect(() => {
    if (isSignedIn && !userData.id) {
      const savedUserId = localStorage.getItem("userId");
      if (savedUserId) {
        setUserData(prev => ({ ...prev, id: savedUserId }));
      }
    }
  }, [isSignedIn, userData.id]);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <img
          src={redditLogoImage}
          alt="Reddit logo"
          className="topbar-logo-img"
        />
      </div>

      <div className="topbar-center">
        <div className="topbar-search">
          <img
            src={searchIconImage}
            alt="Search"
            className="topbar-search-icon"
            onClick={handleSearch}
            style={{ cursor: 'pointer' }}
          />
          <input
            type="text"
            placeholder="Search Reddit"
            className="topbar-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="topbar-right">
        {isSignedIn ? (
          <>
            <button className="topbar-icon-btn" title="Advertise on Reddit">
              <img src={adImage} alt="Ads" className="topbar-icon-img" />
            </button>

            <button 
              className="topbar-icon-btn" 
              title="Open chat"
              onClick={() => setIsChatOpen(true)}
            >
              <img src={chatImage} alt="Chat messages" className="topbar-icon-img" />
            </button>

            <button 
              className="topbar-create-btn" 
              title="Create post"
              onClick={() => navigate("/create-post")}
            >
              <img src={createImage} alt="Create" className="topbar-icon-img" />
              <span>Create</span>
            </button>

            <button 
              className="topbar-icon-btn" 
              title="Open inbox"
              onClick={() => navigate("/notifications")}
            >
              <img src={bellImage} alt="Notifications" className="topbar-icon-img" />
            </button>

            <img
              src={userData.avatarUrl || defaultAvatar}
              alt="User profile"
              className="topbar-avatar-img"
              title="Open profile menu"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            />

            <UserMenu
              isOpen={isUserMenuOpen}
              onClose={() => setIsUserMenuOpen(false)}
              avatarImage={userData.avatarUrl || defaultAvatar}
              username={userData.displayName || (userData.username ? `u/${userData.username}` : "u/User")}
            />
          </>
        ) : (
          <LoginButton />
        )}
      </div>

      {/* Floating Chat */}
      {isSignedIn && isChatOpen && userData.id && (
        <FloatingChat
          currentUser={{ id: userData.id, username: userData.username }}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </header>
  );
}

export default TopBar;
