import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import '../../styles/AdminDashboard.css';
import '../../styles/ActivityDetails.css';

const SystemUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(null);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const path = location.pathname.split('/');
    if (path.includes('activities')) {
      setActiveTab('overview'); // Activities are accessed from overview tab
    }
  }, [location]);

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setUpdate({
        id: id || 'UPD-035',
        title: 'Payment System Update',
        description: 'Major update to the payment processing system, including new payment gateways and improved transaction handling.',
        dateCompleted: '2023-07-10 09:15',
        status: 'completed',
        type: 'major',
        version: 'v2.4.0',
        author: 'DevOps Team',
        components: [
          { name: 'Payment Gateway', status: 'updated' },
          { name: 'Transaction Processing', status: 'updated' },
          { name: 'Refund System', status: 'updated' },
          { name: 'Reporting Module', status: 'added' }
        ],
        changeLog: [
          'Added support for mobile banking payment methods',
          'Improved transaction confirmation speed by 40%',
          'Enhanced security measures for payment processing',
          'Added new reporting features for financial reconciliation',
          'Fixed 12 bugs related to payment failures',
          'Updated third-party payment API integrations'
        ],
        impactAreas: [
          'Payment Processing',
          'Checkout Flow',
          'Admin Dashboard',
          'Partner Portal'
        ],
        testResults: {
          unitTests: '98% passed',
          integrationTests: '95% passed',
          performanceTests: '90% passed',
          securityTests: '100% passed'
        },
        deploymentSteps: [
          { step: 'Database migration', status: 'completed', time: '08:30' },
          { step: 'Backend deployment', status: 'completed', time: '08:45' },
          { step: 'Frontend deployment', status: 'completed', time: '09:00' },
          { step: 'Post-deployment verification', status: 'completed', time: '09:15' }
        ],
        rollbackPlan: 'Automatic rollback script is available if issues are detected.'
      });
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleRollback = () => {
    // In a real app, this would trigger the rollback process
    console.log('Rolling back update:', id);
    alert('Rollback has been initiated! This is a critical action.');
  };

  const handleDownloadReport = () => {
    // In a real app, this would download a technical report
    console.log('Downloading technical report for update:', id);
    alert('Report download initiated.');
  };

  const handleShare = () => {
    // In a real app, this would share the update information
    console.log('Sharing update information:', id);
    alert('Update information has been shared with the team.');
  };

  if (isLoading) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-content">
          <div className="activity-details-container">
            <div className="loading-spinner">Loading...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <div className="activity-details-container">
          <div className="activity-details-header">
            <button className="back-button" onClick={() => navigate('/admin/overview')}>
              ← Back to Dashboard
            </button>
            <h2>
              <span className="activity-icon system">⚙️</span>
              System Update Details
            </h2>
            <div className={`status-badge ${update.status}`}>{update.status}</div>
          </div>

          <div className="activity-details-content">
            <div className="update-summary">
              <div className={`update-type ${update.type}`}>
                {update.type} update
              </div>
              <h3>{update.title} ({update.version})</h3>
              <p className="update-description">{update.description}</p>
              <div className="update-meta">
                <span>Completed on {update.dateCompleted}</span>
                <span>by {update.author}</span>
              </div>
            </div>

            <div className="two-column-layout">
              <div className="column">
                <div className="details-section">
                  <h3>Change Log</h3>
                  <ul className="changelog-list">
                    {update.changeLog.map((change, index) => (
                      <li key={index} className="changelog-item">{change}</li>
                    ))}
                  </ul>
                </div>

                <div className="details-section">
                  <h3>Impacted Areas</h3>
                  <div className="impact-areas">
                    {update.impactAreas.map((area, index) => (
                      <div key={index} className="impact-badge">{area}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="details-section">
                  <h3>Updated Components</h3>
                  <table className="components-table">
                    <thead>
                      <tr>
                        <th>Component</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {update.components.map((component, index) => (
                        <tr key={index}>
                          <td>{component.name}</td>
                          <td>
                            <span className={`component-status ${component.status}`}>
                              {component.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="details-section">
                  <h3>Test Results</h3>
                  <div className="test-results">
                    <div className="test-result-item">
                      <div className="test-result-label">Unit Tests</div>
                      <div className="test-result-value">{update.testResults.unitTests}</div>
                    </div>
                    <div className="test-result-item">
                      <div className="test-result-label">Integration Tests</div>
                      <div className="test-result-value">{update.testResults.integrationTests}</div>
                    </div>
                    <div className="test-result-item">
                      <div className="test-result-label">Performance Tests</div>
                      <div className="test-result-value">{update.testResults.performanceTests}</div>
                    </div>
                    <div className="test-result-item">
                      <div className="test-result-label">Security Tests</div>
                      <div className="test-result-value">{update.testResults.securityTests}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Deployment Process</h3>
              <div className="deployment-timeline">
                {update.deploymentSteps.map((step, index) => (
                  <div key={index} className="deployment-step">
                    <div className="step-time">{step.time}</div>
                    <div className="step-marker"></div>
                    <div className="step-details">
                      <div className="step-name">{step.step}</div>
                      <div className={`step-status ${step.status}`}>{step.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="details-section">
              <h3>Rollback Plan</h3>
              <div className="rollback-info">
                <p>{update.rollbackPlan}</p>
              </div>
            </div>

            <div className="action-buttons-container">
              <button className="danger-btn" onClick={handleRollback}>
                Initiate Rollback
              </button>
              <button className="secondary-btn" onClick={handleDownloadReport}>
                Download Technical Report
              </button>
              <button className="secondary-btn" onClick={handleShare}>
                Share Update Info
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SystemUpdate; 