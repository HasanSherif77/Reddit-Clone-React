import React from 'react';
import './TitleInput.css';  

const TitleInput = ({ title, setTitle }) => {
  return (
    <div className="form-section">
      <div className="title-input-container">
        <input
          type="text"
          placeholder="Title*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={300}
          className="title-input"
        />
        <div className="title-counter">{title.length}/300</div>
      </div>
    </div>
  );
};

export default TitleInput;