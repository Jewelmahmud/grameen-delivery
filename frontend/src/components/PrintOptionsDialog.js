import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './PrintOptionsDialog.css';

const PrintOptionsDialog = ({ 
  show, 
  onHide, 
  printType, 
  onProceed, 
  selectedOrders = [] 
}) => {
  // Default options
  const [paperSize, setPaperSize] = useState('A4');
  const [copies, setCopies] = useState(1);
  const [includeQR, setIncludeQR] = useState(true);
  const [includeMap, setIncludeMap] = useState(true);
  const [includeLogo, setIncludeLogo] = useState(true);
  const [orientation, setOrientation] = useState('portrait');
  const [labelSize, setLabelSize] = useState('standard');
  
  // For batch prints
  const [groupByCustomer, setGroupByCustomer] = useState(false);
  const [groupByStatus, setGroupByStatus] = useState(false);
  
  const handleProceed = () => {
    onProceed({
      paperSize,
      copies,
      includeQR,
      includeMap,
      includeLogo,
      orientation,
      labelSize,
      groupByCustomer,
      groupByStatus
    });
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      className="print-options-modal"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {printType === 'batch' ? 'Batch Print Options' : 'Individual Print Options'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="print-options-content">
        {printType === 'batch' && (
          <div className="highlight-row mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <span className="option-label">Selected Orders:</span>
              <span className="option-value">{selectedOrders.length} orders</span>
            </div>
          </div>
        )}
        
        <div className="option-row">
          <span className="option-label">Paper Size</span>
          <div className="option-input">
            <select
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value)}
              className="form-select"
            >
              <option value="A4">A4 (210 × 297 mm)</option>
              <option value="Letter">Letter (8.5 × 11 in)</option>
              <option value="Legal">Legal (8.5 × 14 in)</option>
            </select>
          </div>
        </div>
        
        <div className="option-row">
          <span className="option-label">Orientation</span>
          <div className="option-input">
            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value)}
              className="form-select"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
        </div>
        
        <div className="option-row">
          <span className="option-label">Label Size</span>
          <div className="option-input">
            <select
              value={labelSize}
              onChange={(e) => setLabelSize(e.target.value)}
              className="form-select"
            >
              <option value="standard">Standard (100%)</option>
              <option value="compact">Compact (75%)</option>
              <option value="large">Large (125%)</option>
            </select>
          </div>
        </div>
        
        <div className="option-row">
          <span className="option-label">Copies per Label</span>
          <div className="option-input">
            <input
              type="number"
              min="1"
              max="10"
              value={copies}
              onChange={(e) => setCopies(parseInt(e.target.value) || 1)}
              className="form-control"
            />
          </div>
        </div>
        
        <div className="option-row">
          <span className="option-label">Include QR Code</span>
          <div className="option-input">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={includeQR}
                onChange={() => setIncludeQR(!includeQR)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="option-row">
          <span className="option-label">Include Map</span>
          <div className="option-input">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={includeMap}
                onChange={() => setIncludeMap(!includeMap)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="option-row">
          <span className="option-label">Include Company Logo</span>
          <div className="option-input">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={includeLogo}
                onChange={() => setIncludeLogo(!includeLogo)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        {printType === 'batch' && (
          <>
            <div className="option-row">
              <span className="option-label">Group by Customer</span>
              <div className="option-input">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={groupByCustomer}
                    onChange={() => setGroupByCustomer(!groupByCustomer)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="option-row">
              <span className="option-label">Group by Order Status</span>
              <div className="option-input">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={groupByStatus}
                    onChange={() => setGroupByStatus(!groupByStatus)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </>
        )}
        
        <div className="option-note">
          <p>Labels will be generated according to these settings and opened in a new window for printing.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleProceed}>
          {printType === 'batch' ? 'Print Batch' : 'Print Label'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrintOptionsDialog; 