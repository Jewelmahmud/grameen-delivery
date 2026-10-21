import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import '../../styles/AdminDashboard.css';
import '../../styles/ActivityDetails.css';

const OrderIssue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [issue, setIssue] = useState(null);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const path = location.pathname.split('/');
    if (path.includes('activities')) {
      setActiveTab('overview'); // Activities are accessed from overview tab
    }
  }, [location]);

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setIssue({
        id: 'ISS-142',
        orderId: id || 'ORD-8745',
        reportedBy: 'Rahim Ahmed',
        customerEmail: 'rahim.ahmed@example.com',
        customerPhone: '+880 1612-987654',
        dateReported: '2023-07-10',
        status: 'open',
        issueType: 'Missing Items',
        issueDescription: 'I ordered 5 items but only received 4. The Samsung phone charger was missing from the package.',
        priority: 'medium',
        attachments: [
          { name: 'Order Receipt.jpg', url: '#' },
          { name: 'Package Photo.jpg', url: '#' }
        ],
        orderDetails: {
          date: '2023-07-08',
          totalAmount: '৳12,500',
          paymentMethod: 'Cash on Delivery',
          deliveryAddress: '789 Residential Area, Mirpur, Dhaka',
          rider: 'Karim Uddin',
          partner: 'Khan Electronics',
          items: [
            { name: 'Samsung Galaxy A52', quantity: 1, price: '৳8,500' },
            { name: 'Headphones', quantity: 1, price: '৳1,200' },
            { name: 'Screen Protector', quantity: 2, price: '৳400' },
            { name: 'Phone Case', quantity: 1, price: '৳600' },
            { name: 'Phone Charger', quantity: 1, price: '৳1,800' }
          ]
        },
        timeline: [
          { time: '2023-07-10 14:23', action: 'Issue reported by customer', user: 'System' },
          { time: '2023-07-10 14:25', action: 'Issue automatically assigned to support team', user: 'System' }
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleResolve = () => {
    // In a real app, this would be an API call to update the status
    console.log('Resolving issue for order:', id);
    alert('Issue has been marked as resolved!');
    navigate('/admin/overview');
  };

  const handleContactCustomer = () => {
    // In a real app, this would trigger an email or phone call
    console.log('Contacting customer for order issue:', id);
    alert('Contact request has been initiated.');
  };

  const handleContactPartner = () => {
    // In a real app, this would trigger an email or phone call
    console.log('Contacting partner for order issue:', id);
    alert('Partner has been notified about the issue.');
  };

  const handleAddNote = () => {
    // In a real app, this would add a note to the timeline
    console.log('Adding note to issue:', id);
    const note = prompt('Enter your note:');
    if (note) {
      setIssue({
        ...issue,
        timeline: [
          ...issue.timeline,
          { time: new Date().toLocaleString(), action: note, user: 'Admin' }
        ]
      });
    }
  };

  if (isLoading) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-content">
          <div className="activity-details-container">
            <div className="loading-spinner">Loading...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <div className="activity-details-container">
          <div className="activity-details-header">
            <button className="back-button" onClick={() => navigate('/admin/overview')}>
              ← Back to Dashboard
            </button>
            <h2>
              <span className="activity-icon order">📦</span>
              Order Issue #{issue.id}
            </h2>
            <div className={`status-badge ${issue.status}`}>{issue.status}</div>
          </div>

          <div className="activity-details-content">
            <div className="issue-summary">
              <div className={`priority-indicator ${issue.priority}`}>
                {issue.priority} priority
              </div>
              <h3>{issue.issueType}</h3>
              <p className="issue-description">{issue.issueDescription}</p>
              <div className="issue-meta">
                <span>Reported on {issue.dateReported}</span>
                <span>by {issue.reportedBy}</span>
              </div>
            </div>

            <div className="two-column-layout">
              <div className="column">
                <div className="details-section">
                  <h3>Customer Information</h3>
                  <div className="details-grid">
                    <div className="detail-item">
                      <label>Name</label>
                      <p>{issue.reportedBy}</p>
                    </div>
                    <div className="detail-item">
                      <label>Email</label>
                      <p>{issue.customerEmail}</p>
                    </div>
                    <div className="detail-item">
                      <label>Phone</label>
                      <p>{issue.customerPhone}</p>
                    </div>
                  </div>
                </div>

                <div className="details-section">
                  <h3>Order Information</h3>
                  <div className="details-grid">
                    <div className="detail-item">
                      <label>Order ID</label>
                      <p>{issue.orderId}</p>
                    </div>
                    <div className="detail-item">
                      <label>Order Date</label>
                      <p>{issue.orderDetails.date}</p>
                    </div>
                    <div className="detail-item">
                      <label>Total Amount</label>
                      <p>{issue.orderDetails.totalAmount}</p>
                    </div>
                    <div className="detail-item">
                      <label>Payment Method</label>
                      <p>{issue.orderDetails.paymentMethod}</p>
                    </div>
                    <div className="detail-item">
                      <label>Delivery Address</label>
                      <p>{issue.orderDetails.deliveryAddress}</p>
                    </div>
                    <div className="detail-item">
                      <label>Rider</label>
                      <p>{issue.orderDetails.rider}</p>
                    </div>
                    <div className="detail-item">
                      <label>Partner</label>
                      <p>{issue.orderDetails.partner}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="details-section">
                  <h3>Order Items</h3>
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {issue.orderDetails.items.map((item, index) => (
                        <tr key={index} className={item.name.includes('Charger') ? 'highlighted-row' : ''}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="details-section">
                  <h3>Attachments</h3>
                  <div className="attachments-list">
                    {issue.attachments.map((attachment, index) => (
                      <div key={index} className="attachment-item">
                        <span className="attachment-icon">📎</span>
                        <span className="attachment-name">{attachment.name}</span>
                        <button className="view-btn">View</button>
                        <button className="download-btn">Download</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Issue Timeline</h3>
              <div className="timeline">
                {issue.timeline.map((entry, index) => (
                  <div key={index} className="timeline-entry">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-time">{entry.time}</div>
                      <div className="timeline-action">{entry.action}</div>
                      <div className="timeline-user">{entry.user}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="action-buttons-container">
              <button className="primary-btn" onClick={handleResolve}>
                Mark as Resolved
              </button>
              <button className="secondary-btn" onClick={handleContactCustomer}>
                Contact Customer
              </button>
              <button className="secondary-btn" onClick={handleContactPartner}>
                Contact Partner
              </button>
              <button className="secondary-btn" onClick={handleAddNote}>
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderIssue; 