import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Save, User, Mail, Phone, Lock, 
  Upload, Briefcase, MapPin, CheckCircle2, 
  AlertCircle, Calendar, ShieldCheck, KeyRound
} from "lucide-react";

const ProfileSettings = ({ onCancel }) => {
  const initialProfile = {
    name: "Admin User",
    username: "admin_01",
    role: "Administrator",
    email: "admin@example.com",
    phone: "9876543210",
    dob: "1995-01-01",
    employeeId: "EMP-BRICK-001",
    department: "Operations",
    designation: "Senior Manager",
    address: "123 Industrial Area, Phase-II",
    district: "Goa",
    state: "Uttar Pradesh",
    pinCode: "273001",
    country: "India",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    photo: null
  };

  const [profile, setProfile] = useState(initialProfile);
  const [savedProfile, setSavedProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // --- 1. Load data from LocalStorage on Mount ---
  useEffect(() => {
    const storedData = localStorage.getItem("adminProfile");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setProfile(parsedData);
      setSavedProfile(parsedData);
    }
  }, []);

  const isDirty = JSON.stringify(profile) !== JSON.stringify(savedProfile);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // --- 2. Save data to LocalStorage ---
  const handleSave = () => {
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("adminProfile", JSON.stringify(profile));
      setSavedProfile(profile);
      setLoading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  const handleBack = () => {
    if (isDirty) {
      if (window.confirm("You have unsaved changes. Leave anyway?")) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  return (
    <div className="min-h-screen p-2 md:p-5 text-[#1C1917] ">
      {/* SUCCESS TOAST */}
      {showToast && (
        <div className="fixed top-10 right-10 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={20} />
          <span className="font-bold text-sm">Profile synchronized successfully!</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6 pb-20">
        {/* STICKY HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-[1.5rem] top-16 z-40 border border-white shadow-sm">
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full hover:bg-red-800 border border-red-700 text-red-700 hover:text-white flex items-center justify-center hover:scale-110 transition-transform" onClick={handleBack}>
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-2xl text-stone-900 font-bold tracking-tight flex font-serif items-center gap-2">
                Admin<span className="text-red-700 font-bold font-serif"> Profile</span>
                {isDirty && <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />}
              </h1>
              <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">
                Master Identity Control
              </p>
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={!isDirty || loading}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold transition-all shadow-lg
              ${isDirty 
                ? "hover:bg-red-800 text-white bg-red-700 scale-105" 
                : "bg-stone-200 text-stone-400 cursor-not-allowed"}`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {loading ? "Syncing..." : "Save Changes"}
          </button>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xl overflow-hidden relative transition-all">
          
          {/* PROFILE IMAGE HEADER SECTION (STYLED FROM IMAGE_D52B99) */}
          <div className="p-2 md:p-10 border-b border-stone-100 bg-gradient-to-b from-white to-[#FAF9F8]">
            <div className="flex items-center gap-3">
              <User size={22} className="text-stone-800" />
              <h2 className="text-xl font-bold font-serif text-stone-900">Basic Details</h2>
            </div>

            {/* <div className="space-y-3">

              <div className="flex flex-col md:flex-row items-center gap-8"> */}
                {/* Dotted Preview Circle */}
                {/* <div className="relative group">
                  <div className="w-55 h-45 rounded-[11rem] border-2 border-solid border-orange-600 flex items-center justify-center overflow-hidden bg-white shadow-inner">
                    {profile.photo ? (
                      <img src={profile.photo} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User size={48} className="text-stone-200" />
                    )}
                  </div>
                </div> */}

                {/* Dotted Upload Box */}
                {/* <label className="flex-1 w-full border-2 border-dashed border-stone-300 rounded-[1.5rem] p-10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-orange-50/30 hover:border-orange-200 transition-all group">
                  <div className="p-3 bg-orange-50 rounded-full text-orange-600 group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-bold text-stone-700">Click to upload profile image</p>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">
                    JPG, PNG, WEBP (Max 5MB)
                  </p>
                  <input type="file" hidden onChange={handlePhotoChange} accept="image/*" />
                </label> */}
              {/* </div>
            </div> */}

            {/* User Badge Info */}
            {/* <div className="mt-8 flex items-center gap-4">
              <div className="h-10 w-1 bg-orange-600 rounded-full" />
              <div>
                <h3 className="text-2xl font-black text-stone-800 tracking-tight leading-none uppercase italic">
                  {profile.name || "Full Name"}
                </h3>
                <p className="text-orange-600 font-bold text-[10px] uppercase tracking-widest mt-1">
                  @{profile.username || "username"} • {profile.designation}
                </p>
              </div>
            </div> */}
          </div>


                    <div className="px-4">
        <div className="h-[3px] bg-red-700" />
      </div>
          {/* FORM CONTENT */}
          <div className="p-8 md:p-8 space-y-5">
            
            {/* PERSONAL IDENTIFICATION */}
            <Section title="Personal Identification" icon={<User size={16} className="text-red-700"/>}>
              <Grid>
                <InputField label="Display Name" name="name" value={profile.name} onChange={handleChange} placeholder="e.g. John Doe" />
                <InputField label="Date of Birth" name="dob" type="date" value={profile.dob} onChange={handleChange} />
                <InputField label="Contact Number" name="phone" value={profile.phone} onChange={handleChange} placeholder="+91 00000 00000" />
                <InputField label="Work Email" name="email" value={profile.email} onChange={handleChange} placeholder="admin@example.com" />
              </Grid>
            </Section>

           <div className="px-4">
        <div className="h-[3px] bg-red-700" />
      </div>


            {/* LOCATION DETAILS */}
            <Section title="Location Details" icon={<MapPin size={16} className="text-red-700"/>}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 <div className="md:col-span-2">
                    <InputField label="Full Street Address" name="address" value={profile.address} onChange={handleChange} placeholder="Building, Street, Landmark" />
                 </div>
                 <InputField label="District / City" name="district" value={profile.district} onChange={handleChange} placeholder="City Name" />
                 <InputField label="State" name="state" value={profile.state} onChange={handleChange} placeholder="State Name" />
                 <InputField label="Pin Code" name="pinCode" value={profile.pinCode} onChange={handleChange} placeholder="000000" />
                 <InputField label="Country" name="country" value={profile.country} onChange={handleChange} placeholder="India" />
              </div>
            </Section>

          <div className="px-4">
        <div className="h-[3px] bg-red-700" />
      </div>

            {/* SECURITY & AUTHENTICATION */}
            <Section title="Security & Authentication" icon={<Lock size={16} className="text-red-700"/>}>
              <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 shadow-inner">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-stone-100">
                    <KeyRound size={18} className="text-reed-700" />
                  </div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-700">Credential Refresh</h4>
                </div>
                <Grid>
                  <InputField label="Current Password" name="currentPassword" type="password" value={profile.currentPassword} onChange={handleChange} placeholder="••••••••" />
                  <InputField label="New Password" name="newPassword" type="password" value={profile.newPassword} onChange={handleChange} placeholder="Min. 8 characters" />
                  <InputField label="Confirm New Password" name="confirmPassword" type="password" value={profile.confirmPassword} onChange={handleChange} placeholder="Match new password" />
                </Grid>
              </div>
            </Section>

            {/* STATUS ALERT */}
            {/* {isDirty && (
              <div className="flex items-center gap-4 bg-orange-50 p-5 rounded-3xl border border-orange-100 text-orange-800 animate-pulse">
                <div className="p-2 bg-orange-600 text-white rounded-full">
                  <AlertCircle size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-black uppercase tracking-widest">Unsaved Modifications</p>
                  <p className="text-[11px] font-medium opacity-80">Sync the cloud database to apply these profile updates.</p>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STYLED SUB-COMPONENTS ---

const Section = ({ title, icon, children }) => (
  <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
    <div className="flex items-center gap-4 mb-8">
      <div className="p-2.5 bg-[#FAF9F8] border border-stone-100 rounded-2xl shadow-sm text-stone-800">
        {icon}
      </div>
      <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-400">{title}</h3>
    </div>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {children}
  </div>
);

const InputField = ({ label, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-red-600">
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-[#FAF9F8] border border-stone-200 rounded-[1.2rem] px-6 py-4 text-sm font-bold text-stone-800 outline-none focus:border-red-500 focus:ring-8 focus:ring-orange-500/5 focus:bg-white transition-all placeholder:text-stone-300"
    />
  </div>
);

const OrangeDivider = () => (
  <div className="px-2">
    <div className="h-[2px] bg-gradient-to-r from-red-600 via-red-400 to-transparent opacity-20" />
  </div>
);

export default ProfileSettings;