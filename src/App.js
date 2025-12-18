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
import EditProfile from "./Pages/EditProfile/EditProfile";
import AddTopicsComponent from "./Components/CreateCommunity/AddTopics";
import CommunityTypeComponent from "./Components/CreateCommunity/CommunityType";
import CommunityStyle from "./Components/CreateCommunity/CommunityStyle";
import CommunityIcon from "./Components/CreateCommunity/CommunityIcon";
function App() {
  return (
    <BrowserRouter>
      <CommunityProvider>
        <Routes>
          <Route path="/" element={<Home isSignedIn={false} />} />
          <Route path="/feed/:userId" element={<Home isSignedIn={true} />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/post/:postId" element={<PostDetails />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/r/:communityName" element={<CommunityPage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/create-post/:communityName" element={<CreatePost />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/edit-avatar" element={<EditProfile />} />
          <Route path="/add-topics" element={<AddTopicsComponent />} />
          <Route path="/community-type" element={<CommunityTypeComponent />} />
          <Route path="/community-style" element={<CommunityStyle />} />
          <Route path="/community-icon" element={<CommunityIcon />} />
        </Routes>
      </CommunityProvider>
    </BrowserRouter>
  );
}

export default App;