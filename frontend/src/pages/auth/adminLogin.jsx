import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff,
  FiLogIn,
  FiShield,
  FiArrowRight
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import './auth.css';

// Configure axios defaults
axios.defaults.withCredentials = true;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted');
    
    if (!validateForm()) {
      console.log('Login validation failed', errors);
      return;
    }

    setLoading(true);
    console.log('Sending login request for email:', formData.email);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      console.log('Login response:', response.data);

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        
        // Set default authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        toast.success('Login successful!');
        console.log('Redirecting to home page...');
        
        // Redirect to HOME PAGE (root path)
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      console.log('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate('/admin-register');
  };

  return (
    <div className="auth-container">
      {/* Left Side - Brand Section */}
      <div className="auth-brand-section">
        <div className="brand-content">
          <div className="brand-logo">
            <h1 style={{ color: 'white', fontSize: '48px' }}></h1>
          </div>
          <h1 className="brand-title">VR & SONS</h1>
          <div className="brand-divider"></div>
          <p className="brand-subtitle">Est. </p>
          <p className="brand-description">
            Crafting excellence in every endeavor, building trust across generations.
          </p>
          <div className="brand-quote">
            "Quality is not an act, it's a habit"
          </div>
          <div className="brand-features">
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>Enterprise Grade Security</span>
            </div>
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>24/7 Admin Support</span>
            </div>
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>Real-time Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-form-section">
        <motion.div 
          className="auth-form-card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-form-header">
            <h2>Admin Login</h2>
            <p>Welcome back! Please enter your credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>
                <FiMail className="input-icon" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="admin@vrandsons.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>
                <FiLock className="input-icon" />
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-link">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="auth-button login-button"
              disabled={loading}
            >
              {loading ? (
                <div className="loader"></div>
              ) : (
                <>
                  <FiLogIn /> Sign In
                </>
              )}
            </button>

            <div className="auth-divider">
              <span>New to VR & SONS?</span>
            </div>

            <button
              type="button"
              onClick={handleRegisterClick}
              className="auth-button register-button"
            >
              Create Admin Account <FiArrowRight />
            </button>

            <div className="security-badge">
              <FiShield />
              <span>Secured by 256-bit encryption</span>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;