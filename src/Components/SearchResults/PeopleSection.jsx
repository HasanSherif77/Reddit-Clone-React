import React, { useState, useEffect } from "react";
import PersonItem from "./PersonItem";
import "./PeopleSection.css";
import defaultAvatar from "../../assets/default-avatars/default.svg";

export default function PeopleSection({ searchQuery = "" }) {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      // Only fetch if there's a search query
      if (!searchQuery.trim()) {
        setPeople([]);
        return;
      }

      setIsLoading(true);

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
        const usersArray = Array.isArray(data) ? data : [];

        // Map backend data to frontend format
        const mappedPeople = usersArray
          .slice(0, 3) // Limit to 3 for sidebar
          .map((user) => ({
            userId: user._id || user.id,
            avatar: user.avatarUrl || defaultAvatar,
            username: `u/${user.displayname || user.username || "unknown"}`,
            bio: user.description || "No bio available",
            karma: formatKarma(user.karma || 0),
          }));

        setPeople(mappedPeople);
      } catch (err) {
        // On error, set empty array
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
    <div className="people-section">
      <h4>People</h4>

      {isLoading ? (
        <div style={{ padding: '20px', textAlign: 'center', fontSize: '14px', color: '#7c7c7c' }}>
          Loading...
        </div>
      ) : people.length > 0 ? (
        <>
          {people.map((person, index) => (
            <PersonItem key={index} {...person} />
          ))}
          <span className="see-more">See more people</span>
        </>
      ) : searchQuery ? (
        <div style={{ padding: '20px', textAlign: 'center', fontSize: '14px', color: '#7c7c7c' }}>
          No people found
        </div>
      ) : null}
    </div>
  );
}
