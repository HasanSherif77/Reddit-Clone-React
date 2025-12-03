import PersonItem from "./PersonItem";
import "./PeopleSection.css";
import testImage from "../../assets/images/test.jpg";
export default function PeopleSection() {
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
  ];

  return (
    <div className="people-section">
      <h4>People</h4>

      {people.map((person, index) => (
        <PersonItem key={index} {...person} />
      ))}
      <span className="see-more">See more people</span>
    </div>
  );
}
