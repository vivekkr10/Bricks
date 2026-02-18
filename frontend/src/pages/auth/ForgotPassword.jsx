import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiMail, FiArrowLeft, FiSend, FiShield } from "react-icons/fi";
import { toast } from "react-hot-toast";
import "./auth.css";

axios.defaults.withCredentials = true;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email is required");
    }

    setLoading(true);

    try {
  const res = await axios.post(
  "http://localhost:5000/api/auth/forgot-password/send-otp",
  { email }
);
      toast.success(res.data.message || "OTP sent successfully!");
      navigate("/verify-otp", { state: { email } }); // next page
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side - Brand Section (Same as Login) */}
      <div className="auth-brand-section">
        <div className="brand-content">
          <div className="brand-logo">
            <h1 style={{ color: "white", fontSize: "48px" }}></h1>
          </div>
          <h1 className="brand-title">VR & SONS</h1>
          <div className="brand-divider"></div>
          <p className="brand-description">
            Secure password recovery with OTP verification.
          </p>
          <div className="brand-quote">
            "Security is our priority"
          </div>
          <div className="brand-features">
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>Encrypted Email OTP</span>
            </div>
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>Quick Recovery</span>
            </div>
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>Admin Protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="auth-form-section">
        <motion.div
          className="auth-form-card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-form-header">
            <h2>Forgot Password</h2>
            <p>Enter your registered email to receive OTP</p>
          </div>

          <form onSubmit={handleSendOtp} className="auth-form">
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
              />
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
                  <FiSend /> Send OTP
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin-login")}
              className="auth-button register-button"
              style={{ marginTop: "10px" }}
            >
              <FiArrowLeft /> Back to Login
            </button>

            <div className="security-badge">
              <FiShield />
              <span>OTP expires in 5 minutes</span>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
