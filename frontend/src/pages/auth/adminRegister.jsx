import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Replace with your actual backend URL
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      // Artificial delay for smooth UX (Optional)
      setTimeout(() => {
        localStorage.setItem('token', res.data.token);
        navigate('/admin');
      }, 800);

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.msg || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 font-sans antialiased">
      <Helmet>
        <title>Admin Login | VR & Sons Bricks</title>
      </Helmet>

      {/* --- INLINE STYLES FOR ANIMATION --- */}
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s infinite alternate ease-in-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80" 
          alt="Construction Site" 
          className="w-full h-full object-cover opacity-40 animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/80 to-slate-900/40"></div>
      </div>

      {/* --- LOGIN CARD --- */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
          
          {/* Header */}
          <div className="px-8 pt-10 pb-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 text-orange-600 mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Portal</h2>
            <p className="text-slate-500 mt-2 text-sm">
              Secure access for product management
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-8 p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center animate-fade-in-up">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-10 pt-4 space-y-5">
            
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  placeholder="admin@vrandsons.com"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Password</label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-orange-500/20 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Verifying...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>

            {/* Footer Links */}
            <div className="text-center mt-6">
              <Link to="/" className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors">
                Back to Home Website
              </Link>
            </div>

          </form>
          
          {/* Bottom Decoration */}
          <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-center items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-xs font-medium text-slate-500">Secured with 256-bit Encryption</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;