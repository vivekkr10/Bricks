import React, { useState, useEffect, useRef } from "react";
import Header from "../../Components/header.jsx";
import Footer from "../../Components/footer.jsx";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroTextIndex, setHeroTextIndex] = useState(0);
  const [isHoveringCard, setIsHoveringCard] = useState(null);
  const heroRef = useRef(null);
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      return () =>
        heroElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

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
        damping: 12,
      },
    },
  };

  const heroVariants = {
    initial: { scale: 1.1, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
  };

  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="mt-16 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <BrickWall opacity={0.07} color="#8B4513" />

        {/* Main Hero Section */}
        <div ref={heroRef} className="relative h-[80vh] overflow-hidden">
          {/* Parallax Background */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80)",
              // x: mousePosition.x,
              // y: mousePosition.y,
            }}
            animate={heroVariants}
            initial="initial"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          </motion.div>

          {/* Animated Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Hero Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-5xl mx-auto">
              <motion.h1
                className="text-7xl md:text-8xl font-bold mb-6 tracking-tight"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-clip-text font-serif text-transparent bg-gradient-to-r from-white via-orange-200 to-white">
                  Our Projects
                </span>
              </motion.h1>

              <AnimatePresence mode="wait">
                <motion.p
                  key={heroTextIndex}
                  className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto mb-8 font-light"
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {heroTexts[heroTextIndex]}
                </motion.p>
              </AnimatePresence>

              {/* Animated Stats */}
              <motion.div
                className="flex justify-center gap-12 mt-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {[
                  { label: "Projects", value: "312+" },
                  { label: "Cities", value: "50+" },
                  { label: "Happy Clients", value: "300+" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-4xl font-bold text-red-500">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/70 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                  <motion.div
                    className="w-1 h-2 bg-white rounded-full mt-2"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <motion.div
          className="sticky top-16 z-40 bg-red/800 backdrop-blur-xl border-b border-slate-200 shadow-lg"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <BrickWall opacity={0.02} color="#8B4513" />
          <div className="container mx-auto px-6 lg:px-8 py-6">
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <motion.button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`
                      relative px-8 py-3 rounded-full text-sm font-medium
                      transition-all duration-300 cursor-pointer overflow-hidden
                      ${isActive ? "text-red-700" : "text-stone-700 hover:text-red-600"}
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Background with gradient */}
                    <motion.div
                      className={`absolute inset-0 rounded-full ${
                        isActive
                          ? "bg-gradient-to-r from-red-400 to-red-500"
                          : "bg-gradient-to-r from-slate-100 to-slate-200"
                      }`}
                      animate={isActive ? { scale: 1 } : { scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Glow effect */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-orange-400 blur-md"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    <span className="relative z-10">{filter}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Projects Grid with Padding */}
        <div className="container mx-auto px-15 py-16 relative">
          {/* Card Section Background */}
          <BrickWall opacity={0.04} color="#8B4513" />
          {/* <AnimatePresence mode="wait"> */}
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300 },
                }}
                onHoverStart={() => setIsHoveringCard(project.id)}
                onHoverEnd={() => setIsHoveringCard(null)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() =>
                  navigate(`/projects/${project.id}`, { state: project })
                }
              >
                {/* Image Container with 3D Effect */}
                <div className="relative h-80 overflow-hidden">
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
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isHoveringCard === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Category Badge with Animation */}
                  <motion.div
                    className="absolute top-4 left-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.span
                      className="px-4 py-2 bg-white/95 backdrop-blur-sm text-stone-800 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      {project.category}
                    </motion.span>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-4 right-4 flex gap-2"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.1 }}
                  >
                    {project.details.year && (
                      <span className="px-3 py-1 bg-white text-stone-900 rounded-full text-xs font-semibold shadow-lg">
                        {project.details.year}
                      </span>
                    )}
                  </motion.div>

                  {/* Hover Content with Slide-up Animation */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6"
                    initial={{ y: 100 }}
                    animate={{ y: isHoveringCard === project.id ? 0 : 100 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    <div className="text-white space-y-3">
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: isHoveringCard === project.id ? 1 : 0,
                        }}
                        transition={{ delay: 0.1 }}
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-sm">{project.location}</span>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: isHoveringCard === project.id ? 1 : 0,
                        }}
                        transition={{ delay: 0.2 }}
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="text-sm">
                          {project.architect.split(" ").slice(0, 2).join(" ")}
                        </span>
                      </motion.div>

                      {/* Quick View Button */}
                      <motion.button
                        className="mt-4 px-4 cursor-pointer py-2 bg-white text-slate-900 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: isHoveringCard === project.id ? 1 : 0,
                          scale: isHoveringCard === project.id ? 1 : 0.8,
                        }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/projects/${project.id}`, {
                            state: project,
                          });
                        }}
                      >
                        Quick View
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.h3
                    className="text-2xl font-bold text-slate-900 mb-2 flex items-center justify-between"
                    animate={{
                      color:
                        isHoveringCard === project.id ? "#f97316" : "#0f172a",
                    }}
                  >
                    {project.title}
                  </motion.h3>

                  <p className="text-stone-400 text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-stone-500 text-sm">
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
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <span>{project.details.area}</span>
                    </div>

                    <motion.div
                      className="flex items-center gap-1"
                      animate={{ x: isHoveringCard === project.id ? 5 : 0 }}
                    >
                      <span className="text-red-700 font-semibold text-sm">
                        Details
                      </span>
                      <motion.svg
                        className="w-4 h-4 text-red-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: isHoveringCard === project.id ? 3 : 0 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* </AnimatePresence> */}
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          .animate-pulse-slow {
            animation: pulse 2s ease-in-out infinite;
          }
        `}</style>
      </div>
      <Footer />
    </div>
  );
}
