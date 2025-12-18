// Updated AddTopicsComponent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTopics.css';

const AddTopicsComponent = ({ onNext }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const topicsData = [
    {
      category: 'Anime & Cosplay',
      topics: ['Anime & Manga', 'Cosplay']
    },
    {
      category: 'Art',
      topics: ['Performing Arts', 'Architecture', 'Design', 'Art', 'Filmmaking', 'Digital Art', 'Photography']
    },
    {
      category: 'Business & Finance',
      topics: ['Personal Finance', 'Crypto', 'Economics', 'Business News & Discussion', 'Deals & Marketplace', 'Startups & Entrepreneurship', 'Real Estate', 'Stocks & Investing']
    },
    {
      category: 'Collectibles & Other Hobbies',
      topics: ['Model Building', 'Collectibles', 'Other Hobbies', 'Toys']
    }
  ];

  const handleTopicToggle = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      if (selectedTopics.length < 3) {
        setSelectedTopics([...selectedTopics, topic]);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearTopics = () => {
    setSelectedTopics([]);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Your changes will not be saved.')) {
      navigate(-1); // Go back to previous page
    }
  };

  const handleNext = () => {
    // Save selected topics (in a real app, you would save to state or backend)
    console.log('Selected topics:', selectedTopics);
    
    // Save topics to sessionStorage for later use
    sessionStorage.setItem('selectedTopics', JSON.stringify(selectedTopics));
    
    // Navigate to community type component
    navigate('/community-type');
  };

  // Filter topics based on search query
  const filteredTopics = topicsData.map(category => ({
    ...category,
    topics: category.topics.filter(topic => 
      topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.topics.length > 0);

  return (
    <div className="add-topics-overlay">
      <div className="add-topics-container">
      <div className="topics-header">
        <h1 className="topics-title">Add topics</h1>
        <p className="topics-subtitle">
          Add up to 3 topics to help interested creditors find your community.
        </p>
      </div>

      {/* Search Filter */}
      <div className="topics-search">
        <div className="search-container">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" 
              stroke="#878A8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Filter topics"
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>
              ×
            </button>
          )}
        </div>
      </div>

      {/* Selected Topics Counter */}
      <div className="topics-counter">
        <h2 className="counter-title">Topics {selectedTopics.length}/3</h2>
        {selectedTopics.length > 0 && (
          <button className="clear-topics-btn" onClick={handleClearTopics}>
            Clear all
          </button>
        )}
      </div>

      {/* Selected Topics Tags */}
      {selectedTopics.length > 0 && (
        <div className="selected-topics">
          {selectedTopics.map((topic, index) => (
            <div key={index} className="topic-tag">
              <span className="tag-text">{topic}</span>
              <button className="tag-remove" onClick={() => handleTopicToggle(topic)}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Topics Categories */}
      <div className="topics-categories">
        {filteredTopics.map((category, categoryIndex) => (
          <div key={categoryIndex} className="category-section">
            <h3 className="category-title">{category.category}</h3>
            <div className="category-topics">
              {category.topics.map((topic, topicIndex) => {
                const isSelected = selectedTopics.includes(topic);
                const isDisabled = selectedTopics.length >= 3 && !isSelected;
                
                return (
                  <button
                    key={topicIndex}
                    className={`topic-item ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                    onClick={() => !isDisabled && handleTopicToggle(topic)}
                    disabled={isDisabled}
                  >
                    <span className="topic-checkbox">
                      {isSelected ? '✓' : ''}
                    </span>
                    <span className="topic-name">{topic}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="topics-actions">
        <button 
          className="cancel-btn"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button 
          className="next-btn"
          onClick={handleNext}
          disabled={selectedTopics.length === 0}
        >
          Next
        </button>
      </div>
      </div>
    </div>
  );
};

export default AddTopicsComponent;