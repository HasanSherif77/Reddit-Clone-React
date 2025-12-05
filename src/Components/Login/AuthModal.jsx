// AuthModal.jsx - Pure presentational component
import React from "react";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>✖</button>
        <div className="modal-body">
          <div className="auth-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;