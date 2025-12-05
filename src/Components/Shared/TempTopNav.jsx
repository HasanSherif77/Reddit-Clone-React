// TempTopNav.jsx
import React from 'react';
import './TempTopNav.css';

const TempTopNav = () => {
  return (
    <div className="temp-top-nav">
      {/* Left Section - Logo */}
      <div className="nav-left">
        <div className="logo-container">
          <div className="reddit-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <circle fill="#FF4500" cx="16" cy="16" r="16"/>
                <g fill="#FFF" transform="translate(7 7)">
                  <path d="M9 4.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/>
                  <path d="M9 13.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/>
                  <path d="M18 4.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/>
                  <path d="M18 13.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/>
                </g>
              </g>
            </svg>
          </div>
          <span className="logo-text">reddit</span>
        </div>
      </div>

      {/* Center Section - Search Bar */}
      <div className="nav-center">
        <div className="search-container">
          <div className="search-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" 
                stroke="#878A8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search Reddit"
            readOnly
          />
        </div>
      </div>

      {/* Right Section - User Actions */}
      <div className="nav-right">
        <button className="nav-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#878A8C"/>
          </svg>
        </button>
        
        <button className="nav-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" fill="#878A8C"/>
          </svg>
        </button>
        
        <button className="nav-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z" fill="#878A8C"/>
          </svg>
        </button>
        
        <div className="user-avatar">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#0079D3"/>
            <path d="M16 17C18.7614 17 21 14.7614 21 12C21 9.23858 18.7614 7 16 7C13.2386 7 11 9.23858 11 12C11 14.7614 13.2386 17 16 17Z" fill="white"/>
            <path d="M24 25C24 21.134 20.4183 18 16 18C11.5817 18 8 21.134 8 25" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TempTopNav;