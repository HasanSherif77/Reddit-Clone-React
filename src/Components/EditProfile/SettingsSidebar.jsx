// src/Components/EditProfile/SettingsSidebar.jsx
import React from 'react';
import './Settings.css'; // Import CSS for styling

const SettingsSidebar = () => {
  // Array of menu items for settings
  const items = [
    'Account',    // Account settings
    'Profile',    // Profile settings (active)
    'Privacy',    // Privacy settings
    'Preferences', // User preferences
    'Notifications', // Notification settings
    'Email'       // Email settings
  ];
  
  return (
    // Navigation sidebar container
    <nav className="edit-profile-sidebar">
      {/* Sidebar title */}
      <h2 className="sidebar-title">User Settings</h2>
      
      {/* Container for menu items */}
      <div className="sidebar-items">
        {/* Map through items to create buttons */}
        {items.map((item) => (
          <button 
            key={item} // Unique key for React
            // Add 'active' class if item is 'Profile'
            className={`sidebar-item ${item === 'Profile' ? 'active' : ''}`}
          >
            {item} {/* Display item name */}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default SettingsSidebar;