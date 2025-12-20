import React, { useState } from "react";
// Import icons from react-icons library
import { IoEyeOutline, IoChevronDown } from "react-icons/io5";
import { GoPlus } from "react-icons/go";

const FeedControls = ({ showCreatePost = true }) => {
  const [sort, setSort] = useState("New");

  return (
    <div className="feed-controls">
      {/* Left Side: Eye Icon + Text */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <IoEyeOutline size={22} color="#878a8c" />
        <span className="feed-filter-label">Showing all content</span>
      </div>

      <div className="feed-controls-right">
        {/* Button with Plus Icon */}
        {showCreatePost && (
          <button 
            className="btn-primary" 
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            <GoPlus size={20} />
            <span>Create Post</span>
          </button>
        )}

        {/* Sort Dropdown with Custom Arrow */}
        <div className="feed-sort">
          <label htmlFor="sort-select">Sort</label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                appearance: "none", /* Hides default browser arrow */
                border: "none",
                background: "transparent",
                fontWeight: "700",
                fontSize: "12px",
                color: "#1a1a1b",
                cursor: "pointer",
                paddingRight: "18px", /* Space for custom arrow */
                outline: "none"
              }}
            >
              <option value="New">New</option>
              <option value="Hot">Hot</option>
              <option value="Top">Top</option>
            </select>
            
            {/* Custom Down Arrow Icon */}
            <IoChevronDown 
              size={12} 
              color="#1a1a1b" 
              style={{ 
                position: "absolute", 
                right: 0, 
                pointerEvents: "none" 
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedControls;