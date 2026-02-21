import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  LogOut,
  Upload,
  BadgeCheck,
  Edit2,
  Save,
  X,
  Eye,
  EyeOff,
  Key,
  AlertCircle,
  CheckCircle,
  Camera,
  Smartphone,
  Laptop,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Configure axios defaults
axios.defaults.withCredentials = true;

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Error states
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: "Chrome on Windows", location: "Surat, India", current: true },
    { id: 2, device: "Safari on iPhone", location: "Mumbai, India", current: false },
  ]);
  
  // Get admin data from localStorage
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    role: "",
    email: "",
    photo: null,
    twoFA: false,
    lastLogin: "",
  });

  const [originalProfile, setOriginalProfile] = useState({}); // Store original for comparison

  const [password, setPassword] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Load admin data from localStorage
  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = () => {
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      try {
        const admin = JSON.parse(adminData);
        const username = admin.email ? admin.email.split('@')[0] : '';
        
        const profileData = {
          name: admin.name || "Admin User",
          username: username,
          role: admin.role || "Administrator",
          email: admin.email || "",
          photo: null,
          twoFA: false,
          lastLogin: admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : new Date().toLocaleString(),
        };
        
        setProfile(profileData);
        setOriginalProfile(profileData); // Store original for comparison
      } catch (error) {
        console.error("Error parsing admin data:", error);
        navigate('/admin-login');
      }
    } else {
      navigate('/admin-login');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, photo: reader.result });
        toast.success("Profile picture selected");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setProfileError(""); // Clear error when typing
    setSaveSuccess(false); // Clear success message when making changes
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
    setPasswordError(""); // Clear error when typing
    setPasswordSuccess(false); // Clear success message when typing
    
    // Clear field-specific error
    if (passwordErrors[e.target.name]) {
      setPasswordErrors({
        ...passwordErrors,
        [e.target.name]: ""
      });
    }
  };

  const validatePassword = () => {
    const errors = {};
    
    if (!password.current) {
      errors.current = "Current password is required";
    }
    
    if (!password.newPass) {
      errors.newPass = "New password is required";
    } else if (password.newPass.length < 8) {
      errors.newPass = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password.newPass)) {
      errors.newPass = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(password.newPass)) {
      errors.newPass = "Password must contain at least one number";
    }
    
    if (!password.confirm) {
      errors.confirm = "Please confirm your new password";
    } else if (password.newPass !== password.confirm) {
      errors.confirm = "Passwords do not match";
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

 const saveProfile = async () => {
  setLoading(true);
  setProfileError("");
  setSaveSuccess(false);
  
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.log('No token found');
      toast.error("You are not authenticated. Please login again.");
      navigate('/admin-login');
      return;
    }

    console.log('Token:', token);
    console.log('Sending profile update with data:', { name: profile.name });

    // Check if name is changed
    if (profile.name === originalProfile.name) {
      console.log('No changes to save');
      toast.success("No changes to save");
      setIsEditing(false);
      setLoading(false);
      return;
    }
    
    // Prepare data to send to backend
    const profileData = {
      name: profile.name,
    };
    
    // Make API call to update profile
    const response = await axios.put(
      'http://localhost:5000/api/profile/update',
      profileData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Profile update response:', response.data);
    
    if (response.data.success) {
      // Update localStorage with new data
      const adminData = JSON.parse(localStorage.getItem('admin'));
      const updatedAdmin = { ...adminData, name: profile.name };
      localStorage.setItem('admin', JSON.stringify(updatedAdmin));
      
      // Update original profile with new values
      setOriginalProfile({ ...originalProfile, name: profile.name });
      
      setSaveSuccess(true);
      setProfileError("");
      toast.success("Profile updated successfully!", {
        duration: 3000,
        icon: '✅'
      });
      
      setIsEditing(false);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  } catch (error) {
    console.error("Profile update error - Full error:", error);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      console.log("Error response data:", error.response.data);
      console.log("Error response status:", error.response.status);
      console.log("Error response headers:", error.response.headers);
      
      if (error.response.status === 401) {
        setProfileError("Session expired. Please login again.");
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          localStorage.clear();
          navigate('/admin-login');
        }, 2000);
      } else if (error.response.status === 404) {
        setProfileError("API endpoint not found. Check backend routes.");
        toast.error("API endpoint not found. Check backend routes.");
      } else {
        const errorMsg = error.response.data?.message || "Failed to update profile";
        setProfileError(errorMsg);
        toast.error(errorMsg);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Error request:", error.request);
      setProfileError("No response from server. Is backend running?");
      toast.error("Cannot connect to server. Make sure backend is running on port 5000");
    } else {
      // Something happened in setting up the request
      console.log("Error message:", error.message);
      setProfileError("Error: " + error.message);
      toast.error("Error: " + error.message);
    }
  } finally {
    setLoading(false);
  }
};

 const changePassword = async () => {
  // Clear previous errors
  setPasswordError("");
  setPasswordSuccess(false);
  
  // Validate password
  if (!validatePassword()) {
    return;
  }
  
  setPasswordLoading(true);
  
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.log('No token found');
      toast.error("You are not authenticated. Please login again.");
      navigate('/admin-login');
      return;
    }
    
    console.log('Sending password change request');
    
    const response = await axios.post(
      'http://localhost:5000/api/profile/change-password',
      {
        currentPassword: password.current,
        newPassword: password.newPass,
        confirmPassword: password.confirm
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log("Password change response:", response.data);
    
    if (response.data.success) {
      setPasswordSuccess(true);
      setPasswordError("");
      
      // Clear password fields
      setPassword({
        current: "",
        newPass: "",
        confirm: "",
      });
      setPasswordErrors({});
      
      toast.success("Password changed successfully!", {
        duration: 3000,
        icon: '🔐'
      });
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setPasswordSuccess(false), 3000);
    }
  } catch (error) {
    console.error("Password change error - Full error:", error);
    
    if (error.response) {
      console.log("Error response data:", error.response.data);
      console.log("Error response status:", error.response.status);
      
      if (error.response.status === 401) {
        if (error.response.data?.message === "Current password is incorrect") {
          setPasswordError("Current password is incorrect");
          setPasswordErrors({ ...passwordErrors, current: "Current password is incorrect" });
          toast.error("Current password is incorrect");
        } else {
          setPasswordError("Session expired. Please login again.");
          toast.error("Session expired. Please login again.");
          setTimeout(() => {
            localStorage.clear();
            navigate('/admin-login');
          }, 2000);
        }
      } else if (error.response.status === 404) {
        setPasswordError("API endpoint not found. Check backend routes.");
        toast.error("API endpoint not found. Check backend routes.");
      } else {
        const errorMsg = error.response.data?.message || "Failed to change password";
        setPasswordError(errorMsg);
        toast.error(errorMsg);
      }
    } else if (error.request) {
      console.log("Error request:", error.request);
      setPasswordError("No response from server. Is backend running?");
      toast.error("Cannot connect to server. Make sure backend is running on port 5000");
    } else {
      console.log("Error message:", error.message);
      setPasswordError("Error: " + error.message);
      toast.error("Error: " + error.message);
    }
  } finally {
    setPasswordLoading(false);
  }
};

  const logoutAllDevices = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/admin-login');
        return;
      }
      
      await axios.post(
        'http://localhost:5000/api/profile/logout-all',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      localStorage.clear();
      toast.success("Logged out from all devices", {
        duration: 3000,
        icon: '👋'
      });
      navigate('/admin-login');
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout from all devices");
    }
  };

  const cancelEditing = () => {
    // Revert changes by reloading from original
    setProfile(originalProfile);
    setIsEditing(false);
    setProfileError("");
    toast("Editing cancelled", { icon: "✏️" });
  };

  const terminateSession = (sessionId) => {
    setActiveSessions(activeSessions.filter(s => s.id !== sessionId));
    toast.success("Session terminated successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Edit Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800 font-serif">
              Profile Settings
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Manage your account information and security
            </p>
          </div>
          
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-3 sm:mt-0 flex items-center gap-2 bg-orange-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2 mt-3 sm:mt-0">
              <button
                onClick={cancelEditing}
                className="flex items-center gap-2 bg-stone-400 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-stone-500 transition-all"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          )}
        </div>

        {/* Success Message for Profile Update */}
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 md:mb-6 p-3 md:p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg flex items-center gap-3 text-sm"
          >
            <CheckCircle size={18} />
            <span className="font-medium">Profile updated successfully! Your changes have been saved to the database.</span>
          </motion.div>
        )}

        {/* Error Message for Profile Update */}
        {profileError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3 text-sm"
          >
            <AlertCircle size={18} />
            <span className="font-medium">{profileError}</span>
          </motion.div>
        )}

        {/* Success Message for Password Change */}
        {passwordSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 md:mb-6 p-3 md:p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg flex items-center gap-3 text-sm"
          >
            <CheckCircle size={18} />
            <span className="font-medium">Password changed successfully!</span>
          </motion.div>
        )}

        {/* Error Message for Password Change */}
        {passwordError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3 text-sm"
          >
            <AlertCircle size={18} />
            <span className="font-medium">{passwordError}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* LEFT PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-stone-200">
              <div className="flex flex-col items-center text-center">
                {/* Profile Photo */}
                <div className="relative group mb-3">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 overflow-hidden border-4 border-white shadow-xl">
                    {profile.photo ? (
                      <img
                        src={profile.photo}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-amber-500">
                        <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Upload Button - Only show when editing */}
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-orange-600 text-white p-1.5 sm:p-2 rounded-full cursor-pointer hover:bg-orange-700 transition-all shadow-lg hover:scale-110">
                      <Camera size={14} className="sm:w-4 sm:h-4" />
                      <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                    </label>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-stone-800">{profile.name}</h3>
                <p className="text-xs sm:text-sm text-stone-500">@{profile.username}</p>

                <span className="mt-2 flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-600 px-2 sm:px-3 py-1 rounded-full">
                  <BadgeCheck size={12} className="sm:w-3 sm:h-3" /> {profile.role}
                </span>

                <div className="mt-4 w-full border-t border-stone-100 pt-3 sm:pt-4">
                  <p className="text-xs sm:text-sm text-stone-600 flex items-center justify-center gap-2">
                    <Mail size={14} className="sm:w-4 sm:h-4" /> {profile.email}
                  </p>
                  <p className="text-xs text-stone-400 mt-2">
                    Last Login: {profile.lastLogin}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SETTINGS */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* BASIC INFO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-stone-200"
            >
              <h3 className="text-base sm:text-lg font-bold text-stone-800 mb-1">Basic Information</h3>
              <p className="text-xs sm:text-sm text-stone-500 mb-4">Update your personal details</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <Input
                  icon={<User size={16} className="sm:w-4 sm:h-4" />}
                  label="Full Name"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  editing={isEditing}
                />
                
                <Input
                  icon={<Mail size={16} className="sm:w-4 sm:h-4" />}
                  label="Username"
                  name="username"
                  value={profile.username}
                  disabled={true} // Username cannot be changed (derived from email)
                  editing={false}
                />
                
                <Input
                  icon={<Mail size={16} className="sm:w-4 sm:h-4" />}
                  label="Email Address"
                  name="email"
                  value={profile.email}
                  disabled={true}
                  editing={false}
                  className="md:col-span-2"
                />
              </div>

              {/* Save Changes Button inside Basic Info when editing */}
              {isEditing && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={saveProfile}
                    disabled={loading || profile.name === originalProfile.name}
                    className={`flex items-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      loading || profile.name === originalProfile.name
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-orange-700 hover:shadow-lg'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>

            {/* CHANGE PASSWORD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-stone-200"
            >
              <h3 className="text-base sm:text-lg font-bold text-stone-800 mb-1">Change Password</h3>
              <p className="text-xs sm:text-sm text-stone-500 mb-4">
                Password must be at least 8 characters with uppercase and number
              </p>

              <div className="space-y-3 md:space-y-4">
                <PasswordInput
                  icon={<Lock size={16} className="sm:w-4 sm:h-4" />}
                  label="Current Password"
                  name="current"
                  value={password.current}
                  onChange={handlePasswordChange}
                  showPassword={showCurrentPassword}
                  toggleShow={() => setShowCurrentPassword(!showCurrentPassword)}
                  error={passwordErrors.current}
                />
                
                <PasswordInput
                  icon={<Lock size={16} className="sm:w-4 sm:h-4" />}
                  label="New Password"
                  name="newPass"
                  value={password.newPass}
                  onChange={handlePasswordChange}
                  showPassword={showNewPassword}
                  toggleShow={() => setShowNewPassword(!showNewPassword)}
                  error={passwordErrors.newPass}
                />
                
                <PasswordInput
                  icon={<Lock size={16} className="sm:w-4 sm:h-4" />}
                  label="Confirm New Password"
                  name="confirm"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  showPassword={showConfirmPassword}
                  toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                  error={passwordErrors.confirm}
                />

                <div className="flex justify-end">
                  <button
                    onClick={changePassword}
                    disabled={passwordLoading}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {passwordLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Changing...
                      </>
                    ) : (
                      <>
                        <Key size={16} /> Change Password
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* TWO FACTOR AUTH */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-stone-200"
            >
              <h3 className="text-base sm:text-lg font-bold text-stone-800 mb-1">Two-Factor Authentication</h3>
              <p className="text-xs sm:text-sm text-stone-500 mb-4">
                Add an extra layer of security to your account
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-sm">2FA Status</p>
                    <p className="text-xs text-stone-500">
                      Secure your account with OTP verification
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setProfile({ ...profile, twoFA: !profile.twoFA });
                    toast.success(`2FA ${!profile.twoFA ? 'enabled' : 'disabled'} successfully`);
                  }}
                  disabled={!isEditing}
                  className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition text-sm ${
                    profile.twoFA
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-stone-200 text-stone-600 hover:bg-stone-300"
                  } ${!isEditing && 'opacity-50 cursor-not-allowed'}`}
                >
                  {profile.twoFA ? "Enabled" : "Disabled"}
                </button>
              </div>
            </motion.div>

            {/* ACTIVE SESSIONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-stone-200"
            >
              <h3 className="text-base sm:text-lg font-bold text-stone-800 mb-1">Active Sessions</h3>
              <p className="text-xs sm:text-sm text-stone-500 mb-4">
                Devices where you're currently logged in
              </p>

              <div className="space-y-3">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {session.device.includes('Windows') ? (
                        <Laptop size={18} className="text-stone-600" />
                      ) : (
                        <Smartphone size={18} className="text-stone-600" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-stone-800">
                          {session.device} {session.current && "(Current)"}
                        </p>
                        <p className="text-xs text-stone-500">{session.location}</p>
                      </div>
                    </div>
                    {!session.current && (
                      <button
                        onClick={() => terminateSession(session.id)}
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Terminate
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* LOGOUT ALL BUTTON */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-stone-200"
            >
              <div className="flex justify-end">
                <button
                  onClick={logoutAllDevices}
                  className="flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all"
                >
                  <LogOut size={16} /> Logout from all devices
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* INPUT COMPONENT */
const Input = ({ icon, label, error, editing, className = "", ...props }) => (
  <div className={`space-y-1 ${className}`}>
    <label className="text-xs font-medium text-stone-600 flex items-center gap-1">
      {label}
      {props.required && <span className="text-red-500">*</span>}
    </label>
    <div className={`flex items-center gap-2 sm:gap-3 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 transition-all ${
      editing 
        ? 'bg-white border-2 border-orange-200 focus-within:border-orange-500' 
        : 'bg-stone-50 border-2 border-stone-100'
    }`}>
      <span className={editing ? 'text-orange-600' : 'text-stone-400'}>{icon}</span>
      <input
        {...props}
        className="bg-transparent outline-none w-full text-xs sm:text-sm"
      />
    </div>
    {error && (
      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
        <AlertCircle size={12} /> {error}
      </p>
    )}
  </div>
);

/* PASSWORD INPUT COMPONENT */
const PasswordInput = ({ icon, label, showPassword, toggleShow, error, ...props }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-stone-600">{label}</label>
    <div className={`flex items-center gap-2 sm:gap-3 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 transition-all bg-white border-2 ${
      error ? 'border-red-300' : 'border-stone-200 focus-within:border-orange-500'
    }`}>
      <span className={error ? 'text-red-500' : 'text-stone-400'}>{icon}</span>
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className="bg-transparent outline-none w-full text-xs sm:text-sm"
      />
      <button
        type="button"
        onClick={toggleShow}
        className="text-stone-400 hover:text-stone-600"
      >
        {showPassword ? <EyeOff size={16} className="sm:w-4 sm:h-4" /> : <Eye size={16} className="sm:w-4 sm:h-4" />}
      </button>
    </div>
    {error && (
      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
        <AlertCircle size={12} /> {error}
      </p>
    )}
  </div>
);

export default ProfileSettings;