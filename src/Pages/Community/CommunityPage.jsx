import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommunityHeader from "../../Components/Community/CommunityHeader";
import CommunityPost from "../../Components/Community/CommunityPost";
import CreateCommunityForm from "../../Components/Community/CreateCommunityForm";

const CommunityPage = () => {
  const { communityName } = useParams();
  const [community, setCommunity] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fake data to test without backend
    setCommunity({
      name: communityName,
      description: 'This is a test community',
      members: 1234,
    });
    setPosts([
      { id: 1, title: 'Welcome Post', content: 'This is the first post', author: 'Admin' },
      { id: 2, title: 'Another Post', content: 'Just testing', author: 'User1' },
    ]);
  }, [communityName]);

  return (
    <div className="p-4">
      <CommunityHeader community={community} />
      <div className="mt-4">
        {posts.map((post) => (
          <CommunityPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
