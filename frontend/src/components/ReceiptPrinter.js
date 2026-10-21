import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import './PrintDialogs.css';

const ReceiptPrinter = ({ order, isVisible, onClose }) => {
  const { t } = useTranslation();
  const [copies, setCopies] = useState(1);
  const receiptRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="print-dialog-overlay">
      <div className="print-dialog-container">
        <div className="print-dialog-header">
          <h3>{t('Order Receipt')}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="print-dialog-content" ref={receiptRef}>
          {Array(copies).fill().map((_, index) => (
            <React.Fragment key={index}>
              {index > 0 && <hr className="print-divider" />}
              <div className="receipt">
                <div className="receipt-header">
                  <h4>Grameen Delivery</h4>
                  <div className="receipt-info">
                    <div>Order #{order.id}</div>
                    <div>{new Date(order.createdAt || new Date()).toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="customer-section">
                  <div>
                    <strong>{t('Customer')}:</strong> {order.customer?.name}
                  </div>
                  <div>
                    <strong>{t('Phone')}:</strong> {order.customer?.phone}
                  </div>
                  <div>
                    <strong>{t('Address')}:</strong> {order.customer?.address}
                  </div>
                </div>
                
                <div className="order-items">
                  <table>
                    <thead>
                      <tr>
                        <th>{t('Item')}</th>
                        <th>{t('Qty')}</th>
                        <th>{t('Price')}</th>
                        <th>{t('Total')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items?.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>{formatCurrency(item.price)}</td>
                          <td>{formatCurrency(item.price * item.quantity)}</td>
                        </tr>
                      )) || (
                        <tr>
                          <td colSpan="4">{t('No items found')}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                <div className="order-summary">
                  <div className="summary-row">
                    <span>{t('Subtotal')}:</span>
                    <span>{formatCurrency(order.subtotal || 0)}</span>
                  </div>
                  <div className="summary-row">
                    <span>{t('Delivery Fee')}:</span>
                    <span>{formatCurrency(order.deliveryFee || 0)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="summary-row discount">
                      <span>{t('Discount')}:</span>
                      <span>-{formatCurrency(order.discount || 0)}</span>
                    </div>
                  )}
                  <div className="summary-row total">
                    <span>{t('Total')}:</span>
                    <span>{formatCurrency(order.total || 0)}</span>
                  </div>
                </div>
                
                <div className="payment-info">
                  <div>
                    <strong>{t('Payment Method')}:</strong> {order.paymentMethod || 'Cash on Delivery'}
                  </div>
                  <div>
                    <strong>{t('Status')}:</strong> {order.status || 'Pending'}
                  </div>
                </div>
                
                <div className="receipt-footer">
                  <p>{t('Thank you for your order!')}</p>
                  <p>{t('For any questions, please contact us at')} support@grameendelivery.com</p>
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
            {t('Print Receipt')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPrinter; 