import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import '../../styles/AdminDashboard.css';
import '../../styles/ActivityDetails.css';

const NewBusinessPartner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [partner, setPartner] = useState(null);
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
      setPartner({
        id: id || 'PTR-124',
        businessName: 'Khan Electronics',
        ownerName: 'Ahmed Khan',
        email: 'ahmed.khan@example.com',
        phone: '+880 1512-345678',
        address: '456 Commerce Street, Dhaka, Bangladesh',
        dateApplied: '2023-05-20',
        status: 'pending',
        documents: [
          { name: 'Business Registration', url: '#', status: 'verified' },
          { name: 'Tax Certificate', url: '#', status: 'verified' },
          { name: 'Store Photos', url: '#', status: 'verified' }
        ],
        businessType: 'Electronics Retailer',
        businessHours: 'Mon-Sat: 10:00 AM - 8:00 PM',
        productCategories: ['Phones', 'Computers', 'Accessories', 'Home Appliances'],
        averageOrderValue: '৳3,500',
        estimatedDailyOrders: '15-20',
        paymentMethods: ['Cash on Delivery', 'Online Payment', 'Mobile Banking'],
        commissionRate: '8%'
      });
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleApprove = () => {
    // In a real app, this would be an API call to update the status
    console.log('Approving business partner:', id);
    alert('Business partner has been approved!');
    navigate('/admin/overview');
  };

  const handleReject = () => {
    // In a real app, this would be an API call to update the status
    console.log('Rejecting business partner:', id);
    alert('Business partner has been rejected.');
    navigate('/admin/overview');
  };

  const handleRequestMoreInfo = () => {
    // In a real app, this would trigger an email or notification
    console.log('Requesting more information for:', id);
    alert('Request for more information has been sent.');
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
              <span className="activity-icon partner">🏪</span>
              New Business Partner
            </h2>
            <div className="status-badge pending">{partner.status}</div>
          </div>

          <div className="activity-details-content">
            <div className="details-section">
              <h3>Business Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Business ID</label>
                  <p>{partner.id}</p>
                </div>
                <div className="detail-item">
                  <label>Business Name</label>
                  <p>{partner.businessName}</p>
                </div>
                <div className="detail-item">
                  <label>Owner Name</label>
                  <p>{partner.ownerName}</p>
                </div>
                <div className="detail-item">
                  <label>Email</label>
                  <p>{partner.email}</p>
                </div>
                <div className="detail-item">
                  <label>Phone</label>
                  <p>{partner.phone}</p>
                </div>
                <div className="detail-item">
                  <label>Address</label>
                  <p>{partner.address}</p>
                </div>
                <div className="detail-item">
                  <label>Date Applied</label>
                  <p>{partner.dateApplied}</p>
                </div>
                <div className="detail-item">
                  <label>Business Type</label>
                  <p>{partner.businessType}</p>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Business Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Business Hours</label>
                  <p>{partner.businessHours}</p>
                </div>
                <div className="detail-item">
                  <label>Product Categories</label>
                  <p>{partner.productCategories.join(', ')}</p>
                </div>
                <div className="detail-item">
                  <label>Average Order Value</label>
                  <p>{partner.averageOrderValue}</p>
                </div>
                <div className="detail-item">
                  <label>Estimated Daily Orders</label>
                  <p>{partner.estimatedDailyOrders}</p>
                </div>
                <div className="detail-item">
                  <label>Payment Methods</label>
                  <p>{partner.paymentMethods.join(', ')}</p>
                </div>
                <div className="detail-item">
                  <label>Commission Rate</label>
                  <p>{partner.commissionRate}</p>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Documents</h3>
              <table className="documents-table">
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {partner.documents.map((doc, index) => (
                    <tr key={index}>
                      <td>{doc.name}</td>
                      <td>
                        <span className={`status-badge ${doc.status}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td>
                        <button className="view-btn">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="map-section">
              <h3>Business Location</h3>
              <div className="map-placeholder">
                Map view will be displayed here
              </div>
            </div>

            <div className="action-buttons-container">
              <button className="primary-btn" onClick={handleApprove}>
                Approve Partner
              </button>
              <button className="danger-btn" onClick={handleReject}>
                Reject Partner
              </button>
              <button className="secondary-btn" onClick={handleRequestMoreInfo}>
                Request More Information
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewBusinessPartner; 