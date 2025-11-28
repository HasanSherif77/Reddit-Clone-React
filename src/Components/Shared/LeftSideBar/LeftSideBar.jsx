import React, { useState } from "react";
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

function LeftSideBar({ isOpen, onToggle }) {
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
            <button className="leftsidebar-item leftsidebar-item-active" title="Home">
              <img src={homeIcon} alt="Home" className="leftsidebar-icon" />
              <span>Home</span>
            </button>
            <button className="leftsidebar-item" title="Popular">
              <img src={popularIcon} alt="Popular" className="leftsidebar-icon" />
              <span>Popular</span>
            </button>
            <button className="leftsidebar-item" title="Answers">
              <img src={answersIcon} alt="Answers" className="leftsidebar-icon" />
              <span>Answers</span>
            </button>
            <button className="leftsidebar-item" title="Explore">
              <img src={exploreIcon} alt="Explore" className="leftsidebar-icon" />
              <span>Explore</span>
            </button>
            <button className="leftsidebar-item" title="All">
              <img src={allIcon} alt="All" className="leftsidebar-icon" />
              <span>All</span>
            </button>
            <button className="leftsidebar-item" title="Create community">
              <img src={plusIcon} alt="Create" className="leftsidebar-icon" />
              <span>Start a community</span>
            </button>
          </nav>

          <div className="leftsidebar-divider" />

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
                <button className="leftsidebar-item">
                  <img src={gamesIcon} alt="Games" className="leftsidebar-icon" />
                  <span>Discover More Games</span>
                </button>
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
                <button className="leftsidebar-item">
                  <img src={plusIcon} alt="Create" className="leftsidebar-icon" />
                  <span>Create Custom Feed</span>
                </button>
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
                <button className="leftsidebar-item">
                  <img src={settingIcon} alt="Manage" className="leftsidebar-icon" />
                  <span>Manage Communities</span>
                </button>
              </div>
            )}
          </div>

          <div className="leftsidebar-divider" />

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
                <button className="leftsidebar-item">
                  <img src={redditIcon} alt="About" className="leftsidebar-icon" />
                  <span>About Reddit</span>
                </button>
                <button className="leftsidebar-item">
                  <img src={advertiseIcon} alt="Advertise" className="leftsidebar-icon" />
                  <span>Advertise</span>
                </button>
                <button className="leftsidebar-item">
                  <img src={developerIcon} alt="Developer" className="leftsidebar-icon" />
                  <span>Developer Platform</span>
                </button>
                <button className="leftsidebar-item">
                  <img src={proIcon} alt="Pro" className="leftsidebar-icon" />
                  <span>Reddit Pro</span>
                </button>
                <button className="leftsidebar-item">
                  <img src={helpIcon} alt="Help" className="leftsidebar-icon" />
                  <span>Help</span>
                </button>
                <button className="leftsidebar-item">
                  <img src={blogIcon} alt="Blog" className="leftsidebar-icon" />
                  <span>Blog</span>
                </button>
                <button className="leftsidebar-item">
                  <img src={careersIcon} alt="Careers" className="leftsidebar-icon" />
                  <span>Careers</span>
                </button>
                <button className="leftsidebar-item">
                  <img src={pressIcon} alt="Press" className="leftsidebar-icon" />
                  <span>Press</span>
                </button>

                <div className="leftsidebar-divider" />

                <button className="leftsidebar-item">
                  <img src={communitiesIcon} alt="Communities" className="leftsidebar-icon" />
                  <span>Communities</span>
                </button>
                <button className="leftsidebar-item">
                  <img src={bestOfRedditIcon} alt="Best of Reddit" className="leftsidebar-icon" />
                  <span>Best of Reddit</span>
                </button>

                <div className="leftsidebar-divider" />

                <button className="leftsidebar-item">
                  <img src={blogIcon} alt="Reddit Rules" className="leftsidebar-icon" />
                  <span>Reddit Rules</span>
                </button>
                <button className="leftsidebar-item">
                  <img src={blogIcon} alt="Privacy Policy" className="leftsidebar-icon" />
                  <span>Privacy Policy</span>
                </button>
                <button className="leftsidebar-item">
                  <img src={blogIcon} alt="User Agreement" className="leftsidebar-icon" />
                  <span>User Agreement</span>
                </button>

                <div className="leftsidebar-divider" />

                <button className="leftsidebar-item">
                  <img src={accessibilityIcon} alt="Accessibility" className="leftsidebar-icon" />
                  <span>Accessibility</span>
                </button>
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
