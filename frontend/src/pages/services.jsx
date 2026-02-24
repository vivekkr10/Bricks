import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Hammer,
  Palette,
  BrickWall,
  Ruler,
  Truck,
  ChevronRight,
  History,
  LayoutGrid,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
// import Header from "../Components/header";
// import Footer from "../Components/footer";

// ─── BRICK WALL SVG BACKGROUND ───────────────────────────────────────────────
const BrickWallBg = ({ opacity = 0.05, color = "#8B4513" }) => (
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
        id={`bwall-services-${color.replace("#", "")}`}
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
      fill={`url(#bwall-services-${color.replace("#", "")})`}
      opacity={opacity}
    />
  </svg>
);

// ─── HERO ────────────────────────────────────────────────────────────────────
const ServiceHero = () => (
  <div className="relative h-[55vh] min-h-[620px] w-full flex items-center justify-center overflow-hidden bg-stone-950">
    <motion.div
      initial={{ scale: 1.15 }}
      animate={{ scale: 1 }}
      transition={{ duration: 10, ease: "easeOut" }}
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&q=80')",
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950/80" />
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="inline-block py-1 px-4 border bg-stone-300 border-red-700 rounded-full text-xs font-bold text-red-700 uppercase tracking-[0.2em] mb-6 backdrop-blur-md font-sans">
          Our Capabilities
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-semibold text-white mb-6 leading-tight drop-shadow-2xl">
          Expertise{" "}
          <span className=" text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-500 ">
            Beyond{" "}
          </span>{" "}
          <br className="hidden sm:block" /> Manufacturing
        </h1>
        <p className="text-base md:text-xl text-stone-300 font-light max-w-2xl mx-auto leading-relaxed font-sans">
          From restoration to custom creation, we engineer solutions that exceed
          material limitations.
        </p>
      </motion.div>
    </div>
  </div>
);

// ─── SERVICE SECTION ─────────────────────────────────────────────────────────
const ServiceSection = ({ id, title, content, image, icon: Icon }) => (
  <div
    id={id}
    className="scroll-mt-24 mt-6 mb-16 md:mb-24 border-b border-stone-200 pb-12 md:pb-16 last:border-0 last:mb-0 last:pb-0"
  >
    <div className="max-w-3xl mb-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 bg-red-50 rounded-lg border border-red-200 shadow-sm flex-shrink-0">
          <Icon className="w-5 h-5 text-red-700" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-stone-900">
          {title}
        </h2>
      </div>
      <div className="text-stone-600 leading-relaxed space-y-4 text-base md:text-lg sm:pl-12 sm:border-l-2 border-red-100 font-sans font-light">
        {content
          .split("\n")
          .filter((p) => p.trim())
          .map((paragraph, index) => (
            <p key={index}>{paragraph.trim()}</p>
          ))}
      </div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group relative h-[200px] sm:h-[260px] md:h-[320px] w-full overflow-hidden rounded-lg shadow-md bg-stone-200"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  </div>
);

