import React from "react";
import "./PostsList.css";
import PostCard from "./PostCard";
import codeImage from "../../../assets/demo-posts/Code.jpg";
import demoVideo from "../../../assets/demo-posts/Video.mp4";
import communityImage from "../../../assets/demo-posts/CommunityImage.jpg"


const dummyPosts = [
  {
    id: "1",
    type: "image",
    community: "r/ArabHands",
    communityIcon: communityImage,
    timeAgo: "41 min. ago",
    title: "Code",
    text: "",
    imageUrl: codeImage,
    videoUrl: null,
    votes: 123,
    commentsCount: 7
  },
  {
    id: "2",
    type: "text",
    community: "r/learnprogramming",
    communityIcon: communityImage,
    timeAgo: "3 hours ago",
    title: "Started building a Reddit clone in React!",
    text: "Today I finished the header, sidebar, and sort/view controls. Next step is rendering posts from a backend.",
    imageUrl: null,
    videoUrl: null,
    votes: 45,
    commentsCount: 12
  },
  {
    id: "3",
    type: "video",
    community: "r/videos",
    communityIcon: communityImage,
    timeAgo: "1 day ago",
    title: "Cool demo video",
    text: "",
    imageUrl: null,
    videoUrl: demoVideo,
    votes: 300,
    commentsCount: 90
  }
];

function PostsList() {
  return (
    <div className="posts-list">
      {dummyPosts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}

export default PostsList;
