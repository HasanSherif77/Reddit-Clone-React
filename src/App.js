// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddTopics from './Components/CreateCommunity/AddTopics';
import CommunityType from './Components/CreateCommunity/CommunityType';
import CommunityStyle from './Components/CreateCommunity/CommunityStyle';
import CommunityIcon from './Components/CreateCommunity/CommunityIcon';
import CommunityPage from './Pages/Community/CommunityPage';
import DiscoverCommunities from './Pages/Community/DiscoverCommunities';
import ManageModeratedCommunities from './Pages/Community/ManageModeratedCommunities';
import { CommunityProvider, useCommunities } from './Components/Community/CommunityContext';
import './App.css';

function AppRoutes() {
  const { communities } = useCommunities();

  return (
    <div className="App">
      <Routes>
        {/* Add this redirect from root to /r/home */}
        <Route path="/" element={<Navigate to="/r/home" replace />} />

        <Route path="/r/home" element={<CommunityPage />} />
        <Route path="/r/:communityName" element={<CommunityPage />} />
        <Route path="/discover-communities" element={<DiscoverCommunities />} />
        <Route path="/manage-communities" element={<ManageModeratedCommunities />} />
        <Route path="/add-topics" element={<AddTopics />} />
        <Route path="/community-type" element={<CommunityType />} />
        <Route path="/community-style" element={<CommunityStyle />} />
        <Route path="/community-icon" element={<CommunityIcon />} />
        <Route path="/community/dashboard" element={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h1>Community Created Successfully!</h1>
              <p>Your community has been created with the selected settings.</p>
            </div>
          } />
      </Routes>
import "./App.css";
import TopBar from "./Components/Shared/TopBar/TopBar";
import LeftSideBar from "./Components/Shared/LeftSideBar/LeftSideBar";
import Home from "./Pages/Home/Home";
import CreatePost from "./Pages/CreatePost/CreatePost";
import PostDetails from "./Pages/PostDetails/PostDetails";
import SearchResults from "./Pages/SearchResults/SearchResults";
import Notifications from "./Pages/Notifications/Notifications";


function App() {

  return (
    <div className="App">
      <TopBar />
      <div className="leftsidebar-layout">
        <LeftSideBar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />
        <main className="leftsidebar-content">
          <PostDetails />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <CommunityProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CommunityProvider>
  );
}

export default App;