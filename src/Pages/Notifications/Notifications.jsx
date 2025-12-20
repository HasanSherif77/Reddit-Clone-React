import React, { useState, useEffect } from 'react';
import TopBar from '../../Components/Shared/TopBar/TopBar';
import LeftSideBar from '../../Components/Shared/LeftSideBar/LeftSideBar';
import './Notifications.css';
import NotificationHeader from '../../Components/Notifications/NotificationHeader';
import NotificationsList from '../../Components/Notifications/NotificationList';
import NotificationsFooter from '../../Components/Notifications/NotificationsFooter';

const Notifications = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    // Fetch notifications from backend
    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch("http://localhost:5000/notifications/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    // Map backend response to component format
                    const mappedNotifications = (Array.isArray(data) ? data : data.notifications || []).map((notif) => {
                        // Extract populated objects
                        const relatedUser = notif.relatedUser;
                        const relatedPost = notif.relatedPost;
                        const relatedComment = notif.relatedComment;
                        const user = notif.user;

                        // Extract postId from relatedPost (could be object or string)
                        let postId = null;
                        if (relatedPost) {
                            postId = typeof relatedPost === 'object' ? (relatedPost._id || relatedPost.id) : relatedPost;
                        }

                        // Extract commentId from relatedComment (could be object or string)
                        let commentId = null;
                        if (relatedComment) {
                            commentId = typeof relatedComment === 'object' ? (relatedComment._id || relatedComment.id) : relatedComment;
                        }

                        // Generate title and description based on type and action
                        let title = 'Notification';
                        let description = notif.action || '';

                        if (relatedUser) {
                            const relatedUserName = relatedUser.displayname || relatedUser.username || 'someone';
                            const relatedUserPrefix = `u/${relatedUserName}`;

                            switch (notif.type) {
                                case 'comment':
                                    title = `${relatedUserPrefix} commented on your post`;
                                    description = notif.action || 'New comment on your post';
                                    break;
                                case 'reply':
                                    title = `${relatedUserPrefix} replied to your comment`;
                                    description = notif.action || 'New reply to your comment';
                                    break;
                                case 'upvote':
                                    title = `${relatedUserPrefix} upvoted your ${relatedPost ? 'post' : 'comment'}`;
                                    description = notif.action || 'Your content received an upvote';
                                    break;
                                case 'downvote':
                                    title = `${relatedUserPrefix} downvoted your ${relatedPost ? 'post' : 'comment'}`;
                                    description = notif.action || 'Your content received a downvote';
                                    break;
                                case 'message':
                                    title = `${relatedUserPrefix} sent you a message`;
                                    description = notif.action || 'New message';
                                    break;
                                case 'community':
                                    title = `${relatedUserPrefix} ${notif.action || 'updated the community'}`;
                                    description = notif.action || 'Community update';
                                    break;
                                default:
                                    title = `${relatedUserPrefix} ${notif.action || 'performed an action'}`;
                                    description = notif.action || '';
                            }
                        } else {
                            // No relatedUser, use action as title
                            title = notif.action || 'Notification';
                            description = '';
                        }

                        return {
                            id: notif._id || notif.id,
                            type: notif.type || 'general',
                            action: notif.action || '',
                            title: title,
                            description: description,
                            time: formatTimeAgo(notif.createdAt),
                            read: notif.read || false,
                            postId: postId,
                            commentId: commentId,
                            relatedUser: relatedUser ? {
                                id: typeof relatedUser === 'object' ? (relatedUser._id || relatedUser.id) : relatedUser,
                                displayname: relatedUser.displayname || '',
                                username: relatedUser.username || '',
                                avatarUrl: relatedUser.avatarUrl || ''
                            } : null,
                            relatedPost: relatedPost ? {
                                id: typeof relatedPost === 'object' ? (relatedPost._id || relatedPost.id) : relatedPost,
                                title: relatedPost.title || ''
                            } : null,
                            relatedComment: relatedComment ? {
                                id: typeof relatedComment === 'object' ? (relatedComment._id || relatedComment.id) : relatedComment,
                                content: relatedComment.content || ''
                            } : null,
                            user: user ? {
                                id: typeof user === 'object' ? (user._id || user.id) : user,
                                displayname: user.displayname || '',
                                username: user.username || ''
                            } : null,
                            createdAt: notif.createdAt
                        };
                    });

                    setNotifications(mappedNotifications);
                } else {
                    if (response.status === 401) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("userId");
                    }
                    setError("Failed to load notifications");
                }
            } catch (err) {
                console.error("Error fetching notifications:", err);
                setError("Failed to load notifications");
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const markAllAsRead = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            // Update backend
            const response = await fetch("http://localhost:5000/notifications/me/read-all", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // Update local state
                setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
            } else {
                console.error("Failed to mark all as read");
            }
        } catch (err) {
            console.error("Error marking all as read:", err);
            // Still update local state even if API call fails
            setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
        }
    };

    const unreadCount = notifications.filter((notif) => !notif.read).length;

    return (
        <div className="App">
            <TopBar isSignedIn={isSignedIn} />
            <div className="leftsidebar-layout">
                <LeftSideBar
                    isOpen={isSidebarOpen}
                    onToggle={() => setIsSidebarOpen((prev) => !prev)}
                    isSignedIn={isSignedIn}
                />
                <main className="notifications-content">
                    <div className="notifications-container">
                        {loading ? (
                            <div className="notifications-loading">
                                <p>Loading notifications...</p>
                            </div>
                        ) : error ? (
                            <div className="notifications-error">
                                <p>{error}</p>
                            </div>
                        ) : (
                            <>
                                <NotificationHeader unreadCount={unreadCount} onMarkAllRead={markAllAsRead} />
                                <NotificationsList notifications={notifications} />
                                <NotificationsFooter />
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Notifications;   