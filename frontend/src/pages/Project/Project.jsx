import React, { useState, useEffect, useRef } from "react";
// import Header from "../../Components/header.jsx";
// import Footer from "../../Components/footer.jsx";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [heroTextIndex, setHeroTextIndex] = useState(0);
  const [isHoveringCard, setIsHoveringCard] = useState(null);
  const [hoveredFilter, setHoveredFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const filters = ["All", "Industrial", "Commercial", "Residential"];

  const heroTexts = [
    "Showcasing excellence in architecture and design",
    "Building dreams with precision and passion",
    "Creating spaces that inspire generations",
    "Where innovation meets architectural brilliance",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  // BrickWall pattern
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

  const projects = [
    {
      id: 1,
      title: "Tech Park",
      category: "Commercial",
      location: "Bhubaneswar",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      description: "IT park with modern infrastructure.",
      details: {
        area: "160,000 sq ft",
        year: "2023",
        client: "Tech Parks Ltd",
      },
    },
    {
      id: 2,
      title: "Steel Manufacturing Plant",
      category: "Industrial",
      location: "Jamshedpur",
      architect: "Industrial Design Consortium",
      image:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80",
      description:
        "State-of-the-art steel manufacturing facility with automated production lines.",
      details: {
        area: "450,000 sq ft",
        year: "2022",
        client: "Tata Steel",
      },
    },
    {
      id: 3,
      title: "Riverside Apartments",
      category: "Residential",
      location: "Pune",
      architect: "Urban Space Architects",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      description: "Luxury residential complex with 200 units and river views.",
      details: {
        area: "320,000 sq ft",
        year: "2023",
        client: "Prestige Group",
      },
    },
    {
      id: 4,
      title: "Food Processing Unit",
      category: "Industrial",
      location: "Ludhiana",
      architect: "Agro Industrial Designs",
      image:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80",
      description:
        "Modern food processing facility with cold storage and packaging units.",
      details: {
        area: "85,000 sq ft",
        year: "2022",
        client: "Nestle India",
      },
    },
    {
      id: 5,
      title: "Green Valley Villas",
      category: "Residential",
      location: "Bangalore",
      architect: "Eco Design Studios",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      description:
        "Eco-friendly villas with solar panels and rainwater harvesting.",
      details: {
        area: "50,000 sq ft",
        year: "2023",
        client: "Sobha Developers",
      },
    },
    {
      id: 6,
      title: "City Mall",
      category: "Commercial",
      location: "Mumbai",
      architect: "Retail Architecture Group",
      image:
        "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&q=80",
      description: "Six-story shopping mall with multiplex and food court.",
      details: {
        area: "500,000 sq ft",
        year: "2021",
        client: "Phoenix Mills",
      },
    },
    {
      id: 7,
      title: "Automobile Assembly Plant",
      category: "Industrial",
      location: "Chennai",
      architect: "Industrial Innovations",
      image:
        "https://images.unsplash.com/photo-1581092335871-4c7fd9f8f1b5?w=800&q=80",
      description: "Advanced automobile assembly line with robotic automation.",
      details: {
        area: "750,000 sq ft",
        year: "2022",
        client: "Hyundai Motors",
      },
    },
    {
      id: 8,
      title: "Sunset Heights",
      category: "Residential",
      location: "Goa",
      architect: "Coastal Living Designs",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      description: "Beachfront apartments with panoramic ocean views.",
      details: {
        area: "120,000 sq ft",
        year: "2023",
        client: "Goa Developers",
      },
    },
    {
      id: 9,
      title: "Business Hub",
      category: "Commercial",
      location: "Gurugram",
      architect: "Corporate Architecture Ltd",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      description: "Grade A office space with smart building features.",
      details: {
        area: "280,000 sq ft",
        year: "2022",
        client: "DLF Limited",
      },
    },
    {
      id: 10,
      title: "Pharmaceutical Complex",
      category: "Industrial",
      location: "Hyderabad",
      architect: "Pharma Design Solutions",
      image:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80",
      description: "WHO-GMP certified pharmaceutical manufacturing unit.",
      details: {
        area: "200,000 sq ft",
        year: "2021",
        client: "Dr. Reddy's Laboratories",
      },
    },
    {
      id: 11,
      title: "Garden Residency",
      category: "Residential",
      location: "Ahmedabad",
      architect: "Green Space Architects",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      description: "Gated community with landscaped gardens and clubhouse.",
      details: {
        area: "180,000 sq ft",
        year: "2023",
        client: "Godrej Properties",
      },
    },
    {
      id: 12,
      title: "Textile Park",
      category: "Industrial",
      location: "Surat",
      architect: "Textile Industry Designers",
      image:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80",
      description: "Integrated textile manufacturing and processing facility.",
      details: {
        area: "300,000 sq ft",
        year: "2022",
        client: "Arvind Mills",
      },
    },
    {
      id: 13,
      title: "Financial Tower",
      category: "Commercial",
      location: "Mumbai",
      architect: "Modern Architecture Group",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      description: "25-story commercial tower in the financial district.",
      details: {
        area: "450,000 sq ft",
        year: "2021",
        client: "HDFC Bank",
      },
    },
    {
      id: 14,
      title: "Royal Orchards",
      category: "Residential",
      location: "Lucknow",
      architect: "Heritage Modern Designs",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      description: "Luxury villas inspired by Awadhi architecture.",
      details: {
        area: "95,000 sq ft",
        year: "2023",
        client: "Lucknow Developers",
      },
    },
    {
      id: 15,
      title: "Warehouse Complex",
      category: "Industrial",
      location: "Nagpur",
      architect: "Logistics Design Solutions",
      image:
        "https://images.unsplash.com/photo-1586528116311-2630a57b52b9?w=800&q=80",
      description:
        "Modern warehouse with automated storage and retrieval system.",
      details: {
        area: "500,000 sq ft",
        year: "2022",
        client: "Delhivery Logistics",
      },
    },
    {
      id: 16,
      title: "Lakeview Towers",
      category: "Residential",
      location: "Bhopal",
      architect: "Urban Living Designs",
      image:
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80",
      description: "High-rise apartments overlooking the upper lake.",
      details: {
        area: "220,000 sq ft",
        year: "2023",
        client: "Bhopal Builders",
      },
    },
    {
      id: 17,
      title: "Convention Center",
      category: "Commercial",
      location: "Kochi",
      architect: "Event Space Architects",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      description:
        "Modern convention center with multiple halls and auditoriums.",
      details: {
        area: "150,000 sq ft",
        year: "2022",
        client: "Kochi Municipality",
      },
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    document
      .getElementById("projects-grid")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const heroEase = [0.22, 1, 0.36, 1];

  // Floating shapes for hero animation
  const floatingShapes = [
    { icon: "◈", delay: 0, duration: 6, x: 10, y: 20 },
    { icon: "⬟", delay: 1, duration: 7, x: 70, y: 30 },
    { icon: "◉", delay: 2, duration: 8, x: 85, y: 60 },
    { icon: "◈", delay: 0.5, duration: 5.5, x: 40, y: 70 },
    { icon: "⬡", delay: 1.5, duration: 6.5, x: 20, y: 80 },
    { icon: "◉", delay: 2.5, duration: 7.5, x: 90, y: 40 },
  ];

  return (
    <>
      <div
        className="min-h-screen bg-stone-50 text-stone-800"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Jost:wght@300;400;500;600;700&display=swap');
          .font-serif { font-family: 'Cormorant Garamond', serif; }
          .font-sans { font-family: 'Jost', sans-serif; }
          
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
            25% { transform: translateY(-15px) translateX(10px) rotate(5deg); }
            50% { transform: translateY(-25px) translateX(-5px) rotate(0deg); }
            75% { transform: translateY(-10px) translateX(-15px) rotate(-5deg); }
          }
          
          @keyframes glowPulse {
            0%, 100% { opacity: 0.3; filter: blur(20px); }
            50% { opacity: 0.6; filter: blur(30px); }
          }
          
          @keyframes textShimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes borderRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes filterSlide {
            0% { transform: translateX(-10px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          @keyframes ripple {
            0% { transform: scale(1); opacity: 0.4; }
            100% { transform: scale(2); opacity: 0; }
          }
          
          .floating-shape {
            animation: float var(--duration) ease-in-out infinite;
            animation-delay: var(--delay);
          }
          
          .glow-background {
            background: radial-gradient(circle at 30% 50%, rgba(239,68,68,0.15) 0%, transparent 50%);
            animation: glowPulse 4s ease-in-out infinite;
          }
          
          .hero-text-shimmer {
            background: linear-gradient(90deg, #fef2f2, #fee2e2, #fecaca, #fee2e2, #fef2f2);
            background-size: 200% 200%;
            animation: textShimmer 6s ease-in-out infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .rotating-border {
            position: relative;
            overflow: hidden;
          }
          
          .rotating-border::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(from 0deg, transparent, #ef4444, transparent 70%);
            animation: borderRotate 8s linear infinite;
            opacity: 0.3;
          }
          
          .filter-chip {
            position: relative;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .filter-chip:hover {
            transform: translateY(-2px);
          }
          
          .filter-chip::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            transition: transform 0.4s ease-out, opacity 0.3s ease;
            pointer-events: none;
            border-radius: inherit;
          }
          
          .filter-chip:active::after {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0.3;
            transition: transform 0.2s ease-out, opacity 0.1s ease;
          }
          
          .filter-chip.active {
            box-shadow: 0 10px 25px -5px rgba(239,68,68,0.4);
          }
          
          .ripple-effect {
            position: relative;
            overflow: hidden;
          }
          
          .ripple-effect::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 5px;
            background: rgba(255,255,255,0.5);
            opacity: 0;
            border-radius: 100%;
            transform: scale(1, 1) translate(-50%, -50%);
            transform-origin: 50% 50%;
          }
          
          .ripple-effect:focus:not(:active)::after {
            animation: ripple 0.6s ease-out;
          }
          
          .filter-container {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            background: linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.98));
            border-bottom: 1px solid rgba(239,68,68,0.1);
          }

          /* Remove cursor from stats */
          .stats-container {
            cursor: default;
          }
          
          .stats-container div {
            cursor: default;
          }
          
          /* Ensure buttons have proper cursor */
          button:not(:disabled) {
            cursor: pointer;
          }
          
          button:disabled {
            cursor: not-allowed;
          }
          
          .filter-chip, .pagination-item, .group, .group\\/btn {
            cursor: pointer;
          }
        `}</style>

        {/* Unique Centered Hero Section */}
        <section
          className="relative min-h-[90vh] overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

          {/* Animated glow background */}
          <div className="absolute inset-0 glow-background" />

          <BrickWall opacity={0.15} color="#8B4513" />

          {/* Floating decorative shapes */}
          {floatingShapes.map((shape, index) => (
            <motion.div
              key={index}
              className="absolute text-white/10 text-6xl md:text-7xl font-serif floating-shape"
              style={{
                left: `${shape.x}%`,
                top: `${shape.y}%`,
                "--duration": `${shape.duration}s`,
                "--delay": `${shape.delay}s`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ delay: shape.delay, duration: 1 }}
            >
              {shape.icon}
            </motion.div>
          ))}

          {/* Main Hero Content - Centered */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: heroEase }}
              className="inline-block mb-8"
            >
              <div className="rotating-border rounded-full p-[2px]">
                <div className="bg-black/40 backdrop-blur-xl rounded-full px-8 py-3">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-xs font-bold tracking-[0.2em] text-white/90 uppercase">
                      EST. 1984 • FOUR DECADES OF EXCELLENCE
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Title with gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: heroEase }}
              className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-[1.1]"
            >
              <span className="block">Architecture</span>
              <span className="hero-text-shimmer block">That Inspires</span>
            </motion.h1>

            {/* Rotating tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-10"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={heroTextIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light tracking-wide"
                >
                  {heroTexts[heroTextIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* CTA Buttons - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("projects-grid")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold hover:from-red-700 hover:to-red-800 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-red-600/30 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Portfolio
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
              >
                Let's Talk
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </motion.div>

            {/* Stats Row - Centered with default cursor */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="stats-container flex justify-center gap-12 mt-16"
            >
              {[
                { value: "300+", label: "Projects Delivered" },
                { value: "50+", label: "Cities" },
                { value: "25", label: "Awards Won" },
                { value: "40+", label: "Years Legacy" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-white/60 tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center">
                <motion.div
                  className="w-1.5 h-3 bg-red-500 rounded-full mt-2"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Redesigned Modern Filter Section */}
        <section className="sticky top-16 z-40 filter-container shadow-xl">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-red-100 rounded-xl text-red-700 font-medium hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                <span>Filter Projects</span>
              </button>

              {/* Mobile Results */}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-red-600">
                  {filteredProjects.length}
                </span>
                <span className="text-sm text-stone-600">projects</span>
              </div>
            </div>

            {/* Desktop Filter Bar */}
            <div className="hidden lg:flex items-center justify-between">
              {/* Left Section - Filter Label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-200">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-medium text-stone-500">
                    Browse by
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-800">
                    Project Category
                  </h3>
                </div>
              </motion.div>

              {/* Center - Filter Chips */}
              <div className="flex items-center gap-2 bg-stone-100/80 p-1.5 rounded-2xl backdrop-blur-sm">
                {filters.map((filter, index) => {
                  const isActive = activeFilter === filter;
                  const count =
                    filter === "All"
                      ? projects.length
                      : projects.filter((p) => p.category === filter).length;

                  return (
                    <motion.button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      onHoverStart={() => setHoveredFilter(filter)}
                      onHoverEnd={() => setHoveredFilter(null)}
                      className="relative outline-none"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.div
                        className={`filter-chip relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-200 active"
                            : "bg-white text-stone-700 hover:bg-red-50 hover:text-red-600"
                        }`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Icon for active filter */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md"
                          >
                            <svg
                              className="w-3 h-3 text-red-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </motion.div>
                        )}

                        <div className="flex items-center gap-2">
                          <span>{filter}</span>
                          <motion.span
                            className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                              isActive
                                ? "bg-white/30 text-white"
                                : "bg-stone-200 text-stone-600 group-hover:bg-red-100"
                            }`}
                            animate={{
                              scale: hoveredFilter === filter ? 1.1 : 1,
                              backgroundColor:
                                hoveredFilter === filter && !isActive
                                  ? "#fee2e2"
                                  : "",
                            }}
                          >
                            {count}
                          </motion.span>
                        </div>

                        {/* Ripple effect on click */}
                        <span className="ripple-effect" />
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Right Section - Results Only */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {/* Results Counter */}
                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-red-50 to-red-100 rounded-xl">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-red-600">
                      {filteredProjects.length}
                    </span>
                    <span className="text-sm text-red-700/70">projects</span>
                  </div>
                  <div className="w-px h-6 bg-red-200" />
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm text-red-700">
                      {totalPages} pages
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile Filter Menu */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden mt-4 overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-2 p-2 bg-stone-100 rounded-2xl">
                    {filters.map((filter) => {
                      const isActive = activeFilter === filter;
                      const count =
                        filter === "All"
                          ? projects.length
                          : projects.filter((p) => p.category === filter)
                              .length;

                      return (
                        <motion.button
                          key={filter}
                          onClick={() => {
                            setActiveFilter(filter);
                            setIsFilterOpen(false);
                          }}
                          className={`relative p-4 rounded-xl text-center transition-all ${
                            isActive
                              ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                              : "bg-white text-stone-700 hover:bg-red-50 hover:scale-105 active:scale-95"
                          }`}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="font-medium">{filter}</div>
                          <div
                            className={`text-sm mt-1 ${isActive ? "text-white/80" : "text-stone-500"}`}
                          >
                            {count} projects
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section id="projects-grid" className="py-16 relative">
          <BrickWall opacity={0.05} color="#8B4513" />

          <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 relative z-10">
            {/* Section Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-4">
                {activeFilter === "All"
                  ? "All Projects"
                  : `${activeFilter} Projects`}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full mb-6" />
              <p className="text-stone-600 max-w-2xl mx-auto">
                Discover our finest work across{" "}
                {activeFilter === "All"
                  ? "all sectors"
                  : `the ${activeFilter.toLowerCase()} sector`}
              </p>
            </motion.div>

            {/* Projects Grid */}
            <AnimatePresence mode="wait">
              {paginatedProjects.length > 0 ? (
                <motion.div
                  key={activeFilter + currentPage}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {paginatedProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                      onHoverStart={() => setIsHoveringCard(project.id)}
                      onHoverEnd={() => setIsHoveringCard(null)}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                      onClick={() =>
                        navigate(`/projects/${project.id}`, { state: project })
                      }
                    >
                      {/* Image Container */}
                      <div className="relative h-64 overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          animate={{
                            scale: isHoveringCard === project.id ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.6 }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-stone-800 rounded-full text-sm font-semibold shadow-lg">
                            {project.category}
                          </span>
                        </div>

                        {/* Year Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold shadow-lg">
                            {project.details.year}
                          </span>
                        </div>

                        {/* Location Badge */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="text-sm font-medium">
                            {project.location}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-serif text-xl font-bold text-stone-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
                          {project.title}
                        </h3>

                        <p className="text-stone-600 text-sm line-clamp-2 mb-4">
                          {project.description}
                        </p>

                        {/* Architect */}
                        <div className="flex items-center gap-2 mb-4 text-sm text-stone-500">
                          <svg
                            className="w-4 h-4 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span className="truncate">{project.architect}</span>
                        </div>

                        {/* Project Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-gradient-to-br from-red-50 to-amber-50 p-3 rounded-xl">
                            <div className="text-xs text-stone-500 mb-1">
                              Area
                            </div>
                            <div className="font-bold text-stone-900 text-sm">
                              {project.details.area}
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-xl">
                            <div className="text-xs text-stone-500 mb-1">
                              Client
                            </div>
                            <div className="font-bold text-stone-900 text-sm truncate">
                              {project.details.client}
                            </div>
                          </div>
                        </div>

                        {/* Button with consistent keyword for all cards */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:from-red-600 hover:to-red-700 hover:scale-105 active:scale-95 transition-all duration-300 group/btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/projects/${project.id}`, {
                              state: project,
                            });
                          }}
                        >
                          <span>View Details</span>
                          <svg
                            className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-20"
                >
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-red-100 rounded-full blur-3xl opacity-20"></div>
                    <svg
                      className="w-32 h-32 mx-auto text-stone-400 relative"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-stone-900 mt-6">
                    No Projects Found
                  </h3>
                  <p className="text-stone-600 mt-2 max-w-md mx-auto">
                    Try adjusting your filters or explore our other categories.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {filteredProjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12 flex flex-col items-center gap-4"
              >
                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`pagination-item px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1 transition-all ${
                      currentPage === 1
                        ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                        : "bg-white text-stone-700 hover:bg-red-50 hover:text-red-600 hover:scale-105 shadow-sm"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span>Prev</span>
                  </motion.button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => {
                        if (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= currentPage - 1 &&
                            pageNum <= currentPage + 1)
                        ) {
                          return (
                            <motion.button
                              key={pageNum}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handlePageChange(pageNum)}
                              className={`pagination-item w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                                currentPage === pageNum
                                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-200"
                                  : "bg-white text-stone-700 hover:bg-red-50 hover:text-red-600 hover:scale-110 shadow-sm"
                              }`}
                            >
                              {pageNum}
                            </motion.button>
                          );
                        } else if (
                          pageNum === currentPage - 2 ||
                          pageNum === currentPage + 2
                        ) {
                          return (
                            <span
                              key={pageNum}
                              className="w-4 text-center text-stone-400"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      },
                    )}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`pagination-item px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1 transition-all ${
                      currentPage === totalPages
                        ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                        : "bg-white text-stone-700 hover:bg-red-50 hover:text-red-600 hover:scale-105 shadow-sm"
                    }`}
                  >
                    <span>Next</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* Quick jump to top */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="mt-4 text-sm text-stone-500 hover:text-red-600 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  <span>Back to top</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
