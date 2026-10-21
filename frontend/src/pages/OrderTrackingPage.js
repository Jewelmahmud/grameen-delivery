import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/OrderTracking.css';

const OrderTrackingPage = () => {
  const { texts } = useLanguage();
  const [trackingId, setTrackingId] = useState('');
  const [tracking, setTracking] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrackingSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    setLoading(true);
    
    // Mock API call - would be replaced with actual API call
    setTimeout(() => {
      if (trackingId === 'DEMO123') {
        setTracking({
          id: 'DEMO123',
          status: 'in_transit',
          origin: 'Dhaka Central Hub',
          destination: 'Nilphamari Village',
          estimatedDelivery: '2023-06-15',
          timeline: [
            { date: '2023-06-10', time: '09:30 AM', status: 'Order Placed', description: 'Your order has been placed successfully' },
            { date: '2023-06-11', time: '10:15 AM', status: 'Picked Up', description: 'Your package has been picked up by our delivery partner' },
            { date: '2023-06-12', time: '08:45 AM', status: 'In Transit', description: 'Your package is on the way to the destination' }
          ]
        });
      } else {
        setError('No tracking information found for this ID');
        setTracking(null);
      }
      setLoading(false);
    }, 1500);
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'order_placed': return 'status-placed';
      case 'picked_up': return 'status-picked';
      case 'in_transit': return 'status-transit';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="order-tracking-page">
      <Navbar />
      
      <div className="order-tracking-container">
        <div className="tracking-header">
          <h1>Track Your Order</h1>
          <p>Enter your tracking ID to see the current status of your delivery</p>
        </div>

        <div className="tracking-form-container">
          <form onSubmit={handleTrackingSubmit} className="tracking-form">
            <div className="input-group">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter tracking ID (e.g., DEMO123)"
                className="tracking-input"
              />
              <button type="submit" className="tracking-submit-btn" disabled={loading}>
                {loading ? 'Tracking...' : 'Track Order'}
              </button>
            </div>
            {error && <div className="tracking-error">{error}</div>}
          </form>
        </div>

        {tracking && (
          <div className="tracking-results">
            <div className="tracking-summary">
              <div className="tracking-id">
                <h3>Tracking ID:</h3>
                <p>{tracking.id}</p>
              </div>
              <div className="tracking-status">
                <h3>Status:</h3>
                <p className={getStatusClass(tracking.status)}>
                  {tracking.status.replace('_', ' ').toUpperCase()}
                </p>
              </div>
              <div className="tracking-details">
                <div>
                  <h3>From:</h3>
                  <p>{tracking.origin}</p>
                </div>
                <div>
                  <h3>To:</h3>
                  <p>{tracking.destination}</p>
                </div>
                <div>
                  <h3>Est. Delivery:</h3>
                  <p>{tracking.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            <div className="tracking-timeline">
              <h3>Delivery Progress</h3>
              <div className="timeline">
                {tracking.timeline.map((event, index) => (
                  <div className="timeline-item" key={index}>
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-date">
                        {event.date} | {event.time}
                      </div>
                      <h4 className="timeline-title">{event.status}</h4>
                      <p className="timeline-description">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="tracking-info">
          <h2>How to Track Your Order</h2>
          <ul>
            <li>Enter your tracking ID that was provided in your confirmation email</li>
            <li>You can also find your tracking ID in the Grameen Delivery App</li>
            <li>For any issues, please contact our customer support at help@grameendelivery.com</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderTrackingPage; 