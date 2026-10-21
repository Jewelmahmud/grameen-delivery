import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AboutPage.css';
import { useLanguage } from '../context/LanguageContext';

const AboutPage = () => {
  const { texts } = useLanguage();
  
  // Default/fallback about data with banner included
  const defaultAbout = {
    pageTitle: 'About Grameen Delivery',
    tagline: 'Connecting rural Bangladesh with reliable delivery services.',
    banner: {
      breadcrumb: 'Home / About Us',
      description: 'Learn about our mission, story, and impact in rural Bangladesh. We\'re connecting communities through reliable delivery services.'
    },
    sections: {
      mission: {
        title: 'Our Mission',
        content: 'At Grameen Delivery, our mission is to bridge the gap between rural communities and urban markets by providing reliable, affordable, and efficient delivery services. We believe that access to goods and services should not be limited by geographical location.'
      },
      story: {
        title: 'Our Story',
        paragraph1: 'Founded in 2023, Grameen Delivery was born out of a simple observation: rural areas of Bangladesh faced significant challenges accessing goods and services that urban residents took for granted. Our founder, seeing the rapid growth of e-commerce in cities, wondered why the same convenience couldn\'t be extended to villages and smaller towns.',
        paragraph2: 'Starting with just three riders in Natore district, we have now expanded to over 25 districts, with hundreds of delivery partners serving thousands of customers daily. Our growth is a testament to the need for our services and the trust our customers place in us.'
      },
      howWeWork: {
        title: 'How We Work',
        cards: {
          businesses: {
            icon: '🏪',
            title: 'Partner Businesses',
            content: 'We partner with local businesses who want to expand their customer base beyond their immediate area. Through our platform, these businesses can reach customers in remote villages and towns.'
          },
          riders: {
            icon: '🛵',
            title: 'Delivery Riders',
            content: 'Our network of trained delivery riders are the backbone of our operation. They navigate the challenging rural roads to ensure packages reach their destinations safely and on time.'
          },
          technology: {
            icon: '📱',
            title: 'Technology Platform',
            content: 'Our custom-built technology platform connects customers, businesses, and riders seamlessly, tracking orders in real-time and optimizing delivery routes for efficiency.'
          }
        }
      },
      impact: {
        title: 'Our Impact',
        stats: {
          districts: {
            number: '25+',
            label: 'Districts Served'
          },
          partners: {
            number: '500+',
            label: 'Delivery Partners'
          },
          businesses: {
            number: '150+',
            label: 'Business Partners'
          },
          deliveries: {
            number: '10,000+',
            label: 'Daily Deliveries'
          }
        }
      },
      contact: {
        title: 'Contact Us',
        intro: 'Have questions or want to learn more about our services? Reach out to us at:',
        email: 'info@grameendelivery.com',
        phone: '+880 1712-345678',
        address: '123 Main Street, Dhaka, Bangladesh'
      }
    }
  };
  
  // Use the translations if available, otherwise fall back to default data
  const about = texts?.about ? {
    ...defaultAbout,
    ...texts.about,
    banner: texts.about.banner || defaultAbout.banner,
    sections: {
      ...defaultAbout.sections,
      ...(texts.about.sections || {})
    }
  } : defaultAbout;
  
  return (
    <div className="about-page">
      <Navbar />
      
      {/* Page Banner Section */}
      <div className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <div className="page-banner-left">
              <h1 className="page-title">{about.pageTitle}</h1>
              <div className="breadcrumb">{about.banner.breadcrumb}</div>
            </div>
            <div className="page-banner-right">
              <p className="banner-description">{about.banner.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="about-container">
        <div className="about-header">
          <h1>{about.pageTitle}</h1>
          <p className="about-tagline">{about.tagline}</p>
        </div>
        
        <div className="about-section">
          <h2>{about.sections.mission.title}</h2>
          <p>
            {about.sections.mission.content}
          </p>
        </div>
        
        <div className="about-section">
          <h2>{about.sections.story.title}</h2>
          <p>
            {about.sections.story.paragraph1}
          </p>
          <p>
            {about.sections.story.paragraph2}
          </p>
        </div>
        
        <div className="about-section">
          <h2>{about.sections.howWeWork.title}</h2>
          <div className="about-cards">
            <div className="about-card">
              <div className="card-icon">{about.sections.howWeWork.cards.businesses.icon}</div>
              <h3>{about.sections.howWeWork.cards.businesses.title}</h3>
              <p>
                {about.sections.howWeWork.cards.businesses.content}
              </p>
            </div>
            
            <div className="about-card">
              <div className="card-icon">{about.sections.howWeWork.cards.riders.icon}</div>
              <h3>{about.sections.howWeWork.cards.riders.title}</h3>
              <p>
                {about.sections.howWeWork.cards.riders.content}
              </p>
            </div>
            
            <div className="about-card">
              <div className="card-icon">{about.sections.howWeWork.cards.technology.icon}</div>
              <h3>{about.sections.howWeWork.cards.technology.title}</h3>
              <p>
                {about.sections.howWeWork.cards.technology.content}
              </p>
            </div>
          </div>
        </div>
        
        <div className="about-section">
          <h2>{about.sections.impact.title}</h2>
          <div className="impact-stats">
            <div className="stat-item">
              <span className="stat-number">{about.sections.impact.stats.districts.number}</span>
              <span className="stat-label">{about.sections.impact.stats.districts.label}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{about.sections.impact.stats.partners.number}</span>
              <span className="stat-label">{about.sections.impact.stats.partners.label}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{about.sections.impact.stats.businesses.number}</span>
              <span className="stat-label">{about.sections.impact.stats.businesses.label}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{about.sections.impact.stats.deliveries.number}</span>
              <span className="stat-label">{about.sections.impact.stats.deliveries.label}</span>
            </div>
          </div>
        </div>
        
        <div className="about-section">
          <h2>{about.sections.contact.title}</h2>
          <p>
            {about.sections.contact.intro}
          </p>
          <div className="contact-info">
            <p><strong>Email:</strong> {about.sections.contact.email}</p>
            <p><strong>Phone:</strong> {about.sections.contact.phone}</p>
            <p><strong>Address:</strong> {about.sections.contact.address}</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage; 