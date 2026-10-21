import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/RiderPage.css';
import { useLanguage } from '../context/LanguageContext';

const RiderPage = () => {
  const { texts } = useLanguage();
  
  const defaultRider = {
    pageTitle: 'Become a Rider',
    tagline: 'Join our network of delivery partners and earn while making a difference.',
    banner: {
      breadcrumb: 'Home / Become a Rider',
      description: 'Join our team of delivery partners and start earning today. We provide flexible hours, competitive pay, and all the tools you need to succeed.'
    },
    sections: {
      benefits: {
        title: 'Why Join Us',
        cards: {
          flexible: {
            icon: '⏰',
            title: 'Flexible Hours',
            content: 'Choose your own working hours and earn on your own schedule.'
          },
          earnings: {
            icon: '💰',
            title: 'Competitive Earnings',
            content: 'Earn competitive rates with additional bonuses for peak hours and special deliveries.'
          },
          support: {
            icon: '🤝',
            title: 'Full Support',
            content: 'Get access to our rider app, training, and 24/7 support team.'
          }
        }
      },
      requirements: {
        title: 'Requirements',
        items: [
          'Valid driving license',
          'Own vehicle (motorcycle/bicycle)',
          'Smartphone with internet access',
          'Good communication skills',
          'Basic knowledge of the local area'
        ]
      },
      process: {
        title: 'How to Join',
        steps: [
          {
            number: '1',
            title: 'Apply Online',
            content: 'Fill out our simple online application form with your details.'
          },
          {
            number: '2',
            title: 'Document Verification',
            content: 'Submit your documents for verification (ID, license, vehicle papers).'
          },
          {
            number: '3',
            title: 'Training',
            content: 'Complete our comprehensive training program.'
          },
          {
            number: '4',
            title: 'Start Earning',
            content: 'Get your rider app credentials and start accepting deliveries.'
          }
        ]
      },
      earnings: {
        title: 'Earnings Potential',
        stats: {
          base: {
            number: '৳15,000+',
            label: 'Base Monthly Income'
          },
          bonus: {
            number: '৳5,000+',
            label: 'Average Monthly Bonus'
          },
          peak: {
            number: '৳500+',
            label: 'Peak Hour Bonus'
          }
        }
      },
      contact: {
        title: 'Apply Now',
        intro: 'Ready to join our team? Contact us at:',
        email: 'riders@grameendelivery.com',
        phone: '+880 1712-345678',
        address: '123 Main Street, Dhaka, Bangladesh'
      }
    }
  };
  
  const rider = texts?.rider ? {
    ...defaultRider,
    ...texts.rider,
    banner: texts.rider.banner || defaultRider.banner,
    sections: {
      ...defaultRider.sections,
      ...(texts.rider.sections || {})
    }
  } : defaultRider;
  
  return (
    <div className="rider-page">
      <Navbar />
      
      {/* Page Banner Section */}
      <div className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <div className="page-banner-left">
              <h1 className="page-title">{rider.pageTitle}</h1>
              <div className="breadcrumb">{rider.banner.breadcrumb}</div>
            </div>
            <div className="page-banner-right">
              <p className="banner-description">{rider.banner.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rider-container">
        <div className="rider-header">
          <h1>{rider.pageTitle}</h1>
          <p className="rider-tagline">{rider.tagline}</p>
        </div>
        
        <div className="rider-section">
          <h2>{rider.sections.benefits.title}</h2>
          <div className="rider-cards">
            <div className="rider-card">
              <div className="card-icon">{rider.sections.benefits.cards.flexible.icon}</div>
              <h3>{rider.sections.benefits.cards.flexible.title}</h3>
              <p>{rider.sections.benefits.cards.flexible.content}</p>
            </div>
            
            <div className="rider-card">
              <div className="card-icon">{rider.sections.benefits.cards.earnings.icon}</div>
              <h3>{rider.sections.benefits.cards.earnings.title}</h3>
              <p>{rider.sections.benefits.cards.earnings.content}</p>
            </div>
            
            <div className="rider-card">
              <div className="card-icon">{rider.sections.benefits.cards.support.icon}</div>
              <h3>{rider.sections.benefits.cards.support.title}</h3>
              <p>{rider.sections.benefits.cards.support.content}</p>
            </div>
          </div>
        </div>
        
        <div className="rider-section">
          <h2>{rider.sections.requirements.title}</h2>
          <ul className="requirements-list">
            {rider.sections.requirements.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="rider-section">
          <h2>{rider.sections.process.title}</h2>
          <div className="process-steps">
            {rider.sections.process.steps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.content}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rider-section">
          <h2>{rider.sections.earnings.title}</h2>
          <div className="earnings-stats">
            <div className="stat-item">
              <span className="stat-number">{rider.sections.earnings.stats.base.number}</span>
              <span className="stat-label">{rider.sections.earnings.stats.base.label}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{rider.sections.earnings.stats.bonus.number}</span>
              <span className="stat-label">{rider.sections.earnings.stats.bonus.label}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{rider.sections.earnings.stats.peak.number}</span>
              <span className="stat-label">{rider.sections.earnings.stats.peak.label}</span>
            </div>
          </div>
        </div>
        
        <div className="rider-section">
          <h2>{rider.sections.contact.title}</h2>
          <p>{rider.sections.contact.intro}</p>
          <div className="contact-info">
            <p><strong>Email:</strong> {rider.sections.contact.email}</p>
            <p><strong>Phone:</strong> {rider.sections.contact.phone}</p>
            <p><strong>Address:</strong> {rider.sections.contact.address}</p>
          </div>
          <button className="primary-btn apply-btn">Apply Now</button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RiderPage; 