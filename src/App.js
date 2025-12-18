import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Context Provider
import { CommunityProvider } from "./Components/Community/CommunityContext";

// Page imports
import Home from "./Pages/Home/Home";
import SearchResults from "./Pages/SearchResults/SearchResults";
import PostDetails from "./Pages/PostDetails/PostDetails";
import UserProfile from "./Pages/UserProfile/UserProfile";
import CommunityPage from "./Pages/Community/CommunityPage";
import CreatePost from "./Pages/CreatePost/CreatePost";
import Notifications from "./Pages/Notifications/Notifications";
import LoginForm from "./Pages/Login/LoginForm";
import SignUpForm from "./Pages/Login/SignUpForm";
import DiscoverCommunities from "./Pages/Community/DiscoverCommunities";
import ManageModeratedCommunities from "./Pages/Community/ManageModeratedCommunities";
function App() {
  return (
    <BrowserRouter>
      <CommunityProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/post/:postId" element={<PostDetails />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/r/:communityName" element={<CommunityPage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/create-post/:communityName" element={<CreatePost />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </CommunityProvider>
    </BrowserRouter>
  );
}

export default App;
