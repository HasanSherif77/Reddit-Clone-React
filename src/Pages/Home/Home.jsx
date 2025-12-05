import React, { useState } from "react";
import TopBar from "../../Components/Shared/TopBar/TopBar";
import LeftSideBar from "../../Components/Shared/LeftSideBar/LeftSideBar";
import PostControls from "../../Components/Shared/PostControls/PostControls";
import PostsList from "../../Components/Shared/Post/PostsList";
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
