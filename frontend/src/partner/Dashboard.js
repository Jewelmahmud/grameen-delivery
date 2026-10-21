import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DeliveryLabel from '../components/DeliveryLabel';
import BatchLabelPrint from '../components/BatchLabelPrint';
import NotificationDropdown from '../components/NotificationDropdown';
import '../styles/PartnerDashboard.css';
import { useLanguage } from '../context/LanguageContext';

// Sample data for charts
const salesData = [
  { name: 'Mon', sales: 2100 },
  { name: 'Tue', sales: 3200 },
  { name: 'Wed', sales: 2800 },
  { name: 'Thu', sales: 4200 },
  { name: 'Fri', sales: 3800 },
  { name: 'Sat', sales: 1900 },
  { name: 'Sun', sales: 2600 }
];

// Sample orders data
const orders = [
  {
    id: 'ORD-8723',
    date: '2023-06-15',
    customer: {
      name: 'Ahmed Rahman',
      phone: '01712-345678',
    },
    deliveryAddress: 'House 12, Road 5, Block C, Mirpur 10, Dhaka',
    items: [
      { name: 'Fresh Vegetables Bundle', quantity: 2, price: 450 },
      { name: 'Organic Eggs (12pcs)', quantity: 1, price: 120 }
    ],
    total: 1020,
    status: 'pending',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-8722',
    date: '2023-06-15',
    customer: {
      name: 'Fatima Islam',
      phone: '01812-987654',
    },
    deliveryAddress: '42 Green Road, Apt 3B, Dhanmondi, Dhaka',
    items: [
      { name: 'Hilsa Fish (1kg)', quantity: 1, price: 850 },
      { name: 'Rice (5kg)', quantity: 1, price: 325 }
    ],
    total: 1175,
    status: 'in-transit',
    paymentStatus: 'paid',
    delivery: {
      person: 'Kamal Hossain',
      contact: '01555-123456'
    }
  },
  {
    id: 'ORD-8721',
    date: '2023-06-14',
    customer: {
      name: 'Mohammad Hasan',
      phone: '01912-456789',
    },
    deliveryAddress: 'Flat 5A, Tower 3, Bashundhara R/A, Dhaka',
    items: [
      { name: 'Chicken (whole)', quantity: 2, price: 350 },
      { name: 'Cooking Oil (2L)', quantity: 1, price: 285 }
    ],
    total: 985,
    status: 'delivered',
    paymentStatus: 'paid',
    delivery: {
      person: 'Rahim Mia',
      contact: '01777-987654'
    }
  }
];

// Sample return requests data
const returnRequests = [
  {
    id: 'RET-1001',
    orderId: 'ORD-8721',
    orderDate: '2023-06-14',
    requestDate: '2023-06-20',
    customer: {
      name: 'Mohammad Hasan',
      phone: '01912-456789',
    },
    items: [
      { name: 'Chicken (whole)', quantity: 2, price: 350 }
    ],
    reason: 'Item was damaged during delivery',
    images: ['/images/returns/damaged-package.jpg'],
    status: 'pending',
    address: 'Flat 5A, Tower 3, Bashundhara R/A, Dhaka'
  },
  {
    id: 'RET-1002',
    orderId: 'ORD-8719',
    orderDate: '2023-06-13',
    requestDate: '2023-06-15',
    customer: {
      name: 'Nasreen Ahmed',
      phone: '01712-987654',
    },
    items: [
      { name: 'Premium Rice (5kg)', quantity: 1, price: 450 }
    ],
    reason: 'Received wrong item',
    images: ['/images/returns/wrong-item.jpg'],
    status: 'approved',
    pickupDate: '2023-06-18',
    rider: {
      name: 'Imran Sheikh',
      phone: '01812-345678'
    },
    address: 'House 12, Road 5, Gulshan-1, Dhaka'
  },
  {
    id: 'RET-1003',
    orderId: 'ORD-8715',
    orderDate: '2023-06-10',
    requestDate: '2023-06-12',
    customer: {
      name: 'Fahmida Khan',
      phone: '01554-123456',
    },
    items: [
      { name: 'Fresh Vegetables Bundle', quantity: 1, price: 350 }
    ],
    reason: 'Items not fresh',
    images: ['/images/returns/not-fresh.jpg', '/images/returns/damaged-veggies.jpg'],
    status: 'completed',
    pickupDate: '2023-06-14',
    completionDate: '2023-06-15',
    refundAmount: 350,
    refundMethod: 'Store Credit',
    address: 'Apartment 7B, Green Heights, Dhanmondi, Dhaka'
  },
  {
    id: 'RET-1004',
    orderId: 'ORD-8710',
    orderDate: '2023-06-08',
    requestDate: '2023-06-11',
    customer: {
      name: 'Kabir Ahmed',
      phone: '01912-987654',
    },
    items: [
      { name: 'Premium Beef (1kg)', quantity: 1, price: 850 }
    ],
    reason: 'Quality issues',
    images: [],
    status: 'rejected',
    rejectionReason: 'Return window expired (more than 3 days after delivery)',
    address: '123 New Market Area, Dhaka'
  }
];

