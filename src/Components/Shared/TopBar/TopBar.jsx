import React, { useState } from "react";
import "./TopBar.css";
import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";

import redditLogoImage from "../../../assets/images/Logo.png";
import searchIconImage from "../../../assets/images/Search.svg";
import adImage from "../../../assets/images/Ad.svg";
import bellImage from "../../../assets/images/Bell.svg";
import chatImage from "../../../assets/images/Chat.svg";
import createImage from "../../../assets/images/Create.svg";
import girlAvatarImage from "../../../assets/images/Girl-Avatar.svg";

function TopBar({ isSignedIn = false }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <img
          src={redditLogoImage}
          alt="Reddit logo"
          className="topbar-logo-img"
        />
      </div>

      <div className="topbar-center">
        <div className="topbar-search">
          <img
            src={searchIconImage}
            alt="Search"
            className="topbar-search-icon"
          />
          <input
            type="text"
            placeholder="Search Reddit"
            className="topbar-search-input"
          />
        </div>
      </div>

      <div className="topbar-right">
        {isSignedIn ? (
          <>
            <button className="topbar-icon-btn" title="Advertise on Reddit">
              <img src={adImage} alt="Ads" className="topbar-icon-img" />
            </button>

            <button className="topbar-icon-btn" title="Open chat">
              <img src={chatImage} alt="Chat messages" className="topbar-icon-img" />
            </button>

            <button className="topbar-create-btn" title="Create post">
              <img src={createImage} alt="Create" className="topbar-icon-img" />
              <span>Create</span>
            </button>

            <button className="topbar-icon-btn" title="Open inbox">
              <img src={bellImage} alt="Notifications" className="topbar-icon-img" />
            </button>

            <img
              src={girlAvatarImage}
              alt="User profile"
              className="topbar-avatar-img"
              title="Open profile menu"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            />

            <UserMenu
              isOpen={isUserMenuOpen}
              onClose={() => setIsUserMenuOpen(false)}
              avatarImage={girlAvatarImage}
              username="u/YourUsername"
            />
          </>
        ) : (
          <LoginButton onClick={() => console.log("Login clicked")} />
        )}
      </div>
    </header>
  );
}

export default TopBar;
