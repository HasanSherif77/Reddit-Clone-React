import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TopBar from '../../Components/Shared/TopBar/TopBar';
import LeftSideBar from '../../Components/Shared/LeftSideBar/LeftSideBar';
import SearchTabsBar from '../../Components/SearchResults/SearchTabsBar';
import FiltersDropdowns from '../../Components/SearchResults/FiltersDropdowns';
import MediaPage from '../../Components/SearchResults/MediaSection';
import PostsSection from '../../Components/SearchResults/PostsSection';
import CommunitiesSectionFull from '../../Components/SearchResults/CommunitiesSectionFull';
import PeopleSectionFull from '../../Components/SearchResults/PeopleSectionFull';
import RightSidebar from '../../Components/SearchResults/RightSidebar';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [isSignedIn, setIsSignedIn] = useState(true);
  const searchQuery = searchParams.get('q') || '';

  const renderContent = () => {
    switch (activeTab) {
      case 'Posts':
        return (
          <div className="content-layout">
            <div className="main-content-wrapper">
              <PostsSection />
            </div>
            <div className="right-sidebar-wrapper">
              <RightSidebar />
            </div>
          </div>
        );
      
      case 'Media':
        return (
          <div className="content-layout">
            <div className="main-content-wrapper">
              <MediaPage />
            </div>
          </div>
        );
      
      case 'Communities':
        return (
          <div className="full-width-content">
            <CommunitiesSectionFull showHeader={false} searchQuery={searchQuery} />
          </div>
        );
      
      case 'People':
        return (
          <div className="full-width-content">
            <PeopleSectionFull showHeader={false} searchQuery={searchQuery} />
          </div>
        );
      
      case 'Comments':
        return (
          <div className="content-layout">
            <div className="main-content-wrapper">
              <PostsSection />
            </div>
          </div>
        );
      
      case 'All':
      default:
        return (
          <div className="content-layout">
            <div className="main-content-wrapper">
              <MediaPage />
              <div className="section-divider"></div>
              <PostsSection />
            </div>
            <div className="right-sidebar-wrapper">
              <RightSidebar />
            </div>
          </div>
        );
    }
  };

  const showFilters = ['All', 'Posts', 'Media'].includes(activeTab);

  return (
    <div className="App">
      <TopBar isSignedIn={isSignedIn} />
      <div className="leftsidebar-layout">
        <LeftSideBar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
          isSignedIn={isSignedIn}
        />
        <main className="search-results-content">
          <div className="search-controls">
            <SearchTabsBar activeTab={activeTab} onTabChange={setActiveTab} />
            {showFilters && <FiltersDropdowns />}
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SearchResults;