import React, { useState, useEffect } from 'react';
import { FaTimes, FaInfoCircle, FaSearch, FaFilter } from 'react-icons/fa';
import './PrintDialogs.css';

const BatchPrintDialog = ({ isOpen, onClose, orders, onPrint }) => {
  const [paperSize, setPaperSize] = useState('a4');
  const [orientation, setOrientation] = useState('portrait');
  const [copies, setCopies] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [includeOptions, setIncludeOptions] = useState({
    qrCode: true,
    barcode: true,
    logo: true,
    instructions: true
  });

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = !searchTerm || 
      order.id.toString().includes(searchTerm) || 
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || order.status === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Initialize selectedOrders when orders change
  useEffect(() => {
    if (orders.length > 0 && selectedOrders.length === 0) {
      // By default, select all pending and processing orders
      const initialSelected = orders
        .filter(order => ['pending', 'processing'].includes(order.status))
        .map(order => order.id);
      setSelectedOrders(initialSelected);
    }
  }, [orders]);

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const handleOrderSelect = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleIncludeOptionChange = (option) => {
    setIncludeOptions({
      ...includeOptions,
      [option]: !includeOptions[option]
    });
  };

  const handlePrint = () => {
    if (selectedOrders.length === 0) {
      alert('Please select at least one order to print');
      return;
    }

    const printConfig = {
      paperSize,
      orientation,
      copies,
      includeOptions,
      orderIds: selectedOrders
    };

    onPrint(printConfig);
  };

  if (!isOpen) return null;

  const orderStatusFilters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const getStatusClassName = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'processing': return 'status-processing';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="print-dialog-overlay">
      <div className="print-dialog-container">
        <div className="print-dialog-header">
          <h3>Batch Print Delivery Labels</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="print-dialog-content">
          <div className="print-dialog-info">
            <FaInfoCircle className="print-info-icon" />
            <p>Print multiple delivery labels at once. Select orders and customize your printing options.</p>
          </div>
          
          {/* Order selection section */}
          <div className="print-options-section">
            <h4>Select Orders</h4>
            
            <div className="searchbox">
              <input
                type="text"
                placeholder="Search by order ID, customer name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-tags">
              {orderStatusFilters.map(filter => (
                <div 
                  key={filter.value}
                  className={`filter-tag ${activeFilter === filter.value ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  <FaFilter />
                  {filter.label}
                </div>
              ))}
            </div>
            
            <div className="order-selection-section">
              <div className="order-selection-header">
                <label className="selectall-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length > 0 && selectedOrders.length === filteredOrders.length}
                    onChange={handleSelectAll}
                  />
                  Select All
                </label>
                <span className="order-count">{filteredOrders.length} orders</span>
              </div>
              
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <div key={order.id} className="order-item">
                    <input
                      type="checkbox"
                      className="order-checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleOrderSelect(order.id)}
                    />
                    <div className="order-details">
                      <div className="summary-row">
                        <p>#{order.id} - {order.customer.name}</p>
                        <span className={`status-badge ${getStatusClassName(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="summary-row">
                        <p>{order.customer.address}</p>
                        <p>${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '16px', textAlign: 'center', color: '#666' }}>
                  No orders found matching your criteria
                </div>
              )}
            </div>
          </div>
          
          {/* Print options */}
          <div className="print-options-section">
            <h4>Paper Size</h4>
            <div className="option-group">
              <label className={`option-button ${paperSize === 'a4' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paperSize"
                  value="a4"
                  checked={paperSize === 'a4'}
                  onChange={() => setPaperSize('a4')}
                />
                A4 (210 × 297 mm)
              </label>
              <label className={`option-button ${paperSize === 'letter' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paperSize"
                  value="letter"
                  checked={paperSize === 'letter'}
                  onChange={() => setPaperSize('letter')}
                />
                Letter (8.5 × 11 in)
              </label>
              <label className={`option-button ${paperSize === 'label' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paperSize"
                  value="label"
                  checked={paperSize === 'label'}
                  onChange={() => setPaperSize('label')}
                />
                Shipping Label (4 × 6 in)
              </label>
            </div>
          </div>
          
          <div className="print-options-section">
            <h4>Orientation</h4>
            <div className="option-group">
              <label className={`option-button ${orientation === 'portrait' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="orientation"
                  value="portrait"
                  checked={orientation === 'portrait'}
                  onChange={() => setOrientation('portrait')}
                />
                Portrait
              </label>
              <label className={`option-button ${orientation === 'landscape' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="orientation"
                  value="landscape"
                  checked={orientation === 'landscape'}
                  onChange={() => setOrientation('landscape')}
                />
                Landscape
              </label>
            </div>
          </div>
          
          <div className="print-options-section">
            <h4>Copies per label</h4>
            <div className="copies-control">
              <button 
                className="copies-btn" 
                onClick={() => setCopies(Math.max(1, copies - 1))}
                disabled={copies <= 1}
              >
                -
              </button>
              <span className="copies-count">{copies}</span>
              <button 
                className="copies-btn" 
                onClick={() => setCopies(Math.min(10, copies + 1))}
                disabled={copies >= 10}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="print-options-section">
            <h4>Include in Label</h4>
            <div className="checkbox-group">
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={includeOptions.qrCode}
                  onChange={() => handleIncludeOptionChange('qrCode')}
                />
                QR Code
              </label>
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={includeOptions.barcode}
                  onChange={() => handleIncludeOptionChange('barcode')}
                />
                Barcode
              </label>
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={includeOptions.logo}
                  onChange={() => handleIncludeOptionChange('logo')}
                />
                Company Logo
              </label>
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={includeOptions.instructions}
                  onChange={() => handleIncludeOptionChange('instructions')}
                />
                Delivery Instructions
              </label>
            </div>
          </div>
          
          <div className="print-summary">
            <div className="print-summary-title">Print Summary</div>
            <div className="summary-row">
              <p>Selected Orders:</p>
              <p>{selectedOrders.length} of {orders.length}</p>
            </div>
            <div className="summary-row">
              <p>Total Labels to Print:</p>
              <p>{selectedOrders.length * copies}</p>
            </div>
          </div>
        </div>
        
        <div className="print-dialog-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="print-btn" 
            onClick={handlePrint}
            disabled={selectedOrders.length === 0}
          >
            Print Labels
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchPrintDialog; 