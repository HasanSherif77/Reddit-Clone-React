import React from 'react';
import './FormActions.css';  

const FormActions = ({ title, selectedCommunity, handlePost }) => {
  return (
    <div className="form-actions">
      <button className="save-draft-btn">Save Draft</button>
      <button 
        className="post-btn"
        onClick={handlePost}
        disabled={!title.trim() || !selectedCommunity}
      >
        Post
      </button>
    </div>
  );
};

export default FormActions;