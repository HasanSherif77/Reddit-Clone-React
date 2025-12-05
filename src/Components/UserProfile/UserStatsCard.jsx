// src/Components/UserProfile/UserStatsCard.jsx
import React from "react";

const UserStatsCard = ({ user }) => {
  const { followers, karma, cakeDay, contributions } = user;

  return (
    <section className="card user-stats-card">
      <h3>User Stats</h3>

      <div className="user-stat-row">
        <span>Followers</span>
        <span>{followers}</span>
      </div>

      <div className="user-stat-row">
        <span>Karma</span>
        <span>{karma}</span>
      </div>

      <div className="user-stat-row">
        <span>Reddit age</span>
        <span>{cakeDay}</span>
      </div>

      <div className="user-stat-row">
        <span>Contributions</span>
        <span>{contributions}</span>
      </div>
    </section>
  );
};

export default UserStatsCard;
