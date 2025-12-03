import PostCard from "./PostCard";
import testImage from "./test.jpg";

export default function PostsList() {
  const posts = [
    {
      avatar: testImage,
      subreddit: "ClashRoyale",
      time: "6mo ago",
      title: "New evo leaked",
      firstComment:
        "I believe it only gets to that instant max damage state AFTER it charges up hitting something before...",
      votes: "1.2K",
      comments: 165,
      image: testImage,
    },
    {
      avatar: testImage,
      subreddit: "ClashRoyale",
      time: "10mo ago",
      title: "THIS IS DISGUSTING",
      firstComment:
        "The card is so broken they actually made a Twitter post to show how to counter it",
      votes: "3.6K",
      comments: 313,
      image: testImage,
    },
    {
      avatar: testImage,
      subreddit: "ClashRoyale",
      time: "5y ago",
      title: "Humanizing Clash Royale Emotes...(The Princess)",
      firstComment:
        "Looks like she just got logged! Stupendous effort btw.",
      votes: "1.1K",
      comments: 97,
      image: testImage,
    },
  ];

  return (
    <>
      {posts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))}
    </>
  );
}