// Overview Tab Component
const OverviewTab = () => {
  const [activePeriod, setActivePeriod] = useState('today');
  const [statistics, setStatistics] = useState({
    totalOrders: 148,
    todayOrders: 24,
    pendingOrders: 12,
    revenue: '৳38,450',
    growthRate: '+8%'
  });

  // Function to update statistics based on selected period
  const updateStatistics = (period) => {
    switch (period) {
      case 'today':
        setStatistics({
          totalOrders: 148,
          todayOrders: 24,
          pendingOrders: 12,
          revenue: '৳38,450',
          growthRate: '+8%'
        });
        break;
      case 'week':
        setStatistics({
          totalOrders: 956,
          todayOrders: 142,
          pendingOrders: 38,
          revenue: '৳214,750',
          growthRate: '+15%'
        });
        break;
      case 'month':
        setStatistics({
          totalOrders: 3240,
          todayOrders: 685,
          pendingOrders: 124,
          revenue: '৳892,300',
          growthRate: '+24%'
        });
        break;
      default:
        break;
    }
  };

  // Handle period button click
  const handlePeriodChange = (period) => {
    setActivePeriod(period);
    updateStatistics(period);
  };

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Business Overview</h2>
        <div className="period-selector">
          <button 
            className={`period-btn ${activePeriod === 'today' ? 'active' : ''}`}
            onClick={() => handlePeriodChange('today')}
          >
            Today
          </button>
          <button 
            className={`period-btn ${activePeriod === 'week' ? 'active' : ''}`}
            onClick={() => handlePeriodChange('week')}
          >
            This Week
          </button>
          <button 
            className={`period-btn ${activePeriod === 'month' ? 'active' : ''}`}
            onClick={() => handlePeriodChange('month')}
          >
            This Month
          </button>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon orders-icon">📦</div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <div className="stat-value">{statistics.totalOrders}</div>
            <div className="stat-change positive">+12% from last {activePeriod === 'today' ? 'day' : activePeriod === 'week' ? 'week' : 'month'}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon today-icon">📅</div>
          <div className="stat-info">
            <h3>{activePeriod === 'today' ? "Today's" : activePeriod === 'week' ? "This Week's" : "This Month's"} Orders</h3>
            <div className="stat-value">{statistics.todayOrders}</div>
            <div className="stat-change positive">+3 from {activePeriod === 'today' ? 'yesterday' : activePeriod === 'week' ? 'last week' : 'last month'}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon pending-icon">⏳</div>
          <div className="stat-info">
            <h3>Pending Orders</h3>
            <div className="stat-value">{statistics.pendingOrders}</div>
            <div className="stat-change neutral">Same as {activePeriod === 'today' ? 'yesterday' : activePeriod === 'week' ? 'last week' : 'last month'}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon revenue-icon">💰</div>
          <div className="stat-info">
            <h3>{activePeriod === 'today' ? "Daily" : activePeriod === 'week' ? "Weekly" : "Monthly"} Revenue</h3>
            <div className="stat-value">{statistics.revenue}</div>
            <div className="stat-change positive">{statistics.growthRate} vs {activePeriod === 'today' ? 'yesterday' : activePeriod === 'week' ? 'last week' : 'last month'}</div>
          </div>
        </div>
      </div>
      
      <div className="charts-container">
        <div className="chart-card">
          <h3>{activePeriod === 'today' ? "Today's" : activePeriod === 'week' ? "Weekly" : "Monthly"} Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={salesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#4CAF50" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="recent-orders">
        <div className="section-header">
          <h3>Recent Orders</h3>
          <button className="view-all-btn">View All</button>
        </div>
        
        <table className="data-table orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer.name}</td>
                <td>{order.date}</td>
                <td>
                  {order.items.map((item, index) => (
                    <p key={index}>{item.name} x{item.quantity} (৳{item.price})</p>
                  ))}
                </td>
                <td>৳{order.total}</td>
                <td>
                  <span className={`status-badge status-${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Orders Management Tab Component
const OrdersTab = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [showBatchLabelModal, setShowBatchLabelModal] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

  // Get orders that are selected for batch printing
  const selectedOrdersData = orders.filter(order => selectedOrders.includes(order.id));

  // Add Order Modal Component
  const AddOrderModal = () => {
    const [formData, setFormData] = useState({
      customerName: '',
      customerPhone: '',
      deliveryAddress: '',
      items: [{ name: '', quantity: 1, price: 0 }]
    });
    
    const handleAddItem = () => {
      setFormData({
        ...formData,
        items: [...formData.items, { name: '', quantity: 1, price: 0 }]
      });
    };
    
    const handleRemoveItem = (index) => {
      const updatedItems = [...formData.items];
      updatedItems.splice(index, 1);
      setFormData({
        ...formData,
        items: updatedItems
      });
    };
    
    const handleItemChange = (index, field, value) => {
      const updatedItems = [...formData.items];
      updatedItems[index][field] = field === 'price' || field === 'quantity' ? Number(value) : value;
      setFormData({
        ...formData,
        items: updatedItems
      });
    };
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    
    const calculateTotal = () => {
      return formData.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you would normally submit to an API
      console.log('Order Form Data:', formData);
      // Close the modal after submission
      setShowAddOrderModal(false);
    };
    
    return (
      <div className="modal-overlay">
        <div className="modal-content add-order-modal">
          <div className="modal-header">
            <h2>Add New Order</h2>
            <button className="close-btn" onClick={() => setShowAddOrderModal(false)}>×</button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Customer Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input 
                    type="text" 
                    name="customerName" 
                    value={formData.customerName} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    name="customerPhone" 
                    value={formData.customerPhone} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Delivery Address</label>
                <textarea 
                  name="deliveryAddress" 
                  value={formData.deliveryAddress} 
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-section">
              <h3>Order Items</h3>
              {formData.items.map((item, index) => (
                <div key={index} className="item-row">
                  <div className="form-group">
                    <label>Item Name</label>
                    <input 
                      type="text" 
                      value={item.name} 
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group small">
                    <label>Quantity</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group small">
                    <label>Price (৳)</label>
                    <input 
                      type="number" 
                      min="0" 
                      value={item.price} 
                      onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                      required
                    />
                  </div>
                  {formData.items.length > 1 && (
                    <button 
                      type="button" 
                      className="remove-item-btn" 
                      onClick={() => handleRemoveItem(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="add-item-btn" onClick={handleAddItem}>
                + Add Item
              </button>
            </div>
            
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Total Amount:</span>
                <span className="total-amount">৳{calculateTotal()}</span>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="secondary-btn" onClick={() => setShowAddOrderModal(false)}>
                Cancel
              </button>
              <button type="submit" className="primary-btn">
                Create Order
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Order Management</h2>
        <button className="action-btn" onClick={() => setShowAddOrderModal(true)}>
          + Add New Order
        </button>
      </div>
      
      <div className="search-filter-container">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search orders by ID, customer, or rider..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Orders
          </button>
          <button 
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-tab ${filter === 'in-transit' ? 'active' : ''}`}
            onClick={() => setFilter('in-transit')}
          >
            In Transit
          </button>
          <button 
            className={`filter-tab ${filter === 'delivered' ? 'active' : ''}`}
            onClick={() => setFilter('delivered')}
          >
            Delivered
          </button>
          <button 
            className={`filter-tab ${filter === 'cancelled' ? 'active' : ''}`}
            onClick={() => setFilter('cancelled')}
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
      
      <div className="orders-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
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
                  <p className="secondary-text">{order.customer.phone}</p>
                </div>
                
                <div className="detail-group">
                  <label>Delivery Address</label>
                  <p>{order.deliveryAddress}</p>
                </div>
                
                <div className="detail-group">
                  <label>Items</label>
                  {order.items.map((item, index) => (
                    <p key={index}>{item.name} x{item.quantity} (৳{item.price})</p>
                  ))}
                </div>
                
                <div className="detail-group">
                  <label>Total</label>
                  <p className="order-total">৳{order.total}</p>
                  <p className="secondary-text">
                    Payment: {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                  </p>
                </div>
                
                {order.status === 'in-transit' && order.delivery && (
                  <div className="detail-group delivery-info">
                    <label>Delivery Person</label>
                    <p>{order.delivery.person}</p>
                    <p className="secondary-text">{order.delivery.contact}</p>
                  </div>
                )}
                
                {order.status === 'delivered' && order.delivery && (
                  <div className="detail-group delivery-info">
                    <label>Delivered By</label>
                    <p>{order.delivery.person}</p>
                    <p className="secondary-text">{order.delivery.contact}</p>
                  </div>
                )}
              </div>
              
              <div className="order-actions">
                <button className="secondary-btn">View Details</button>
                <button 
                  className="secondary-btn" 
                  onClick={() => handlePrintLabel(order)}
                >
                  <span role="img" aria-label="print">🖨️</span> Print Label
                </button>
                {order.status === 'pending' && (
                  <>
                    <button className="primary-btn">Process Order</button>
                    <button className="danger-btn">Cancel Order</button>
                  </>
                )}
                {order.status === 'in-transit' && (
                  <button className="primary-btn">Track Order</button>
                )}
                {order.status === 'delivered' && (
                  <button className="secondary-btn">View Receipt</button>
                )}
                {order.status === 'cancelled' && (
                  <button className="primary-btn">Reopen Order</button>
                )}
              </div>
            </div>
          ))
        ) : (
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
        <DeliveryLabel 
          order={selectedOrder} 
          onClose={handleCloseLabelModal} 
        />
      )}

      {showBatchLabelModal && selectedOrdersData.length > 0 && (
        <BatchLabelPrint 
          orders={selectedOrdersData} 
          onClose={handleCloseBatchLabelModal} 
        />
      )}
      
      {showAddOrderModal && (
        <AddOrderModal />
      )}
    </div>
  );
};

