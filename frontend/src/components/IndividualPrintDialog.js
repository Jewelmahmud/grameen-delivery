import React, { useState } from 'react';
import { FaInfoCircle, FaTimes, FaMinus, FaPlus } from 'react-icons/fa';
import './PrintDialogs.css';

const IndividualPrintDialog = ({ onClose, onConfirm, order }) => {
  const [paperSize, setPaperSize] = useState('4x6');
  const [orientation, setOrientation] = useState('landscape');
  const [copies, setCopies] = useState(1);
  const [contentOptions, setContentOptions] = useState({
    includeQRCode: true,
    includeBarcode: true,
    includeLogo: true,
    includeInstructions: true
  });

  const handleContentOptionChange = (option) => {
    setContentOptions({
      ...contentOptions,
      [option]: !contentOptions[option]
    });
  };

  const handleCopiesChange = (increment) => {
    const newValue = copies + increment;
    if (newValue >= 1 && newValue <= 10) {
      setCopies(newValue);
    }
  };

  const handleConfirm = () => {
    onConfirm({
      paperSize,
      orientation,
      copies,
      contentOptions
    });
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
            <p>
              Printing delivery label for order #{order?.id || ''}
              {order?.customer?.name ? ` (${order.customer.name})` : ''}
            </p>
          </div>

          <div className="print-options-section">
            <h4>Paper Size</h4>
            <div className="option-group">
              <label className={`option-button ${paperSize === '4x6' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paperSize"
                  value="4x6"
                  checked={paperSize === '4x6'}
                  onChange={() => setPaperSize('4x6')}
                />
                4 × 6 inches
              </label>
              <label className={`option-button ${paperSize === '8.5x11' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paperSize"
                  value="8.5x11"
                  checked={paperSize === '8.5x11'}
                  onChange={() => setPaperSize('8.5x11')}
                />
                8.5 × 11 inches
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
            <h4>Number of Copies</h4>
            <div className="copies-control">
              <button 
                className="copies-btn" 
                onClick={() => handleCopiesChange(-1)}
                disabled={copies <= 1}
              >
                <FaMinus />
              </button>
              <span className="copies-count">{copies}</span>
              <button 
                className="copies-btn" 
                onClick={() => handleCopiesChange(1)}
                disabled={copies >= 10}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <div className="print-options-section">
            <h4>Content Options</h4>
            <div className="checkbox-group">
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={contentOptions.includeQRCode}
                  onChange={() => handleContentOptionChange('includeQRCode')}
                />
                Include QR code
              </label>
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={contentOptions.includeBarcode}
                  onChange={() => handleContentOptionChange('includeBarcode')}
                />
                Include barcode
              </label>
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={contentOptions.includeLogo}
                  onChange={() => handleContentOptionChange('includeLogo')}
                />
                Include company logo
              </label>
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={contentOptions.includeInstructions}
                  onChange={() => handleContentOptionChange('includeInstructions')}
                />
                Include delivery instructions
              </label>
            </div>
          </div>

          {order && (
            <div className="order-details-section">
              <h4>Order Summary</h4>
              <div className="order-details">
                <div className="summary-row">
                  <p>Customer:</p>
                  <p>{order.customer?.name || 'N/A'}</p>
                </div>
                <div className="summary-row">
                  <p>Address:</p>
                  <p>{order.customer?.address || 'N/A'}</p>
                </div>
                <div className="summary-row">
                  <p>Order Total:</p>
                  <p>${order.total?.toFixed(2) || '0.00'}</p>
                </div>
                <div className="summary-row">
                  <p>Status:</p>
                  <p className={`status-badge status-${order.status?.toLowerCase() || 'pending'}`}>
                    {order.status || 'Pending'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="print-dialog-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="print-btn" onClick={handleConfirm}>Print Label</button>
        </div>
      </div>
    </div>
  );
};

export default IndividualPrintDialog; 