import React from 'react';
import NotificationItem from './NotoficationItem';

const NotificationsList = ({ notifications }) => {
    return (
        <div className="notifications-list">
            {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
            ))}
    </div>
    );
};

export default NotificationsList;