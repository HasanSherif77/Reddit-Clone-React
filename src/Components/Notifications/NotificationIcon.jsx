import React from 'react';

const NotificationIcon = ({ type }) => {
    const getIcon = () => {
        switch (type) {
            case 'achievement':
                return <div className="achievement-icon">🏆</div>;
            default:
                return null;
        }
    };

    return (
        <div className="notification-icon">
            {getIcon()}
        </div>
    );
};

export default NotificationIcon;