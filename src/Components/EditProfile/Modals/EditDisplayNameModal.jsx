// src/Components/EditProfile/Modals/EditDisplayNameModal.jsx
import React, { useState, useEffect } from 'react';
import './Modals.css';

// EditDisplayNameModal - popup for editing display name
const EditDisplayNameModal = ({ isOpen, onClose, currentName = '', onSave }) => {
  const [displayName, setDisplayName] = useState(currentName);
  const [characterCount, setCharacterCount] = useState(currentName.length);

  // Sync state when currentName changes
  useEffect(() => {
    if (isOpen) {
      setDisplayName(currentName);
      setCharacterCount(currentName.length);
    }
  }, [currentName, isOpen]);

  // Don't render if modal is not open
  if (!isOpen) return null;

  // Handle input changes with character limit
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 30) { // Limit to 30 characters like Reddit
      setDisplayName(value);
      setCharacterCount(value.length);
    }
  };

  // Handle save button click
  const handleSave = () => {
    console.log('Saving display name:', displayName);
    if (onSave) onSave(displayName);
    onClose();
  };

  return (
    // Modal overlay
    <div className="modal-overlay" onClick={onClose}>
      {/* Modal container */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal header */}
        <div className="modal-header">
          <h2 className="modal-title">Edit display name</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        {/* Modal body */}
        <div className="modal-body">
          {/* Input field */}
          <div className="input-group">
            <label className="input-label">Display name</label>
            <input
              type="text"
              className="modal-input"
              value={displayName}
              onChange={handleInputChange}
              placeholder="Enter a display name"
              maxLength={30}
              autoFocus
            />
            <div className="character-counter">
              {characterCount}/30 characters
            </div>
          </div>

          {/* Help text */}
          <div className="modal-info">
            <p className="info-text">
              Your display name appears on your profile and next to your posts and comments.
            </p>
            <p className="info-text">
              Changing your display name won't change your username.
            </p>
          </div>
        </div>

        {/* Modal footer */}
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