import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import './PrintDialogs.css';

const DeliveryLabel = ({ order, isVisible, onClose }) => {
  const { t } = useTranslation();
  const [copies, setCopies] = useState(1);
  const labelRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => labelRef.current,
    onAfterPrint: () => {
      onClose();
      setCopies(1);
    },
  });

  const handleIncrementCopies = () => {
    if (copies < 5) setCopies(copies + 1);
  };

  const handleDecrementCopies = () => {
    if (copies > 1) setCopies(copies - 1);
  };

  if (!isVisible || !order) return null;

  // Generate a mock barcode representation
  const generateBarcodeLines = (id) => {
    const idString = String(id).padStart(10, '0');
    return '||||| ||| || | ||| | |||| || | || |||||';
  };

  return (
    <div className="print-dialog-overlay">
      <div className="print-dialog-container">
        <div className="print-dialog-header">
          <h3>{t('Delivery Label')}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="print-dialog-content" ref={labelRef}>
          {Array(copies).fill().map((_, index) => (
            <React.Fragment key={index}>
              {index > 0 && <hr className="print-divider" />}
              <div className="delivery-label">
                <div className="label-header">
                  <h4>Grameen Delivery</h4>
                  <span className="order-number">#{order.id}</span>
                </div>
                
                <div className="address-section">
                  <div className="address-block">
                    <div className="address-label">{t('From')}:</div>
                    <p>{order.seller?.name || 'Grameen Store'}</p>
                    <p>{order.seller?.address || '123 Market Street'}</p>
                    <p>{order.seller?.phone || '+880 1700-000000'}</p>
                  </div>
                  
                  <div className="address-block">
                    <div className="address-label">{t('To')}:</div>
                    <p>{order.customer?.name}</p>
                    <p>{order.customer?.address}</p>
                    <p>{order.customer?.phone}</p>
                  </div>
                </div>
                
                <div className="delivery-info">
                  <div className="info-item">
                    <span className="info-label">{t('Weight')}</span>
                    <span className="info-value">{order.weight || '0.5'} kg</span>
                  </div>
                  
                  <div className="info-item">
                    <span className="info-label">{t('Items')}</span>
                    <span className="info-value">{order.items?.length || '1'}</span>
                  </div>
                  
                  <div className="info-item">
                    <span className="info-label">{t('Priority')}</span>
                    <span className="info-value priority">{order.priority || 'Standard'}</span>
                  </div>
                  
                  <div className="info-item">
                    <span className="info-label">{t('Date')}</span>
                    <span className="info-value">
                      {new Date(order.createdAt || new Date()).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="barcode">
                  <div className="barcode-lines">{generateBarcodeLines(order.id)}</div>
                  <div className="barcode-number">{String(order.id).padStart(10, '0')}</div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        
        <div className="print-dialog-controls">
          <div className="copies-control">
            <span>{t('Copies')}:</span>
            <div className="copies-buttons">
              <button 
                onClick={handleDecrementCopies} 
                disabled={copies <= 1} 
                className="btn btn-sm btn-outline-secondary"
              >
                -
              </button>
              <span className="copies-count">{copies}</span>
              <button 
                onClick={handleIncrementCopies} 
                disabled={copies >= 5} 
                className="btn btn-sm btn-outline-secondary"
              >
                +
              </button>
            </div>
          </div>
          
          <button className="btn btn-primary" onClick={handlePrint}>
            {t('Print Label')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryLabel; 