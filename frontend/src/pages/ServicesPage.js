import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/ServicesPage.css';
import { useLanguage } from '../context/LanguageContext';

const ServicesPage = () => {
  const { texts } = useLanguage();
  
  const defaultServices = {
    pageTitle: 'Our Services',
    tagline: 'Comprehensive delivery solutions for all your needs',
    banner: {
      breadcrumb: 'Home / Services',
      description: 'Discover our wide range of delivery services designed to make your life easier. From parcels to groceries, we deliver everything with care and efficiency.'
    },
    services: [
      {
        id: 'parcel',
        icon: '📦',
        title: 'Parcel Delivery',
        titleBn: 'পার্সেল ডেলিভারি',
        description: 'Fast and reliable parcel delivery service for all your packages. We ensure safe and timely delivery of your items.',
        descriptionBn: 'আপনার সব প্যাকেজের জন্য দ্রুত এবং নির্ভরযোগ্য পার্সেল ডেলিভারি সেবা। আমরা আপনার আইটেমগুলির নিরাপদ এবং সময়মত ডেলিভারি নিশ্চিত করি।',
        features: [
          'Real-time tracking',
          'Multiple size options',
          'Insurance available',
          'Nationwide coverage'
        ]
      },
      {
        id: 'medicine',
        icon: '💊',
        title: 'Medicine Delivery',
        titleBn: 'ঔষধ ডেলিভারি',
        description: 'Urgent medicine delivery service to your doorstep. We understand the importance of timely medicine delivery.',
        descriptionBn: 'আপনার দরজায় জরুরি ঔষধ ডেলিভারি সেবা। আমরা সময়মত ঔষধ ডেলিভারির গুরুত্ব বুঝি।',
        features: [
          '24/7 service',
          'Temperature controlled',
          'Prescription handling',
          'Emergency delivery'
        ]
      },
      {
        id: 'groceries',
        icon: '🛒',
        title: 'Grocery Delivery',
        titleBn: 'কাঁচাবাজার ডেলিভারি',
        description: 'Fresh groceries delivered to your home. Choose from a wide range of products and get them delivered the same day.',
        descriptionBn: 'আপনার বাড়িতে তাজা কাঁচাবাজার ডেলিভারি। বিভিন্ন পণ্য থেকে বেছে নিন এবং একই দিনে ডেলিভারি পান।',
        features: [
          'Fresh produce',
          'Same-day delivery',
          'Quality guarantee',
          'Wide selection'
        ]
      },
      {
        id: 'gas',
        icon: '⛽',
        title: 'Gas Cylinder Delivery',
        titleBn: 'গ্যাস সিলিন্ডার ডেলিভারি',
        description: 'Safe and timely delivery of gas cylinders. Our trained professionals ensure secure handling and delivery.',
        descriptionBn: 'গ্যাস সিলিন্ডারের নিরাপদ এবং সময়মত ডেলিভারি। আমাদের প্রশিক্ষিত পেশাদাররা নিরাপদ হ্যান্ডলিং এবং ডেলিভারি নিশ্চিত করে।',
        features: [
          'Safety certified',
          'Regular delivery',
          'Emergency service',
          'Professional handling'
        ]
      },
      {
        id: 'agriculture',
        icon: '🌾',
        title: 'Agricultural Products Delivery',
        titleBn: 'কৃষি পন্য ডেলিভারি',
        description: 'Specialized delivery service for agricultural products. We ensure your produce reaches the market in perfect condition.',
        descriptionBn: 'কৃষি পণ্যের জন্য বিশেষ ডেলিভারি সেবা। আমরা নিশ্চিত করি যে আপনার উৎপাদন নিখুঁত অবস্থায় বাজারে পৌঁছায়।',
        features: [
          'Temperature control',
          'Special handling',
          'Market delivery',
          'Quality preservation'
        ]
      },
      {
        id: 'personal',
        icon: '🎁',
        title: 'Personal Items Delivery',
        titleBn: 'পারসোনার পন্য ডেলিভারি',
        description: 'Safe and secure delivery of personal items. We handle your belongings with utmost care and confidentiality.',
        descriptionBn: 'ব্যক্তিগত আইটেমের নিরাপদ এবং সুরক্ষিত ডেলিভারি। আমরা আপনার জিনিসপত্র সর্বোচ্চ যত্ন এবং গোপনীয়তার সাথে হ্যান্ডল করি।',
        features: [
          'Secure packaging',
          'Confidential service',
          'Careful handling',
          'Tracking available'
        ]
      }
    ]
  };
  
  const services = texts?.services ? {
    ...defaultServices,
    ...texts.services,
    banner: texts.services.banner || defaultServices.banner,
    services: texts.services.services || defaultServices.services
  } : defaultServices;
  
  return (
    <div className="services-page">
      <Navbar />
      
      {/* Page Banner Section */}
      <div className="page-banner">
        <div className="container">
          <div className="page-banner-content">
            <div className="page-banner-left">
              <h1 className="page-title">{services.pageTitle}</h1>
              <div className="breadcrumb">{services.banner.breadcrumb}</div>
            </div>
            <div className="page-banner-right">
              <p className="banner-description">{services.banner.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="services-container">
        <div className="services-header">
          <h1>{services.pageTitle}</h1>
          <p className="services-tagline">{services.tagline}</p>
        </div>
        
        <div className="services-grid">
          {services.services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <div className="service-content">
                <h2 className="service-title">
                  <span className="en">{service.title}</span>
                  <span className="bn">{service.titleBn}</span>
                </h2>
                <p className="service-description">
                  <span className="en">{service.description}</span>
                  <span className="bn">{service.descriptionBn}</span>
                </p>
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServicesPage; 