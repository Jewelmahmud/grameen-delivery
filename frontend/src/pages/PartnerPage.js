import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/PartnerPage.css';
import { useLanguage } from '../context/LanguageContext';

const PartnerPage = () => {
  const { texts } = useLanguage();
  
  const defaultPartner = {
    pageTitle: 'Partner With Us',
    tagline: 'Expand your business reach with our delivery network.',
    banner: {
      breadcrumb: 'Home / Partner With Us',
      description: 'Join our network of business partners and reach more customers than ever before. We provide the tools and support you need to grow your business.'
    },
    sections: {
      benefits: {
        title: 'Why Partner With Us',
        cards: {
          reach: {
            icon: '🌍',
            title: 'Extended Reach',
            content: 'Access customers in rural areas and expand your market presence.'
          },
          growth: {
            icon: '📈',
            title: 'Business Growth',
            content: 'Increase your sales and customer base with our delivery network.'
          },
          support: {
            icon: '🛠️',
            title: 'Full Support',
            content: 'Get access to our partner portal, training, and dedicated support team.'
          }
        }
      },
      requirements: {
        title: 'Partner Requirements',
        items: [
          'Valid business license',
          'Physical store location',
          'Quality products/services',
          'Good customer service',
          'Willingness to grow'
        ]
      },
      process: {
        title: 'How to Partner',
        steps: [
          {
            number: '1',
            title: 'Apply Online',
            content: 'Fill out our partner application form with your business details.'
          },
          {
            number: '2',
            title: 'Business Verification',
            content: 'We verify your business credentials and location.'
          },
          {
            number: '3',
            title: 'Onboarding',
            content: 'Complete our partner onboarding process and training.'
          },
          {
            number: '4',
            title: 'Start Growing',
            content: 'Get access to our partner portal and start accepting orders.'
          }
        ]
      },
      success: {
        title: 'Partner Success',
        stats: {
          partners: {
            number: '500+',
            label: 'Active Partners'
          },
          growth: {
            number: '30%',
            label: 'Average Growth'
          },
          orders: {
            number: '1M+',
            label: 'Monthly Orders'
          }
        }
      },
      contact: {
        title: 'Apply Now',
        intro: 'Ready to grow your business? Contact us at:',
        email: 'partners@grameendelivery.com',
        phone: '+880 1712-345678',
        address: '123 Main Street, Dhaka, Bangladesh'
      }
    }
  };
  
  const partner = texts?.partner ? {
    ...defaultPartner,
    ...texts.partner,
    banner: texts.partner.banner || defaultPartner.banner,
    sections: {
      ...defaultPartner.sections,
      ...(texts.partner.sections || {})
    }
  } : defaultPartner;
  
  return (
    <div className="partner-page">
      <Navbar />
      
      {/* Page Banner Section */}
      <div className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <div className="page-banner-left">
              <h1 className="page-title">{partner.pageTitle}</h1>
              <div className="breadcrumb">{partner.banner.breadcrumb}</div>
            </div>
            <div className="page-banner-right">
              <p className="banner-description">{partner.banner.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="partner-container">
        <div className="partner-header">
          <h1>{partner.pageTitle}</h1>
          <p className="partner-tagline">{partner.tagline}</p>
        </div>
        
        <div className="partner-section">
          <h2>{partner.sections.benefits.title}</h2>
          <div className="partner-cards">
            <div className="partner-card">
              <div className="card-icon">{partner.sections.benefits.cards.reach.icon}</div>
              <h3>{partner.sections.benefits.cards.reach.title}</h3>
              <p>{partner.sections.benefits.cards.reach.content}</p>
            </div>
            
            <div className="partner-card">
              <div className="card-icon">{partner.sections.benefits.cards.growth.icon}</div>
              <h3>{partner.sections.benefits.cards.growth.title}</h3>
              <p>{partner.sections.benefits.cards.growth.content}</p>
            </div>
            
            <div className="partner-card">
              <div className="card-icon">{partner.sections.benefits.cards.support.icon}</div>
              <h3>{partner.sections.benefits.cards.support.title}</h3>
              <p>{partner.sections.benefits.cards.support.content}</p>
            </div>
          </div>
        </div>
        
        <div className="partner-section">
          <h2>{partner.sections.requirements.title}</h2>
          <ul className="requirements-list">
            {partner.sections.requirements.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="partner-section">
          <h2>{partner.sections.process.title}</h2>
          <div className="process-steps">
            {partner.sections.process.steps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.content}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="partner-section">
          <h2>{partner.sections.success.title}</h2>
          <div className="success-stats">
            <div className="stat-item">
              <span className="stat-number">{partner.sections.success.stats.partners.number}</span>
              <span className="stat-label">{partner.sections.success.stats.partners.label}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{partner.sections.success.stats.growth.number}</span>
              <span className="stat-label">{partner.sections.success.stats.growth.label}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{partner.sections.success.stats.orders.number}</span>
              <span className="stat-label">{partner.sections.success.stats.orders.label}</span>
            </div>
          </div>
        </div>
        
        <div className="partner-section">
          <h2>{partner.sections.contact.title}</h2>
          <p>{partner.sections.contact.intro}</p>
          <div className="contact-info">
            <p><strong>Email:</strong> {partner.sections.contact.email}</p>
            <p><strong>Phone:</strong> {partner.sections.contact.phone}</p>
            <p><strong>Address:</strong> {partner.sections.contact.address}</p>
          </div>
          <button className="primary-btn apply-btn">Apply Now</button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PartnerPage; 