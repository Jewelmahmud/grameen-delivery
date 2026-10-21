import DeliveryLabel from './DeliveryLabel';
import ReceiptPrinter from './ReceiptPrinter';
import { 
  FaShoppingBag, 
  FaUsers, 
  FaCog, 
  FaChartLine, 
  FaHome,
  FaSearch,
  FaRedoAlt,
  FaTag,
  FaReceipt
} from 'react-icons/fa';

const OrdersTab = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([
    // ... existing code ...
  ]);

  const handlePrintLabel = (order) => {
    setSelectedOrder(order);
    setShowLabelModal(true);
  };

  const handleCloseLabelModal = () => {
    setShowLabelModal(false);
    setSelectedOrder(null);
  };

  const handlePrintReceipt = (order) => {
    setSelectedOrder(order);
    setShowReceiptModal(true);
  };

  const handleCloseReceiptModal = () => {
    setShowReceiptModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="orders-tab">
      {/* ... existing code ... */}
      
      <div className="order-cards">
        {displayedOrders.length > 0 ? (
          displayedOrders.map((order) => (
            <div className="order-card" key={order.id}>
              {/* ... existing code ... */}
              <div className="order-actions">
                <button 
                  className="btn btn-sm btn-outline-primary" 
                  onClick={() => handlePrintReceipt(order)}
                >
                  <FaReceipt className="me-1" /> {t('View Receipt')}
                </button>
                <button 
                  className="btn btn-sm btn-outline-info"
                  onClick={() => handlePrintLabel(order)}
                >
                  <FaTag className="me-1" /> {t('Print Label')}
                </button>
                {order.status === 'completed' && (
                  <button 
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleReopenOrder(order.id)}
                  >
                    <FaRedoAlt className="me-1" /> {t('Reopen')}
                  </button>
                )}
              </div>
              {/* ... existing code ... */}
            </div>
          ))
        ) : (
          <div className="no-orders-message">
            <FaSearch className="mb-3" size={32} />
            <p>{t('No orders found matching your criteria')}</p>
          </div>
        )}
      </div>
      {/* ... existing code ... */}
      
      <DeliveryLabel 
        order={selectedOrder} 
        isVisible={showLabelModal} 
        onClose={handleCloseLabelModal} 
      />
      
      <ReceiptPrinter 
        order={selectedOrder}
        isVisible={showReceiptModal}
        onClose={handleCloseReceiptModal}
      />
    </div>
  );
}; 