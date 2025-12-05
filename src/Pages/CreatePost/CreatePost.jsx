import React, { useState } from 'react';
import './CreatePost.css';
import CommunitySelector from '../../Components/CreatePost/CommunitySelector';
import PostTypeTabs from '../../Components/CreatePost/PostTypeTabs';
import TitleInput from '../../Components/CreatePost/TitleInput';
import TagsInput from '../../Components/CreatePost/TagsInput';
import EditingToolbar from '../../Components/CreatePost/EditingToolbar'; 
import EditorBody from '../../Components/CreatePost/EditorBody'; 
import FormActions from '../../Components/CreatePost/FormActions';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [postType, setPostType] = useState('Text');
  const [tags, setTags] = useState([]);

  const handlePost = () => {
    console.log('Posting:', { selectedCommunity, title, body, tags, postType });
    alert('Post submitted! (Check console for data)');
  };

  return (
    <div className="create-post-container">
      <div className="create-post-header">
        <h1>Create post</h1>
      </div>

      <div className="post-form">
        <CommunitySelector 
          selectedCommunity={selectedCommunity}
          setSelectedCommunity={setSelectedCommunity}
        />

        <PostTypeTabs 
          postType={postType}
          setPostType={setPostType}
        />

        <TitleInput 
          title={title}
          setTitle={setTitle}
        />

        <TagsInput 
          tags={tags}
          setTags={setTags}
        />

        <EditingToolbar /> {/* Changed */}

        <EditorBody 
          body={body}
          setBody={setBody}
        />

        <FormActions 
          title={title}
          selectedCommunity={selectedCommunity}
          handlePost={handlePost}
        />
      </div>
    </div>
  );
};

export default CreatePost;