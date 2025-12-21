import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '../../Components/Shared/TopBar/TopBar';
import LeftSideBar from '../../Components/Shared/LeftSideBar/LeftSideBar';
import PostCard from '../../Components/Shared/Post/PostCard';
import CommentsSection from '../../Components/PostDetails/CommentsSection';
import './PostDetails.css';

const PostDetails = () => {
  const { postId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  // Check if user is signed in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSignedIn(!!token);
  }, []);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setError('No post ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

  const response = await fetch(`http://localhost:5000/posts/${postId}`, {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const post = await response.json();
        
        // Extract user data
        let userId = null;
        let userData = null;
        if (post.userId) {
          if (typeof post.userId === 'object' && post.userId._id) {
            userId = String(post.userId._id);
            userData = {
              displayname: post.userId.displayname || '',
              username: post.userId.username || '',
              avatarUrl: post.userId.avatarUrl || ''
            };
          } else if (typeof post.userId === 'string') {
            userId = post.userId;
          }
        }
        
        // Extract community data
        let communityId = null;
        let communityData = null;
        if (post.communityId !== null && post.communityId !== undefined) {
          if (typeof post.communityId === 'object' && post.communityId._id) {
            communityId = String(post.communityId._id);
            communityData = {
              communityName: post.communityId.communityName || '',
              communityIcon: post.communityId.communityIcon || ''
            };
          } else if (typeof post.communityId === 'string') {
            communityId = post.communityId;
          }
        }
        
        const mappedPost = {
          id: post._id || post.id,
          userId: userId,
          communityId: communityId,
          userData: userData,
          communityData: communityData,
          timeAgo: formatTimeAgo(post.createdAt || post.created_at),
          title: post.title || '',
          text: post.body || '',
          mediaUrl: post.mediaUrl || null,
          votes: post.votesCount || 0,
          commentsCount: post.commentsCount || 0,
        };
        
        setPostData(mappedPost);
      } catch (err) {
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  // Fetch comments for the post
  useEffect(() => {
    const fetchComments = async () => {
      if (!postId || !postData) return;

      try {
        setCommentsLoading(true);
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

  const response = await fetch(`http://localhost:5000/comments/post/${postId}`, {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        const commentsData = await response.json();
        
        // Get post author ID for isOP check
        const postAuthorId = postData?.userId ? String(postData.userId) : null;
        
        // Build comment tree structure
        const buildCommentTree = (comments) => {
          // Create a map of all comments by ID
          const commentMap = new Map();
          const topLevelComments = [];
          
          // First pass: create all comment objects
          comments.forEach(comment => {
            const commentId = String(comment._id);
            const userIdObj = comment.userId;
            const userIdString = typeof userIdObj === 'object' ? String(userIdObj._id) : String(userIdObj);
            
            const mappedComment = {
              id: commentId,
              userId: userIdString,
              author: (userIdObj?.displayname && userIdObj.displayname.trim() !== '') 
                ? userIdObj.displayname 
                : (userIdObj?.username || 'unknown'),
              timeAgo: formatTimeAgo(comment.createdAt || comment.created_at),
              content: comment.content || '',
              voteCount: comment.votes || 0,
              isOP: postAuthorId && userIdString === postAuthorId,
              replies: []
            };
            
            commentMap.set(commentId, mappedComment);
          });
          
          // Second pass: build tree structure
          comments.forEach(comment => {
            const commentId = String(comment._id);
            const mappedComment = commentMap.get(commentId);
            
            if (comment.parentComment === null || comment.parentComment === undefined) {
              // Top-level comment
              topLevelComments.push(mappedComment);
            } else {
              // Reply comment - find parent and add as reply
              const parentId = typeof comment.parentComment === 'object' 
                ? String(comment.parentComment._id) 
                : String(comment.parentComment);
              const parentComment = commentMap.get(parentId);
              
              if (parentComment) {
                parentComment.replies.push(mappedComment);
              } else {
                // Parent not found, treat as top-level
                topLevelComments.push(mappedComment);
              }
            }
          });
          
          return topLevelComments;
        };
        
        const mappedComments = buildCommentTree(commentsData);
        setComments(mappedComments);
      } catch (err) {
        // Error fetching comments - set empty array
        setComments([]);
      } finally {
        setCommentsLoading(false);
      }
    };

    // Only fetch comments after post data is loaded (to get postAuthorId)
    if (postData) {
      fetchComments();
    }
  }, [postId, postData]);

  // Handle comment deletion - refresh comments list
  const handleDeleteComment = (commentId) => {
    // Remove the deleted comment from the comments state
    const removeComment = (comments) => {
      return comments
        .filter(comment => comment.id !== commentId)
        .map(comment => ({
          ...comment,
          replies: comment.replies ? removeComment(comment.replies) : []
        }));
    };
    
    setComments(prevComments => removeComment(prevComments));
    
    // Optionally refetch all comments to ensure consistency
    const fetchComments = async () => {
      if (!postId) return;

      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

  const response = await fetch(`http://localhost:5000/comments/post/${postId}`, {
          method: 'GET',
          headers: headers,
        });

        if (response.ok) {
          const commentsData = await response.json();
          const postAuthorId = postData?.userId ? String(postData.userId) : null;
          
          const buildCommentTree = (comments) => {
            const commentMap = new Map();
            const topLevelComments = [];
            
            comments.forEach(comment => {
              const commentId = String(comment._id);
              const userIdObj = comment.userId;
              const userIdString = typeof userIdObj === 'object' ? String(userIdObj._id) : String(userIdObj);
              
              const mappedComment = {
                id: commentId,
                userId: userIdString,
                author: (userIdObj?.displayname && userIdObj.displayname.trim() !== '') 
                  ? userIdObj.displayname 
                  : (userIdObj?.username || 'unknown'),
                timeAgo: formatTimeAgo(comment.createdAt || comment.created_at),
                content: comment.content || '',
                voteCount: comment.votes || 0,
                isOP: postAuthorId && userIdString === postAuthorId,
                replies: []
              };
              
              commentMap.set(commentId, mappedComment);
            });
            
            comments.forEach(comment => {
              const commentId = String(comment._id);
              const mappedComment = commentMap.get(commentId);
              
              if (comment.parentComment === null || comment.parentComment === undefined) {
                topLevelComments.push(mappedComment);
              } else {
                const parentId = typeof comment.parentComment === 'object' 
                  ? String(comment.parentComment._id) 
                  : String(comment.parentComment);
                const parentComment = commentMap.get(parentId);
                if (parentComment) {
                  parentComment.replies.push(mappedComment);
                }
              }
            });
            
            return topLevelComments;
          };
          
          const mappedComments = buildCommentTree(commentsData);
          setComments(mappedComments);
        }
      } catch (error) {
        // Error fetching comments
      }
    };
    
    fetchComments();
  };

  // Helper function to format time ago
  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
    return `${Math.floor(diffInSeconds / 31536000)}y ago`;
  };


  const handleAddComment = async (commentText, parentId = null) => {
    if (!isSignedIn) {
      // Redirect to login if not signed in
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    try {
      const body = {
        content: commentText,
        postId: postId
      };

      // If parentId is provided, it's a reply
      if (parentId) {
        body.parentComment = parentId;
      }

        const response = await fetch('http://localhost:5000/comments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          // Redirect to login
          return;
        }
        throw new Error('Failed to create comment');
      }

      // Refresh comments after successful creation
      const fetchComments = async () => {
        try {
          const headers = {
            'Content-Type': 'application/json',
          };
          
          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }

          const commentsResponse = await fetch(`http://localhost:5000/comments/post/${postId}`, {
            method: 'GET',
            headers: headers,
          });

          if (commentsResponse.ok) {
            const commentsData = await commentsResponse.json();
            const postAuthorId = postData?.userId ? String(postData.userId) : null;
            
            const buildCommentTree = (comments) => {
              const commentMap = new Map();
              const topLevelComments = [];
              
              comments.forEach(comment => {
                const commentId = String(comment._id);
                const userIdObj = comment.userId;
                const userIdString = typeof userIdObj === 'object' ? String(userIdObj._id) : String(userIdObj);
                
                const mappedComment = {
                  id: commentId,
                  author: (userIdObj?.displayname && userIdObj.displayname.trim() !== '') 
                    ? userIdObj.displayname 
                    : (userIdObj?.username || 'unknown'),
                  timeAgo: formatTimeAgo(comment.createdAt || comment.created_at),
                  content: comment.content || '',
                  voteCount: comment.votes || 0,
                  isOP: postAuthorId && userIdString === postAuthorId,
                  replies: []
                };
                
                commentMap.set(commentId, mappedComment);
              });
              
              comments.forEach(comment => {
                const commentId = String(comment._id);
                const mappedComment = commentMap.get(commentId);
                
                if (comment.parentComment === null || comment.parentComment === undefined) {
                  topLevelComments.push(mappedComment);
                } else {
                  const parentId = typeof comment.parentComment === 'object' 
                    ? String(comment.parentComment._id) 
                    : String(comment.parentComment);
                  const parentComment = commentMap.get(parentId);
                  
                  if (parentComment) {
                    parentComment.replies.push(mappedComment);
                  } else {
                    topLevelComments.push(mappedComment);
                  }
                }
              });
              
              return topLevelComments;
            };
            
            const mappedComments = buildCommentTree(commentsData);
            setComments(mappedComments);
            
            // Update post data comment count
            if (postData) {
              setPostData({
                ...postData,
                commentsCount: mappedComments.reduce((count, comment) => {
                  const countReplies = (replies) => {
                    return replies.reduce((sum, reply) => sum + 1 + countReplies(reply.replies || []), 0);
                  };
                  return count + 1 + countReplies(comment.replies || []);
                }, 0)
              });
            }
          }
        } catch (err) {
          // Error refreshing comments
        }
      };

      await fetchComments();
    } catch (error) {
      // Error creating comment
    }
  };

  if (loading) {
    return (
      <div className="App">
        <TopBar isSignedIn={isSignedIn} />
        <div className="leftsidebar-layout">
          <LeftSideBar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((prev) => !prev)}
            isSignedIn={isSignedIn}
          />
          <main className="post-details-content">
            <div className="post-details-page">
              <div className="post-details-container">
                <p>Loading post...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !postData) {
    return (
      <div className="App">
        <TopBar isSignedIn={isSignedIn} />
        <div className="leftsidebar-layout">
          <LeftSideBar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((prev) => !prev)}
            isSignedIn={isSignedIn}
          />
          <main className="post-details-content">
            <div className="post-details-page">
              <div className="post-details-container">
                <p>Error: {error || 'Post not found'}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <TopBar isSignedIn={isSignedIn} />
      <div className="leftsidebar-layout">
        <LeftSideBar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
          isSignedIn={isSignedIn}
        />
        <main className="post-details-content">
          <div className="post-details-page">
            <div className="post-details-container">
              <div className="post-content">
                <PostCard
                  id={postData.id}
                  userId={postData.userId}
                  communityId={postData.communityId}
                  userData={postData.userData}
                  communityData={postData.communityData}
                  timeAgo={postData.timeAgo}
                  title={postData.title}
                  text={postData.text}
                  mediaUrl={postData.mediaUrl}
                  votes={postData.votes}
                  commentsCount={postData.commentsCount}
                  isSignedIn={isSignedIn}
                  preferCommunity={false}
                />

                {commentsLoading ? (
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    <p>Loading comments...</p>
                  </div>
                ) : (
                  <CommentsSection 
                    comments={comments}
                    onAddComment={handleAddComment}
                    onAddReply={handleAddComment}
                    onDeleteComment={handleDeleteComment}
                    isSignedIn={isSignedIn}
                  />
                )}
                
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostDetails;