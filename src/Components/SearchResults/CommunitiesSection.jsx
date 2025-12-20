import React, { useState, useEffect } from "react";
import CommunityItem from "./CommunityItem";
import "./CommunitiesSection.css";
import defaultAvatar from "../../assets/default-avatars/default.svg";

export default function CommunitiesSection({ searchQuery = "" }) {
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCommunities = async () => {
      setIsLoading(true);

      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        let url;
        if (searchQuery.trim()) {
          // If there's a search query, use search endpoint
          url = `http://localhost:5000/communities/search/${encodeURIComponent(searchQuery.trim())}`;
        } else {
          // Otherwise, fetch all communities and show top ones
          url = "http://localhost:5000/communities/";
        }

        const response = await fetch(url, {
          method: "GET",
          headers: headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch communities");
        }

        const data = await response.json();
        const communitiesArray = Array.isArray(data) ? data : data.communities || [];

        // Sort by members count if not from search (before mapping)
        let sortedCommunities = communitiesArray;
        if (!searchQuery.trim()) {
          sortedCommunities = [...communitiesArray].sort((a, b) => {
            const aCount = a.communityMembersCount || 0;
            const bCount = b.communityMembersCount || 0;
            return bCount - aCount;
          });
        }

        // Map backend data to frontend format
        const mappedCommunities = sortedCommunities
          .slice(0, 4) // Limit to 4 for sidebar
          .map((community) => ({
            avatar: community.communityIcon || defaultAvatar,
            name: `r/${community.communityName || "unknown"}`,
            communityName: community.communityName || "unknown",
            description: community.communityDescription || "No description available",
            members: formatMembers(community.communityMembersCount || 0),
            online: 0, // Backend doesn't provide online count
            nsfw: false, // Backend doesn't provide NSFW flag
          }));

        setCommunities(mappedCommunities);
      } catch (err) {
        // On error, set empty array
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
    <div className="communities-section">
      <h4>Communities</h4>

      {isLoading ? (
        <div style={{ padding: '20px', textAlign: 'center', fontSize: '14px', color: '#7c7c7c' }}>
          Loading...
        </div>
      ) : communities.length > 0 ? (
        <>
          {communities.map((item, index) => (
            <CommunityItem key={index} {...item} />
          ))}
          <span className="see-more">See more communities</span>
        </>
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', fontSize: '14px', color: '#7c7c7c' }}>
          No communities found
        </div>
      )}
    </div>
  );
}
