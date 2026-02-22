import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Clock, ShieldCheck, ArrowLeft } from 'lucide-react';
import Header from '../Components/header';
import Footer from '../Components/footer';

const BrickWall = ({ opacity = 0.02, color = "#8B4513" }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
    <defs>
      <pattern id="card-bg-wall" x="0" y="0" width="88" height="44" patternUnits="userSpaceOnUse">
        <rect x="2" y="2" width="84" height="20" fill="none" stroke={color} strokeWidth="1" rx="2" opacity={opacity * 15} />
        <rect x="46" y="24" width="42" height="18" fill="none" stroke={color} strokeWidth="1" rx="2" opacity={opacity * 15} />
        <rect x="2" y="24" width="42" height="18" fill="none" stroke={color} strokeWidth="1" rx="2" opacity={opacity * 15} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#card-bg-wall)" opacity={opacity} />
  </svg>
);

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-stone-100 min-h-screen flex flex-col font-sans selection:bg-red-500/30 overflow-x-hidden">
      <Header />
      
      <main className="relative flex-grow flex items-center justify-center px-4 pt-28 pb-20">
        
        {/* 1. PAGE BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <BrickWall opacity={0.06} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/30 rounded-full blur-[120px]"></div>
        </div>

          <motion.div 
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[3rem] shadow-2xl border border-white/20"
>
  
  {/* BACKGROUND IMAGE LAYER */}
  <div className="absolute inset-0 z-0">
    <img 
      src="https://i.pinimg.com/736x/80/2f/73/802f73983cd014ca3c8c4347eb06e9dd.jpg" 
      className="w-full h-full object-cover" 
      alt="Premium Brickwork" 
    />
    {/* High-contrast overlay: Dark at the bottom (for button) and slightly clearer in the middle */}
    <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/80 to-stone-950"></div>
  </div>

          {/* CARD CONTENT */}
          <div className="relative z-10 p-10 md:p-16 h-full flex flex-col items-center justify-center text-center">
            
            {/* MINI ANIMATED LOGO */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileInView={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, type: "spring", damping: 12, delay: 0.4 }}
              className="w-16 h-16 bg-red-700 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-red-900/40"
            >
              <Check className="text-white w-8 h-8" strokeWidth={3} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-tight">
                Submission <span className="text-red-500 italic">Confirmed.</span>
              </h1>
              
              <p className="text-stone-100 font-medium text-sm md:text-base mb-2 tracking-wide">
                "Your trust is the mortar of our legacy."
              </p>

              <p className="text-stone-400 font-light text-xs md:text-sm leading-relaxed max-w-xs mx-auto mb-10">
                Architectural inquiry received. Synchronizing with plant logistics for your project.
              </p>
            </motion.div>

            {/* TECHNICAL BADGES */}
            <div className="flex justify-center gap-3 mb-12">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Clock className="w-3 h-3 text-red-500" />
                <span className="text-[9px] font-bold text-white uppercase tracking-widest">~6h Response</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <ShieldCheck className="w-3 h-3 text-red-500" />
                <span className="text-[9px] font-bold text-white uppercase tracking-widest">Verified Log</span>
              </div>
            </div>

            {/* THE RED PRIMARY BUTTON */}
            <div className="flex flex-col items-center gap-6 w-full">
              <button 
                onClick={() => navigate('/products')}
                className="
                  w-full md:w-auto
                  bg-red-700 hover:bg-red-800 
                  text-white font-semibold tracking-wide 
                  px-12 py-4 rounded-xl 
                  shadow-xl shadow-red-900/20
                  hover:-translate-y-1 
                  transition-all duration-300 
                  flex items-center justify-center gap-3
                  text-sm uppercase
                "
              >
                View Products <ArrowRight className="w-4 h-4" />
              </button>

             
            </div>

          </div>
        </motion.div>

        {/* SIDE BRANDING */}
        <div className="hidden lg:block absolute left-12 bottom-24 -rotate-90 origin-bottom-left">
          <p className="text-[12px] font-bold text-stone-400 uppercase tracking-[1em]">VR & SONS • 1986</p>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ThankYouPage;