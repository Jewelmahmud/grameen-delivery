import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboard.css'; // Reusing the admin dashboard styles for now

const RiderDashboardTabs = ({ activeTab }) => {
  return (
    <div className="dashboard-tabs">
      <Link 
        to="/rider/overview" 
        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
      >
        Overview
      </Link>
      <Link 
        to="/rider/deliveries" 
        className={`tab-btn ${activeTab === 'deliveries' ? 'active' : ''}`}
      >
        Deliveries
      </Link>
      <Link 
        to="/rider/earnings" 
        className={`tab-btn ${activeTab === 'earnings' ? 'active' : ''}`}
      >
        Earnings
      </Link>
      <Link 
        to="/rider/schedule" 
        className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
      >
        Schedule
      </Link>
      <Link 
        to="/rider/performance" 
        className={`tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
      >
        Performance
      </Link>
      <Link 
        to="/rider/profile" 
        className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
      >
        Profile
      </Link>
    </div>
  );
};

export default RiderDashboardTabs; 