import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import defaultAvatar from "../../assets/default-avatars/default.svg";

export default function CommentsSection({ searchQuery = "" }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      if (!searchQuery.trim()) {
        setComments([]);
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
          `http://localhost:5000/comments/search/${encodeURIComponent(searchQuery.trim())}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await response.json();
        const commentsArray = Array.isArray(data) ? data : [];

        // Map comments to PostCard format (showing the post the comment belongs to)
        const mappedComments = commentsArray.map((comment) => {
          // Extract user and post data
          let avatar = defaultAvatar;
          let subreddit = "unknown";
          let postTitle = "";
          let postId = null;

          if (comment.userId && typeof comment.userId === 'object') {
            avatar = comment.userId.avatarUrl || defaultAvatar;
          }

          if (comment.postId && typeof comment.postId === 'object') {
            postTitle = comment.postId.title || '';
            postId = comment.postId._id || comment.postId.id;
            
            // Get community from post
            if (comment.postId.communityId && typeof comment.postId.communityId === 'object') {
              subreddit = comment.postId.communityId.communityName || "unknown";
            }
          }

          return {
            id: comment._id || comment.id,
            avatar: avatar,
            subreddit: subreddit,
            time: formatTimeAgo(comment.createdAt || comment.created_at),
            title: postTitle || 'Comment on post',
            firstComment: comment.content || '',
            votes: formatVotes(comment.votes || 0),
            comments: 0, // Comments don't have nested comments count in this view
            image: null,
            postId: postId, // Store postId for navigation
          };
        });

        setComments(mappedComments);
      } catch (err) {
        setError(err.message);
        setComments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [searchQuery]);

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
    return `${Math.floor(diffInSeconds / 31536000)}y ago`;
  };

  const formatVotes = (votes) => {
    if (votes >= 1000000) {
      return `${(votes / 1000000).toFixed(1)}M`;
    } else if (votes >= 1000) {
      return `${(votes / 1000).toFixed(1)}K`;
    }
    return votes.toString();
  };

  if (isLoading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading comments...</div>;
  }

  if (error) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#ea0027' }}>Error: {error}</div>;
  }

  if (comments.length === 0 && searchQuery) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#7c7c7c' }}>No comments found for "{searchQuery}"</div>;
  }

  return (
    <>
      {comments.map((comment) => (
        <PostCard key={comment.id} {...comment} />
      ))}
    </>
  );
}

