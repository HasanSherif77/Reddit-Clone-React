// src/Components/EditProfile/Modals/EditAvatarModal.jsx
import React, { useState, useEffect } from 'react';
import './Modals.css';

// Import default avatars
import avatar1 from '../../../assets/default-avatars/1.jpg';
import avatar2 from '../../../assets/default-avatars/2.jpg';
import avatar3 from '../../../assets/default-avatars/3.png';
import avatar4 from '../../../assets/default-avatars/4.jpg';
import avatar5 from '../../../assets/default-avatars/5.jpg';
import avatar6 from '../../../assets/default-avatars/6.jpg';
import avatar7 from '../../../assets/default-avatars/7.jpg';

// Array of default avatars
const defaultAvatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
];

// EditAvatarModal - popup for editing/uploading profile picture
const EditAvatarModal = ({ isOpen, onClose, currentAvatar, onSave }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentAvatar || '');
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // Sync state when currentAvatar changes
  useEffect(() => {
    if (isOpen) {
      setPreviewUrl(currentAvatar || '');
      setSelectedFile(null);
      setSelectedAvatar(null);
    }
  }, [currentAvatar, isOpen]);

  // Don't render if modal is not open
  if (!isOpen) return null;

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedAvatar(null); // Clear selected default avatar
      // Create preview for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle default avatar selection
  const handleAvatarSelect = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    setPreviewUrl(avatarUrl);
    setSelectedFile(null); // Clear uploaded file
  };

  // Handle save button click
  const handleSave = () => {
    console.log('Saving avatar:', previewUrl);
    if (onSave) onSave(previewUrl);
    onClose();
  };

  // Handle remove avatar
  const handleRemoveAvatar = () => {
    setPreviewUrl('');
    setSelectedFile(null);
    setSelectedAvatar(null);
  };

  return (
    // Modal overlay background
    <div className="modal-overlay" onClick={onClose}>
      {/* Modal container - stops click propagation */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal header */}
        <div className="modal-header">
          <h2 className="modal-title">Edit avatar</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        {/* Modal body */}
        <div className="modal-body">
          
          {/* Avatar preview section */}
          <div className="avatar-preview">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Avatar preview" 
                className="avatar-preview-image"
              />
            ) : (
              <div className="avatar-placeholder">
                <span className="placeholder-icon">👤</span>
              </div>
            )}
          </div>

          {/* Default avatars section */}
          <div className="default-avatars-section">
            <h3 className="avatars-section-title">Choose a default avatar</h3>
            <div className="avatars-grid">
              {defaultAvatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`avatar-option ${selectedAvatar === avatar ? 'avatar-selected' : ''}`}
                  onClick={() => handleAvatarSelect(avatar)}
                >
                  <img 
                    src={avatar} 
                    alt={`Default avatar ${index + 1}`}
                    className="avatar-option-image"
                  />
                  {selectedAvatar === avatar && (
                    <div className="avatar-checkmark">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="avatar-divider">
            <span>OR</span>
          </div>

          {/* File upload section */}
          <div className="file-upload-section">
            <label className="upload-btn">
              <input
                type="file"
                accept="image/*" // Accept all image types
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              Upload image
            </label>
            <p className="upload-hint">
              Recommended: Square image, at least 256x256 pixels
            </p>
          </div>

          {/* Remove avatar button */}
          <button 
            className="remove-avatar-btn"
            onClick={handleRemoveAvatar}
            disabled={!previewUrl}
          >
            Remove avatar
          </button>

        </div>

        {/* Modal footer with action buttons */}
        <div className="modal-footer">
          <button className="modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="modal-save-btn" 
            onClick={handleSave}
            disabled={!selectedFile && !previewUrl}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditAvatarModal;