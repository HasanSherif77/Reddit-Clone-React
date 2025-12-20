// CommunityIcon.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommunities } from '../Community/CommunityContext';
import './CommunityIcon.css';

const CommunityIcon = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [iconImage, setIconImage] = useState(null);
  const [communityData, setCommunityData] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const { addCommunity } = useCommunities();

  // Load community data from sessionStorage on component mount
  useEffect(() => {
    const tempData = sessionStorage.getItem('tempCommunityData');
    if (tempData) {
      try {
        const parsedData = JSON.parse(tempData);
        console.log('Loaded community data:', parsedData);
        setCommunityData(parsedData);
      } catch (error) {
        console.error('Error loading community data:', error);
        navigate('/add-topics'); // Redirect back if data is corrupted
      }
    } else {
      console.log('No temp community data found, redirecting to add-topics');
      navigate('/add-topics'); // Redirect back if no data
    }
  }, [navigate]);

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBanner = () => {
    setBannerImage(null);
  };

  const handleRemoveIcon = () => {
    setIconImage(null);
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleCreateCommunity = async () => {
    if (!communityData) {
      alert('Community data not found. Please start over.');
      navigate('/add-topics');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to create a community.');
      navigate('/login');
      return;
    }

    setIsCreating(true);
    try {
      // Prepare community data matching the backend model
      const communityPayload = {
        communityName: communityData.name,
        communityDescription: communityData.description,
        communityMembersCount: 1, // Default value
        communityIcon: iconImage || '', // Base64 string or empty
        communityBanner: bannerImage || '' // Base64 string or empty
      };

      // Create the community via backend API
      const response = await fetch('http://localhost:5000/communities/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(communityPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || 'Failed to create community');
      }

      const newCommunity = await response.json();
      console.log('Community created:', newCommunity);

      // Clear temporary data
      sessionStorage.removeItem('tempCommunityData');
      sessionStorage.removeItem('communitySettings');

      // Navigate to the newly created community page
      // Assuming the response includes communityName or the community object
      const communityName = newCommunity.communityName || newCommunity.community?.communityName || communityData.name;
      navigate(`/r/${communityName}`);
    } catch (error) {
      console.error('Error creating community:', error);
      alert(error.message || 'Failed to create community. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="style-community-container">
      <div className="style-header">
        <h1 className="style-title">Style your community</h1>
        <p className="style-subtitle">
          Adding visual flair will catch new members attention and help establish your community's culture!  
          <br />
          You can update this at any time.
        </p>
      </div>

      {/* Banner Section */}
      <div className="style-section">
        <div className="section-header">
          <h3 className="section-title">Banner</h3>
          <p className="section-description">
            Recommended size: 1920x384px
          </p>
        </div>
        
        <div className="upload-area">
          {bannerImage ? (
            <div className="preview-container">
              <img 
                src={bannerImage} 
                alt="Community banner" 
                className="banner-preview"
              />
              <button 
                className="remove-btn"
                onClick={handleRemoveBanner}
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="upload-placeholder banner-placeholder">
              <div className="placeholder-content">
                <svg className="upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="#0079d3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="placeholder-text">Add</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                className="file-input"
              />
            </label>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Icon Section */}
      <div className="style-section">
        <div className="section-header">
          <h3 className="section-title">Icon</h3>
          <p className="section-description">
            Recommended size: 256x256px
          </p>
        </div>
        
        <div className="upload-area">
          {iconImage ? (
            <div className="preview-container">
              <img 
                src={iconImage} 
                alt="Community icon" 
                className="icon-preview"
              />
              <button 
                className="remove-btn"
                onClick={handleRemoveIcon}
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="upload-placeholder icon-placeholder">
              <div className="placeholder-content">
                <svg className="upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="#0079d3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="placeholder-text">Add</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleIconUpload}
                className="file-input"
              />
            </label>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Community Preview */}
      <div className="community-preview">
        <div className="preview-header">
          {iconImage ? (
            <img src={iconImage} alt="Community icon" className="preview-icon" />
          ) : (
            <div className="default-icon">r/</div>
          )}
          <div className="preview-info">
            <h3 className="preview-name">r/{communityData?.name || 'community'}</h3>
            <div className="preview-stats">
              1 weekly visitor · 1 weekly contributor
            </div>
            <div className="preview-description">
              {communityData?.description || 'Community description'}
            </div>
          </div>
        </div>
        
        {bannerImage && (
          <img 
            src={bannerImage} 
            alt="Community banner preview" 
            className="preview-banner"
          />
        )}
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Action Buttons */}
      <div className="style-actions">
        <button 
          className="back-btn"
          onClick={handleBack}
        >
          Back
        </button>
        <button 
          className="create-btn"
          onClick={handleCreateCommunity}
          disabled={isCreating}
        >
          {isCreating ? 'Creating...' : 'Create Community'}
        </button>
      </div>
    </div>
  );
};

export default CommunityIcon;