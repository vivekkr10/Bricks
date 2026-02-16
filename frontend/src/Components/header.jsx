import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2, Phone, ArrowRight } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-md py-5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12"> {/* Increased padding so it's not stuck to edges */}
        <div className="flex justify-between items-center">
          
          {/* 1. LOGO (Always Visible) */}
          <Link to="/" className="flex items-center gap-2 group z-50">
            <div className={`p-2 rounded-lg transition-colors ${scrolled ? 'bg-orange-600 text-white' : 'bg-stone-900 text-white group-hover:bg-orange-600'}`}>
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-stone-900 leading-none tracking-tight group-hover:text-orange-600 transition-colors">
                VR & SONS
              </span>
              <span className="text-[12px] font-bold text-stone-500 tracking-[0.2em] uppercase">
                Est. 1986
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`text-xl font-bold  tracking-wide transition-colors duration-300 ${
                  location.pathname === link.path 
                    ? 'text-orange-600' 
                    : 'text-stone-600 hover:text-orange-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 3. MOBILE HAMBURGER (Visible ONLY on Mobile) */}
          <button 
            className="md:hidden p-2 text-stone-800 focus:outline-none z-50 hover:bg-stone-100 rounded-md transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {/* Swaps between Hamburger (Menu) and Close (X) icon */}
            {isOpen ? <X className="w-8 h-8 text-orange-600" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* 4. MOBILE MENU DROPDOWN (Slides down when isOpen is true) */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-stone-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'
        }`}
      >
        <div className="container mx-auto px-6 py-8 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`text-lg font-bold border-b border-stone-50 pb-3 flex justify-between items-center ${
                 location.pathname === link.path ? 'text-orange-600' : 'text-stone-800 hover:text-orange-600'
              }`}
            >
              {link.name}
              {/* Show arrow only for Contact link for emphasis */}
              {link.name === 'Contact Us' && <ArrowRight className="w-5 h-5" />}
            </Link>
          ))}
          
          {/* Quick Contact for Mobile Users */}
          <div className="mt-4 pt-4">
            <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mb-2">Need Help?</p>
            <a href="tel:+919876543210" className="flex items-center gap-2 text-stone-800 font-bold bg-stone-50 p-3 rounded-lg justify-center">
              <Phone className="w-4 h-4 text-orange-600" /> Call Support
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;