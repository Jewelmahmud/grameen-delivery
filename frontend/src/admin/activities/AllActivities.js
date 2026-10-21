import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import '../../styles/AdminDashboard.css';
import '../../styles/ActivityDetails.css';

const AllActivities = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
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
      const mockActivities = [
        {
          id: 'ACT-001',
          type: 'rider',
          title: 'New Rider Application',
          description: 'Kamal Hossain has applied to be a delivery rider',
          time: '10 minutes ago',
          date: '2023-07-10',
          linkTo: '/admin/activities/rider/RDR-287',
          linkText: 'Review',
          status: 'pending'
        },
        {
          id: 'ACT-002',
          type: 'partner',
          title: 'New Business Partner',
          description: 'Khan Electronics has registered as a business partner',
          time: '45 minutes ago',
          date: '2023-07-10',
          linkTo: '/admin/activities/partner/PTR-124',
          linkText: 'Review',
          status: 'pending'
        },
        {
          id: 'ACT-003',
          type: 'order',
          title: 'Order Issue Reported',
          description: 'Customer reported missing items in order #ORD-8745',
          time: '2 hours ago',
          date: '2023-07-10',
          linkTo: '/admin/activities/order-issue/ORD-8745',
          linkText: 'Investigate',
          status: 'open'
        },
        {
          id: 'ACT-004',
          type: 'system',
          title: 'System Update Completed',
          description: 'Payment system update has been successfully deployed',
          time: '5 hours ago',
          date: '2023-07-10',
          linkTo: '/admin/activities/system-update/UPD-035',
          linkText: 'Details',
          status: 'completed'
        },
        {
          id: 'ACT-005',
          type: 'rider',
          title: 'Rider Approval',
          description: 'Farida Begum has been approved as a delivery rider',
          time: '1 day ago',
          date: '2023-07-09',
          linkTo: '/admin/activities/rider/RDR-286',
          linkText: 'View',
          status: 'completed'
        },
        {
          id: 'ACT-006',
          type: 'order',
          title: 'Order Dispute Resolved',
          description: 'Dispute for order #ORD-8632 has been resolved',
          time: '1 day ago',
          date: '2023-07-09',
          linkTo: '/admin/activities/order-issue/ORD-8632',
          linkText: 'View',
          status: 'completed'
        },
        {
          id: 'ACT-007',
          type: 'partner',
          title: 'Partner Performance Alert',
          description: 'ABC Store has shown lower than average performance',
          time: '2 days ago',
          date: '2023-07-08',
          linkTo: '/admin/activities/partner/PTR-118',
          linkText: 'Analyze',
          status: 'open'
        },
        {
          id: 'ACT-008',
          type: 'system',
          title: 'Scheduled Maintenance',
          description: 'System maintenance scheduled for July 15, 2023',
          time: '2 days ago',
          date: '2023-07-08',
          linkTo: '/admin/activities/system-update/UPD-036',
          linkText: 'Details',
          status: 'pending'
        }
      ];
      
      setActivities(mockActivities);
      setFilteredActivities(mockActivities);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter activities based on search term and active filter
  useEffect(() => {
    let filtered = activities;
    
    if (activeFilter !== 'all') {
      filtered = filtered.filter(activity => activity.type === activeFilter);
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(activity => 
        activity.title.toLowerCase().includes(searchLower) || 
        activity.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredActivities(filtered);
  }, [searchTerm, activeFilter, activities]);

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = activity.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {});

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
        <div className="activity-list-container">
          <div className="activity-list-header">
            <button className="back-button" onClick={() => navigate('/admin/overview')}>
              ← Back to Dashboard
            </button>
            <h2>Recent Activities</h2>
          </div>

          <div className="activity-list-filters">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button className="search-btn">🔍</button>
            </div>
            
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Activities
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'rider' ? 'active' : ''}`}
                onClick={() => setActiveFilter('rider')}
              >
                Rider
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'partner' ? 'active' : ''}`}
                onClick={() => setActiveFilter('partner')}
              >
                Partner
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'order' ? 'active' : ''}`}
                onClick={() => setActiveFilter('order')}
              >
                Order
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'system' ? 'active' : ''}`}
                onClick={() => setActiveFilter('system')}
              >
                System
              </button>
            </div>
          </div>

          <div className="activity-list-content">
            {Object.keys(groupedActivities).length > 0 ? (
              Object.keys(groupedActivities).map(date => (
                <div key={date} className="activity-date-group">
                  <div className="activity-date-header">{date}</div>
                  <div className="activities-list">
                    {groupedActivities[date].map(activity => (
                      <div key={activity.id} className="activity-item">
                        <div className={`activity-icon ${activity.type}`}>
                          {activity.type === 'rider' && '🛵'}
                          {activity.type === 'partner' && '🏪'}
                          {activity.type === 'order' && '📦'}
                          {activity.type === 'system' && '⚙️'}
                        </div>
                        <div className="activity-details">
                          <div className="activity-title">
                            {activity.title}
                            <span className={`status-badge ${activity.status}`}>{activity.status}</span>
                          </div>
                          <div className="activity-description">{activity.description}</div>
                          <div className="activity-time">{activity.time}</div>
                        </div>
                        <div className="activity-actions">
                          <Link to={activity.linkTo} className="primary-btn">{activity.linkText}</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data-message">
                No activities found matching your search criteria.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllActivities; 