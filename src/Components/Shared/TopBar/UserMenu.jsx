import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserMenu.css";

import editAvatarIcon from "../../../assets/images/Edit-Avatar.svg";
import draftsIcon from "../../../assets/images/Drafts.svg";
import achievementsIcon from "../../../assets/images/Achievements.svg";
import earnIcon from "../../../assets/images/Earn.svg";
import premiumIcon from "../../../assets/images/Premium.svg";
import logOutIcon from "../../../assets/images/Log-Out.svg";
import settingIcon from "../../../assets/images/Setting.svg";


function UserMenuItem({ icon, label, subtitle, onClick }) {
  return (
    <button className="usermenu-item" onClick={onClick}>
      <img src={icon} alt={label} className="usermenu-icon" />

      {subtitle ? (
        <div className="usermenu-item-content">
          <span>{label}</span>
          <span className="usermenu-item-subtitle">{subtitle}</span>
        </div>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}

function UserMenu({ isOpen, onClose, avatarImage, username }) {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleEditAvatar = () => {
    onClose();
    navigate("/edit-avatar");
  };

  const handleSettings = () => {
    onClose();
    navigate("/edit-profile");
  };

  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem("token");
    onClose();
    // Navigate to home page (isSignedIn will be false since token is cleared)
    navigate("/");
    // Reload the page to reset all component states
    window.location.reload();
  };

  const mainMenuItems = [
    { icon: editAvatarIcon, label: "Edit Avatar", onClick: handleEditAvatar },
    { icon: draftsIcon, label: "Drafts" },
    { icon: achievementsIcon, label: "Achievements", subtitle: "5 unlocked" },
    { icon: earnIcon, label: "Earn", subtitle: "Earn cash on Reddit" },
    { icon: premiumIcon, label: "Premium" },
  ];

  const logoutItem = [{ icon: logOutIcon, label: "Log Out", onClick: handleLogout }];
  const settingsItem = [{ icon: settingIcon, label: "Settings", onClick: handleSettings }];

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

      {mainMenuItems.map((item, index) => (
        <UserMenuItem
          key={index}
          icon={item.icon}
          label={item.label}
          subtitle={item.subtitle}
          onClick={item.onClick}
        />
      ))}

      <div className="usermenu-divider" />

      {logoutItem.map((item, index) => (
        <UserMenuItem key={index} {...item} />
      ))}

      <div className="usermenu-divider" />

      {settingsItem.map((item, index) => (
        <UserMenuItem key={index} {...item} />
      ))}
    </div>
  );
}

export default UserMenu;
