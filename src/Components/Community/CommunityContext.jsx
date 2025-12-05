// CommunityContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CommunityContext = createContext();

export const useCommunities = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunities must be used within a CommunityProvider');
  }
  return context;
};

export const CommunityProvider = ({ children }) => {
  const [communities, setCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);

  // Load communities from localStorage on mount
  useEffect(() => {
    const savedCommunities = localStorage.getItem('createdCommunities');
    if (savedCommunities) {
      try {
        setCommunities(JSON.parse(savedCommunities));
      } catch (error) {
        console.error('Error loading communities from localStorage:', error);
      }
    }

    const savedJoinedCommunities = localStorage.getItem('joinedCommunities');
    if (savedJoinedCommunities) {
      try {
        setJoinedCommunities(JSON.parse(savedJoinedCommunities));
      } catch (error) {
        console.error('Error loading joined communities from localStorage:', error);
      }
    }
  }, []);

  // Save communities to localStorage whenever communities change
  useEffect(() => {
    localStorage.setItem('createdCommunities', JSON.stringify(communities));
  }, [communities]);

  // Save joined communities to localStorage whenever joinedCommunities change
  useEffect(() => {
    localStorage.setItem('joinedCommunities', JSON.stringify(joinedCommunities));
  }, [joinedCommunities]);

  const addCommunity = (communityData) => {
    const newCommunity = {
      id: Date.now().toString(),
      ...communityData,
      createdAt: new Date().toISOString(),
      posts: [] // Start with no posts
    };

    setCommunities(prevCommunities => [newCommunity, ...prevCommunities]);
    return newCommunity;
  };

  const getCommunityById = (id) => {
    return communities.find(community => community.id === id);
  };

  const getCommunityByName = (name) => {
    return communities.find(community => community.name.toLowerCase() === name.toLowerCase());
  };

  const joinCommunity = (communityData) => {
    // Check if already joined
    if (joinedCommunities.find(c => c.id === communityData.id)) {
      return; // Already joined
    }

    const joinedCommunity = {
      ...communityData,
      joinedAt: new Date().toISOString(),
      isJoined: true
    };

    setJoinedCommunities(prev => [joinedCommunity, ...prev]);
  };

  const leaveCommunity = (communityId) => {
    setJoinedCommunities(prev => prev.filter(c => c.id !== communityId));
  };

  const isCommunityJoined = (communityId) => {
    return joinedCommunities.some(c => c.id === communityId);
  };

  // Get all communities (created + joined) for display
  const getAllCommunities = () => {
    return [...communities, ...joinedCommunities];
  };

  // Get community by ID from either created or joined
  const getCommunityByIdExtended = (id) => {
    return communities.find(c => c.id === id) || joinedCommunities.find(c => c.id === id);
  };

  // Get community by name from either created or joined
  const getCommunityByNameExtended = (name) => {
    return communities.find(c => c.name.toLowerCase() === name.toLowerCase()) ||
           joinedCommunities.find(c => c.name.toLowerCase() === name.toLowerCase());
  };

  const value = {
    communities, // Created communities
    joinedCommunities, // Joined communities
    addCommunity,
    getCommunityById,
    getCommunityByName,
    joinCommunity,
    leaveCommunity,
    isCommunityJoined,
    getAllCommunities,
    getCommunityByIdExtended,
    getCommunityByNameExtended
  };

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
};
