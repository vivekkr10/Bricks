import { useState, useEffect, useRef } from "react";
import Navbar from "../../Components/header.jsx";
import Footer from "../../Components/Footer.jsx";
import {
  FaTrophy,
  FaCertificate,
  FaBuilding,
  FaLayerGroup,
  FaCheckCircle,
  FaShieldAlt,
  FaHardHat,
  FaChevronRight,
  FaIndustry,
  FaAward,
  FaStar,
  FaHandshake,
  FaTruck,
  FaLeaf,
} from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";
import { MdPrecisionManufacturing, MdOutlineEco } from "react-icons/md";
import { TbBuildingFactory2 } from "react-icons/tb";
import { motion } from "framer-motion";

// Counter Animation Component
const Counter = ({ from = 0, to, duration = 2 }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(from + (to - from) * progress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <>{count.toLocaleString()}+</>;
};

/* ── Intersection Observer ── */
const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

/* ── Counter Animation ── */
const useCounter = (target, inView, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf,
      start = null;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(ease(p) * target));
      if (p < 1) raf = requestAnimationFrame(animate);
      else setCount(target);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  return count;
};

/* ── BrickWall SVG Pattern ── */
const BrickWall = ({ opacity = 0.06, color = "#8B4513" }) => (
  <svg
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    }}
  >
    <defs>
      <pattern
        id={`bwall-${color.replace("#", "")}`}
        x="0"
        y="0"
        width="88"
        height="44"
        patternUnits="userSpaceOnUse"
      >
        <rect
          x="2"
          y="2"
          width="84"
          height="20"
          fill="none"
          stroke={color}
          strokeWidth="1"
          rx="2"
          opacity={opacity * 12}
        />
        <rect
          x="46"
          y="24"
          width="42"
          height="18"
          fill="none"
          stroke={color}
          strokeWidth="1"
          rx="2"
          opacity={opacity * 12}
        />
        <rect
          x="2"
          y="24"
          width="42"
          height="18"
          fill="none"
          stroke={color}
          strokeWidth="1"
          rx="2"
          opacity={opacity * 12}
        />
      </pattern>
    </defs>
    <rect
      width="100%"
      height="100%"
      fill={`url(#bwall-${color.replace("#", "")})`}
      opacity={opacity}
    />
  </svg>
);

