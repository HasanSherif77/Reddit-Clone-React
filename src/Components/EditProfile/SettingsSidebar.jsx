// File: src/Components/EditProfile/SettingsSidebar.jsx
import React from 'react';

const SettingsSidebar = () => {
  const items = ['Account', 'Profile', 'Privacy', 'Preferences', 'Notifications', 'Email'];
  
  return (
    <div style={{ width: '200px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>User Settings</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {items.map((item, index) => (
                <button key={index} style={{ 
                    textAlign: 'left', 
                    padding: '10px', 
                    backgroundColor: item === 'Profile' ? '#f6f7f8' : 'transparent', // Highlight Profile
                    border: 'none', 
                    borderRadius: '4px',
                    fontWeight: item === 'Profile' ? 'bold' : 'normal',
                    cursor: 'pointer'
                }}>
                    {item}
                </button>
            ))}
        </div>
    </div>
  );
};

export default SettingsSidebar;