import React, { useState } from 'react';
import TopBar from '../../Components/Shared/TopBar/TopBar';
import LeftSideBar from '../../Components/Shared/LeftSideBar/LeftSideBar';
import './Notifications.css';
import NotificationHeader from '../../Components/Notifications/NotificationHeader';
import NotificationsList from '../../Components/Notifications/NotificationList';
import NotificationsFooter from '../../Components/Notifications/NotificationsFooter';

const Notifications = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(true);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'achievement',
            title: 'Achievement unlocked!',
            description: 'Check out your newest achievement',
            time: '6d ago',
            read: false
        },
        {
            id: 2,
            type: 'achievement',
            title: 'Achievement unlocked!',
            description: 'Check out your newest achievement',
            time: '6d ago',
            read: false
        }
    ]);

    const markAllAsRead = () => {
        setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
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
                        <NotificationHeader unreadCount={unreadCount} onMarkAllRead={markAllAsRead} />
                        <NotificationsList notifications={notifications} />
                        <NotificationsFooter />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Notifications;   