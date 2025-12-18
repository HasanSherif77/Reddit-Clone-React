import React, { useState } from "react";
import TopBar from "../../Components/Shared/TopBar/TopBar";
import LeftSideBar from "../../Components/Shared/LeftSideBar/LeftSideBar";
import PostControls from "../../Components/Shared/PostControls/PostControls";
import PostsList from "../../Components/Shared/Post/PostsList";
import "./Home.css";

function Home({ isSignedIn = true }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
