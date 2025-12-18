// src/Components/EditProfile/Modals/EditAvatarModal.jsx
import React, { useState } from 'react';
import './Modals.css';

// EditAvatarModal - popup for editing/uploading profile picture
const EditAvatarModal = ({ isOpen, onClose, currentAvatar, onSave }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentAvatar || '');

  // Don't render if modal is not open
  if (!isOpen) return null;

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save button click
  const handleSave = () => {
    console.log('Saving avatar:', selectedFile);
    if (onSave) onSave(previewUrl);
    onClose();
  };

  // Handle remove avatar
  const handleRemoveAvatar = () => {
    setPreviewUrl('');
    setSelectedFile(null);
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