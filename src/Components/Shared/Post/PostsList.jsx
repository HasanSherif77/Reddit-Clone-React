import React, { useState, useEffect } from "react";
import "./PostsList.css";
import PostCard from "./PostCard";

function PostsList({ isSignedIn = true }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

  const response = await fetch('http://localhost:5000/posts/', {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        
        // Map backend response to PostCard format
        const postsArray = Array.isArray(data) ? data : data.posts || [];
        const mappedPosts = postsArray.map((post) => {
          // Extract user data - backend populates userId with full user object
          let userId = null;
          let userData = null;
          if (post.userId) {
            if (typeof post.userId === 'object' && post.userId._id) {
              // Populated user object
              userId = String(post.userId._id);
              userData = {
                displayname: post.userId.displayname || '',
                username: post.userId.username || '',
                avatarUrl: post.userId.avatarUrl || ''
              };
            } else if (typeof post.userId === 'string') {
              // Just the ObjectId string
              userId = post.userId;
            }
          }
          
          // Extract community data - backend populates communityId with full community object
          let communityId = null;
          let communityData = null;
          if (post.communityId !== null && post.communityId !== undefined) {
            if (typeof post.communityId === 'object' && post.communityId._id) {
              // Populated community object
              communityId = String(post.communityId._id);
              communityData = {
                communityName: post.communityId.communityName || '',
                communityIcon: post.communityId.communityIcon || ''
              };
            } else if (typeof post.communityId === 'string') {
              // Just the ObjectId string
              communityId = post.communityId;
            }
          }
          
          const mapped = {
            id: post._id || post.id,
            userId: userId,
            communityId: communityId,
            userData: userData, // Pass populated user data
            communityData: communityData, // Pass populated community data
            timeAgo: formatTimeAgo(post.createdAt || post.created_at),
            title: post.title || '',
            text: post.body || '',
            mediaUrl: post.mediaUrl || null,
            votes: post.votesCount || 0,
            commentsCount: post.commentsCount || 0,
          };
          
          return mapped;
        });

        setPosts(mappedPosts);
      } catch (err) {
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Helper function to format time ago
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

  if (loading) {
    return (
      <div className="posts-list">
        <div className="posts-loading">
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-list">
        <div className="posts-error">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="posts-list">
        <div className="posts-empty">
          <p>No posts available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} isSignedIn={isSignedIn} />
      ))}
    </div>
  );
}

export default PostsList;
