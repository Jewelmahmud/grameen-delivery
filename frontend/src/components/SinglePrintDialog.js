import React, { useState } from 'react';
import { FaTimes, FaInfoCircle } from 'react-icons/fa';
import './PrintDialogs.css';

const SinglePrintDialog = ({ isOpen, onClose, selectedOrder, onPrint }) => {
  const [paperSize, setPaperSize] = useState('label');
  const [orientation, setOrientation] = useState('portrait');
  const [copies, setCopies] = useState(1);
  const [includeOptions, setIncludeOptions] = useState({
    qrCode: true,
    barcode: true,
    logo: true,
    instructions: true
  });

  if (!isOpen || !selectedOrder) return null;

  const handleIncludeOptionChange = (option) => {
    setIncludeOptions({
      ...includeOptions,
      [option]: !includeOptions[option]
    });
  };

  const handlePrint = () => {
    const printConfig = {
      paperSize,
      orientation,
      copies,
      includeOptions,
      orderId: selectedOrder.id
    };

    onPrint(printConfig);
  };

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
          <h3>Print Delivery Label</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="print-dialog-content">
          <div className="print-dialog-info">
            <FaInfoCircle className="print-info-icon" />
            <p>Configure options for printing the delivery label for order #{selectedOrder.id}.</p>
          </div>
          
          {/* Order details */}
          <div className="selected-order-details">
            <div className="order-header">
              <h4>Order #{selectedOrder.id}</h4>
              <span className={`status-badge ${getStatusClassName(selectedOrder.status)}`}>
                {selectedOrder.status}
              </span>
            </div>
            
            <div className="order-details-grid">
              <div className="detail-item">
                <p className="detail-label">Customer</p>
                <p className="detail-value">{selectedOrder.customer.name}</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Phone</p>
                <p className="detail-value">{selectedOrder.customer.phone || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Address</p>
                <p className="detail-value">{selectedOrder.customer.address}</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Total</p>
                <p className="detail-value">${selectedOrder.total.toFixed(2)}</p>
              </div>
              {selectedOrder.deliveryNotes && (
                <div className="detail-item notes">
                  <p className="detail-label">Delivery Notes</p>
                  <p className="detail-value">{selectedOrder.deliveryNotes}</p>
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
            <h4>Copies</h4>
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
        </div>
        
        <div className="print-dialog-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="print-btn" onClick={handlePrint}>
            Print Label
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePrintDialog;

 