import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Building2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-400 font-sans border-t border-stone-900">
      
      {/* Upper Footer: Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. Brand & Intro */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-orange-600 rounded-lg text-white">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white leading-none tracking-tight group-hover:text-orange-500 transition-colors">
                  VR & SONS
                </span>
                <span className="text-[10px] font-bold text-stone-500 tracking-[0.2em] uppercase">
                  Est. 1986
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500">
              Trusted brick manufacturer supplying high-strength construction materials. Building the foundations of Gujarat with precision and passion.
            </p>
            {/* Social Icons (Placeholder) */}
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-stone-900 rounded-full hover:bg-orange-600 hover:text-white transition-all"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-stone-900 rounded-full hover:bg-orange-600 hover:text-white transition-all"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-stone-900 rounded-full hover:bg-orange-600 hover:text-white transition-all"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-stone-900 rounded-full hover:bg-orange-600 hover:text-white transition-all"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-b border-orange-600/30 inline-block pb-2">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-orange-500 transition-colors flex items-center gap-2">Home</Link></li>
              <li><Link to="/about" className="hover:text-orange-500 transition-colors flex items-center gap-2">About Us</Link></li>
              <li><Link to="/products" className="hover:text-orange-500 transition-colors flex items-center gap-2">Products</Link></li>
              <li><Link to="/projects" className="hover:text-orange-500 transition-colors flex items-center gap-2">Projects</Link></li>
              <li><Link to="/blog" className="hover:text-orange-500 transition-colors flex items-center gap-2">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors flex items-center gap-2">Contact Us</Link></li>
            </ul>
          </div>

          {/* 3. Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-b border-orange-600/30 inline-block pb-2">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* 4. Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-b border-orange-600/30 inline-block pb-2">Get in Touch</h4>
            <ul className="space-y-5 text-sm">
              
              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  7XF5+3WX, Kamrej Char Rasta,<br/>
                  Kamrej, Gujarat 394185
                </span>
              </li>

              {/* Phones */}
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 font-medium text-stone-300">
                  <a href="tel:9825474047" className="hover:text-white transition-colors">+91 98254 74047</a>
                  <a href="tel:9825266811" className="hover:text-white transition-colors">+91 98252 66811</a>
                  <a href="tel:9586024642" className="hover:text-white transition-colors">+91 95860 24642</a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <a href="mailto:support@vrandsons.com" className="hover:text-white transition-colors">support@vrandsons.com</a>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* Lower Footer: Copyright */}
      <div className="border-t border-stone-900 bg-black/20">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-stone-600 font-medium uppercase tracking-wide">
          <p>&copy; {currentYear} VR & Sons Bricks. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;