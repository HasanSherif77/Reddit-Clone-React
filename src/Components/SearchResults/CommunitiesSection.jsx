import CommunityItem from "./CommunityItem";
import "./CommunitiesSection.css";
import testImage from "../../assets/images/test.jpg";
export default function CommunitiesSection() {
  const communities = [
    {
      avatar: testImage,
      name: "r/ClashRoyale",
      description: "Subreddit for all things Clash...",
      members: "1.4M",
      online: 486,
      nsfw: false,
    },
    {
      avatar: testImage,
      name: "r/ClashRoyaleNSFW",
      description: "clash royale porn",
      members: "2.3K",
      online: 6,
      nsfw: true,
    },
    {
      avatar: testImage,
      name: "r/Clash_Royale",
      description: "Ditch r/ClashRoyale if you hate...",
      members: "16K",
      online: 17,
      nsfw: false,
    },
    {
      avatar: testImage,
      name: "r/ClashRoyaleCirclejerk",
      description: "The Subreddit to Whine and...",
      members: "66K",
      online: 19,
      nsfw: false,
    },
  ];

  return (
    <div className="communities-section">
      <h4>Communities</h4>

      {communities.map((item, index) => (
        <CommunityItem key={index} {...item} />
      ))}

      <span className="see-more">See more communities</span>
    </div>
  );
}
