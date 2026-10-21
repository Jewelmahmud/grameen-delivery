import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboard.css'; // Reusing the admin dashboard styles for now

const PartnerDashboardTabs = ({ activeTab }) => {
  return (
    <div className="dashboard-tabs">
      <Link 
        to="/partner/overview" 
        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
      >
        Overview
      </Link>
      <Link 
        to="/partner/orders" 
        className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
      >
        Orders
      </Link>
      <Link 
        to="/partner/products" 
        className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
      >
        Products
      </Link>
      <Link 
        to="/partner/analytics" 
        className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
      >
        Analytics
      </Link>
      <Link 
        to="/partner/profile" 
        className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
      >
        Profile
      </Link>
      <Link 
        to="/partner/settings" 
        className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
      >
        Settings
      </Link>
    </div>
  );
};

export default PartnerDashboardTabs; 