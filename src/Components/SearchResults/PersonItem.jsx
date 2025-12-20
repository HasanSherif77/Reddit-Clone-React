import { useNavigate } from "react-router-dom";
import "./PersonItem.css";

export default function PersonItem({ userId, avatar, username, bio, karma }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (userId) {
      navigate(`/user/${userId}`);
    }
  };

  return (
    <div className="person-item" onClick={handleClick}>
      <img src={avatar} alt="" className="person-avatar" />

      <div className="person-info">
        <p className="person-name">{username}</p>
        <p className="person-bio">{bio}</p>
        <p className="person-karma">{karma} karma</p>
      </div>
    </div>
  );
}
