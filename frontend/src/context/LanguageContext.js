import React, { createContext, useState, useContext, useEffect } from 'react';
import { enTranslations } from '../translations/en';
import { bnTranslations } from '../translations/bn';
import { deTranslations } from '../translations/de';
import { frTranslations } from '../translations/fr';
import { hiTranslations } from '../translations/hi';
import { urTranslations } from '../translations/ur';
import { arTranslations } from '../translations/ar';

const translations = {
  en: enTranslations,
  bn: bnTranslations,
  de: deTranslations,
  fr: frTranslations,
  hi: hiTranslations,
  ur: urTranslations,
  ar: arTranslations
};

// Map of language codes to their display names
export const languageNames = {
  en: 'English',
  bn: 'বাংলা',
  de: 'Deutsch',
  fr: 'Français',
  hi: 'हिन्दी',
  ur: 'اردو',
  ar: 'العربية'
};

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [texts, setTexts] = useState(translations.en);

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
      setTexts(translations[savedLanguage]);
      document.documentElement.lang = savedLanguage;
      document.documentElement.dir = savedLanguage === 'ar' || savedLanguage === 'ur' ? 'rtl' : 'ltr';
    }
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      setTexts(translations[lang]);
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' || lang === 'ur' ? 'rtl' : 'ltr';
    }
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        texts, 
        changeLanguage, 
        availableLanguages: Object.keys(translations),
        languageNames
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext; 