import React from 'react';

const NotificationHeader = ({ unreadCount, onMarkAllRead }) => {
    return (
        <div className="notifications-header">
            <h1 style={{ fontSize: '24px', fontWeight: 'bolder' }}>Notifications</h1>
            {unreadCount > 0 && (
            <button className="mark-all-read" onClick={onMarkAllRead}>
                Mark all as read
            </button>
            )}
        </div>
    );
};

export default NotificationHeader;