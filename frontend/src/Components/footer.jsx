import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Building2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1F1F1F] text-[#A0A0A0] font-sans border-t border-[#333333]">
      
      {/* Upper Footer: Main Content */}
      <div className="container mx-auto px-14 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* 1. Brand & Intro */}
          <div className="space-y-6 col-span-2">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-[#8C3A2E] rounded text-white transition-colors group-hover:bg-[#B24A2F]">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white leading-none tracking-tight group-hover:text-[#B24A2F] transition-colors">
                  VR & SONS
                </span>
                <span className="text-[10px] font-bold text-[#A0A0A0] tracking-[0.2em] uppercase">
                  Est. 1986
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-[#D1D1D1]">
              Trusted brick manufacturer supplying high-strength construction materials.
               <br />Building the foundations of Gujarat with precision and <br /> passion since 1986.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="p-2.5 bg-[#333333] text-[#D1D1D1] rounded-full hover:bg-[#B24A2F] hover:text-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em] border-l-4 border-[#8C3A2E] pl-3">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {['Home', 'About Us', 'Products', 'Projects', 'Blog', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} 
                    className="text-[#D1D1D1] hover:text-[#B24A2F] transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-[1px] w-0 bg-[#B24A2F] transition-all group-hover:w-3"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em] border-l-4 border-[#8C3A2E] pl-3">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/terms" className="text-[#D1D1D1] hover:text-[#B24A2F] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-[#D1D1D1] hover:text-[#B24A2F] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* 4. Contact Details */}
        {/* 4. Contact Details */}
<div>
  <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em] border-l-4 border-[#8C3A2E] pl-3">
    Get in Touch
  </h4>
  <ul className="space-y-5 text-sm">
    <li className="flex items-start gap-3">
      <MapPin className="w-5 h-5 text-[#8C3A2E] flex-shrink-0 mt-0.5" />
      <span className="leading-relaxed text-[#D1D1D1]">
        7XF5+3WX, Kamrej Char Rasta,<br/>
        Kamrej, Gujarat 394185
      </span>
    </li>
    
    {/* FIXED AREA START */}
    <li className="flex items-start gap-3">
      <Phone className="w-5 h-5 text-[#8C3A2E] flex-shrink-0 mt-0.5" />
      <div className="flex flex-col gap-1 font-medium text-[#D1D1D1]">
        <a href="tel:9825474047" className="hover:text-[#B24A2F] transition-colors">+91 98254 74047</a>
        <a href="tel:9825266811" className="hover:text-[#B24A2F] transition-colors">+91 98252 66811</a>
      </div>
    </li> 
    {/* FIXED AREA END */}

    <li className="flex items-center gap-3">
      <Mail className="w-5 h-5 text-[#8C3A2E] flex-shrink-0" />
      <a href="mailto:support@vrandsons.com" className="text-[#D1D1D1] hover:text-[#B24A2F] transition-colors">
        support@vrandsons.com
      </a>
    </li>
  </ul>
</div>
        </div>
      </div>

      {/* Lower Footer: Copyright */}
      <div className="border-t border-[#333333] bg-black/10">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-center items-center gap-4 text-[10px] text-[#A0A0A0] font-bold uppercase tracking-[0.15em]">
          <p>&copy; {currentYear} VR & Sons Bricks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;