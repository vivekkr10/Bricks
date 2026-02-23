import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Building2,
  ChevronDown,
} from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "../Components/header";
import Footer from "../Components/footer";
import {
  heroImg,
  brick1,
  brick2,
  brick3,
  brick4,
  brick5,
  brick6,
  brick7,
  G1,
  G2,
  G3,
  G4,
  G5,
  G6,
  G7,
  G8,
  G9,
  G10,
  G11,
  G12,
  P1,
  P2,
  P3,
} from "../assets/homeAssets";
// --- HOOKS ---
const useScrollReveal = (threshold = 0.3) => {
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
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

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

// --- COMPONENTS ---

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

const Hero = () => {
  const containerRef = useRef(null);

  // 1. Mouse tracking setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse values
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  // 2. Multi-layer Parallax & 3D Tilt Transforms
  // Background moves slightly opposite to create depth
  const bgMoveX = useTransform(mouseXSpring, [-0.5, 0.5], ["30px", "-30px"]);
  const bgMoveY = useTransform(mouseYSpring, [-0.5, 0.5], ["30px", "-30px"]);

  // Foreground glow moves with the mouse
  const glowMoveX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50px", "50px"]);
  const glowMoveY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50px", "50px"]);

  // 3D tilt for the main content block
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    // Reset to center smoothly when mouse leaves
    x.set(0);
    y.set(0);
  };

  // 3. Advanced Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Delay between each child animating in
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }, // Custom Apple-like easing
    },
  };

  // Generate random particles for the cinematic dust effect
  const particles = Array.from({ length: 20 });

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center overflow-hidden bg-stone-950 pt-32 pb-32 md:min-h-[700px] perspective-[1200px]"
    >
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 overflow-hidden z-0 bg-stone-950">
        <motion.div
          style={{ x: bgMoveX, y: bgMoveY, scale: 1.1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Note: Ensure heroImg is passed/imported correctly */}
          <img
            src={heroImg}
            alt="Bricks Background"
            className="w-full h-full object-cover object-right opacity-100 mix-blend-luminosity"
          />
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/100 via-stone-950/80 via-20% to-transparent to-60%"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

        {/* Animated Dust Particles */}
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
            initial={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* GLOW LAYER */}
      <motion.div
        style={{ x: glowMoveX, y: glowMoveY }}
        className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center"
      >
        <div className="absolute w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-[140px]" />
      </motion.div>

      {/* FOREGROUND CONTENT LAYER (with 3D Tilt) */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="container mx-auto px-6 relative z-10 w-full flex flex-col items-start text-left"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-500/40 bg-orange-900/30 backdrop-blur-md mb-8 shadow-lg shadow-orange-900/20"
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse shadow-[0_0_8px_#fb923c]"></span>
            <span className="text-orange-100 text-xs font-bold tracking-[0.2em] uppercase font-sans">
              Crafting Excellence Since 1986
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold leading-[1.1] text-white tracking-tight mb-6 drop-shadow-2xl"
          >
            Foundations of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-orange-400 bg-[length:200%_auto] animate-gradient">
              Timeless Quality
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-stone-300 max-w-2xl leading-relaxed mb-10 font-sans font-light drop-shadow-lg"
          >
            Trusted brick manufacturer supplying high-strength construction
            materials for residential, commercial, and industrial projects.
            Building the future, brick by brick.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-start gap-5"
          >
            <Link
              to="/products"
              className="group relative px-6 py-3 bg-red-700 text-white font-bold font-sans tracking-wider text-xs uppercase rounded-xl overflow-hidden shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(234,88,12,0.5)]"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-800 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity tracking-wide duration-300"></span>
              <span className="relative flex items-center gap-2 drop-shadow-md">
                View Products{" "}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3 bg-white/5 border border-white/20 text-white font-semibold font-sans tracking-wide text-xs uppercase rounded-xl hover:bg-white hover:text-stone-950 transition-all duration-300 backdrop-blur-sm flex items-center shadow-lg hover:-translate-y-1"
            >
              Contact Sales
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient { animation: gradient 6s ease infinite; }
      `}</style>
    </section>
  );
};

const FloatingStatsBar = () => {
  const { count: projects, ref: projRef } = useCounter(312, 2500);
  const { count: sat, ref: satRef } = useCounter(93, 2000);
  const { count: exp, ref: expRef } = useCounter(40, 1500);

  return (
    // Increased max-w-5xl to max-w-6xl so it perfectly matches the grid width below it
    <div className="relative z-30  mx-36 px-4 -mt-14 mb-10">
      <div className="bg-white/95 backdrop-blur-xl border border-stone-200 shadow-2xl rounded-2xl py-6  flex flex-col md:flex-row items-center justify-around gap-8">
        <div
          ref={projRef}
          className="group flex flex-col items-center text-center w-full md:w-1/3 cursor-default"
        >
          <Building2 className="w-8 -ml-4 h-8  text-red-700 mb-3 opacity-90 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
          <div className="text-4xl md:text-4xl font-sans font-semibold text-stone-900 mb-2">
            {projects}+
          </div>
          <div className="text-sm font-serif font-bold uppercase tracking-widest text-stone-600">
            Projects Served
          </div>
        </div>

        <div className="hidden md:block w-px h-16 bg-stone-200"></div>
        <div className="md:hidden h-px w-full bg-stone-200"></div>

        <div
          ref={satRef}
          className="group flex flex-col items-center text-center w-full md:w-1/3 cursor-default"
        >
          <Star className="w-8 -ml-4 h-8 text-red-700 mb-3 opacity-90 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
          <div className="text-4xl md:text-4xl font-sans font-semibold text-stone-900 mb-2">
            {sat}%
          </div>
          <div className="text-sm font-serif font-bold uppercase tracking-widest text-stone-600">
            Satisfaction Rate
          </div>
        </div>

        <div className="hidden md:block w-px h-16 bg-stone-200"></div>
        <div className="md:hidden h-px w-full bg-stone-200"></div>

        <div
          ref={expRef}
          className="group flex flex-col items-center text-center w-full md:w-1/3 cursor-default"
        >
          <ShieldCheck className="w-8 -ml-3 h-8 text-red-700 mb-3 opacity-90 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
          <div className="text-4xl md:text-4xl font-sans font-semibold text-stone-900 mb-2">
            {exp}+
          </div>
          <div className="text-sm font-serif font-bold uppercase tracking-widest text-stone-600">
            Years Experience
          </div>
        </div>
      </div>
    </div>
  );
};
const headingVariant = {
  hidden: { opacity: 0, x: -150, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1.25, ease: "easeOut" },
  },
};

const paragraphVariant = {
  hidden: { opacity: 0, x: 150, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1.5, delay: 0.4, ease: "easeOut" },
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 2, delay: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

const AboutShort = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`py-12 md:py-16 bg-transparent transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-4 justify-center lg:justify-start">
              <span className="w-8 h-[2px] bg-red-600"></span>
              <span className="text-red-700 font-bold uppercase tracking-widest text-xs font-sans">
                The Legacy
              </span>
            </div>

            {/* <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-stone-950 mb-6 leading-tight">
              Welcome to <br className="hidden lg:block"/> VR & Sons
            </h2> */}
            <motion.h2
              viewport={{ once: true, amount: 0.7 }}
              variants={headingVariant}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-stone-950 mb-6 leading-tight"
            >
              Welcome to <br className="hidden lg:block" /> VR & Sons
            </motion.h2>

            {/* <div className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-stone-200 w-full h-48 md:h-64 mt-6 hidden lg:block overflow-hidden group border border-stone-200"> */}
            <motion.div
              viewport={{ once: true, amount: 1 }}
              variants={imageVariant}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-stone-200 w-full h-48 md:h-64 mt-6 hidden lg:block overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80"
                alt="Craftsmanship"
                className="w-full h-full object-cover grayscale-[30%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
              />
            </motion.div>
            {/* </div> */}
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center h-full lg:pt-4 lg:mt-6 ">
            <motion.p
              viewport={{ once: true, amount: 0.8 }}
              variants={paragraphVariant}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="text-xl md:text-2xl text-stone-800 font-serif leading-relaxed mb-6 text-center lg:text-left"
            >
              We are a leading brick manufacturer committed to delivering
              <strong className="text-red-700 font-bold"> durable</strong>,
              <strong className="text-red-700 font-bold"> eco-friendly</strong>,
              and
              <strong className="text-red-700 font-bold">
                {" "}
                high-performance
              </strong>{" "}
              bricks.
            </motion.p>

            <motion.p
              variants={paragraphVariant}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              // className="text-xl md:text-2xl text-stone-800 font-serif leading-relaxed mb-6 text-center lg:text-left"
            >
              <p className="text-base md:text-lg text-stone-600 leading-relaxed font-sans font-light text-center lg:text-left mb-8">
                With over 30 years of industry experience, we supply the
                foundation for builders, contractors, and visionaries. Our
                commitment to quality ensures that every brick fired in our
                kilns meets the highest architectural standards.
                <br />
                From residential homes to large-scale commercial developments,
                our products are engineered for strength, consistency, and
                long-lasting performance.
              </p>
              <p className="text-base md:text-lg text-stone-600 leading-relaxed font-sans font-light text-center lg:text-left mb-8">
                Trusted by architects, engineers, and construction experts, we
                continue to build structures that shape skylines and
                communities.
              </p>
            </motion.p>

            <div className="text-center lg:right-left">
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3  bg-red-700 text-white font-bold font-sans text-xs uppercase tracking-widest rounded-xl hover:bg-red-800   hover:-translate-y-1 transition-all duration-300"
              >
                Discover Our Story <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductOverview = () => {
  const { ref, isVisible } = useScrollReveal();

  const products = [
    { title: "Classic Reds", img: brick1 },
    { title: "Yellows", img: brick5 },
    { title: "Multies", img: brick2 },
    { title: "Darks", img: brick3 },
    { title: "Hamptons", img: brick4 },
    { title: "Rumbled", img: brick6 },
    { title: "Reclaimed", img: brick7 },
  ];

  return (
    <section
      ref={ref}
      className={`py-12 md:py-16 bg-transparent overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Title Centered */}
      <div className="container mx-auto px-6 mb-10 relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-[2px] bg-red-600"></span>
          <span className="text-red-700 font-bold uppercase tracking-widest text-xs font-sans">
            Our Products
          </span>
          <span className="w-8 h-[2px] bg-red-600"></span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-4">
          Top<span className="mx-0.5 font-sans">-</span>tier Bricks
        </h2>
        <p className="text-stone-600 font-sans font-light text-lg">
          High-grade clay crafted for modern architectural needs.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative  overflow-hidden z-10 pb-6 ml-6 mr-6  ">
        <div className="absolute left-0 top-0 h-full w-24 md:w-48 bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none opacity-50"></div>
        <div className="absolute right-0 top-0 h-full w-24 md:w-48 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none opacity-50"></div>

        <div className="flex animate-marquee-horizontal gap-6 ">
          {[...products, ...products, ...products].map((p, i) => (
            <div
              key={i}
              className="w-64 md:w-72 flex-shrink-0 group cursor-pointer"
            >
              <div className="h-56 overflow-hidden rounded-2xl mb-4 shadow-sm border border-stone-300 bg-white group-hover:shadow-xl group-hover:border-orange-300 transition-all duration-500">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-800 grayscale-[10%] group-hover:grayscale-0"
                />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900 group-hover:text-orange-700 transition-colors text-center">
                {p.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Link aligned to the right, below the cards */}
      <div className="container mx-auto px-6 mt-4 flex justify-center relative z-10">
        <Link
          to="/products"
          className=" hover:scale-105 
 inline-flex items-end text-red-700 font-bold font-sans uppercase  text-xs hover:text-red-800 transition-colors group border-b-2 border-red-200 pb-1 hover:border-red-700"
        >
          View Collection
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <style>{`
        @keyframes marquee-horiz {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-horizontal {
          width: max-content;
          animation: marquee-horiz 50s linear infinite;
        }
        .animate-marquee-horizontal:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

// --- UPDATED GALLERY SECTION ---
// --- UPDATED GALLERY SECTION (DARK SOLID THEME) ---
const BrickImpressions = () => {
  const { ref, isVisible } = useScrollReveal();

  const col1 = [G1, G2, G3, G4];
  const col2 = [G5, G6, G7, G8];
  const col3 = [G9, G10, G11, G12];

  const ImageColumn = ({
    images,
    direction = "up",
    offset = 0,
    className = "",
  }) => (
    <div className={`relative overflow-hidden w-64 group ${className}`}>
      <div
        className={`flex flex-col gap-6 ${direction === "up" ? "animate-marquee-up" : "animate-marquee-down"}`}
        style={{ transform: `translateY(${offset}px)` }}
      >
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden shadow-2xl border border-white/5"
          >
            <img
              src={src}
              alt="Brick Texture"
              className="w-full h-72 object-cover hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      ref={ref}
      // CHANGED: Using bg-stone-900 for a deep, high-end dark solid look
      className={`relative py-24 md:py-32 bg-stone-900 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      {/* Background radial glow to add depth to the dark section */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.05)_0%,transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-4 justify-center lg:justify-start">
              <span className="w-8 h-[2px] bg-red-500"></span>
              <span className="text-red-400 font-bold uppercase tracking-widest text-[10px] font-sans">
                Visual Mastery
              </span>
            </div>

            <motion.h2
              viewport={{ once: true, amount: 0.7 }}
              variants={headingVariant}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mt-2 mb-8 leading-tight"
            >
              {/* Text colors adjusted for dark background */}
              {/* <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mt-2 mb-8 leading-tight"> */}
              Building Dreams with Quality and Strength <br />{" "}
              <span className="italic text-red-700">Brick Impressions.</span>
              {/* </h2> */}
            </motion.h2>
            <p className="text-lg text-stone-400 leading-relaxed mb-10 max-w-xl font-sans font-light mx-auto lg:mx-0">
              Step into the world of timeless craftsmanship with VR & Sons
              Bricks, where every brick is more than just a construction
              material - it is a statement of strength, sophistication, and
              architectural excellence.
            </p>

            <Link
              to="/projects"
              className="inline-flex items-center font-bold text-xs uppercase tracking-widest text-white hover:text-red-400 group font-sans border-b border-white/20 pb-2 hover:border-red-500 transition-all mt-4"
            >
              Explore Full Collection
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative">
            {/* The card is now semi-transparent glass to blend with the dark background */}
            <div className="backdrop-blur-xl rounded-[2.5rem] p-4 md:p-6 relative h-[520px] overflow-hidden flex justify-center gap-4 md:gap-6">
              <ImageColumn images={col1} direction="up" />
              <ImageColumn
                images={col2}
                direction="down"
                offset={-120}
                className="hidden sm:block"
              />
              <ImageColumn
                images={col3}
                direction="up"
                offset={-60}
                className="hidden md:block"
              />

              {/* Dark Fade masks to match the bg-stone-900 background */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-stone-900 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-900 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-up { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        @keyframes marquee-down { 0% { transform: translateY(-50%); } 100% { transform: translateY(0); } }
        .animate-marquee-up { animation: marquee-up 55s linear infinite; }
        .animate-marquee-down { animation: marquee-down 55s linear infinite; }
        .group:hover .animate-marquee-up, .group:hover .animate-marquee-down { animation-play-state: paused; }
      `}</style>
    </section>
  );
};

const Projects = () => {
  const [index, setIndex] = useState(0);

  const projects = [
    {
      title: "Crystal Heights Tower",
      desc: "Luxury residential complex built for longevity.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    },
    {
      title: "Green Valley Villas",
      desc: "Premium exposed brick sustainable villas.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    },
    {
      title: "Tech Park One",
      desc: "Commercial hub with thermal efficiency.",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % projects.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-16">
          Featured Projects
        </h2>

        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="sync">
            <motion.img
              key={projects[index].image}
              src={projects[index].image}
              alt=""
              initial={{ y: 500 }}
              animate={{ y: 0 }}
              exit={{ y: -500 }}
              transition={{
                duration: 2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* TEXT CARD (STAYS FIXED) */}
          <div className="absolute right-10 bottom-10 bg-white p-8 rounded-2xl shadow-xl max-w-md border border-stone-200 text-left z-10">
            <h3 className="text-2xl font-serif text-stone-900 mb-3">
              {projects[index].title}
            </h3>
            <p className="text-stone-600 text-sm font-sans">
              {projects[index].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CtaSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`py-16 md:py-20 relative z-10 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-stone-900 mb-6">
          Ready to Build Your Legacy?
        </h2>
        <p className="text-base md:text-lg text-stone-600 font-sans font-light mb-8 leading-relaxed mx-auto">
          Whether you're an architect designing a modern masterpiece or a
          builder seeking reliable materials, our experts are here to help you
          select the perfect bricks for your vision.
        </p>
        <Link
          to="/inquiry"
          className="inline-flex items-center px-6 py-3 bg-red-700 text-white font-bold font-sans text-xs uppercase tracking-wide rounded-xl hover:bg-red-800 transition-all duration-300  hover:-translate-y-1"
        >
          Inquire Now <ArrowRight className="w-4 h-4 ml-3" />
        </Link>
      </div>
    </section>
  );
};

// --- MAIN PAGE ---

export default function Home() {
  return (
    <div className="antialiased bg-stone-50 selection:bg-orange-200 selection:text-orange-900 relative">
      <Helmet>
        <title>VR & Sons | Premium Bricks Since 1986</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <style>{`
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Jost', sans-serif; }
      `}</style>

      <Header />

      <Hero />

      <div className="relative w-full">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <BrickWall opacity={0.1} color="#8B4513" />
          <div className="absolute inset-0 bg-stone-50/70"></div>
        </div>
        <div className="relative z-10 flex flex-col">
          <FloatingStatsBar />
          <AboutShort />
          <ProductOverview />
        </div>
      </div>

      <div className="relative w-full bg-white">
        <BrickImpressions />
      </div>

      <div className="relative w-full">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <BrickWall opacity={0.1} color="#8B4513" />
          <div className="absolute inset-0 bg-stone-50/70"></div>
        </div>
        <div className="relative z-10 flex flex-col">
          <Projects />
          <CtaSection />
        </div>
      </div>

      <Footer />
    </div>
  );
}
