import React from 'react';
import './FormActions.css';  

const FormActions = ({ title, selectedCommunity, handlePost, isSubmitting = false }) => {
  return (
    <div className="form-actions">
      <button className="save-draft-btn">Save Draft</button>
      <button 
        className="post-btn"
        onClick={handlePost}
        disabled={!title.trim() || isSubmitting}
      >
        {isSubmitting ? 'Posting...' : 'Post'}
      </button>
    </div>
  );
};

export default FormActions;