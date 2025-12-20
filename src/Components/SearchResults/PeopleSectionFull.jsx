import React, { useState, useEffect } from "react";
import PersonItem from "./PersonItem";
import "./PeopleSectionFull.css";
import defaultAvatar from "../../assets/default-avatars/default.svg";

export default function PeopleSectionFull({ showHeader = true, searchQuery = "" }) {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      if (!searchQuery.trim()) {
        setPeople([]);
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
          `http://localhost:5000/users/search/${encodeURIComponent(searchQuery.trim())}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        
        // Map backend data to frontend format
        const mappedPeople = Array.isArray(data) ? data.map((user) => ({
          userId: user._id || user.id,
          avatar: user.avatarUrl || defaultAvatar,
          username: `u/${user.displayname || user.username || "unknown"}`,
          bio: user.description || "No bio available",
          karma: formatKarma(user.karma || 0),
        })) : [];

        setPeople(mappedPeople);
      } catch (err) {
        setError(err.message);
        setPeople([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, [searchQuery]);

  const formatKarma = (karma) => {
    if (karma >= 1000000) {
      return `${(karma / 1000000).toFixed(1)}M`;
    } else if (karma >= 1000) {
      return `${(karma / 1000).toFixed(1)}K`;
    }
    return karma.toString();
  };

  return (
    <div className="people-section-full">
      {showHeader && (
        <div className="people-header">
          <h2>People</h2>
        </div>
      )}

      {isLoading && <div className="loading-message">Loading people...</div>}
      {error && <div className="error-message">Error: {error}</div>}
      {!isLoading && !error && people.length === 0 && searchQuery && (
        <div className="empty-message">No people found for "{searchQuery}"</div>
      )}

      {!isLoading && !error && people.length > 0 && (
        <div className="people-grid">
          {people.map((person, index) => (
            <PersonItem key={index} {...person} />
          ))}
        </div>
      )}

      {!isLoading && !error && people.length > 0 && (
        <button className="see-more-btn">See more people</button>
      )}
    </div>
  );
}

