import "./CommunityItem.css";

export default function CommunityItem({
  avatar,
  name,
  description,
  members,
  online,
  nsfw,
}) {
  return (
    <div className="community-item">
      <img src={avatar} alt="" className="community-avatar" />

      <div className="community-info">
        <p className="community-name">
          {nsfw && <span className="nsfw-badge">18+</span>}
          {name}
        </p>
        <p className="community-desc">{description}</p>
        <p className="community-stats">
          {members} members · {online} online
        </p>
      </div>
    </div>
  );
}
