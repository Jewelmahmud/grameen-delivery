import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageTest = () => {
  const { texts, language, changeLanguage, availableLanguages } = useLanguage();

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h2>Language Test Component</h2>
      <p>Current language: {language}</p>
      
      <div>
        <h3>Change Language:</h3>
        {availableLanguages.map(lang => (
          <button 
            key={lang} 
            onClick={() => changeLanguage(lang)}
            style={{ margin: '5px', fontWeight: lang === language ? 'bold' : 'normal' }}
          >
            {lang}
          </button>
        ))}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Timeline Translations Test:</h3>
        <div>
          <strong>Order Placed:</strong>
          <ul>
            <li>Status: {texts.tracking.timeline.orderPlaced}</li>
            <li>Description: {texts.tracking.timelineDesc.orderPlaced}</li>
          </ul>
        </div>
        <div>
          <strong>Preparing:</strong>
          <ul>
            <li>Status: {texts.tracking.timeline.preparing}</li>
            <li>Description: {texts.tracking.timelineDesc.preparing}</li>
          </ul>
        </div>
        <div>
          <strong>Out for Delivery:</strong>
          <ul>
            <li>Status: {texts.tracking.timeline.outForDelivery}</li>
            <li>Description: {texts.tracking.timelineDesc.outForDelivery}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LanguageTest; 