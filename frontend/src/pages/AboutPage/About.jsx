import { useState, useEffect, useRef } from "react";
import Navbar from "../../Components/header.jsx";
import FooterA from "../../Components/FooterA.jsx";

/* ── Intersection observer ── */
const useInView = (threshold = 0.15) => {
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

/* ── Counter animation ── */
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

/* ── Stat Counter Card ── */
const StatCard = ({ value, suffix, label, emoji, inView, delay }) => {
  const count = useCounter(value, inView);
  return (
    <div
      className="bg-white rounded-2xl p-8 text-center border border-orange-100 shadow-lg hover:-translate-y-2 hover:shadow-2xl hover:border-orange-300 transition-all duration-500 cursor-default"
      style={{
        animationDelay: delay,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`,
      }}
    >
      <div className="text-4xl mb-3">{emoji}</div>
      <div className="font-serif text-5xl font-bold text-orange-600 leading-none mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-xs font-semibold tracking-widest uppercase text-stone-400">
        {label}
      </div>
    </div>
  );
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

/* ── FAQ Item ── */
const FaqItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-orange-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-6 flex justify-between items-center group"
      >
        <span className="font-serif text-xl font-semibold text-stone-800 group-hover:text-orange-600 transition-colors duration-300 pr-4">
          {q}
        </span>
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold border flex-shrink-0 transition-all duration-300 ${open ? "bg-orange-600 text-white border-orange-600" : "bg-orange-50 text-orange-600 border-orange-200"}`}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-48 pb-6" : "max-h-0"}`}
      >
        <p className="text-stone-500 leading-relaxed font-light">{a}</p>
      </div>
    </div>
  );
};

/* ── Milestone ── */
const Milestone = ({ year, title, desc, index, inView }) => (
  <div
    className="flex gap-6 items-start group"
    style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateX(0)" : "translateX(-30px)",
      transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
    }}
  >
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="w-12 h-12 rounded-full border-2 border-orange-200 bg-white flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-600 transition-all duration-300 shadow-md group-hover:shadow-orange-200 group-hover:shadow-lg">
        <span className="font-serif text-xs font-bold text-orange-600 group-hover:text-white transition-colors duration-300">
          {year.slice(2)}
        </span>
      </div>
      {index < 5 && (
        <div className="w-px h-14 bg-gradient-to-b from-orange-200 to-transparent mt-1" />
      )}
    </div>
    <div className="pb-6 pt-2">
      <div className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
        {year}
      </div>
      <div className="font-serif text-lg font-bold text-stone-800 mb-1 group-hover:text-orange-700 transition-colors duration-300">
        {title}
      </div>
      <div className="text-sm text-stone-500 leading-relaxed font-light">
        {desc}
      </div>
    </div>
  </div>
);

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [interest, setInterest] = useState("");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [hoveredCity, setHoveredCity] = useState(null);
  const [marqueePos, setMarqueePos] = useState(0);

  const [heroRef, heroInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);
  const [storyRef, storyInView] = useInView(0.15);
  const [innovRef, innovInView] = useInView(0.15);
  const [productRef, productInView] = useInView(0.1);
  const [histRef, histInView] = useInView(0.1);
  const [teamRef, teamInView] = useInView(0.15);
  const [storeRef, storeInView] = useInView(0.15);
  const [ctaRef, ctaInView] = useInView(0.2);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Marquee
  useEffect(() => {
    const id = setInterval(() => setMarqueePos((p) => (p - 1) % 800), 16);
    return () => clearInterval(id);
  }, []);

  const products = [
    {
      name: "Structural Clay",
      tab: "Structural",
      tagline: "The backbone of buildings",
      desc: "High-compression load-bearing clay bricks fired to 1050°C. The trusted choice of structural engineers across India for over three decades.",
      color: "bg-amber-700",
      light: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      emoji: "🏗️",
      specs: [
        "Compressive Strength: 7.5 N/mm²",
        "Water Absorption: <15%",
        "Size: 230×110×75mm",
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
      desc: "Premium architectural facing bricks in 40+ textures and tones. Featured in IIM Ahmedabad and hundreds of landmark buildings worldwide.",
      color: "bg-red-600",
      light: "bg-red-50",
      border: "border-red-200",
      text: "text-red-600",
      emoji: "🧱",
      specs: [
        "Frost Resistant Grade A",
        "Low Efflorescence",
        "30+ Colour Options",
        "BS EN 771 for Export",
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
      desc: "Wire-cut, sand-faced, and rock-split finishes that bring depth and tactile character to any facade — interior or exterior.",
      color: "bg-orange-700",
      light: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-700",
      emoji: "🎨",
      specs: [
        "Wire-cut Finish",
        "Sand-faced Option",
        "Rock-split Available",
        "Custom Textures on Request",
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
      name: "Handmade Range",
      tab: "Handmade",
      tagline: "Artisanal, one-of-a-kind",
      desc: "Hand-moulded bricks that carry the human touch — slight irregularities that create character no machine can replicate.",
      color: "bg-yellow-700",
      light: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
      emoji: "🤲",
      specs: [
        "Hand-pressed Process",
        "Heritage Aesthetics",
        "Bespoke Colour Orders",
        "Limited Batches",
      ],
      bricks: [
        "bg-yellow-700",
        "bg-yellow-600",
        "bg-amber-700",
        "bg-yellow-800",
        "bg-yellow-600",
        "bg-amber-600",
        "bg-yellow-700",
        "bg-yellow-500",
        "bg-amber-700",
        "bg-yellow-800",
        "bg-yellow-600",
        "bg-amber-500",
      ],
    },
  ];

  const milestones = [
    {
      year: "1986",
      title: "The First Kiln",
      desc: "A bold vision takes shape in Godhra, Gujarat. Jay Jalaram Bricks establishes its first clay brick factory.",
    },
    {
      year: "1993",
      title: "Growing Roots",
      desc: "Expanding production capacity. Architects begin noticing the exceptional quality and consistency of JJB bricks.",
    },
    {
      year: "1996",
      title: "The Facing Revolution",
      desc: "Premium clay facing bricks introduced — a turning point transforming JJB into an architectural design partner.",
    },
    {
      year: "2008",
      title: "Automation Era",
      desc: "German tunnel kiln technology adopted. Automated production lines double output while cutting emissions by 60%.",
    },
    {
      year: "2015",
      title: "Going Global",
      desc: "First international exports. JJB bricks cross oceans to Europe, Oceania and GCC — 46+ countries and counting.",
    },
    {
      year: "2021",
      title: "The Brick Store",
      desc: "Launch of TBS across 10 Indian cities. Bricks become an immersive art-gallery experience.",
    },
  ];

  const team = [
    {
      initials: "RJ",
      name: "Rajesh Jalaram",
      role: "Founder & Chairman",
      since: "1986",
      quote:
        "Every brick we make is a promise to the architect, the builder, and the family that will live inside those walls.",
    },
    {
      initials: "AJ",
      name: "Anil Jalaram",
      role: "Managing Director",
      since: "2001",
      quote:
        "We didn't just automate our factory — we elevated the craft. Technology serves the material, never the other way.",
    },
    {
      initials: "SJ",
      name: "Sneha Jalaram",
      role: "Head of Design & Exports",
      since: "2015",
      quote:
        "The Brick Store was born from a simple idea: bricks deserve to be experienced, not just ordered from a catalogue.",
    },
  ];

  const cities = [
    "Godhra",
    "Vadodara",
    "Ahmedabad",
    "Ludhiana",
    "Pune",
    "Rajkot",
    "Hyderabad",
    "Nashik",
    "Surat",
    "Kolkata",
  ];
  const marqueeItems = [
    "Clay Facing Bricks",
    "✦",
    "Structural Bricks",
    "✦",
    "46+ Countries",
    "✦",
    "IIM Ahmedabad",
    "✦",
    "German Kiln Technology",
    "✦",
    "35 Years Excellence",
    "✦",
    "The Brick Store",
    "✦",
    "Architect's Choice",
    "✦",
  ];

  return (
    <div
      className="bg-stone-50 text-stone-800 overflow-x-hidden"
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      {/* Google Fonts + keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Jost:wght@300;400;500;600;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', Georgia, serif !important; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #fafaf9; }
        ::-webkit-scrollbar-thumb { background: #ea580c; border-radius: 4px; }

        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(3deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(-2deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(4deg)} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinRev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.6)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(60px) skewY(1.5deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        .float-a { animation: floatA 5s ease-in-out infinite; }
        .float-b { animation: floatB 7s ease-in-out infinite 1s; }
        .float-c { animation: floatC 6s ease-in-out infinite 2.5s; }
        .float-d { animation: floatA 8s ease-in-out infinite 1.5s; }
        .spin-slow { animation: spinSlow 28s linear infinite; }
        .spin-rev { animation: spinRev 20s linear infinite; }
        .pulse-dot { animation: pulse 2s ease-in-out infinite; }
        .marquee-track { display:flex; gap:3rem; animation: marqueeScroll 20s linear infinite; white-space:nowrap; width:max-content; }
        .hero-line { overflow:hidden; display:block; }
        .hero-word { display:block; animation: slideUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards; opacity:0; }
        .tab-fade { animation: fadeSlideIn 0.4s ease forwards; }
        .brick-hover { transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease; }
        .brick-hover:hover { transform: translateY(-10px) rotate(-1.5deg); box-shadow: 0 30px 60px rgba(180,60,20,0.18); }
        .nav-underline { position:relative; }
        .nav-underline::after { content:''; position:absolute; bottom:-4px; left:50%; right:50%; height:1.5px; background:#ea580c; transition: left 0.3s ease, right 0.3s ease; }
        .nav-underline:hover::after { left:0; right:0; }
        .glow-btn:hover { box-shadow: 0 16px 48px rgba(234,88,12,0.45); }
        .shimmer-bg { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); background-size: 200% 100%; animation: shimmer 2.5s infinite; }
        .section-reveal { opacity:0; transform:translateY(40px); transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1); }
        .section-reveal.visible { opacity:1; transform:translateY(0); }
        .reveal-left { opacity:0; transform:translateX(-40px); transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1); }
        .reveal-left.visible { opacity:1; transform:translateX(0); }
        .reveal-right { opacity:0; transform:translateX(40px); transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1); }
        .reveal-right.visible { opacity:1; transform:translateX(0); }
        .d1{transition-delay:0.1s} .d2{transition-delay:0.2s} .d3{transition-delay:0.3s}
        .d4{transition-delay:0.4s} .d5{transition-delay:0.5s} .d6{transition-delay:0.6s}
      `}</style>

      <Navbar />

      {/* ══════════ HERO ══════════ */}
      <section
        ref={heroRef}
        className="mt-10 min-h-screen relative flex items-center overflow-hidden bg-gradient-to-br from-stone-50 via-orange-50/40 to-stone-100 pt-20"
      >
        {/* Decorative bg circles */}
        <BrickWall opacity={0.07} color="#8B4513" />
        <div className="spin-slow absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-orange-100 opacity-60 pointer-events-none hidden lg:block" />
        <div className="spin-rev absolute right-0 top-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-dashed border-orange-200 opacity-40 pointer-events-none hidden lg:block" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border-2 border-orange-200/50 opacity-30 pointer-events-none hidden lg:block" />

        {/* Floating bricks */}
        <div className="float-a absolute right-[14%] top-[20%] w-20 h-10 bg-orange-600 rounded-md shadow-2xl shadow-orange-300/50 opacity-90 hidden lg:block" />
        <div className="float-b absolute right-[24%] top-[48%] w-16 h-8 bg-amber-700 rounded-md shadow-xl shadow-amber-300/40 opacity-75 hidden lg:block" />
        <div className="float-c absolute right-[9%] top-[60%] w-24 h-12 bg-orange-400 rounded-md shadow-2xl shadow-orange-200/50 opacity-65 hidden lg:block" />
        <div className="float-d absolute right-[35%] top-[28%] w-12 h-6 bg-yellow-600 rounded shadow-lg opacity-50 hidden lg:block" />
        <div className="float-a absolute right-[18%] top-[72%] w-14 h-7 bg-red-500 rounded shadow-lg opacity-40 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-10 section-reveal ${heroInView ? "visible" : ""}`}
            >
              <span className="pulse-dot w-2 h-2 rounded-full bg-orange-600 block" />
              <span className="text-xs font-bold tracking-widest uppercase text-orange-600">
                35 Years · 46 Countries · 10 Stores
              </span>
            </div>

            {/* Headline — line-by-line reveal */}
            <h1 className="font-serif leading-none mb-8">
              {[
                {
                  text: "Where",
                  cls: "text-7xl lg:text-8xl font-light text-stone-800",
                  delay: "0.15s",
                },
                {
                  text: "Clay",
                  cls: "text-7xl lg:text-8xl font-bold italic text-orange-600",
                  delay: "0.28s",
                },
                {
                  text: "Becomes",
                  cls: "text-7xl lg:text-8xl font-light text-stone-800",
                  delay: "0.41s",
                },
                {
                  text: "Legacy.",
                  cls: "text-7xl lg:text-8xl font-bold text-stone-900",
                  delay: "0.54s",
                },
              ].map(({ text, cls, delay }) => (
                <span key={text} className="hero-line block overflow-hidden">
                  <span
                    className={`hero-word ${cls}`}
                    style={{ animationDelay: delay }}
                  >
                    {text}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className={`text-lg text-stone-500 leading-relaxed max-w-xl font-light mb-10 section-reveal d3 ${heroInView ? "visible" : ""}`}
            >
              Since 1986, Jay Jalaram Bricks has shaped India's architectural
              identity — firing exceptional clay bricks for a nation that builds
              with pride, from the kilns of Godhra to skylines across 46
              countries.
            </p>

            <div
              className={`mb-10 flex flex-wrap gap-4 section-reveal d4 ${heroInView ? "visible" : ""}`}
            >
              <button className="px-8 py-4 bg-orange-600 text-white font-bold text-xs tracking-widest uppercase rounded-xl shadow-xl shadow-orange-200 glow-btn hover:bg-orange-700 hover:-translate-y-1 transition-all duration-300">
                Discover Our Story →
              </button>
              <button className="px-8 py-4 border-2 border-stone-300 text-stone-600 font-bold text-xs tracking-widest uppercase rounded-xl hover:border-orange-400 hover:text-orange-600 hover:-translate-y-1 transition-all duration-300">
                Browse Products
              </button>
            </div>
          </div>
        </div>

        {/* 1986 watermark */}
        <div className="absolute bottom-4 right-4 font-serif text-[12rem] lg:text-[18rem] font-bold text-orange-600/[0.04] leading-none pointer-events-none select-none">
          1986
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-16 flex items-center gap-3 opacity-40 hidden lg:flex">
          <div className="w-px h-16 bg-gradient-to-b from-orange-600 to-transparent" />
          <span
            className="text-xs font-bold tracking-widest uppercase text-stone-400"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <div className="bg-orange-600 py-3.5 overflow-hidden">
        <div className="marquee-track">
          {[...Array(3)]
            .flatMap(() => marqueeItems)
            .map((item, i) => (
              <span
                key={i}
                className="text-white/80 text-xs font-bold tracking-widest uppercase flex-shrink-0"
              >
                {item}
              </span>
            ))}
        </div>
      </div>

      {/* ══════════ STATS ══════════ */}
      <section ref={statsRef} className="py-24 px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {statsInView &&
            [
              {
                value: 35,
                suffix: "+",
                label: "Years of Excellence",
                emoji: "🏆",
                delay: "0s",
              },
              {
                value: 46,
                suffix: "+",
                label: "Countries Served",
                emoji: "🌍",
                delay: "0.1s",
              },
              {
                value: 5000,
                suffix: "+",
                label: "Architect Partners",
                emoji: "📐",
                delay: "0.2s",
              },
              {
                value: 10,
                suffix: "",
                label: "Brick Store Locations",
                emoji: "🏪",
                delay: "0.3s",
              },
            ].map((s, i) => <StatCard key={i} {...s} inView={statsInView} />)}
        </div>
      </section>

      {/* ══════════ STORY ══════════ */}
      <section
        ref={storyRef}
        className="py-28 px-8 bg-white relative overflow-hidden"
      >
        {/* Right half warm bg */}
        <BrickWall opacity={0.07} color="#8B4513" />
        <div className="absolute top-0 right-0 w-2/5 h-full bg-gradient-to-l from-orange-50 to-transparent hidden lg:block" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          {/* Left text */}
          <div>
            <div
              className={`inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6 reveal-left ${storyInView ? "visible" : ""}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 block" />
              <span className="text-xs font-bold tracking-widest uppercase text-orange-600">
                Who We Are
              </span>
            </div>
            <h2
              className={`font-serif text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-8 reveal-left d1 ${storyInView ? "visible" : ""}`}
            >
              A Story Fired
              <br />
              in <em className="text-orange-600">Clay,</em>
              <br />
              Written in Stone.
            </h2>
            <p
              className={`text-stone-500 leading-relaxed font-light mb-5 reveal-left d2 ${storyInView ? "visible" : ""}`}
            >
              In 1986, a singular vision took shape in Godhra, Gujarat — to
              craft bricks that were not merely structural, but architectural
              masterpieces. What began as a regional factory rapidly became a
              national benchmark for quality and design.
            </p>
            <p
              className={`text-stone-500 leading-relaxed font-light mb-10 reveal-left d3 ${storyInView ? "visible" : ""}`}
            >
              Architects discovered that JJB bricks weren't just structurally
              superior — they were beautiful. This revelation transformed our
              trajectory, leading us to India's most prestigious institutions
              and, ultimately, 46 countries worldwide.
            </p>
            <div
              className={`flex gap-8 reveal-left d4 ${storyInView ? "visible" : ""}`}
            >
              {[
                ["IIM-A", "Iconic Campus"],
                ["AIIMS", "Healthcare"],
                ["Godhra", "Birthplace"],
              ].map(([v, l]) => (
                <div key={v} className="border-l-4 border-orange-500 pl-4">
                  <div className="font-serif text-2xl font-bold text-stone-900">
                    {v}
                  </div>
                  <div className="text-xs font-semibold tracking-wider uppercase text-stone-400">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual collage */}
          <div
            className={`relative h-[500px] reveal-right ${storyInView ? "visible" : ""}`}
          >
            {/* Main brick mosaic card */}
            <div className="brick-hover absolute top-0 left-[8%] w-[62%] h-[55%] rounded-2xl overflow-hidden shadow-2xl shadow-orange-200/50">
              <div className="grid grid-cols-5 grid-rows-4 gap-1 p-3 h-full bg-orange-100">
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
                  "bg-red-600",
                  "bg-amber-700",
                  "bg-orange-700",
                  "bg-red-800",
                  "bg-amber-600",
                ].map((c, i) => (
                  <div key={i} className={`${c} rounded-sm opacity-80`} />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent flex flex-col justify-end p-5">
                <div className="text-orange-300 text-xs font-bold tracking-widest uppercase mb-1">
                  Clay Facing Series
                </div>
                <div className="font-serif text-white text-lg font-bold">
                  Hand-Pressed Excellence
                </div>
              </div>
            </div>

            {/* Countries badge */}
            <div className="brick-hover absolute bottom-[12%] left-0 bg-orange-600 rounded-2xl p-6 shadow-2xl shadow-orange-400/40">
              <div className="font-serif text-5xl font-bold text-white leading-none">
                46
              </div>
              <div className="text-xs font-bold tracking-widest uppercase text-orange-200 mt-1">
                Countries
              </div>
              <div className="text-xs text-orange-300/70 mt-1">
                and counting
              </div>
            </div>

            {/* Trust card */}
            <div className="brick-hover absolute bottom-0 right-0 w-[56%] bg-white border border-orange-100 rounded-2xl p-5 shadow-xl shadow-stone-200/80">
              <div className="flex gap-1 mb-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-4 h-4 bg-orange-600 rounded-sm opacity-80"
                  />
                ))}
              </div>
              <div className="font-serif text-base font-bold text-stone-900 mb-1">
                Architects Trust JJB
              </div>
              <div className="text-xs text-stone-500 leading-relaxed">
                5,000+ design professionals recommend JJB to their clients
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ INNOVATION ══════════ */}
      <section
        ref={innovRef}
        className="py-28 px-8 bg-stone-50 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Heading */}
          <div
            className={`text-center mb-20 section-reveal ${innovInView ? "visible" : ""}`}
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 block" />
              <span className="text-xs font-bold tracking-widest uppercase text-orange-600">
                Innovation
              </span>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
              Where Ancient Craft Meets
              <br />
              <em className="text-orange-600">Modern Science</em>
            </h2>
            <p className="text-stone-500 max-w-lg mx-auto mt-5 leading-relaxed font-light">
              Our 120-metre German tunnel kiln fires each brick to a precise
              1050°C — achieving the perfect balance of strength, colour, and
              sustainability.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Dark feature card */}
            <div
              className={`bg-stone-900 rounded-3xl p-10 relative overflow-hidden shadow-2xl reveal-left ${innovInView ? "visible" : ""}`}
            >
              {/* Brick pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-8 gap-1 p-2 h-full">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-orange-500 rounded-sm opacity-60"
                    />
                  ))}
                </div>
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-orange-600/20 border border-orange-600/40 rounded-2xl flex items-center justify-center text-2xl mb-6">
                  🔥
                </div>
                <h3 className="font-serif text-3xl font-bold text-white mb-4">
                  German Tunnel Kiln Technology
                </h3>
                <p className="text-stone-400 leading-relaxed font-light mb-8">
                  Fully automated firing at 1050°C ensures every brick achieves
                  identical compression strength, dimensional accuracy, and rich
                  tonal consistency — batch after batch.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["120m", "Kiln Length"],
                    ["1050°C", "Peak Temp"],
                    ["60%", "Less Emissions"],
                    ["±1mm", "Precision"],
                  ].map(([v, l]) => (
                    <div
                      key={v}
                      className="bg-orange-600/10 border border-orange-600/20 rounded-xl p-4"
                    >
                      <div className="font-serif text-2xl font-bold text-orange-400">
                        {v}
                      </div>
                      <div className="text-xs font-semibold tracking-wider uppercase text-stone-500 mt-0.5">
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 2×2 grid */}
            <div className="grid grid-cols-2 gap-5">
              {[
                {
                  icon: "🌱",
                  title: "Eco-First",
                  desc: "Solar drying, zero groundwater, recycled clay waste — every step minimises our environmental footprint.",
                },
                {
                  icon: "🤖",
                  title: "Smart Automation",
                  desc: "Robotic stacking and AI-powered firing profiles maintain quality at industrial scale.",
                },
                {
                  icon: "📐",
                  title: "Precision Engineering",
                  desc: "±1mm dimensional tolerance across all brick types. ISO-certified production lines.",
                },
                {
                  icon: "🚢",
                  title: "Global Logistics",
                  desc: "Export-grade packaging to reliably reach 46+ countries worldwide with zero compromise.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`bg-white border border-orange-100 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-xl hover:border-orange-200 hover:shadow-orange-100 transition-all duration-400 cursor-default section-reveal d${i + 1} ${innovInView ? "visible" : ""}`}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PRODUCTS (TABBED) ══════════ */}
      <section ref={productRef} className="py-28 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 section-reveal ${productInView ? "visible" : ""}`}
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 block" />
              <span className="text-xs font-bold tracking-widest uppercase text-orange-600">
                Our Range
              </span>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl font-bold text-stone-900">
              Crafted for Every Vision
            </h2>
          </div>

          {/* Tab buttons */}
          <div
            className={`flex flex-wrap justify-center gap-2 mb-12 section-reveal d1 ${productInView ? "visible" : ""}`}
          >
            <div className="bg-stone-100 p-1.5 rounded-xl flex gap-1 flex-wrap">
              {products.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === i ? "bg-orange-600 text-white shadow-lg shadow-orange-200" : "text-stone-500 hover:text-orange-600"}`}
                >
                  {p.tab}
                </button>
              ))}
            </div>
          </div>

          {/* Active product */}
          {products.map(
            (p, i) =>
              activeTab === i && (
                <div
                  key={i}
                  className="grid lg:grid-cols-2 gap-16 items-center tab-fade"
                >
                  {/* Visual */}
                  <div className="relative">
                    <div
                      className={`h-80 lg:h-96 ${p.light} ${p.border} border rounded-3xl overflow-hidden relative`}
                    >
                      {/* Brick grid */}
                      <div className="grid grid-cols-6 gap-1.5 p-5 h-full">
                        {[...p.bricks, ...p.bricks].slice(0, 24).map((c, j) => (
                          <div
                            key={j}
                            className={`${c} rounded opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-200`}
                          />
                        ))}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent flex items-end p-6">
                        <div>
                          <div
                            className={`${p.text} text-xs font-bold tracking-widest uppercase mb-1 opacity-80`}
                          >
                            {p.tagline}
                          </div>
                          <div className="font-serif text-white text-2xl font-bold">
                            {p.name}
                          </div>
                        </div>
                      </div>
                      {/* Badge */}
                      <div className="absolute top-4 right-4 text-3xl">
                        {p.emoji}
                      </div>
                    </div>
                  </div>
                  {/* Info */}
                  <div>
                    <div
                      className={`text-xs font-bold tracking-widest uppercase ${p.text} mb-2`}
                    >
                      {p.tagline}
                    </div>
                    <h3 className="font-serif text-4xl font-bold text-stone-900 mb-5">
                      {p.name}
                    </h3>
                    <p className="text-stone-500 leading-relaxed font-light mb-7">
                      {p.desc}
                    </p>
                    <div className="mb-8 space-y-0">
                      {p.specs.map((s, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-3 py-3 border-b border-stone-100"
                        >
                          <div
                            className={`w-2 h-2 rounded-sm ${p.color} flex-shrink-0`}
                          />
                          <span className="text-stone-700 text-sm font-medium">
                            {s}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <button
                        className={`px-7 py-3.5 ${p.color} text-white font-bold text-xs tracking-widest uppercase rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
                      >
                        Request Sample
                      </button>
                      <button
                        className={`px-7 py-3.5 border-2 ${p.border} ${p.text} font-bold text-xs tracking-widest uppercase rounded-xl hover:opacity-70 transition-all duration-300`}
                      >
                        View Specs
                      </button>
                    </div>
                  </div>
                </div>
              ),
          )}

          {/* Thumbnail grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {products.map((p, i) => (
              <div
                key={i}
                onClick={() => setActiveTab(i)}
                className={`brick-hover rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${activeTab === i ? `${p.border} shadow-lg` : "border-stone-100 hover:border-orange-200"}`}
              >
                <div className={`h-20 ${p.light} grid grid-cols-4 gap-1 p-3`}>
                  {p.bricks.slice(0, 8).map((c, j) => (
                    <div key={j} className={`${c} rounded-sm opacity-70`} />
                  ))}
                </div>
                <div className="p-4 bg-white">
                  <div className="font-semibold text-stone-900 text-sm">
                    {p.name}
                  </div>
                  <div className="text-xs text-stone-400 mt-0.5">
                    {p.tagline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TIMELINE ══════════ */}
      <section
        ref={histRef}
        className="py-28 px-8 bg-stone-50 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-start relative z-10">
          {/* Sticky left */}
          <div className="lg:sticky lg:top-28">
            <div
              className={`inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-5 reveal-left ${histInView ? "visible" : ""}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 block" />
              <span className="text-xs font-bold tracking-widest uppercase text-orange-600">
                Our History
              </span>
            </div>
            <h2
              className={`font-serif text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-6 reveal-left d1 ${histInView ? "visible" : ""}`}
            >
              A Timeline
              <br />
              of <em className="text-orange-600">Firsts.</em>
            </h2>
            <p
              className={`text-stone-500 leading-relaxed font-light mb-8 reveal-left d2 ${histInView ? "visible" : ""}`}
            >
              From a single kiln in Gujarat to an international brick empire —
              every decade brought a new chapter of innovation, craft, and
              ambition.
            </p>
            <div className={`reveal-left d3 ${histInView ? "visible" : ""}`}>
              <button className="px-8 py-4 bg-orange-600 text-white font-bold text-xs tracking-widest uppercase rounded-xl shadow-xl shadow-orange-200 glow-btn hover:bg-orange-700 hover:-translate-y-1 transition-all duration-300">
                Download Company Profile
              </button>
            </div>
            {/* Big year decoration */}
            <div className="font-serif text-[9rem] font-bold text-orange-100 leading-none mt-4 select-none pointer-events-none">
              35
            </div>
          </div>
          {/* Timeline */}
          <div className="pt-2">
            {milestones.map((m, i) => (
              <Milestone key={i} {...m} index={i} inView={histInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ INTERNATIONAL ══════════ */}
      <section className="py-28 px-8 bg-stone-900 relative overflow-hidden">
        {/* Brick pattern bg */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-12 grid-rows-8 gap-1 p-2 h-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="bg-orange-600 rounded-sm" />
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-900/40 border border-orange-700/50 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 block" />
              <span className="text-xs font-bold tracking-widest uppercase text-orange-400">
                Global Reach
              </span>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight">
              Indian Craft,
              <br />
              <em className="text-orange-400">World Renowned.</em>
            </h2>
            <p className="text-stone-400 max-w-md mx-auto mt-5 leading-relaxed font-light">
              From Melbourne to Dubai, JJB bricks have built homes, hospitals,
              and landmarks across 46 countries.
            </p>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {[
              ["🇬🇧", "United Kingdom"],
              ["🇦🇺", "Australia"],
              ["🇦🇪", "UAE"],
              ["🇩🇪", "Germany"],
              ["🇸🇬", "Singapore"],
              ["🇺🇸", "USA"],
            ].map(([flag, country], i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-orange-600/20 hover:border-orange-500/50 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-default"
              >
                <div className="text-3xl mb-2">{flag}</div>
                <div className="text-white/70 text-xs font-medium">
                  {country}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Europe",
              "Oceania",
              "GCC",
              "Southeast Asia",
              "North America",
              "South Asia",
            ].map((r) => (
              <span
                key={r}
                className="bg-orange-900/30 border border-orange-700/40 rounded-full px-5 py-2 text-xs font-bold text-orange-400 tracking-wider"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TEAM ══════════ */}
      <section ref={teamRef} className="py-28 px-8 bg-white">
        <BrickWall opacity={0.05} color="#8B4513" />
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 section-reveal ${teamInView ? "visible" : ""}`}
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 block" />
              <span className="text-xs font-bold tracking-widest uppercase text-orange-600">
                The People
              </span>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl font-bold text-stone-900">
              Master Craftspeople,
              <br />
              <em className="text-orange-600">Visionary Leaders.</em>
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {team.map((person, i) => (
              <div
                key={i}
                className={`bg-white rounded-3xl p-8 border border-orange-100 shadow-lg hover:-translate-y-2 hover:shadow-2xl hover:border-orange-200 transition-all duration-500 cursor-default section-reveal d${i + 1} ${teamInView ? "visible" : ""}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-700 flex items-center justify-center font-serif text-2xl font-bold text-white shadow-lg shadow-orange-200 flex-shrink-0">
                    {person.initials}
                  </div>
                  <div>
                    <div className="font-serif text-lg font-bold text-stone-900">
                      {person.name}
                    </div>
                    <div className="text-xs font-bold tracking-wider uppercase text-orange-600">
                      {person.role}
                    </div>
                  </div>
                </div>
                <blockquote className="font-serif text-lg italic text-stone-700 leading-relaxed border-l-4 border-orange-200 pl-4 mb-5">
                  "{person.quote}"
                </blockquote>
                <div className="text-xs font-semibold tracking-widest uppercase text-stone-300">
                  At JJB since {person.since}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BRICK STORE ══════════ */}
      <section
        ref={storeRef}
        className="py-28 px-8 bg-orange-50 relative overflow-hidden"
      >
        <BrickWall opacity={0.05} color="#8B4513" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className={`reveal-left ${storeInView ? "visible" : ""}`}>
            <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-300 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 block" />
              <span className="text-xs font-bold tracking-widest uppercase text-orange-700">
                The Brick Store — TBS
              </span>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-7">
              Where Bricks
              <br />
              Become <em className="text-orange-600">Art.</em>
            </h2>
            <p className="text-stone-600 leading-relaxed font-light mb-5">
              The Brick Store-TBS reimagines how bricks are seen and sold in
              India. With the soul of an art gallery, each store presents an
              immersive international range of clay facing bricks that
              stimulates the senses.
            </p>
            <p className="text-stone-600 leading-relaxed font-light mb-8">
              Touch 40+ textures. Compare 30+ tones side by side. Consult with
              expert brick stylists. Spread across 10 Indian cities.
            </p>
            <p className="font-serif text-2xl italic text-orange-600 border-l-4 border-orange-400 pl-5 mb-8">
              "If It's about Bricks, It's all there at The Brick Store."
            </p>
            <button className="px-8 py-4 bg-orange-600 text-white font-bold text-xs tracking-widest uppercase rounded-xl shadow-xl shadow-orange-200 glow-btn hover:bg-orange-700 hover:-translate-y-1 transition-all duration-300">
              Find a Store Near You →
            </button>
          </div>

          {/* Store card */}
          <div
            className={`relative reveal-right ${storeInView ? "visible" : ""}`}
          >
            <div className="bg-white rounded-3xl p-7 border border-orange-100 shadow-2xl shadow-orange-100/50">
              <div className="mb-5">
                <div className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-3">
                  Sample Display Wall
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[
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
                  ].map((c, i) => (
                    <div
                      key={i}
                      className={`h-12 ${c} rounded-lg hover:scale-105 hover:-translate-y-1 transition-transform duration-200 cursor-default`}
                    />
                  ))}
                </div>
              </div>
              <div className="border-t border-orange-100 pt-5">
                <div className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-3">
                  10 Cities Nationwide
                </div>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <div
                      key={city}
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                      className={`flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-300 cursor-default ${hoveredCity === city ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200 scale-105" : "bg-white text-stone-600 border-stone-200"}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-orange-600 rounded-full flex flex-col items-center justify-center shadow-2xl shadow-orange-300/50">
              <span className="font-serif text-3xl font-bold text-white leading-none">
                10
              </span>
              <span className="text-white/70 text-xs font-bold tracking-wider">
                Stores
              </span>
            </div>
          </div>
        </div>
      </section>
      <FooterA />
    </div>
  );
}
