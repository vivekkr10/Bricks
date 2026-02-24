import { useLocation, useNavigate } from "react-router-dom";
// import Header from "../../Components/header.jsx";
import { useState, useEffect, useRef } from "react";
// import Footer from "../../Components/footer.jsx";
import { motion, AnimatePresence } from "framer-motion";

// hooks fires when element view
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// animated counter
function AnimatedNumber({ target, duration = 1200 }) {
  const [val, setVal] = useState(0);
  const num = parseInt(target) || 0;
  useEffect(() => {
    if (!num) return;
    let current = 0;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      current += step;
      if (current >= num) {
        setVal(num);
        clearInterval(timer);
      } else setVal(current);
    }, 16);
    return () => clearInterval(timer);
  }, [num, duration]);
  return <span>{num ? val : target}</span>;
}

// BrickWall pattern background (matching ProductsPage)
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

// main section or content
export default function ProjectDetails() {
  const { state: project } = useLocation();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [aboutRef, aboutVisible] = useInView();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!project) return null;

  const heroEase = [0.22, 1, 0.36, 1];

  return (
    <>
      <div
        className="min-h-screen bg-stone-50 text-stone-800"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Jost:wght@300;400;500;600;700&display=swap');
          .font-serif { font-family: 'Cormorant Garamond', serif !important; }
          .font-sans { font-family: 'Jost', sans-serif !important; }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
          @keyframes pulseRing {
            0%   { transform: scale(1);   opacity: 0.6; }
            100% { transform: scale(2.4); opacity: 0; }
          }
          @keyframes floatY {
            0%,100% { transform: translateY(0); }
            50%      { transform: translateY(-8px); }
          }
          @keyframes slideIn {
            from { width: 0; }
            to   { width: 100%; }
          }
          @keyframes heroGradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .anim-fade-up { animation: fadeUp 0.72s cubic-bezier(.22,.68,0,1.15) forwards; }
          .anim-float   { animation: floatY 5s ease-in-out infinite; }

          .pulse-dot {
            position: relative;
            display: inline-flex;
            width: 8px; height: 8px;
            border-radius: 50%;
            background: #ef4444;
            flex-shrink: 0;
          }
          .pulse-dot::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: #ef4444;
            animation: pulseRing 2s ease-out infinite;
          }

          .red-btn {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: #fff;
            transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
            box-shadow: 0 4px 18px rgba(239,68,68,0.3);
          }
          .red-btn:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 28px rgba(239,68,68,0.38);
            filter: brightness(1.06);
          }

          .back-btn {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .back-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.12);
          }

          .tab-indicator {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 2.5px;
            background: linear-gradient(90deg, #ef4444, #dc2626);
            border-radius: 2px;
            animation: slideIn 0.28s ease forwards;
          }

          .spec-card {
            background: #fff;
            border: 1px solid rgba(0,0,0,0.06);
            transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          }
          .spec-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 36px rgba(239,68,68,0.13);
            border-color: rgba(239,68,68,0.25);
          }

          .detail-row {
            transition: background 0.2s;
          }
          .detail-row:hover {
            background: rgba(239,68,68,0.04);
            border-radius: 10px;
          }

          .progress-fill {
            background: linear-gradient(90deg, #ef4444, #f87171);
            border-radius: 999px;
            transition: width 1.5s cubic-bezier(.22,.68,0,1.15);
          }

          .hero-gradient-shimmer {
            background-image: linear-gradient(90deg, #f87171, #ef4444, #b91c1c, #ef4444, #f87171);
            background-size: 220% 220%;
            animation: heroGradientShift 8s ease-in-out infinite;
          }
        `}</style>

        <BrickWall opacity={0.05} color="#8B4513" />

        {/* Hero section */}
        <section className="relative h-[90vh] overflow-hidden">
          {/* Parallax image */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.15) 70%, transparent 100%)",
              y: scrollY * 0.3,
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-full object-cover transition-opacity duration-700 contrast-[1.08] saturate-[1.05] ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImgLoaded(true)}
            />
          </motion.div>

          {/* Warm tint overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(239,68,68,0.03)" }}
          />

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(-1)}
            className="cursor-pointer back-btn absolute top-24 left-6 z-20 flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide"
            style={{
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(14px)",
              color: "#3d3530",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}
          >
            <svg
              className="w-4 h-4"
              style={{ color: "#ef4444" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Projects
          </motion.button>

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-14 pb-14 z-10">
            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-6 text-xs font-semibold tracking-[0.18em] uppercase"
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#dc2626",
                boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
              }}
            >
              <span className="pulse-dot" />
              {project.category}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-serif"
              style={{
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                fontWeight: 700,
                lineHeight: 0.95,
                color: "#ffffff",
                marginBottom: "1.1rem",
                maxWidth: "750px",
                textShadow: "0 4px 30px rgba(0,0,0,0.45)",
              }}
            >
              {project.title}
            </motion.h1>

            {/* Location with professional icon */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-2 text-base tracking-wider"
              style={{
                color: "rgba(255,255,255,0.9)",
                marginBottom: "1.8rem",
                textShadow: "0 2px 14px rgba(0,0,0,0.4)",
              }}
            >
              <svg
                className="w-5 h-5"
                style={{ color: "#ef4444" }}
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
              {project.location}
            </motion.p>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { label: "Area", val: project.details?.area, icon: "square" },
                { label: "Year", val: project.details?.year, icon: "calendar" },
                {
                  label: "Client",
                  val: project.details?.client,
                  icon: "building",
                },
              ]
                .filter((s) => s.val)
                .map((s, index) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-sm"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                      color: "#0e0b0a",
                    }}
                  >
                    {s.icon === "square" && (
                      <svg
                        className="w-4 h-4"
                        style={{ color: "#ef4444" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
                        />
                      </svg>
                    )}
                    {s.icon === "calendar" && (
                      <svg
                        className="w-4 h-4"
                        style={{ color: "#ef4444" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {s.icon === "building" && (
                      <svg
                        className="w-4 h-4"
                        style={{ color: "#ef4444" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    )}
                    <span style={{ color: "#ef4444", fontWeight: 600 }}>
                      {s.val}
                    </span>
                    <span style={{ color: "#d4d4d4" }}>·</span>
                    <span style={{ color: "#78716c" }}>{s.label}</span>
                  </motion.div>
                ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <div className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                className="w-1.5 h-3 bg-red-500 rounded-full mt-2"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-20 relative">
          <BrickWall opacity={0.03} color="#8B4513" />

          <div className="grid md:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Column - About */}
            <div ref={aboutRef} className="md:col-span-3 space-y-12">
              {/* VR & SONS Header */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={aboutVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-red-500 to-transparent" />
                  <span className="text-xs tracking-[0.3em] uppercase font-semibold text-red-600">
                    VR & SONS
                  </span>
                </div>
                <p className="text-sm text-stone-500 mb-8">SINCE 1986</p>
              </motion.div>

              {/* Pull Quote */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={aboutVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="py-4 pl-8 border-l-4 border-red-500 bg-gradient-to-r from-red-50/50 to-transparent rounded-r-2xl"
              >
                <p className="font-serif text-2xl italic text-stone-700">
                  "Architecture is the thoughtful making of space — every line,
                  a decision."
                </p>
              </motion.div>

              {/* Project Scores */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={aboutVisible ? { opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-6"
              >
                <span className="text-xs tracking-[0.3em] uppercase font-semibold text-stone-400">
                  PROJECT SCORES
                </span>

                {[
                  { label: "Design Innovation", pct: 92 },
                  { label: "Sustainability", pct: 78 },
                  { label: "Client Satisfaction", pct: 97 },
                  { label: "Build Quality", pct: 88 },
                ].map((p, i) => (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={aboutVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-stone-600">{p.label}</span>
                      <span className="font-semibold text-red-600">
                        {p.pct}%
                      </span>
                    </div>
                    <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={aboutVisible ? { width: `${p.pct}%` } : {}}
                        transition={{
                          delay: 0.4 + i * 0.1,
                          duration: 1.2,
                          ease: "easeOut",
                        }}
                        className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Project Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={aboutVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-stone-100"
              >
                <div className="space-y-6">
                  {/* Category */}
                  <div className="flex items-start gap-4">
                    <span className="text-red-600 w-6 h-6 flex-shrink-0">
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
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </span>
                    <div className="flex-1">
                      <p className="text-xs tracking-wider uppercase text-stone-400 mb-1">
                        CATEGORY
                      </p>
                      <p className="font-medium text-stone-800">
                        {project.category}
                      </p>
                    </div>
                  </div>

                  {/* Architect */}
                  <div className="flex items-start gap-4">
                    <span className="text-red-600 w-6 h-6 flex-shrink-0">
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <div className="flex-1">
                      <p className="text-xs tracking-wider uppercase text-stone-400 mb-1">
                        ARCHITECT
                      </p>
                      <p className="font-medium text-stone-800">
                        {project.architect}
                      </p>
                    </div>
                  </div>

                  {/* Client */}
                  <div className="flex items-start gap-4">
                    <span className="text-red-600 w-6 h-6 flex-shrink-0">
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
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </span>
                    <div className="flex-1">
                      <p className="text-xs tracking-wider uppercase text-stone-400 mb-1">
                        CLIENT
                      </p>
                      <p className="font-medium text-stone-800">
                        {project.details?.client}
                      </p>
                    </div>
                  </div>

                  {/* Area */}
                  <div className="flex items-start gap-4">
                    <span className="text-red-600 w-6 h-6 flex-shrink-0">
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
                          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
                        />
                      </svg>
                    </span>
                    <div className="flex-1">
                      <p className="text-xs tracking-wider uppercase text-stone-400 mb-1">
                        AREA
                      </p>
                      <p className="font-medium text-stone-800">
                        {project.details?.area}
                      </p>
                    </div>
                  </div>

                  {/* Year */}
                  <div className="flex items-start gap-4">
                    <span className="text-red-600 w-6 h-6 flex-shrink-0">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <div className="flex-1">
                      <p className="text-xs tracking-wider uppercase text-stone-400 mb-1">
                        YEAR
                      </p>
                      <p className="font-medium text-stone-800">
                        {project.details?.year}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Architect Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={aboutVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-8 text-white shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-7 h-7"
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
                  </div>
                  <div>
                    <p className="text-xs tracking-wider uppercase text-white/70 mb-1">
                      LEAD ARCHITECT
                    </p>
                    <p className="font-serif text-xl font-semibold mb-2">
                      {project.architect || "Studio Architect"}
                    </p>
                    <p className="text-white/80 text-sm flex items-center gap-2">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Principal Architect • 20+ years experience</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
