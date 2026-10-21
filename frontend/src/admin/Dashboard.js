import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SinglePrintDialog from '../components/SinglePrintDialog';
import BatchPrintDialog from '../components/BatchPrintDialog';
import NotificationDropdown from '../components/NotificationDropdown';
import AdminDashboardTabs from '../components/AdminDashboardTabs';
import '../styles/AdminDashboard.css';
import { useLanguage } from '../context/LanguageContext';
import NewRiderApplication from './activities/NewRiderApplication';
import NewBusinessPartner from './activities/NewBusinessPartner';
import OrderIssue from './activities/OrderIssue';
import SystemUpdate from './activities/SystemUpdate';
import AllActivities from './activities/AllActivities';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Sample data for charts
const orderTrendData = [
  { name: 'Jan', orders: 420 },
  { name: 'Feb', orders: 380 },
  { name: 'Mar', orders: 450 },
  { name: 'Apr', orders: 520 },
  { name: 'May', orders: 490 },
  { name: 'Jun', orders: 560 },
  { name: 'Jul', orders: 620 }
];

const revenueData = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 38000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 56000 },
  { name: 'May', revenue: 52000 },
  { name: 'Jun', revenue: 58000 },
  { name: 'Jul', revenue: 65000 }
];

const categoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Groceries', value: 25 },
  { name: 'Handicrafts', value: 15 },
  { name: 'Books', value: 10 },
  { name: 'Food', value: 15 }
];

