import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Community Pages
import CommunityPage from './Pages/Community/CommunityPage';
import CreateCommunityPage from './Pages/Community/CreateCommunityPage';
import EditCommunityPage from './Pages/Community/EditCommunityPage';


// Simple layout for communities
const CommunityLayout = ({ children }) => (
  <div className="community-app flex min-h-screen">
    <main className="flex-1 p-6">{children}</main>
  </div>
);

function App() {
  return (
    <Router>
      <CommunityLayout>
        <Routes>
          <Route path="/c/:communityName" element={<CommunityPage />} />
          <Route path="/create-community" element={<CreateCommunityPage />} />
          <Route path="/edit-community/:communityName" element={<EditCommunityPage />} />
        </Routes>
      </CommunityLayout>
    </Router>
  );
}

export default App;
