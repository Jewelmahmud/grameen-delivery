import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import '../styles/AuthPages.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { texts } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setError(texts.auth.register.allFieldsRequired);
      return;
    }
    
    if (password !== confirmPassword) {
      setError(texts.auth.register.passwordsNotMatch);
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      // Mock registration functionality for now
      // This should be replaced with actual API call
      console.log('Registration attempt with:', { name, email, password });
      
      // Simulating successful registration
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 1000);
      
    } catch (err) {
      setLoading(false);
      setError(texts.auth.register.registrationFailed);
      console.error(err);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Register with ${provider}`);
    // This would be replaced with actual OAuth integration
    setError('');
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('auth_token', `mock_${provider}_token_123`);
      localStorage.setItem('user_role', 'user');
      navigate('/user');
    }, 1000);
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{texts.auth.register.title}</h2>
            <p>{texts.auth.register.subtitle}</p>
          </div>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{texts.auth.register.name}</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={texts.auth.register.namePlaceholder}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">{texts.auth.register.email}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={texts.auth.register.emailPlaceholder}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">{texts.auth.register.password}</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={texts.auth.register.passwordPlaceholder}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">{texts.auth.register.confirmPassword}</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={texts.auth.register.confirmPasswordPlaceholder}
                required
              />
            </div>
            
            <button
              type="submit"
              className={`auth-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? texts.auth.register.registering : texts.auth.register.registerButton}
            </button>
          </form>
          
          <div className="auth-divider">
            <span>{texts.auth.register.orRegisterWith}</span>
          </div>
          
          <div className="social-login-options">
            <button
              onClick={() => handleSocialLogin('google')}
              className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2 w-100 mb-2"
            >
              <img
                src="/images/social/google.svg"
                alt="Google"
                width="20"
                height="20"
              />
              {texts.auth.register.google}
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2 w-100"
            >
              <img
                src="/images/social/facebook.svg"
                alt="Facebook"
                width="20"
                height="20"
              />
              {texts.auth.register.facebook}
            </button>
          </div>
          
          <div className="auth-redirect">
            <span>{texts.auth.register.haveAccount}</span>
            <Link to="/login">{texts.auth.register.loginHere}</Link>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default RegisterPage; 