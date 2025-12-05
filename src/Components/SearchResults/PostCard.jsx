import "./PostCard.css";

export default function PostCard({
  avatar,
  subreddit,
  time,
  title,
  firstComment,
  votes,
  comments,
  image,
}) {
  return (
    <div className="post-card">
      <div className="post-left">
        <div className="post-header-row">
          <img className="avatar" src={avatar} alt="" />
          <span className="subreddit">r/{subreddit}</span>
          <span className="time">· {time}</span>
        </div>

        <h4 className="post-title">{title}</h4>
        <p className="post-desc">{firstComment}</p>

        <div className="post-stats">
          <span>{votes} votes</span>
          <span>· {comments} comments</span>
        </div>
      </div>

      {image && (
        <div className="post-right">
          <img src={image} alt="" />
        </div>
      )}
    </div>
  );
}