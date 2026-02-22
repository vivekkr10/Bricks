import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Hammer, Palette, BrickWall, Ruler, Truck, ChevronRight, History, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../Components/header';
import Footer from '../Components/footer';
// --- THEME COLORS ---
const THEME = {
  primary: "text-[#2E5C55]", 
  bgPrimary: "bg-[#2E5C55]",
  borderPrimary: "border-[#2E5C55]",
  lightBg: "bg-[#F9F9F9]"
};

// --- COMPONENTS ---

const ServiceHero = () => {
  return (
    <div className="relative h-[45vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-black border-b border-gray-200">
      <motion.div 
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }} 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&q=80')" }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-4 border border-white/30 rounded-full text-xs font-bold text-white uppercase tracking-widest mb-6 backdrop-blur-md">
            Our Capabilities
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
            Expertise Beyond <br/> Manufacturing
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
            From restoration to custom creation, we engineer solutions that exceed material limitations.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const ServiceSection = ({ id, title, content, image, icon: Icon }) => {
  return (
    <div id={id} className="scroll-mt-32 mb-20 border-b border-gray-200 pb-12 last:border-0 last:mb-0 last:pb-0"> 
      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white rounded-full border border-gray-200 shadow-sm">
            <Icon className={`w-5 h-5 ${THEME.primary}`} />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#111]">{title}</h2>
        </div>
        <div className="text-[#444] leading-relaxed space-y-4 text-lg pl-2 md:pl-12 border-l-2 border-transparent hover:border-[#2E5C55]/30 transition-colors">
          {content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="group relative h-[280px] w-full overflow-hidden rounded-sm shadow-sm bg-gray-200"
      >
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </motion.div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function Services() {
  const [activeSection, setActiveSection] = useState('matching');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['matching', 'blending', 'custom', 'technical', 'logistics'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 500) {
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

  return (<>
  <Header />
    <div className={THEME.lightBg}>
      <ServiceHero />

      {/* Main Layout Wrapper */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-screen">
        
        {/* --- STICKY SIDEBAR --- */}
        {/* UPDATED: Removed 'justify-between', added 'gap-20' to bring sections closer */}
        <aside className="hidden lg:flex flex-col gap-20 w-1/4 sticky top-10 h-screen border-r border-gray-200 pt-16 pb-8 pr-8">
          
          {/* TOP PART: Navigation */}
          <div>
            <div className="flex items-center gap-2 mb-6 opacity-60">
              <div className="w-2 h-2 bg-[#2E5C55] rounded-full"></div>
              <h3 className="text-xs font-black uppercase tracking-widest text-black">Index</h3>
            </div>
            
            <nav className="space-y-2 border-l border-gray-300 ml-1">
              {[
                { id: 'matching', label: 'Brick Matching' },
                { id: 'blending', label: 'Blending & Weathering' },
                { id: 'custom', label: 'Custom Brick Making' },
                { id: 'technical', label: 'Technical Consultation' },
                { id: 'logistics', label: 'Logistics & Support' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`group flex items-center justify-between w-full pl-6 py-2 text-left text-sm transition-all border-l-2 -ml-[2px]
                    ${activeSection === item.id 
                      ? `${THEME.borderPrimary} ${THEME.primary} font-bold bg-white` 
                      : 'border-transparent text-gray-500 hover:text-[#111] hover:border-gray-400'
                    }`}
                >
                  {item.label}
                  {activeSection === item.id && <ChevronRight className="w-4 h-4 opacity-100" />}
                </button>
              ))}
            </nav>
          </div>

          {/* MIDDLE/BOTTOM PART: Explore Links */}
          {/* UPDATED: Increased text size (text-base) and subtext size (text-xs) */}
          <div className="border-t border-gray-200 pt-8 space-y-8">
             <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Explore More</h4>
             
             {/* History Link */}
             <Link to="/about" className="flex items-center gap-4 group">
                <div className="p-3 bg-white border border-gray-200 rounded-sm group-hover:bg-[#2E5C55] group-hover:border-[#2E5C55] group-hover:text-white transition-all shadow-sm">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-base font-bold text-[#111] group-hover:text-[#2E5C55] transition-colors">Our History</span>
                  <span className="text-xs text-gray-400 block mt-0.5">Legacy since 1978</span>
                </div>
             </Link>

             {/* Collection Link */}
             <Link to="/products" className="flex items-center gap-4 group">
                <div className="p-3 bg-white border border-gray-200 rounded-sm group-hover:bg-[#2E5C55] group-hover:border-[#2E5C55] group-hover:text-white transition-all shadow-sm">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-base font-bold text-[#111] group-hover:text-[#2E5C55] transition-colors">The Collection</span>
                  <span className="text-xs text-gray-400 block mt-0.5">Browse 100+ Variants</span>
                </div>
             </Link>
          </div>

        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="w-full lg:w-3/4 px-6 lg:pl-16 py-16">
          <ServiceSection 
            id="matching"
            title="Brick Matching"
            icon={BrickWall}
            image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80"
            content={`Our brick matching solution preserves the integrity of your facade. We don't just find a "close enough" color; we analyze the clay composition and firing method.
            
            JJBS experts determine the exact texture, format, and aging process required to achieve an authentic look in perfect sync with the existing architecture.`}
          />
          <ServiceSection 
            id="blending"
            title="Blending & Weathering"
            icon={Palette}
            image="https://media.istockphoto.com/id/2150083393/photo/picture-of-a-wall-made-of-red-bricks-stacked-in-a-row.jpg?s=612x612&w=0&k=20&c=_usE3QBvFD_ZuJxFOQwwJefvrRI56C_M52QJJ_7NiQw="
            content={`Imperfection is the soul of brickwork. We create custom blends that mimic centuries of weathering or establish a bold new aesthetic.
            
            Hand-picked personalized blends are the preferred choice for architects designing distinctive spaces. We can pre-blend on pallets to ensure consistency on-site.`}
          />
          <ServiceSection 
            id="custom"
            title="Custom Brick Making"
            icon={Hammer}
            image="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80"
            content={`Modern mass manufacturing often limits creativity. We specialize in the bespoke. Whether it's a non-standard size, a unique geometric shape, or a specific glaze.
            
            We derive pleasure in executing complex, custom-molded products with hallmark quality. You design the timeline of the planet; we make the blocks.`}
          />
          <ServiceSection 
            id="technical"
            title="Technical Consultation"
            icon={Ruler}
            image="https://media.istockphoto.com/id/2239705720/photo/technician-repairing-wall-light-fixture-in-brick-corridor.jpg?s=612x612&w=0&k=20&c=udNzkdErjIOoBPDaWhFmMNICzZFLDUd4PwSfUDRwdCs="
            content={`Structural integrity meets artistic vision. Our team works alongside structural engineers to calculate load-bearing capacities, thermal performance, and water absorption rates.
            
            We provide detailed CAD drawings and technical specification sheets to ensure your project meets all regulatory standards.`}
          />
          <ServiceSection 
            id="logistics"
            title="Logistics & Support"
            icon={Truck}
            image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80"
            content={`Precision delivery for heavy materials. We manage the entire supply chain, ensuring your bricks arrive on time, intact, and sequenced for installation.
            
            From high-rise city sites to remote villas, our logistics team coordinates crane offloading and phased deliveries to keep your construction timeline on track.`}
          />
        </main>
      </div>

      {/* --- BOTTOM SECTION --- */}
      {/* <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif text-[#111] mb-2">
              Ready to create something timeless?
            </h2>
            <p className="text-gray-500 text-sm">
              Our technical team is ready to assist with your specifications.
            </p>
          </div>
          <Link to="/contact" className="group flex items-center gap-3 px-8 py-3 bg-[#2E5C55] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#1E3D38] transition-all rounded-sm">
            Contact Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div> */}
    </div>
    <Footer /></>
  );
}