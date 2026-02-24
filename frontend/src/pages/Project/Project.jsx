import React, { useState, useEffect, useRef } from "react";
import Header from "../../Components/header.jsx";
import Footer from "../../Components/footer.jsx";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [heroTextIndex, setHeroTextIndex] = useState(0);
  const [isHoveringCard, setIsHoveringCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(8);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
    setCurrentPage(1);
  }, [activeFilter]);

  const heroVariants = {
    initial: { scale: 1.1 },
    animate: { scale: 1, transition: { duration: 8 } },
  };

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

  /* ---------------- PROJECT DATA ---------------- */

  const projects = [
    /* KEEP YOUR PROJECT ARRAY EXACTLY AS YOU PROVIDED */
  ];

  /* ---------------- FILTER + PAGINATION ---------------- */

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;

  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    document
      .getElementById("projects-grid")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const goPrev = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };

  const goNext = () => {
    if (currentPage < totalPages) paginate(currentPage + 1);
  };

  /* ---------------- ANIMATION ---------------- */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const floatingShapes = [
    { icon: "◈", delay: 0, x: 10, y: 20 },
    { icon: "⬟", delay: 1, x: 70, y: 30 },
    { icon: "◉", delay: 2, x: 85, y: 60 },
    { icon: "⬡", delay: 1.5, x: 20, y: 80 },
  ];

  return (
    <>
      <Header />

      <div className="mt-16 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* ---------------- HERO ---------------- */}

        <div ref={heroRef} className="relative h-[80vh] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80)",
            }}
            variants={heroVariants}
            initial="initial"
            animate="animate"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </motion.div>

          {floatingShapes.map((shape, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10 text-6xl font-serif"
              style={{ left: `${shape.x}%`, top: `${shape.y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ delay: shape.delay }}
            >
              {shape.icon}
            </motion.div>
          ))}

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-6xl md:text-8xl font-bold mb-6"
            >
              Architecture <br /> That Inspires
            </motion.h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={heroTextIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-xl text-white/80"
              >
                {heroTexts[heroTextIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* ---------------- FILTER ---------------- */}

        <div className="sticky top-16 bg-white shadow-md z-40">
          <div className="flex justify-center gap-4 py-4 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  activeFilter === filter
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 hover:bg-red-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* ---------------- GRID ---------------- */}

        <div id="projects-grid" className="container mx-auto px-6 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {currentProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onHoverStart={() => setIsHoveringCard(project.id)}
                onHoverEnd={() => setIsHoveringCard(null)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() =>
                  navigate(`/projects/${project.id}`, { state: project })
                }
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: isHoveringCard === project.id ? 1.1 : 1,
                    }}
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {project.description}
                  </p>

                  <button
                    className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/projects/${project.id}`, { state: project });
                    }}
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ---------------- PAGINATION ---------------- */}

          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-12">
              <button onClick={goPrev} disabled={currentPage === 1}>
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={currentPage === i + 1 ? "font-bold" : ""}
                >
                  {i + 1}
                </button>
              ))}

              <button onClick={goNext} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
