import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { QRCodeSVG } from 'qrcode.react';
import './DeliveryLabel.css';

const BatchLabelPrint = ({ orders, onClose }) => {
  const printRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: onClose,
  });

  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="delivery-label-modal">
      <div className="batch-label-container">
        <div className="modal-header">
          <h3>Batch Label Print ({orders.length} labels)</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="batch-label-content">
          <div className="batch-print-preview">
            <p>Ready to print {orders.length} delivery labels.</p>
            <p>Click "Print Labels" to continue or "Cancel" to go back.</p>
          </div>
          
          <div style={{ display: 'none' }}>
            <div ref={printRef}>
              {orders.map((order, index) => (
                <div key={order.id} className="delivery-label print-page-break">
                  <div className="label-header">
                    <img 
                      src="/images/logo.png" 
                      alt="Company Logo" 
                      className="label-logo" 
                    />
                    <div className="label-title">DELIVERY LABEL</div>
                  </div>
                  
                  <div className="label-order-info">
                    <div className="label-order-id">
                      <strong>Order ID:</strong> {order.id}
                    </div>
                    <div className="label-order-date">
                      <strong>Date:</strong> {formatDate(order.date)}
                    </div>
                  </div>
                  
                  <div className="label-address">
                    <div className="label-section-title">DELIVER TO:</div>
                    <div className="label-customer-name">{order.customer.name}</div>
                    <div className="label-customer-phone">{order.customer.phone}</div>
                    <div className="label-delivery-address">{order.deliveryAddress}</div>
                  </div>
                  
                  <div className="label-package-info">
                    <div className="label-section-title">PACKAGE INFO:</div>
                    <div className="label-items-count">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </div>
                    <div className="label-payment-status">
                      Payment: {order.paymentStatus === 'paid' ? 'PAID' : 'COLLECT ৳' + order.total}
                    </div>
                  </div>
                  
                  <div className="label-qr-code">
                    <QRCodeSVG 
                      value={`https://delivery-app.com/track/${order.id}`} 
                      size={80} 
                      level="H"
                    />
                  </div>
                  
                  <div className="label-instructions">
                    <p>Scan QR code to track delivery</p>
                    <p>Customer signature required upon delivery</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="print-btn" onClick={handlePrint}>
            Print Labels
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchLabelPrint; 