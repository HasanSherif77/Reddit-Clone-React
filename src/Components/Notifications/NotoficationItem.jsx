import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationIcon from './NotificationIcon';

const NotificationItem = ({ notification }) => {
    const { id, type, title, description, time, read, postId } = notification;
    const navigate = useNavigate();

    const handleClick = () => {
        if (postId) {
            navigate(`/post/${postId}`);
        }
    };

    return (
        <div 
            className={`notification-item ${read ? 'read' : 'unread'} ${postId ? 'clickable' : ''}`}
            onClick={handleClick}
            style={{ cursor: postId ? 'pointer' : 'default' }}
        >
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