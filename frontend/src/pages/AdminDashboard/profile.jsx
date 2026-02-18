import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  LogOut,
  Upload,
  BadgeCheck,
} from "lucide-react";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: "Admin User",
    username: "admin_01",
    role: "Administrator",
    email: "admin@example.com",
    phone: "9876543210",
    photo: null,
    twoFA: false,
    lastLogin: "Today at 10:42 AM",
  });

  const [password, setPassword] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, photo: URL.createObjectURL(file) });
    }
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    alert("Profile updated successfully");
  };

  const logoutAllDevices = () => {
    alert("Logged out from all devices");
    localStorage.clear();
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-8 text-[#1B2559]">
      <h2 className="text-4xl font-black mb-10">Profile Settings</h2>

      <div className="grid grid-cols-3 gap-8">
        {/* LEFT PROFILE CARD */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white rounded-3xl p-6 shadow-lg"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden mb-4">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-full h-full p-6 text-gray-400" />
              )}
            </div>

            <h3 className="text-xl font-bold">{profile.name}</h3>
            <p className="text-sm text-gray-400">@{profile.username}</p>

            <span className="mt-2 flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-600 px-3 py-1 rounded-full">
              <BadgeCheck size={14} /> {profile.role}
            </span>

            <label className="mt-4 flex items-center gap-2 cursor-pointer text-sm font-semibold text-orange-600">
              <Upload size={16} /> Change Photo
              <input type="file" hidden onChange={handleImageChange} />
            </label>

            <p className="mt-4 text-xs text-gray-400">
              Last Login: {profile.lastLogin}
            </p>
          </div>
        </motion.div>

        {/* RIGHT SETTINGS */}
        <div className="col-span-2 space-y-6">
          {/* BASIC INFO */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-1">Basic Information</h3>
            <p className="text-sm text-gray-400 mb-6">
              Update your personal and contact details
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Input
                icon={<User />}
                label="Full Name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
              />
              <Input
                icon={<User />}
                label="Username"
                name="username"
                value={profile.username}
                onChange={handleProfileChange}
              />
              <Input
                icon={<Mail />}
                label="Email Address"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
              />
              <Input
                icon={<Phone />}
                label="Phone Number"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-1">Change Password</h3>
            <p className="text-sm text-gray-400 mb-6">
              Password must be at least 8 characters
            </p>

            <div className="grid grid-cols-3 gap-4">
              <Input
                icon={<Lock />}
                type="password"
                label="Current Password"
                name="current"
                onChange={handlePasswordChange}
              />
              <Input
                icon={<Lock />}
                type="password"
                label="New Password"
                name="newPass"
                onChange={handlePasswordChange}
              />
              <Input
                icon={<Lock />}
                type="password"
                label="Confirm Password"
                name="confirm"
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-1">Security</h3>
            <p className="text-sm text-gray-400 mb-4">
              Extra protection for your account
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" />
                <div>
                  <p className="font-semibold">
                    Two-Factor Authentication (2FA)
                  </p>
                  <p className="text-xs text-gray-400">
                    Secure your account with OTP verification
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setProfile({ ...profile, twoFA: !profile.twoFA })
                }
                className={`px-6 py-2 rounded-full font-bold transition ${
                  profile.twoFA
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {profile.twoFA ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="bg-white rounded-3xl p-6 shadow-lg flex justify-between items-center">
            <button
              onClick={saveProfile}
              className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700"
            >
              Save Changes
            </button>

            <button
              onClick={logoutAllDevices}
              className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600"
            >
               Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* INPUT COMPONENT */
const Input = ({ icon, label, ...props }) => (
  <div>
    <label className="text-sm font-semibold text-gray-500">{label}</label>
    <div className="mt-1 flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
      {icon}
      <input
        {...props}
        className="bg-transparent outline-none w-full"
      />
    </div>
  </div>
);

export default ProfileSettings;
