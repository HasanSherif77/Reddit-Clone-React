import React from 'react';
import NotificationIcon from './NotificationIcon';

const NotificationItem = ({ notification }) => {
    const { id, type, title, description, time, read } = notification;

    return (
        <div className={`notification-item ${read ? 'read' : 'unread'}`}>
            <NotificationIcon type={type} />
            <div className="notification-content">
                <div className="notification-title">{title}</div>
                <div className="notification-description">{description}</div>
                <div className="notification-time">{time}</div>
            </div>
        </div>
    );
        

};

export default NotificationItem;