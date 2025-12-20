import React, { useState, useEffect } from "react";
import MediaPostCard from "./MediaPostCard";
import "./MediaGrid.css";

export default function MediaGrid({ searchQuery = "" }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMediaPosts = async () => {
      if (!searchQuery.trim()) {
        setPosts([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(
          `http://localhost:5000/posts/search/${encodeURIComponent(searchQuery.trim())}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch media posts");
        }

        const data = await response.json();
        const postsArray = Array.isArray(data) ? data : [];

        // Filter posts that have mediaUrl and map to MediaPostCard format
        const mappedPosts = postsArray
          .filter((post) => post.mediaUrl && post.mediaUrl.trim() !== '')
          .map((post) => {
            let subreddit = "unknown";
            if (post.communityId && typeof post.communityId === 'object') {
              subreddit = post.communityId.communityName || "unknown";
            }

            return {
              id: post._id || post.id,
              postId: post._id || post.id, // For navigation
              image: post.mediaUrl,
              title: post.title || '',
              subreddit: subreddit,
            };
          });

        setPosts(mappedPosts);
      } catch (err) {
        setError(err.message);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediaPosts();
  }, [searchQuery]);

  if (isLoading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading media...</div>;
  }

  if (error) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#ea0027' }}>Error: {error}</div>;
  }

  if (posts.length === 0 && searchQuery) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#7c7c7c' }}>No media found for "{searchQuery}"</div>;
  }

  return (
    <div className="media-grid">
      {posts.map((post) => (
        <MediaPostCard key={post.id} {...post} />
      ))}
    </div>
  );
}