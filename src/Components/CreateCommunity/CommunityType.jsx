// CommunityTypeComponent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommunityType.css';

const CommunityTypeComponent = () => {
  const [selectedType, setSelectedType] = useState('public');
  const [isMature, setIsMature] = useState(false);
  const navigate = useNavigate();

  const communityTypes = [
    {
      id: 'public',
      title: 'Public',
      description: 'Anyone can view, post, and comment to this community',
      details: 'Only public communities show up in search.'
    },
    {
      id: 'restricted',
      title: 'Restricted',
      description: 'Anyone can view, but only approved users can contribute',
      details: ''
    },
    {
      id: 'private',
      title: 'Private',
      description: 'Only approved users can view and contribute',
      details: ''
    }
  ];

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId);
  };

  const handleMatureToggle = () => {
    setIsMature(!isMature);
  };

  const handleBack = () => {
    navigate(-1); // Go back to topics selection
  };

  const handleNext = () => {
    // Save community type settings to sessionStorage
    const communitySettings = {
      type: selectedType,
      isMature: isMature
    };
    console.log('Community settings:', communitySettings);
    
    // Save to sessionStorage for later use
    sessionStorage.setItem('communitySettings', JSON.stringify(communitySettings));

    // Go to community style step (banner / profile, etc.)
    navigate('/community-style');
  };

  return (
    <div className="community-type-container">
      <div className="type-header">
        <h1 className="type-title">What kind of community is this?</h1>
        <p className="type-subtitle">
          Decide who can view and contribute in your community. Only public communities show up in search. 
          <strong> Important:</strong> Once set, you will need to submit a request to change your community type.
        </p>
      </div>

      {/* Community Type Options */}
      <div className="type-options">
        {communityTypes.map((type) => (
          <div 
            key={type.id}
            className={`type-option ${selectedType === type.id ? 'selected' : ''}`}
            onClick={() => handleTypeSelect(type.id)}
          >
            <div className="option-radio">
              <div className={`radio-circle ${selectedType === type.id ? 'selected' : ''}`}>
                {selectedType === type.id && <div className="radio-dot"></div>}
              </div>
            </div>
            <div className="option-content">
              <h3 className="option-title">{type.title}</h3>
              <p className="option-description">{type.description}</p>
              {type.details && (
                <p className="option-details">{type.details}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Mature Content Option */}
      <div className="mature-option">
        <div className="mature-header">
          <h3 className="mature-title">Mature (18+)</h3>
          <p className="mature-description">
            Users must be over 18 to view and contribute
          </p>
        </div>
        <div className="mature-toggle">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={isMature}
              onChange={handleMatureToggle}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Terms and Conditions */}
      <div className="terms-section">
        <p className="terms-text">
          By continuing, you agree to our <a href="#" className="terms-link">Mod Code of Conduct</a> 
          {' '}and acknowledge that you understand the <a href="#" className="terms-link">Reddit Rules.</a>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="type-actions">
        <button 
          className="back-btn"
          onClick={handleBack}
        >
          Back
        </button>
        <button 
          className="submit-btn"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CommunityTypeComponent;