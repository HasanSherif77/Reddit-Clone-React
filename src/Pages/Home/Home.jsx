import React, { useState, useEffect } from "react";
import TopBar from "../../Components/Shared/TopBar/TopBar";
import LeftSideBar from "../../Components/Shared/LeftSideBar/LeftSideBar";
import PostControls from "../../Components/Shared/PostControls/PostControls";
import PostsList from "../../Components/Shared/Post/PostsList";
import "./Home.css";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Check if user is signed in based on token
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsSignedIn(!!token);
    };

    // Check on mount
    checkAuthStatus();

    // Listen for storage changes (e.g., when user logs in/out in another tab)
    window.addEventListener('storage', checkAuthStatus);

    // Also listen for custom events (e.g., when user logs in/out in same tab)
    window.addEventListener('authChanged', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      window.removeEventListener('authChanged', checkAuthStatus);
    };
  }, []);

  return (
    <div className="App">
      <TopBar isSignedIn={isSignedIn} />
      <div className="leftsidebar-layout">
        <LeftSideBar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
          isSignedIn={isSignedIn}
        />
        <main className="home-content">
          <div className="home-layout">
            <div className="home-main">
              <PostControls />
              <div className="home-divider" />
              <PostsList isSignedIn={isSignedIn} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
