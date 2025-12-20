import { useNavigate } from "react-router-dom";
import "./MediaPostCard.css";

export default function MediaPostCard({ id, postId, image, title, subreddit }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (postId || id) {
      navigate(`/post/${postId || id}`);
    }
  };

  return (
    <div 
      className="media-card" 
      onClick={handleClick}
      style={{ cursor: (postId || id) ? 'pointer' : 'default' }}
    >
      <img src={image} alt={title} />
      <div className="media-info">
        <p className="sub">r/{subreddit}</p>
        <p className="title">{title}</p>
      </div>
    </div>
  );
}
