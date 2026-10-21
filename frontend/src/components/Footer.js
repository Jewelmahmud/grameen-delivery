import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { texts } = useLanguage();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo">
          <img src="/logo.svg" alt="Grameen Delivery" className="footer-logo-image" />
        </div>
        <div className="footer-section">
          <h3>{texts.footer.platform.title}</h3>
          <ul>
            <li><Link to="/">{texts.footer.platform.items.app}</Link></li>
            <li><Link to="/merchant">{texts.footer.platform.items.merchant}</Link></li>
            <li><Link to="/partner">{texts.footer.platform.items.partner}</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>{texts.footer.earn.title}</h3>
          <ul>
            <li><Link to="/earn/partner">{texts.footer.earn.items.partner}</Link></li>
            <li><Link to="/earn/hub">{texts.footer.earn.items.hub}</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>{texts.footer.help.title}</h3>
          <ul>
            <li><Link to="/help/centers">{texts.footer.help.items.centers}</Link></li>
            <li><Link to="/help/user">{texts.footer.help.items.userHelp}</Link></li>
            <li><Link to="/help/partner">{texts.footer.help.items.partnerHelp}</Link></li>
            <li><Link to="/help/contact">{texts.footer.help.items.helpline}</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{texts.footer.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer; 