import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import '../styles/OrderTracking.css';
import LanguageTest from '../components/LanguageTest';

const OrderTracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [returnDescription, setReturnDescription] = useState('');
  const [returnImages, setReturnImages] = useState([]);
  const [returnSuccess, setReturnSuccess] = useState(false);
  const { texts } = useLanguage();

  // Fallback texts in case translations are missing
  const fallbackTexts = {
    orderPlaced: {
      status: 'Order Placed',
      description: 'Your order has been received and is being processed'
    },
    preparing: {
      status: 'Preparing',
      description: 'Your food is being prepared by our chefs'
    },
    outForDelivery: {
      status: 'Out for Delivery',
      description: 'Your order is on the way with our delivery partner'
    }
  };

  // Safe access to nested translation properties with fallbacks
  const getTranslation = (path, fallback) => {
    try {
      // Split the path into parts (e.g., "tracking.timeline.orderPlaced" -> ["tracking", "timeline", "orderPlaced"])
      const parts = path.split('.');
      let result = texts;
      
      // Navigate through the nested properties
      for (const part of parts) {
        if (result && typeof result === 'object' && part in result) {
          result = result[part];
        } else {
          return fallback;
        }
      }
      
      return result || fallback;
    } catch (error) {
      console.error(`Error accessing translation for path: ${path}`, error);
      return fallback;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setError(getTranslation('tracking.errors.emptyTrackingId', 'Please enter a tracking ID'));
      return;
    }

    setError('');
    setLoading(true);

    // Simulated API call to fetch tracking data
    setTimeout(() => {
      if (trackingId.toUpperCase() === 'DEMO123') {
        // Demo tracking information for testing
        setTrackingInfo({
          orderId: 'ORD-12345',
          trackingId: 'DEMO123',
          customerName: 'John Doe',
          orderDate: '2023-08-15',
          estimatedDelivery: '2023-08-18',
          status: 'transit',
          items: [
            { name: 'Italian Pizza', quantity: 2, price: 15.99 },
            { name: 'Garlic Breadsticks', quantity: 1, price: 5.99 }
          ],
          total: 37.97,
          timeline: [
            {
              date: '2023-08-15 10:30 AM',
              status: getTranslation('tracking.timeline.orderPlaced', fallbackTexts.orderPlaced.status),
              description: getTranslation('tracking.timelineDesc.orderPlaced', fallbackTexts.orderPlaced.description)
            },
            {
              date: '2023-08-15 10:45 AM',
              status: getTranslation('tracking.timeline.preparing', fallbackTexts.preparing.status),
              description: getTranslation('tracking.timelineDesc.preparing', fallbackTexts.preparing.description)
            },
            {
              date: '2023-08-15 11:15 AM',
              status: getTranslation('tracking.timeline.outForDelivery', fallbackTexts.outForDelivery.status),
              description: getTranslation('tracking.timelineDesc.outForDelivery', fallbackTexts.outForDelivery.description)
            }
          ],
          currentLocation: getTranslation('tracking.currentLocation', 'En route to delivery address'),
          deliveryPartner: 'Speedy Delivery',
          deliveryPersonName: 'Mike Johnson',
          deliveryPersonContact: '+1 (555) 123-4567'
        });
      } else {
        setError(getTranslation('tracking.errors.noOrderFound', 'No order found with the provided tracking ID. Try using DEMO123 for a demo.'));
        setTrackingInfo(null);
      }
      setLoading(false);
    }, 1500);
  };

  const handleReturnRequest = (e) => {
    e.preventDefault();
    // Show loading state
    setLoading(true);
    
    // Simulate API call to submit return request
    setTimeout(() => {
      setLoading(false);
      setReturnSuccess(true);
      
      // Update tracking info to show return requested
      setTrackingInfo({
        ...trackingInfo,
        status: 'return-requested',
        timeline: [
          ...trackingInfo.timeline,
          {
            date: new Date().toLocaleString(),
            status: getTranslation('tracking.timeline.returnRequested', 'Return Requested'),
            description: getTranslation('tracking.timelineDesc.returnRequested', 'Your return request has been submitted and is under review')
          }
        ]
      });
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowReturnModal(false);
        setReturnSuccess(false);
        setReturnReason('');
        setReturnDescription('');
        setReturnImages([]);
      }, 2000);
    }, 1500);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      // Only allow up to 3 images
      const newImages = files.slice(0, 3 - returnImages.length);
      
      // Create object URLs for preview
      const imageURLs = newImages.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setReturnImages([...returnImages, ...imageURLs]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...returnImages];
    // Release object URL to prevent memory leaks
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setReturnImages(newImages);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'placed':
        return 'status-placed';
      case 'picked':
        return 'status-picked';
      case 'transit':
        return 'status-transit';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      case 'return-requested':
        return 'status-return-requested';
      case 'return-approved':
        return 'status-return-approved';
      case 'return-in-progress':
        return 'status-return-in-progress';
      case 'return-completed':
        return 'status-return-completed';
      case 'return-rejected':
        return 'status-return-rejected';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'placed':
        return getTranslation('tracking.status.placed', 'Placed');
      case 'picked':
        return getTranslation('tracking.status.picked', 'Picked');
      case 'transit':
        return getTranslation('tracking.status.transit', 'In Transit');
      case 'delivered':
        return getTranslation('tracking.status.delivered', 'Delivered');
      case 'cancelled':
        return getTranslation('tracking.status.cancelled', 'Cancelled');
      case 'return-requested':
        return getTranslation('tracking.status.returnRequested', 'Return Requested');
      case 'return-approved':
        return getTranslation('tracking.status.returnApproved', 'Return Approved');
      case 'return-in-progress':
        return getTranslation('tracking.status.returnInProgress', 'Return in Progress');
      case 'return-completed':
        return getTranslation('tracking.status.returnCompleted', 'Return Completed');
      case 'return-rejected':
        return getTranslation('tracking.status.returnRejected', 'Return Rejected');
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="order-tracking-page">
      <Navbar />
      
      <div className="order-tracking-container">
        <div className="tracking-header">
          <h1>{getTranslation('tracking.title', 'Track Your Order')}</h1>
          <p>{getTranslation('tracking.subtitle', 'Enter your order tracking ID to get real-time updates on your delivery')}</p>
        </div>
        
        <div className="tracking-form-container">
          <form className="tracking-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="text" 
                className="tracking-input"
                placeholder={getTranslation('tracking.inputPlaceholder', 'Enter your tracking ID (e.g., DEMO123)')} 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
              <button 
                type="submit" 
                className="tracking-submit-btn"
                disabled={loading}
              >
                {loading 
                  ? getTranslation('tracking.trackingButton.loading', 'Tracking...') 
                  : getTranslation('tracking.trackingButton.default', 'Track Order')}
              </button>
            </div>
            {error && <p className="tracking-error">{error}</p>}
          </form>
        </div>
        
        {trackingInfo && (
          <div className="tracking-results">
            <div className="tracking-summary">
              <div>
                <h3>{getTranslation('tracking.orderId', 'Order ID')}</h3>
                <p>{trackingInfo.orderId}</p>
              </div>
              <div>
                <h3>{getTranslation('tracking.trackingId', 'Tracking ID')}</h3>
                <p>{trackingInfo.trackingId}</p>
              </div>
              <div>
                <h3>{getTranslation('tracking.orderDate', 'Order Date')}</h3>
                <p>{trackingInfo.orderDate}</p>
              </div>
              <div>
                <h3>{getTranslation('tracking.estimatedDelivery', 'Estimated Delivery')}</h3>
                <p>{trackingInfo.estimatedDelivery}</p>
              </div>
              <div className="tracking-status">
                <h3>{getTranslation('tracking.status.label', 'Status')}</h3>
                <p className={getStatusClass(trackingInfo.status)}>
                  {getStatusText(trackingInfo.status)}
                </p>
              </div>
            </div>
            
            <div className="tracking-details-container">
              <div className="tracking-timeline">
                <h3>{getTranslation('tracking.deliveryProgress', 'Delivery Progress')}</h3>
                <div className="timeline">
                  {trackingInfo.timeline.map((event, index) => (
                    <div className="timeline-item" key={index}>
                      <div className="timeline-marker"></div>
                      <div className="timeline-date">{event.date}</div>
                      <div className="timeline-title">{event.status}</div>
                      <div className="timeline-description">{event.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="tracking-details-card">
                <h2>{getTranslation('tracking.deliveryDetails', 'Delivery Details')}</h2>
                <ul>
                  <li><strong>{getTranslation('tracking.deliveryPartner', 'Delivery Partner')}:</strong> {trackingInfo.deliveryPartner}</li>
                  <li><strong>{getTranslation('tracking.deliveryPerson', 'Delivery Person')}:</strong> {trackingInfo.deliveryPersonName}</li>
                  <li><strong>{getTranslation('tracking.contact', 'Contact')}:</strong> {trackingInfo.deliveryPersonContact}</li>
                  <li><strong>{getTranslation('tracking.currentLocationLabel', 'Current Location')}:</strong> {trackingInfo.currentLocation}</li>
                </ul>
                
                {/* Return button for delivered orders */}
                {(trackingInfo.status === 'delivered' || trackingInfo.status === 'return-requested' || 
                  trackingInfo.status === 'return-approved' || trackingInfo.status === 'return-in-progress' || 
                  trackingInfo.status === 'return-completed' || trackingInfo.status === 'return-rejected') && (
                  <div className="return-section">
                    <h3>{getTranslation('tracking.returns.title', 'Product Return')}</h3>
                    
                    {trackingInfo.status === 'delivered' && (
                      <button 
                        className="return-btn"
                        onClick={() => setShowReturnModal(true)}
                      >
                        {getTranslation('tracking.returns.requestReturn', 'Request Return')}
                      </button>
                    )}
                    
                    {trackingInfo.status === 'return-requested' && (
                      <div className="return-status-message">
                        <p>{getTranslation('tracking.returns.requestPending', 'Your return request is being reviewed. We will update you soon.')}</p>
                      </div>
                    )}
                    
                    {trackingInfo.status === 'return-approved' && (
                      <div className="return-status-message">
                        <p>{getTranslation('tracking.returns.requestApproved', 'Your return request has been approved. Our rider will pick up the items soon.')}</p>
                      </div>
                    )}
                    
                    {trackingInfo.status === 'return-in-progress' && (
                      <div className="return-status-message">
                        <p>{getTranslation('tracking.returns.returnInProgress', 'A rider is on the way to pick up your return.')}</p>
                      </div>
                    )}
                    
                    {trackingInfo.status === 'return-completed' && (
                      <div className="return-status-message success">
                        <p>{getTranslation('tracking.returns.returnCompleted', 'Your return has been completed successfully. Refund is being processed.')}</p>
                      </div>
                    )}
                    
                    {trackingInfo.status === 'return-rejected' && (
                      <div className="return-status-message error">
                        <p>{getTranslation('tracking.returns.returnRejected', 'Your return request was not approved. Please check your email for details.')}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="tracking-details-card">
                <h2>{getTranslation('tracking.orderSummary', 'Order Summary')}</h2>
                <ul>
                  {trackingInfo.items.map((item, index) => (
                    <li key={index}>
                      {item.name} x{item.quantity} - ${item.price.toFixed(2)}
                    </li>
                  ))}
                  <li><strong>{getTranslation('tracking.total', 'Total')}:</strong> ${trackingInfo.total.toFixed(2)}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {!trackingInfo && !error && (
          <div className="tracking-info">
            <h2>{getTranslation('tracking.howToTrack', 'How to Track Your Order')}</h2>
            <ul>
              <li>{getTranslation('tracking.howToTrackSteps.step1', 'Enter your tracking ID that was sent to your email')}</li>
              <li>{getTranslation('tracking.howToTrackSteps.step2', 'You can find your tracking ID in your order confirmation email')}</li>
              <li>{getTranslation('tracking.howToTrackSteps.step3', 'Try using "DEMO123" to see a sample tracking result')}</li>
              <li>{getTranslation('tracking.howToTrackSteps.step4', 'For any issues, please contact our customer support at 555-123-4567')}</li>
            </ul>
          </div>
        )}

        {/* Uncomment this line to test translations */}
        {/* <LanguageTest /> */}
      </div>
      
      <Footer />

      {/* Return Request Modal */}
      {showReturnModal && (
        <div className="modal-overlay">
          <div className="modal-container return-modal">
            <div className="modal-header">
              <h2>{getTranslation('tracking.returns.requestReturnTitle', 'Request a Return')}</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowReturnModal(false);
                  setReturnSuccess(false);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              {returnSuccess ? (
                <div className="return-success">
                  <div className="success-icon">✓</div>
                  <h3>{getTranslation('tracking.returns.returnSuccessTitle', 'Return Request Submitted')}</h3>
                  <p>{getTranslation('tracking.returns.returnSuccessMessage', 'Your return request has been submitted successfully. We will review it and get back to you soon.')}</p>
                </div>
              ) : (
                <form onSubmit={handleReturnRequest}>
                  <div className="form-group">
                    <label>{getTranslation('tracking.returns.reasonLabel', 'Reason for Return')}</label>
                    <select 
                      value={returnReason} 
                      onChange={(e) => setReturnReason(e.target.value)}
                      required
                    >
                      <option value="">{getTranslation('tracking.returns.selectReason', 'Select a reason')}</option>
                      <option value="damaged">{getTranslation('tracking.returns.reasonDamaged', 'Item Damaged')}</option>
                      <option value="wrong-item">{getTranslation('tracking.returns.reasonWrongItem', 'Wrong Item Received')}</option>
                      <option value="defective">{getTranslation('tracking.returns.reasonDefective', 'Item is Defective')}</option>
                      <option value="not-as-described">{getTranslation('tracking.returns.reasonNotAsDescribed', 'Item Not as Described')}</option>
                      <option value="other">{getTranslation('tracking.returns.reasonOther', 'Other')}</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>{getTranslation('tracking.returns.descriptionLabel', 'Detailed Description')}</label>
                    <textarea 
                      value={returnDescription}
                      onChange={(e) => setReturnDescription(e.target.value)}
                      placeholder={getTranslation('tracking.returns.descriptionPlaceholder', 'Please provide details about the issue...')}
                      rows={4}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label>{getTranslation('tracking.returns.photosLabel', 'Upload Photos (Optional)')}</label>
                    <p className="helper-text">{getTranslation('tracking.returns.photosHelper', 'Upload up to 3 photos showing the issue')}</p>
                    
                    <div className="upload-container">
                      <input 
                        type="file" 
                        id="return-photos" 
                        className="file-input" 
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        disabled={returnImages.length >= 3}
                      />
                      <label htmlFor="return-photos" className={`upload-btn ${returnImages.length >= 3 ? 'disabled' : ''}`}>
                        {getTranslation('tracking.returns.uploadPhotos', 'Upload Photos')}
                      </label>
                      
                      <div className="image-previews">
                        {returnImages.map((image, index) => (
                          <div key={index} className="image-preview">
                            <img src={image.preview} alt={`Preview ${index + 1}`} />
                            <button 
                              type="button" 
                              className="remove-image"
                              onClick={() => removeImage(index)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      type="button" 
                      className="cancel-btn"
                      onClick={() => setShowReturnModal(false)}
                    >
                      {getTranslation('tracking.returns.cancelButton', 'Cancel')}
                    </button>
                    <button 
                      type="submit" 
                      className="submit-btn"
                      disabled={loading || !returnReason || !returnDescription}
                    >
                      {loading 
                        ? getTranslation('tracking.returns.submittingButton', 'Submitting...') 
                        : getTranslation('tracking.returns.submitButton', 'Submit Return Request')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking; 