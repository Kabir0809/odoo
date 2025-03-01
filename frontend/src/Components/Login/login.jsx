import React, { useState } from 'react';
import './login.css';

const AuthCard = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Citizen'
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', loginData);
    // Add your login logic here
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Signup data:', signupData);
    // Add your signup logic here
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <div className="auth-tabs">
          <button 
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="auth-content">
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="login-email">Email / Phone</label>
                <input
                  type="text"
                  id="login-email"
                  name="email"
                  placeholder="Enter email or phone"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  placeholder="Enter password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="forgot-password">
                <a href="#forgot">Forgot Password?</a>
              </div>
              <button type="submit" className="submit-button">Login</button>
              <div className="social-logins">
                <button type="button" className="social-button google">
                  <span className="icon">G</span> Login with Google
                </button>
                <button type="button" className="social-button aadhaar">
                  <span className="icon">ID</span> Login with Aadhaar
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit}>
              <div className="form-group">
                <label htmlFor="signup-name">Full Name</label>
                <input
                  type="text"
                  id="signup-name"
                  name="fullName"
                  placeholder="Enter full name"
                  value={signupData.fullName}
                  onChange={handleSignupChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-email">Email / Phone</label>
                <input
                  type="text"
                  id="signup-email"
                  name="email"
                  placeholder="Enter email or phone"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  placeholder="Create password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="signup-confirm-password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-role">Select Role</label>
                <select
                  id="signup-role"
                  name="role"
                  value={signupData.role}
                  onChange={handleSignupChange}
                  required
                >
                  <option value="Citizen">Citizen</option>
                  <option value="Business">Business</option>
                  <option value="Government">Government</option>
                </select>
              </div>
              <button type="submit" className="submit-button">Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;