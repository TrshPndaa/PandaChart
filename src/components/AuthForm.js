import React, { useState } from 'react';
import { X } from 'lucide-react';
import { InteractiveBubbles } from '../components/InteractiveBubbles';
import './Auth.css';

const API_URL = 'http://localhost:5000';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard';
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-page-container">
      <InteractiveBubbles />
      <div className="auth-content-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h2 className="auth-title">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className="auth-subtitle">
              {isLogin 
                ? 'Please sign in to continue' 
                : 'Sign up to get started with PandaCharts'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="error-container">
                <div className="error-content">
                  <X className="error-icon" />
                  <p className="error-message">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`submit-button ${loading ? 'submit-button-loading' : ''}`}
            >
              {loading ? '' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>

            <div className="toggle-container">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="toggle-link"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;