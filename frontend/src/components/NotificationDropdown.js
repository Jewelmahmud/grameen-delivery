import React, { useState, useRef, useEffect } from 'react';

const NotificationDropdown = ({ notifications = [], onMarkAsRead, onClearAll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAsRead = (notificationId, e) => {
    if (e) e.stopPropagation();
    onMarkAsRead(notificationId);
  };

  const handleClearAll = (e) => {
    if (e) e.stopPropagation();
    onClearAll();
    setIsOpen(false);
  };

  // Helper function to get the appropriate icon for a notification
  const getNotificationIcon = (notification) => {
    if (notification.title === 'Payment Received') {
      return '💰'; // Cash icon for payment received notifications
    }

    // Default icons based on notification type
    switch (notification.type) {
      case 'order':
        return '📦'; // Package icon for orders
      case 'rider':
        return '🛵'; // Scooter icon for riders
      case 'partner':
        return '🏪'; // Store icon for partners
      case 'system':
        return '⚙️'; // Gear icon for system notifications
      default:
        return '🔔'; // Default bell icon
    }
  };

  return (
    <div className={`notification-dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <div className="notification-bell" onClick={toggleDropdown}>
        <span className="notification-icon">🔔</span>
        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span>
        )}
      </div>

      <div className="notification-menu">
        <div className="notification-header">
          <h3>Notifications</h3>
          {notifications.length > 0 && (
            <button className="clear-all" onClick={handleClearAll}>
              Clear All
            </button>
          )}
        </div>

        <div className="notification-list">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
              >
                <div className="notification-icon-wrapper">
                  {getNotificationIcon(notification)}
                </div>
                <div className="notification-content">
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-time">{notification.time}</div>
                </div>
                <div className="notification-actions">
                  {!notification.read && (
                    <button 
                      className="mark-read-btn"
                      onClick={(e) => handleMarkAsRead(notification.id, e)}
                    >
                      Mark as read
                    </button>
                  )}
                  <button className="view-details-btn">View</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-notifications">
              No new notifications
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown; 