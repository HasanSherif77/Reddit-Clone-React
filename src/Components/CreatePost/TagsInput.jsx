import React, { useState } from 'react';
import './TagsInput.css';  // Changed

const TagsInput = ({ tags, setTags }) => {
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="form-section">
      <div className="tags-container">
        <input
          type="text"
          placeholder="Add tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          className="tags-input"
        />
        {tags.length > 0 && (
          <div className="tags-list">
            {tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
                <button onClick={() => removeTag(tag)} className="tag-remove">×</button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsInput;