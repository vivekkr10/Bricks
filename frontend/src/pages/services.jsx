import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Hammer, Palette, BrickWall, Mail, Phone, ChevronRight } from 'lucide-react';

// --- COMPONENTS ---

const ServiceHero = () => {
  return (
    <div className="relative h-[35vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&q=80')" }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-4">
         <motion.h1 
          initial={{ y: 20, opacity: 0 }} // Reduced movement slightly
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-serif text-white mb-3" // Slightly smaller font
        >
          Expertise Beyond Manufacturing
        </motion.h1>
        <motion.p 
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-gray-200 font-light max-w-2xl mx-auto"
        >
          From restoration to custom creation, we help you exceed the boundaries of material limitations.
        </motion.p>
      </div>
    </div>
  );
};

const ServiceSection = ({ id, title, content, image, icon: Icon }) => {
  return (
    <div id={id} className="scroll-mt-24 mb-20"> {/* scroll-mt-24 ensures the title isn't hidden behind the sticky header */}
      <div className="h-[300px] md:h-[400px] overflow-hidden rounded-sm shadow-md mb-6">
        <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#F9F9F7] rounded-full border border-gray-200">
          <Icon className="w-5 h-5 text-[#C2410C]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif text-[#222]">{title}</h2>
      </div>
      
      <div className="text-[#64748B] leading-relaxed space-y-3 text-base md:text-lg">
        {content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function Services() {
  const [activeSection, setActiveSection] = useState('matching');

  // Simple scroll spy to highlight the active link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['matching', 'blending', 'custom'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F9F9F7]">
      <ServiceHero />

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* --- STICKY SIDEBAR NAVIGATOR --- */}
        <aside className="hidden lg:block w-1/4 h-fit sticky top-24">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Our Services</h3>
          <nav className="space-y-4 border-l border-gray-200 ml-2">
            {[
              { id: 'matching', label: 'Brick Matching' },
              { id: 'blending', label: 'Blending & Weathering' },
              { id: 'custom', label: 'Custom Brick Making' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`group flex items-center justify-between w-full pl-6 py-1 text-left text-sm transition-all border-l-2 -ml-[1px]
                  ${activeSection === item.id 
                    ? 'border-[#C2410C] text-[#C2410C] font-medium' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
              >
                {item.label}
                {activeSection === item.id && <ChevronRight className="w-4 h-4 opacity-100" />}
              </button>
            ))}
          </nav>

          {/* Call to Action in Sidebar */}
          <div className="mt-12 p-6 bg-white border border-gray-100 rounded-sm shadow-sm">
            <h4 className="font-serif text-lg mb-2">Need advice?</h4>
            <p className="text-sm text-gray-500 mb-4">Our experts can help you choose the right blend.</p>
            <a href="/contact" className="text-xs font-bold text-[#C2410C] uppercase tracking-wider flex items-center gap-2">
              Contact Us <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="w-full lg:w-3/4">
          
          <ServiceSection 
            id="matching"
            title="Brick Matching"
            icon={BrickWall}
            image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80"
            content={`Our brick matching solution will help you to preserve a quality brickwork appearance while renovating an extension or restoring a project.
            
            JJBS brick experts will not only help you to determine the existing brickwork but also help you to find the correct textures, format, and variants.`}
          />

          <ServiceSection 
            id="blending"
            title="Blending & Weathering"
            icon={Palette}
            image="https://images.unsplash.com/photo-1628157779496-e17c7cb17c67?auto=format&fit=crop&q=80"
            content={`Imperfection is a unique feature of facing bricks. We provide custom blend bricks from our collections, as per your desire and aspiration.
            
            Hand-picked personalized blends are the desired option for architects and designers to build distinctive and beautiful spaces.`}
          />

          <ServiceSection 
            id="custom"
            title="Custom Brick Making"
            icon={Hammer}
            image="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80"
            content={`The most remarkable projects are a result of out-of-the-box thinking by designers. Modern mass manufacturing processes often make it difficult to manufacture products of a customized nature.
            
            This is where we derive special pleasure in executing bespoke products with our hallmark quality and consistency.`}
          />

        </main>
      </div>

      {/* Mobile-Only Contact Footer (Since sidebar is hidden on mobile) */}
      <div className="lg:hidden bg-[#1D1D1D] py-12 px-6 text-center">
        <h2 className="text-2xl font-serif text-white mb-4">Let's Explore It Together</h2>
        <a href="mailto:sales@jjb.co.in" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C2410C] text-white rounded-sm text-sm">
          <Mail className="w-4 h-4" /> Write to sales@jjb.co.in
        </a>
      </div>
    </div>
  );
}