import React, { useState, useEffect } from "react";
import TopBar from "../../Components/Shared/TopBar/TopBar";
import LeftSideBar from "../../Components/Shared/LeftSideBar/LeftSideBar";
import PostControls from "../../Components/Shared/PostControls/PostControls";
import PostsList from "../../Components/Shared/Post/PostsList";
import "./Home.css";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // ADD THIS LINE
  const [showChat, setShowChat] = useState(false); // ADD THIS LINE

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

      {/* ADD THIS SECTION AT THE END OF THE COMPONENT */}
      {isSignedIn && (
<>
          <button 
            onClick={() => setShowChat(!showChat)}
            style={{
              position: "fixed",
              bottom: 20,
              right: 20,
              background: "#0079D3",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: 60,
              height: 60,
              cursor: "pointer",
              zIndex: 1000,
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            💬
          </button>
          
          {/* Import and render FloatingChat conditionally */}
          {showChat && (() => {
            // Dynamically import to avoid adding import at top
            const FloatingChat = require("../../Components/DirectMesseges/FloatingChat").default;
            return ( <FloatingChat 
                currentUser={{ 
                  id: localStorage.getItem("userId"),
                  _id: localStorage.getItem("userId"),
                  username: localStorage.getItem("username") || "User"
                }} 
                onClose={() => setShowChat(false)} 
              />
            );
          })()}
        </>
      )}
    </div>
  );
}

export default Home;