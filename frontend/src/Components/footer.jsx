import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Building2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-400 font-sans border-t border-white/5 relative z-10">
      
      {/* Upper Footer: Main Content */}
      <div className="container mx-auto px-6 lg:px-14 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* 1. Brand & Intro */}
          <div className="space-y-6 col-span-2">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-red-700 rounded-md text-white transition-all duration-300  shadow-lg shadow-red-900/30">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-black text-white leading-none tracking-tight transition-colors">
                  VR & SONS
                </span>
                <span className="text-[10px] font-bold text-stone-500 tracking-[0.2em] uppercase mt-1">
                  Est. 1986
                </span>
              </div>
            </Link>
            
            <p className="text-sm leading-relaxed text-stone-300 font-light">
              Trusted brick manufacturer supplying high-strength construction materials.
              Building the foundations of Gujarat with precision and passion since 1986.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="p-2.5 bg-white/5 border border-white/10 text-white/95 rounded-full hover:text-red-600 hover:border-red-600  transition-all duration-300 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em] border-l-2 border-red-600 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {['Home', 'About Us', 'Products', 'Projects',, 'Services' , 'Blog', 'Contact Us' ].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} 
                    className="text-stone-300 hover:text-red-600 transition-colors flex items-center gap-2 group font-light"
                  >
                    <span className="h-[1px] w-0 bg-red-600 transition-all duration-300 group-hover:w-3"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em] border-l-2 border-red-600 pl-3">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/terms" className="text-stone-300 hover:text-red-500 transition-colors font-light">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-stone-300 hover:text-red-500 transition-colors font-light">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em] border-l-2 border-red-600 pl-3">
              Get in Touch
            </h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed text-stone-300 font-light">
                  7XF5+3WX, Kamrej Char Rasta,<br/>
                  Kamrej, Gujarat 394185
                </span>
              </li>
              
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 font-medium text-stone-300">
                  <a href="tel:9825474047" className="hover:text-red-600 transition-colors">+91 98254 74047</a>
                  <a href="tel:9825266811" className="hover:text-red-600 transition-colors">+91 98252 66811</a>
                </div>
              </li> 

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-600 flex-shrink-0" />
                <a href="mailto:support@vrandsons.com" className="text-stone-300 hover:text-orange-500 transition-colors font-light">
                  support@vrandsons.com
                </a>
              </li>
            </ul>
          </div>
          
        </div>
      </div>

      {/* Lower Footer: Copyright */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-6 py-6 flex flex-col justify-center items-center text-[10px] text-stone-500 font-bold uppercase tracking-[0.15em]">
          <p>&copy; {currentYear} VR & Sons Bricks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;