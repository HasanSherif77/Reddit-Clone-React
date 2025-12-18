import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LeftSideBar.css";

import homeIcon from "../../../assets/images/Home.svg";
import popularIcon from "../../../assets/images/Popular.svg";
import allIcon from "../../../assets/images/All.svg";
import answersIcon from "../../../assets/images/Answers.svg";
import exploreIcon from "../../../assets/images/Explore.svg";
import plusIcon from "../../../assets/images/Plus.svg";
import menuIcon from "../../../assets/images/Menu.svg";
import arrowIcon from "../../../assets/images/Arrow.svg";
import communitiesIcon from "../../../assets/images/Communities.svg";
import redditIcon from "../../../assets/images/Reddit-Icon.svg";
import advertiseIcon from "../../../assets/images/Advertise.svg";
import developerIcon from "../../../assets/images/Developer.svg";
import proIcon from "../../../assets/images/Pro.svg";
import helpIcon from "../../../assets/images/Help.svg";
import blogIcon from "../../../assets/images/Blog.svg";
import careersIcon from "../../../assets/images/Careers.svg";
import pressIcon from "../../../assets/images/Press.svg";
import bestOfRedditIcon from "../../../assets/images/Best-Of-Reddit.svg";
import accessibilityIcon from "../../../assets/images/Accessibility.svg";
import settingIcon from "../../../assets/images/Setting.svg";
import gamesIcon from "../../../assets/images/Games.svg";
import SidebarButton from "./SideBarButton";

function LeftSideBar({ isOpen, onToggle, isSignedIn = false, userId }) {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({
    games: false,
    feeds: false,
    communities: false,
    resources: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleHomeClick = () => {
    if (isSignedIn) {
      // Get userId from prop, localStorage, or use default
      const currentUserId = userId || localStorage.getItem("userId") || "user";
      navigate(`/feed/${currentUserId}`);
    } else {
      navigate("/");
    }
  };

  const handleStartCommunityClick = () => {
    navigate("/add-topics");
  };
  
  const allSidebarItems = [
    { icon: homeIcon, label: "Home", title: "Home", active: true, onClick: handleHomeClick },
    { icon: popularIcon, label: "Popular", title: "Popular" },
    { icon: answersIcon, label: "Answers", title: "Answers" },
    { icon: exploreIcon, label: "Explore", title: "Explore" },
    { icon: allIcon, label: "All", title: "All", signedInOnly: true },
    { icon: plusIcon, label: "Start a community", title: "Create community", signedInOnly: true, onClick: handleStartCommunityClick },
  ];

  const sidebarItems = isSignedIn 
    ? allSidebarItems 
    : allSidebarItems.filter(item => !item.signedInOnly);
const resourcesSection = [
  { icon: redditIcon, label: "About Reddit" },
  { icon: advertiseIcon, label: "Advertise" },
  { icon: developerIcon, label: "Developer Platform" },
  { icon: proIcon, label: "Reddit Pro" },
  { icon: helpIcon, label: "Help" },
  { icon: blogIcon, label: "Blog" },
  { icon: careersIcon, label: "Careers" },
  { icon: pressIcon, label: "Press" },
];

const resourcesMiddleSection = [
  { icon: communitiesIcon, label: "Communities" },
  { icon: bestOfRedditIcon, label: "Best of Reddit" },
];

const resourcesBottomSection = [
  { icon: blogIcon, label: "Reddit Rules" },
  { icon: blogIcon, label: "Privacy Policy" },
  { icon: blogIcon, label: "User Agreement" },
  { icon: accessibilityIcon, label: "Accessibility" },
];


  return (
    <>
      <button
        className={`leftsidebar-fixed-toggle ${isOpen ? "" : "leftsidebar-fixed-toggle-closed"}`}
        onClick={onToggle}
        title={isOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        <img src={menuIcon} alt="Menu" />
      </button>

      <aside className={`leftsidebar ${isOpen ? "leftsidebar-open" : "leftsidebar-closed"}`}>
        <div className="leftsidebar-scroll-content">
          <nav className="leftsidebar-section">
            {sidebarItems.map((item, index) => (
              <SidebarButton
                key={index}
                label={item.label}
                active={item.active}
                icon={item.icon}
                onClick={item.onClick}
              />
            ))}
          </nav>

          <div className="leftsidebar-divider" />

          {isSignedIn && (
            <>
              <div className="leftsidebar-collapsible">
                <button
                  className="leftsidebar-collapse-header"
                  onClick={() => toggleSection("games")}
                >
                  <span>GAMES ON REDDIT</span>
                  <img
                    src={arrowIcon}
                    alt="Toggle"
                    className={`leftsidebar-arrow ${openSections.games ? "leftsidebar-arrow-open" : ""}`}
                  />
                </button>
                {openSections.games && (
                  <div className="leftsidebar-collapse-content">
                    <SidebarButton
                      icon={gamesIcon}
                      label="Discover More Games"
                    />
                  </div>
                )}
              </div>

              <div className="leftsidebar-divider" />

              <div className="leftsidebar-collapsible">
                <button
                  className="leftsidebar-collapse-header"
                  onClick={() => toggleSection("feeds")}
                >
                  <span>CUSTOM FEEDS</span>
                  <img
                    src={arrowIcon}
                    alt="Toggle"
                    className={`leftsidebar-arrow ${openSections.feeds ? "leftsidebar-arrow-open" : ""}`}
                  />
                </button>
                {openSections.feeds && (
                  <div className="leftsidebar-collapse-content">
                    <SidebarButton
                      icon={plusIcon}
                      label="Create Custom Feed"
                    />
                  </div>
                )}
              </div>

              <div className="leftsidebar-divider" />

              <div className="leftsidebar-collapsible">
                <button
                  className="leftsidebar-collapse-header"
                  onClick={() => toggleSection("communities")}
                >
                  <span>COMMUNITIES</span>
                  <img
                    src={arrowIcon}
                    alt="Toggle"
                    className={`leftsidebar-arrow ${openSections.communities ? "leftsidebar-arrow-open" : ""}`}
                  />
                </button>
                {openSections.communities && (
                  <div className="leftsidebar-collapse-content">
                    <SidebarButton
                      icon={settingIcon}
                      label="Manage Communities"
                    />
                  </div>
                )}
              </div>

              <div className="leftsidebar-divider" />
            </>
          )}

          <div className="leftsidebar-collapsible">
            <button
              className="leftsidebar-collapse-header"
              onClick={() => toggleSection("resources")}
            >
              <span>RESOURCES</span>
              <img
                src={arrowIcon}
                alt="Toggle"
                className={`leftsidebar-arrow ${openSections.resources ? "leftsidebar-arrow-open" : ""}`}
              />
            </button>
            {openSections.resources && (
              <div className="leftsidebar-collapse-content">
                {resourcesSection.map((item, index) => (
                  <SidebarButton
                    icon={item.icon}
                    key={index}
                    label={item.label}
                  />
                ))}

                <div className="leftsidebar-divider" />

                {resourcesMiddleSection.map((item, index) => (
                  <SidebarButton
                    icon={item.icon}
                    key={index}
                    label={item.label}
                  />
                ))}

                <div className="leftsidebar-divider" />

                {resourcesBottomSection.map((item, index) => (
                  <SidebarButton
                    icon={item.icon}
                    label={item.label}
                    key={index}
                  />
                ))}

                <div className="leftsidebar-divider" />

                <SidebarButton icon={accessibilityIcon} label="Accessibility" />
              </div>
            )}
          </div>

          <div className="leftsidebar-footer">
            <p>Reddit, Inc. © 2025. All rights reserved.</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default LeftSideBar;