const statusData = [
  { name: 'Delivered', value: 68 },
  { name: 'In Transit', value: 15 },
  { name: 'Pending', value: 12 },
  { name: 'Cancelled', value: 5 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Overview Tab Component
const OverviewTab = () => {
  const [statistics] = useState({
    totalUsers: 1248,
    totalRiders: 287,
    totalPartners: 124,
    pendingApprovals: 18,
    totalOrders: 12567,
    todayOrders: 138,
    revenueMonth: '৳125,750',
    growthRate: '+12.5%'
  });

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Dashboard Overview</h2>
        <div className="overview-period">
          <button className="period-btn active">Today</button>
          <button className="period-btn">This Week</button>
          <button className="period-btn">This Month</button>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users-icon">👥</div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <div className="stat-value">{statistics.totalUsers}</div>
            <div className="stat-change positive">+24 this week</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon riders-icon">🛵</div>
          <div className="stat-info">
            <h3>Active Riders</h3>
            <div className="stat-value">{statistics.totalRiders}</div>
            <div className="stat-change positive">+8 this week</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon partners-icon">🏪</div>
          <div className="stat-info">
            <h3>Business Partners</h3>
            <div className="stat-value">{statistics.totalPartners}</div>
            <div className="stat-change positive">+3 this week</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon approvals-icon">⏳</div>
          <div className="stat-info">
            <h3>Pending Approvals</h3>
            <div className="stat-value">{statistics.pendingApprovals}</div>
            <div className="stat-change neutral">Action needed</div>
          </div>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon orders-icon">📦</div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <div className="stat-value">{statistics.totalOrders}</div>
            <div className="stat-change positive">+352 this week</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon today-icon">📅</div>
          <div className="stat-info">
            <h3>Today's Orders</h3>
            <div className="stat-value">{statistics.todayOrders}</div>
            <div className="stat-change positive">+12% vs yesterday</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon revenue-icon">💰</div>
          <div className="stat-info">
            <h3>Monthly Revenue</h3>
            <div className="stat-value">{statistics.revenueMonth}</div>
            <div className="stat-change positive">{statistics.growthRate} vs last month</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon tasks-icon">✅</div>
          <div className="stat-info">
            <h3>Tasks</h3>
            <div className="stat-value">14</div>
            <div className="stat-change negative">5 urgent</div>
          </div>
        </div>
      </div>
      
      <div className="charts-container">
        <div className="chart-card">
          <h3>Orders Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#4CAF50" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-card">
          <h3>Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Percentage" fill="#388E3C">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="recent-activities">
        <div className="section-header">
          <h3>Recent Activities</h3>
          <Link to="/admin/activities" className="view-all-btn">View All</Link>
        </div>
        
        <div className="activities-list">
          <div className="activity-item">
            <div className="activity-icon rider">🛵</div>
            <div className="activity-details">
              <div className="activity-title">New Rider Application</div>
              <div className="activity-description">Kamal Hossain has applied to be a delivery rider</div>
              <div className="activity-time">10 minutes ago</div>
            </div>
            <div className="activity-actions">
              <Link to="/admin/activities/rider/RDR-287" className="primary-btn">Review</Link>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon partner">🏪</div>
            <div className="activity-details">
              <div className="activity-title">New Business Partner</div>
              <div className="activity-description">Khan Electronics has registered as a business partner</div>
              <div className="activity-time">45 minutes ago</div>
            </div>
            <div className="activity-actions">
              <Link to="/admin/activities/partner/PTR-124" className="primary-btn">Review</Link>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon order">📦</div>
            <div className="activity-details">
              <div className="activity-title">Order Issue Reported</div>
              <div className="activity-description">Customer reported missing items in order #ORD-8745</div>
              <div className="activity-time">2 hours ago</div>
            </div>
            <div className="activity-actions">
              <Link to="/admin/activities/order-issue/ORD-8745" className="primary-btn">Investigate</Link>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon system">⚙️</div>
            <div className="activity-details">
              <div className="activity-title">System Update Completed</div>
              <div className="activity-description">Payment system update has been successfully deployed</div>
              <div className="activity-time">5 hours ago</div>
            </div>
            <div className="activity-actions">
              <Link to="/admin/activities/system-update/UPD-035" className="secondary-btn">Details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Users Management Tab Component
const UsersTab = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [users, setUsers] = useState([
    {
      id: 'USR-1248',
      name: 'Rahman Ali',
      email: 'rahman.ali@example.com',
      phone: '+880 1712-345678',
      type: 'customer',
      status: 'active',
      joinDate: '2023-06-15'
    },
    {
      id: 'USR-1247',
      name: 'Anika Islam',
      email: 'anika.islam@example.com',
      phone: '+880 1812-345678',
      type: 'customer',
      status: 'active',
      joinDate: '2023-06-12'
    },
    {
      id: 'RDR-287',
      name: 'Kamal Hossain',
      email: 'kamal.hossain@example.com',
      phone: '+880 1912-345678',
      type: 'rider',
      status: 'pending',
      joinDate: '2023-07-05'
    },
    {
      id: 'PTR-124',
      name: 'Ahmed Khan (Khan Electronics)',
      email: 'ahmed.khan@example.com',
      phone: '+880 1512-345678',
      type: 'partner',
      status: 'active',
      joinDate: '2023-05-20'
    },
    {
      id: 'RDR-286',
      name: 'Farida Begum',
      email: 'farida.begum@example.com',
      phone: '+880 1612-345678',
      type: 'rider',
      status: 'inactive',
      joinDate: '2023-04-18'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = users.filter(user => {
    // First filter by active tab
    if (activeTab !== 'all' && user.type !== activeTab) {
      return false;
    }
    
    // Then filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.id.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.includes(searchTerm)
      );
    }
    
    return true;
  });

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>User Management</h2>
        <button className="action-btn">+ Add New User</button>
      </div>
      
      <div className="search-filter-container">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search users by name, email, or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Users
          </button>
          <button 
            className={`filter-tab ${activeTab === 'customer' ? 'active' : ''}`}
            onClick={() => setActiveTab('customer')}
          >
            Customers
          </button>
          <button 
            className={`filter-tab ${activeTab === 'rider' ? 'active' : ''}`}
            onClick={() => setActiveTab('rider')}
          >
            Riders
          </button>
          <button 
            className={`filter-tab ${activeTab === 'partner' ? 'active' : ''}`}
            onClick={() => setActiveTab('partner')}
          >
            Partners
          </button>
        </div>
      </div>
      
      <div className="users-table-container">
        <table className="data-table users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Type</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <div>{user.email}</div>
                  <div className="secondary-text">{user.phone}</div>
                </td>
                <td>
                  <span className={`badge ${user.type}`}>
                    {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn view-btn" title="View Details">👁️</button>
                    <button className="icon-btn edit-btn" title="Edit User">✏️</button>
                    {user.status === 'pending' && (
                      <button className="icon-btn approve-btn" title="Approve">✅</button>
                    )}
                    {user.status === 'active' && (
                      <button className="icon-btn suspend-btn" title="Suspend">❌</button>
                    )}
                    {user.status === 'inactive' && (
                      <button className="icon-btn activate-btn" title="Activate">🔄</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && (
          <div className="no-data-message">
            No users found matching your criteria.
          </div>
        )}
      </div>
      
      <div className="pagination">
        <button className="pagination-btn">Previous</button>
        <div className="pagination-pages">
          <button className="pagination-page active">1</button>
          <button className="pagination-page">2</button>
          <button className="pagination-page">3</button>
          <span>...</span>
          <button className="pagination-page">10</button>
        </div>
        <button className="pagination-btn">Next</button>
      </div>
    </div>
  );
};

// Orders Management Tab Component
const OrdersTab = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [orders, setOrders] = useState([
    {
      id: 'ORD-8745',
      customer: {
        name: 'Mahmud Rahman',
        phone: '+880 1712-345679'
      },
      deliveryAddress: 'House 12, Road 5, Block C, গুরুদাসপুর, নাটোর',
      rider: 'Abdul Karim',
      partner: 'Khan Electronics',
      partnerId: 'PTR-1245',
      date: '2023-07-10',
      items: [
        { name: 'Smartphone', quantity: 1, price: 7000 },
        { name: 'Case', quantity: 1, price: 500 }
      ],
      total: 7500,
      paymentStatus: 'paid',
      status: 'delivered'
    },
    {
      id: 'ORD-8744',
      customer: {
        name: 'Anika Islam',
        phone: '+880 1812-345678'
      },
      deliveryAddress: '42 Main Street, গুরুদাসপুর, নাটোর',
      rider: 'Pending Assignment',
      partner: 'Global Bazaar',
      partnerId: 'PTR-2134',
      date: '2023-07-10',
      items: [
        { name: 'Rice (5kg)', quantity: 1, price: 350 },
        { name: 'Oil (2L)', quantity: 1, price: 250 },
        { name: 'Fresh Vegetables', quantity: 1, price: 200 },
        { name: 'Spices', quantity: 2, price: 150 },
        { name: 'Chicken (1kg)', quantity: 1, price: 350 }
      ],
      total: 1250,
      paymentStatus: 'pending',
      status: 'pending'
    },
    {
      id: 'ORD-8743',
      customer: {
        name: 'Kamal Hossain',
        phone: '+880 1912-345677'
      },
      deliveryAddress: 'Apartment 3B, Building 7, গুরুদাসপুর, নাটোর',
      rider: 'Farida Begum',
      partner: 'Dhaka Handicrafts',
      partnerId: 'PTR-1876',
      date: '2023-07-09',
      items: [
        { name: 'Handcrafted Vase', quantity: 1, price: 1800 },
        { name: 'Decorative Plates', quantity: 2, price: 500 }
      ],
      total: 2800,
      paymentStatus: 'paid',
      status: 'in-transit'
    },
    {
      id: 'ORD-8741',
      customer: {
        name: 'Rafiq Ahmed',
        phone: '+880 1612-345676'
      },
      deliveryAddress: '15 Park Avenue, গুরুদাসপুর, নাটোর',
      rider: 'None (Cancelled)',
      partner: 'BanglaBooks',
      partnerId: 'PTR-1356',
      date: '2023-07-09',
      items: [
        { name: 'History Book', quantity: 1, price: 350 },
        { name: 'Novel', quantity: 1, price: 300 },
        { name: 'Children\'s Book', quantity: 1, price: 300 }
      ],
      total: 950,
      paymentStatus: 'refunded',
      status: 'cancelled'
    },
    {
      id: 'ORD-8740',
      customer: {
        name: 'Sultana Begum',
        phone: '+880 1512-345675'
      },
      deliveryAddress: 'Shop 4, Market Complex, গুরুদাসপুর, নাটোর',
      rider: 'Jamal Mia',
      partner: 'Fresh Foods',
      partnerId: 'PTR-1452',
      date: '2023-07-08',
      items: [
        { name: 'Fruits Basket', quantity: 1, price: 450 },
        { name: 'Fresh Fish', quantity: 2, price: 500 },
        { name: 'Snacks', quantity: 5, price: 80 }
      ],
      total: 1850,
      paymentStatus: 'paid',
      status: 'delivered'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');

  const handlePrintLabel = (order) => {
    setSelectedOrder(order);
    setShowLabelModal(true);
  };
  
  const handleCloseLabelModal = () => {
    setShowLabelModal(false);
  };

  const handlePrintSingle = (printConfig) => {
    console.log('Printing single label with config:', printConfig);
    // Here you would integrate with your print service
    setShowLabelModal(false);
  };

  const handleBatchPrint = () => {
    // Implement batch printing functionality
  };

  const handleCloseBatchLabelModal = () => {
    // Implement close batch label modal functionality
  };
  
  const toggleOrderSelection = (orderId) => {
    // Implement toggle order selection functionality
  };

  const selectAllOrders = () => {
    // Implement select all orders functionality
  };
  
  const filteredOrders = orders.filter(order => {
    // First filter by status
    if (activeFilter !== 'all' && order.status !== activeFilter) {
      return false;
    }
    
    // Then filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.partner.toLowerCase().includes(searchLower) ||
        (order.rider && order.rider.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Order Management</h2>
      </div>
      
      <div className="search-filter-container">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search orders by ID, customer, or partner..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Orders
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'in-transit' ? 'active' : ''}`}
            onClick={() => setActiveFilter('in-transit')}
          >
            In Transit
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'delivered' ? 'active' : ''}`}
            onClick={() => setActiveFilter('delivered')}
          >
            Delivered
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'cancelled' ? 'active' : ''}`}
            onClick={() => setActiveFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>
      
      {showLabelModal && selectedOrder && (
        <SinglePrintDialog 
          isOpen={showLabelModal}
          selectedOrder={selectedOrder} 
          onClose={handleCloseLabelModal}
          onPrint={handlePrintSingle}
        />
      )}
    </div>
  );
};

// Analytics & Reports Tab Component
const AnalyticsTab = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Analytics & Reports</h2>
        <div className="time-range-selector">
          <button 
            className={`time-btn ${timeRange === 'week' ? 'active' : ''}`}
            onClick={() => setTimeRange('week')}
          >
            This Week
          </button>
          <button 
            className={`time-btn ${timeRange === 'month' ? 'active' : ''}`}
            onClick={() => setTimeRange('month')}
          >
            This Month
          </button>
          <button 
            className={`time-btn ${timeRange === 'quarter' ? 'active' : ''}`}
            onClick={() => setTimeRange('quarter')}
          >
            This Quarter
          </button>
          <button 
            className={`time-btn ${timeRange === 'year' ? 'active' : ''}`}
            onClick={() => setTimeRange('year')}
          >
            This Year
          </button>
        </div>
      </div>
      
      <div className="analytics-summary">
        <div className="summary-card">
          <h3>Total Orders</h3>
          <div className="summary-value">12,567</div>
          <div className="summary-change positive">+15% vs last month</div>
        </div>
        
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <div className="summary-value">৳125,750</div>
          <div className="summary-change positive">+12.5% vs last month</div>
        </div>
        
        <div className="summary-card">
          <h3>Average Order Value</h3>
          <div className="summary-value">৳1,850</div>
          <div className="summary-change positive">+5% vs last month</div>
        </div>
        
        <div className="summary-card">
          <h3>Delivery Success Rate</h3>
          <div className="summary-value">96%</div>
          <div className="summary-change positive">+2% vs last month</div>
        </div>
      </div>
      
      <div className="charts-container">
        <div className="chart-card">
          <h3>Orders by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-card">
          <h3>Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Percentage" fill="#4CAF50">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="charts-container">
        <div className="chart-card">
          <h3>Order Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-card">
          <h3>Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#4CAF50" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="reports-section">
        <div className="section-header">
          <h3>Available Reports</h3>
          <button className="action-btn">Generate Custom Report</button>
        </div>
        
        <div className="reports-grid">
          <div className="report-card">
            <div className="report-icon">📊</div>
            <div className="report-info">
              <h4>Sales Performance Report</h4>
              <p>Detailed breakdown of sales by category, region, and partner</p>
            </div>
            <button className="primary-btn">Download</button>
          </div>
          
          <div className="report-card">
            <div className="report-icon">🛵</div>
            <div className="report-info">
              <h4>Rider Performance Report</h4>
              <p>Analysis of rider efficiency, ratings, and delivery times</p>
            </div>
            <button className="primary-btn">Download</button>
          </div>
          
          <div className="report-card">
            <div className="report-icon">🏪</div>
            <div className="report-info">
              <h4>Partner Analytics Report</h4>
              <p>Sales and performance metrics for business partners</p>
            </div>
            <button className="primary-btn">Download</button>
          </div>
          
          <div className="report-card">
            <div className="report-icon">📱</div>
            <div className="report-info">
              <h4>User Engagement Report</h4>
              <p>App usage patterns, user retention, and feedback analysis</p>
            </div>
            <button className="primary-btn">Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings Tab Component
const SettingsTab = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'Grameen Delivery',
    contactEmail: 'admin@grameendelivery.com',
    defaultLanguage: 'bn',
    supportPhone: '+880 1712-345678',
    logoUrl: null
  });

  const [userManagementSettings, setUserManagementSettings] = useState({
    allowUserRegistration: true,
    requireEmailVerification: true,
    requirePhoneVerification: true,
    allowPartnerApplications: true,
    allowRiderApplications: true,
    autoApprovePartners: false,
    autoApproveRiders: false,
    maximumLoginAttempts: 5
  });

  const [paymentSettings, setPaymentSettings] = useState({
    acceptCashOnDelivery: true,
    acceptBkash: true,
    acceptNagad: true,
    acceptCreditCards: true,
    platformFeePercentage: 10,
    riderCommissionPercentage: 80,
    minimumOrderValue: 100,
    automaticPayouts: true,
    payoutSchedule: 'weekly',
    taxPercentage: 5
  });

  const [deliverySettings, setDeliverySettings] = useState({
    defaultDeliveryRadius: 25,
    baseDeliveryCharge: 60,
    perKilometerCharge: 5,
    maxDeliveryDistance: 30,
    freeDeliveryMinimum: 1500,
    maxDeliveryTime: 60,
    activeHours: '6:00 AM - 10:00 PM'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    orderConfirmationNotifications: true,
    paymentNotifications: true,
    deliveryStatusNotifications: true,
    systemNotifications: true,
    marketingNotifications: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeoutMinutes: 30,
    requireTwoFactorAuth: false,
    passwordExpiryDays: 90,
    passwordMinimumLength: 8,
    requireSpecialCharacters: true,
    requireNumbers: true,
    ipWhitelisting: false,
    loginAttemptLimit: 5
  });

  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserSettingsChange = (e) => {
    const { name, checked, type, value } = e.target;
    setUserManagementSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePaymentSettingsChange = (e) => {
    const { name, checked, type, value } = e.target;
    setPaymentSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleDeliverySettingsChange = (e) => {
    const { name, value, type } = e.target;
    setDeliverySettings(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleNotificationSettingsChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSecuritySettingsChange = (e) => {
    const { name, checked, type, value } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseInt(value) : value
    }));
  };

  const saveSettings = (section) => {
    // In a real application, you would send this data to your backend API
    console.log(`Saving ${section} settings...`);
    
    // Mock API call success
    setTimeout(() => {
      alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
    }, 500);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="settings-section">
            <h3>General Settings</h3>
            <p className="settings-description">Manage basic platform settings and information.</p>
            
            <div className="settings-form">
              <div className="form-group">
                <label>Platform Name</label>
                <input 
                  type="text" 
                  name="platformName" 
                  value={generalSettings.platformName} 
                  onChange={handleGeneralSettingsChange}
                />
                <p className="field-hint">The name of your delivery platform as seen by users</p>
              </div>
              
              <div className="form-group">
                <label>Platform Logo</label>
                <div className="logo-upload">
                  <div className="current-logo">
                    {generalSettings.logoUrl ? (
                      <img src={generalSettings.logoUrl} alt="Platform Logo" />
                    ) : (
                      <div className="no-logo">
                        <span role="img" aria-label="logo">🚚</span>
                      </div>
                    )}
                  </div>
                  <button className="secondary-btn">Upload New Logo</button>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Contact Email</label>
                  <input 
                    type="email" 
                    name="contactEmail" 
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralSettingsChange}
                  />
                  <p className="field-hint">Primary contact email for system notifications</p>
                </div>
                
                <div className="form-group">
                  <label>Support Phone Number</label>
                  <input 
                    type="text" 
                    name="supportPhone" 
                    value={generalSettings.supportPhone}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Default Language</label>
                <select 
                  name="defaultLanguage" 
                  value={generalSettings.defaultLanguage}
                  onChange={handleGeneralSettingsChange}
                >
                  <option value="en">English</option>
                  <option value="bn">Bengali</option>
                  <option value="hi">Hindi</option>
                  <option value="ur">Urdu</option>
                </select>
                <p className="field-hint">Set the default language for new users</p>
              </div>
            </div>
          </div>
        );
        
      case 'users':
        return (
          <div className="settings-section">
            <h3>User Management Settings</h3>
            <p className="settings-description">Configure user registration and verification requirements.</p>
            
            <div className="settings-form">
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>User Registration</h4>
                  <p>Allow new users to register on the platform</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="allowUserRegistration" 
                    name="allowUserRegistration"
                    checked={userManagementSettings.allowUserRegistration}
                    onChange={handleUserSettingsChange}
                  />
                  <label htmlFor="allowUserRegistration"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Email Verification</h4>
                  <p>Require email verification for new accounts</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="requireEmailVerification" 
                    name="requireEmailVerification"
                    checked={userManagementSettings.requireEmailVerification}
                    onChange={handleUserSettingsChange}
                  />
                  <label htmlFor="requireEmailVerification"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Phone Verification</h4>
                  <p>Require phone verification for new accounts</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="requirePhoneVerification" 
                    name="requirePhoneVerification"
                    checked={userManagementSettings.requirePhoneVerification}
                    onChange={handleUserSettingsChange}
                  />
                  <label htmlFor="requirePhoneVerification"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Partner Applications</h4>
                  <p>Allow new partner applications</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="allowPartnerApplications" 
                    name="allowPartnerApplications"
                    checked={userManagementSettings.allowPartnerApplications}
                    onChange={handleUserSettingsChange}
                  />
                  <label htmlFor="allowPartnerApplications"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Rider Applications</h4>
                  <p>Allow new rider applications</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="allowRiderApplications" 
                    name="allowRiderApplications"
                    checked={userManagementSettings.allowRiderApplications}
                    onChange={handleUserSettingsChange}
                  />
                  <label htmlFor="allowRiderApplications"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Auto-approve Partners</h4>
                  <p>Automatically approve new partner applications</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="autoApprovePartners" 
                    name="autoApprovePartners"
                    checked={userManagementSettings.autoApprovePartners}
                    onChange={handleUserSettingsChange}
                  />
                  <label htmlFor="autoApprovePartners"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Auto-approve Riders</h4>
                  <p>Automatically approve new rider applications</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="autoApproveRiders" 
                    name="autoApproveRiders"
                    checked={userManagementSettings.autoApproveRiders}
                    onChange={handleUserSettingsChange}
                  />
                  <label htmlFor="autoApproveRiders"></label>
                </div>
              </div>
              
              <div className="form-group">
                <label>Maximum Login Attempts</label>
                <input 
                  type="number" 
                  name="maximumLoginAttempts" 
                  value={userManagementSettings.maximumLoginAttempts}
                  onChange={handleUserSettingsChange}
                  min="1"
                  max="10"
                />
                <p className="field-hint">Number of failed attempts before account is locked</p>
              </div>
            </div>
          </div>
        );
        
      case 'payment':
        return (
          <div className="settings-section">
            <h3>Payment Settings</h3>
            <p className="settings-description">Configure payment methods and commission rates.</p>
            
            <div className="settings-form">
              <h4>Payment Methods</h4>
              <div className="checkbox-group-container">
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="acceptCashOnDelivery" 
                    name="acceptCashOnDelivery"
                    checked={paymentSettings.acceptCashOnDelivery}
                    onChange={handlePaymentSettingsChange}
                  />
                  <label htmlFor="acceptCashOnDelivery">Cash on Delivery</label>
                </div>
                
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="acceptBkash" 
                    name="acceptBkash"
                    checked={paymentSettings.acceptBkash}
                    onChange={handlePaymentSettingsChange}
                  />
                  <label htmlFor="acceptBkash">bKash</label>
                </div>
                
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="acceptNagad" 
                    name="acceptNagad"
                    checked={paymentSettings.acceptNagad}
                    onChange={handlePaymentSettingsChange}
                  />
                  <label htmlFor="acceptNagad">Nagad</label>
                </div>
                
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="acceptCreditCards" 
                    name="acceptCreditCards"
                    checked={paymentSettings.acceptCreditCards}
                    onChange={handlePaymentSettingsChange}
                  />
                  <label htmlFor="acceptCreditCards">Credit/Debit Cards</label>
                </div>
              </div>
              
              <div className="settings-section-divider"></div>
              
              <h4>Commission Settings</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Platform Fee</label>
                  <div className="input-with-suffix">
                    <input 
                      type="number" 
                      name="platformFeePercentage" 
                      value={paymentSettings.platformFeePercentage}
                      onChange={handlePaymentSettingsChange}
                      min="0"
                      max="100"
                    />
                    <span className="input-suffix">%</span>
                  </div>
                  <p className="field-hint">Commission percentage charged to partners</p>
                </div>
                
                <div className="form-group">
                  <label>Rider Commission</label>
                  <div className="input-with-suffix">
                    <input 
                      type="number" 
                      name="riderCommissionPercentage" 
                      value={paymentSettings.riderCommissionPercentage}
                      onChange={handlePaymentSettingsChange}
                      min="0"
                      max="100"
                    />
                    <span className="input-suffix">%</span>
                  </div>
                  <p className="field-hint">Commission percentage paid to riders</p>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Minimum Order Value</label>
                  <div className="input-with-suffix">
                    <input 
                      type="number" 
                      name="minimumOrderValue" 
                      value={paymentSettings.minimumOrderValue}
                      onChange={handlePaymentSettingsChange}
                      min="0"
                    />
                    <span className="input-suffix">৳</span>
                  </div>
                  <p className="field-hint">Minimum order amount allowed on the platform</p>
                </div>
                
                <div className="form-group">
                  <label>Tax Percentage</label>
                  <div className="input-with-suffix">
                    <input 
                      type="number" 
                      name="taxPercentage" 
                      value={paymentSettings.taxPercentage}
                      onChange={handlePaymentSettingsChange}
                      min="0"
                      max="100"
                    />
                    <span className="input-suffix">%</span>
                  </div>
                  <p className="field-hint">Tax applied to orders (if applicable)</p>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Automatic Payouts</h4>
                  <p>Enable automatic payouts to partners and riders</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="automaticPayouts" 
                    name="automaticPayouts"
                    checked={paymentSettings.automaticPayouts}
                    onChange={handlePaymentSettingsChange}
                  />
                  <label htmlFor="automaticPayouts"></label>
                </div>
              </div>
              
              <div className="form-group">
                <label>Payout Schedule</label>
                <select 
                  name="payoutSchedule" 
                  value={paymentSettings.payoutSchedule}
                  onChange={handlePaymentSettingsChange}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <p className="field-hint">How often automatic payouts are processed</p>
              </div>
            </div>
          </div>
        );
        
      case 'delivery':
        return (
          <div className="settings-section">
            <h3>Delivery Settings</h3>
            <p className="settings-description">Configure delivery radius, charges, and time limits.</p>
            
            <div className="settings-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Default Delivery Radius (km)</label>
                  <input 
                    type="number" 
                    name="defaultDeliveryRadius" 
                    value={deliverySettings.defaultDeliveryRadius}
                    onChange={handleDeliverySettingsChange}
                    min="1"
                  />
                  <p className="field-hint">Standard delivery radius for new partners</p>
                </div>
                
                <div className="form-group">
                  <label>Maximum Delivery Distance (km)</label>
                  <input 
                    type="number" 
                    name="maxDeliveryDistance" 
                    value={deliverySettings.maxDeliveryDistance}
                    onChange={handleDeliverySettingsChange}
                    min="1"
                  />
                  <p className="field-hint">Maximum allowed delivery distance on the platform</p>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Base Delivery Charge (৳)</label>
                  <input 
                    type="number" 
                    name="baseDeliveryCharge" 
                    value={deliverySettings.baseDeliveryCharge}
                    onChange={handleDeliverySettingsChange}
                    min="0"
                  />
                  <p className="field-hint">Starting delivery fee for all orders</p>
                </div>
                
                <div className="form-group">
                  <label>Per Kilometer Charge (৳)</label>
                  <input 
                    type="number" 
                    name="perKilometerCharge" 
                    value={deliverySettings.perKilometerCharge}
                    onChange={handleDeliverySettingsChange}
                    min="0"
                  />
                  <p className="field-hint">Additional charge per kilometer</p>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Free Delivery Minimum (৳)</label>
                  <input 
                    type="number" 
                    name="freeDeliveryMinimum" 
                    value={deliverySettings.freeDeliveryMinimum}
                    onChange={handleDeliverySettingsChange}
                    min="0"
                  />
                  <p className="field-hint">Minimum order amount for free delivery</p>
                </div>
                
                <div className="form-group">
                  <label>Maximum Delivery Time (minutes)</label>
                  <input 
                    type="number" 
                    name="maxDeliveryTime" 
                    value={deliverySettings.maxDeliveryTime}
                    onChange={handleDeliverySettingsChange}
                    min="1"
                  />
                  <p className="field-hint">Maximum time allowed for delivery completion</p>
                </div>
              </div>
              
              <div className="form-group">
                <label>Active Hours</label>
                <input 
                  type="text" 
                  name="activeHours" 
                  value={deliverySettings.activeHours}
                  onChange={handleDeliverySettingsChange}
                />
                <p className="field-hint">Default hours when deliveries are accepted</p>
              </div>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="settings-section">
            <h3>Notification Settings</h3>
            <p className="settings-description">Configure system notifications and alerts.</p>
            
            <div className="settings-form">
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Email Notifications</h4>
                  <p>Send system notifications via email</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="emailNotifications" 
                    name="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onChange={handleNotificationSettingsChange}
                  />
                  <label htmlFor="emailNotifications"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>SMS Notifications</h4>
                  <p>Send system notifications via SMS</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="smsNotifications" 
                    name="smsNotifications"
                    checked={notificationSettings.smsNotifications}
                    onChange={handleNotificationSettingsChange}
                  />
                  <label htmlFor="smsNotifications"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Push Notifications</h4>
                  <p>Send system notifications via mobile app</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="pushNotifications" 
                    name="pushNotifications"
                    checked={notificationSettings.pushNotifications}
                    onChange={handleNotificationSettingsChange}
                  />
                  <label htmlFor="pushNotifications"></label>
                </div>
              </div>
              
              <div className="settings-section-divider"></div>
              <h4>Notification Types</h4>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Order Confirmations</h4>
                  <p>Notifications for new orders and confirmations</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="orderConfirmationNotifications" 
                    name="orderConfirmationNotifications"
                    checked={notificationSettings.orderConfirmationNotifications}
                    onChange={handleNotificationSettingsChange}
                  />
                  <label htmlFor="orderConfirmationNotifications"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Payment Notifications</h4>
                  <p>Notifications for payments and transactions</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="paymentNotifications" 
                    name="paymentNotifications"
                    checked={notificationSettings.paymentNotifications}
                    onChange={handleNotificationSettingsChange}
                  />
                  <label htmlFor="paymentNotifications"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Delivery Status Updates</h4>
                  <p>Notifications for delivery status changes</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="deliveryStatusNotifications" 
                    name="deliveryStatusNotifications"
                    checked={notificationSettings.deliveryStatusNotifications}
                    onChange={handleNotificationSettingsChange}
                  />
                  <label htmlFor="deliveryStatusNotifications"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>System Notifications</h4>
                  <p>Important system updates and alerts</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="systemNotifications" 
                    name="systemNotifications"
                    checked={notificationSettings.systemNotifications}
                    onChange={handleNotificationSettingsChange}
                  />
                  <label htmlFor="systemNotifications"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Marketing Notifications</h4>
                  <p>Promotional messages and offers</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="marketingNotifications" 
                    name="marketingNotifications"
                    checked={notificationSettings.marketingNotifications}
                    onChange={handleNotificationSettingsChange}
                  />
                  <label htmlFor="marketingNotifications"></label>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="settings-section">
            <h3>Security Settings</h3>
            <p className="settings-description">Configure system security and access controls.</p>
            
            <div className="settings-form">
              <div className="form-group">
                <label>Session Timeout (minutes)</label>
                <select 
                  name="sessionTimeoutMinutes" 
                  value={securitySettings.sessionTimeoutMinutes}
                  onChange={handleSecuritySettingsChange}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="120">2 hours</option>
                  <option value="240">4 hours</option>
                </select>
                <p className="field-hint">How long until users are automatically logged out due to inactivity</p>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Require two-factor authentication for all admin accounts</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="requireTwoFactorAuth" 
                    name="requireTwoFactorAuth"
                    checked={securitySettings.requireTwoFactorAuth}
                    onChange={handleSecuritySettingsChange}
                  />
                  <label htmlFor="requireTwoFactorAuth"></label>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Password Expiry (days)</label>
                  <input 
                    type="number" 
                    name="passwordExpiryDays" 
                    value={securitySettings.passwordExpiryDays}
                    onChange={handleSecuritySettingsChange}
                    min="0"
                  />
                  <p className="field-hint">How often users need to change passwords (0 = never)</p>
                </div>
                
                <div className="form-group">
                  <label>Password Minimum Length</label>
                  <input 
                    type="number" 
                    name="passwordMinimumLength" 
                    value={securitySettings.passwordMinimumLength}
                    onChange={handleSecuritySettingsChange}
                    min="6"
                    max="32"
                  />
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Require Special Characters</h4>
                  <p>Passwords must contain special characters</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="requireSpecialCharacters" 
                    name="requireSpecialCharacters"
                    checked={securitySettings.requireSpecialCharacters}
                    onChange={handleSecuritySettingsChange}
                  />
                  <label htmlFor="requireSpecialCharacters"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Require Numbers</h4>
                  <p>Passwords must contain at least one number</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="requireNumbers" 
                    name="requireNumbers"
                    checked={securitySettings.requireNumbers}
                    onChange={handleSecuritySettingsChange}
                  />
                  <label htmlFor="requireNumbers"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>IP Whitelisting</h4>
                  <p>Restrict admin access to specific IP addresses</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="ipWhitelisting" 
                    name="ipWhitelisting"
                    checked={securitySettings.ipWhitelisting}
                    onChange={handleSecuritySettingsChange}
                  />
                  <label htmlFor="ipWhitelisting"></label>
                </div>
              </div>
              
              <div className="form-group">
                <label>Login Attempt Limit</label>
                <input 
                  type="number" 
                  name="loginAttemptLimit" 
                  value={securitySettings.loginAttemptLimit}
                  onChange={handleSecuritySettingsChange}
                  min="1"
                  max="10"
                />
                <p className="field-hint">Number of failed login attempts before account lockout</p>
              </div>
              
              <div className="settings-notice">
                <div className="notice-icon">⚠️</div>
                <div className="notice-text">
                  <p>These security settings affect all users on the platform. Changes may require users to update their passwords or re-verify their accounts.</p>
                </div>
              </div>
              
              <button className="danger-btn">Reset All Security Settings to Default</button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>System Settings</h2>
      </div>
      
      <div className="settings-container">
        <div className="settings-sidebar">
          <ul className="settings-menu">
            <li 
              className={activeSection === 'general' ? 'active' : ''}
              onClick={() => setActiveSection('general')}
            >
              <span className="settings-icon">⚙️</span>
              General Settings
            </li>
            <li 
              className={activeSection === 'users' ? 'active' : ''}
              onClick={() => setActiveSection('users')}
            >
              <span className="settings-icon">👥</span>
              User Management
            </li>
            <li 
              className={activeSection === 'payment' ? 'active' : ''}
              onClick={() => setActiveSection('payment')}
            >
              <span className="settings-icon">💰</span>
              Payment Settings
            </li>
            <li 
              className={activeSection === 'delivery' ? 'active' : ''}
              onClick={() => setActiveSection('delivery')}
            >
              <span className="settings-icon">🚚</span>
              Delivery Settings
            </li>
            <li 
              className={activeSection === 'notifications' ? 'active' : ''}
              onClick={() => setActiveSection('notifications')}
            >
              <span className="settings-icon">🔔</span>
              Notifications
            </li>
            <li 
              className={activeSection === 'security' ? 'active' : ''}
              onClick={() => setActiveSection('security')}
            >
              <span className="settings-icon">🔒</span>
              Security
            </li>
          </ul>
        </div>
        
        <div className="settings-content">
          {renderSection()}
          
          <div className="settings-actions">
            <button className="secondary-btn">Cancel</button>
            <button 
              className="primary-btn" 
              onClick={() => saveSettings(activeSection)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Print Labels Tab Component
const PrintLabelsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [showBatchLabelModal, setShowBatchLabelModal] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [orders, setOrders] = useState([
    {
      id: 'ORD-8745',
      customer: {
        name: 'Mahmud Rahman',
        phone: '+880 1712-345679'
      },
      deliveryAddress: 'House 12, Road 5, Block C, গুরুদাসপুর, নাটোর',
      rider: 'Abdul Karim',
      partner: 'Khan Electronics',
      partnerId: 'PTR-1245',
      date: '2023-07-10',
      items: [
        { name: 'Smartphone', quantity: 1, price: 7000 },
        { name: 'Case', quantity: 1, price: 500 }
      ],
      total: 7500,
      paymentStatus: 'paid',
      status: 'delivered'
    },
    {
      id: 'ORD-8744',
      customer: {
        name: 'Anika Islam',
        phone: '+880 1812-345678'
      },
      deliveryAddress: '42 Main Street, গুরুদাসপুর, নাটোর',
      rider: 'Pending Assignment',
      partner: 'Global Bazaar',
      partnerId: 'PTR-2134',
      date: '2023-07-10',
      items: [
        { name: 'Rice (5kg)', quantity: 1, price: 350 },
        { name: 'Oil (2L)', quantity: 1, price: 250 },
        { name: 'Fresh Vegetables', quantity: 1, price: 200 },
        { name: 'Spices', quantity: 2, price: 150 },
        { name: 'Chicken (1kg)', quantity: 1, price: 350 }
      ],
      total: 1250,
      paymentStatus: 'pending',
      status: 'pending'
    },
    {
      id: 'ORD-8743',
      customer: {
        name: 'Kamal Hossain',
        phone: '+880 1912-345677'
      },
      deliveryAddress: 'Apartment 3B, Building 7, গুরুদাসপুর, নাটোর',
      rider: 'Farida Begum',
      partner: 'Dhaka Handicrafts',
      partnerId: 'PTR-1876',
      date: '2023-07-09',
      items: [
        { name: 'Handcrafted Vase', quantity: 1, price: 1800 },
        { name: 'Decorative Plates', quantity: 2, price: 500 }
      ],
      total: 2800,
      paymentStatus: 'paid',
      status: 'in-transit'
    },
    {
      id: 'ORD-8741',
      customer: {
        name: 'Rafiq Ahmed',
        phone: '+880 1612-345676'
      },
      deliveryAddress: '15 Park Avenue, গুরুদাসপুর, নাটোর',
      rider: 'None (Cancelled)',
      partner: 'BanglaBooks',
      partnerId: 'PTR-1356',
      date: '2023-07-09',
      items: [
        { name: 'History Book', quantity: 1, price: 350 },
        { name: 'Novel', quantity: 1, price: 300 },
        { name: 'Children\'s Book', quantity: 1, price: 300 }
      ],
      total: 950,
      paymentStatus: 'refunded',
      status: 'cancelled'
    },
    {
      id: 'ORD-8740',
      customer: {
        name: 'Sultana Begum',
        phone: '+880 1512-345675'
      },
      deliveryAddress: 'Shop 4, Market Complex, গুরুদাসপুর, নাটোর',
      rider: 'Jamal Mia',
      partner: 'Fresh Foods',
      partnerId: 'PTR-1452',
      date: '2023-07-08',
      items: [
        { name: 'Fruits Basket', quantity: 1, price: 450 },
        { name: 'Fresh Fish', quantity: 2, price: 500 },
        { name: 'Snacks', quantity: 5, price: 80 }
      ],
      total: 1850,
      paymentStatus: 'paid',
      status: 'delivered'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const handlePrintLabel = (order) => {
    setSelectedOrder(order);
    setShowLabelModal(true);
  };
  
  const handleCloseLabelModal = () => {
    setShowLabelModal(false);
  };

  const handleBatchPrint = () => {
    setShowBatchLabelModal(true);
  };

  const handleCloseBatchLabelModal = () => {
    setShowBatchLabelModal(false);
  };
  
  const toggleOrderSelection = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const selectAllOrders = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };
  
  const filteredOrders = orders.filter(order => {
    // First filter by status
    if (activeFilter !== 'all' && order.status !== activeFilter) {
      return false;
    }
    
    // Then filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.partner.toLowerCase().includes(searchLower) ||
        (order.rider && order.rider.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });

  // Get orders that are selected for batch printing
  const selectedOrdersData = orders.filter(order => selectedOrders.includes(order.id));

  const handlePrintSingle = (printConfig) => {
    console.log('Printing single label with config:', printConfig);
    // Here you would integrate with your print service
    setShowLabelModal(false);
  };

  const handlePrintBatch = (printConfig) => {
    console.log('Printing batch labels with config:', printConfig);
    // Here you would integrate with your print service
    setShowBatchLabelModal(false);
  };

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Print Delivery Labels</h2>
      </div>
      
      <div className="label-printing-options">
        <div className="printing-mode-selector">
          <h3>Printing Modes</h3>
          <div className="mode-cards">
            <div className="mode-card" onClick={handleBatchPrint}>
              <div className="mode-icon">🖨️</div>
              <div className="mode-title">Batch Printing</div>
              <p>Print multiple labels at once</p>
              <button className="primary-btn">Batch Print</button>
            </div>
            <div className="mode-card">
              <div className="mode-icon">🏷️</div>
              <div className="mode-title">Individual Printing</div>
              <p>Print labels one by one</p>
              <p className="instruction-text">Select an order from the list below</p>
            </div>
          </div>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search orders by ID, customer, or partner..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Orders
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'in-transit' ? 'active' : ''}`}
            onClick={() => setActiveFilter('in-transit')}
          >
            In Transit
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'delivered' ? 'active' : ''}`}
            onClick={() => setActiveFilter('delivered')}
          >
            Delivered
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'cancelled' ? 'active' : ''}`}
            onClick={() => setActiveFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>
      
      {selectedOrders.length > 0 && (
        <div className="batch-print-actions">
          <div className="selected-count">
            {selectedOrders.length} order{selectedOrders.length !== 1 ? 's' : ''} selected
          </div>
          <div className="batch-action-btns">
            <button className="secondary-btn" onClick={selectAllOrders}>
              {selectedOrders.length === filteredOrders.length ? 'Deselect All' : 'Select All'}
            </button>
            <button className="print-btn" onClick={handleBatchPrint}>
              <span role="img" aria-label="print">🖨️</span> Print Selected Labels
            </button>
          </div>
        </div>
      )}
      
      <div className="orders-list labels-grid">
        {filteredOrders.map(order => (
          <div key={order.id} className={`order-card status-${order.status}`}>
            <div className="order-selection">
              <input 
                type="checkbox" 
                checked={selectedOrders.includes(order.id)}
                onChange={() => toggleOrderSelection(order.id)}
              />
            </div>
            
            <div className="order-header">
              <div className="order-id-date">
                <div className="order-id">{order.id}</div>
                <div className="order-date">{order.date}</div>
              </div>
              <div className={`order-status status-${order.status}`}>
                <div className="status-indicator"></div>
                <div className="status-text">
                  {order.status === 'pending' && 'Pending'}
                  {order.status === 'in-transit' && 'In Transit'}
                  {order.status === 'delivered' && 'Delivered'}
                  {order.status === 'cancelled' && 'Cancelled'}
                </div>
              </div>
            </div>
            
            <div className="order-details">
              <div className="detail-group">
                <label>Customer</label>
                <p>{order.customer.name}</p>
              </div>
              
              <div className="detail-group">
                <label>Rider</label>
                <p>{order.rider}</p>
              </div>
              
              <div className="detail-group">
                <label>Partner</label>
                <p>{order.partner}</p>
              </div>
              
              <div className="detail-group">
                <label>Items</label>
                <p>{order.items.length} items</p>
              </div>
            </div>
            
            <div className="order-actions">
              <button className="primary-btn" onClick={() => handlePrintLabel(order)}>
                <span role="img" aria-label="print">🖨️</span> Print Label
              </button>
            </div>
          </div>
        ))}
        
        {filteredOrders.length === 0 && (
          <div className="no-data-message">
            No orders found matching your criteria.
          </div>
        )}
      </div>
      
      <div className="pagination">
        <button className="pagination-btn">Previous</button>
        <div className="pagination-pages">
          <button className="pagination-page active">1</button>
          <button className="pagination-page">2</button>
          <button className="pagination-page">3</button>
        </div>
        <button className="pagination-btn">Next</button>
      </div>

      {showLabelModal && selectedOrder && (
        <SinglePrintDialog 
          isOpen={showLabelModal}
          selectedOrder={selectedOrder} 
          onClose={handleCloseLabelModal}
          onPrint={handlePrintSingle}
        />
      )}

      {showBatchLabelModal && (
        <BatchPrintDialog 
          isOpen={showBatchLabelModal}
          orders={orders}
          onClose={handleCloseBatchLabelModal}
          onPrint={handlePrintBatch}
        />
      )}
    </div>
  );
};

// Sample return requests data
const returnRequests = [
  {
    id: 'RET-1001',
    orderId: 'ORD-8721',
    returnDate: '2023-06-20',
    customer: {
      name: 'Mohammad Hasan',
      phone: '01912-456789',
    },
    partner: {
      name: 'Mia Grocery Store',
      id: 'PART-1001'
    },
    items: [
      { name: 'Chicken (whole)', quantity: 2, price: 350 }
    ],
    status: 'pending',
    reason: 'Item was damaged during delivery'
  },
  {
    id: 'RET-1002',
    orderId: 'ORD-8719',
    returnDate: '2023-06-15',
    customer: {
      name: 'Nasreen Ahmed',
      phone: '01712-987654',
    },
    partner: {
      name: 'Fresh Foods Market',
      id: 'PART-1002'
    },
    items: [
      { name: 'Premium Rice (5kg)', quantity: 1, price: 450 }
    ],
    status: 'approved',
    reason: 'Received wrong item',
    rider: {
      name: 'Imran Sheikh',
      id: 'RID-103'
    }
  },
  {
    id: 'RET-1003',
    orderId: 'ORD-8715',
    returnDate: '2023-06-12',
    customer: {
      name: 'Fahmida Khan',
      phone: '01554-123456',
    },
    partner: {
      name: 'Fresh Foods Market',
      id: 'PART-1002'
    },
    items: [
      { name: 'Fresh Vegetables Bundle', quantity: 1, price: 350 }
    ],
    status: 'completed',
    reason: 'Items not fresh',
    rider: {
      name: 'Abdul Karim',
      id: 'RID-101'
    },
    completionDate: '2023-06-15',
    refund: {
      amount: 350,
      method: 'Store Credit'
    }
  },
  {
    id: 'RET-1004',
    orderId: 'ORD-8710',
    returnDate: '2023-06-11',
    customer: {
      name: 'Kabir Ahmed',
      phone: '01912-987654',
    },
    partner: {
      name: 'Premium Meats',
      id: 'PART-1003'
    },
    items: [
      { name: 'Premium Beef (1kg)', quantity: 1, price: 850 }
    ],
    status: 'rejected',
    reason: 'Quality issues',
    rejectionReason: 'Return window expired (more than 3 days after delivery)'
  },
  {
    id: 'RET-1005',
    orderId: 'ORD-8705',
    returnDate: '2023-06-11',
    customer: {
      name: 'Imtiaz Rahman',
      phone: '01512-678901',
    },
    partner: {
      name: 'Electronics Hub',
      id: 'PART-1004'
    },
    items: [
      { name: 'Bluetooth Headphones', quantity: 1, price: 1200 }
    ],
    status: 'in-progress',
    reason: 'Defective product',
    rider: {
      name: 'Saiful Islam',
      id: 'RID-105'
    }
  }
];

// Return Management Tab
const ReturnManagementTab = () => {
  const [returns, setReturns] = useState(returnRequests);
  const [filteredReturns, setFilteredReturns] = useState(returnRequests);
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date()
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [showRiderAssignModal, setShowRiderAssignModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  
  // Sample riders data for assignment
  const availableRiders = [
    { id: 'RID-101', name: 'Abdul Karim', rating: 4.8, completedDeliveries: 156 },
    { id: 'RID-102', name: 'Mahfuz Rahman', rating: 4.7, completedDeliveries: 132 },
    { id: 'RID-103', name: 'Imran Sheikh', rating: 4.9, completedDeliveries: 201 },
    { id: 'RID-104', name: 'Kamal Hossain', rating: 4.5, completedDeliveries: 98 },
    { id: 'RID-105', name: 'Saiful Islam', rating: 4.6, completedDeliveries: 112 }
  ];
  
  const [selectedRider, setSelectedRider] = useState(null);
  const [refundMethod, setRefundMethod] = useState('');
  const [refundAmount, setRefundAmount] = useState(0);
  
  useEffect(() => {
    filterReturns();
  }, [activeStatusFilter, selectedDateRange, searchQuery]);
  
  const filterReturns = () => {
    let filtered = [...returns];
    
    // Status filter
    if (activeStatusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === activeStatusFilter);
    }
    
    // Date range filter
    filtered = filtered.filter(item => {
      const returnDate = new Date(item.returnDate);
      return returnDate >= selectedDateRange.startDate && 
             returnDate <= selectedDateRange.endDate;
    });
    
    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.id.toLowerCase().includes(query) ||
        item.orderId.toLowerCase().includes(query) ||
        item.customer.name.toLowerCase().includes(query) ||
        item.partner.name.toLowerCase().includes(query)
      );
    }
    
    setFilteredReturns(filtered);
  };
  
  const handleViewDetails = (item) => {
    setSelectedReturn(item);
    setShowDetailsModal(true);
  };
  
  const handleAssignRider = (item) => {
    setSelectedReturn(item);
    setSelectedRider(null);
    setShowRiderAssignModal(true);
  };
  
  const handleProcessRefund = (item) => {
    setSelectedReturn(item);
    setRefundAmount(item.items.reduce((total, item) => total + (item.price * item.quantity), 0));
    setRefundMethod('');
    setShowRefundModal(true);
  };
  
  const confirmRiderAssignment = () => {
    if (!selectedRider) return;
    
    const updatedReturns = returns.map(item => {
      if (item.id === selectedReturn.id) {
        return {
          ...item,
          status: 'in-progress',
          rider: {
            id: selectedRider.id,
            name: selectedRider.name
          }
        };
      }
      return item;
    });
    
    setReturns(updatedReturns);
    setShowRiderAssignModal(false);
    setSelectedReturn(null);
    filterReturns();
  };
  
  const confirmRefund = () => {
    if (!refundMethod) return;
    
    const updatedReturns = returns.map(item => {
      if (item.id === selectedReturn.id) {
        return {
          ...item,
          status: 'completed',
          completionDate: new Date().toISOString().split('T')[0],
          refund: {
            amount: refundAmount,
            method: refundMethod
          }
        };
      }
      return item;
    });
    
    setReturns(updatedReturns);
    setShowRefundModal(false);
    setSelectedReturn(null);
    filterReturns();
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'status-badge pending';
      case 'approved': return 'status-badge approved';
      case 'in-progress': return 'status-badge in-progress';
      case 'completed': return 'status-badge completed';
      case 'rejected': return 'status-badge rejected';
      default: return 'status-badge';
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleDateRangeChange = (dates) => {
    setSelectedDateRange({
      startDate: dates[0],
      endDate: dates[1] || dates[0]
    });
  };
  
  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Return Management</h2>
        <p>Monitor and manage product return requests</p>
      </div>
      
      <div className="admin-filter-section">
        <div className="search-filter">
          <input 
            type="text"
            placeholder="Search by ID, Order, Customer or Partner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="date-filter">
          <DatePicker
            selectsRange={true}
            startDate={selectedDateRange.startDate}
            endDate={selectedDateRange.endDate}
            onChange={handleDateRangeChange}
            className="date-picker"
            placeholderText="Filter by date range"
            dateFormat="MMM d, yyyy"
          />
        </div>
        
        <div className="status-filter">
          <button 
            className={`filter-btn ${activeStatusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveStatusFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeStatusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveStatusFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${activeStatusFilter === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveStatusFilter('approved')}
          >
            Approved
          </button>
          <button 
            className={`filter-btn ${activeStatusFilter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setActiveStatusFilter('in-progress')}
          >
            In Progress
          </button>
          <button 
            className={`filter-btn ${activeStatusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveStatusFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={`filter-btn ${activeStatusFilter === 'rejected' ? 'active' : ''}`}
            onClick={() => setActiveStatusFilter('rejected')}
          >
            Rejected
          </button>
        </div>
      </div>
      
      <div className="returns-table">
        <div className="table-header">
          <div className="col">Return ID</div>
          <div className="col">Order ID</div>
          <div className="col">Date</div>
          <div className="col">Customer</div>
          <div className="col">Partner</div>
          <div className="col">Status</div>
          <div className="col">Actions</div>
        </div>
        
        {filteredReturns.length > 0 ? (
          filteredReturns.map(item => (
            <div className="table-row" key={item.id}>
              <div className="col">{item.id}</div>
              <div className="col">{item.orderId}</div>
              <div className="col">{formatDate(item.returnDate)}</div>
              <div className="col">{item.customer.name}</div>
              <div className="col">{item.partner.name}</div>
              <div className="col">
                <span className={getStatusBadgeClass(item.status)}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
              <div className="col actions">
                <button 
                  className="action-btn view-btn"
                  onClick={() => handleViewDetails(item)}
                >
                  View
                </button>
                
                {item.status === 'approved' && (
                  <button 
                    className="action-btn assign-btn"
                    onClick={() => handleAssignRider(item)}
                  >
                    Assign Rider
                  </button>
                )}
                
                {item.status === 'in-progress' && !item.refund && (
                  <button 
                    className="action-btn refund-btn"
                    onClick={() => handleProcessRefund(item)}
                  >
                    Process Refund
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-data-message">
            No return requests match your criteria
          </div>
        )}
      </div>
      
      {/* Return Details Modal */}
      {showDetailsModal && selectedReturn && (
        <div className="modal-overlay">
          <div className="modal-container return-details-modal">
            <div className="modal-header">
              <h2>Return Request Details</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedReturn(null);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="return-detail-header">
                <div>
                  <h3>Return ID: {selectedReturn.id}</h3>
                  <p>Order ID: {selectedReturn.orderId}</p>
                </div>
                <div className="return-status-badge">
                  <span className={getStatusBadgeClass(selectedReturn.status)}>
                    {selectedReturn.status.charAt(0).toUpperCase() + selectedReturn.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="return-detail-section">
                <h4>Return Information</h4>
                <div className="detail-row">
                  <div className="detail-label">Return Date:</div>
                  <div className="detail-value">{formatDate(selectedReturn.returnDate)}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Reason:</div>
                  <div className="detail-value">{selectedReturn.reason}</div>
                </div>
                {selectedReturn.status === 'rejected' && (
                  <div className="detail-row">
                    <div className="detail-label">Rejection Reason:</div>
                    <div className="detail-value">{selectedReturn.rejectionReason}</div>
                  </div>
                )}
                {selectedReturn.refund && (
                  <div className="detail-row">
                    <div className="detail-label">Refund:</div>
                    <div className="detail-value">
                      ৳{selectedReturn.refund.amount} via {selectedReturn.refund.method}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="return-detail-section">
                <h4>Customer Information</h4>
                <div className="detail-row">
                  <div className="detail-label">Name:</div>
                  <div className="detail-value">{selectedReturn.customer.name}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Phone:</div>
                  <div className="detail-value">{selectedReturn.customer.phone}</div>
                </div>
              </div>
              
              <div className="return-detail-section">
                <h4>Partner Information</h4>
                <div className="detail-row">
                  <div className="detail-label">Name:</div>
                  <div className="detail-value">{selectedReturn.partner.name}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">ID:</div>
                  <div className="detail-value">{selectedReturn.partner.id}</div>
                </div>
              </div>
              
              {selectedReturn.rider && (
                <div className="return-detail-section">
                  <h4>Rider Information</h4>
                  <div className="detail-row">
                    <div className="detail-label">Name:</div>
                    <div className="detail-value">{selectedReturn.rider.name}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">ID:</div>
                    <div className="detail-value">{selectedReturn.rider.id}</div>
                  </div>
                </div>
              )}
              
              <div className="return-detail-section">
                <h4>Return Items</h4>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReturn.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>৳{item.price}</td>
                        <td>৳{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="total-label">Total Amount</td>
                      <td className="total-value">
                        ৳{selectedReturn.items.reduce((total, item) => total + (item.price * item.quantity), 0)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="close-btn"
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedReturn(null);
                  }}
                >
                  Close
                </button>
                
                {selectedReturn.status === 'approved' && (
                  <button 
                    className="assign-btn"
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleAssignRider(selectedReturn);
                    }}
                  >
                    Assign Rider
                  </button>
                )}
                
                {selectedReturn.status === 'in-progress' && !selectedReturn.refund && (
                  <button 
                    className="refund-btn"
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleProcessRefund(selectedReturn);
                    }}
                  >
                    Process Refund
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Rider Assignment Modal */}
      {showRiderAssignModal && selectedReturn && (
        <div className="modal-overlay">
          <div className="modal-container rider-assign-modal">
            <div className="modal-header">
              <h2>Assign Rider for Return Pickup</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowRiderAssignModal(false);
                  setSelectedReturn(null);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="return-info-summary">
                <p><strong>Return ID:</strong> {selectedReturn.id}</p>
                <p><strong>Customer:</strong> {selectedReturn.customer.name}</p>
                <p><strong>Partner:</strong> {selectedReturn.partner.name}</p>
              </div>
              
              <h3>Available Riders</h3>
              <div className="riders-list">
                {availableRiders.map(rider => (
                  <div 
                    key={rider.id}
                    className={`rider-card ${selectedRider?.id === rider.id ? 'selected' : ''}`}
                    onClick={() => setSelectedRider(rider)}
                  >
                    <div className="rider-info">
                      <div className="rider-name">{rider.name}</div>
                      <div className="rider-details">
                        <span className="rider-id">{rider.id}</span>
                        <span className="rider-rating">⭐ {rider.rating}</span>
                      </div>
                      <div className="rider-deliveries">
                        {rider.completedDeliveries} deliveries completed
                      </div>
                    </div>
                    {selectedRider?.id === rider.id && (
                      <div className="selected-checkmark">✓</div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => {
                    setShowRiderAssignModal(false);
                    setSelectedReturn(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="assign-confirm-btn"
                  disabled={!selectedRider}
                  onClick={confirmRiderAssignment}
                >
                  Assign Rider
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Refund Processing Modal */}
      {showRefundModal && selectedReturn && (
        <div className="modal-overlay">
          <div className="modal-container refund-modal">
            <div className="modal-header">
              <h2>Process Refund</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowRefundModal(false);
                  setSelectedReturn(null);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="return-info-summary">
                <p><strong>Return ID:</strong> {selectedReturn.id}</p>
                <p><strong>Customer:</strong> {selectedReturn.customer.name}</p>
                <p><strong>Total Amount:</strong> ৳{refundAmount}</p>
              </div>
              
              <div className="form-group">
                <label>Refund Method</label>
                <select 
                  value={refundMethod}
                  onChange={(e) => setRefundMethod(e.target.value)}
                  required
                >
                  <option value="">Select Refund Method</option>
                  <option value="Original Payment Method">Original Payment Method</option>
                  <option value="Store Credit">Store Credit</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Mobile Banking">Mobile Banking</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Refund Amount</label>
                <input 
                  type="number"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(Number(e.target.value))}
                  min="0"
                  required
                />
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => {
                    setShowRefundModal(false);
                    setSelectedReturn(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="refund-confirm-btn"
                  disabled={!refundMethod || refundAmount <= 0}
                  onClick={confirmRefund}
                >
                  Process Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Dashboard Component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'rider',
      title: 'New Rider Application',
      message: 'Kamal Hossain has applied to be a delivery rider',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'partner',
      title: 'New Business Partner',
      message: 'Khan Electronics has registered as a business partner',
      time: '45 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'order',
      title: 'Order Issue Reported',
      message: 'Customer reported missing items in order #ORD-8745',
      time: '2 hours ago',
      read: false
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { texts } = useLanguage();

  useEffect(() => {
    // Extract the last part of the path as the active tab
    const path = location.pathname.split('/').pop();
    if (path && path !== 'admin') {
      setActiveTab(path);
    } else {
      setActiveTab('overview');
      navigate('/admin/overview');
    }
  }, [location, navigate]);

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="admin-dashboard">
      <Navbar />
      
      <div className="dashboard-header">
        <div className="dashboard-header-container">
          <div className="dashboard-welcome">
            <h1>Welcome back, Admin</h1>
            <p>Here's what's happening with your delivery platform today</p>
          </div>
          <div className="header-actions">
            <NotificationDropdown 
              notifications={notifications} 
              onMarkAsRead={handleMarkAsRead}
              onClearAll={handleClearAll}
            />
            <div className="profile-container">
              <div className="profile-image">AD</div>
              <div className="profile-name">Admin</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
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
            to="/admin/returns" 
            className={`tab-btn ${activeTab === 'returns' ? 'active' : ''}`}
          >
            Returns
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
          <Link 
            to="/admin/activities" 
            className={`tab-btn ${activeTab === 'activities' ? 'active' : ''}`}
          >
            Activities
          </Link>
        </div>
        
        <Routes>
          <Route path="overview" element={<OverviewTab />} />
          <Route path="users" element={<UsersTab />} />
          <Route path="orders" element={<OrdersTab />} />
          <Route path="returns" element={<ReturnManagementTab />} />
          <Route path="analytics" element={<AnalyticsTab />} />
          <Route path="settings" element={<SettingsTab />} />
          <Route path="print-labels" element={<PrintLabelsTab />} />
          <Route path="activities" element={<AllActivities />} />
          <Route path="activities/new-rider" element={<NewRiderApplication />} />
          <Route path="activities/new-partner" element={<NewBusinessPartner />} />
          <Route path="activities/order-issue" element={<OrderIssue />} />
          <Route path="activities/system-update" element={<SystemUpdate />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard; 