// Products Tab Component
const ProductsTab = () => {
  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Manage Products</h2>
        <button className="action-btn">+ Add New Product</button>
      </div>
      
      <p>Products management interface would be here.</p>
    </div>
  );
};

// Settings Tab Component
const SettingsTab = () => {
  const { texts } = useLanguage();
  const [activeSection, setActiveSection] = useState('profile');
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Khan Electronics',
    logo: null,
    description: 'Leading electronics retailer in Dhaka with a wide range of products.',
    category: 'electronics',
    yearEstablished: '2015',
    registrationNumber: 'BRN-283759461',
    vatNumber: 'VAT-192835647'
  });

  const [contactInfo, setContactInfo] = useState({
    email: 'info@khanelectronics.com',
    phone: '+880 1712-345678',
    website: 'www.khanelectronics.com',
    address: 'House 12, Road 5, Block C, Mirpur 10, Dhaka',
    city: 'Dhaka',
    state: 'Dhaka Division',
    postalCode: '1216',
    country: 'Bangladesh'
  });

  const [ownerInfo, setOwnerInfo] = useState({
    name: 'Mahmud Khan',
    email: 'mahmud@khanelectronics.com',
    phone: '+880 1712-987654',
    idType: 'National ID',
    idNumber: '1925364758',
  });

  const [bankInfo, setBankInfo] = useState({
    accountName: 'Khan Electronics Ltd.',
    accountNumber: '0284759361',
    bankName: 'Bangladesh Bank',
    branch: 'Mirpur Branch',
    routingNumber: '03827465',
    swiftCode: 'BBDBBDDH'
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    newOrders: true,
    orderUpdates: true,
    paymentReceived: true,
    customerMessages: true,
    promotionalEmails: false,
    deliveryUpdates: true,
    systemNotifications: true
  });

  const [deliverySettings, setDeliverySettings] = useState({
    freeDeliveryMinimum: 1500,
    localDeliveryCharge: 60,
    outsideDeliveryCharge: 120,
    maxDeliveryDistance: 25,
    deliveryTimeWindow: '9:00 AM - 6:00 PM',
    acceptOutsideCity: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordLastChanged: '2023-03-15',
    sessionTimeout: 30
  });

  const handleBusinessInfoChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleOwnerInfoChange = (e) => {
    const { name, value } = e.target;
    setOwnerInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleBankInfoChange = (e) => {
    const { name, value } = e.target;
    setBankInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationPreferences(prevPrefs => ({
      ...prevPrefs,
      [name]: checked
    }));
  };

  const handleDeliverySettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDeliverySettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSecuritySettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="settings-section">
            <h3>Business Profile</h3>
            <p className="settings-description">Manage your business profile information that appears to customers.</p>
            
            <div className="settings-form">
              <div className="form-group">
                <label>Business Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={businessInfo.name} 
                  onChange={handleBusinessInfoChange}
                />
              </div>
              
              <div className="form-group">
                <label>Business Logo</label>
                <div className="logo-upload">
                  <div className="current-logo">
                    {businessInfo.logo ? (
                      <img src={businessInfo.logo} alt="Business Logo" />
                    ) : (
                      <div className="no-logo">
                        <span role="img" aria-label="shop">🏪</span>
                      </div>
                    )}
                  </div>
                  <button className="secondary-btn">Upload New Logo</button>
                </div>
              </div>
              
              <div className="form-group">
                <label>Business Description</label>
                <textarea 
                  name="description" 
                  value={businessInfo.description}
                  onChange={handleBusinessInfoChange}
                  rows="4"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Business Category</label>
                  <select 
                    name="category" 
                    value={businessInfo.category}
                    onChange={handleBusinessInfoChange}
                  >
                    <option value="electronics">Electronics</option>
                    <option value="groceries">Groceries</option>
                    <option value="fashion">Fashion & Clothing</option>
                    <option value="food">Food & Beverage</option>
                    <option value="health">Health & Beauty</option>
                    <option value="home">Home & Furniture</option>
                    <option value="books">Books & Stationery</option>
                    <option value="sports">Sports & Outdoors</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Year Established</label>
                  <input 
                    type="text" 
                    name="yearEstablished" 
                    value={businessInfo.yearEstablished}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Business Registration Number</label>
                  <input 
                    type="text" 
                    name="registrationNumber" 
                    value={businessInfo.registrationNumber}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>VAT/Tax ID</label>
                  <input 
                    type="text" 
                    name="vatNumber" 
                    value={businessInfo.vatNumber}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="settings-section-divider"></div>
            
            <h3>Contact Information</h3>
            <p className="settings-description">Update your business contact details.</p>
            
            <div className="settings-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={contactInfo.email}
                    onChange={handleContactInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    name="phone" 
                    value={contactInfo.phone}
                    onChange={handleContactInfoChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Website (optional)</label>
                <input 
                  type="text" 
                  name="website" 
                  value={contactInfo.website}
                  onChange={handleContactInfoChange}
                />
              </div>
              
              <div className="form-group">
                <label>Address</label>
                <textarea 
                  name="address" 
                  value={contactInfo.address}
                  onChange={handleContactInfoChange}
                  rows="2"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={contactInfo.city}
                    onChange={handleContactInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>State/Province</label>
                  <input 
                    type="text" 
                    name="state" 
                    value={contactInfo.state}
                    onChange={handleContactInfoChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Postal Code</label>
                  <input 
                    type="text" 
                    name="postalCode" 
                    value={contactInfo.postalCode}
                    onChange={handleContactInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Country</label>
                  <input 
                    type="text" 
                    name="country" 
                    value={contactInfo.country}
                    onChange={handleContactInfoChange}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="settings-section">
            <h3>Notification Preferences</h3>
            <p className="settings-description">Customize how and when you receive notifications.</p>
            
            <div className="settings-form">
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>New Order Notifications</h4>
                  <p>Receive notifications when new orders are placed</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="newOrders" 
                    name="newOrders"
                    checked={notificationPreferences.newOrders}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="newOrders"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Order Status Updates</h4>
                  <p>Receive notifications for order status changes</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="orderUpdates" 
                    name="orderUpdates"
                    checked={notificationPreferences.orderUpdates}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="orderUpdates"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Payment Notifications</h4>
                  <p>Receive notifications when you receive payments</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="paymentReceived" 
                    name="paymentReceived"
                    checked={notificationPreferences.paymentReceived}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="paymentReceived"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Customer Messages</h4>
                  <p>Receive notifications for new customer messages</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="customerMessages" 
                    name="customerMessages"
                    checked={notificationPreferences.customerMessages}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="customerMessages"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Promotional Emails</h4>
                  <p>Receive promotional emails and special offers</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="promotionalEmails" 
                    name="promotionalEmails"
                    checked={notificationPreferences.promotionalEmails}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="promotionalEmails"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Delivery Updates</h4>
                  <p>Receive updates about order deliveries</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="deliveryUpdates" 
                    name="deliveryUpdates"
                    checked={notificationPreferences.deliveryUpdates}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="deliveryUpdates"></label>
                </div>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>System Notifications</h4>
                  <p>Receive important system updates and announcements</p>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="systemNotifications" 
                    name="systemNotifications"
                    checked={notificationPreferences.systemNotifications}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="systemNotifications"></label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'delivery':
        return (
          <div className="settings-section">
            <h3>Delivery Settings</h3>
            <p className="settings-description">Configure your delivery options and pricing.</p>
            
            <div className="settings-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Free Delivery Minimum (৳)</label>
                  <input 
                    type="number" 
                    name="freeDeliveryMinimum" 
                    value={deliverySettings.freeDeliveryMinimum}
                    onChange={handleDeliverySettingsChange}
                  />
                  <p className="field-hint">Minimum order amount for free delivery</p>
                </div>
                
                <div className="form-group">
                  <label>Maximum Delivery Distance (km)</label>
                  <input 
                    type="number" 
                    name="maxDeliveryDistance" 
                    value={deliverySettings.maxDeliveryDistance}
                    onChange={handleDeliverySettingsChange}
                  />
                  <p className="field-hint">Maximum distance for delivery services</p>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Local Delivery Charge (৳)</label>
                  <input 
                    type="number" 
                    name="localDeliveryCharge" 
                    value={deliverySettings.localDeliveryCharge}
                    onChange={handleDeliverySettingsChange}
                  />
                  <p className="field-hint">Delivery fee for local area</p>
                </div>
                
                <div className="form-group">
                  <label>Outside City Charge (৳)</label>
                  <input 
                    type="number" 
                    name="outsideDeliveryCharge" 
                    value={deliverySettings.outsideDeliveryCharge}
                    onChange={handleDeliverySettingsChange}
                  />
                  <p className="field-hint">Delivery fee for outside city area</p>
                </div>
              </div>
              
              <div className="form-group">
                <label>Delivery Time Window</label>
                <input 
                  type="text" 
                  name="deliveryTimeWindow" 
                  value={deliverySettings.deliveryTimeWindow}
                  onChange={handleDeliverySettingsChange}
                />
                <p className="field-hint">The time window when you offer deliveries</p>
              </div>
              
              <div className="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  id="acceptOutsideCity" 
                  name="acceptOutsideCity"
                  checked={deliverySettings.acceptOutsideCity}
                  onChange={handleDeliverySettingsChange}
                />
                <label htmlFor="acceptOutsideCity">Accept deliveries outside city limits</label>
              </div>
            </div>
          </div>
        );
        
      case 'payment':
        return (
          <div className="settings-section">
            <h3>Payment & Banking</h3>
            <p className="settings-description">Manage your banking details for payments and withdrawals.</p>
            
            <div className="settings-form">
              <div className="form-group">
                <label>Account Name</label>
                <input 
                  type="text" 
                  name="accountName" 
                  value={bankInfo.accountName}
                  onChange={handleBankInfoChange}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Bank Name</label>
                  <input 
                    type="text" 
                    name="bankName" 
                    value={bankInfo.bankName}
                    onChange={handleBankInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Branch Name</label>
                  <input 
                    type="text" 
                    name="branch" 
                    value={bankInfo.branch}
                    onChange={handleBankInfoChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Account Number</label>
                  <input 
                    type="text" 
                    name="accountNumber" 
                    value={bankInfo.accountNumber}
                    onChange={handleBankInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Routing Number</label>
                  <input 
                    type="text" 
                    name="routingNumber" 
                    value={bankInfo.routingNumber}
                    onChange={handleBankInfoChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>SWIFT/BIC Code (for international transfers)</label>
                <input 
                  type="text" 
                  name="swiftCode" 
                  value={bankInfo.swiftCode}
                  onChange={handleBankInfoChange}
                />
              </div>
              
              <div className="settings-notice">
                <div className="notice-icon">ℹ️</div>
                <div className="notice-text">
                  <p>Banking information is used for processing withdrawals and receiving payments. Please ensure all details are accurate.</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="settings-section">
            <h3>Security Settings</h3>
            <p className="settings-description">Manage your account security preferences.</p>
            
            <div className="settings-form">
              <div className="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  id="twoFactorAuth" 
                  name="twoFactorAuth"
                  checked={securitySettings.twoFactorAuth}
                  onChange={handleSecuritySettingsChange}
                />
                <label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</label>
                <p className="field-hint">Add an extra layer of security to your account</p>
              </div>
              
              <div className="password-section">
                <h4>Password Management</h4>
                <p>Last changed: {securitySettings.passwordLastChanged}</p>
                <button className="secondary-btn">Change Password</button>
              </div>
              
              <div className="form-group">
                <label>Session Timeout (minutes)</label>
                <select 
                  name="sessionTimeout" 
                  value={securitySettings.sessionTimeout}
                  onChange={handleSecuritySettingsChange}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="120">2 hours</option>
                </select>
                <p className="field-hint">How long until you're automatically logged out due to inactivity</p>
              </div>
              
              <div className="settings-notice">
                <div className="notice-icon">⚠️</div>
                <div className="notice-text">
                  <p>Enhancing your account security helps protect your business and customer data. We recommend enabling two-factor authentication for maximum security.</p>
                </div>
              </div>
              
              <button className="danger-btn">Log Out From All Devices</button>
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
        <h2>Business Settings</h2>
      </div>
      
      <div className="settings-container">
        <div className="settings-sidebar">
          <ul className="settings-menu">
            <li 
              className={activeSection === 'profile' ? 'active' : ''}
              onClick={() => setActiveSection('profile')}
            >
              <span className="settings-icon">👤</span>
              Business Profile
            </li>
            <li 
              className={activeSection === 'notifications' ? 'active' : ''}
              onClick={() => setActiveSection('notifications')}
            >
              <span className="settings-icon">🔔</span>
              Notifications
            </li>
            <li 
              className={activeSection === 'delivery' ? 'active' : ''}
              onClick={() => setActiveSection('delivery')}
            >
              <span className="settings-icon">🚚</span>
              Delivery Settings
            </li>
            <li 
              className={activeSection === 'payment' ? 'active' : ''}
              onClick={() => setActiveSection('payment')}
            >
              <span className="settings-icon">💳</span>
              Payment & Banking
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
            <button className="primary-btn">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wallet Tab Component
const WalletTab = () => {
  const [walletBalance, setWalletBalance] = useState(25850);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [transactions, setTransactions] = useState([
    { 
      id: 'TRX-1001', 
      type: 'deposit', 
      amount: 12500, 
      date: '2023-06-15', 
      status: 'completed', 
      description: 'Bank transfer' 
    },
    { 
      id: 'TRX-1000', 
      type: 'withdraw', 
      amount: 5000, 
      date: '2023-06-10', 
      status: 'completed', 
      description: 'Withdrawal to bank account' 
    },
    { 
      id: 'TRX-999', 
      type: 'deposit', 
      amount: 18350, 
      date: '2023-06-05', 
      status: 'completed', 
      description: 'Sales revenue' 
    }
  ]);
  
  // Deposit Modal Component
  const DepositModal = () => {
    const [depositAmount, setDepositAmount] = useState('');
    const [depositMethod, setDepositMethod] = useState('bank');
    const [reference, setReference] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you would normally submit to an API
      const amount = Number(depositAmount);
      if (amount > 0) {
        // Add the transaction to the list
        const newTransaction = {
          id: `TRX-${1000 + transactions.length + 1}`,
          type: 'deposit',
          amount: amount,
          date: new Date().toISOString().split('T')[0],
          status: 'pending',
          description: `Deposit via ${depositMethod === 'bank' ? 'bank transfer' : 'mobile banking'}`
        };
        
        setTransactions([newTransaction, ...transactions]);
        // Update balance (in a real app, you would wait for confirmation)
        setWalletBalance(prevBalance => prevBalance + amount);
        setShowDepositModal(false);
      }
    };
    
    return (
      <div className="modal-overlay">
        <div className="modal-content wallet-modal">
          <div className="modal-header">
            <h2>Add Money to Wallet</h2>
            <button className="close-btn" onClick={() => setShowDepositModal(false)}>×</button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Deposit Amount (৳)</label>
              <input 
                type="number" 
                min="1" 
                value={depositAmount} 
                onChange={(e) => setDepositAmount(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Deposit Method</label>
              <select 
                value={depositMethod} 
                onChange={(e) => setDepositMethod(e.target.value)}
              >
                <option value="bank">Bank Transfer</option>
                <option value="mobile">Mobile Banking</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Reference / Transaction ID</label>
              <input 
                type="text" 
                value={reference} 
                onChange={(e) => setReference(e.target.value)}
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="button" className="secondary-btn" onClick={() => setShowDepositModal(false)}>
                Cancel
              </button>
              <button type="submit" className="primary-btn">
                Submit Deposit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  // Withdraw Modal Component
  const WithdrawModal = () => {
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawMethod, setWithdrawMethod] = useState('bank');
    const [accountDetails, setAccountDetails] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you would normally submit to an API
      const amount = Number(withdrawAmount);
      if (amount > 0 && amount <= walletBalance) {
        // Add the transaction to the list
        const newTransaction = {
          id: `TRX-${1000 + transactions.length + 1}`,
          type: 'withdraw',
          amount: amount,
          date: new Date().toISOString().split('T')[0],
          status: 'pending',
          description: `Withdrawal to ${withdrawMethod === 'bank' ? 'bank account' : 'mobile banking'}`
        };
        
        setTransactions([newTransaction, ...transactions]);
        // Update balance (in a real app, you would wait for confirmation)
        setWalletBalance(prevBalance => prevBalance - amount);
        setShowWithdrawModal(false);
      }
    };
    
    return (
      <div className="modal-overlay">
        <div className="modal-content wallet-modal">
          <div className="modal-header">
            <h2>Withdraw Money</h2>
            <button className="close-btn" onClick={() => setShowWithdrawModal(false)}>×</button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Available Balance</label>
              <div className="balance-display">৳{walletBalance.toLocaleString()}</div>
            </div>
            
            <div className="form-group">
              <label>Withdraw Amount (৳)</label>
              <input 
                type="number" 
                min="1" 
                max={walletBalance}
                value={withdrawAmount} 
                onChange={(e) => setWithdrawAmount(e.target.value)}
                required
              />
              {Number(withdrawAmount) > walletBalance && (
                <p className="error-text">Amount exceeds available balance</p>
              )}
            </div>
            
            <div className="form-group">
              <label>Withdrawal Method</label>
              <select 
                value={withdrawMethod} 
                onChange={(e) => setWithdrawMethod(e.target.value)}
              >
                <option value="bank">Bank Account</option>
                <option value="mobile">Mobile Banking</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Account Details</label>
              <textarea 
                value={accountDetails} 
                onChange={(e) => setAccountDetails(e.target.value)}
                placeholder={withdrawMethod === 'bank' 
                  ? "Bank Name, Account Number, Account Holder Name" 
                  : "Mobile Banking Provider, Phone Number, Account Name"}
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="button" className="secondary-btn" onClick={() => setShowWithdrawModal(false)}>
                Cancel
              </button>
              <button 
                type="submit" 
                className="primary-btn"
                disabled={Number(withdrawAmount) <= 0 || Number(withdrawAmount) > walletBalance}
              >
                Submit Withdrawal
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Partner Wallet</h2>
      </div>
      
      <div className="wallet-overview">
        <div className="wallet-balance-card">
          <div className="balance-header">
            <h3>Available Balance</h3>
          </div>
          <div className="balance-amount">৳{walletBalance.toLocaleString()}</div>
          <div className="wallet-actions">
            <button className="primary-btn" onClick={() => setShowDepositModal(true)}>
              <span role="img" aria-label="deposit">➕</span> Add Money
            </button>
            <button className="secondary-btn" onClick={() => setShowWithdrawModal(true)}>
              <span role="img" aria-label="withdraw">💸</span> Withdraw
            </button>
          </div>
        </div>
        
        <div className="wallet-stats">
          <div className="stat-card">
            <div className="stat-title">Total Deposits</div>
            <div className="stat-value">৳30,850</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Total Withdrawals</div>
            <div className="stat-value">৳5,000</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Pending Transactions</div>
            <div className="stat-value">0</div>
          </div>
        </div>
      </div>
      
      <div className="transaction-history">
        <div className="section-header">
          <h3>Transaction History</h3>
        </div>
        
        <table className="data-table transactions-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>
                  <span className={`transaction-type ${transaction.type}`}>
                    {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                  </span>
                </td>
                <td className={`amount ${transaction.type}`}>
                  {transaction.type === 'deposit' ? '+' : '-'}৳{transaction.amount.toLocaleString()}
                </td>
                <td>{transaction.date}</td>
                <td>
                  <span className={`status-badge status-${transaction.status}`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </td>
                <td>{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showDepositModal && <DepositModal />}
      {showWithdrawModal && <WithdrawModal />}
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
  const [filter, setFilter] = useState('all');

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
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Get orders that are selected for batch printing
  const selectedOrdersData = orders.filter(order => selectedOrders.includes(order.id));

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
            placeholder="Search orders by ID or customer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Orders
          </button>
          <button 
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-tab ${filter === 'in-transit' ? 'active' : ''}`}
            onClick={() => setFilter('in-transit')}
          >
            In Transit
          </button>
          <button 
            className={`filter-tab ${filter === 'delivered' ? 'active' : ''}`}
            onClick={() => setFilter('delivered')}
          >
            Delivered
          </button>
          <button 
            className={`filter-tab ${filter === 'cancelled' ? 'active' : ''}`}
            onClick={() => setFilter('cancelled')}
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
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
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
                  <label>Address</label>
                  <p className="truncate-text">{order.deliveryAddress}</p>
                </div>
                
                <div className="detail-group">
                  <label>Items</label>
                  <p>{order.items.length} items</p>
                </div>
                
                <div className="detail-group">
                  <label>Payment</label>
                  <p>{order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}</p>
                </div>
              </div>
              
              <div className="order-actions">
                <button className="primary-btn" onClick={() => handlePrintLabel(order)}>
                  <span role="img" aria-label="print">🖨️</span> Print Label
                </button>
              </div>
            </div>
          ))
        ) : (
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
        <DeliveryLabel 
          order={selectedOrder} 
          onClose={handleCloseLabelModal} 
        />
      )}

      {showBatchLabelModal && selectedOrdersData.length > 0 && (
        <BatchLabelPrint 
          orders={selectedOrdersData} 
          onClose={handleCloseBatchLabelModal} 
        />
      )}
    </div>
  );
};

// Returns Tab Component
const ReturnsTab = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredReturns, setFilteredReturns] = useState(returnRequests);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseType, setResponseType] = useState('');
  const [responseNote, setResponseNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { texts } = useLanguage();

  useEffect(() => {
    filterReturns(activeFilter);
  }, [activeFilter, searchQuery]);

  const filterReturns = (filter) => {
    let filtered = returnRequests;
    
    // Apply status filter
    if (filter !== 'all') {
      filtered = returnRequests.filter(item => item.status === filter);
    }
    
    // Apply search filter if there's a query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.id.toLowerCase().includes(query) || 
        item.orderId.toLowerCase().includes(query) || 
        item.customer.name.toLowerCase().includes(query) ||
        item.customer.phone.includes(query)
      );
    }
    
    setFilteredReturns(filtered);
  };

  const handleViewDetails = (returnItem) => {
    setSelectedReturn(returnItem);
    setShowDetailsModal(true);
  };

  const handleResponse = (returnItem, type) => {
    setSelectedReturn(returnItem);
    setResponseType(type);
    setResponseNote('');
    setShowResponseModal(true);
  };

  const handleSubmitResponse = () => {
    // In a real app, this would send the response to the backend
    // For now, we'll just update the local state for demo purposes
    
    const updatedReturns = returnRequests.map(item => {
      if (item.id === selectedReturn.id) {
        if (responseType === 'approve') {
          return {
            ...item, 
            status: 'approved',
            approvalDate: new Date().toISOString().split('T')[0]
          };
        } else if (responseType === 'reject') {
          return {
            ...item, 
            status: 'rejected',
            rejectionReason: responseNote
          };
        }
      }
      return item;
    });
    
    // Update state
    setFilteredReturns(updatedReturns);
    
    // Close modal
    setShowResponseModal(false);
    setSelectedReturn(null);
    setResponseNote('');
    
    // Refresh filter
    filterReturns(activeFilter);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-badge pending';
      case 'approved':
        return 'status-badge approved';
      case 'in-progress':
        return 'status-badge in-progress';
      case 'completed':
        return 'status-badge completed';
      case 'rejected':
        return 'status-badge rejected';
      default:
        return 'status-badge';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Return Requests</h2>
        <div className="search-filter-container">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search by ID, Order or Customer" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'approved' ? 'active' : ''}`}
              onClick={() => setActiveFilter('approved')}
            >
              Approved
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveFilter('completed')}
            >
              Completed
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'rejected' ? 'active' : ''}`}
              onClick={() => setActiveFilter('rejected')}
            >
              Rejected
            </button>
          </div>
        </div>
      </div>
      
      <div className="returns-list">
        <div className="returns-list-header">
          <div className="return-id">Return ID</div>
          <div className="return-order">Order Info</div>
          <div className="return-customer">Customer</div>
          <div className="return-items">Items</div>
          <div className="return-reason">Reason</div>
          <div className="return-date">Request Date</div>
          <div className="return-status">Status</div>
          <div className="return-actions">Actions</div>
        </div>
        
        {filteredReturns.length > 0 ? (
          filteredReturns.map(returnItem => (
            <div className="returns-list-item" key={returnItem.id}>
              <div className="return-id">{returnItem.id}</div>
              <div className="return-order">
                <div>{returnItem.orderId}</div>
                <div className="order-date">{formatDate(returnItem.orderDate)}</div>
              </div>
              <div className="return-customer">
                <div>{returnItem.customer.name}</div>
                <div className="customer-phone">{returnItem.customer.phone}</div>
              </div>
              <div className="return-items">
                {returnItem.items.map((item, index) => (
                  <div key={index}>{item.name} x{item.quantity}</div>
                ))}
              </div>
              <div className="return-reason">
                <div className="reason-text">{returnItem.reason.length > 30 ? returnItem.reason.substring(0, 30) + '...' : returnItem.reason}</div>
                {returnItem.images.length > 0 && (
                  <div className="has-images">Has {returnItem.images.length} image(s)</div>
                )}
              </div>
              <div className="return-date">{formatDate(returnItem.requestDate)}</div>
              <div className="return-status">
                <span className={getStatusBadgeClass(returnItem.status)}>
                  {getStatusText(returnItem.status)}
                </span>
              </div>
              <div className="return-actions">
                <button 
                  className="view-btn"
                  onClick={() => handleViewDetails(returnItem)}
                >
                  View
                </button>
                
                {returnItem.status === 'pending' && (
                  <>
                    <button 
                      className="approve-btn"
                      onClick={() => handleResponse(returnItem, 'approve')}
                    >
                      Approve
                    </button>
                    <button 
                      className="reject-btn"
                      onClick={() => handleResponse(returnItem, 'reject')}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-returns">
            <p>No return requests match your criteria</p>
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
                    {getStatusText(selectedReturn.status)}
                  </span>
                </div>
              </div>
              
              <div className="return-detail-section">
                <h4>Request Information</h4>
                <div className="detail-row">
                  <div className="detail-label">Request Date:</div>
                  <div className="detail-value">{formatDate(selectedReturn.requestDate)}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Order Date:</div>
                  <div className="detail-value">{formatDate(selectedReturn.orderDate)}</div>
                </div>
                {selectedReturn.status === 'approved' && (
                  <div className="detail-row">
                    <div className="detail-label">Approval Date:</div>
                    <div className="detail-value">{formatDate(selectedReturn.approvalDate || new Date())}</div>
                  </div>
                )}
                {selectedReturn.status === 'completed' && (
                  <>
                    <div className="detail-row">
                      <div className="detail-label">Pickup Date:</div>
                      <div className="detail-value">{formatDate(selectedReturn.pickupDate)}</div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-label">Completion Date:</div>
                      <div className="detail-value">{formatDate(selectedReturn.completionDate)}</div>
                    </div>
                  </>
                )}
                {selectedReturn.status === 'rejected' && (
                  <div className="detail-row">
                    <div className="detail-label">Rejection Reason:</div>
                    <div className="detail-value">{selectedReturn.rejectionReason}</div>
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
                <div className="detail-row">
                  <div className="detail-label">Address:</div>
                  <div className="detail-value">{selectedReturn.address}</div>
                </div>
              </div>
              
              <div className="return-detail-section">
                <h4>Return Details</h4>
                <div className="detail-row">
                  <div className="detail-label">Reason:</div>
                  <div className="detail-value">{selectedReturn.reason}</div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-label">Items:</div>
                  <div className="detail-value">
                    <ul className="return-items-list">
                      {selectedReturn.items.map((item, index) => (
                        <li key={index}>
                          {item.name} x{item.quantity} - ৳{item.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {selectedReturn.status === 'completed' && (
                  <div className="detail-row">
                    <div className="detail-label">Refund:</div>
                    <div className="detail-value">
                      ৳{selectedReturn.refundAmount} via {selectedReturn.refundMethod}
                    </div>
                  </div>
                )}
              </div>
              
              {selectedReturn.images && selectedReturn.images.length > 0 && (
                <div className="return-detail-section">
                  <h4>Images</h4>
                  <div className="return-images">
                    {selectedReturn.images.map((image, index) => (
                      <div key={index} className="return-image">
                        <img src={image} alt={`Return image ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedReturn.status === 'pending' && (
                <div className="return-detail-actions">
                  <button 
                    className="cancel-btn"
                    onClick={() => {
                      setShowDetailsModal(false);
                      setSelectedReturn(null);
                    }}
                  >
                    Close
                  </button>
                  <button 
                    className="approve-btn"
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleResponse(selectedReturn, 'approve');
                    }}
                  >
                    Approve Return
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleResponse(selectedReturn, 'reject');
                    }}
                  >
                    Reject Return
                  </button>
                </div>
              )}
              
              {selectedReturn.status !== 'pending' && (
                <div className="return-detail-actions">
                  <button 
                    className="primary-btn"
                    onClick={() => {
                      setShowDetailsModal(false);
                      setSelectedReturn(null);
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Response Modal */}
      {showResponseModal && selectedReturn && (
        <div className="modal-overlay">
          <div className="modal-container response-modal">
            <div className="modal-header">
              <h2>
                {responseType === 'approve' ? 'Approve Return Request' : 'Reject Return Request'}
              </h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowResponseModal(false);
                  setSelectedReturn(null);
                  setResponseNote('');
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="return-info-summary">
                <p><strong>Return ID:</strong> {selectedReturn.id}</p>
                <p><strong>Order ID:</strong> {selectedReturn.orderId}</p>
                <p><strong>Customer:</strong> {selectedReturn.customer.name}</p>
              </div>
              
              {responseType === 'approve' ? (
                <div className="approval-form">
                  <p className="approval-message">
                    You are about to approve this return request. Once approved, a rider will be assigned to pick up the returned items.
                  </p>
                  <div className="form-group">
                    <label>Additional Instructions (Optional)</label>
                    <textarea 
                      value={responseNote}
                      onChange={(e) => setResponseNote(e.target.value)}
                      placeholder="Add any special instructions for the pickup..."
                      rows={3}
                    ></textarea>
                  </div>
                </div>
              ) : (
                <div className="rejection-form">
                  <div className="form-group">
                    <label>Reason for Rejection</label>
                    <textarea 
                      value={responseNote}
                      onChange={(e) => setResponseNote(e.target.value)}
                      placeholder="Explain why the return request is being rejected..."
                      rows={3}
                      required
                    ></textarea>
                  </div>
                  {!responseNote && (
                    <p className="validation-message">Please provide a reason for rejection</p>
                  )}
                </div>
              )}
              
              <div className="form-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => {
                    setShowResponseModal(false);
                    setSelectedReturn(null);
                    setResponseNote('');
                  }}
                >
                  Cancel
                </button>
                <button 
                  className={responseType === 'approve' ? 'approve-btn' : 'reject-btn'}
                  onClick={handleSubmitResponse}
                  disabled={responseType === 'reject' && !responseNote}
                >
                  {responseType === 'approve' ? 'Approve Return' : 'Reject Return'}
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
const PartnerDashboard = () => {
  const { texts } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Add notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'You have received a new order #ORD-8745',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'system',
      title: 'Payment Received',
      message: 'Payment of ৳12,500 has been credited to your account',
      time: '2 hours ago',
      read: false
    }
  ]);

  const handleMarkAsRead = (notificationId) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };
  
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path === 'partner' || path === '') {
      navigate('/partner/overview');
    } else {
      setActiveTab(path);
    }
  }, [location, navigate]);
  
  return (
    <div className="partner-dashboard">
      <Navbar />
      
      <div className="dashboard-header">
        <div className="dashboard-header-container">
          <div className="dashboard-welcome">
            <h1>Partner Dashboard</h1>
            <p>Manage your business, orders, and finances</p>
          </div>
          <div className="header-actions">
            <NotificationDropdown
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onClearAll={handleClearAll}
            />
            <div className="partner-profile">
              <div className="profile-image">KE</div>
              <div className="profile-name">Khan Electronics</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
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
            to="/partner/returns" 
            className={`tab-btn ${activeTab === 'returns' ? 'active' : ''}`}
          >
            Returns
          </Link>
          <Link 
            to="/partner/products" 
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          >
            Products
          </Link>
          <Link 
            to="/partner/wallet" 
            className={`tab-btn ${activeTab === 'wallet' ? 'active' : ''}`}
          >
            Wallet
          </Link>
          <Link 
            to="/partner/print-labels" 
            className={`tab-btn ${activeTab === 'print-labels' ? 'active' : ''}`}
          >
            Print Labels
          </Link>
          <Link 
            to="/partner/settings" 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          >
            Settings
          </Link>
        </div>
        
        <Routes>
          <Route path="overview" element={<OverviewTab />} />
          <Route path="orders" element={<OrdersTab />} />
          <Route path="returns" element={<ReturnsTab />} />
          <Route path="products" element={<ProductsTab />} />
          <Route path="wallet" element={<WalletTab />} />
          <Route path="print-labels" element={<PrintLabelsTab />} />
          <Route path="settings" element={<SettingsTab />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
};

export default PartnerDashboard; 