import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import '../../styles/AdminDashboard.css';
import '../../styles/ActivityDetails.css';

const NewRiderApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [application, setApplication] = useState(null);
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
      setApplication({
        id: id || 'RDR-287',
        name: 'Kamal Hossain',
        email: 'kamal.hossain@example.com',
        phone: '+880 1912-345678',
        address: '123 Main Street, Dhaka, Bangladesh',
        dateApplied: '2023-07-05',
        status: 'pending',
        documents: [
          { name: 'Photo ID', url: '#', status: 'verified' },
          { name: 'Driver License', url: '#', status: 'verified' },
          { name: 'Vehicle Registration', url: '#', status: 'pending' }
        ],
        vehicle: {
          type: 'Motorcycle',
          model: 'Honda CB Shine',
          year: '2021',
          licensePlate: 'DH-1234'
        },
        backgroundCheck: 'pending',
        availability: 'Full-time',
        preferredAreas: ['Gulshan', 'Banani', 'Uttara'],
        experience: '2 years in food delivery'
      });
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleApprove = () => {
    // In a real app, this would be an API call to update the status
    console.log('Approving application:', id);
    alert('Application has been approved!');
    navigate('/admin/overview');
  };

  const handleReject = () => {
    // In a real app, this would be an API call to update the status
    console.log('Rejecting application:', id);
    alert('Application has been rejected.');
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
              <span className="activity-icon rider">🛵</span>
              New Rider Application
            </h2>
            <div className="status-badge pending">{application.status}</div>
          </div>

          <div className="activity-details-content">
            <div className="details-section">
              <h3>Personal Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Application ID</label>
                  <p>{application.id}</p>
                </div>
                <div className="detail-item">
                  <label>Full Name</label>
                  <p>{application.name}</p>
                </div>
                <div className="detail-item">
                  <label>Email</label>
                  <p>{application.email}</p>
                </div>
                <div className="detail-item">
                  <label>Phone</label>
                  <p>{application.phone}</p>
                </div>
                <div className="detail-item">
                  <label>Address</label>
                  <p>{application.address}</p>
                </div>
                <div className="detail-item">
                  <label>Date Applied</label>
                  <p>{application.dateApplied}</p>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Vehicle Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Vehicle Type</label>
                  <p>{application.vehicle.type}</p>
                </div>
                <div className="detail-item">
                  <label>Model</label>
                  <p>{application.vehicle.model}</p>
                </div>
                <div className="detail-item">
                  <label>Year</label>
                  <p>{application.vehicle.year}</p>
                </div>
                <div className="detail-item">
                  <label>License Plate</label>
                  <p>{application.vehicle.licensePlate}</p>
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
                  {application.documents.map((doc, index) => (
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

            <div className="details-section">
              <h3>Additional Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Background Check</label>
                  <p>{application.backgroundCheck}</p>
                </div>
                <div className="detail-item">
                  <label>Availability</label>
                  <p>{application.availability}</p>
                </div>
                <div className="detail-item">
                  <label>Preferred Areas</label>
                  <p>{application.preferredAreas.join(', ')}</p>
                </div>
                <div className="detail-item">
                  <label>Experience</label>
                  <p>{application.experience}</p>
                </div>
              </div>
            </div>

            <div className="action-buttons-container">
              <button className="primary-btn" onClick={handleApprove}>
                Approve Application
              </button>
              <button className="danger-btn" onClick={handleReject}>
                Reject Application
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

export default NewRiderApplication; 