// ─── SERVICES LIST ────────────────────────────────────────────────────────────
const services = [
  { id: "matching", label: "Brick Matching" },
  { id: "blending", label: "Blending & Weathering" },
  { id: "custom", label: "Custom Brick Making" },
  { id: "technical", label: "Technical Consultation" },
  { id: "logistics", label: "Logistics & Support" },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Services() {
  const [activeSection, setActiveSection] = useState("matching");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      for (const s of services) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 500) setActiveSection(s.id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNavOpen(false);
  };

  return (
    <div className="antialiased bg-white selection:bg-orange-200 selection:text-red-900 relative">
      <style>{`
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Jost', sans-serif; }
      `}</style>

      {/* <Header /> */}

      <ServiceHero />

      {/* ── MOBILE INDEX BAR ── */}
      <div className="lg:hidden sticky top-[60px] z-30 bg-white border-b border-stone-200 shadow-sm">
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="w-full flex items-center justify-between px-5 py-3 font-sans text-sm font-bold uppercase tracking-widest text-stone-700"
        >
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full" />
            {services.find((s) => s.id === activeSection)?.label || "Index"}
          </span>
          {mobileNavOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="border-t border-stone-100 bg-white"
          >
            {services.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full flex items-center justify-between px-5 py-3 text-sm font-sans text-left border-l-2 transition-all
                  ${
                    activeSection === item.id
                      ? "border-red-600 text-red-700 font-bold bg-red-50"
                      : "border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-50"
                  }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* ── BRICKWALL BACKGROUND WRAPPER ── */}
      <div className="relative w-full">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <BrickWallBg opacity={0.08} color="#8B4513" />
        </div>

        <div className="relative z-10">
          {/* ── MAIN LAYOUT ── */}
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
            {/* ── DESKTOP STICKY SIDEBAR ── */}
            <aside className="hidden lg:flex flex-col gap-16 w-64 xl:w-72 flex-shrink-0 sticky top-0 h-screen border-r border-stone-200 pt-24 pb-8 pr-8">
              <div>
                <div className="flex items-center gap-2 mb-6 opacity-60">
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-stone-900 font-sans">
                    Index
                  </h3>
                </div>
                <nav className="space-y-1 border-l border-stone-200 ml-1">
                  {services.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`group flex items-center justify-between w-full pl-6 py-2.5 text-left text-sm font-sans transition-all border-l-2 -ml-[2px]
                        ${
                          activeSection === item.id
                            ? "border-red-600 text-red-700 font-bold bg-red-50/50"
                            : "border-transparent text-stone-500 hover:text-stone-900 hover:border-stone-300"
                        }`}
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <ChevronRight className="w-4 h-4 text-red-600" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="border-t border-stone-200 pt-8 space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 font-sans">
                  Explore More
                </h4>
                <Link to="/about" className="flex items-center gap-4 group">
                  <div className="p-3 bg-white border border-stone-200 rounded-lg group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all shadow-sm text-stone-600">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-stone-900 group-hover:text-red-700 transition-colors font-sans">
                      Our History
                    </span>
                    <span className="text-xs text-stone-400 block mt-0.5 font-sans">
                      Legacy since 1978
                    </span>
                  </div>
                </Link>
                <Link to="/products" className="flex items-center gap-4 group">
                  <div className="p-3 bg-white border border-stone-200 rounded-lg group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all shadow-sm text-stone-600">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-stone-900 group-hover:text-red-700 transition-colors font-sans">
                      The Collection
                    </span>
                    <span className="text-xs text-stone-400 block mt-0.5 font-sans">
                      Browse 100+ Variants
                    </span>
                  </div>
                </Link>
              </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 px-5 sm:px-8 lg:pl-14 xl:pl-16 py-12 md:py-16 min-w-0">
              <ServiceSection
                id="matching"
                title="Brick Matching"
                icon={BrickWall}
                image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80"
                content={`Our brick matching solution preserves the integrity of your facade. We don't just find a "close enough" color; we analyze the clay composition and firing method.\n\nJJBS experts determine the exact texture, format, and aging process required to achieve an authentic look in perfect sync with the existing architecture.`}
              />
              <ServiceSection
                id="blending"
                title="Blending & Weathering"
                icon={Palette}
                image="https://media.istockphoto.com/id/2150083393/photo/picture-of-a-wall-made-of-red-bricks-stacked-in-a-row.jpg?s=612x612&w=0&k=20&c=_usE3QBvFD_ZuJxFOQwwJefvrRI56C_M52QJJ_7NiQw="
                content={`Imperfection is the soul of brickwork. We create custom blends that mimic centuries of weathering or establish a bold new aesthetic.\n\nHand-picked personalized blends are the preferred choice for architects designing distinctive spaces. We can pre-blend on pallets to ensure consistency on-site.`}
              />
              <ServiceSection
                id="custom"
                title="Custom Brick Making"
                icon={Hammer}
                image="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80"
                content={`Modern mass manufacturing often limits creativity. We specialize in the bespoke. Whether it's a non-standard size, a unique geometric shape, or a specific glaze.\n\nWe derive pleasure in executing complex, custom-molded products with hallmark quality. You design the timeline of the planet; we make the blocks.`}
              />
              <ServiceSection
                id="technical"
                title="Technical Consultation"
                icon={Ruler}
                image="https://media.istockphoto.com/id/2239705720/photo/technician-repairing-wall-light-fixture-in-brick-corridor.jpg?s=612x612&w=0&k=20&c=udNzkdErjIOoBPDaWhFmMNICzZFLDUd4PwSfUDRwdCs="
                content={`Structural integrity meets artistic vision. Our team works alongside structural engineers to calculate load-bearing capacities, thermal performance, and water absorption rates.\n\nWe provide detailed CAD drawings and technical specification sheets to ensure your project meets all regulatory standards.`}
              />
              <ServiceSection
                id="logistics"
                title="Logistics & Support"
                icon={Truck}
                image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80"
                content={`Precision delivery for heavy materials. We manage the entire supply chain, ensuring your bricks arrive on time, intact, and sequenced for installation.\n\nFrom high-rise city sites to remote villas, our logistics team coordinates crane offloading and phased deliveries to keep your construction timeline on track.`}
              />
            </main>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