/* ── Stat Card ── */
const StatCard = ({ value, suffix, label, icon, inView, delay }) => {
  const count = useCounter(value, inView);
  return (
    <div
      className="relative bg-stone-900 rounded-2xl p-5 sm:p-7 overflow-hidden group cursor-default border border-stone-800 hover:border-orange-600/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-900/30"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}`,
      }}
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="grid grid-cols-6 grid-rows-6 gap-0.5 p-1 h-full">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="bg-orange-500 rounded-sm" />
          ))}
        </div>
      </div>
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-600/10 rounded-full blur-2xl group-hover:bg-orange-600/20 transition-all duration-500" />
      <div className="relative z-10">
        <div className="text-orange-500 mb-3 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-none mb-1">
          {count.toLocaleString()}
          {suffix}
        </div>
        <div className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-stone-400 mt-2">
          {label}
        </div>
        <div className="w-8 h-0.5 bg-orange-600 mt-3 group-hover:w-16 transition-all duration-500" />
      </div>
    </div>
  );
};

/* ── Milestone ── */
const Milestone = ({ year, title, desc, index, inView }) => (
  <div
    className="flex gap-4 sm:gap-5 items-start group"
    style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateX(0)" : "translateX(-30px)",
      transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
    }}
  >
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-orange-200 bg-white flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-600 transition-all duration-300 shadow-md group-hover:shadow-lg">
        <span className="font-serif text-[10px] sm:text-xs font-bold text-orange-600 group-hover:text-white transition-colors duration-300">
          {year.slice(2)}
        </span>
      </div>
      {index < 5 && (
        <div className="w-px h-12 sm:h-14 bg-gradient-to-b from-orange-200 to-transparent mt-1" />
      )}
    </div>
    <div className="pb-5 pt-1.5 group-hover:translate-x-1 transition-transform duration-300">
      <div className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
        {year}
      </div>
      <div className="font-serif text-base sm:text-lg font-bold text-stone-800 mb-1 group-hover:text-orange-700 transition-colors">
        {title}
      </div>
      <div className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
        {desc}
      </div>
    </div>
  </div>
);

/* ── Value Card ── */
const ValueCard = ({ icon, title, desc, delay, inView }) => (
  <div
    className="bg-white border border-orange-100 rounded-2xl p-5 sm:p-6 group hover:-translate-y-2 hover:shadow-xl hover:border-orange-300 hover:shadow-orange-100/50 transition-all duration-500 cursor-default"
    style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}`,
    }}
  >
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-all duration-300">
      {icon}
    </div>
    <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 mb-2 group-hover:text-orange-700 transition-colors">
      {title}
    </h3>
    <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
      {desc}
    </p>
  </div>
);

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCity, setHoveredCity] = useState(null);
  const [hoveredBrick, setHoveredBrick] = useState(null);

  const [heroRef, heroInView] = useInView(0.05);
  const [statsRef, statsInView] = useInView(0.1);
  const [storyRef, storyInView] = useInView(0.1);
  const [missionRef, missionInView] = useInView(0.1);
  const [valuesRef, valuesInView] = useInView(0.08);
  const [productRef, productInView] = useInView(0.05);
  const [histRef, histInView] = useInView(0.05);
  const [coverageRef, coverageInView] = useInView(0.08);
  const [ctaRef, ctaInView] = useInView(0.1);

  const products = [
    {
      name: "Structural Clay Bricks",
      tab: "Structural",
      tagline: "The backbone of buildings",
      desc: "High-compression load-bearing clay bricks manufactured to meet modern construction demands. Trusted by engineers across India for unmatched strength, dimensional accuracy, and consistent quality.",
      icon: <FaBuilding className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "bg-amber-700",
      light: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      specs: [
        "Compressive Strength: 7.5 N/mm²",
        "Water Absorption: <15%",
        "Standard Size: 230×110×75mm",
        "IS:1077 Certified",
      ],
      bricks: [
        "bg-amber-700",
        "bg-amber-600",
        "bg-amber-800",
        "bg-amber-500",
        "bg-amber-700",
        "bg-amber-600",
        "bg-amber-800",
        "bg-amber-700",
        "bg-amber-600",
        "bg-amber-500",
        "bg-amber-800",
        "bg-amber-700",
      ],
    },
    {
      name: "Facing Bricks",
      tab: "Facing",
      tagline: "Where beauty meets structure",
      desc: "Premium architectural facing bricks available in 30+ textures and tones. Designed for aesthetic appeal without compromising structural integrity — used in landmark residential and commercial projects.",
      icon: <GiBrickWall className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "bg-red-600",
      light: "bg-red-50",
      border: "border-red-200",
      text: "text-red-600",
      specs: [
        "Frost Resistant",
        "Low Efflorescence",
        "30+ Colour Options",
        "Architect Recommended",
      ],
      bricks: [
        "bg-red-600",
        "bg-red-700",
        "bg-red-500",
        "bg-orange-600",
        "bg-red-600",
        "bg-red-800",
        "bg-red-500",
        "bg-orange-700",
        "bg-red-600",
        "bg-red-700",
        "bg-orange-600",
        "bg-red-500",
      ],
    },
    {
      name: "Textured Series",
      tab: "Textured",
      tagline: "Tactile, unforgettable walls",
      desc: "Wire-cut, sand-faced, and custom textured bricks that bring depth and character to any facade. Perfect for designers seeking surfaces that command attention.",
      icon: <FaLayerGroup className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "bg-orange-700",
      light: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-700",
      specs: [
        "Wire-cut Finish",
        "Sand-faced Option",
        "Custom Textures Available",
        "Interior & Exterior Grade",
      ],
      bricks: [
        "bg-orange-700",
        "bg-orange-600",
        "bg-orange-800",
        "bg-amber-600",
        "bg-orange-700",
        "bg-orange-500",
        "bg-orange-800",
        "bg-amber-700",
        "bg-orange-600",
        "bg-orange-700",
        "bg-orange-500",
        "bg-amber-600",
      ],
    },
    {
      name: "Eco-Friendly Range",
      tab: "Eco Range",
      tagline: "Building with conscience",
      desc: "Sustainably produced bricks using solar drying, zero groundwater methods, and recycled clay waste. The responsible choice for green-certified projects and eco-conscious builders.",
      icon: <MdOutlineEco className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "bg-green-700",
      light: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      specs: [
        "Solar Drying Process",
        "Zero Groundwater Use",
        "Recycled Material Input",
        "Eco Certification Ready",
      ],
      bricks: [
        "bg-amber-800",
        "bg-amber-700",
        "bg-yellow-700",
        "bg-amber-600",
        "bg-amber-800",
        "bg-yellow-600",
        "bg-amber-700",
        "bg-amber-800",
        "bg-yellow-700",
        "bg-amber-700",
        "bg-yellow-600",
        "bg-amber-800",
      ],
    },
  ];

  const stats = [
    {
      value: 35,
      suffix: "+",
      label: "Years of Excellence",
      icon: <FaTrophy className="w-6 h-6 sm:w-8 sm:h-8" />,
      delay: "0s",
    },
    {
      value: 1000,
      suffix: "+",
      label: "Projects Completed",
      icon: <FaBuilding className="w-6 h-6 sm:w-8 sm:h-8" />,
      delay: "0.12s",
    },
    {
      value: 500,
      suffix: "+",
      label: "Satisfied Clients",
      icon: <FaHandshake className="w-6 h-6 sm:w-8 sm:h-8" />,
      delay: "0.24s",
    },
    {
      value: 100,
      suffix: "%",
      label: "Quality Assured",
      icon: <FaCertificate className="w-6 h-6 sm:w-8 sm:h-8" />,
      delay: "0.36s",
    },
  ];

  const milestones = [
    {
      year: "1986",
      title: "Foundation Laid",
      desc: "VR & Sons establishes its first brick manufacturing unit, beginning a legacy of quality and reliability in the construction sector.",
    },
    {
      year: "1994",
      title: "Capacity Expansion",
      desc: "Growing demand leads to a major expansion. New production units commissioned, significantly increasing output while maintaining quality.",
    },
    {
      year: "2001",
      title: "Modern Methods Adopted",
      desc: "Integration of modern brick-making techniques alongside traditional methods. Dimensional accuracy and consistency reach new highs.",
    },
    {
      year: "2010",
      title: "Eco-Conscious Manufacturing",
      desc: "Solar drying systems and water-efficient processes introduced, substantially reducing environmental footprint and emissions.",
    },
    {
      year: "2018",
      title: "Industry Recognition",
      desc: "VR & Sons recognized as a leading brick manufacturer, preferred by top builders for residential, commercial and industrial projects.",
    },
    {
      year: "2024",
      title: "Continued Innovation",
      desc: "Ongoing investment in production technology ensures VR & Sons remains at the forefront of the brick manufacturing industry.",
    },
  ];

  const values = [
    {
      icon: <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Consistent Quality",
      desc: "Every brick meets stringent standards. Rigorous quality control ensures reliability on every project, every time.",
    },
    {
      icon: <MdOutlineEco className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Eco-Friendly Process",
      desc: "Solar drying, water conservation, and recycled clay waste — sustainability built into every stage of production.",
    },
    {
      icon: <FaTruck className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Timely Supply",
      desc: "Construction timelines are critical. Our logistics network ensures materials arrive precisely when needed.",
    },
    {
      icon: <FaHandshake className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Customer First",
      desc: "Customer satisfaction drives everything — from product consultation to delivery and long-term support.",
    },
    {
      icon: <MdPrecisionManufacturing className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Modern Technology",
      desc: "Traditional craftsmanship elevated by modern manufacturing — combining the best of both for superior results.",
    },
    {
      icon: <FaShieldAlt className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Industry Standards",
      desc: "All products comply with IS codes and benchmarks, certified for safety and performance.",
    },
  ];

  const cities = [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Mumbai",
    "Pune",
    "Nashik",
    "Indore",
    "Nagpur",
    "Hyderabad",
  ];
  const brickPalette = [
    "bg-orange-600",
    "bg-red-700",
    "bg-amber-700",
    "bg-orange-500",
    "bg-red-600",
    "bg-amber-600",
    "bg-orange-800",
    "bg-red-500",
    "bg-orange-600",
    "bg-amber-500",
    "bg-red-700",
    "bg-orange-700",
    "bg-amber-800",
    "bg-red-600",
    "bg-orange-500",
  ];

  return (
    <div>
      <Navbar />
      <div
        className="bg-stone-50 text-stone-800 overflow-x-hidden"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Jost:wght@300;400;500;600;700&display=swap');
          .font-serif { font-family: 'Cormorant Garamond', Georgia, serif !important; }
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #fafaf9; }
          ::-webkit-scrollbar-thumb { background: #ea580c; border-radius: 4px; }

          @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(3deg)} }
          @keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(-2deg)} }
          @keyframes floatC { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(4deg)} }
          @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes spinRev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
          @keyframes pulseRing { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(1.8)} }
          @keyframes slideUp { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
          @keyframes fadeSlideIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          @keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }

          .float-a { animation: floatA 5s ease-in-out infinite; }
          .float-b { animation: floatB 7s ease-in-out infinite 1s; }
          .float-c { animation: floatC 6s ease-in-out infinite 2.5s; }
          .float-d { animation: floatA 8s ease-in-out infinite 1.5s; }
          .spin-slow { animation: spinSlow 28s linear infinite; }
          .spin-rev { animation: spinRev 20s linear infinite; }
          .pulse-ring { animation: pulseRing 2s ease-in-out infinite; }
          .marquee-track { display:flex; gap:2rem; animation: marqueeScroll 25s linear infinite; white-space:nowrap; width:max-content; }
          .hero-line { overflow:hidden; display:block; }
          .hero-word { display:block; animation: slideUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards; opacity:0; }
          .tab-fade { animation: fadeSlideIn 0.4s ease forwards; }
          .brick-hover { transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease; }
          .brick-hover:hover { transform: translateY(-8px) rotate(-1deg); box-shadow: 0 24px 50px rgba(180,60,20,0.2); }
          .glow-btn:hover { box-shadow: 0 16px 48px rgba(234,88,12,0.45); }
          .section-reveal { opacity:0; transform:translateY(30px); transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1); }
          .section-reveal.visible { opacity:1; transform:translateY(0); }
          .reveal-left { opacity:0; transform:translateX(-30px); transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1); }
          .reveal-left.visible { opacity:1; transform:translateX(0); }
          .reveal-right { opacity:0; transform:translateX(30px); transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1); }
          .reveal-right.visible { opacity:1; transform:translateX(0); }
          .d1{transition-delay:0.1s} .d2{transition-delay:0.2s} .d3{transition-delay:0.3s}
          .d4{transition-delay:0.4s} .d5{transition-delay:0.5s}
          .brick-cell { transition: all 0.2s ease; }
          .brick-cell:hover { transform:scale(1.12) translateY(-3px); box-shadow: 0 6px 16px rgba(180,60,20,0.25); z-index:10; position:relative; }
        `}</style>

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          className=" mt-10 min-h-screen relative flex items-center overflow-hidden bg-gradient-to-br from-stone-50 via-orange-100/60 to-stone-100 pt-20 pb-12 border-b border-stone-200"
         >
          <BrickWall opacity={0.05} color="#8B4513" />

          {/* Main Content Container */}
          <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left Content */}
              <div className="max-w-3xl">
                {/* Badge with enhanced animation */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={heroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 mb-5 sm:mb-7 shadow-lg shadow-orange-100/50"
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-orange-600 block flex-shrink-0"
                  />
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-orange-600">
                    Trusted Since 1986 · Residential · Commercial · Industrial
                  </span>
                </motion.div>

                {/* Headline with enhanced animations */}
                <h1 className="font-serif leading-none mb-6 sm:mb-8">
                  {[
                    {
                      text: "Built on",
                      cls: "text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-stone-700",
                      delay: 0.2,
                    },
                    {
                      text: "Strength,",
                      cls: "text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-stone-900",
                      delay: 0.4,
                    },
                    {
                      text: "Fired with",
                      cls: "text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-stone-700",
                      delay: 0.6,
                    },
                    {
                      text: "Purpose.",
                      cls: "text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold italic text-orange-600",
                      delay: 0.8,
                    },
                  ].map(({ text, cls, delay }) => (
                    <span
                      key={text}
                      className="hero-line block overflow-hidden"
                    >
                      <motion.span
                        className={`hero-word ${cls}`}
                        initial={{ y: "100%" }}
                        animate={heroInView ? { y: 0 } : {}}
                        transition={{
                          duration: 0.8,
                          delay,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {text}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                {/* Description with fade-in */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="text-base sm:text-lg text-stone-500 leading-relaxed max-w-xl font-light mb-8 sm:mb-10"
                >
                  VR &amp; Sons has been a trusted name in brick manufacturing
                  since 1986 — delivering high-strength, eco-friendly bricks for
                  residential, commercial, and industrial projects across India.
                </motion.p>

                {/* Buttons with hover effects */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full sm:w-auto cursor-pointer px-6 sm:px-8 py-3.5 sm:py-4 bg-orange-600 text-white font-bold text-xs tracking-widest uppercase rounded-xl shadow-xl shadow-orange-200/50 hover:shadow-2xl hover:shadow-orange-300/50 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">Discover Our Story</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="relative z-10"
                    >
                      <FaChevronRight className="w-3 h-3" />
                    </motion.div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full sm:w-auto cursor-pointer px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-stone-300 text-stone-600 font-bold text-xs tracking-widest uppercase rounded-xl hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <GiBrickWall className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>Our Products</span>
                  </motion.button>
                </motion.div>

                {/* Trust indicators with stagger */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="flex flex-wrap gap-4 sm:gap-6"
                >
                  {[
                    {
                      icon: <FaShieldAlt className="w-3.5 h-3.5" />,
                      text: "IS:1077 Certified",
                      color: "from-orange-500 to-orange-600",
                    },
                    {
                      icon: <FaLeaf className="w-3.5 h-3.5" />,
                      text: "Eco-Friendly",
                      color: "from-green-500 to-green-600",
                    },
                    {
                      icon: <FaAward className="w-3.5 h-3.5" />,
                      text: "35+ Years of Trust",
                      color: "from-blue-500 to-blue-600",
                    },
                  ].map(({ icon, text, color }, index) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, x: -20 }}
                      animate={heroInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05, x: 2 }}
                      className="flex items-center gap-1.5 text-stone-500 group cursor-default"
                    >
                      <motion.span
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${color}`}
                      >
                        {icon}
                      </motion.span>
                      <span className="text-xs font-semibold tracking-wide group-hover:text-stone-700 transition-colors">
                        {text}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Right Side - Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative lg:block "
               >
                {/* Main Image */}
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                   >
                    <img
                      src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80"
                      alt="Brick manufacturing facility"
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                    {/* Overlay Text */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="absolute bottom-6 left-6 text-white"
                    >
                      <p className="text-sm font-light opacity-90">
                        Modern Facility
                      </p>
                      <p className="text-2xl font-bold">
                        50+ Million Bricks/Year
                      </p>
                    </motion.div>
                  </motion.div>

                 

                  {/* Decorative Elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -z-10 -top-10 -right-10 w-40 h-40 border border-orange-200 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -z-10 -bottom-10 -left-10 w-32 h-32 border border-dashed border-orange-200 rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* 1986 watermark - repositioned */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.04 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-2 right-2 sm:right-4 font-serif text-[6rem] sm:text-[10rem] lg:text-[14rem] font-bold text-orange-600 leading-none pointer-events-none select-none hidden sm:block"
          >
            1986
          </motion.div>

          {/* Enhanced Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-60 transition-opacity cursor-pointer"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <span className="text-xs font-bold tracking-widest uppercase text-stone-400">
              Scroll
            </span>
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <section
          ref={statsRef}
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden bg-stone-50"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <svg className="w-full h-full">
              <defs>
                <pattern
                  id="stats-pattern"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="#8B4513" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#stats-pattern)" />
            </svg>
          </div>

          {/* Soft Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-100/50 via-transparent to-stone-100/50"></div>

          {/* Decorative Elements - Very Subtle */}
          <div className="absolute top-10 left-10 w-48 h-48 bg-amber-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-stone-200/30 rounded-full blur-3xl"></div>

          <div className="cursor-pointer max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7 relative z-10">
            {stats.map((s, i) => {
              // Define icons based on label
              const getIcon = () => {
                switch (s.label.toLowerCase()) {
                  case "projects completed":
                  case "projects":
                    return (
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          d="M3 10H21M7 15H11M7 18H11M14 15H17M14 18H17M5 6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V8C3 6.89543 3.89543 6 5 6Z"
                          strokeLinecap="round"
                        />
                      </svg>
                    );
                  case "years experience":
                  case "experience":
                    return (
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          strokeLinecap="round"
                        />
                      </svg>
                    );
                  case "happy clients":
                  case "clients":
                    return (
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          strokeLinecap="round"
                        />
                      </svg>
                    );
                  case "awards won":
                  case "awards":
                    return (
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          strokeLinecap="round"
                        />
                        <path d="M12 6V12L15 15" strokeLinecap="round" />
                      </svg>
                    );
                  default:
                    return (
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          strokeLinecap="round"
                        />
                      </svg>
                    );
                }
              };

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{
                    y: -6,
                    transition: { type: "spring", stiffness: 400, damping: 15 },
                  }}
                  className="group relative"
                >
                  {/* Card - Warmer background  */}
                  <div className="relative bg-gradient-to-br from-amber-50 to-orange-50/80 rounded-xl p-6 sm:p-7 shadow-md hover:shadow-xl transition-all duration-300 border border-amber-100/50">
                    {/* Icon and Content */}
                    <div className="relative flex flex-col items-center">
                      {/* Icon Circle with Warm Background */}
                      <motion.div
                        className="mb-3"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center text-amber-700 shadow-inner">
                          {getIcon()}
                        </div>
                      </motion.div>

                      {/* Number with Warm Gradient */}
                      <motion.div
                        className="text-3xl sm:text-4xl font-bold mb-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="bg-gradient-to-r from-amber-800 to-amber-700 bg-clip-text text-transparent">
                          {statsInView ? (
                            <Counter from={0} to={s.value} duration={2} />
                          ) : (
                            "0"
                          )}
                        </span>
                      </motion.div>

                      {/* Label with Warm Color */}
                      <p className="text-amber-700/80 font-medium text-sm sm:text-base">
                        {s.label}
                      </p>
                    </div>

                    {/* Subtle Decorative Elements */}
                    <div className="absolute top-2 right-2 w-16 h-16 bg-amber-200/20 rounded-full blur-xl"></div>
                    <div className="absolute bottom-2 left-2 w-12 h-12 bg-orange-200/20 rounded-full blur-lg"></div>
                  </div>

                  {/* Hover Shadow */}
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-xl blur-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── WHO WE ARE ── */}
        <section
          ref={storyRef}
          className="border-t border-b border-stone-200 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-white relative overflow-hidden"
        >
          <BrickWall opacity={0.05} color="#8B4513" />
          <div className="absolute top-0 right-0 w-2/5 h-full bg-gradient-to-l from-orange-50/70 to-transparent hidden lg:block" />

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
            <div>
              <div
                className={`inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-3 sm:px-4 py-1.5 mb-5 sm:mb-6 reveal-left ${storyInView ? "visible" : ""}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 block" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-orange-600">
                  Who We Are
                </span>
              </div>
              <h2
                className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-6 sm:mb-8 reveal-left d1 ${storyInView ? "visible" : ""}`}
              >
                A Story Fired
                <br />
                in <em className="text-orange-600">Clay,</em>
                <br />
                Written in Stone.
              </h2>
              <p
                className={`text-stone-500 text-sm sm:text-base leading-relaxed font-light mb-4 sm:mb-5 reveal-left d2 ${storyInView ? "visible" : ""}`}
              >
                In 1986, VR &amp; Sons was founded with a singular commitment —
                to manufacture bricks of uncompromising quality that builders
                and engineers could rely on. What began as a regional operation
                quickly earned a reputation that spread across the construction
                industry.
              </p>
              <p
                className={`text-stone-500 text-sm sm:text-base leading-relaxed font-light mb-8 sm:mb-10 reveal-left d3 ${storyInView ? "visible" : ""}`}
              >
                From traditional brick-making methods to modern production
                techniques, we have continuously evolved to meet changing
                construction demands — always maintaining the consistency and
                reliability our clients depend on.
              </p>
              <div
                className={`flex flex-wrap gap-5 sm:gap-8 reveal-left d4 ${storyInView ? "visible" : ""}`}
              >
                {[
                  ["Residential", "Projects"],
                  ["Commercial", "Buildings"],
                  ["Industrial", "Facilities"],
                ].map(([v, l]) => (
                  <div
                    key={v}
                    className="border-l-4 border-orange-500 pl-3 sm:pl-4"
                  >
                    <div className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                      {v}
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-stone-400">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual collage — proper on all screens */}
            <div className={`reveal-right ${storyInView ? "visible" : ""}`}>
              {/* Mosaic card */}
              <div className="brick-hover rounded-2xl overflow-hidden shadow-2xl shadow-orange-200/50 mb-4">
                <div className="grid grid-cols-5 grid-rows-3 gap-1 p-3 bg-orange-100 h-48 sm:h-56">
                  {[
                    "bg-orange-700",
                    "bg-red-700",
                    "bg-amber-700",
                    "bg-orange-600",
                    "bg-red-600",
                    "bg-amber-600",
                    "bg-orange-800",
                    "bg-red-800",
                    "bg-orange-600",
                    "bg-amber-700",
                    "bg-red-600",
                    "bg-orange-700",
                    "bg-amber-800",
                    "bg-red-700",
                    "bg-orange-600",
                  ].map((c, i) => (
                    <div
                      key={i}
                      className={`brick-cell ${c} rounded-sm opacity-80`}
                    />
                  ))}
                </div>
                <div className="bg-stone-900 p-4 sm:p-5 flex items-center justify-between">
                  <div>
                    <div className="text-orange-300 text-[10px] font-bold tracking-widest uppercase mb-0.5">
                      Clay Brick Range
                    </div>
                    <div className="font-serif text-white text-base sm:text-lg font-bold">
                      Precision Manufactured
                    </div>
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-600 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-white leading-none">
                      35
                    </div>
                    <div className="text-white/70 text-[8px] font-bold tracking-wider uppercase">
                      Yrs
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust + factory row */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="brick-hover bg-white border border-orange-100 rounded-2xl p-4 sm:p-5 shadow-lg">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-3 h-3 text-orange-500" />
                    ))}
                  </div>
                  <div className="font-serif text-sm sm:text-base font-bold text-stone-900 mb-1">
                    Industry Trusted
                  </div>
                  <div className="text-xs text-stone-500 leading-relaxed">
                    500+ satisfied clients trust VR &amp; Sons.
                  </div>
                </div>
                <div className="brick-hover bg-stone-900 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between">
                  <TbBuildingFactory2 className="w-7 h-7 sm:w-8 sm:h-8 text-orange-400" />
                  <div>
                    <div className="text-white text-sm font-bold font-serif">
                      Est. 1986
                    </div>
                    <div className="text-stone-400 text-xs">
                      Manufacturing Excellence
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MISSION & VISION ── */}
        <section
          ref={missionRef}
          className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-stone-700 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
            <div className="grid grid-cols-12 grid-rows-8 gap-1 p-2 h-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className="bg-orange-600 rounded-sm" />
              ))}
            </div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div
              className={`text-center mb-10 sm:mb-16 section-reveal ${missionInView ? "visible" : ""}`}
            >
              <div className="inline-flex items-center gap-2 bg-orange-900/50 border border-orange-700/50 rounded-full px-4 py-1.5 mb-4 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 block" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-orange-400">
                  Our Foundation
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Mission &amp; <em className="text-orange-400">Vision</em>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Mission */}
              <div
                className={`bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 hover:border-orange-500/40 transition-all duration-500 group reveal-left ${missionInView ? "visible" : ""}`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-600/20 border border-orange-600/40 rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6">
                  <FaHardHat className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                </div>
                <div className="text-orange-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3">
                  Our Mission
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-5">
                  Manufacturing with Purpose
                </h3>
                <ul className="space-y-2.5 sm:space-y-3">
                  {[
                    "Manufacture and supply high-strength, eco-friendly bricks for modern construction needs",
                    "Deliver reliable and durable products that meet industry standards",
                    "Maintain consistent quality and ensure timely supply",
                    "Keep customer satisfaction at the heart of every operation",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 sm:gap-3 text-stone-300 text-xs sm:text-sm leading-relaxed"
                    >
                      <FaCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vision */}
              <div
                className={`bg-orange-600 rounded-2xl sm:rounded-3xl p-6 sm:p-10 relative overflow-hidden reveal-right ${missionInView ? "visible" : ""}`}
              >
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="grid grid-cols-6 grid-rows-6 gap-0.5 p-1 h-full">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div key={i} className="bg-white rounded-sm" />
                    ))}
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 border border-white/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6">
                    <FaStar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-orange-100 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3">
                    Our Vision
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-5">
                    Building a Lasting Legacy
                  </h3>
                  <ul className="space-y-2.5 sm:space-y-3">
                    {[
                      "Become a leading and trusted brick manufacturer in the construction industry",
                      "Combine traditional expertise with modern manufacturing technology",
                      "Let sustainability and innovation guide our growth strategy",
                      "Build long-term value for customers and communities",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 sm:gap-3 text-white/90 text-xs sm:text-sm leading-relaxed"
                      >
                        <FaChevronRight className="w-3 h-3 text-white/60 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CORE VALUES ── */}
        <section
          ref={valuesRef}
          className="border-b border-gray-300 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-stone-150 relative overflow-hidden"
        >
          <BrickWall opacity={0.1} color="#8B4513" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div
              className={`text-center mb-10 sm:mb-16 section-reveal ${valuesInView ? "visible" : ""}`}
            >
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-4 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 block" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-orange-600">
                  Why Choose Us
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
                Built on <em className="text-orange-600">Values,</em>
                <br />
                Delivered with Excellence.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {values.map((v, i) => (
                <ValueCard
                  key={i}
                  {...v}
                  delay={`${i * 0.1}s`}
                  inView={valuesInView}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        <section
          ref={productRef}
          className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-white-900"
        >
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-8 sm:mb-12 section-reveal ${productInView ? "visible" : ""}`}
            >
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-4 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 block" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-orange-600">
                  Our Range
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900">
                Crafted for Every Vision
              </h2>
              <p className="text-stone-500 max-w-lg mx-auto mt-3 sm:mt-4 font-light leading-relaxed text-sm sm:text-base">
                From structural workhorses to architectural showpieces — our
                range meets every construction need.
              </p>
            </div>

            {/* Tabs — scrollable on mobile */}
            <div
              className={`mb-8 sm:mb-12 section-reveal d1 ${productInView ? "visible" : ""}`}
            >
              
              <div className="flex overflow-x-auto pb-1 sm:pb-0 sm:justify-center gap-0 sm:gap-0">
                <div className="bg-stone-100 p-1.5 rounded-xl flex gap-1 min-w-max sm:min-w-0 mx-auto">
                  {products.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i)}
                      className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${activeTab === i ? "bg-orange-600 text-white shadow-lg shadow-orange-200" : "text-stone-500 hover:text-orange-600 hover:bg-white"}`}
                    >
                      {p.tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active product */}
            {products.map(
              (p, i) =>
                activeTab === i && (
                  <div
                    key={i}
                    className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center tab-fade"
                  >
                    {/* Visual */}
                    <div className="relative">
                      <div
                        className={`h-56 sm:h-72 lg:h-96 ${p.light} ${p.border} border rounded-2xl sm:rounded-3xl overflow-hidden relative`}
                      >
                        <div className="grid grid-cols-6 gap-1 sm:gap-1.5 p-3 sm:p-5 h-full">
                          {[...p.bricks, ...p.bricks]
                            .slice(0, 24)
                            .map((c, j) => (
                              <div
                                key={j}
                                className={`brick-cell ${c} rounded opacity-75`}
                              />
                            ))}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent flex items-end p-4 sm:p-6">
                          <div>
                            <div
                              className={`${p.text} text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-1 opacity-80`}
                            >
                              {p.tagline}
                            </div>
                            <div className="font-serif text-white text-lg sm:text-2xl font-bold">
                              {p.name}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 ${p.color} rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg`}
                        >
                          {p.icon}
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div>
                      <div
                        className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase ${p.text} mb-2`}
                      >
                        {p.tagline}
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 mb-4 sm:mb-5">
                        {p.name}
                      </h3>
                      <p className="text-stone-500 text-sm sm:text-base leading-relaxed font-light mb-5 sm:mb-7">
                        {p.desc}
                      </p>
                      <div className="mb-6 sm:mb-8">
                        {p.specs.map((s, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-3 py-2.5 sm:py-3 border-b border-stone-100 group/spec"
                          >
                            <div
                              className={`w-2 h-2 rounded-sm ${p.color} flex-shrink-0`}
                            />
                            <span className="text-stone-700 text-xs sm:text-sm font-medium group-hover/spec:text-orange-700 transition-colors">
                              {s}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          className={`w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 ${p.color} text-white font-bold text-xs tracking-widest uppercase rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
                        >
                          Request Sample
                        </button>
                        <button
                          className={`w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 border-2 ${p.border} ${p.text} font-bold text-xs tracking-widest uppercase rounded-xl hover:opacity-70 transition-all duration-300`}
                        >
                          View Specs
                        </button>
                      </div>
                    </div>
                  </div>
                ),
            )}

            {/* Thumbnails */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12">
              {products.map((p, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`brick-hover rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${activeTab === i ? `${p.border} shadow-lg` : "border-stone-100 hover:border-orange-200"}`}
                >
                  <div
                    className={`h-16 sm:h-20 ${p.light} grid grid-cols-4 gap-1 p-2 sm:p-3`}
                  >
                    {p.bricks.slice(0, 8).map((c, j) => (
                      <div
                        key={j}
                        className={`brick-cell ${c} rounded-sm opacity-70`}
                      />
                    ))}
                  </div>
                  <div className="p-3 sm:p-4 bg-white flex items-start gap-2 sm:gap-3">
                    <span className={`mt-0.5 ${p.text} flex-shrink-0`}>
                      {p.icon}
                    </span>
                    <div>
                      <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                        {p.name}
                      </div>
                      <div className="text-[10px] sm:text-xs text-stone-400 mt-0.5 hidden sm:block">
                        {p.tagline}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE BRICK WALL ── */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-stone-100 border-t border-stone-200">
          <BrickWall opacity={0.05} color="#9f4e13" />
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 block" />
              <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-orange-600">
                Sample Wall
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-2 sm:mb-3">
              Hover to <em className="text-orange-600">Explore</em> Our Range
            </h2>
            <p className="text-stone-500 font-light mb-6 sm:mb-10 text-sm sm:text-base">
              Each brick represents a different tone and texture from our
              manufacturing range.
            </p>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-1 sm:gap-1.5 p-3 sm:p-4 bg-stone-100 rounded-2xl sm:rounded-3xl border border-stone-200">
              {[...brickPalette, ...brickPalette, ...brickPalette]
                .slice(0, 48)
                .map((c, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredBrick(i)}
                    onMouseLeave={() => setHoveredBrick(null)}
                    className={`h-8 sm:h-10 md:h-14 ${c} rounded-md sm:rounded-lg transition-all duration-200 cursor-pointer ${hoveredBrick === i ? "opacity-100 scale-110 shadow-lg -translate-y-1" : "opacity-70"}`}
                  />
                ))}
            </div>
            <p className="text-[10px] sm:text-xs text-stone-400 font-medium tracking-wider mt-3 sm:mt-4 uppercase">
              {brickPalette.length}+ unique tones available
            </p>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section
          ref={histRef}
          className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-white relative overflow-hidden border-t border-stone-200"
        >
          <BrickWall opacity={0.1} color="#8B4513" />
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 items-start relative z-10">
            <div className="lg:sticky lg:top-28">
              <div
                className={`inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-4 sm:mb-5 reveal-left ${histInView ? "visible" : ""}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 block" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-orange-600">
                  Our Journey
                </span>
              </div>
              <h2
                className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-4 sm:mb-6 reveal-left d1 ${histInView ? "visible" : ""}`}
              >
                A Timeline
                <br />
                of <em className="text-orange-600">Milestones.</em>
              </h2>
              <p
                className={`text-stone-500 text-sm sm:text-base leading-relaxed font-light mb-6 sm:mb-8 reveal-left d2 ${histInView ? "visible" : ""}`}
              >
                From a single unit in 1986 to a recognized name in the industry
                — each chapter reflects our commitment to growth, quality, and
                the people we serve.
              </p>
              <div className={`reveal-left d3 ${histInView ? "visible" : ""}`}>
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-orange-600 text-white font-bold text-xs tracking-widest uppercase rounded-xl shadow-xl shadow-orange-200 glow-btn hover:bg-orange-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  <FaIndustry className="w-4 h-4" />
                  <span>Download Company Profile</span>
                </button>
              </div>
              <div className="font-serif text-[6rem] sm:text-[8rem] font-bold text-orange-100 leading-none mt-2 sm:mt-4 select-none pointer-events-none">
                35+
              </div>
            </div>
            <div className="pt-0 sm:pt-2">
              {milestones.map((m, i) => (
                <Milestone key={i} {...m} index={i} inView={histInView} />
              ))}
            </div>
          </div>
        </section>

        {/* ── COVERAGE ── */}
        <section
          ref={coverageRef}
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-stone-50 relative overflow-hidden border-t border-stone-200"
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <div
                  className={`inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-4 sm:mb-5 reveal-left ${coverageInView ? "visible" : ""}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 block" />
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-orange-600">
                    Service Reach
                  </span>
                </div>
                <h2
                  className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-5 sm:mb-7 reveal-left d1 ${coverageInView ? "visible" : ""}`}
                >
                  Serving Builders
                  <br />
                  Across <em className="text-orange-600">India.</em>
                </h2>
                <p
                  className={`text-stone-500 text-sm sm:text-base leading-relaxed font-light mb-5 sm:mb-6 reveal-left d2 ${coverageInView ? "visible" : ""}`}
                >
                  With a robust supply chain and reliable logistics network, VR
                  &amp; Sons delivers premium bricks to construction sites
                  across major cities — on time, every time.
                </p>
                <div
                  className={`flex flex-wrap gap-5 sm:gap-8 mb-6 sm:mb-8 reveal-left d3 ${coverageInView ? "visible" : ""}`}
                >
                  {[
                    ["Residential", "Homes & Villas"],
                    ["Commercial", "Offices"],
                    ["Industrial", "Factories"],
                  ].map(([v, l]) => (
                    <div
                      key={v}
                      className="border-l-4 border-orange-500 pl-3 sm:pl-4"
                    >
                      <div className="font-serif text-base sm:text-lg font-bold text-stone-900">
                        {v}
                      </div>
                      <div className="text-[10px] sm:text-xs text-stone-400 font-medium">
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className={`reveal-left d4 ${coverageInView ? "visible" : ""}`}
                >
                  <button className="w-full cursor-pointer sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-orange-600 text-white font-bold text-xs tracking-widest uppercase rounded-xl shadow-xl shadow-orange-200 glow-btn hover:bg-orange-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                    <FaTruck className="w-4 h-4" />
                    <span>Get a Quote</span>
                  </button>
                </div>
              </div>

              <div
                className={`reveal-right ${coverageInView ? "visible" : ""}`}
              >
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-orange-100 shadow-2xl shadow-orange-100/30">
                  <div className="mb-4 sm:mb-5">
                    <div className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-stone-400 mb-3">
                      Brick Tone Palette
                    </div>
                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                      {brickPalette.map((c, i) => (
                        <div
                          key={i}
                          className={`brick-cell h-8 sm:h-10 ${c} rounded-lg cursor-pointer`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-orange-100 pt-4 sm:pt-5">
                    <div className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-stone-400 mb-3 flex items-center gap-2">
                      <FaTruck className="text-orange-500 flex-shrink-0" />{" "}
                      Active Service Cities
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {cities.map((city) => (
                        <div
                          key={city}
                          onMouseEnter={() => setHoveredCity(city)}
                          onMouseLeave={() => setHoveredCity(null)}
                          className={`flex items-center gap-1 sm:gap-1.5 border rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold transition-all duration-300 cursor-default ${hoveredCity === city ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200 scale-105" : "bg-stone-50 text-stone-600 border-stone-200 hover:border-orange-300"}`}
                        >
                          <span
                            className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${hoveredCity === city ? "bg-white" : "bg-orange-500"} transition-colors flex-shrink-0`}
                          />
                          {city}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] sm:text-xs text-stone-400 mt-2 sm:mt-3 font-medium">
                      + More cities on request
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
