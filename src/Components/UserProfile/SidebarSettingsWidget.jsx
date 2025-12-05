import React from "react";

const EyeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M2.5 12C4.2 8.5 7.4 6 12 6s7.8 2.5 9.5 6c-1.7 3.5-4.9 6-9.5 6s-7.8-2.5-9.5-6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle
      cx="12"
      cy="12"
      r="2.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

const ShirtIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M9 4.5 12 3l3 1.5 2.5 2.2-1.5 2L14 7.2V20H10V7.2L8 10.2 6.5 8.7z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M12 3.2 6 5.4v6.3c0 3 2.5 5.8 6 7.1 3.5-1.3 6-4.1 6-7.1V5.4z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const SidebarSettingsWidget = () => {
  return (
    <section className="card sidebar-settings-widget">
      <h4 className="sidebar-settings-title">Settings</h4>

      {/* Profile */}
      <div className="sidebar-settings-row">
        <div className="sidebar-settings-left">
          <div className="settings-icon">
            <img
              src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_7.png"
              alt="Profile"
              className="settings-icon-img"
            />
          </div>
          <div>
            <div className="settings-title">Profile</div>
            <div className="settings-subtitle">Customize your profile</div>
          </div>
        </div>
        <button className="btn-pill">Update</button>
      </div>

      {/* Curate your profile */}
      <div className="sidebar-settings-row">
        <div className="sidebar-settings-left">
          <div className="settings-icon">
            <EyeIcon />
          </div>
          <div>
            <div className="settings-title">Curate your profile</div>
            <div className="settings-subtitle">
              Manage what people see when they visit
            </div>
          </div>
        </div>
        <button className="btn-pill">Update</button>
      </div>

      {/* Avatar */}
      <div className="sidebar-settings-row">
        <div className="sidebar-settings-left">
          <div className="settings-icon">
            <ShirtIcon />
          </div>
          <div>
            <div className="settings-title">Avatar</div>
            <div className="settings-subtitle">Style your avatar</div>
          </div>
        </div>
        <button className="btn-pill">Update</button>
      </div>

      {/* Mod Tools */}
      <div className="sidebar-settings-row">
        <div className="sidebar-settings-left">
          <div className="settings-icon">
            <ShieldIcon />
          </div>
          <div>
            <div className="settings-title">Mod Tools</div>
            <div className="settings-subtitle">Moderate your profile</div>
          </div>
        </div>
        <button className="btn-pill">Update</button>
      </div>

      <button className="add-social-link-btn">+ Add Social Link</button>
    </section>
  );
};

export default SidebarSettingsWidget;
