import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TopBar from '../../Components/Shared/TopBar/TopBar';
import LeftSideBar from '../../Components/Shared/LeftSideBar/LeftSideBar';
import './CreatePost.css';
import CommunitySelector from '../../Components/CreatePost/CommunitySelector';
import PostTypeTabs from '../../Components/CreatePost/PostTypeTabs';
import TitleInput from '../../Components/CreatePost/TitleInput';
import TagsInput from '../../Components/CreatePost/TagsInput';
import EditingToolbar from '../../Components/CreatePost/EditingToolbar'; 
import EditorBody from '../../Components/CreatePost/EditorBody'; 
import FormActions from '../../Components/CreatePost/FormActions';

const CreatePost = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [postType, setPostType] = useState('Text');
  const [tags, setTags] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loadingCommunities, setLoadingCommunities] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Fetch communities from backend
  useEffect(() => {
    const fetchCommunities = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoadingCommunities(false);
        return;
      }

      try {
        setLoadingCommunities(true);
        const response = await fetch("http://localhost:5000/communities/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Map backend response to extract community names
          const communityList = (Array.isArray(data) ? data : data.communities || []).map((community) => ({
            id: community._id || community.id,
            name: community.name || community.communityName || community.title || '',
          })).filter(community => community.name); // Filter out communities without names

          setCommunities(communityList);
        } else {
          console.error("Failed to fetch communities");
          if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
          }
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setLoadingCommunities(false);
      }
    };

    fetchCommunities();
  }, []);

  // Pre-select community from URL parameter
  useEffect(() => {
    const communityParam = searchParams.get('community');
    if (communityParam && communities.length > 0) {
      // Find the community by name
      const foundCommunity = communities.find(
        comm => comm.name && comm.name.toLowerCase() === decodeURIComponent(communityParam).toLowerCase()
      );
      if (foundCommunity && foundCommunity.id) {
        setSelectedCommunity(String(foundCommunity.id));
      }
    }
  }, [searchParams, communities]);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Determine if it's an image or video
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (isImage || isVideo) {
        setMediaType(isImage ? 'image' : 'video');
        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setMediaPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select an image or video file');
        setSelectedFile(null);
        setMediaPreview(null);
        setMediaType(null);
      }
    }
  };

  // Handle remove media
  const handleRemoveMedia = () => {
    setSelectedFile(null);
    setMediaPreview(null);
    setMediaType(null);
    // Reset file input
    const fileInput = document.getElementById('media-file-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handlePost = async () => {
    // Validation
    if (!title.trim()) {
      setSubmitError('Title is required');
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setSubmitError('You must be logged in to create a post');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare post data
      const postData = {
        title: title.trim(),
        body: body.trim() || null,
        mediaUrl: mediaPreview || null,
      };

      // Only include communityId if a valid one is selected
      if (selectedCommunity && selectedCommunity !== '' && selectedCommunity !== 'none') {
        // Ensure we're sending the ID, not the name
        postData.communityId = selectedCommunity;
      }

      // Remove null/empty fields
      Object.keys(postData).forEach(key => {
        if (postData[key] === null || postData[key] === '') {
          delete postData[key];
        }
      });

      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to create post');
      }

      // Success - reset form and navigate
      setTitle('');
      setBody('');
      setSelectedCommunity('');
      setTags([]);
      setSelectedFile(null);
      setMediaPreview(null);
      setMediaType(null);
      
      // Reset file input
      const fileInput = document.getElementById('media-file-input');
      if (fileInput) {
        fileInput.value = '';
      }

      // Navigate to the new post or home page
      navigate('/');
      

    } catch (error) {
      console.error("Error creating post:", error);
      setSubmitError(error.message || 'Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <TopBar isSignedIn={isSignedIn} />
      <div className="leftsidebar-layout">
        <LeftSideBar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
          isSignedIn={isSignedIn}
        />
        <main className="create-post-content">
          <div className="create-post-container">
            <div className="create-post-header">
              <h1>Create post</h1>
            </div>

            <div className="post-form">
              <CommunitySelector 
                selectedCommunity={selectedCommunity}
                setSelectedCommunity={setSelectedCommunity}
                communities={communities}
                loading={loadingCommunities}
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

              <EditingToolbar />

              <EditorBody 
                body={body}
                setBody={setBody}
              />

              {/* Media Upload Section */}
              <div className="form-section">
                <div className="media-upload-section">
                  <label htmlFor="media-file-input" className="browse-button">
                    Browse
                  </label>
                  <input
                    id="media-file-input"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <span className="media-hint">Upload an image or video (Optional)</span>
                </div>

                {/* Media Preview */}
                {mediaPreview && (
                  <div className="media-preview-container">
                    {mediaType === 'image' ? (
                      <img 
                        src={mediaPreview} 
                        alt="Preview" 
                        className="media-preview"
                      />
                    ) : (
                      <video 
                        src={mediaPreview} 
                        controls 
                        className="media-preview"
                      />
                    )}
                    <button 
                      className="remove-media-btn"
                      onClick={handleRemoveMedia}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {submitError && (
                <div className="submit-error">
                  <p>{submitError}</p>
                </div>
              )}

              <FormActions 
                title={title}
                selectedCommunity={selectedCommunity}
                handlePost={handlePost}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreatePost;