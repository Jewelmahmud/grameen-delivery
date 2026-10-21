import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/HomePage.css';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
  const { texts } = useLanguage();
  const [activeTab, setActiveTab] = useState('customer');
  
  const heroSlides = [
    {
      title: texts.hero.title,
      subtitle: texts.hero.subtitle,
      description: texts.hero.description,
      image: "./images/delivery_boy.svg"
    },
    {
      title: "Fast & Reliable Delivery",
      subtitle: "Your trusted delivery partner",
      description: "We ensure your packages reach their destination safely and on time.",
      image: "./images/delivery_boy.svg"
    },
    {
      title: "Nationwide Coverage",
      subtitle: "Delivering everywhere",
      description: "Our extensive network covers all major cities and rural areas.",
      image: "./images/delivery_boy.svg"
    }
  ];
  
  return (
    <div className="homepage">
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero-section">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className='hero-section-container'>
                <div className="hero-content">
                  <h1>{slide.title}</h1>
                  <h2>{slide.subtitle}</h2>
                  <p>{slide.description}</p>
                  <div className="cta-buttons">
                    <button className="primary-btn hero-btn-1">{texts.hero.downloadBtn}</button>
                    <button className="secondary-btn hero-btn-2">{texts.hero.earnBtn}</button>
                  </div>
                </div>
                <div className="hero-image">
                  <img src={slide.image} alt="Grameen Delivery" className="hero-image-delivery-boy" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* What Can You Send Section */}
      <div className="section what-to-send">
        <h2>{texts.sendSection.title}</h2>
        <div className="items-grid">
          <div className="item">
            <div className="item-icon">📦</div>
            <p>{texts.sendSection.items.agriculture}</p>
          </div>
          <div className="item">
            <div className="item-icon">📄</div>
            <p>{texts.sendSection.items.documents}</p>
          </div>
          <div className="item">
            <div className="item-icon">🎁</div>
            <p>{texts.sendSection.items.gifts}</p>
          </div>
          <div className="item">
            <div className="item-icon">🧰</div>
            <p>{texts.sendSection.items.tools}</p>
          </div>
          <div className="item">
            <div className="item-icon">💊</div>
            <p>{texts.sendSection.items.medicines}</p>
          </div>
          <div className="item">
            <div className="item-icon">🛒</div>
            <p>{texts.sendSection.items.market}</p>
          </div>
          <div className="item">
            <div className="item-icon">⛽</div>
            <p>{texts.sendSection.items.gasCylinder}</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="section how-it-works">
        <h2>{texts.howItWorks.title}</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>{texts.howItWorks.steps.step1.title}</h3>
            <p>{texts.howItWorks.steps.step1.description}</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>{texts.howItWorks.steps.step2.title}</h3>
            <p>{texts.howItWorks.steps.step2.description}</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>{texts.howItWorks.steps.step3.title}</h3>
            <p>{texts.howItWorks.steps.step3.description}</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="section features">
        <div className="feature">
          <div className="feature-content">
            <h2>{texts.features.ruralReach.title}</h2>
            <p>{texts.features.ruralReach.description}</p>
          </div>
          <div className="feature-image">
            <div className="placeholder-image">Feature Image</div>
          </div>
        </div>

        <div className="feature reverse">
          <div className="feature-image">
            <div className="placeholder-image">Feature Image</div>
          </div>
          <div className="feature-content">
            <h2>{texts.features.trust.title}</h2>
            <p>{texts.features.trust.description}</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-content">
            <h2>{texts.features.emergency.title}</h2>
            <p>{texts.features.emergency.description}</p>
          </div>
          <div className="feature-image">
            <div className="placeholder-image">Feature Image</div>
          </div>
        </div>
      </div>

      {/* Coverage Section */}
      <div className="section coverage">
        <h2>{texts.coverage.title}</h2>
        <p>{texts.coverage.description}</p>
        <div className="coverage-map">
          <div className="map-container">
            <iframe 
              title="Coverage Map"
              width="100%" 
              height="400" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight="0" 
              marginWidth="0" 
              src="https://www.openstreetmap.org/export/embed.html?bbox=89.05868530273438%2C24.27265248464241%2C89.35478210449219%2C24.484081426117932&amp;layer=mapnik" 
              style={{ border: '1px solid #ddd', borderRadius: '8px' }}
            ></iframe>
            <div className="map-highlight-upazila"></div>
          </div>
          <div className="map-legend">
            <div className="legend-item">
              <div className="legend-marker"></div>
              <p>গুরুদাসপুর উপজেলা - Gurudaspur Upazila (Our Service Coverage Area)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deliver & Earn Section */}
      <div className="section deliver-earn">
        <div className="earn-content">
          <h2>{texts.earn.title}</h2>
          <ul>
            <li>{texts.earn.benefits.flexible}</li>
            <li>{texts.earn.benefits.income}</li>
            <li>{texts.earn.benefits.help}</li>
          </ul>
          <button className="primary-btn">{texts.earn.button}</button>
        </div>
        <div className="earn-image">
          <div className="placeholder-image">App Image</div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="section faq">
        <h2>{texts.faq.title}</h2>
        <div className="faq-tabs">
          <button 
            className={`tab ${activeTab === 'customer' ? 'active' : ''}`} 
            onClick={() => setActiveTab('customer')}
          >
            {texts.faq.tabs.customer}
          </button>
          <button 
            className={`tab ${activeTab === 'business' ? 'active' : ''}`} 
            onClick={() => setActiveTab('business')}
          >
            {texts.faq.tabs.business}
          </button>
          <button 
            className={`tab ${activeTab === 'rider' ? 'active' : ''}`} 
            onClick={() => setActiveTab('rider')}
          >
            {texts.faq.tabs.rider}
          </button>
        </div>
        <div className="faq-items">
          {activeTab === 'customer' && (
            <>
              <div className="faq-item">
                <h3>{texts.faq.questions.customer.contact.question}</h3>
                <p>{texts.faq.questions.customer.contact.answer}</p>
              </div>
              <div className="faq-item">
                <h3>{texts.faq.questions.customer.request.question}</h3>
                <p>{texts.faq.questions.customer.request.answer}</p>
              </div>
              <div className="faq-item">
                <h3>{texts.faq.questions.customer.payment.question}</h3>
                <p>{texts.faq.questions.customer.payment.answer}</p>
              </div>
            </>
          )}
          {activeTab === 'business' && (
            <>
              <div className="faq-item">
                <h3>{texts.faq.questions.business.registration.question}</h3>
                <p>{texts.faq.questions.business.registration.answer}</p>
              </div>
              <div className="faq-item">
                <h3>{texts.faq.questions.business.earnings.question}</h3>
                <p>{texts.faq.questions.business.earnings.answer}</p>
              </div>
              <div className="faq-item">
                <h3>{texts.faq.questions.business.support.question}</h3>
                <p>{texts.faq.questions.business.support.answer}</p>
              </div>
            </>
          )}
          {activeTab === 'rider' && (
            <>
              <div className="faq-item">
                <h3>{texts.faq.questions.rider.requirements.question}</h3>
                <p>{texts.faq.questions.rider.requirements.answer}</p>
              </div>
              <div className="faq-item">
                <h3>{texts.faq.questions.rider.earnings.question}</h3>
                <p>{texts.faq.questions.rider.earnings.answer}</p>
              </div>
              <div className="faq-item">
                <h3>{texts.faq.questions.rider.schedule.question}</h3>
                <p>{texts.faq.questions.rider.schedule.answer}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage; 