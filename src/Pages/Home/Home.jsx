import React from "react";
import PostControls from "../../Components/Shared/PostControls/PostControls";
import PostsList from "../../Components/Shared/Posts/PostsList";
import "./Home.css";

function Home() {
  return (
    <div className="home-layout">
      <div className="home-main">
        <PostControls />
        <div className="home-divider" />
        <PostsList />
      </div>
    </div>
  );
}

export default Home;
