import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, Lock, ArrowRight, Loader2, CheckCircle2, 
  KeyRound, ArrowLeft, Building2 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// --- COMPONENT 1: FALLING BRICKS ANIMATION CANVAS ---
// This creates the interactive background effect
const FallingBricksBg = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: undefined, y: undefined });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let bricks = [];

    // Brick Colors (Clay, Red, Orange, Dark Brown)
    const colors = ['#ea580c', '#c2410c', '#9a3412', '#7c2d12', '#fdba74'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBricks();
    };

    class Brick {
      constructor() {
        this.width = Math.random() * 40 + 30; // 30px to 70px width
        this.height = Math.random() * 20 + 15; // 15px to 35px height
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height; // Start above screen
        this.speedY = Math.random() * 1.5 + 0.5; // Fall speed
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Physics variables for mouse interaction
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.95; // How quickly they slow down after being pushed
      }

      update() {
        // Standard Falling
        this.y += this.speedY;

        // Mouse Interaction (Repulsion)
        if (mouseRef.current.x != undefined) {
          const dx = mouseRef.current.x - (this.x + this.width / 2);
          const dy = mouseRef.current.y - (this.y + this.height / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 150; // Radius of mouse interaction

          if (distance < forceRadius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (forceRadius - distance) / forceRadius;
            const repulsionStrength = 2;

            this.vx -= forceDirectionX * force * repulsionStrength;
            this.vy -= forceDirectionY * force * repulsionStrength;
          }
        }

        // Apply velocities
        this.x += this.vx;
        this.y += this.vy;

        // Friction (return to normal falling)
        this.vx *= this.friction;
        this.vy *= this.friction;

        // Reset if goes below screen
        if (this.y > canvas.height) {
          this.y = -50;
          this.x = Math.random() * canvas.width;
          this.vx = 0;
          this.vy = 0;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Add simple 3D effect (highlight)
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        ctx.fillRect(this.x, this.y, this.width, 2); // Top highlight
        
        // Shadow
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(this.x, this.y + this.height - 2, this.width, 2); // Bottom shadow
      }
    }

    const initBricks = () => {
      bricks = [];
      const brickCount = Math.floor(window.innerWidth / 20); // Responsive count
      for (let i = 0; i < brickCount; i++) {
        bricks.push(new Brick());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bricks.forEach(brick => {
        brick.update();
        brick.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    // Track Mouse
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    // Reset mouse when leaving window so bricks don't get stuck
    const handleMouseLeave = () => {
        mouseRef.current.x = undefined;
        mouseRef.current.y = undefined;
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 bg-slate-900 pointer-events-none z-0"
    />
  );
};

// --- COMPONENT 2: LOGIN FORM (Glassmorphic) ---
const LoginForm = ({ onForgotPassword }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      navigate('/admin');
    }, 1500);
  };

  return (
    <div className="animate-fade-in-up w-full">
      <div className="mb-8 text-center">
        {/* Animated Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white mb-6 shadow-xl shadow-orange-600/30 transform transition-transform hover:scale-110 hover:-rotate-3 duration-300">
          <Building2 className="w-8 h-8" />
        </div>
        
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">VR & Sons</h2>
        <p className="text-slate-500 mt-2 font-medium">Secure Admin Portal</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-orange-600 transition-colors" />
            <input 
              type="email" 
              required 
              className="w-full pl-10 pr-4 py-3 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-900 placeholder-slate-400" 
              placeholder="admin@vrandsons.com" 
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Password</label>
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-orange-600 transition-colors" />
            <input 
              type="password" 
              required 
              className="w-full pl-10 pr-4 py-3 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-900 placeholder-slate-400" 
              placeholder="••••••••" 
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button type="button" onClick={onForgotPassword} className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline transition-colors">
            Forgot Password?
          </button>
        </div>

        <button type="submit" disabled={loading} className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 transform active:scale-[0.98]">
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>
    </div>
  );
};

// --- COMPONENT 3: FORGOT PASSWORD WIZARD ---
const ForgotPasswordWizard = ({ onBackToLogin }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1].focus();
  };

  const simulateApi = (nextStep) => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(nextStep); }, 1500);
  };

  return (
    <div className="animate-fade-in-up w-full text-center">
      <div className="mb-8">
        {step === 1 && <h2 className="text-3xl font-extrabold text-slate-900">Reset Password</h2>}
        {step === 2 && <h2 className="text-3xl font-extrabold text-slate-900">Verification</h2>}
        {step === 3 && <h2 className="text-3xl font-extrabold text-slate-900">New Password</h2>}
        {step === 4 && <h2 className="text-3xl font-extrabold text-slate-900">All Set!</h2>}
        
        <p className="text-slate-500 mt-2 text-sm font-medium">
          {step === 1 && "Enter your email to receive a recovery code."}
          {step === 2 && `We sent a 6-digit code to ${email}`}
          {step === 3 && "Create a secure password."}
        </p>
      </div>

      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); simulateApi(2); }} className="space-y-6 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-orange-600" />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-900 placeholder-slate-400" 
                placeholder="admin@vrandsons.com" 
              />
            </div>
          </div>
          <div className="flex gap-3">
             <button type="button" onClick={onBackToLogin} className="w-1/3 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-all">
               Cancel
             </button>
             <button type="submit" disabled={loading} className="w-2/3 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Send Code"}
             </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={(e) => { e.preventDefault(); simulateApi(3); }} className="space-y-6">
          <div className="flex gap-2 justify-center my-8">
            {otp.map((data, index) => (
              <input 
                key={index}
                type="text" 
                maxLength="1"
                ref={el => inputRefs.current[index] = el}
                value={data}
                onChange={e => handleOtpChange(e.target, index)}
                onKeyDown={e => handleOtpKeyDown(e, index)}
                onFocus={e => e.target.select()}
                className="w-12 h-14 text-center text-xl font-bold bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-slate-900 shadow-sm" 
              />
            ))}
          </div>
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Verify Code"}
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={(e) => { e.preventDefault(); simulateApi(4); }} className="space-y-6 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">New Password</label>
            <div className="relative group">
              <KeyRound className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-orange-600" />
              <input type="password" required className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-900 placeholder-slate-400" placeholder="••••••••" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Confirm Password</label>
            <div className="relative group">
              <KeyRound className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-orange-600" />
              <input type="password" required className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-900 placeholder-slate-400" placeholder="••••••••" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Update Password"}
          </button>
        </form>
      )}

      {step === 4 && (
        <div className="text-center py-4 animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ring-4 ring-green-50">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Password Updated</h3>
          <p className="text-slate-500 mb-8">Your account is secure. You can now log in with your new password.</p>
          <button onClick={onBackToLogin} className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

// --- MAIN PARENT COMPONENT ---
export default function Login() {
  const [view, setView] = useState('login'); 

  return (
    <div className="min-h-screen relative font-sans selection:bg-orange-100 selection:text-orange-900 overflow-hidden bg-slate-950">
      <Helmet>
        <title>{view === 'login' ? 'Login' : 'Reset Password'} | VR & Sons Bricks</title>
      </Helmet>

      {/* Global Animation Styles */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* 1. LAYER: Animated Bricks Background (Canvas) */}
      <FallingBricksBg />

      {/* 2. LAYER: Main Content Wrapper (Centered) */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        
        {/* Navigation Home Link */}
        <div className="absolute top-6 left-6 z-50">
          <Link to="/" className="flex items-center text-white/70 hover:text-white font-bold transition-colors bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:border-white/30 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
        </div>

        {/* 3. LAYER: Centered Glass Card */}
        <div className="w-full max-w-[480px] bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/40 p-8 md:p-12 relative overflow-hidden transition-all duration-500">
          
          {/* Decorative Top Highlight */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600"></div>

          {/* Dynamic Content */}
          {view === 'login' ? (
            <LoginForm onForgotPassword={() => setView('forgot')} />
          ) : (
            <ForgotPasswordWizard onBackToLogin={() => setView('login')} />
          )}

          {/* Bottom Branding */}
          <div className="mt-10 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
              Secure System • VR & Sons
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}