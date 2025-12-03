import PersonItem from "./PersonItem";
import "./PeopleSectionFull.css";
import testImage from "./test.jpg";

export default function PeopleSectionFull({ showHeader = true }) {
  const people = [
    {
      avatar: testImage,
      username: "u/ClashRoyale",
      bio: "Official Clash Royale Dev Team...",
      karma: "92K",
    },
    {
      avatar: testImage,
      username: "u/ClashRoyale16",
      bio: "Welcome to my page! I'm an...",
      karma: "104K",
    },
    {
      avatar: testImage,
      username: "u/ClashRoyaleSupport",
      bio: "Official Clash Royale Player...",
      karma: "1.6K",
    },
    {
      avatar: testImage,
      username: "u/ClashRoyale",
      bio: "Official Clash Royale Dev Team...",
      karma: "92K",
    },
    {
      avatar: testImage,
      username: "u/ClashRoyale16",
      bio: "Welcome to my page! I'm an...",
      karma: "104K",
    },
    {
      avatar: testImage,
      username: "u/ClashRoyaleSupport",
      bio: "Official Clash Royale Player...",
      karma: "1.6K",
    },
  ];

  return (
    <div className="people-section-full">
      {showHeader && (
        <div className="people-header">
          <h2>People</h2>
        </div>
      )}

      <div className="people-grid">
        {people.map((person, index) => (
          <PersonItem key={index} {...person} />
        ))}
      </div>

      <button className="see-more-btn">See more people</button>
    </div>
  );
}

