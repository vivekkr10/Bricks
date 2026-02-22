import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Package, User, Phone, Mail, MessageSquare, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import Header from '../Components/header';
import Footer from '../Components/footer';

const BrickWall = ({ opacity = 0.04, color = "#8B4513" }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
    <defs>
      <pattern id="premium-wall-final" x="0" y="0" width="88" height="44" patternUnits="userSpaceOnUse">
        <rect x="2" y="2" width="84" height="20" fill="none" stroke={color} strokeWidth="1" rx="2" opacity={opacity * 15} />
        <rect x="46" y="24" width="42" height="18" fill="none" stroke={color} strokeWidth="1" rx="2" opacity={opacity * 15} />
        <rect x="2" y="24" width="42" height="18" fill="none" stroke={color} strokeWidth="1" rx="2" opacity={opacity * 15} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#premium-wall-final)" opacity={opacity} />
  </svg>
);

const InquiryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Logic: Get product from navigation state, or leave empty for manual typing
  const initialProduct = location.state?.productName || "";

  const [formData, setFormData] = useState({ 
    productName: initialProduct,
    fullName: '',
    mobile: '',
    email: '',
    quantity: '',
    location: '',
    message: ''
  });

  const greetings = ["Welcome.", "Namaste.", "Build Your Legacy.", "Quality First."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % greetings.length), 3500);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.productName) return alert("Please specify the product you are interested in.");
    
    setLoading(true);
    try {
      const BACKEND_URL = "http://localhost:5000/api/inquiry/";
      
      const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobile,
        message: formData.message,
        productName: formData.productName,
        requiredQty: formData.quantity,
        deliveryLoc: formData.location
      })
    });
    const result = await response.json();
     
     if (result.success) {
      navigate("/thankyou");
      } else {
      throw new Error(result.error);
    }
    } catch (error) {
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col font-sans selection:bg-red-100">
      <Header />
      
      <main className="relative flex-grow flex flex-col items-center pt-24 pb-24 px-6 overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <BrickWall opacity={0.08} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/30 rounded-full blur-[120px]"></div>
        </div>

        {/* HEADING SECTION */}
        <div className="relative z-10 w-full max-w-6xl pt-4 md:pt-12 lg:pt-20 mb-16">
          <div className="text-center">
            <div className="h-16 md:h-32 flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.h1 
                  key={greetings[index]}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl md:text-8xl lg:text-9xl font-serif text-stone-900 tracking-tight"
                >
                  {greetings[index]}
                </motion.h1>
              </AnimatePresence>
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-stone-500 font-light tracking-[0.3em] uppercase text-[10px] mt-6">
              Consult with VR & Sons Architects of Clay
            </motion.p>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/60 shadow-2xl overflow-hidden">
          
          {/* LEFT PANEL */}
          <div className="lg:col-span-4 bg-stone-900/95 p-12 text-white flex items-center justify-center relative">
             <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
               <img src="https://i.pinimg.com/736x/21/38/37/213837c52c777a9912bccb45ee0384af.jpg"
                className="w-full h-full object-cover" alt="Texture" />
             </div>
             
             <div className="relative z-10 w-full text-center flex flex-col items-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <h3 className="text-4xl font-serif mb-10 italic text-red-500">Founded on Integrity.</h3>
                  <div className="space-y-12 flex flex-col items-center">
                    <div className="max-w-[240px]">
                      <CheckCircle2 className="w-5 h-5 text-red-500 mx-auto mb-3" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 block">The Heritage</span>
                      <p className="text-stone-300 text-sm font-light leading-relaxed">Serving builders since 1986.</p>
                    </div>
                    <div className="max-w-[240px]">
                      <CheckCircle2 className="w-5 h-5 text-red-500 mx-auto mb-3" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 block">Technical Grade</span>
                      <p className="text-stone-300 text-sm font-light leading-relaxed">High compressive strength standards.</p>
                    </div>
                    <div className="max-w-[240px]">
                      <CheckCircle2 className="w-5 h-5 text-red-500 mx-auto mb-3" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 block">Direct Delivery</span>
                      <p className="text-stone-300 text-sm font-light leading-relaxed">Direct kiln-to-site logistics.</p>
                    </div>
                  </div>
                  <div className="mt-16 pt-8 border-t border-white/10 w-full">
                     <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">Contact directly</p>
                     <p className="text-xl font-sans mt-2 text-white/90">+91 98254 74047</p>
                  </div>
                </motion.div>
             </div>
          </div>

          {/* RIGHT PANEL: FORM */}
          <div className="lg:col-span-8 p-10 md:p-16 bg-white/50 relative">
            <button type="button" onClick={() => navigate(-1)} className="absolute top-8 right-10 flex items-center gap-2 text-stone-400 hover:text-red-600 transition-colors font-bold text-[12px] uppercase tracking-[0.3em] group z-30">
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" /> Return
            </button>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="md:col-span-2">
                <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Full Name</label>
                <input name="fullName" required onChange={handleChange} type="text" className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 font-sans" placeholder="Enter your full name" />
              </div>

              <div>
                <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Mobile</label>
                <input name="mobile" required onChange={handleChange} type="tel" className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900" placeholder="+91" />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Email Address</label>
                <input name="email" required onChange={handleChange} type="email" className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900" placeholder="email@example.com" />
              </div>

              {/* DYNAMIC PRODUCT FIELD (Input instead of Dropdown) */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Product</label>
                <input 
                  name="productName" 
                  required 
                  onChange={handleChange} 
                  value={formData.productName}
                  readOnly={!!initialProduct} // If user came from a product, lock it. Else, let them type.
                  type="text" 
                  className={`w-full bg-transparent border-b border-stone-200 py-3 outline-none transition-all ${initialProduct ? 'text-red-700 font-medium cursor-not-allowed border-stone-100' : 'text-stone-900 focus:border-red-600'}`} 
                  placeholder="Specify product name" 
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Quantity</label>
                <input name="quantity" required onChange={handleChange} type="number" className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900" placeholder="5,000" />
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Delivery Location</label>
                <input name="location" required onChange={handleChange} type="text" className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900" placeholder="Site Address or Pincode" />
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Additional Requirements</label>
                <textarea name="message" onChange={handleChange} rows="3" className="w-full bg-transparent border-b border-stone-200 py-3 outline-none focus:border-red-600 transition-all text-stone-900 placeholder:text-stone-300 resize-none" placeholder="Tell us about your project..." />
              </div>

              <div className="md:col-span-2 pt-6">
                <button type="submit" disabled={loading} className="w-full bg-red-700  text-white font-bold py-6 rounded-2xl hover:bg-red-800 transition-all duration-300 hover:translate-y-1 hover:shadow-xl active:scale-[0.98] uppercase tracking-[0.4em] text-[12px]">
                  {loading ? "Processing..." : "Submit Inquiry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InquiryPage;