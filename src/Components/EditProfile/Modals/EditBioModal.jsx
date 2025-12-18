// src/Components/EditProfile/Modals/EditBioModal.jsx
import React, { useState } from 'react';
import './Modals.css';

// EditBioModal - popup for editing profile bio/description
const EditBioModal = ({ isOpen, onClose, currentBio = '', onSave }) => {
  const [bio, setBio] = useState(currentBio);
  const [characterCount, setCharacterCount] = useState(currentBio.length);

  // Don't render if modal is not open
  if (!isOpen) return null;

  // Handle textarea changes with character limit
  const handleTextareaChange = (e) => {
    const value = e.target.value;
    if (value.length <= 200) { // Limit to 200 characters
      setBio(value);
      setCharacterCount(value.length);
    }
  };

  // Handle save button click
  const handleSave = () => {
    console.log('Saving bio:', bio);
    if (onSave) onSave(bio);
    onClose();
  };

  return (
    // Modal overlay
    <div className="modal-overlay" onClick={onClose}>
      {/* Medium-sized modal */}
      <div className="modal-container medium-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal header */}
        <div className="modal-header">
          <h2 className="modal-title">Edit about description</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        {/* Modal body */}
        <div className="modal-body">
          {/* Textarea for bio */}
          <div className="input-group">
            <label className="input-label">About description</label>
            <textarea
              className="modal-textarea"
              value={bio}
              onChange={handleTextareaChange}
              placeholder="Tell others about yourself"
              rows={4}
              maxLength={200}
              autoFocus
            />
            <div className="character-counter">
              {characterCount}/200 characters
            </div>
          </div>

          {/* Help text */}
          <div className="modal-info">
            <p className="info-text">
              This description appears on your profile page.
            </p>
          </div>
        </div>

        {/* Modal footer */}
        <div className="modal-footer">
          <button className="modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-save-btn" onClick={handleSave}>
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditBioModal;