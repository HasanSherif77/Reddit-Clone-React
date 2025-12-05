import React from "react";

const AchievementsCard = () => {
  return (
    <section className="card achievements-card">
      <div className="card-header">
        <span>Achievements</span>
        <button className="link-button">View All</button>
      </div>

      <div className="trophy-row">
        <img
          src="https://preview.redd.it/fsx0sxlz96pd1.png?width=100&height=100&crop=smart&auto=webp&s=8c0fa355c102b7e66d6440183ae084b04ec74d77"
          alt="Trophy 1"
          className="trophy-img"
        />
        <img
          src="https://preview.redd.it/1b6b7fsohavc1.png?width=100&height=100&crop=smart&auto=webp&s=cb6595d5aa9741ac2ed1fd509f5b4dc4a9d4ce97"
          alt="Trophy 2"
          className="trophy-img"
        />
        <img
          src="https://preview.redd.it/fpniflrohavc1.png?width=100&height=100&crop=smart&auto=webp&s=3715dbf286c349f8255a54add53f9d48de18c56d"
          alt="Trophy 3"
          className="trophy-img"
        />
      </div>

      <div style={{ marginTop: "8px", fontSize: "13px" }}>4 unlocked</div>
    </section>
  );
};

export default AchievementsCard;
