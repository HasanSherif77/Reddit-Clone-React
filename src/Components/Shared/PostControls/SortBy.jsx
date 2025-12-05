import React, { useState, useRef, useEffect } from "react";
import "./SortBy.css";
import arrowIcon from "../../../assets/images/Arrow.svg";

const sortOptions = ["Best", "Hot", "New", "Top", "Rising"];

function SortBy() {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState("Best");
  const menuRef = useRef(null);

  const handleSelect = (option) => {
    setCurrent(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="sortby" ref={menuRef}>
      <button
        className={`sortby-button ${isOpen ? "sortby-button-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sortby-current">{current}</span>
        <img
          src={arrowIcon}
          alt="Toggle sort"
          className={`sortby-arrow ${isOpen ? "sortby-arrow-open" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="sortby-menu">
          <div className="sortby-menu-header">Sort by</div>
          {sortOptions.map((option) => (
            <button
              key={option}
              className={`sortby-item ${
                option === current ? "sortby-item-active" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortBy;
