import "./PersonItem.css";

export default function PersonItem({ avatar, username, bio, karma }) {
  return (
    <div className="person-item">
      <img src={avatar} alt="" className="person-avatar" />

      <div className="person-info">
        <p className="person-name">{username}</p>
        <p className="person-bio">{bio}</p>
        <p className="person-karma">{karma} karma</p>
      </div>
    </div>
  );
}
