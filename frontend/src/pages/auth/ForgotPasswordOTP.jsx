import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, 
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiArrowLeft,
  FiCheckCircle,
  FiKey
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import './auth.css';

// Configure axios defaults
axios.defaults.withCredentials = true;

const ForgotPasswordOTP = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: New Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

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

  const validateEmail = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter complete 6-digit OTP');
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startTimer = () => {
    setTimer(60);
    setCanResend(false);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password/send-otp', {
        email
      });

      if (response.data.success) {
        toast.success('OTP sent to your email!');
        setStep(2);
        startTimer();
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to send OTP';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password/send-otp', {
        email
      });

      if (response.data.success) {
        toast.success('New OTP sent to your email!');
        startTimer();
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

const handleVerifyOTP = async (e) => {
  e.preventDefault();
  if (!validateOTP()) return;

  setLoading(true);

  try {
    const otpString = otp.join('');

    const response = await axios.post(
      'http://localhost:5000/api/auth/forgot-password/verify-otp',
      {
        email,
        otp: otpString
      }
    );

    if (response.data.success) {
      toast.success('OTP verified successfully!');
      setStep(3);
    }

  } catch (error) {
    console.error('Verify OTP error:', error);

    const message = error.response?.data?.message;

    if (message === "Invalid OTP") {
      toast.error("Wrong OTP. Please try again.");
    } else if (message === "OTP has expired. Please request a new OTP.") {
      toast.error("OTP expired. Please resend OTP.");
    } else {
      toast.error(message || "Verification failed");
    }

  } finally {
    setLoading(false);
  }
};

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password/reset', {
        email,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      });

      if (response.data.success) {
        // Store token and admin data for auto-login
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        toast.success('Password reset successful!');
        
        // Redirect to home page
        setTimeout(() => {
          navigate('/admin-login');
        }, 1500);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.response?.data?.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/admin-login');
  };

  return (
    <div className="auth-container">
      {/* Left Side - Brand Section */}
      <div className="auth-brand-section">
        <div className="brand-content">
          <div className="brand-logo">
            <h1 style={{ color: 'white', fontSize: '48px' }}>VR & SONS</h1>
          </div>
          <h1 className="brand-title">VR & SONS</h1>
          <div className="brand-divider"></div>
          <p className="brand-subtitle">Password Recovery</p>
          <div className="brand-info-box">
            <h3>Recovery Process</h3>
            <ul>
              <li>✓ Step 1: Enter your email</li>
              <li>✓ Step 2: Verify OTP (sent to email)</li>
              <li>✓ Step 3: Create new password</li>
              <li>✓ Step 4: Auto-login</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-form-section">
        <motion.div 
          className="auth-form-card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button onClick={handleBackToLogin} className="back-to-login">
            <FiArrowLeft /> Back to Login
          </button>

          <div className="auth-form-header">
            <h2>
              {step === 1 && 'Forgot Password'}
              {step === 2 && 'Verify OTP'}
              {step === 3 && 'Reset Password'}
            </h2>
            <p>
              {step === 1 && 'Enter your email to receive OTP'}
              {step === 2 && `Enter the 6-digit OTP sent to ${email}`}
              {step === 3 && 'Create a new password for your account'}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <span>Email</span>
            </div>
            <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span>OTP</span>
            </div>
            <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span>Reset</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSendOTP}
                className="auth-form"
              >
                <div className="form-group">
                  <label>
                    <FiMail className="input-icon" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="admin@vrandsons.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <button
                  type="submit"
                  className="auth-button login-button"
                  disabled={loading}
                >
                  {loading ? <div className="loader"></div> : 'Send OTP'}
                </button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleVerifyOTP}
                className="auth-form"
              >
                <div className="otp-container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="otp-input"
                    />
                  ))}
                </div>

                <div className="timer-container">
                  {timer > 0 ? (
                    <p className="timer-text">Resend OTP in {timer} seconds</p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="resend-button"
                      disabled={loading}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="auth-button login-button"
                  disabled={loading}
                >
                  {loading ? <div className="loader"></div> : 'Verify OTP'}
                </button>
              </motion.form>
            )}

            {step === 3 && (
              <motion.form
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleResetPassword}
                className="auth-form"
              >
                <div className="form-group">
                  <label>
                    <FiLock className="input-icon" />
                    New Password
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="newPassword"
                      placeholder="••••••••"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={errors.newPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                </div>

                <div className="form-group">
                  <label>
                    <FiLock className="input-icon" />
                    Confirm Password
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

                <button
                  type="submit"
                  className="auth-button login-button"
                  disabled={loading}
                >
                  {loading ? <div className="loader"></div> : 'Reset Password'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="security-badge">
            <FiShield />
            <span>Secure OTP verification</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 30px 0;
          padding: 0 20px;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f0f0f0;
          color: #999;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .step.active .step-number {
          background: #7C2F26;
          color: white;
        }

        .step span {
          font-size: 12px;
          color: #666;
        }

        .step.active span {
          color: #7C2F26;
          font-weight: 600;
        }

        .step-line {
          width: 60px;
          height: 2px;
          background: #f0f0f0;
          margin: 0 10px;
          transition: all 0.3s ease;
        }

        .step-line.active {
          background: #7C2F26;
        }

        .otp-container {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin: 20px 0;
        }

        .otp-input {
          width: 50px;
          height: 60px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          background: #f8f8f8;
          transition: all 0.3s ease;
        }

        .otp-input:focus {
          outline: none;
          border-color: #7C2F26;
          background: white;
          box-shadow: 0 0 0 4px rgba(124, 47, 38, 0.1);
        }

        .timer-container {
          text-align: center;
          margin: 15px 0;
        }

        .timer-text {
          color: #666;
          font-size: 14px;
        }

        .resend-button {
          background: none;
          border: none;
          color: #7C2F26;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          transition: color 0.3s ease;
        }

        .resend-button:hover {
          color: #9B3E31;
          text-decoration: underline;
        }

        .resend-button:disabled {
          color: #999;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordOTP;