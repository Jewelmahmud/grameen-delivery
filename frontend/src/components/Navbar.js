import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, texts, changeLanguage, availableLanguages, languageNames } = useLanguage();
  const langMenuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleLangMenu = () => {
    setLangMenuOpen(!langMenuOpen);
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setLangMenuOpen(false);
  };

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo header-logo">
          <Link to="/">
            <img src="/logo.svg" alt="Grameen Delivery" className="logo-image" />
          </Link>
        </div>
        <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link">{texts.nav.home}</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">{texts.nav.about}</Link>
          </li>
          
          <li className="nav-item">
            <Link to="/services" className="nav-link">{texts.nav.services}</Link>
          </li>
          <li className="nav-item">
            <Link to="/partner" className="nav-link">{texts.nav.partner}</Link>
          </li>
          <li className="nav-item">
            <Link to="/rider" className="nav-link">{texts.nav.rider}</Link>
          </li>
        </ul>
        <div className="nav-buttons">
          <li className="nav-item">
            <Link to="/track-order" className="nav-link">{texts.nav.trackOrder}</Link>
          </li>
          <div className="lang-switcher-container" ref={langMenuRef}>
            <div className="lang-switcher" onClick={toggleLangMenu}>
              <span className="lang-icon">🌐</span>
              <span>{languageNames[language]}</span>
              <span className={`dropdown-arrow ${langMenuOpen ? 'open' : ''}`}>	&#11163;</span>
            </div>
            {langMenuOpen && (
              <div className="lang-dropdown">
                {availableLanguages.map((lang) => (
                  <div 
                    key={lang} 
                    className={`lang-option ${lang === language ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(lang)}
                  >
                    {languageNames[lang]}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link to="/login">
            <button className="secondary-btn">{texts.nav.login}</button>
          </Link>
          <Link to="/download-app">
          <button className="primary-btn">{texts.nav.downloadApp}</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 