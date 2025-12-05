import React from 'react';
import './EditingToolbar.css';  

const EditingToolbar = () => {
  const toolbarButtons = [
    { label: 'B', title: 'Bold' },
    { label: 'i', title: 'Italic' },
    { label: 'S', title: 'Strikethrough' },
    { label: 'X²', title: 'Superscript' },
    { label: 'T', title: 'Spoiler' },
    { label: 'D', title: 'Inline Code' },
    { label: 'E', title: 'Link' },
    { label: 'F', title: 'Quote' },
    { label: 'I', title: 'Bulleted List' },
    { label: 'J', title: 'Numbered List' },
    { label: 'G', title: 'Table' },
    { label: 'H', title: 'Heading' },
    { label: 'M', title: 'Markdown Mode' },
    { label: 'N', title: 'Code Block' }
  ];

  return (
    <div className="form-section">
      <div className="editor-toolbar">
        {toolbarButtons.map(btn => (
          <button key={btn.label} className="toolbar-btn" title={btn.title}>
            {btn.label}
          </button>
        ))}
        <span className="toolbar-spacer">...</span>
      </div>
    </div>
  );
};

export default EditingToolbar;