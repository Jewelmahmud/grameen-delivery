import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import '../styles/AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { texts } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError(texts.auth.login.emailRequired);
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      // Mock login functionality for now
      // This should be replaced with actual API call
      console.log('Login attempt with:', { email, password });
      
      // Simulating successful login
      setTimeout(() => {
        // Determine dashboard based on user role (this would come from API response)
        let userRole = '';
        
        if (email.includes('admin')) {
          userRole = 'admin';
        } else if (email.includes('partner')) {
          userRole = 'partner';
        } else if (email.includes('rider')) {
          userRole = 'rider';
        } else {
          userRole = 'user';
        }
        
        // Store auth token (would come from API)
        localStorage.setItem('auth_token', 'mock_token_123');
        localStorage.setItem('user_role', userRole);
        
        // Redirect to appropriate dashboard
        setLoading(false);
        navigate(`/${userRole}`);
      }, 1000);
      
    } catch (err) {
      setLoading(false);
      setError(texts.auth.login.invalidCredentials);
      console.error(err);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
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
            <h2>{texts.auth.login.title}</h2>
            <p>{texts.auth.login.subtitle}</p>
          </div>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{texts.auth.login.email}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={texts.auth.login.emailPlaceholder}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">{texts.auth.login.password}</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={texts.auth.login.passwordPlaceholder}
                required
              />
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">{texts.auth.login.rememberMe}</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                {texts.auth.login.forgotPassword}
              </Link>
            </div>
            
            <button
              type="submit"
              className={`auth-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? texts.auth.login.loggingIn : texts.auth.login.loginButton}
            </button>
          </form>
          
          <div className="auth-divider">
            <span>{texts.auth.login.orLoginWith}</span>
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
              {texts.auth.login.google}
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
              {texts.auth.login.facebook}
            </button>
          </div>
          
          <div className="auth-redirect">
            <span>{texts.auth.login.noAccount}</span>
            <Link to="/register">{texts.auth.login.registerHere}</Link>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default LoginPage; 