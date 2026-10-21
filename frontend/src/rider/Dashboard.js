import React, { useState, useEffect, useRef } from 'react';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/RiderDashboard.css';
import { useLanguage } from '../context/LanguageContext';
import DeliveryLabel from '../components/DeliveryLabel';
import BatchLabelPrint from '../components/BatchLabelPrint';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import NotificationDropdown from '../components/NotificationDropdown';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Banking Tabs Component
const BankingTabs = () => {
  const [activeTab, setActiveTab] = useState('bank');
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      bankName: 'Sonali Bank',
      accountType: 'Savings Account',
      accountNumber: '****1234',
      branch: 'Main Branch',
      isDefault: true
    }
  ]);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [dropdownValues, setDropdownValues] = useState({
    bankName: '',
    accountType: ''
  });
  const [inputValues, setInputValues] = useState({
    accountHolderName: '',
    accountNumber: '',
    branch: ''
  });
  const dropdownRef = useRef(null);
  const [showAddWalletModal, setShowAddWalletModal] = useState(false);
  const [walletForm, setWalletForm] = useState({
    walletType: '',
    walletNumber: ''
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowBankDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // List of major banks in Bangladesh
  const bangladeshBanks = [
    // State-Owned Commercial Banks
    "Sonali Bank PLC",
    "Rupali Bank PLC",
    "Agrani Bank PLC",
    "Janata Bank PLC",

    // Specialized Banks
    "Bangladesh Development Bank PLC",
    "Bangladesh Krishi Bank",
    "Rajshahi Krishi Unnayan Bank",
    "Probashi Kallyan Bank",
    "Karmashangsthan Bank",
    "Palli Sanchay Bank",

    // Private Commercial Banks (Conventional)
    "AB Bank PLC",
    "Bangladesh Commerce Bank PLC",
    "Bank Asia PLC",
    "BRAC Bank PLC",
    "The City Bank PLC",
    "Dhaka Bank PLC",
    "Dutch-Bangla Bank PLC",
    "Eastern Bank PLC",
    "IFIC Bank PLC",
    "Jamuna Bank PLC",
    "Meghna Bank PLC",
    "Mercantile Bank PLC",
    "Midland Bank PLC",
    "Modhumoti Bank PLC",
    "Mutual Trust Bank PLC",
    "National Bank PLC",
    "NRB Bank PLC",
    "NRB Commercial Bank PLC",
    "NRB Global Bank PLC",
    "One Bank PLC",
    "Padma Bank PLC",
    "Premier Bank PLC",
    "Prime Bank PLC",
    "Pubali Bank PLC",
    "South Bangla Agriculture and Commerce Bank PLC",
    "Southeast Bank PLC",
    "Standard Bank PLC",
    "Trust Bank PLC",
    "United Commercial Bank PLC",
    "Uttara Bank PLC",

    // Private Commercial Banks (Islamic)
    "Al-Arafah Islami Bank PLC",
    "EXIM Bank PLC", // Export Import Bank of Bangladesh
    "First Security Islami Bank PLC",
    "Global Islami Bank PLC",
    "ICB Islamic Bank PLC",
    "Islami Bank Bangladesh PLC",
    "Shahjalal Islami Bank PLC",
    "Social Islami Bank PLC",
    "Union Bank PLC",

    // Foreign Commercial Banks (Limited presence, but notable)
    "Standard Chartered Bank",
    "HSBC Bangladesh" // The Hongkong and Shanghai Banking Corporation Limited
];

  const filterBanks = (input) => {
    const filter = input.value.toUpperCase();
    const optionsList = dropdownRef.current.querySelector('.options-list');
    const options = optionsList.getElementsByClassName('option');
    
    for (let i = 0; i < options.length; i++) {
      const txtValue = options[i].textContent || options[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        options[i].style.display = "";
      } else {
        options[i].style.display = "none";
      }
    }
  };

  const handleBankSelect = (bank) => {
    setDropdownValues(prev => ({
      ...prev,
      bankName: bank
    }));
    setShowBankDropdown(false);
  };

  const handleAccountTypeChange = (e) => {
    setDropdownValues(prev => ({
      ...prev,
      accountType: e.target.value
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitBankDetails = (e) => {
    e.preventDefault();
    const newBank = {
      id: bankAccounts.length + 1,
      bankName: dropdownValues.bankName,
      accountType: dropdownValues.accountType,
      accountHolderName: inputValues.accountHolderName,
      accountNumber: inputValues.accountNumber,
      branch: inputValues.branch,
      isDefault: bankAccounts.length === 0
    };
    setBankAccounts([...bankAccounts, newBank]);
    setDropdownValues({
      bankName: '',
      accountType: ''
    });
    setInputValues({
      accountHolderName: '',
      accountNumber: '',
      branch: ''
    });
    setShowAddBankModal(false);
  };

  const handleAddBank = () => {
    setDropdownValues({
      bankName: '',
      accountType: ''
    });
    setInputValues({
      accountHolderName: '',
      accountNumber: '',
      branch: ''
    });
    setShowAddBankModal(true);
  };

  const handleCloseModal = () => {
    setShowAddBankModal(false);
  };

  const handleSetDefault = (bankId) => {
    setBankAccounts(bankAccounts.map(bank => ({
      ...bank,
      isDefault: bank.id === bankId
    })));
  };

  const handleRemoveBank = (bankId) => {
    if (bankAccounts.length > 1) {
      setBankAccounts(bankAccounts.filter(bank => bank.id !== bankId));
    }
  };

  const handleWalletInputChange = (e) => {
    const { name, value } = e.target;
    setWalletForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitWallet = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the wallet
    console.log('Adding wallet:', walletForm);
    setWalletForm({
      walletType: '',
      walletNumber: ''
    });
    setShowAddWalletModal(false);
  };

  const AddWalletModal = ({ show, onClose, onAddWallet }) => {
    const [walletForm, setWalletForm] = useState({
      type: '',
      number: ''
    });
    const [showWalletDropdown, setShowWalletDropdown] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const dropdownRef = useRef(null);

    const walletOptions = [
      { id: 'bkash', name: 'bKash', logo: '/images/payment/bkash.svg' },
      { id: 'nagad', name: 'Nagad', logo: '/images/payment/nagad.svg' },
      { id: 'rocket', name: 'Rocket', logo: '/images/payment/rocket.svg' }
    ];

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowWalletDropdown(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleWalletSelect = (wallet) => {
      setSelectedWallet(wallet);
      setWalletForm(prev => ({ ...prev, type: wallet.id }));
      setShowWalletDropdown(false);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onAddWallet(walletForm);
      setWalletForm({ type: '', number: '' });
      setSelectedWallet(null);
      onClose();
    };

    if (!show) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Add Mobile Wallet</h3>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Wallet Type</label>
              <div className="custom-select-container" ref={dropdownRef}>
                <div 
                  className="select-input"
                  onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                >
                  {selectedWallet ? (
                    <div className="selected-wallet">
                      <img 
                        src={selectedWallet.logo} 
                        alt={selectedWallet.name} 
                        className="wallet-icon"
                      />
                      <span>{selectedWallet.name}</span>
                    </div>
                  ) : (
                    <span className="select-placeholder">Select wallet type</span>
                  )}
                  <span className="dropdown-arrow">▼</span>
                </div>
                {showWalletDropdown && (
                  <div className="select-dropdown">
                    <div className="options-list">
                      {walletOptions.map(option => (
                        <div
                          key={option.id}
                          className={`option ${selectedWallet?.id === option.id ? 'selected' : ''}`}
                          onClick={() => handleWalletSelect(option)}
                        >
                          <img 
                            src={option.logo} 
                            alt={option.name} 
                            className="wallet-icon"
                          />
                          <span>{option.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Wallet Number</label>
              <input
                type="text"
                value={walletForm.number}
                onChange={(e) => setWalletForm(prev => ({ ...prev, number: e.target.value }))}
                placeholder="Enter wallet number"
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="add-button">
                Add Wallet
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const AddBankModal = () => (
    <div className="modal-overlay">
      <div className="add-bank-modal">
        <div className="modal-header">
          <h3>Add Bank Account</h3>
          <button className="close-btn" onClick={handleCloseModal}>&times;</button>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmitBankDetails}>
            <div className="form-group">
              <label>Bank Name</label>
              <div className="custom-select-container" ref={dropdownRef}>
                <div 
                  className="select-input"
                  onClick={() => setShowBankDropdown(true)}
                >
                  {dropdownValues.bankName || 'Select a bank'}
                  <i className={`fas fa-chevron-${showBankDropdown ? 'up' : 'down'}`}></i>
                </div>
                {showBankDropdown && (
                  <div className="select-dropdown">
                    <div className="search-box">
                      <input
                        type="text"
                        placeholder="Search banks..."
                        onChange={(e) => filterBanks(e.target)}
                        autoComplete="off"
                      />
                      <i className="fas fa-search"></i>
                    </div>
                    <div className="options-list">
                      {bangladeshBanks.map((bank) => (
                        <div
                          key={bank}
                          className="option"
                          onClick={() => handleBankSelect(bank)}
                        >
                          {bank}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Account Holder Name</label>
              <input
                type="text"
                name="accountHolderName"
                value={inputValues.accountHolderName}
                onChange={handleInputChange}
                placeholder="Enter account holder name"
                required
              />
            </div>
            <div className="form-group">
              <label>Account Type</label>
              <select
                value={dropdownValues.accountType}
                onChange={handleAccountTypeChange}
                required
              >
                <option value="">Select account type</option>
                <option value="Savings Account">Savings Account</option>
                <option value="Current Account">Current Account</option>
                <option value="Fixed Deposit">Fixed Deposit</option>
              </select>
            </div>
            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={inputValues.accountNumber}
                onChange={handleInputChange}
                placeholder="Enter account number"
                required
              />
            </div>
            <div className="form-group">
              <label>Branch</label>
              <input
                type="text"
                name="branch"
                value={inputValues.branch}
                onChange={handleInputChange}
                placeholder="Enter branch name"
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="secondary-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="submit" className="primary-btn">
                Add Bank Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="banking-tabs">
      <div className="tab-buttons">
        <button 
          className={`tab-btn tab-account ${activeTab === 'bank' ? 'active' : ''}`}
          onClick={() => setActiveTab('bank')}
        >
          <i className="fas fa-university"></i>
          Bank Account
        </button>
        <button 
          className={`tab-btn tab-account ${activeTab === 'mobile' ? 'active' : ''}`}
          onClick={() => setActiveTab('mobile')}
        >
          <i className="fas fa-mobile-alt"></i>
          Mobile Banking
        </button>
      </div>

      {activeTab === 'bank' && (
        <div className="bank-accounts">
          {bankAccounts.map((account) => (
            <div key={account.id} className="account-card">
              <div className="account-header">
                <div className="bank-info">
                  <i className="fas fa-university"></i>
                  <div>
                    <h4>{account.bankName}</h4>
                    <p>{account.accountType}</p>
                  </div>
                </div>
                <div className="account-actions">
                  {account.isDefault && <span className="default-badge">Default</span>}
                  {!account.isDefault && (
                    <button 
                      className="set-default-btn"
                      onClick={() => handleSetDefault(account.id)}
                    >
                      Set as Default
                    </button>
                  )}
                  {bankAccounts.length > 1 && (
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveBank(account.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="account-details">
                <div className="detail-item">
                  <span className="detail-label">Account Number</span>
                  <span className="detail-value">{account.accountNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Branch</span>
                  <span className="detail-value">{account.branch}</span>
                </div>
              </div>
            </div>
          ))}
          <button className="add-bank-btn" onClick={handleAddBank}>
            <i className="fas fa-plus"></i>
            Add Another Bank Account
          </button>
        </div>
      )}

      {activeTab === 'mobile' && (
        <div className="mobile-wallets">
          <div className="wallet-card">
            <div className="wallet-header">
              <div className="wallet-info">
                <img src="/images/payment/bkash.svg" alt="bKash" className="wallet-icon" />
                <h4>bKash</h4>
              </div>
            </div>
            <div className="wallet-number">
              <span className="label">Mobile Number</span>
              <span className="value">01******789</span>
            </div>
          </div>
          <div className="wallet-card">
            <div className="wallet-header">
              <div className="wallet-info">
                <img src="/images/payment/nagad.svg" alt="Nagad" className="wallet-icon" />
                <h4>Nagad</h4>
              </div>
            </div>
            <div className="wallet-number">
              <span className="label">Mobile Number</span>
              <span className="value">01******456</span>
            </div>
          </div>
          <div className="wallet-card">
            <div className="wallet-header">
              <div className="wallet-info">
                <img src="/images/payment/rocket.svg" alt="Rocket" className="wallet-icon" />
                <h4>Rocket</h4>
              </div>
            </div>
            <div className="wallet-number">
              <span className="label">Mobile Number</span>
              <span className="value">01******123</span>
            </div>
          </div>
          <button className="add-wallet-btn" onClick={() => setShowAddWalletModal(true)}>
            <i className="fas fa-plus"></i>
            Add Another Wallet
          </button>
        </div>
      )}

      {showAddWalletModal && <AddWalletModal />}
      {showAddBankModal && <AddBankModal />}
    </div>
  );
};

// Document View Modal Component
const DocumentViewModal = ({ document, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="document-view-modal">
        <div className="modal-header">
          <h3>{document.name}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          <div className="document-images">
            {document.images.map((image, index) => (
              <div key={index} className="document-image-container">
                <img src={image} alt={`${document.name} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Available Orders Tab Component
const AvailableOrdersTab = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-8521',
      pickupLocation: 'Dhanmondi, Dhaka',
      dropLocation: 'Gulshan, Dhaka',
      distance: '8.5 km',
      estimatedTime: '35 min',
      payment: '৳250',
      items: 'Small package (Electronics)',
      weight: '1.2 kg'
    },
    {
      id: 'ORD-8519',
      pickupLocation: 'Mohammadpur, Dhaka',
      dropLocation: 'Banani, Dhaka',
      distance: '10.2 km',
      estimatedTime: '45 min',
      payment: '৳320',
      items: 'Documents',
      weight: '0.5 kg'
    },
    {
      id: 'ORD-8515',
      pickupLocation: 'Uttara, Dhaka',
      dropLocation: 'Mirpur, Dhaka',
      distance: '12.8 km',
      estimatedTime: '55 min',
      payment: '৳380',
      items: 'Groceries',
      weight: '3.5 kg'
    }
  ]);

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Available Orders</h2>
        <div className="filter-options">
          <select className="filter-select">
            <option>All Areas</option>
            <option>Dhanmondi</option>
            <option>Gulshan</option>
            <option>Uttara</option>
            <option>Mohammadpur</option>
          </select>
          <select className="filter-select">
            <option>All Types</option>
            <option>Food</option>
            <option>Documents</option>
            <option>Electronics</option>
            <option>Groceries</option>
          </select>
        </div>
      </div>
      
      <div className="order-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-id">{order.id}</div>
              <div className="order-payment">{order.payment}</div>
            </div>
            
            <div className="order-route">
              <div className="pickup-location">
                <div className="location-marker pickup"></div>
                <div className="location-details">
                  <div className="location-label">Pickup</div>
                  <div className="location-address">{order.pickupLocation}</div>
                </div>
              </div>
              <div className="route-line"></div>
              <div className="drop-location">
                <div className="location-marker drop"></div>
                <div className="location-details">
                  <div className="location-label">Drop-off</div>
                  <div className="location-address">{order.dropLocation}</div>
                </div>
              </div>
            </div>
            
            <div className="order-details">
              <div className="detail-item">
                <span className="detail-label">Distance</span>
                <span className="detail-value">{order.distance}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Est. Time</span>
                <span className="detail-value">{order.estimatedTime}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Items</span>
                <span className="detail-value">{order.items}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Weight</span>
                <span className="detail-value">{order.weight}</span>
              </div>
            </div>
            
            <div className="order-actions">
              <button className="primary-btn">Accept Order</button>
              <button className="secondary-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// My Deliveries Tab Component
const MyDeliveriesTab = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 'ORD-8498',
      date: '2023-10-14',
      customer: {
        name: 'Rahman Ali',
        phone: '+880 1712-345679'
      },
      pickupLocation: 'Tejgaon, Dhaka',
      dropLocation: 'Rampura, Dhaka',
      payment: '৳280',
      status: 'in-progress',
      deliveryAddress: 'House 12, Road 5, Rampura, Dhaka',
      items: [
        { name: 'Electronics Package', quantity: 1, price: 280 }
      ],
      total: 280,
      paymentStatus: 'pending'
    },
    {
      id: 'ORD-8487',
      date: '2023-10-13',
      customer: {
        name: 'Anika Islam',
        phone: '+880 1812-345678'
      },
      pickupLocation: 'Dhanmondi, Dhaka',
      dropLocation: 'Mohammadpur, Dhaka',
      payment: '৳220',
      status: 'completed',
      deliveryAddress: '42 Main Street, Mohammadpur, Dhaka',
      items: [
        { name: 'Food Package', quantity: 1, price: 220 }
      ],
      total: 220,
      paymentStatus: 'paid'
    },
    {
      id: 'ORD-8475',
      date: '2023-10-12',
      customer: {
        name: 'Kamal Hossain',
        phone: '+880 1912-345677'
      },
      pickupLocation: 'Gulshan, Dhaka',
      dropLocation: 'Banani, Dhaka',
      payment: '৳200',
      status: 'completed',
      deliveryAddress: 'Apartment 3B, Building 7, Banani, Dhaka',
      items: [
        { name: 'Clothing Package', quantity: 1, price: 200 }
      ],
      total: 200,
      paymentStatus: 'paid'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [showBatchLabelModal, setShowBatchLabelModal] = useState(false);
  const [selectedDeliveries, setSelectedDeliveries] = useState([]);
  
  const filteredDeliveries = activeFilter === 'all' 
    ? deliveries 
    : deliveries.filter(delivery => delivery.status === activeFilter);

  const handlePrintLabel = (delivery) => {
    setSelectedDelivery(delivery);
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
  
  const toggleDeliverySelection = (deliveryId) => {
    if (selectedDeliveries.includes(deliveryId)) {
      setSelectedDeliveries(selectedDeliveries.filter(id => id !== deliveryId));
    } else {
      setSelectedDeliveries([...selectedDeliveries, deliveryId]);
    }
  };

  const selectAllDeliveries = () => {
    if (selectedDeliveries.length === filteredDeliveries.length) {
      setSelectedDeliveries([]);
    } else {
      setSelectedDeliveries(filteredDeliveries.map(delivery => delivery.id));
    }
  };

  // Get deliveries that are selected for batch printing
  const selectedDeliveriesData = deliveries.filter(delivery => 
    selectedDeliveries.includes(delivery.id)
  );

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>My Deliveries</h2>
      </div>
      
      <div className="deliveries-filters">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'in-progress' ? 'active' : ''}`}
          onClick={() => setActiveFilter('in-progress')}
        >
          In Progress
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveFilter('completed')}
        >
          Completed
        </button>
      </div>
      
      {selectedDeliveries.length > 0 && (
        <div className="batch-print-actions">
          <div className="selected-count">
            {selectedDeliveries.length} delivery{selectedDeliveries.length !== 1 ? 'ies' : ''} selected
          </div>
          <div className="batch-action-btns">
            <button className="secondary-btn" onClick={selectAllDeliveries}>
              {selectedDeliveries.length === filteredDeliveries.length ? 'Deselect All' : 'Select All'}
            </button>
            <button className="print-btn" onClick={handleBatchPrint}>
              <span role="img" aria-label="print">🖨️</span> Print Selected Labels
            </button>
          </div>
        </div>
      )}
      
      <div className="deliveries-list">
        {filteredDeliveries.map(delivery => (
          <div key={delivery.id} className={`delivery-card status-${delivery.status}`}>
            <div className="order-selection">
              <input 
                type="checkbox" 
                checked={selectedDeliveries.includes(delivery.id)}
                onChange={() => toggleDeliverySelection(delivery.id)}
              />
            </div>
            
            <div className="delivery-header">
              <div className="delivery-id">{delivery.id}</div>
              <div className="delivery-date">{delivery.date}</div>
            </div>
            
            <div className="delivery-route">
              <div className="pickup-location">
                <div className="location-marker pickup"></div>
                <div className="location-details">
                  <div className="location-label">Pickup</div>
                  <div className="location-address">{delivery.pickupLocation}</div>
                </div>
              </div>
              <div className="route-line"></div>
              <div className="drop-location">
                <div className="location-marker drop"></div>
                <div className="location-details">
                  <div className="location-label">Drop-off</div>
                  <div className="location-address">{delivery.dropLocation}</div>
                </div>
              </div>
            </div>
            
            <div className="delivery-details">
              <div className="detail-item">
                <span className="detail-label">Customer</span>
                <span className="detail-value">{delivery.customer.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Payment</span>
                <span className="detail-value">{delivery.payment}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className={`status-value status-${delivery.status}`}>
                  <span className="status-indicator"></span>
                  {delivery.status === 'in-progress' ? 'In Progress' : 'Completed'}
                </span>
              </div>
            </div>
            
            <div className="delivery-actions">
              {delivery.status === 'in-progress' ? (
                <>
                  <button className="primary-btn">Update Status</button>
                  <button className="secondary-btn">Navigate</button>
                  <button 
                    className="secondary-btn"
                    onClick={() => handlePrintLabel(delivery)}
                  >
                    <span role="img" aria-label="print">🖨️</span> Print Label
                  </button>
                </>
              ) : (
                <>
                  <button className="secondary-btn">View Details</button>
                  <button className="secondary-btn">Receipt</button>
                  <button 
                    className="secondary-btn"
                    onClick={() => handlePrintLabel(delivery)}
                  >
                    <span role="img" aria-label="print">🖨️</span> Print Label
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {showLabelModal && selectedDelivery && (
        <DeliveryLabel 
          order={selectedDelivery} 
          onClose={handleCloseLabelModal} 
        />
      )}

      {showBatchLabelModal && selectedDeliveriesData.length > 0 && (
        <BatchLabelPrint 
          orders={selectedDeliveriesData} 
          onClose={handleCloseBatchLabelModal} 
        />
      )}
    </div>
  );
};

// Earnings Tab Component
const EarningsTab = () => {
  const [earningsSummary] = useState({
    todayEarnings: '৳520',
    weeklyEarnings: '৳3,150',
    monthlyEarnings: '৳12,800',
    totalEarnings: '৳45,600',
    totalDeliveries: 48,
    totalDistance: '385 km',
    averageRating: 4.8
  });
  
  const [earningsHistory] = useState([
    { date: 'Apr 16, 2025', deliveries: 5, amount: '৳520' },
    { date: 'Apr 15, 2025', deliveries: 6, amount: '৳650' },
    { date: 'Apr 14, 2025', deliveries: 4, amount: '৳480' },
    { date: 'Apr 13, 2025', deliveries: 5, amount: '৳550' },
    { date: 'Apr 12, 2025', deliveries: 3, amount: '৳320' },
    { date: 'Apr 11, 2025', deliveries: 5, amount: '৳630' },
    { date: 'Apr 10, 2025', deliveries: 4, amount: '৳450' },
    { date: 'Apr 09, 2025', deliveries: 6, amount: '৳680' },
    { date: 'Apr 08, 2025', deliveries: 5, amount: '৳550' },
    { date: 'Apr 07, 2025', deliveries: 4, amount: '৳480' },
    { date: 'Apr 06, 2025', deliveries: 3, amount: '৳350' },
    { date: 'Apr 05, 2025', deliveries: 5, amount: '৳520' },
    { date: 'Apr 04, 2025', deliveries: 6, amount: '৳650' },
    { date: 'Apr 03, 2025', deliveries: 4, amount: '৳480' },
    { date: 'Apr 02, 2025', deliveries: 5, amount: '৳550' },
    { date: 'Apr 01, 2025', deliveries: 3, amount: '৳320' },
    { date: 'Mar 31, 2025', deliveries: 5, amount: '৳630' },
    { date: 'Mar 30, 2025', deliveries: 4, amount: '৳450' },
    { date: 'Mar 29, 2025', deliveries: 6, amount: '৳680' },
    { date: 'Mar 28, 2025', deliveries: 5, amount: '৳550' },
    { date: 'Mar 27, 2025', deliveries: 4, amount: '৳480' },
    { date: 'Mar 26, 2025', deliveries: 3, amount: '৳350' },
    { date: 'Mar 25, 2025', deliveries: 5, amount: '৳520' },
    { date: 'Mar 24, 2025', deliveries: 6, amount: '৳650' },
    { date: 'Mar 23, 2025', deliveries: 4, amount: '৳480' },
    { date: 'Mar 22, 2025', deliveries: 5, amount: '৳550' },
    { date: 'Mar 21, 2025', deliveries: 3, amount: '৳320' },
    { date: 'Mar 20, 2025', deliveries: 5, amount: '৳630' },
    { date: 'Mar 19, 2025', deliveries: 4, amount: '৳450' },
    { date: 'Mar 18, 2025', deliveries: 6, amount: '৳680' }
  ]);
  
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [error, setError] = useState('');
  
  // Generate months for dropdown
  const months = [
    { value: '2024-01', label: 'January 2024' },
    { value: '2023-12', label: 'December 2023' },
    { value: '2023-11', label: 'November 2023' },
    { value: '2023-10', label: 'October 2023' },
    { value: '2023-09', label: 'September 2023' },
    { value: '2023-08', label: 'August 2023' },
    { value: '2023-07', label: 'July 2023' },
    { value: '2023-06', label: 'June 2023' },
    { value: '2023-05', label: 'May 2023' },
    { value: '2023-04', label: 'April 2023' },
    { value: '2023-03', label: 'March 2023' },
    { value: '2023-02', label: 'February 2023' },
    { value: '2023-01', label: 'January 2023' }
  ];

  const handleWithdraw = () => {
    // Handle withdrawal logic here
    console.log('Withdrawing', withdrawAmount, 'via', selectedMethod);
    setShowWithdrawModal(false);
    setSelectedMethod('');
    setWithdrawAmount('');
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const validateDateRange = () => {
    if (!fromDate || !toDate) {
      setError('Please select both from and to dates');
      return false;
    }

    const start = new Date(fromDate);
    const end = new Date(toDate);
    const today = new Date();

    // Check if dates are in the past
    if (start > today || end > today) {
      setError('Cannot select future dates');
      return false;
    }

    // Check if end date is after start date
    if (end < start) {
      setError('To date must be after from date');
      return false;
    }

    // Calculate months difference
    const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + 
                      (end.getMonth() - start.getMonth());
    
    if (monthsDiff > 3) {
      setError('Cannot download statement for more than 3 months');
      return false;
    }

    setError('');
    return true;
  };

  const handleDownload = () => {
    if (validateDateRange()) {
      handleDownloadStatement(fromDate, toDate);
    }
  };

  const handleDownloadStatement = (fromDate, toDate) => {
    // Create new PDF document
    const doc = new jsPDF();
    
    // Load the PNG logo
    const logo = new Image();
    logo.src = '/logo.png';
    
    logo.onload = () => {
      // Calculate dimensions to maintain aspect ratio
      const maxWidth = 40; // Maximum width in mm
      const maxHeight = 20; // Maximum height in mm
      
      // Calculate dimensions while maintaining aspect ratio
      let logoWidth = logo.width;
      let logoHeight = logo.height;
      
      // Scale down if width is too large
      if (logoWidth > maxWidth) {
        const ratio = maxWidth / logoWidth;
        logoWidth = maxWidth;
        logoHeight = logoHeight * ratio;
      }
      
      // Scale down if height is too large
      if (logoHeight > maxHeight) {
        const ratio = maxHeight / logoHeight;
        logoHeight = maxHeight;
        logoWidth = logoWidth * ratio;
      }
      
      // Add the logo to the PDF with calculated dimensions
      doc.addImage(logo, 'PNG', 20, 15, logoWidth, logoHeight, undefined, 'FAST');
      
      // Calculate vertical position based on logo height
      const titleY = 15 + (logoHeight / 2); // Center vertically with logo
      
      // Add company details under logo
      doc.setFontSize(10);
      doc.text('House# 8 Chanchkoir Bazar', 20, 15 + logoHeight + 5);
      doc.text('Gurudaspur, Natore - 6440', 20, 15 + logoHeight + 10);
      
      // Add header
      doc.setFontSize(20);
      doc.text('Earnings Statement', 190, titleY, { align: 'right' });
      
      // Add date range and generation date
      doc.setFontSize(12);
      const statementFromDate = new Date(fromDate);
      const statementToDate = new Date(toDate);
      const formatDateForPDF = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
      doc.text(`Period: ${formatDateForPDF(statementFromDate)} to ${formatDateForPDF(statementToDate)}`, 190, titleY + 8, { align: 'right' });
      doc.text(`Generated on ${formatDateForPDF(new Date())}`, 190, titleY + 16, { align: 'right' });
      
      // Add rider information
      doc.setFontSize(12);
      doc.text('Rider Information', 20, titleY + 27);
      doc.setFontSize(10);
      doc.text(`Name: Kamal Hassan`, 20, titleY + 32);
      doc.text(`Rider ID: RD-3421`, 20, titleY + 37);
      
      // Add horizontal line after rider information
      doc.setDrawColor(200, 200, 200); // Light gray color
      doc.setLineWidth(0.5);
      doc.line(20, titleY + 45, 190, titleY + 45);
      
      // Add earnings summary
      doc.setFontSize(12);
      doc.text('Earnings Summary', 20, titleY + 55);
      
      // Create earnings summary table
      const statementSummaryData = [
        ['Total Earnings', `Tk. ${earningsSummary.totalEarnings.replace(/[৳]/g, '')}`],
        ['Total Deliveries', earningsSummary.totalDeliveries],
        ['Total Distance', earningsSummary.totalDistance],
        ['Average Rating', earningsSummary.averageRating]
      ];
      
      autoTable(doc, {
        startY: titleY + 60,
        head: [['Metric', 'Value']],
        body: statementSummaryData,
        theme: 'grid',
        headStyles: { fillColor: [76, 175, 80] },
        margin: { left: 20, right: 20 },
        tableWidth: 'auto'
      });
      
      // Add earnings history
      doc.setFontSize(12);
      doc.text('Earnings History', 20, doc.lastAutoTable.finalY + 15);
      
      // Create earnings history table
      const statementHistoryData = earningsHistory.map(item => [
        item.date,
        item.deliveries,
        `Tk. ${item.amount.replace(/[৳]/g, '')}`
      ]);
      
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 20,
        head: [['Date', 'Deliveries', 'Amount']],
        body: statementHistoryData,
        theme: 'grid',
        headStyles: { fillColor: [76, 175, 80] },
        margin: { left: 20, right: 20 },
        tableWidth: 'auto',
        pageBreak: 'auto',
        didDrawPage: function(data) {
          // Add footer
          const totalPages = doc.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            
            // Add contact information in footer
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100); // Gray color for footer text
            
            // Email (left)
            doc.text('support@grameendelivery.com', 20, doc.internal.pageSize.height - 15);
            
            // Phone (center)
            doc.text('+880 1712-345678', doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 15, { align: 'center' });
            
            // Website (right)
            doc.text('www.grameendelivery.com', doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 15, { align: 'right' });
            
            // Add horizontal line above footer
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.2);
            doc.line(20, doc.internal.pageSize.height - 18, 190, doc.internal.pageSize.height - 18);
          }
        }
      });
      
      // Save the PDF
      doc.save(`earnings-statement-${formatDateForPDF(new Date(fromDate))}-to-${formatDateForPDF(new Date(toDate))}.pdf`);
      
      setShowStatementModal(false);
      setFromDate('');
      setToDate('');
    };
  };

  const StatementModal = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [error, setError] = useState('');

    const validateDateRange = () => {
      if (!fromDate || !toDate) {
        setError('Please select both from and to dates');
        return false;
      }

      const start = new Date(fromDate);
      const end = new Date(toDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Check if dates are in the past
      if (start > today || end > today) {
        setError('Cannot select future dates');
        return false;
      }

      // Check if end date is after start date
      if (end < start) {
        setError('To date must be after from date');
        return false;
      }

      // Calculate months difference
      const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + 
                        (end.getMonth() - start.getMonth());
      
      if (monthsDiff > 3) {
        setError('Cannot download statement for more than 3 months');
        return false;
      }

      setError('');
      return true;
    };

    const handleDownload = () => {
      if (validateDateRange()) {
        handleDownloadStatement(fromDate, toDate);
      }
    };

    return (
      <div className="modal-overlay">
        <div className="statement-modal">
          <div className="modal-header">
            <h3>Download Earnings Statement</h3>
            <button className="close-btn" onClick={() => setShowStatementModal(false)}>×</button>
          </div>
          <div className="modal-content">
            <div className="form-group">
              <label>From Date</label>
              <input 
                type="date" 
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="date-input"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group">
              <label>To Date</label>
              <input 
                type="date" 
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="date-input"
                max={new Date().toISOString().split('T')[0]}
                min={fromDate}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="statement-preview">
              <h4>Statement Preview</h4>
              <div className="preview-content">
                <p>This statement will include:</p>
                <ul>
                  <li>Total earnings for the selected period</li>
                  <li>Number of deliveries completed</li>
                  <li>Distance covered</li>
                  <li>Detailed earnings breakdown by date</li>
                  <li>Payment status and transaction history</li>
                </ul>
                <p className="note">Note: You can download statements for a maximum period of 3 months.</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="secondary-btn" onClick={() => setShowStatementModal(false)}>Cancel</button>
            <button 
              className="primary-btn" 
              onClick={handleDownload}
              disabled={!fromDate || !toDate}
            >
              Download Statement
            </button>
          </div>
        </div>
      </div>
    );
  };

  const WithdrawModal = () => (
    <div className="modal-overlay">
      <div className="withdraw-modal">
        <div className="modal-header">
          <h3>Withdraw Earnings</h3>
          <button className="close-btn" onClick={() => setShowWithdrawModal(false)}>×</button>
        </div>
        <div className="modal-content">
          <div className="form-group">
            <label>Available Balance</label>
            <div className="balance-amount">{earningsSummary.totalEarnings}</div>
          </div>
          <div className="form-group">
            <label>Withdrawal Amount</label>
            <input 
              type="number" 
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div className="form-group">
            <label>Withdrawal Method</label>
            <div className="withdrawal-methods">
              <button 
                className={`method-btn ${selectedMethod === 'bank' ? 'active' : ''}`}
                onClick={() => setSelectedMethod('bank')}
              >
                <span className="method-icon">🏦</span>
                Bank Transfer
              </button>
              <button 
                className={`method-btn ${selectedMethod === 'bkash' ? 'active' : ''}`}
                onClick={() => setSelectedMethod('bkash')}
              >
                <span className="method-icon">💳</span>
                bKash
              </button>
              <button 
                className={`method-btn ${selectedMethod === 'nagad' ? 'active' : ''}`}
                onClick={() => setSelectedMethod('nagad')}
              >
                <span className="method-icon">💳</span>
                Nagad
              </button>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="secondary-btn" onClick={() => setShowWithdrawModal(false)}>Cancel</button>
          <button 
            className="primary-btn" 
            onClick={handleWithdraw}
            disabled={!withdrawAmount || !selectedMethod}
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>My Earnings</h2>
        <button className="secondary-btn" onClick={() => setShowStatementModal(true)}>
          Download Statement
        </button>
      </div>
      
      <div className="earnings-summary">
        <div className="summary-card total-earnings" onClick={() => setShowWithdrawModal(true)}>
          <h3>Total Earnings</h3>
          <div className="summary-value">{earningsSummary.totalEarnings}</div>
          <div className="summary-subtext">Click to withdraw</div>
        </div>
        <div className="summary-card">
          <h3>Today's Earnings</h3>
          <div className="summary-value">{earningsSummary.todayEarnings}</div>
          <div className="summary-subtext">5 deliveries</div>
        </div>
        <div className="summary-card">
          <h3>This Week</h3>
          <div className="summary-value">{earningsSummary.weeklyEarnings}</div>
          <div className="summary-subtext">28 deliveries</div>
        </div>
        <div className="summary-card">
          <h3>This Month</h3>
          <div className="summary-value">{earningsSummary.monthlyEarnings}</div>
          <div className="summary-subtext">48 deliveries</div>
        </div>
      </div>
      
      <div className="earnings-details">
        <div className="performance-metrics">
          <h3>Performance Metrics</h3>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">🛵</div>
              <div className="metric-value">{earningsSummary.totalDeliveries}</div>
              <div className="metric-label">Total Deliveries</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">📍</div>
              <div className="metric-value">{earningsSummary.totalDistance}</div>
              <div className="metric-label">Total Distance</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">⭐</div>
              <div className="metric-value">{earningsSummary.averageRating}</div>
              <div className="metric-label">Average Rating</div>
            </div>
          </div>
        </div>
        
        <div className="earnings-history">
          <h3>Recent History</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Deliveries</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {earningsHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.deliveries}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showWithdrawModal && <WithdrawModal />}
      {showStatementModal && <StatementModal />}
    </div>
  );
};

// Edit Profile Component
const EditProfile = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    phone: '+880 1234567890',
    email: 'john.doe@example.com',
    address: '123 Main St, Dhaka',
    vehicleType: 'Motorcycle',
    licensePlate: 'DHA-1234',
    licenseNumber: 'LIC123456789',
    bankName: 'Sonali Bank',
    accountNumber: '****1234',
    accountType: 'Savings',
    branch: 'Main Branch',
    bkashNumber: '01******789',
    nagadNumber: '01******456',
    rocketNumber: '01******123'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    console.log('Updating profile:', formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="edit-profile-modal">
        <div className="modal-header">
          <h3>Edit Profile</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="form-sections">
              <div className="form-section">
                <h4><i className="fas fa-user"></i> Personal Information</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4><i className="fas fa-motorcycle"></i> Vehicle Information</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Vehicle Type</label>
                    <input
                      type="text"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>License Plate</label>
                    <input
                      type="text"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>License Number</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4><i className="fas fa-university"></i> Banking Information</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Bank Name</label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Account Number</label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Account Type</label>
                    <input
                      type="text"
                      name="accountType"
                      value={formData.accountType}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Branch</label>
                    <input
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4><i className="fas fa-mobile-alt"></i> Mobile Banking</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>bKash Number</label>
                    <input
                      type="tel"
                      name="bkashNumber"
                      value={formData.bkashNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Nagad Number</label>
                    <input
                      type="tel"
                      name="nagadNumber"
                      value={formData.nagadNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Rocket Number</label>
                    <input
                      type="tel"
                      name="rocketNumber"
                      value={formData.rocketNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Profile Tab Component
const ProfileTab = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAreasModal, setShowAreasModal] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState(['Gulshan', 'Banani', 'Dhanmondi', 'Uttara']);
  const [availableAreas] = useState([
    'Gulshan', 'Banani', 'Dhanmondi', 'Uttara', 'Mohammadpur', 
    'Mirpur', 'Motijheel', 'Farmgate', 'Tejgaon', 'Wari'
  ]);

  const handleAreaSelect = (area) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(a => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const handleSaveAreas = () => {
    // Here you would typically make an API call to save the selected areas
    setShowAreasModal(false);
  };

  const documents = [
    {
      id: 1,
      name: 'National ID Card',
      status: 'verified',
      images: ['/documents/nid-front.jpg', '/documents/nid-back.jpg']
    },
    {
      id: 2,
      name: 'Driving License',
      status: 'verified',
      images: ['/documents/license-front.jpg', '/documents/license-back.jpg']
    },
    {
      id: 3,
      name: 'Vehicle Registration',
      status: 'verified',
      images: ['/documents/registration.jpg']
    },
    {
      id: 4,
      name: 'Insurance Document',
      status: 'verified',
      images: ['/documents/insurance.jpg']
    }
  ];

  const handleViewDocument = (document) => {
    setSelectedDocument(document);
  };

  
};

// Change Password Modal Component
const ChangePasswordModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }

    // Here you would typically make an API call to change the password
    console.log('Changing password:', formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="change-password-modal">
        <div className="modal-header">
          <h3>Change Password</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
          <div className="modal-footer">
            <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-btn">Change Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Settings Tab Component
const SettingsTab = () => {
  const { texts } = useLanguage();
  const [activeSection, setActiveSection] = useState('profile');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showDocumentViewModal, setShowDocumentViewModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showAreasModal, setShowAreasModal] = useState(false);
  
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Abdul Karim',
    photo: '/profile-placeholder.png',
    email: 'abdul.karim@example.com',
    phone: '+880 1712-345678',
    dateOfBirth: '1992-05-15',
    gender: 'male',
    nidNumber: '19925364758',
    address: 'House 7, Road 3, Block B, Mirpur 10, Dhaka',
    city: 'Dhaka',
    postalCode: '1216',
    riderId: 'RID123456',
    memberSince: 'June 2022',
    riderStatus: 'Gold Rider'
  });
  
  const [vehicleInfo, setVehicleInfo] = useState({
    type: 'motorcycle',
    brand: 'Honda',
    model: 'CB150R',
    year: '2020',
    licensePlate: 'DHK-2587',
    licenseNumber: 'DL-8721456',
    insuranceNumber: 'INS-8254367',
    insuranceExpiry: '2025-03-15'
  });
  
  const [workPreferences, setWorkPreferences] = useState({
    availability: 'full-time',
    workingHours: '9:00 AM - 6:00 PM',
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    preferredAreas: ['Mirpur', 'Gulshan', 'Banani', 'Dhanmondi'],
    maxDeliveryDistance: 15,
    acceptCashOnDelivery: true
  });
  
  const [notificationPreferences, setNotificationPreferences] = useState({
    newOrderAlerts: true,
    earningsUpdates: true,
    appUpdates: true,
    emailNotifications: false
  });
  
  const [appSettings, setAppSettings] = useState({
    darkMode: false,
    locationServices: true,
    distanceUnit: 'km',
    language: 'bn'
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    biometricLogin: true,
    sessionTimeout: 30,
    lastPasswordChange: '2024-01-15'
  });
  
  const [paymentSettings, setPaymentSettings] = useState({
    preferredMethod: 'bank', // 'bank', 'bkash', 'nagad', 'rocket'
    bankDetails: {
      bankName: 'Sonali Bank',
      accountNumber: '****1234',
      accountName: 'Abdul Karim',
      branch: 'Main Branch'
    },
    bkashNumber: '01712345678',
    nagadNumber: '01812345678',
    rocketNumber: '01612345678',
    automaticWithdrawal: false,
    withdrawalFrequency: 'weekly' // 'daily', 'weekly', 'monthly'
  });
  
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'National ID Card',
      status: 'verified',
      images: ['/documents/nid-front.jpg', '/documents/nid-back.jpg']
    },
    {
      id: 2,
      name: 'Driving License',
      status: 'verified',
      images: ['/documents/license-front.jpg', '/documents/license-back.jpg']
    },
    {
      id: 3,
      name: 'Vehicle Registration',
      status: 'verified',
      images: ['/documents/registration.jpg']
    },
    {
      id: 4,
      name: 'Insurance Document',
      status: 'verified',
      images: ['/documents/insurance.jpg']
    }
  ]);
  
  const [accountHistory, setAccountHistory] = useState([
    {
      id: 1,
      title: 'Account Verified',
      date: 'June 15, 2022',
      icon: 'check-circle'
    },
    {
      id: 2,
      title: 'Achieved Gold Rider Status',
      date: 'March 10, 2023',
      icon: 'star'
    },
    {
      id: 3,
      title: 'Top Performer Award',
      date: 'January 5, 2023',
      icon: 'award'
    }
  ]);
  
  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setShowDocumentViewModal(true);
  };
  
  const handleAreaSelect = (area) => {
    if (workPreferences.preferredAreas.includes(area)) {
      setWorkPreferences({
        ...workPreferences,
        preferredAreas: workPreferences.preferredAreas.filter(a => a !== area)
      });
    } else {
      setWorkPreferences({
        ...workPreferences,
        preferredAreas: [...workPreferences.preferredAreas, area]
      });
    }
  };
  
  const handleSaveAreas = () => {
    // Here you would typically make an API call to save the selected areas
    setShowAreasModal(false);
  };
  
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };
  
  const handleVehicleInfoChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };
  
  const handleWorkPreferencesChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'workingDays') {
      // Handle checkbox list for working days
      const updatedDays = [...workPreferences.workingDays];
      if (checked) {
        updatedDays.push(value);
      } else {
        const index = updatedDays.indexOf(value);
        if (index > -1) {
          updatedDays.splice(index, 1);
        }
      }
      setWorkPreferences(prev => ({
        ...prev,
        workingDays: updatedDays
      }));
    } else {
      // Handle other inputs
      setWorkPreferences(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationPreferences(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleAppSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAppSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSecuritySettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handlePaymentSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects like bankDetails.bankName
      const [parent, child] = name.split('.');
      setPaymentSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setPaymentSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  const renderSection = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <div className="settings-section">
            <div className="profile-header settings-profile-header">
              <div className="profile-left">
                <div className="profile-image">
                  <img
                    src={personalInfo.photo}
                    alt="Profile"
                  />
                  <button>
                    <i className="fas fa-camera"></i>
                  </button>
                </div>
                <div className="profile-info">
                  <h2>{personalInfo.name}</h2>
                  <p>Rider ID: {personalInfo.riderId}</p>
                  <p>Rider since {personalInfo.memberSince}</p>
                  <span className="profile-badge">{personalInfo.riderStatus}</span>
                </div>
              </div>
            </div>

            <h3>Personal Information</h3>
            <p className="settings-description">Manage your personal information and profile details.</p>
            
            <div className="settings-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={personalInfo.name} 
                  onChange={handlePersonalInfoChange}
                />
              </div>
              
              <div className="form-group">
                <label>Profile Photo</label>
                <div className="logo-upload">
                  <div className="current-logo">
                    {personalInfo.photo ? (
                      <img src={personalInfo.photo} alt="Profile" />
                    ) : (
                      <div className="no-logo">
                        <span role="img" aria-label="person">👤</span>
                      </div>
                    )}
                  </div>
                  <button className="secondary-btn">Upload New Photo</button>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    name="phone" 
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input 
                    type="date" 
                    name="dateOfBirth" 
                    value={personalInfo.dateOfBirth}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Gender</label>
                  <select 
                    name="gender" 
                    value={personalInfo.gender}
                    onChange={handlePersonalInfoChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>NID Number</label>
                <input 
                  type="text" 
                  name="nidNumber" 
                  value={personalInfo.nidNumber}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              
              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={personalInfo.address}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={personalInfo.city}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Postal Code</label>
                  <input 
                    type="text" 
                    name="postalCode" 
                    value={personalInfo.postalCode}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'vehicle':
        return (
          <div className="settings-section">
            <h3>Vehicle Information</h3>
            <p className="settings-description">Manage your vehicle details and documentation.</p>
            
            <div className="settings-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle Type</label>
                  <select 
                    name="type" 
                    value={vehicleInfo.type}
                    onChange={handleVehicleInfoChange}
                  >
                    <option value="motorcycle">Motorcycle</option>
                    <option value="bicycle">Bicycle</option>
                    <option value="scooter">Scooter</option>
                    <option value="car">Car</option>
                    <option value="van">Van</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Brand</label>
                  <input 
                    type="text" 
                    name="brand" 
                    value={vehicleInfo.brand}
                    onChange={handleVehicleInfoChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Model</label>
                  <input 
                    type="text" 
                    name="model" 
                    value={vehicleInfo.model}
                    onChange={handleVehicleInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Year</label>
                  <input 
                    type="text" 
                    name="year" 
                    value={vehicleInfo.year}
                    onChange={handleVehicleInfoChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>License Plate Number</label>
                <input 
                  type="text" 
                  name="licensePlate" 
                  value={vehicleInfo.licensePlate}
                  onChange={handleVehicleInfoChange}
                />
              </div>
              
              <div className="form-group">
                <label>Driving License Number</label>
                <input 
                  type="text" 
                  name="licenseNumber" 
                  value={vehicleInfo.licenseNumber}
                  onChange={handleVehicleInfoChange}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Insurance Number</label>
                  <input 
                    type="text" 
                    name="insuranceNumber" 
                    value={vehicleInfo.insuranceNumber}
                    onChange={handleVehicleInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Insurance Expiry Date</label>
                  <input 
                    type="date" 
                    name="insuranceExpiry" 
                    value={vehicleInfo.insuranceExpiry}
                    onChange={handleVehicleInfoChange}
                  />
                </div>
              </div>
              
              <div className="document-upload-section">
                <h4>Vehicle Documents</h4>
                <div className="document-cards">
                  <div className="document-card">
                    <div className="document-icon">🚗</div>
                    <div className="document-info">
                      <h5>Vehicle Registration</h5>
                      <p>Uploaded on: 10/01/2024</p>
                    </div>
                    <div className="document-actions">
                      <button className="secondary-btn">View</button>
                      <button className="secondary-btn">Update</button>
                    </div>
                  </div>
                  
                  <div className="document-card">
                    <div className="document-icon">📄</div>
                    <div className="document-info">
                      <h5>Insurance Certificate</h5>
                      <p>Uploaded on: 10/01/2024</p>
                    </div>
                    <div className="document-actions">
                      <button className="secondary-btn">View</button>
                      <button className="secondary-btn">Update</button>
                    </div>
                  </div>
                  
                  <div className="document-card">
                    <div className="document-icon">🪪</div>
                    <div className="document-info">
                      <h5>Driving License</h5>
                      <p>Uploaded on: 10/01/2024</p>
                    </div>
                    <div className="document-actions">
                      <button className="secondary-btn">View</button>
                      <button className="secondary-btn">Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'work':
        return (
          <div className="settings-section">
            <h3>Work Preferences</h3>
            <p className="settings-description">Manage your availability, working hours, and delivery preferences.</p>
            
            <div className="settings-form">
              <div className="form-group">
                <label>Availability</label>
                <select 
                  name="availability" 
                  value={workPreferences.availability}
                  onChange={handleWorkPreferencesChange}
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="weekends-only">Weekends Only</option>
                  <option value="custom">Custom Schedule</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Working Hours</label>
                <input 
                  type="text" 
                  name="workingHours" 
                  value={workPreferences.workingHours}
                  onChange={handleWorkPreferencesChange}
                  placeholder="e.g. 9:00 AM - 6:00 PM"
                />
              </div>
              
              <div className="form-group">
                <label>Working Days</label>
                <div className="checkbox-group-container">
                  <div className="checkbox-group">
                    <input 
                      type="checkbox" 
                      id="monday" 
                      name="workingDays" 
                      value="monday"
                      checked={workPreferences.workingDays.includes('monday')}
                      onChange={handleWorkPreferencesChange}
                    />
                    <label htmlFor="monday">Monday</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input 
                      type="checkbox" 
                      id="tuesday" 
                      name="workingDays" 
                      value="tuesday"
                      checked={workPreferences.workingDays.includes('tuesday')}
                      onChange={handleWorkPreferencesChange}
                    />
                    <label htmlFor="tuesday">Tuesday</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input 
                      type="checkbox" 
                      id="wednesday" 
                      name="workingDays" 
                      value="wednesday"
                      checked={workPreferences.workingDays.includes('wednesday')}
                      onChange={handleWorkPreferencesChange}
                    />
                    <label htmlFor="wednesday">Wednesday</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input 
                      type="checkbox" 
                      id="thursday" 
                      name="workingDays" 
                      value="thursday"
                      checked={workPreferences.workingDays.includes('thursday')}
                      onChange={handleWorkPreferencesChange}
                    />
                    <label htmlFor="thursday">Thursday</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input 
                      type="checkbox" 
                      id="friday" 
                      name="workingDays" 
                      value="friday"
                      checked={workPreferences.workingDays.includes('friday')}
                      onChange={handleWorkPreferencesChange}
                    />
                    <label htmlFor="friday">Friday</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input 
                      type="checkbox" 
                      id="saturday" 
                      name="workingDays" 
                      value="saturday"
                      checked={workPreferences.workingDays.includes('saturday')}
                      onChange={handleWorkPreferencesChange}
                    />
                    <label htmlFor="saturday">Saturday</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input 
                      type="checkbox" 
                      id="sunday" 
                      name="workingDays" 
                      value="sunday"
                      checked={workPreferences.workingDays.includes('sunday')}
                      onChange={handleWorkPreferencesChange}
                    />
                    <label htmlFor="sunday">Sunday</label>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Maximum Delivery Distance (km)</label>
                <input 
                  type="number" 
                  name="maxDeliveryDistance" 
                  value={workPreferences.maxDeliveryDistance}
                  onChange={handleWorkPreferencesChange}
                  min="1"
                  max="50"
                />
                <p className="field-hint">Set the maximum distance you're willing to travel for a delivery</p>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Accept Cash on Delivery</h4>
                  <p>Accept cash payments from customers upon delivery</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    name="acceptCashOnDelivery"
                    checked={workPreferences.acceptCashOnDelivery}
                    onChange={handleWorkPreferencesChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              
              <div className="form-group">
                <label>Preferred Delivery Areas</label>
                <div className="preferred-areas">
                  {workPreferences.preferredAreas.map(area => (
                    <span key={area} className="area-tag">{area}</span>
                  ))}
                </div>
                <button 
                  className="edit-areas-btn"
                  onClick={() => setShowAreasModal(true)}
                >
                  <i className="fas fa-edit"></i> Edit Areas
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="settings-section">
            <h3>Notification Settings</h3>
            <p className="settings-description">Control what notifications you receive and how they are delivered.</p>
            
            <div className="settings-form">
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>New Order Alerts</h4>
                  <p>Receive notifications for new available orders</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    name="newOrderAlerts"
                    checked={notificationPreferences.newOrderAlerts}
                    onChange={handleNotificationChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Earnings Updates</h4>
                  <p>Get notifications about your earnings</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    name="earningsUpdates"
                    checked={notificationPreferences.earningsUpdates}
                    onChange={handleNotificationChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>App Updates</h4>
                  <p>Be notified about new features and updates</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    name="appUpdates"
                    checked={notificationPreferences.appUpdates}
                    onChange={handleNotificationChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Email Notifications</h4>
                  <p>Receive notifications via email</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    name="emailNotifications"
                    checked={notificationPreferences.emailNotifications}
                    onChange={handleNotificationChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        );
        
      case 'app':
        return (
          <div className="settings-section">
            <h3>App Settings</h3>
            <p className="settings-description">Customize your app experience and preferences.</p>
            
            <div className="settings-form">
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Dark Mode</h4>
                  <p>Switch between light and dark themes</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    name="darkMode"
                    checked={appSettings.darkMode}
                    onChange={handleAppSettingsChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Location Services</h4>
                  <p>Allow the app to access your location</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    name="locationServices"
                    checked={appSettings.locationServices}
                    onChange={handleAppSettingsChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              
              <div className="form-group">
                <label>Distance Unit</label>
                <select 
                  name="distanceUnit" 
                  value={appSettings.distanceUnit}
                  onChange={handleAppSettingsChange}
                >
                  <option value="km">Kilometers (km)</option>
                  <option value="mi">Miles (mi)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Language</label>
                <select 
                  name="language" 
                  value={appSettings.language}
                  onChange={handleAppSettingsChange}
                >
                  <option value="en">English</option>
                  <option value="bn">Bengali</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 'payment':
        return (
          <div className="settings-section">
            <h3>Payment Details</h3>
            <p className="settings-description">Configure your preferred payment methods and withdrawal options.</p>
            
            <div className="settings-form">
              <div className="form-group">
                <label>Preferred Payment Method</label>
                <div className="payment-method-selector">
                  <div 
                    className={`payment-method-option ${paymentSettings.preferredMethod === 'bank' ? 'active' : ''}`}
                    onClick={() => setPaymentSettings({...paymentSettings, preferredMethod: 'bank'})}
                  >
                    <div className="method-icon">🏦</div>
                    <div className="method-name">Bank Transfer</div>
                  </div>
                  <div 
                    className={`payment-method-option ${paymentSettings.preferredMethod === 'bkash' ? 'active' : ''}`}
                    onClick={() => setPaymentSettings({...paymentSettings, preferredMethod: 'bkash'})}
                  >
                    <div className="method-icon">
                      <img src="/images/payment/bkash.svg" alt="bKash" className="wallet-icon" />
                    </div>
                    <div className="method-name">bKash</div>
                  </div>
                  <div 
                    className={`payment-method-option ${paymentSettings.preferredMethod === 'nagad' ? 'active' : ''}`}
                    onClick={() => setPaymentSettings({...paymentSettings, preferredMethod: 'nagad'})}
                  >
                    <div className="method-icon">
                      <img src="/images/payment/nagad.svg" alt="Nagad" className="wallet-icon" />
                    </div>
                    <div className="method-name">Nagad</div>
                  </div>
                  <div 
                    className={`payment-method-option ${paymentSettings.preferredMethod === 'rocket' ? 'active' : ''}`}
                    onClick={() => setPaymentSettings({...paymentSettings, preferredMethod: 'rocket'})}
                  >
                    <div className="method-icon">
                      <img src="/images/payment/rocket.svg" alt="Rocket" className="wallet-icon" />
                    </div>
                    <div className="method-name">Rocket</div>
                  </div>
                </div>
              </div>
              
              {paymentSettings.preferredMethod === 'bank' && (
                <div className="bank-details-section">
                  <h4>Bank Account Details</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Bank Name</label>
                      <input 
                        type="text" 
                        name="bankDetails.bankName" 
                        value={paymentSettings.bankDetails.bankName}
                        onChange={handlePaymentSettingsChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Account Number</label>
                      <input 
                        type="text" 
                        name="bankDetails.accountNumber" 
                        value={paymentSettings.bankDetails.accountNumber}
                        onChange={handlePaymentSettingsChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Account Holder Name</label>
                      <input 
                        type="text" 
                        name="bankDetails.accountName" 
                        value={paymentSettings.bankDetails.accountName}
                        onChange={handlePaymentSettingsChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Branch</label>
                      <input 
                        type="text" 
                        name="bankDetails.branch" 
                        value={paymentSettings.bankDetails.branch}
                        onChange={handlePaymentSettingsChange}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentSettings.preferredMethod === 'bkash' && (
                <div className="mobile-banking-section">
                  <h4>bKash Details</h4>
                  <div className="form-group">
                    <label>bKash Number</label>
                    <input 
                      type="text" 
                      name="bkashNumber" 
                      value={paymentSettings.bkashNumber}
                      onChange={handlePaymentSettingsChange}
                      placeholder="01XXXXXXXXX"
                    />
                    <p className="field-hint">Enter the bKash number where you want to receive payments</p>
                  </div>
                </div>
              )}
              
              {paymentSettings.preferredMethod === 'nagad' && (
                <div className="mobile-banking-section">
                  <h4>Nagad Details</h4>
                  <div className="form-group">
                    <label>Nagad Number</label>
                    <input 
                      type="text" 
                      name="nagadNumber" 
                      value={paymentSettings.nagadNumber}
                      onChange={handlePaymentSettingsChange}
                      placeholder="01XXXXXXXXX"
                    />
                    <p className="field-hint">Enter the Nagad number where you want to receive payments</p>
                  </div>
                </div>
              )}
              
              {paymentSettings.preferredMethod === 'rocket' && (
                <div className="mobile-banking-section">
                  <h4>Rocket Details</h4>
                  <div className="form-group">
                    <label>Rocket Number</label>
                    <input 
                      type="text" 
                      name="rocketNumber" 
                      value={paymentSettings.rocketNumber}
                      onChange={handlePaymentSettingsChange}
                      placeholder="01XXXXXXXXX"
                    />
                    <p className="field-hint">Enter the Rocket number where you want to receive payments</p>
                  </div>
                </div>
              )}
              
              <div className="settings-section-divider"></div>
              
              <h4>Withdrawal Settings</h4>
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Automatic Withdrawal</h4>
                  <p>Automatically withdraw earnings to your preferred payment method</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    name="automaticWithdrawal"
                    checked={paymentSettings.automaticWithdrawal}
                    onChange={handlePaymentSettingsChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              
              {paymentSettings.automaticWithdrawal && (
                <div className="form-group">
                  <label>Withdrawal Frequency</label>
                  <select 
                    name="withdrawalFrequency" 
                    value={paymentSettings.withdrawalFrequency}
                    onChange={handlePaymentSettingsChange}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <p className="field-hint">How often your earnings should be automatically withdrawn</p>
                </div>
              )}
              
              <div className="info-box">
                <div className="info-icon">ℹ️</div>
                <div className="info-content">
                  <p>You can change your preferred payment method at any time. Please ensure your payment details are accurate to avoid delays in receiving your earnings.</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="settings-section">
            <h3>Security</h3>
            <p className="settings-description">Manage your account security and login preferences.</p>
            
            <div className="settings-form">
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Change Password</h4>
                  <p>Update your account password</p>
                </div>
                <button 
                  className="secondary-btn"
                  onClick={() => setShowChangePasswordModal(true)}
                >
                  Change
                </button>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    name="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onChange={handleSecuritySettingsChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              
              <div className="notification-setting">
                <div className="notification-info">
                  <h4>Biometric Login</h4>
                  <p>Use fingerprint or face recognition to login</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    name="biometricLogin"
                    checked={securitySettings.biometricLogin}
                    onChange={handleSecuritySettingsChange}
                  />
                  <span className="slider round"></span>
                </label>
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
                <p className="field-hint">Automatically log out after a period of inactivity</p>
              </div>
              
              <div className="info-box">
                <div className="info-icon">🔒</div>
                <div className="info-content">
                  <p><strong>Last password change:</strong> {new Date(securitySettings.lastPasswordChange).toLocaleDateString()}</p>
                  <p>For security reasons, consider changing your password every 3 months.</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'documents':
        return (
          <div className="settings-section">
            <h3>Documents</h3>
            <p className="settings-description">Manage your documents and verification status.</p>
            
            <div className="documents-grid">
              {documents.map((doc) => (
                <div key={doc.id} className="document-item">
                  <div className="document-icon">
                    <i className={`fas ${doc.id === 1 ? 'fa-id-card' : 
                                doc.id === 2 ? 'fa-car' : 
                                doc.id === 3 ? 'fa-file-contract' : 
                                'fa-shield-alt'}`}></i>
                  </div>
                  <div className="document-info">
                    <span className="document-name">{doc.name}</span>
                    <span className="document-status verified">Verified</span>
                  </div>
                  <button 
                    className="view-btn"
                    onClick={() => handleViewDocument(doc)}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="upload-document-section">
              <h4>Upload New Document</h4>
              <p>Supported formats: JPG, PNG, PDF (Max size: 5MB)</p>
              <div className="upload-options">
                <button className="secondary-btn">
                  <i className="fas fa-plus"></i> Upload Document
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="settings-section">
            <h3>Account History</h3>
            <p className="settings-description">View your account milestones and achievements.</p>
            
            <div className="history-list">
              {accountHistory.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-icon">
                    <i className={`fas fa-${item.icon}`}></i>
                  </div>
                  <div className="history-info">
                    <span className="history-title">{item.title}</span>
                    <span className="history-date">{item.date}</span>
                  </div>
                </div>
              ))}
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
        <h2>Settings</h2>
      </div>
      
      <div className="settings-container">
        <div className="settings-sidebar">
          <ul className="settings-menu">
            <li 
              className={activeSection === 'profile' ? 'active' : ''}
              onClick={() => setActiveSection('profile')}
            >
              <span className="settings-icon">👤</span>
              Personal Information
            </li>
            <li 
              className={activeSection === 'vehicle' ? 'active' : ''}
              onClick={() => setActiveSection('vehicle')}
            >
              <span className="settings-icon">🛵</span>
              Vehicle Information
            </li>
            <li 
              className={activeSection === 'work' ? 'active' : ''}
              onClick={() => setActiveSection('work')}
            >
              <span className="settings-icon">📅</span>
              Work Preferences
            </li>
            <li 
              className={activeSection === 'documents' ? 'active' : ''}
              onClick={() => setActiveSection('documents')}
            >
              <span className="settings-icon">📄</span>
              Documents
            </li>
            <li 
              className={activeSection === 'notifications' ? 'active' : ''}
              onClick={() => setActiveSection('notifications')}
            >
              <span className="settings-icon">🔔</span>
              Notifications
            </li>
            <li 
              className={activeSection === 'app' ? 'active' : ''}
              onClick={() => setActiveSection('app')}
            >
              <span className="settings-icon">📱</span>
              App Settings
            </li>
            <li 
              className={activeSection === 'payment' ? 'active' : ''}
              onClick={() => setActiveSection('payment')}
            >
              <span className="settings-icon">💰</span>
              Payment Details
            </li>
            <li 
              className={activeSection === 'security' ? 'active' : ''}
              onClick={() => setActiveSection('security')}
            >
              <span className="settings-icon">🔒</span>
              Security
            </li>
            <li 
              className={activeSection === 'history' ? 'active' : ''}
              onClick={() => setActiveSection('history')}
            >
              <span className="settings-icon">📜</span>
              Account History
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

      {showChangePasswordModal && (
        <ChangePasswordModal onClose={() => setShowChangePasswordModal(false)} />
      )}

      {showDocumentViewModal && selectedDocument && (
        <DocumentViewModal 
          document={selectedDocument} 
          onClose={() => setShowDocumentViewModal(false)} 
        />
      )}

      {showAreasModal && (
        <div className="modal-overlay">
          <div className="modal-content areas-modal">
            <div className="modal-header">
              <h3>Edit Preferred Areas</h3>
              <button 
                className="close-button"
                onClick={() => setShowAreasModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="areas-search">
                <input 
                  type="text" 
                  placeholder="Search areas..." 
                  className="search-input"
                />
              </div>
              <div className="areas-list">
                {['Gulshan', 'Banani', 'Dhanmondi', 'Uttara', 'Mohammadpur', 
                  'Mirpur', 'Motijheel', 'Farmgate', 'Tejgaon', 'Wari'].map(area => (
                  <div 
                    key={area} 
                    className={`area-option ${workPreferences.preferredAreas.includes(area) ? 'selected' : ''}`}
                    onClick={() => handleAreaSelect(area)}
                  >
                    <span className="area-name">{area}</span>
                    {workPreferences.preferredAreas.includes(area) && (
                      <i className="fas fa-check"></i>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-button"
                onClick={() => setShowAreasModal(false)}
              >
                Cancel
              </button>
              <button 
                className="save-button"
                onClick={handleSaveAreas}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Cash Collection Tab Component
const CashCollectionTab = () => {
  const [cashCollections, setCashCollections] = useState([
    {
      date: '2024-04-16',
      orders: [
        { id: 'ORD-8521', amount: 250, status: 'collected', time: '10:30 AM', paymentType: 'cod' },
        { id: 'ORD-8519', amount: 320, status: 'collected', time: '11:45 AM', paymentType: 'online' },
        { id: 'ORD-8515', amount: 380, status: 'collected', time: '02:15 PM', paymentType: 'cod' }
      ],
      totalCollected: 630,
      totalAmount: 950,
      returned: 630,
      remaining: 0
    },
    {
      date: '2024-04-15',
      orders: [
        { id: 'ORD-8512', amount: 280, status: 'collected', time: '09:20 AM', paymentType: 'cod' },
        { id: 'ORD-8510', amount: 420, status: 'collected', time: '01:30 PM', paymentType: 'online' }
      ],
      totalCollected: 280,
      totalAmount: 700,
      returned: 280,
      remaining: 0
    },
    {
      date: '2024-04-14',
      orders: [
        { id: 'ORD-8508', amount: 350, status: 'collected', time: '10:15 AM', paymentType: 'cod' },
        { id: 'ORD-8505', amount: 290, status: 'collected', time: '11:30 AM', paymentType: 'online' },
        { id: 'ORD-8502', amount: 410, status: 'collected', time: '03:45 PM', paymentType: 'cod' }
      ],
      totalCollected: 760,
      totalAmount: 1050,
      returned: 710,
      remaining: 50
    }
  ]);

  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [returnAmount, setReturnAmount] = useState('');

  const handleReturnCash = (date) => {
    const collection = cashCollections.find(c => c.date === date);
    if (collection) {
      setSelectedDate(date);
      setReturnAmount(collection.remaining.toString());
      setShowReturnModal(true);
    }
  };

  const handleSubmitReturn = () => {
    setCashCollections(cashCollections.map(collection => {
      if (collection.date === selectedDate) {
        return {
          ...collection,
          returned: collection.returned + Number(returnAmount),
          remaining: collection.remaining - Number(returnAmount)
        };
      }
      return collection;
    }));
    setShowReturnModal(false);
    setSelectedDate('');
    setReturnAmount('');
  };

  const ReturnModal = () => (
    <div className="modal-overlay">
      <div className="return-modal">
        <div className="modal-header">
          <h3>Return Cash Collection</h3>
          <button className="close-btn" onClick={() => setShowReturnModal(false)}>×</button>
        </div>
        <div className="modal-content">
          <div className="form-group">
            <label>Date</label>
            <div className="date-display">{selectedDate}</div>
          </div>
          <div className="form-group">
            <label>Amount to Return</label>
            <input
              type="number"
              value={returnAmount}
              onChange={(e) => setReturnAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="secondary-btn" onClick={() => setShowReturnModal(false)}>Cancel</button>
          <button 
            className="primary-btn" 
            onClick={handleSubmitReturn}
            disabled={!returnAmount || Number(returnAmount) <= 0}
          >
            Return Cash
          </button>
        </div>
      </div>
    </div>
  );

  // Calculate COD amounts for a collection
  const calculateCODAmount = (orders) => {
    return orders.reduce((total, order) => {
      return order.paymentType === 'cod' ? total + order.amount : total;
    }, 0);
  };

  // Calculate summary statistics
  const today = new Date().toISOString().split('T')[0];
  const todayCollection = cashCollections.find(c => c.date === today) || { 
    orders: [],
    totalCollected: 0,
    totalAmount: 0,
    returned: 0,
    remaining: 0
  };

  const thisWeek = cashCollections
    .filter(c => {
      const date = new Date(c.date);
      const today = new Date();
      const diffTime = Math.abs(today - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    })
    .reduce((acc, curr) => ({
      orders: [...acc.orders, ...curr.orders],
      totalCollected: acc.totalCollected + calculateCODAmount(curr.orders),
      totalAmount: acc.totalAmount + curr.totalAmount,
      returned: acc.returned + curr.returned,
      remaining: acc.remaining + curr.remaining
    }), { orders: [], totalCollected: 0, totalAmount: 0, returned: 0, remaining: 0 });

  const thisMonth = cashCollections
    .filter(c => {
      const date = new Date(c.date);
      const today = new Date();
      return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    })
    .reduce((acc, curr) => ({
      orders: [...acc.orders, ...curr.orders],
      totalCollected: acc.totalCollected + calculateCODAmount(curr.orders),
      totalAmount: acc.totalAmount + curr.totalAmount,
      returned: acc.returned + curr.returned,
      remaining: acc.remaining + curr.remaining
    }), { orders: [], totalCollected: 0, totalAmount: 0, returned: 0, remaining: 0 });

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Cash Collection</h2>
      </div>

      <div className="cash-collection-summary">
        <div className="summary-card">
          <h3>Today's Collection</h3>
          <div className="summary-value">৳{calculateCODAmount(todayCollection.orders)}</div>
          <div className="summary-subtext">
            Total Amount: ৳{todayCollection.totalAmount}
          </div>
          <div className="summary-subtext">
            Returned: ৳{todayCollection.returned} | Remaining: ৳{todayCollection.remaining}
          </div>
        </div>
        <div className="summary-card">
          <h3>This Week</h3>
          <div className="summary-value">৳{thisWeek.totalCollected}</div>
          <div className="summary-subtext">
            Total Amount: ৳{thisWeek.totalAmount}
          </div>
          <div className="summary-subtext">
            Returned: ৳{thisWeek.returned} | Remaining: ৳{thisWeek.remaining}
          </div>
        </div>
        <div className="summary-card">
          <h3>This Month</h3>
          <div className="summary-value">৳{thisMonth.totalCollected}</div>
          <div className="summary-subtext">
            Total Amount: ৳{thisMonth.totalAmount}
          </div>
          <div className="summary-subtext">
            Returned: ৳{thisMonth.returned} | Remaining: ৳{thisMonth.remaining}
          </div>
        </div>
      </div>

      <div className="cash-collection-list">
        {cashCollections.map((collection) => (
          <div key={collection.date} className="collection-card">
            <div className="collection-header">
              <div className="collection-date">{collection.date}</div>
              <div className="collection-amount">
                <span className="amount-label">Cash Collected:</span>
                <span className="amount-value">৳{collection.totalCollected}</span>
                <span className="amount-label total-amount-label">Total Amount:</span>
                <span className="amount-value total-amount-value">৳{collection.totalAmount}</span>
              </div>
            </div>
            
            <div className="collection-details">
              <div className="detail-item">
                <span className="detail-label">Orders</span>
                <span className="detail-value">{collection.orders.length}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Returned</span>
                <span className="detail-value">৳{collection.returned}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Remaining</span>
                <span className="detail-value">৳{collection.remaining}</span>
              </div>
            </div>

            <div className="collection-orders">
              <h4>Order Details</h4>
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Order ID</th>
                    <th>Amount</th>
                    <th>Payment Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {collection.orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <div className="order-time">
                          <span className="order-date">{collection.date}</span>
                          <span className="order-time-value">{order.time}</span>
                        </div>
                      </td>
                      <td>{order.id}</td>
                      <td>৳{order.amount}</td>
                      <td>
                        <span className={`payment-type ${order.paymentType}`}>
                          {order.paymentType === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${order.paymentType}`}>
                          {order.paymentType === 'cod' ? 'Cash Collected' : 'Delivered'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="total-label">Total Orders: {collection.orders.length}</td>
                    <td className="total-amount">
                      <div>Cash Collected: ৳{collection.totalCollected}</div>
                      <div>Total Amount: ৳{collection.totalAmount}</div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {collection.remaining > 0 && (
              <div className="collection-actions">
                <button 
                  className="primary-btn"
                  onClick={() => handleReturnCash(collection.date)}
                >
                  Return Cash
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showReturnModal && <ReturnModal />}
    </div>
  );
};

// Sample return pickup data
const returnPickups = [
  {
    id: 'RETP-101',
    returnId: 'RET-1002',
    customer: {
      name: 'Nasreen Ahmed',
      phone: '01712-987654',
      address: 'House 12, Road 5, Gulshan-1, Dhaka',
      coordinates: { lat: 23.7925, lng: 90.4078 }
    },
    store: {
      name: 'Fresh Foods Market',
      address: 'Shop 7, City Center Mall, Dhanmondi, Dhaka',
      phone: '01812-345678'
    },
    pickupDate: '2023-06-18',
    timeSlot: '10:00 AM - 12:00 PM',
    items: [
      { name: 'Premium Rice (5kg)', quantity: 1 }
    ],
    instructions: 'Call customer 15 minutes before arrival',
    status: 'pending',
    hasCustomerSignature: false,
    distance: 5.2,
    earning: 120
  },
  {
    id: 'RETP-102',
    returnId: 'RET-1005',
    customer: {
      name: 'Imtiaz Rahman',
      phone: '01512-678901',
      address: 'Flat 3A, Tower 2, Bashundhara R/A, Dhaka',
      coordinates: { lat: 23.8219, lng: 90.4525 }
    },
    store: {
      name: 'Electronics Hub',
      address: 'Shop 15, Eastern Plaza, Dhaka',
      phone: '01912-345678'
    },
    pickupDate: '2023-06-18',
    timeSlot: '2:00 PM - 4:00 PM',
    items: [
      { name: 'Bluetooth Headphones', quantity: 1 }
    ],
    instructions: 'Fragile item, handle with care',
    status: 'in-progress',
    hasCustomerSignature: false,
    distance: 7.8,
    earning: 150
  },
  {
    id: 'RETP-100',
    returnId: 'RET-1001',
    customer: {
      name: 'Mohammad Hasan',
      phone: '01912-456789',
      address: 'Flat 5A, Tower 3, Bashundhara R/A, Dhaka',
      coordinates: { lat: 23.8219, lng: 90.4525 }
    },
    store: {
      name: 'Mia Grocery Store',
      address: 'Shop 12, New Market, Dhaka',
      phone: '01712-987654'
    },
    pickupDate: '2023-06-16',
    timeSlot: '10:00 AM - 12:00 PM',
    items: [
      { name: 'Chicken (whole)', quantity: 2 }
    ],
    instructions: '',
    status: 'completed',
    completedAt: '2023-06-16 11:30 AM',
    hasCustomerSignature: true,
    distance: 4.5,
    earning: 100
  }
];

// Return Pickups Tab Component
const ReturnPickupsTab = () => {
  const [pickups, setPickups] = useState(returnPickups);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState('');
  const [filterDate, setFilterDate] = useState(new Date());
  const [customerSignature, setCustomerSignature] = useState('');
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const { texts } = useLanguage();
  
  const signatureRef = useRef();
  
  useEffect(() => {
    filterPickups();
  }, [activeFilter, filterDate]);
  
  const filterPickups = () => {
    // Implementation would filter pickups based on activeFilter and filterDate
    // For demo, we'll just use the sample data
  };
  
  const handleAcceptPickup = (pickup) => {
    setSelectedPickup(pickup);
    setConfirmationAction('accept');
    setShowConfirmationModal(true);
  };
  
  const handleStartPickup = (pickup) => {
    setSelectedPickup(pickup);
    setConfirmationAction('start');
    setShowConfirmationModal(true);
  };
  
  const handleCompletePickup = (pickup) => {
    setSelectedPickup(pickup);
    setShowSignatureModal(true);
  };
  
  const handleDetailsView = (pickup) => {
    setSelectedPickup(pickup);
    setShowDetailsModal(true);
  };
  
  const handleConfirmAction = () => {
    const updatedPickups = pickups.map(pickup => {
      if (pickup.id === selectedPickup.id) {
        if (confirmationAction === 'accept') {
          return { ...pickup, status: 'accepted' };
        } else if (confirmationAction === 'start') {
          return { ...pickup, status: 'in-progress' };
        }
      }
      return pickup;
    });
    
    setPickups(updatedPickups);
    setShowConfirmationModal(false);
    setSelectedPickup(null);
  };
  
  const handleConfirmSignature = () => {
    // In a real app, you'd save the signature image
    const updatedPickups = pickups.map(pickup => {
      if (pickup.id === selectedPickup.id) {
        return { 
          ...pickup, 
          status: 'completed', 
          completedAt: new Date().toLocaleString(),
          hasCustomerSignature: true 
        };
      }
      return pickup;
    });
    
    setPickups(updatedPickups);
    setShowSignatureModal(false);
    setSelectedPickup(null);
    setCustomerSignature('');
  };
  
  const clearSignature = () => {
    signatureRef.current.clear();
    setCustomerSignature('');
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'accepted':
        return 'Accepted';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'accepted':
        return 'status-accepted';
      case 'in-progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Return Pickups</h2>
        <div className="filter-actions">
          <div className="date-filter">
            <DatePicker
              selected={filterDate}
              onChange={date => setFilterDate(date)}
              dateFormat="MMMM d, yyyy"
              className="date-picker"
            />
          </div>
          <div className="status-filter">
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
              className={`filter-btn ${activeFilter === 'accepted' ? 'active' : ''}`}
              onClick={() => setActiveFilter('accepted')}
            >
              Accepted
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'in-progress' ? 'active' : ''}`}
              onClick={() => setActiveFilter('in-progress')}
            >
              In Progress
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
      
      <div className="return-pickups-list">
        {pickups.length > 0 ? (
          pickups.map(pickup => (
            <div key={pickup.id} className={`pickup-card ${getStatusClass(pickup.status)}`}>
              <div className="pickup-header">
                <div className="pickup-id">{pickup.id}</div>
                <div className={`pickup-status ${getStatusClass(pickup.status)}`}>
                  {getStatusLabel(pickup.status)}
                </div>
              </div>
              
              <div className="pickup-details">
                <div className="pickup-info">
                  <div className="info-row">
                    <span className="info-label">Customer:</span>
                    <span className="info-value">{pickup.customer.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Address:</span>
                    <span className="info-value">{pickup.customer.address}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Date:</span>
                    <span className="info-value">{formatDate(pickup.pickupDate)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Time:</span>
                    <span className="info-value">{pickup.timeSlot}</span>
                  </div>
                </div>
                
                <div className="pickup-stats">
                  <div className="stat-item">
                    <div className="stat-value">{pickup.distance} km</div>
                    <div className="stat-label">Distance</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">৳ {pickup.earning}</div>
                    <div className="stat-label">Earning</div>
                  </div>
                </div>
              </div>
              
              <div className="pickup-actions">
                <button 
                  className="view-details-btn"
                  onClick={() => handleDetailsView(pickup)}
                >
                  View Details
                </button>
                
                {pickup.status === 'pending' && (
                  <button 
                    className="accept-btn"
                    onClick={() => handleAcceptPickup(pickup)}
                  >
                    Accept
                  </button>
                )}
                
                {pickup.status === 'accepted' && (
                  <button 
                    className="start-btn"
                    onClick={() => handleStartPickup(pickup)}
                  >
                    Start Pickup
                  </button>
                )}
                
                {pickup.status === 'in-progress' && (
                  <button 
                    className="complete-btn"
                    onClick={() => handleCompletePickup(pickup)}
                  >
                    Complete Pickup
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-pickups-message">
            <p>No return pickups available for the selected date and filter.</p>
          </div>
        )}
      </div>
      
      {/* Pickup Details Modal */}
      {showDetailsModal && selectedPickup && (
        <div className="modal-overlay">
          <div className="modal-container pickup-details-modal">
            <div className="modal-header">
              <h2>Return Pickup Details</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedPickup(null);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="detail-header">
                <div>
                  <h3>Pickup ID: {selectedPickup.id}</h3>
                  <p>Return ID: {selectedPickup.returnId}</p>
                </div>
                <div className={`detail-status ${getStatusClass(selectedPickup.status)}`}>
                  {getStatusLabel(selectedPickup.status)}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>Customer Information</h4>
                <div className="detail-row">
                  <div className="detail-label">Name:</div>
                  <div className="detail-value">{selectedPickup.customer.name}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Phone:</div>
                  <div className="detail-value">
                    <a href={`tel:${selectedPickup.customer.phone}`}>{selectedPickup.customer.phone}</a>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Address:</div>
                  <div className="detail-value">{selectedPickup.customer.address}</div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>Store Information</h4>
                <div className="detail-row">
                  <div className="detail-label">Store Name:</div>
                  <div className="detail-value">{selectedPickup.store.name}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Store Address:</div>
                  <div className="detail-value">{selectedPickup.store.address}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Store Phone:</div>
                  <div className="detail-value">
                    <a href={`tel:${selectedPickup.store.phone}`}>{selectedPickup.store.phone}</a>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>Pickup Details</h4>
                <div className="detail-row">
                  <div className="detail-label">Date:</div>
                  <div className="detail-value">{formatDate(selectedPickup.pickupDate)}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Time Slot:</div>
                  <div className="detail-value">{selectedPickup.timeSlot}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Distance:</div>
                  <div className="detail-value">{selectedPickup.distance} km</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Earning:</div>
                  <div className="detail-value">৳ {selectedPickup.earning}</div>
                </div>
                {selectedPickup.status === 'completed' && (
                  <div className="detail-row">
                    <div className="detail-label">Completed At:</div>
                    <div className="detail-value">{selectedPickup.completedAt}</div>
                  </div>
                )}
                {selectedPickup.instructions && (
                  <div className="detail-row">
                    <div className="detail-label">Instructions:</div>
                    <div className="detail-value">{selectedPickup.instructions}</div>
                  </div>
                )}
              </div>
              
              <div className="detail-section">
                <h4>Return Items</h4>
                <ul className="items-list">
                  {selectedPickup.items.map((item, index) => (
                    <li key={index}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              
              {selectedPickup.status === 'completed' && selectedPickup.hasCustomerSignature && (
                <div className="detail-section">
                  <h4>Customer Signature</h4>
                  <div className="signature-container">
                    <div className="signature-image">
                      <img src="/images/signature-placeholder.png" alt="Customer Signature" />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="detail-actions">
                <button 
                  className="close-btn"
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedPickup(null);
                  }}
                >
                  Close
                </button>
                
                {selectedPickup.status === 'pending' && (
                  <button 
                    className="accept-btn"
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleAcceptPickup(selectedPickup);
                    }}
                  >
                    Accept Pickup
                  </button>
                )}
                
                {selectedPickup.status === 'accepted' && (
                  <button 
                    className="start-btn"
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleStartPickup(selectedPickup);
                    }}
                  >
                    Start Pickup
                  </button>
                )}
                
                {selectedPickup.status === 'in-progress' && (
                  <button 
                    className="complete-btn"
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleCompletePickup(selectedPickup);
                    }}
                  >
                    Complete Pickup
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Confirmation Modal */}
      {showConfirmationModal && selectedPickup && (
        <div className="modal-overlay">
          <div className="modal-container confirmation-modal">
            <div className="modal-header">
              <h2>
                {confirmationAction === 'accept' 
                  ? 'Accept Return Pickup' 
                  : 'Start Return Pickup'}
              </h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowConfirmationModal(false);
                  setSelectedPickup(null);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="confirmation-message">
                {confirmationAction === 'accept' 
                  ? 'Are you sure you want to accept this return pickup?' 
                  : 'Are you ready to start this return pickup?'}
              </div>
              
              <div className="pickup-summary">
                <div className="summary-row">
                  <span className="summary-label">Pickup ID:</span>
                  <span className="summary-value">{selectedPickup.id}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Customer:</span>
                  <span className="summary-value">{selectedPickup.customer.name}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Address:</span>
                  <span className="summary-value">{selectedPickup.customer.address}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Date & Time:</span>
                  <span className="summary-value">
                    {formatDate(selectedPickup.pickupDate)} ({selectedPickup.timeSlot})
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Earning:</span>
                  <span className="summary-value">৳ {selectedPickup.earning}</span>
                </div>
              </div>
              
              <div className="confirmation-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => {
                    setShowConfirmationModal(false);
                    setSelectedPickup(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className={confirmationAction === 'accept' ? 'accept-btn' : 'start-btn'}
                  onClick={handleConfirmAction}
                >
                  {confirmationAction === 'accept' ? 'Accept Pickup' : 'Start Pickup'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Signature Modal */}
      {showSignatureModal && selectedPickup && (
        <div className="modal-overlay">
          <div className="modal-container signature-modal">
            <div className="modal-header">
              <h2>Customer Signature</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowSignatureModal(false);
                  setSelectedPickup(null);
                  setCustomerSignature('');
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <p className="signature-prompt">
                Please ask the customer to sign below to confirm the return pickup:
              </p>
              
              <div className="signature-pad-container">
                {/* In a real app, this would be a signature pad component */}
                <div className="signature-pad">
                  <div className="signature-placeholder">
                    [Signature will appear here]
                  </div>
                </div>
              </div>
              
              <div className="signature-actions">
                <button 
                  className="clear-btn"
                  onClick={clearSignature}
                >
                  Clear
                </button>
                <button 
                  className="complete-btn"
                  onClick={handleConfirmSignature}
                >
                  Complete Pickup
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
const RiderDashboard = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [notifications, setNotifications] = useState([
    // ... existing notifications
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { texts } = useLanguage();

  useEffect(() => {
    // Extract the last part of the path as the active tab
    const path = location.pathname.split('/').pop();
    if (path && path !== 'rider') {
      setActiveTab(path);
    } else {
      setActiveTab('available');
      navigate('/rider/available');
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
    <div className="rider-dashboard">
      <Navbar />
      
      <div className="dashboard-header">
        <div className="dashboard-header-container">
          <div className="dashboard-welcome">
            <h1>Welcome back, Abdul</h1>
            <p>Here's what's happening with your deliveries today</p>
          </div>
          <div className="header-actions">
            <NotificationDropdown 
              notifications={notifications} 
              onMarkAsRead={handleMarkAsRead}
              onClearAll={handleClearAll}
            />
            <div className="profile-container">
              <div className="profile-image">AR</div>
              <div className="profile-name">Abdul Rahman</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-tabs">
          <Link 
            to="/rider/available" 
            className={`tab-btn ${activeTab === 'available' ? 'active' : ''}`}
          >
            Available Orders
          </Link>
          <Link 
            to="/rider/deliveries" 
            className={`tab-btn ${activeTab === 'deliveries' ? 'active' : ''}`}
          >
            My Deliveries
          </Link>
          <Link 
            to="/rider/return-pickups" 
            className={`tab-btn ${activeTab === 'return-pickups' ? 'active' : ''}`}
          >
            Return Pickups
          </Link>
          <Link 
            to="/rider/earnings" 
            className={`tab-btn ${activeTab === 'earnings' ? 'active' : ''}`}
          >
            {texts.dashboard.common.earnings}
          </Link>
          <Link 
            to="/rider/cash-collection" 
            className={`tab-btn ${activeTab === 'cash-collection' ? 'active' : ''}`}
          >
            Cash Collection
          </Link>
          <Link 
            to="/rider/settings" 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          >
            {texts.dashboard.common.settings}
          </Link>
        </div>
        
        <Routes>
          <Route path="available" element={<AvailableOrdersTab />} />
          <Route path="deliveries" element={<MyDeliveriesTab />} />
          <Route path="return-pickups" element={<ReturnPickupsTab />} />
          <Route path="earnings" element={<EarningsTab />} />
          <Route path="cash-collection" element={<CashCollectionTab />} />
          <Route path="settings" element={<SettingsTab />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
};

export default RiderDashboard; 