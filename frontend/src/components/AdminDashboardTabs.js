import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboardTabs = ({ activeTab }) => {
  return (
    <div className="dashboard-tabs">
      <Link 
        to="/admin/overview" 
        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
      >
        Overview
      </Link>
      <Link 
        to="/admin/users" 
        className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
      >
        Users
      </Link>
      <Link 
        to="/admin/orders" 
        className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
      >
        Orders
      </Link>
      <Link 
        to="/admin/analytics" 
        className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
      >
        Analytics
      </Link>
      <Link 
        to="/admin/settings" 
        className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
      >
        Settings
      </Link>
      <Link 
        to="/admin/print-labels" 
        className={`tab-btn ${activeTab === 'print-labels' ? 'active' : ''}`}
      >
        Print Labels
      </Link>
    </div>
  );
};

export default AdminDashboardTabs; 