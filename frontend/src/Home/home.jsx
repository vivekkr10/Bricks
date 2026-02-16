import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Building2 } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Header from '../Components/header';
import Footer from '../Components/footer';

// --- HOOK: SCROLL REVEAL ---
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// --- HOOK: ANIMATED COUNTER ---
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, ref };
};

// --- 1. HERO SECTION ---
const Hero = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900 group">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://media.istockphoto.com/id/157525371/photo/postmodern-library.webp?a=1&b=1&s=612x612&w=0&k=20&c=41IAqRyEvneEXMF3elwJkH8hlabc1iDBgOb4kyb3UpU=" 
          alt="Professional Brick Stack" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
        />
        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30"></div>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Badge */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="inline-block py-1.5 px-5 border border-white/20 rounded-full text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-white/5 backdrop-blur-md">
            Est. 1986
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Delivering <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Premium Quality</span> <br className="hidden md:block"/>
          Bricks Since 1986
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          Trusted brick manufacturer supplying high-strength construction materials for residential, commercial, and industrial projects.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <Link 
            to="/products" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-orange-600/30"
          >
            View Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes slow-zoom { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }
        .animate-slow-zoom { animation: slow-zoom 20s infinite alternate linear; }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
      `}</style>
    </section>
  );
};

// --- 2. STATS SECTION (Now below Hero with descriptive text) ---
const Stats = () => {
  const { count: projects, ref: projRef } = useCounter(312, 2500); 
  const { count: sat, ref: satRef } = useCounter(93, 2000);       
  const { count: exp, ref: expRef } = useCounter(40, 1500);       

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          
          {/* Stat 1 */}
          <div ref={projRef} className="flex flex-col items-center group">
            <div className="inline-flex p-4 bg-orange-50 rounded-full text-orange-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Building2 className="w-10 h-10" />
            </div>
            <h3 className="text-5xl font-black text-slate-900 mb-2 tabular-nums">{projects}+</h3>
            <p className="text-slate-900 font-bold uppercase tracking-wider text-sm mb-4">Projects Served</p>
            <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
              From sprawling residential complexes to high-tech commercial parks, we have supplied the foundation for landmarks across the state.
            </p>
          </div>

          {/* Stat 2 */}
          <div ref={satRef} className="flex flex-col items-center group">
            <div className="inline-flex p-4 bg-orange-50 rounded-full text-orange-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Star className="w-10 h-10" />
            </div>
            <h3 className="text-5xl font-black text-slate-900 mb-2 tabular-nums">{sat}%</h3>
            <p className="text-slate-900 font-bold uppercase tracking-wider text-sm mb-4">Customer Satisfaction</p>
            <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
              Rated highly by top architects and engineers for our consistent shape, vibrant color, and superior compressive strength.
            </p>
          </div>

          {/* Stat 3 */}
          <div ref={expRef} className="flex flex-col items-center group">
            <div className="inline-flex p-4 bg-orange-50 rounded-full text-orange-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h3 className="text-5xl font-black text-slate-900 mb-2 tabular-nums">{exp}+</h3>
            <p className="text-slate-900 font-bold uppercase tracking-wider text-sm mb-4">Years Experience</p>
            <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
              Three decades of mastery in clay mixing and firing, passing down heritage craftsmanship while embracing modern technology.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- 3. BRICK IMPRESSIONS (Split Layout: Text Left, Images Right) ---
const BrickImpressions = () => {
  const { ref, isVisible } = useScrollReveal();
  
  const col1 = ["https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1590074169657-36e71958b456?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1628131378345-42345592c303?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&q=80"];
  const col2 = ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1558440388-75c1c0800844?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"];
  const col3 = ["https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1605218427368-35b81a3dd64c?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1623298317883-6b70254edf31?auto=format&fit=crop&q=80"];

  return (
    <section ref={ref} className={`py-12 md:py-24 bg-slate-50 overflow-hidden relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content (Left) */}
          <div className="relative z-10 text-center lg:text-left order-2 lg:order-1">
            <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">Esthetics & Strength</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 mt-2">Brick Impressions</h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
              Step into the world of timeless craftsmanship with <span className="text-orange-600 font-bold">VR & Sons Bricks</span>. Every brick is more than just a construction material—it is a statement of strength, sophistication, and architectural excellence.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We combine traditional firing techniques with modern quality control to produce bricks that define skylines.
            </p>
            <Link to="/gallery" className="inline-flex items-center text-slate-900 font-bold border-b-2 border-orange-600 pb-1 hover:text-orange-600 transition-colors">
              Explore Gallery <ArrowRight className="w-4 h-4 ml-2"/>
            </Link>
          </div>

          {/* Scrolling Images (Right - Full Width in container) */}
          <div className="h-[500px] md:h-[600px] overflow-hidden relative flex justify-center gap-4 md:gap-6 order-1 lg:order-2 mask-gradient-y">
            <div className="flex flex-col gap-4 md:gap-6 w-full md:w-64 animate-scroll-up opacity-90 hover:opacity-100 transition-opacity">
              {[...col1, ...col1].map((src, i) => (
                <img key={`c1-${i}`} src={src} className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg" alt="Impression" />
              ))}
            </div>
            <div className="flex flex-col gap-4 md:gap-6 w-full md:w-64 animate-scroll-down mt-[-100px] opacity-90 hover:opacity-100 transition-opacity hidden sm:flex">
              {[...col2, ...col2].map((src, i) => (
                <img key={`c2-${i}`} src={src} className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg" alt="Impression" />
              ))}
            </div>
            <div className="flex flex-col gap-4 md:gap-6 w-full md:w-64 animate-scroll-up opacity-90 hover:opacity-100 transition-opacity hidden md:flex">
              {[...col3, ...col3].map((src, i) => (
                <img key={`c3-${i}`} src={src} className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg" alt="Impression" />
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* Fade Overlay for the images section */}
      <div className="absolute top-0 right-0 w-1/2 h-32 bg-gradient-to-b from-slate-50 to-transparent z-10 hidden lg:block"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10 hidden lg:block"></div>

      <style>{`
        @keyframes scroll-up { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        @keyframes scroll-down { 0% { transform: translateY(-50%); } 100% { transform: translateY(0); } }
        .animate-scroll-up { animation: scroll-up 45s linear infinite; }
        .animate-scroll-down { animation: scroll-down 45s linear infinite; }
        .mask-gradient-y { mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent); }
      `}</style>
    </section>
  );
};

