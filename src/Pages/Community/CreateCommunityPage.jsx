import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateCommunityForm from '../../Components/Community/CreateCommunityForm';

function CreateCommunityPage() {
  const navigate = useNavigate();

  const handleCreate = (communityData) => {
    console.log('Created community', communityData);
    alert(`Community "${communityData.name}" created!`);
    navigate(`/c/${communityData.name}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create a Community</h2>
      <CreateCommunityForm onCreate={handleCreate} />
    </div>
  );
}

export default CreateCommunityPage;
