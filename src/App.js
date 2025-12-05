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