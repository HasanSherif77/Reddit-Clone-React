import { useNavigate } from "react-router-dom";
import "./CommunityItem.css";
import defaultAvatar from "../../assets/default-avatars/default.svg";

export default function CommunityItem({
  avatar,
  name,
  communityName,
  description,
  members,
  online,
  nsfw,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Extract community name from name prop (format: "r/{communityName}") or use communityName prop
    let nameToNavigate = communityName;
    if (!nameToNavigate && name) {
      // Remove "r/" prefix if present
      nameToNavigate = name.startsWith('r/') ? name.substring(2) : name;
    }
    
    if (nameToNavigate) {
      navigate(`/r/${nameToNavigate}`);
    }
  };

  return (
    <div 
      className="community-item" 
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img 
        src={avatar || defaultAvatar} 
        alt="" 
        className="community-avatar"
        onError={(e) => {
          // Fallback to default avatar if image fails to load
          if (e.target.src !== defaultAvatar) {
            e.target.src = defaultAvatar;
          }
        }}
      />

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
