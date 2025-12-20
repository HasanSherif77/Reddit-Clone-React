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
                    const mappedNotifications = (Array.isArray(data) ? data : data.notifications || []).map((notif) => ({
                        id: notif._id || notif.id,
                        type: notif.type || notif.notificationType || 'general',
                        title: notif.title || notif.message || 'Notification',
                        description: notif.description || notif.body || notif.content || '',
                        time: formatTimeAgo(notif.createdAt || notif.created_at || notif.timestamp),
                        read: notif.read || notif.isRead || false,
                    }));

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