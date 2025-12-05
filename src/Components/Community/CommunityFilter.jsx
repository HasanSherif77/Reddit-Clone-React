// CommunityFilter.jsx
import React, { useState } from 'react';
import './CommunityFilter.css';

const CommunityFilter = () => {
  const [filterValue, setFilterValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    // In a real app, this would filter communities
  };

  const handleClearFilter = () => {
    setFilterValue('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle filter submission
    console.log('Filtering for:', filterValue);
  };

  return (
    <div className="community-filter">
      <form className="filter-form" onSubmit={handleSubmit}>
        <div className={`filter-input-container ${isFocused ? 'focused' : ''}`}>
          <svg 
            className="filter-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" 
              stroke="#878A8C" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          
          <input
            type="text"
            value={filterValue}
            onChange={handleFilterChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Filter your communities"
            className="filter-input"
            aria-label="Filter your communities"
          />
          
          {filterValue && (
            <button 
              type="button"
              className="clear-button"
              onClick={handleClearFilter}
              aria-label="Clear filter"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 4L4 12M4 4L12 12" 
                  stroke="#878A8C" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommunityFilter;