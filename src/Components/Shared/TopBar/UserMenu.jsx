import React, { useRef, useEffect } from "react";
import "./UserMenu.css";

import editAvatarIcon from "../../../assets/images/Edit-Avatar.svg";
import draftsIcon from "../../../assets/images/Drafts.svg";
import achievementsIcon from "../../../assets/images/Achievements.svg";
import earnIcon from "../../../assets/images/Earn.svg";
import premiumIcon from "../../../assets/images/Premium.svg";
import logOutIcon from "../../../assets/images/Log-Out.svg";
import settingIcon from "../../../assets/images/Setting.svg";


function UserMenuItem({ icon, label, subtitle }) {
  return (
    <button className="usermenu-item">
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

const mainMenuItems = [
  { icon: editAvatarIcon, label: "Edit Avatar" },
  { icon: draftsIcon, label: "Drafts" },
  { icon: achievementsIcon, label: "Achievements", subtitle: "5 unlocked" },
  { icon: earnIcon, label: "Earn", subtitle: "Earn cash on Reddit" },
  { icon: premiumIcon, label: "Premium" },
];

const logoutItem = [{ icon: logOutIcon, label: "Log Out" }];
const settingsItem = [{ icon: settingIcon, label: "Settings" }];


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

      {mainMenuItems.map((item, index) => (
        <UserMenuItem
          key={index}
          icon={item.icon}
          label={item.label}
          subtitle={item.subtitle}
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
