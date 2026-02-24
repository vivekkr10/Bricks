import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiArrowLeft,
  FiKey,
  FiAlertCircle,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import "./auth.css";

// Configure axios defaults
axios.defaults.withCredentials = true;

const ForgotPasswordOTP = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Error states for each step
  const [step1Error, setStep1Error] = useState("");
  const [step2Error, setStep2Error] = useState("");
  const [step3Error, setStep3Error] = useState("");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setStep2Error(""); // Clear error when user types

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setStep3Error(""); // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!secretKey) {
      newErrors.secretKey = "Admin secret key is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setStep2Error("Please enter complete 6-digit OTP");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
    console.log("1️⃣ Form submitted");
    setStep1Error("");

    if (!validateStep1()) {
      console.log("2️⃣ Validation failed");
      return;
    }

    console.log("3️⃣ Validation passed, sending request...");
    console.log("4️⃣ Data being sent:", { email, secretKey });

    setLoading(true);

    try {
      const response = await axios.post("/api/auth/forgot-password/send-otp", {
        email,
        secretKey,
      });

      console.log("5️⃣ Response received:", response);
      console.log("6️⃣ Response data:", response.data);
      console.log("7️⃣ Response status:", response.status);

      if (response.data && response.data.success === true) {
        console.log("8️⃣ Success! Moving to step 2");
        toast.success("OTP sent to your email!");
        setStep(2);
        startTimer();
      } else {
        console.log("8️⃣ Success false in response");
        setStep1Error(response.data?.message || "Failed to send OTP");
      }
    } catch (error) {
      console.log("❌ ERROR CAUGHT:");
      console.log("Error object:", error);
      console.log("Error response:", error.response);
      console.log("Error response data:", error.response?.data);
      console.log("Error response status:", error.response?.status);
      console.log("Error message:", error.message);

      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;

        if (status === 401) {
          setStep1Error("❌ Admin secret key is incorrect");
        } else if (status === 404) {
          setStep1Error("❌ This email is not registered");
        } else {
          setStep1Error(message || "Failed to send OTP");
        }
      } else if (error.request) {
        console.log("No response received:", error.request);
        setStep1Error(
          "❌ No response from server. Please check your connection.",
        );
      } else {
        console.log("Error setting up request:", error.message);
        setStep1Error("❌ Error sending request. Please try again.");
      }
    } finally {
      setLoading(false);
      console.log("9️⃣ Loading finished");
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setLoading(true);
    setStep2Error(""); // Clear previous error

    try {
      const response = await axios.post("/api/auth/forgot-password/send-otp", {
        email,
        secretKey,
      });

      if (response.data && response.data.success === true) {
        toast.success("New OTP sent to your email!");
        startTimer();
      } else {
        setStep2Error(response.data?.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);

      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;

        if (status === 401) {
          setStep2Error("❌ Admin secret key is incorrect");
        } else if (status === 404) {
          setStep2Error("❌ This email is not registered");
        } else {
          setStep2Error(message || "Failed to resend OTP");
        }
      } else {
        setStep2Error("❌ Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setStep2Error("");

    if (!validateOTP()) return;

    setLoading(true);

    try {
      const otpString = otp.join("");

      const response = await axios.post(
        "/api/auth/forgot-password/verify-otp",
        {
          email,
          otp: otpString,
        },
      );

      if (response.data.success) {
        toast.success("OTP verified successfully!");
        setStep(3);
      }
    } catch (error) {
      console.error("Verify OTP error:", error);

      const message = error.response?.data?.message;

      if (message === "Invalid OTP") {
        setStep2Error("❌ Incorrect OTP. Please try again.");
      } else if (message === "OTP has expired. Please request a new OTP.") {
        setStep2Error("⏰ OTP expired. Please request new OTP.");
      } else {
        setStep2Error(message || "Verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setStep3Error(""); // Clear previous error

    if (!validatePassword()) return;

    setLoading(true);

    try {
      const response = await axios.post("/api/auth/forgot-password/reset", {
        email,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      if (response.data.success) {
        toast.success("✅ Password changed successfully! Please login.", {
          duration: 3000,
          icon: "🔐",
        });

        // Clear any stored data
        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        // Redirect to login page
        setTimeout(() => {
          navigate("/admin-login");
        }, 2000);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setStep3Error(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/admin-login");
  };

  return (
    <div className="admin-auth">
      <div className="auth-container">
        {/* Left Side - Brand Section */}
        <div className="auth-brand-section">
          <div className="brand-content">
            <div className="brand-logo">
              <h1 style={{ color: "white", fontSize: "48px" }}></h1>
            </div>
            <h1 className="brand-title">VR & SONS</h1>
            <div className="brand-divider"></div>
            <p className="brand-subtitle">Password Recovery</p>
            <div className="brand-info-box">
              <h3>Recovery Process</h3>
              <ul>
                <li>✓ Step 1: Enter email + Secret Key</li>
                <li>✓ Step 2: Verify OTP (sent to email)</li>
                <li>✓ Step 3: Create new password</li>
                <li>✓ Step 4: Login with new password</li>
              </ul>
            </div>
            <div className="brand-secret-hint">
              <FiKey />
              <span>Admin Secret Key Required</span>
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
                {step === 1 && "Forgot Password"}
                {step === 2 && "Verify OTP"}
                {step === 3 && "Reset Password"}
              </h2>
              <p>
                {step === 1 && "Enter your email and admin secret key"}
                {step === 2 && `Enter the 6-digit OTP sent to ${email}`}
                {step === 3 && "Create a new password for your account"}
              </p>
            </div>

            {/* Step Indicator */}
            <div className="step-indicator">
              <div className={`step ${step >= 1 ? "active" : ""}`}>
                <div className="step-number">1</div>
                <span>Verify</span>
              </div>
              <div className={`step-line ${step >= 2 ? "active" : ""}`}></div>
              <div className={`step ${step >= 2 ? "active" : ""}`}>
                <div className="step-number">2</div>
                <span>OTP</span>
              </div>
              <div className={`step-line ${step >= 3 ? "active" : ""}`}></div>
              <div className={`step ${step >= 3 ? "active" : ""}`}>
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setStep1Error("");
                      }}
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      <FiKey className="input-icon" />
                      Admin Secret Key
                    </label>
                    <div className="password-input-wrapper">
                      <input
                        type={showSecretKey ? "text" : "password"}
                        placeholder="Enter admin secret key"
                        value={secretKey}
                        onChange={(e) => {
                          setSecretKey(e.target.value);
                          setStep1Error("");
                        }}
                        className={errors.secretKey ? "error" : ""}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowSecretKey(!showSecretKey)}
                      >
                        {showSecretKey ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    {errors.secretKey && (
                      <span className="error-message">{errors.secretKey}</span>
                    )}
                    <span className="field-hint">Use: Admin@1234</span>
                  </div>

                  {/* Step 1 Error Display */}
                  {step1Error && (
                    <motion.div
                      className="error-box"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        backgroundColor: "#ffebee",
                        color: "#c62828",
                        padding: "12px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        border: "1px solid #ef9a9a",
                      }}
                    >
                      <FiAlertCircle size={18} />
                      <span>{step1Error}</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    className="auth-button login-button"
                    disabled={loading}
                  >
                    {loading ? <div className="loader"></div> : "Send OTP"}
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
                        style={step2Error ? { borderColor: "#c62828" } : {}}
                      />
                    ))}
                  </div>

                  {/* Step 2 Error Display */}
                  {step2Error && (
                    <motion.div
                      className="error-box"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        backgroundColor: "#ffebee",
                        color: "#c62828",
                        padding: "12px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        border: "1px solid #ef9a9a",
                        marginBottom: "15px",
                      }}
                    >
                      <FiAlertCircle size={18} />
                      <span>{step2Error}</span>
                    </motion.div>
                  )}

                  <div className="timer-container">
                    {timer > 0 ? (
                      <p className="timer-text">
                        Resend OTP in {timer} seconds
                      </p>
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
                    {loading ? <div className="loader"></div> : "Verify OTP"}
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
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="••••••••"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className={errors.newPassword ? "error" : ""}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <span className="error-message">
                        {errors.newPassword}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      <FiLock className="input-icon" />
                      Confirm Password
                    </label>
                    <div className="password-input-wrapper">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? "error" : ""}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <span className="error-message">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>

                  {/* Step 3 Error Display */}
                  {step3Error && (
                    <motion.div
                      className="error-box"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        backgroundColor: "#ffebee",
                        color: "#c62828",
                        padding: "12px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        border: "1px solid #ef9a9a",
                      }}
                    >
                      <FiAlertCircle size={18} />
                      <span>{step3Error}</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    className="auth-button login-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="loader"></div>
                    ) : (
                      "Reset Password"
                    )}
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
      </div>
    </div>
  );
};

export default ForgotPasswordOTP;
