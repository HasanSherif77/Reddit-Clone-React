import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateCommunityForm from 'c:/Users/habib/OneDrive - Faculty of Engineering Ain Shams University/Documents/Projects/WebDevProject/reddit-clone-react/src/Components/Community/CreateCommunityForm';

const EditCommunityPage = () => {
  const { communityName } = useParams();
  const [community, setCommunity] = useState({});

  useEffect(() => {
    // Fake community data
    setCommunity({
      name: communityName,
      description: 'This is a test community',
    });
  }, [communityName]);

  const handleUpdate = (updatedData) => {
    console.log('Updated community', updatedData);
    alert(`Community "${updatedData.name}" updated!`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Community</h2>
      <CreateCommunityForm
        onCreate={handleUpdate}
        initialName={community.name}
        initialDescription={community.description}
      />
    </div>
  );
};

export default EditCommunityPage;
