import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff,
  FiUser,
  FiKey,
  FiShield,
  FiArrowLeft,
  FiUserPlus
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import './auth.css';

// Configure axios defaults
axios.defaults.withCredentials = true;

const AdminRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretKey: '',
    role: 'admin'
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
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.secretKey) {
      newErrors.secretKey = 'Secret key is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); 
    
    if (!validateForm()) {
      console.log('Form validation failed', errors); 
      return;
    }

    setLoading(true);
    console.log('Sending registration request with data:', { 
      name: formData.name, 
      email: formData.email,
      secretKey: formData.secretKey,
      password: '[HIDDEN]'
    }); 
    
    try {
      // Send registration request to backend
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        secretKey: formData.secretKey,
        role: 'admin'
      });

      console.log('Registration response:', response.data); 

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        
        // Set default authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        toast.success('Registration successful!');
        
        console.log('Redirecting to home page...'); 
        // Redirect to DASHBOARD PAGE
        navigate('/dashboard');
      } else {
        console.log('Registration failed:', response.data.message); 
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error details:', error); 
      console.log('Error response:', error.response?.data); 
      
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      console.log('Loading set to false'); 
    }
  };

  const handleLoginClick = () => {
    console.log('Navigating to login page'); 
    navigate('/admin-login');
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
          <p className="brand-subtitle">Admin Registration</p>
          <div className="brand-info-box">
            <h3>Why Register?</h3>
            <ul>
              <li>✓ Full access to admin dashboard</li>
              <li>✓ Manage products and inventory</li>
              <li>✓ View analytics and reports</li>
              <li>✓ Control user permissions</li>
            </ul>
          </div>
          <div className="brand-secret-hint">
            <FiKey />
            <span>Secret Key Required for Registration</span>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="auth-form-section">
        <motion.div 
          className="auth-form-card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button onClick={handleLoginClick} className="back-to-login">
            <FiArrowLeft /> Back to Login
          </button>

          <div className="auth-form-header">
            <h2>Admin Registration</h2>
            <p>Create your admin account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>
                <FiUser className="input-icon" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>
                <FiMail className="input-icon" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="admin@jrandsons.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>
                <FiKey className="input-icon" />
                Admin Secret Key
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showSecretKey ? 'text' : 'password'}
                  name="secretKey"
                  placeholder="Enter secret key"
                  value={formData.secretKey}
                  onChange={handleChange}
                  className={errors.secretKey ? 'error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowSecretKey(!showSecretKey)}
                >
                  {showSecretKey ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.secretKey && <span className="error-message">{errors.secretKey}</span>}
              <span className="field-hint">Use: Admin@1234 (demo key)</span>
            </div>

            <div className="form-row">
              <div className="form-group half-width">
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

              <div className="form-group half-width">
                <label>
                  <FiLock className="input-icon" />
                  Confirm
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            <button
              type="submit"
              className="auth-button register-button"
              disabled={loading}
            >
              {loading ? (
                <div className="loader"></div>
              ) : (
                <>
                  <FiUserPlus /> Register Account
                </>
              )}
            </button>

            <div className="auth-terms">
              <p>
                By registering, you agree to our{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>
              </p>
            </div>

            <div className="security-badge">
              <FiShield />
              <span>All data is encrypted and secure</span>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminRegister;