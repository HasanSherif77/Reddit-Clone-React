import React from 'react';
import './EditorBody.css';  

const EditorBody = ({ body, setBody }) => {
  return (
    <div className="form-section">
      <textarea
        placeholder="Body text (optional)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="body-textarea"
        rows={10}
      />
    </div>
  );
};

export default EditorBody;