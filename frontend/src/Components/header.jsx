import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2, ArrowRight } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Check if the current page is the Home page
  const isHomePage = location.pathname === '/';

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll event to change header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // THE FIX: The header should be solid white if:
  // 1. We are NOT on the home page
  // 2. The user has scrolled down
  // 3. The mobile menu is open
  const shouldBeSolid = !isHomePage || isScrolled || isOpen;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans mx-auto w-full px-0 border-b ${
        shouldBeSolid 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-stone-200 py-3' // Solid State
          : 'bg-transparent border-white/10 py-5' // Transparent State (Only at top of Home)
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group z-50">
            <div className="p-2 transition-all duration-300 bg-orange-600 rounded-md shadow-md shadow-orange-600/20 ">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl md:text-2xl font-black leading-none tracking-tighter group-hover:text-orange-600 transition-colors font-serif ${
                shouldBeSolid ? 'text-stone-900' : 'text-white'
              }`}>
                VR & SONS
              </span>
              <span className={`text-[10px] font-bold tracking-[0.4em] uppercase mt-1 transition-colors ${
                shouldBeSolid ? 'text-stone-500' : 'text-white/70'
              }`}>
                Since 1986
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8 ml-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`text-m font-bold  tracking-[0.15em] transition-colors duration-300 ${
                  location.pathname === link.path 
                    ? 'text-orange-600' 
                    : shouldBeSolid 
                      ? 'text-stone-600 hover:text-orange-600' 
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link 
              to="/contact" 
              className="bg-red-800 hover:bg-orange-700 text-white px-7 py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest transition-all shadow-md shadow-orange-600/20 active:scale-95"
            >
              Contact Us
            </Link>
          </nav>

          {/* MOBILE TOGGLE */}
          <button 
            className={`md:hidden p-2 transition-colors ${
              shouldBeSolid ? 'text-stone-900 hover:text-orange-600' : 'text-white hover:text-orange-400'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div 
        className={`md:hidden absolute left-0 right-0 top-full mt-0 mx-auto w-full bg-white border-b border-stone-200 overflow-hidden transition-all duration-400 ease-in-out origin-top shadow-xl ${
          isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col p-8 gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-lg font-bold uppercase tracking-widest ${
                location.pathname === link.path ? 'text-orange-600' : 'text-stone-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="text-lg font-bold text-red-800 uppercase flex items-center justify-between border-t border-stone-200 pt-6 group">
            Contact Us <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;