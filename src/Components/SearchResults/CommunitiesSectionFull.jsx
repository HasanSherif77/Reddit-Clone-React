import React, { useState, useEffect } from "react";
import CommunityItem from "./CommunityItem";
import "./CommunitiesSectionFull.css";
import defaultAvatar from "../../assets/default-avatars/default.svg";

export default function CommunitiesSectionFull({ showHeader = true, searchQuery = "" }) {
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommunities = async () => {
      if (!searchQuery.trim()) {
        setCommunities([]);
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
          `http://localhost:5000/communities/search/${encodeURIComponent(searchQuery.trim())}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch communities");
        }

        const data = await response.json();
        
        // Map backend data to frontend format
        const mappedCommunities = Array.isArray(data) ? data.map((community) => ({
          avatar: community.communityIcon || defaultAvatar,
          name: `r/${community.communityName || "unknown"}`,
          communityName: community.communityName || "unknown",
          description: community.communityDescription || "No description available",
          members: formatMembers(community.communityMembersCount || 0),
          online: 0, // Backend doesn't provide online count, defaulting to 0
          nsfw: false, // Backend doesn't provide NSFW flag, defaulting to false
        })) : [];

        setCommunities(mappedCommunities);
      } catch (err) {
        setError(err.message);
        setCommunities([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunities();
  }, [searchQuery]);

  const formatMembers = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="communities-section-full">
      {showHeader && (
        <div className="communities-header">
          <h2>Communities</h2>
        </div>
      )}

      {isLoading && <div className="loading-message">Loading communities...</div>}
      {error && <div className="error-message">Error: {error}</div>}
      {!isLoading && !error && communities.length === 0 && searchQuery && (
        <div className="empty-message">No communities found for "{searchQuery}"</div>
      )}

      {!isLoading && !error && communities.length > 0 && (
        <div className="communities-grid">
          {communities.map((item, index) => (
            <CommunityItem key={index} {...item} />
          ))}
        </div>
      )}

      {!isLoading && !error && communities.length > 0 && (
        <button className="see-more-btn">See more communities</button>
      )}
    </div>
  );
}

