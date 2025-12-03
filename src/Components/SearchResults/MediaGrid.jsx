import MediaPostCard from "./MediaPostCard";
import testImage from "../../assets/images/test.jpg";

import "./MediaGrid.css";

export default function MediaGrid() {
  const posts = [
    {
      image: testImage,
      title: "Just a normal video of clash royale.",
      subreddit: "shitposting",
    },
    {
      image: testImage,
      title: "Clash Royale versão anime",
      subreddit: "HUEstation",
    },
    {
      image: testImage,
      title: "clash royale sex tierlist",
      subreddit: "shitposting",
    },
    {
      image: testImage,
      title: "My first clash royale gameplay video 😁",
      subreddit: "ClashRoyaleCirclejerk",
    },
  ];

  return (
    <div className="media-grid">
      {posts.map((post, index) => (
        <MediaPostCard key={index} {...post} />
      ))}
    </div>
  );
}