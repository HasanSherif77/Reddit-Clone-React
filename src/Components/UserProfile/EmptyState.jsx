import React from "react";

const EmptyState = () => {
  return (
    <div className="empty-state">
      <img
        src="https://www.redditstatic.com/shreddit/assets/snoomojis/Snoo_Expression_NoMouth.png"
        alt="Empty"
        className="empty-state-icon"
      />
      <h2 className="empty-state-title">You don’t have any posts yet</h2>
      <p className="empty-state-text">
        Once you post to a community, it’ll show up here. If you’d rather hide
        your posts, update your settings.
      </p>
      <button className="btn-primary">Update Settings</button>
    </div>
  );
};

export default EmptyState;
