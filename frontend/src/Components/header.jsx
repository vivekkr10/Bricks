import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2, ArrowRight } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans mx-auto w-full bg-[#141414] shadow-2xl py-3 px-0 border-b border-white/5"
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group z-50">
            <div className="p-2 transition-all duration-300 bg-[#7C2F26]">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-[#FFFFFF] leading-none tracking-tighter group-hover:text-[#9B3E31] transition-colors">
                VR & SONS
              </span>
              <span className="text-[10px] font-bold text-[#DAD6CF]/40 tracking-[0.4em] uppercase mt-1">
                Since 1986
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-[#9B3E31]' : 'text-[#DAD6CF] hover:text-[#9B3E31]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link 
              to="/contact" 
              className="bg-[#7C2F26] hover:bg-[#9B3E31] text-[#FFFFFF] px-7 py-2.5 rounded-sm text-sm font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-[#7C2F26]/20 active:scale-95"
            >
              Contact Us
            </Link>
          </nav>

          {/* MOBILE TOGGLE */}
          <button 
            className="md:hidden p-2 text-[#DAD6CF] hover:text-[#9B3E31] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div 
        className={`md:hidden absolute left-0 right-0 top-full mt-0 mx-auto w-full bg-[#141414] border-b border-white/10 overflow-hidden transition-all duration-400 ease-in-out origin-top ${
          isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col p-8 gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-lg font-bold uppercase tracking-widest ${
                location.pathname === link.path ? 'text-[#9B3E31]' : 'text-[#DAD6CF]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="text-lg font-bold text-[#7C2F26] uppercase flex items-center justify-between border-t border-white/5 pt-6 group">
            Contact Us <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;