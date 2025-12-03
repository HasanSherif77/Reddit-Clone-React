import "./MediaPostCard.css";

export default function MediaPostCard({ image, title, subreddit }) {
  return (
    <div className="media-card">
      <img src={image} alt={title} />
      <div className="media-info">
        <p className="sub">r/{subreddit}</p>
        <p className="title">{title}</p>
      </div>
    </div>
  );
}
