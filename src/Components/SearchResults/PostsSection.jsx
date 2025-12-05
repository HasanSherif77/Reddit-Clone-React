import PostsHeader from "./PostsHeader";
import PostsList from "./PostsList";

export default function PostsSection() {
  return (
    <div style={{ padding: "0px 20px 20px 40px" }}>
      <PostsHeader />
      <PostsList />
    </div>
  );
}
