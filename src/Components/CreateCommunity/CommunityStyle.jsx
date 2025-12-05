// CommunityStyle.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommunities } from '../Community/CommunityContext';
import './CommunityStyle.css';

const CommunityStyle = () => {
  const [communityName, setCommunityName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();
  const { addCommunity } = useCommunities();

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCommunityName(value);
    
    // Simple validation: only validate when user has typed something
    if (!value) {
      setNameError('');
    } else if (value.length < 3) {
      setNameError('Name must be at least 3 characters');
    } else if (value.length > 21) {
      setNameError('Name cannot exceed 21 characters');
    } else {
      setNameError('');
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleNext = () => {
    if (communityName && description && !nameError) {
      // Create the community directly with name and description
      const communityData = {
        name: communityName,
        description: description,
        // Default values for banner and icon (can be updated later)
        banner: null,
        icon: null
      };

      // Create the community
      const newCommunity = addCommunity(communityData);
      console.log('Community created:', newCommunity);

      // Navigate directly to the created community page
      navigate(`/r/${newCommunity.name}`);
    } else {
      alert('Please fix errors before proceeding');
    }
  };

  const characterCount = communityName.length;

  return (
    <div className="community-style-overlay">
      <div className="community-style-container">
        <div className="style-header">
          <h1 className="style-title">Tell us about your community</h1>
          <p className="style-subtitle">
            A name and description help people understand what your community is all about.
          </p>
        </div>

        <div className="style-content">
          {/* Left column – inputs */}
          <div className="style-form-column">
            {/* Community Name Section */}
            <div className="name-section">
              <div className="section-header">
                <label className="section-label">
                  Community name <span className="required-star">*</span>
                </label>
              </div>
              <div className="name-input-wrapper">
                <div className="name-prefix">r/</div>
                <input
                  type="text"
                  value={communityName}
                  onChange={handleNameChange}
                  className={`name-input ${nameError ? 'error' : ''}`}
                  maxLength={21}
                  placeholder="communityname"
                />
                <div className="character-count">
                  {characterCount}/21
                </div>
              </div>
              {nameError && (
                <div className="error-message">
                  {nameError}
                </div>
              )}
            </div>

            {/* Description Section */}
            <div className="description-section">
              <div className="section-header">
                <label className="section-label">
                  Description <span className="required-star">*</span>
                </label>
              </div>
              <div className="description-wrapper">
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  className="description-input"
                  placeholder="Your community description"
                  rows={4}
                  maxLength={500}
                />
                <div className="description-counter">
                  {description.length}
                </div>
              </div>
            </div>
          </div>

          {/* Right column – preview card */}
          <div className="style-preview-column">
            <div className="name-preview">
              <div className="preview-header">
                <span className="preview-name">
                  r/{communityName || 'communityname'}
                </span>
                <span className="preview-stats">
                  1 weekly visitor · 1 weekly contributor
                </span>
              </div>
              <p className="preview-description">
                {description || 'Your community description'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="style-actions">
          <button 
            className="back-btn"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="next-btn"
            onClick={() => {
              // Save community data to sessionStorage before navigating
              const tempData = {
                name: communityName,
                description: description
              };
              sessionStorage.setItem('tempCommunityData', JSON.stringify(tempData));
              navigate('/community-icon');
            }}
            disabled={!communityName || !description || nameError}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityStyle;