// src/Components/EditProfile/Modals/EditDisplayNameModal.jsx
import React, { useState } from 'react';
import './Modals.css';

const EditDisplayNameModal = ({ isOpen, onClose, currentName = '' }) => {
  // State for display name and character count
  const [displayName, setDisplayName] = useState(currentName);
  const [characterCount, setCharacterCount] = useState(currentName.length);

  // Don't render if modal is not open
  if (!isOpen) return null;

  // Handle input change with character limit
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Limit to 30 characters like Reddit
    if (value.length <= 30) {
      setDisplayName(value);
      setCharacterCount(value.length);
    }
  };

  // Handle save action
  const handleSave = () => {
    console.log('Saving display name:', displayName);
    onClose(); // Close modal
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal header */}
        <div className="modal-header">
          <h2 className="modal-title">Edit display name</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        {/* Modal body */}
        <div className="modal-body">
          {/* Input field for display name */}
          <div className="input-group">
            <label className="input-label">Display name</label>
            <input
              type="text"
              className="modal-input"
              value={displayName}
              onChange={handleInputChange}
              placeholder="Enter a display name"
              maxLength={30}
            />
            <div className="character-counter">
              {characterCount}/30 characters
            </div>
          </div>

          {/* Informational text */}
          <div className="modal-info">
            <p className="info-text">
              Your display name appears on your profile and next to your posts and comments.
            </p>
            <p className="info-text">
              Changing your display name won't change your username.
            </p>
          </div>
        </div>

        {/* Modal footer with action buttons */}
        <div className="modal-footer">
          <button className="modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="modal-save-btn" 
            onClick={handleSave}
            disabled={displayName.trim() === ''}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditDisplayNameModal;