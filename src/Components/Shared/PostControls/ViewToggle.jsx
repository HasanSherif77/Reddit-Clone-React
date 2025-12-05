import React, { useState, useRef, useEffect } from "react";
import "./ViewToggle.css";
import arrowIcon from "../../../assets/images/Arrow.svg";
import viewCardIcon from "../../../assets/images/View.svg";
import viewCompactIcon from "../../../assets/images/Menu.svg";

const views = [
  { id: "card", label: "Card", icon: viewCardIcon },
  { id: "compact", label: "Compact", icon: viewCompactIcon },
];

function ViewToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState("card");
  const menuRef = useRef(null);

  const handleSelect = (id) => {
    setCurrent(id);
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

  const activeView = views.find((v) => v.id === current);

  return (
    <div className="view" ref={menuRef}>
      <button
        className={`view-button ${isOpen ? "view-button-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={activeView.icon}
          alt={activeView.label}
          className="view-icon-main"
        />
        <img
          src={arrowIcon}
          alt="Toggle view"
          className={`view-arrow ${isOpen ? "view-arrow-open" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="view-menu">
          {views.map((v) => (
            <button
              key={v.id}
              className={`view-item ${
                v.id === current ? "view-item-active" : ""
              }`}
              onClick={() => handleSelect(v.id)}
            >
              <img src={v.icon} alt={v.label} className="view-icon" />
              <span>{v.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewToggle;