// --- 4. PRODUCTS OVERVIEW (Marquee) ---
const ProductOverview = () => {
  const { ref, isVisible } = useScrollReveal();
  const products = [
    { title: "Red Clay Brick", img: "https://5.imimg.com/data5/SELLER/Default/2023/1/VR/QU/HE/3626749/red-brick-500x500.jpeg" },
    { title: "Fly Ash Brick", img: "https://5.imimg.com/data5/ANDROID/Default/2021/3/IO/OA/SE/124785461/product-jpeg-500x500.jpg" },
    { title: "Hollow Block", img: "https://5.imimg.com/data5/SELLER/Default/2023/5/309398867/Hollow-Blocks-500x500.jpeg" },
    { title: "Paver Block", img: "https://5.imimg.com/data5/SELLER/Default/2020/12/XF/QO/WZ/47372295/paver-block-500x500.jpg" },
    { title: "Solid Concrete", img: "https://5.imimg.com/data5/SELLER/Default/2022/9/YI/ZA/MH/26616024/solid-concrete-block-500x500.jpg" },
  ];

  return (
    <section ref={ref} className={`py-16 md:py-24 bg-white overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 border-l-8 border-orange-600 pl-6">Our Products</h2>
          <p className="text-slate-500 mt-2 pl-8">High-grade materials for every need</p>
        </div>
        <Link to="/products" className="text-orange-600 font-bold hover:text-orange-800 transition-colors flex items-center pl-8 md:pl-0">See All <ArrowRight className="w-4 h-4 ml-1"/></Link>
      </div>
      
      <div className="relative flex w-full">
        <div className="flex animate-marquee gap-8 whitespace-nowrap py-4 pl-4">
          {[...products, ...products, ...products].map((p, i) => (
            <div key={i} className="w-64 md:w-72 flex-shrink-0 group cursor-pointer">
              <div className="h-48 md:h-56 overflow-hidden rounded-2xl mb-4 relative shadow-md border border-slate-100">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors pl-2">{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
};

// --- 5. ABOUT SHORT SECTION (Full Width Style) ---
const AboutShort = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className={`py-20 md:py-32 bg-orange-50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Title Area */}
            <div className="lg:col-span-4 text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Who We Are</h2>
                <div className="w-24 h-1 bg-orange-600 mx-auto lg:mx-0 rounded-full mb-6"></div>
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-8">
                <p className="text-lg md:text-2xl text-slate-700 leading-relaxed font-light text-center lg:text-left">
                  We are a leading brick manufacturer committed to delivering <strong className="text-orange-700 font-semibold">durable</strong>, <strong className="text-orange-700 font-semibold">eco-friendly</strong>, and <strong className="text-orange-700 font-semibold">high-performance</strong> bricks. With over 30 years of industry experience, we supply the foundation for builders, contractors, and visionaries.
                </p>
            </div>

        </div>
      </div>
    </section>
  );
};

// --- 6. OUR PROJECTS ---
const Projects = () => {
  const { ref, isVisible } = useScrollReveal();
  
  const projects = [
    { 
      title: "Skyline Residency", 
      desc: "A luxury residential complex built for longevity using our Red Clay Bricks.",
      images: [
        "https://images.unsplash.com/photo-1600596542815-e32c215dd86d?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
      ]
    },
    { 
      title: "Tech Park One", 
      desc: "Commercial hub utilizing Fly Ash Blocks for superior thermal insulation.",
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80"
      ]
    },
    { 
      title: "Green Valley Villas", 
      desc: "Sustainable housing project featuring our premium exposed brickwork.",
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&q=80"
      ]
    },
  ];

  return (
    <section ref={ref} className={`py-16 md:py-24 bg-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">Featured Projects</h2>
          <Link to="/projects" className="text-orange-600 font-bold hover:text-orange-800 transition-colors">View All →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
              
              {/* Inner Scrolling Image Container */}
              <div className="h-56 md:h-64 w-full overflow-hidden relative">
                <div className="absolute inset-0 flex w-[300%] animate-slide-left hover:animation-play-state-paused">
                  {[...p.images, ...p.images].map((img, idx) => (
                    <div key={idx} className="w-full h-full flex-shrink-0">
                      <img src={img} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              </div>

              {/* Card Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {p.desc}
                </p>
                <span className="text-orange-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  View Case Study <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slide-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-slide-left { animation: slide-left 15s linear infinite; }
      `}</style>
    </section>
  );
};

// --- MAIN PAGE COMPOSITION ---
export default function Home() {
  return (
    <div className="font-sans antialiased text-slate-900 bg-white selection:bg-orange-100 selection:text-orange-900">
      <Helmet>
        <title>VR & Sons | Premium Bricks Since 1986</title>
      </Helmet>
      <Header></Header>
      <Hero />
      <Stats />
      <BrickImpressions />
      <ProductOverview />
      <AboutShort />
      <Projects />
      <Footer></Footer>
    </div>
  );
}