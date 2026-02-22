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

  return <>{count.toLocaleString()}</>;
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

/* ── Value Card ── */
// const ValueCard = ({ icon, title, desc, delay, inView }) => (
//   <div
//     className="bg-white border border-orange-100 rounded-2xl p-5 sm:p-6 group hover:-translate-y-2 hover:shadow-xl hover:border-orange-300 hover:shadow-orange-100/50 transition-all duration-500 cursor-default"
//     style={{
//       opacity: inView ? 1 : 0,
//       transform: inView ? "translateY(0)" : "translateY(30px)",
//       transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}`,
//     }}
//   >
//     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-all duration-300">
//       {icon}
//     </div>
//     <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 mb-2 group-hover:text-orange-700 transition-colors">
//       {title}
//     </h3>
//     <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
//       {desc}
//     </p>
//   </div>
// );

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
  const trackRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const itemRefs = useRef([]);

  const ITEM_WIDTH = 520;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const container = trackRef.current;
    const item = itemRefs.current[activeIndex];

    if (!container || !item) return;

    const containerWidth = container.offsetWidth;
    const itemWidth = item.offsetWidth;
    const itemLeft = item.offsetLeft;

    const scrollPosition = itemLeft - containerWidth / 2 + itemWidth / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }, [activeIndex]);

  const scrollTo = (index) => {
    setActiveIndex(index);
  };

  const stats = [
    {
      value: 40,
      suffix: "+",
      label: "Years of Excellence",
      icon: <FaTrophy className="w-6 h-6 sm:w-8 sm:h-8" />,
      delay: "0s",
    },
    {
      value: 500,
      suffix: "+",
      label: "Projects Completed",
      icon: <FaBuilding className="w-6 h-6 sm:w-8 sm:h-8" />,
      delay: "0.12s",
    },
    {
      value: 300,
      suffix: "+",
      label: "Happy Clients",
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
      category: "FOUNDATION",
      icon: "🏭",
      title: "Company Founded",
      description:
        "Established with a vision to redefine brick manufacturing in India. Started with a single kiln and a commitment to quality that would define three decades of excellence.",
      tags: ["+ Foundation", "+ Legacy"],
    },
    {
      year: "1995",
      category: "EXPANSION",
      icon: "🧱",
      title: "First Major Expansion",
      description:
        "Scaled operations to meet the growing demand for quality bricks across the region. Introduced modern kiln technology that improved output while maintaining our quality standards.",
      tags: ["+ Growth", "+ Technology"],
    },
    {
      year: "2005",
      category: "INNOVATION",
      icon: "⚙️",
      title: "Automated Production",
      description:
        "Pioneered automated brick production in the region, dramatically increasing capacity. This milestone positioned us as a leader in manufacturing efficiency and product consistency.",
      tags: ["+ Automation", "+ Capacity"],
    },
    {
      year: "2009",
      category: "RECOGNITION",
      icon: "🏆",
      title: "Industry Award",
      description:
        "Received the National Excellence in Manufacturing award, recognizing our commitment to quality and innovation. A proud milestone that validated years of relentless effort.",
      tags: ["+ Award", "+ Excellence"],
    },
    {
      year: "2016",
      category: "SUSTAINABILITY",
      icon: "🌿",
      title: "Eco-Friendly Initiative",
      description:
        "Launched our green manufacturing program, reducing carbon emissions by 35%. Introduced energy-efficient kilns and waste reduction processes that set new industry benchmarks.",
      tags: ["+ Green", "+ Sustainability"],
    },
    {
      year: "2021",
      category: "DIGITAL LEAP",
      icon: "💡",
      title: "Digital Transformation",
      description:
        "Integrated smart manufacturing systems across all production lines. Real-time quality monitoring and AI-powered inventory management brought us into the future of brick making.",
      tags: ["+ Digital", "+ Smart Factory"],
    },
    {
      year: "2030",
      category: "VISION",
      icon: "🚀",
      title: "India's Most Trusted",
      description:
        "Our ambitious goal: to become India's most trusted and largest brick manufacturer. With new plants, sustainable processes, and a nationwide distribution network, we're on track.",
      tags: ["+ Goal", "+ Vision"],
      isFuture: true,
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
          className="mt-10 min-h-[70vh] relative flex items-center overflow-hidden bg-gradient-to-br from-stone-50 via-orange-100/60 to-stone-100 pt-16 pb-8 border-b border-stone-200"
        >
          <BrickWall opacity={0.05} color="#8B4513" />

          {/* Main Content Container */}
          <div className="max-w-8xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 items-center">
              {/* Left Content */}
              <div className="max-w-3xl">
                {/* Badge with enhanced animation */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={heroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-5 shadow-lg shadow-orange-100/50"
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-red-600 block flex-shrink-0"
                  />
                  <span className="text-[9px] sm:text-xs font-bold tracking-widest uppercase text-red-600">
                    Trusted Since 1986 · Residential · Commercial · Industrial
                  </span>
                </motion.div>

                {/* Headline with enhanced animations - REDUCED TEXT SIZES */}
                <h1 className="font-serif leading-none mb-4  sm:mb-6">
                  {[
                    {
                      text: "Built on Strength",
                      cls: "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-stone-700",
                      delay: 0.2,
                    },
                    // {
                    //   text: "Strength,",
                    //   cls: "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-900",
                    //   delay: 0.4,
                    // },
                    {
                      text: "Fired with",
                      cls: "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-stone-700",
                      delay: 0.5,
                    },
                    {
                      text: "Purpose.",
                      cls: "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold italic text-red-600",
                      delay: 0.8,
                    },
                  ].map(({ text, cls, delay }) => (
                    <span
                      key={text}
                      className="hero-line block overflow-hidden lg:h-17"
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

                {/* Description with fade-in - REDUCED MARGINS */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="text-sm sm:text-base text-stone-500 leading-relaxed max-w-xl font-light mb-5 sm:mb-6"
                >
                  VR &amp; Sons has been a trusted name in brick manufacturing
                  since 1986 — delivering high-strength, eco-friendly bricks for
                  residential, commercial, and industrial projects across India.
                </motion.p>

                {/* Buttons with hover effects - SMALLER BUTTONS */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-5 sm:mb-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="
              bg-red-700
              hover:bg-red-800
              text-white
              font-semibold
              tracking-wide
              px-5 py-2.5
              rounded-xl
              shadow-md
              hover:shadow-xl
              hover:-translate-y-1
              transition-all duration-300
              text-sm
            "
                  >
                    Discover Our Story
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full sm:w-auto cursor-pointer px-5 py-2.5 border-2 border-stone-300 text-stone-600 font-semibold text-sm tracking-wide rounded-xl hover:border-red-400 hover:text-red-600 hover:bg-red-50/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <GiBrickWall className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                    <span>Our Products</span>
                  </motion.button>
                </motion.div>

                {/* Trust indicators with stagger - SMALLER TEXT */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="flex flex-wrap gap-3 sm:gap-4"
                >
                  {[
                    {
                      icon: <FaShieldAlt className="w-3 h-3" />,
                      text: "IS:1077 Certified",
                      color: "from-orange-500 to-orange-600",
                    },
                    {
                      icon: <FaLeaf className="w-3 h-3" />,
                      text: "Eco-Friendly",
                      color: "from-green-500 to-green-600",
                    },
                    {
                      icon: <FaAward className="w-3 h-3" />,
                      text: "40+ Years of Trust",
                      color: "from-blue-500 to-blue-600",
                    },
                  ].map(({ icon, text, color }, index) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, x: -20 }}
                      animate={heroInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                      whileHover={{ scale: 1.03, x: 2 }}
                      className="flex items-center gap-1 text-stone-500 group cursor-default"
                    >
                      <motion.span
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${color}`}
                      >
                        {icon}
                      </motion.span>
                      <span className="text-[10px] sm:text-xs font-medium tracking-wide group-hover:text-stone-700 transition-colors">
                        {text}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Right Side - Image Gallery - SMALLER IMAGE */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative lg:block"
              >
                {/* Main Image */}
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4 }}
                    className="relative rounded-xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80"
                      alt="Brick manufacturing facility"
                      className="w-full h-[350px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                    {/* Overlay Text */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="absolute bottom-4 left-4 text-white"
                    >
                      <p className="text-xs font-light opacity-90">
                        Modern Facility
                      </p>
                      <p className="text-lg font-bold">
                        50+ Million Bricks/Year
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Decorative Elements - SMALLER */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -z-10 -top-6 -right-6 w-24 h-24 border border-red-200 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -z-10 -bottom-6 -left-6 w-20 h-20 border border-dashed border-red-200 rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* 1986 watermark - SMALLER */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-2 right-2 sm:right-4 font-serif text-[5rem] sm:text-[7rem] lg:text-[10rem] font-bold text-red-600 leading-none pointer-events-none select-none hidden sm:block"
          >
            1986
          </motion.div>

          {/* Enhanced Scroll indicator - SMALLER */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-60 transition-opacity cursor-pointer"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <span className="text-[9px] font-bold tracking-widest uppercase text-stone-400">
              Scroll
            </span>
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <section
          ref={statsRef}
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden bg-white"
        >
          <BrickWall opacity={0.05} color="#8B4513" />
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
                            <>
                              <Counter from={0} to={s.value} duration={2} />
                              <span>{s.suffix}</span>
                            </>
                          ) : (
                            <>
                              0<span>{s.suffix}</span>
                            </>
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
          className="relative border-t border-b border-stone-200 bg-white overflow-hidden py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
        >
          {/* Background pattern with better opacity */}
          <BrickWall opacity={0.08} color="#8B4513" />

          {/* Gradient overlay - more subtle */}
          <div className="absolute top-0 right-0 w-2/5 h-full bg-gradient-to-l from-red-50/50 via-red-50/20 to-transparent hidden lg:block" />

          {/* Decorative element - subtle brick texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #8B4513 0px, #8B4513 2px, transparent 2px, transparent 8px)`,
            }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Content Column */}
              <div className="space-y-8">
                {/* Badge */}
                <div
                  className={`inline-flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-full px-4 py-2 reveal-left ${storyInView ? "visible" : ""}`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-red-600">
                    Established 1986
                  </span>
                </div>

                {/* Heading */}
                <h2
                  className={`font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-stone-900 leading-[1.1] tracking-tight reveal-left d1 ${storyInView ? "visible" : ""}`}
                >
                  A Story Fired
                  <br />
                  in{" "}
                  <span className="relative">
                    <span className="text-red-600 relative z-10">Clay</span>
                    <span className="absolute bottom-2 left-0 w-full h-3 bg-red-200/50 -z-0 rounded-full" />
                  </span>
                  <br />
                  Written in Stone.
                </h2>

                {/* Description */}
                <div className="space-y-5 max-w-xl">
                  <p
                    className={`text-stone-600 text-base sm:text-lg leading-relaxed font-light reveal-left d2 ${storyInView ? "visible" : ""}`}
                  >
                    In 1986, VR & Sons was founded with a singular commitment —
                    to manufacture bricks of uncompromising quality that
                    builders and engineers could rely on. What began as a
                    regional operation quickly earned a reputation that spread
                    across the construction industry.
                  </p>
                  <p
                    className={`text-stone-500 text-sm sm:text-base leading-relaxed reveal-left d3 ${storyInView ? "visible" : ""}`}
                  >
                    From traditional brick-making methods to modern production
                    techniques, we have continuously evolved to meet changing
                    construction demands — always maintaining the consistency
                    and reliability our clients depend on.
                  </p>
                </div>

                {/* Stats */}
                <div
                  className={`flex flex-wrap gap-8 sm:gap-12 pt-4 reveal-left d4 ${storyInView ? "visible" : ""}`}
                >
                  {[
                    ["500+", "Projects Completed"],
                    ["40+", "Years of Excellence"],
                    ["100%", "Quality Assured"],
                  ].map(([value, label]) => (
                    <div key={value} className="relative">
                      <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-1">
                        {value}
                      </div>
                      <div className="text-[11px] sm:text-xs font-medium tracking-wide uppercase text-stone-400">
                        {label}
                      </div>
                      {/* Decorative dot */}
                      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-300 rounded-full hidden sm:block" />
                    </div>
                  ))}
                </div>

                {/* Categories */}
                <div
                  className={`flex flex-wrap gap-6 sm:gap-8 pt-2 reveal-left d5 ${storyInView ? "visible" : ""}`}
                >
                  {[
                    ["Residential", "Projects"],
                    ["Commercial", "Buildings"],
                    ["Industrial", "Facilities"],
                  ].map(([category, type]) => (
                    <div key={category} className="group cursor-default">
                      <div className="border-l-4 border-red-500 pl-4 transition-all duration-300 group-hover:border-red-600 group-hover:pl-5">
                        <div className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                          {category}
                        </div>
                        <div className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-stone-400">
                          {type}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual Column */}
              <div
                className={`space-y-5 reveal-right ${storyInView ? "visible" : ""}`}
              >
                {/* Main Feature Card */}
                <div className="group relative bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl overflow-hidden shadow-2xl shadow-red-900/20 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-red-600/25">
                  {/* Decorative pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: "24px 24px",
                    }}
                  />

                  <div className="relative p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-red-300/80 text-xs font-medium tracking-wider">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                          Premium Collection
                        </div>
                        <div>
                          <div className="font-serif text-white text-2xl sm:text-3xl font-bold">
                            Precision Crafted
                          </div>
                          <div className="text-stone-400 text-sm mt-1">
                            Engineering Grade Clay Bricks
                          </div>
                        </div>
                      </div>

                      {/* Year Badge */}
                      <div className="relative">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-2xl flex flex-col items-center justify-center shadow-lg transform rotate-3 transition-transform group-hover:rotate-6">
                          <div className="font-serif text-3xl sm:text-4xl font-bold text-white leading-none">
                            40
                          </div>
                          <div className="text-white/80 text-[8px] sm:text-[10px] font-bold tracking-wider uppercase mt-1">
                            Years
                          </div>
                        </div>
                        {/* Decorative ring */}
                        <div className="absolute -inset-1 border border-red-500/30 rounded-2xl -z-10" />
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-6 pt-4 border-t border-stone-700">
                      <div className="flex justify-between text-xs text-stone-400 mb-2">
                        <span>Quality Index</span>
                        <span className="text-red-400">98.5%</span>
                      </div>
                      <div className="h-1.5 bg-stone-700 rounded-full overflow-hidden">
                        <div className="h-full w-[98.5%] bg-gradient-to-r from-red-500 to-red-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Cards Grid */}
                <div className="grid grid-cols-2 gap-5">
                  {/* Trust Card */}
                  <div className="group bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-200">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className="w-4 h-4 text-red-500 fill-current"
                        />
                      ))}
                    </div>
                    <div className="font-serif text-lg font-bold text-stone-900 mb-1">
                      Trusted Partner
                    </div>
                    <div className="text-sm text-stone-500 leading-relaxed">
                      <span className="font-semibold text-stone-900">500+</span>{" "}
                      satisfied clients across India
                    </div>
                    <div className="mt-3 flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-stone-200 border-2 border-white"
                        />
                      ))}
                      <div className="w-6 h-6 rounded-full bg-red-100 border-2 border-white flex items-center justify-center">
                        <span className="text-[8px] font-bold text-red-600">
                          +
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Factory Card */}
                  <div className="group bg-stone-900 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
                    {/* Background pattern */}
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 12px)`,
                      }}
                    />

                    <div className="relative">
                      <TbBuildingFactory2 className="w-8 h-8 sm:w-10 sm:h-10 text-red-400 mb-4" />
                      <div>
                        <div className="text-white text-lg font-bold font-serif mb-1">
                          Est. 1986
                        </div>
                        <div className="text-stone-400 text-xs sm:text-sm">
                          State-of-the-art manufacturing facility spread across
                          25 acres
                        </div>
                      </div>

                      {/* Floating indicator */}
                      <div className="absolute top-0 right-0 w-12 h-12">
                        <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping" />
                        <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="flex items-center gap-3 text-xs text-stone-500 pt-2">
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full" />
                    <span>ISO 9001:2023</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full" />
                    <span>Green Building Certified</span>
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
                <div key={i} className="bg-red-600 rounded-sm" />
              ))}
            </div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div
              className={`text-center mb-10 sm:mb-16 section-reveal ${missionInView ? "visible" : ""}`}
            >
              <div className="inline-flex items-center gap-2 bg-red-900/50 border border-red-700/50 rounded-full px-4 py-1.5 mb-4 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 block" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-red-400">
                  Our Foundation
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Mission &amp; <em className="text-red-400">Vision</em>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Mission */}
              <div
                className={`bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 hover:border-red-500/40 transition-all duration-500 group reveal-left ${missionInView ? "visible" : ""}`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600/20 border border-red-600/40 rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6">
                  <FaHardHat className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                </div>
                <div className="text-red-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3">
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
                      <FaCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vision */}
              <div
                className={`bg-red-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 relative overflow-hidden reveal-right ${missionInView ? "visible" : ""}`}
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

        {/* ── Roadmap── */}
        <section
          style={{ fontFamily: "'Georgia', serif" }}
          className="relative bg-[#f0ede8] overflow-hidden py-20 select-none"
        >
          {/* Top horizontal rule with diamond */}
          <BrickWall opacity={0.05} color="#8B4513" />
          <div className="relative mx-16 mb-0">
            <div className="w-full h-px bg-stone-400"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-stone-800 rotate-45"></div>
          </div>

          {/* Scrollable year track */}
          <div
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex overflow-x-auto cursor-grab active:cursor-grabbing scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {/* Padding spacer left */}
            <div style={{ minWidth: "calc(50vw - 130px)" }}></div>

            {milestones.map((m, i) => (
              <div
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                onClick={() => scrollTo(i)}
                style={{ minWidth: `${ITEM_WIDTH}px` }}
                className="relative flex flex-col cursor-pointer"
              >
                {/* Year display */}
                <div
                  className="transition-all duration-500 leading-none py-6"
                  style={{
                    fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
                    fontSize:
                      i === activeIndex
                        ? "clamp(80px, 12vw, 160px)"
                        : "clamp(50px, 8vw, 100px)",
                    fontWeight: 900,
                    color: i === activeIndex ? "#1c1917" : "#c7bfb5",
                    letterSpacing: "-0.03em",
                    transition: "all 0.4s ease",
                    userSelect: "none",
                  }}
                >
                  {m.year}
                </div>
              </div>
            ))}

            {/* Padding spacer right */}
            <div style={{ minWidth: "calc(50vw - 130px)" }}></div>
          </div>

          {/* Bottom horizontal rule */}
          <div className="mx-16 -mt-2">
            <div className="w-full h-px bg-stone-400"></div>
          </div>

          {/* Content panel */}
          <div className="mx-16 mt-10 grid grid-cols-12 gap-8 min-h-[200px]">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="col-span-12 transition-all duration-500"
                style={{
                  display: i === activeIndex ? "block" : "none",
                }}
              >
                <div className="grid grid-cols-12 gap-8 items-start">
                  {/* Left: Icon + Category */}
                  <div className="col-span-3 lg:col-span-2 flex flex-col items-start gap-2">
                    <div
                      className="w-12 h-12 border border-stone-400 flex items-center justify-center text-xl"
                      style={{ background: "rgba(255,255,255,0.5)" }}
                    >
                      {m.icon}
                    </div>
                    <p
                      className="text-stone-600 font-bold tracking-widest text-xs mt-1"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {m.category}
                    </p>
                  </div>

                  {/* Right: Description + Tags */}
                  <div className="col-span-9 lg:col-span-7">
                    <p
                      className="text-stone-600 text-sm leading-relaxed mb-5 max-w-xl"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {m.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {m.tags.map((tag, t) => (
                        <span
                          key={t}
                          className="text-xs border border-stone-400 text-stone-600 px-3 py-1 rounded-full"
                          style={{ fontFamily: "sans-serif" }}
                        >
                          {tag}
                        </span>
                      ))}
                      {m.isFuture && (
                        <span
                          className="text-xs border border-orange-400 text-orange-600 px-3 py-1 rounded-full"
                          style={{ fontFamily: "sans-serif" }}
                        >
                          ◆ Future Goal
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-10">
            {milestones.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="transition-all duration-300"
                style={{
                  width: i === activeIndex ? "24px" : "8px",
                  height: "8px",
                  borderRadius: i === activeIndex ? "4px" : "50%",
                  background: i === activeIndex ? "#1c1917" : "#c7bfb5",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </section>

        {/* ── COVERAGE ── */}
        <section
          ref={coverageRef}
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-stone-50 relative overflow-hidden border-t border-stone-200"
        >
          <BrickWall opacity={0.05} color="#8B4513" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <div
                  className={`inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-4 sm:mb-5 reveal-left ${coverageInView ? "visible" : ""}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-700 block" />
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-red-700">
                    Service Reach
                  </span>
                </div>
                <h2
                  className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-5 sm:mb-7 reveal-left d1 ${coverageInView ? "visible" : ""}`}
                >
                  Serving Builders
                  <br />
                  Across <em className="text-red-700">India.</em>
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
                      className="border-l-4 border-red-600 pl-3 sm:pl-4"
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
                  <button className="w-full cursor-pointer sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-red-700 text-white font-bold text-xs tracking-widest uppercase rounded-xl shadow-xl  hover:bg-red-800 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                    <FaTruck className="w-4 h-4" />
                    <span>Get a Quote</span>
                  </button>
                </div>
              </div>

              <div
                className={`reveal-right ${coverageInView ? "visible" : ""}`}
              >
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-red-100 shadow-2xl shadow-red-100/30">
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
                  <div className="border-t border-red-100 pt-4 sm:pt-5">
                    <div className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-stone-400 mb-3 flex items-center gap-2">
                      <FaTruck className="text-red-500 flex-shrink-0" />{" "}
                      Active Service Cities
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {cities.map((city) => (
                        <div
                          key={city}
                          onMouseEnter={() => setHoveredCity(city)}
                          onMouseLeave={() => setHoveredCity(null)}
                          className={`flex items-center gap-1 sm:gap-1.5 border rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold transition-all duration-300 cursor-default ${hoveredCity === city ? "bg-red-600 text-white border-red-600 shadow-md shadow-orange-200 scale-105" : "bg-stone-50 text-stone-600 border-stone-200 hover:border-red-300"}`}
                        >
                          <span
                            className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${hoveredCity === city ? "bg-white" : "bg-red-600"} transition-colors flex-shrink-0`}
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
