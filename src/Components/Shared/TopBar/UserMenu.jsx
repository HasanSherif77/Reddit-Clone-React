import React, { useState, useRef, useEffect } from "react";
import "./UserMenu.css";

import editAvatarIcon from "../../../assets/images/Edit-Avatar.svg";
import draftsIcon from "../../../assets/images/Drafts.svg";
import achievementsIcon from "../../../assets/images/Achievements.svg";
import earnIcon from "../../../assets/images/Earn.svg";
import premiumIcon from "../../../assets/images/Premium.svg";
import logOutIcon from "../../../assets/images/Log-Out.svg";
import settingIcon from "../../../assets/images/Setting.svg";

function UserMenu({ isOpen, onClose, avatarImage, username }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="usermenu-dropdown" ref={menuRef}>
      <div className="usermenu-header">
        <img src={avatarImage} alt="User avatar" className="usermenu-avatar" />
        <div className="usermenu-info">
          <span className="usermenu-username">{username}</span>
        </div>
      </div>

      <div className="usermenu-divider" />

      <button className="usermenu-item">
        <img src={editAvatarIcon} alt="Edit Avatar" className="usermenu-icon" />
        <span>Edit Avatar</span>
      </button>

      <button className="usermenu-item">
        <img src={draftsIcon} alt="Drafts" className="usermenu-icon" />
        <span>Drafts</span>
      </button>

      <button className="usermenu-item">
        <img src={achievementsIcon} alt="Achievements" className="usermenu-icon" />
        <div className="usermenu-item-content">
          <span>Achievements</span>
          <span className="usermenu-item-subtitle">5 unlocked</span>
        </div>
      </button>

      <button className="usermenu-item">
        <img src={earnIcon} alt="Earn" className="usermenu-icon" />
        <div className="usermenu-item-content">
          <span>Earn</span>
          <span className="usermenu-item-subtitle">Earn cash on Reddit</span>
        </div>
      </button>

      <button className="usermenu-item">
        <img src={premiumIcon} alt="Premium" className="usermenu-icon" />
        <span>Premium</span>
      </button>

      <div className="usermenu-divider" />

      <button className="usermenu-item">
        <img src={logOutIcon} alt="Log Out" className="usermenu-icon" />
        <span>Log Out</span>
      </button>

      <div className="usermenu-divider" />

      <button className="usermenu-item">
        <img src={settingIcon} alt="Settings" className="usermenu-icon" />
        <span>Settings</span>
      </button>
    </div>
  );
}

export default UserMenu;
