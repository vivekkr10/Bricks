import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/header";
import { useState, useEffect, useRef } from "react";
import Footer from "../../Components/footer";

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

// main section or content
export default function ProjectDetails() {
  const { state: project } = useLocation();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [aboutRef, aboutVisible] = useInView();
  const [statsRef, statsVisible] = useInView(0.1);

  // console.log(project.category);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!project) return null;

  const tabs = [{ id: "overview", label: "Overview", icon: "◈" }];

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen overflow-x-hidden"
        style={{ background: "#faf9f7", fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── INJECTED STYLES ── */}
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .font-display { font-family: 'Cormorant Garamond', serif !important; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(26px); }
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

        .anim-fade-up { animation: fadeUp 0.72s cubic-bezier(.22,.68,0,1.15) forwards; }
        .anim-float   { animation: floatY 5s ease-in-out infinite; }

        .pulse-dot {
          position: relative;
          display: inline-flex;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #f07030;
          flex-shrink: 0;
        }
        .pulse-dot::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #f07030;
          animation: pulseRing 2s ease-out infinite;
        }

        .orange-btn {
          background: linear-gradient(135deg, #f07030, #f58c50);
          color: #fff;
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
          box-shadow: 0 4px 18px rgba(240,112,48,0.3);
        }
        .orange-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 28px rgba(240,112,48,0.38);
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
          background: linear-gradient(90deg, #f07030, #f58c50);
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
          box-shadow: 0 12px 36px rgba(240,112,48,0.13);
          border-color: rgba(240,112,48,0.25);
        }

        .detail-row {
          transition: background 0.2s;
        }
        .detail-row:hover {
          background: rgba(240,112,48,0.04);
          border-radius: 10px;
        }

        .progress-fill {
          background: linear-gradient(90deg, #f07030, #f7a878);
          border-radius: 999px;
          transition: width 1.5s cubic-bezier(.22,.68,0,1.15);
        }

        input, textarea {
          background: #fff;
          border: 1.5px solid #e8e4df;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        input:focus, textarea:focus {
          border-color: #f07030;
          box-shadow: 0 0 0 3px rgba(240,112,48,0.1);
        }

        .hero-overlay-bottom {
          background: linear-gradient(to top, #faf9f7 0%, rgba(250,249,247,0.5) 35%, transparent 70%);
        }
        .hero-overlay-left {
          background: linear-gradient(to right, rgba(250,249,247,0.55) 0%, transparent 60%);
        }
      `}</style>

        {/* Hero section */}
        <section className="relative h-[90vh] overflow-hidden">
          {/* Parallax image */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)",
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className={` w-full h-full object-cover transition-opacity duration-700 contrast-[1.08] saturate-[1.05] ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>

          {/* Subtle warm tint */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(250,240,230,0.08)" }}
          />

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer back-btn absolute top-24 left-6 z-20 flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide"
            style={{
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(14px)",
              color: "#3d3530",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}
          >
            <span style={{ color: "#f07030" }}>←</span>
            Projects
          </button>

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-14 pb-14 z-10">
            {/* Category badge */}
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-6 text-xs font-semibold tracking-[0.18em] uppercase anim-fade-up"
              style={{
                opacity: 0,
                animationDelay: "0.05s",
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "#c6541a",
                boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
              }}
            >
              <span className="pulse-dot" />
              {project.category}
            </div>

            {/* Title */}
            <h1
              className="font-display anim-fade-up"
              style={{
                opacity: 0,
                animationDelay: "0.17s",
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
            </h1>

            {/* Location */}
            <p
              className="flex items-center gap-2 text-base tracking-wider anim-fade-up"
              style={{
                opacity: 0,
                animationDelay: "0.3s",
                color: "rgba(255,255,255,0.9)",
                marginBottom: "1.8rem",
                textShadow: "0 2px 14px rgba(0,0,0,0.4)",
              }}
            >
              <span style={{ color: "#f07030" }}>⊕</span>
              {project.location}
            </p>

            {/* Stat pills */}
            <div
              className="flex flex-wrap gap-3 anim-fade-up"
              style={{ opacity: 0, animationDelay: "0.42s" }}
            >
              {[
                { label: "Area", val: project.details?.area },
                { label: "Year", val: project.details?.year },
                { label: "Client", val: project.details?.client },
              ]
                .filter((s) => s.val)
                .map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-sm"
                    style={{
                      background: "rgba(255,255,255,0.85)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                      color: "#0e0b0a",
                    }}
                  >
                    <span style={{ color: "#f07030", fontWeight: 600 }}>
                      {s.val}
                    </span>
                    <span style={{ color: "#ccc" }}>·</span>
                    <span style={{ color: "#a09080" }}>{s.label}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Vertical scroll hint */}
          <div
            className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3"
            style={{ opacity: 0.25 }}
          >
            <div
              className="h-14 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #f07030, transparent)",
              }}
            />
            <p
              className="text-[9px] tracking-[0.35em] uppercase rotate-90 my-2"
              style={{ color: "#a09080" }}
            >
              Scroll
            </p>
            <div
              className="h-14 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #f07030, transparent)",
              }}
            />
          </div>
        </section>

        {/* main content */}

        <main className="max-w-6xl mx-auto px-6 py-16">
          {/* ── OVERVIEW ── */}
          <div className="grid md:grid-cols-5 gap-12">
            {/* Left */}
            <div
              ref={aboutRef}
              className="md:col-span-3 space-y-12"
              style={{
                opacity: aboutVisible ? 1 : 0,
                transform: aboutVisible ? "none" : "translateY(28px)",
                transition: "opacity 0.65s ease, transform 0.65s ease",
              }}
            >
              {/* Section label row */}
              <div className="flex items-center gap-4">
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(to right, #f07030aa, transparent)",
                  }}
                />
                <span
                  className="text-[10px] tracking-[0.35em] uppercase font-semibold"
                  style={{ color: "#f07030" }}
                >
                  About the Project
                </span>
              </div>

              {/* Heading + body */}
              <div>
                <h2
                  className="font-display mb-5"
                  style={{
                    fontSize: "clamp(2.2rem,5vw,3.5rem)",
                    fontWeight: 700,
                    color: "#1c1410",
                    lineHeight: 1.1,
                  }}
                >
                  Project{" "}
                  <span className="italic" style={{ color: "#f07030" }}>
                    Overview
                  </span>
                </h2>
                <p
                  className="text-lg leading-relaxed font-light"
                  style={{ color: "#6b5e54" }}
                >
                  {project.description}
                </p>
              </div>

              {/* Pull quote */}
              <div
                className="py-1 pl-7"
                style={{ borderLeft: "3px solid #f07030" }}
              >
                <p
                  className="font-display text-2xl italic leading-relaxed"
                  style={{ color: "#5c4d44" }}
                >
                  "Architecture is the thoughtful making of space — every line,
                  a decision."
                </p>
              </div>

              {/* Progress bars */}
              <div className="space-y-6">
                <p
                  className="text-[10px] tracking-[0.3em] uppercase font-semibold"
                  style={{ color: "#c0afa4" }}
                >
                  Project Scores
                </p>
                {[
                  { label: "Design Innovation", pct: 92 },
                  { label: "Sustainability", pct: 78 },
                  { label: "Client Satisfaction", pct: 97 },
                  { label: "Build Quality", pct: 88 },
                ].map((p, i) => (
                  <div key={p.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: "#8a7a6e" }}>{p.label}</span>
                      <span
                        className="font-semibold"
                        style={{ color: "#f07030" }}
                      >
                        {p.pct}%
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: "#ede9e5" }}
                    >
                      <div
                        className="progress-fill h-full"
                        style={{
                          width: aboutVisible ? `${p.pct}%` : "0%",
                          transitionDelay: `${0.1 + i * 0.13}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="md:col-span-2 space-y-5">
              {/* Detail card */}
              <div
                className="rounded-3xl p-7"
                style={{
                  background: "#fff",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
                  border: "1px solid rgba(240,112,48,0.1)",
                  opacity: aboutVisible ? 1 : 0,
                  transform: aboutVisible ? "none" : "translateY(28px)",
                  transition:
                    "opacity 0.65s ease 0.18s, transform 0.65s ease 0.18s",
                }}
              >
                <p
                  className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-6"
                  style={{ color: "#f07030" }}
                >
                  Project Details
                </p>

                {[
                  { label: "Location", val: project.location, icon: "⊕" },
                  { label: "Category", val: project.category, icon: "⬟" },
                  { label: "Architect", val: project.architect, icon: "◈" },
                  {
                    label: "Client",
                    val: project.details?.client,
                    icon: "◉",
                  },
                  { label: "Area", val: project.details?.area, icon: "⬡" },
                  { label: "Year", val: project.details?.year, icon: "◷" },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="detail-row flex items-start gap-4 py-3.5 px-2 -mx-2"
                    style={{
                      borderBottom: i < 5 ? "1px solid #f0ece8" : "none",
                      opacity: aboutVisible ? 1 : 0,
                      transform: aboutVisible ? "none" : "translateY(10px)",
                      transition: `opacity 0.45s ease ${0.22 + i * 0.07}s, transform 0.45s ease ${0.22 + i * 0.07}s`,
                    }}
                  >
                    <span
                      className="w-5 text-center flex-shrink-0 mt-0.5 text-sm"
                      style={{ color: "#f07030" }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <p
                        className="text-[10px] tracking-widest uppercase mb-0.5"
                        style={{ color: "#c0afa4" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="font-medium text-sm"
                        style={{ color: "#2c2420" }}
                      >
                        {item.val || "—"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating architect card */}
              <div
                className="anim-float rounded-3xl p-6 flex items-center gap-4"
                style={{
                  background: "#fff",
                  boxShadow: "0 4px 24px rgba(240,112,48,0.1)",
                  border: "1px solid rgba(240,112,48,0.12)",
                  opacity: aboutVisible ? 1 : 0,
                  transition: "opacity 0.65s ease 0.48s",
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 text-white"
                  style={{
                    background: "linear-gradient(135deg, #f07030, #f7a060)",
                  }}
                >
                  ◈
                </div>
                <div>
                  <p
                    className="text-[10px] tracking-widest uppercase mb-0.5"
                    style={{ color: "#c0afa4" }}
                  >
                    Lead Architect
                  </p>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#2c2420" }}
                  >
                    {project.architect || "Studio Architect"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* footer Stripe */}
      </div>
      <Footer />
    </>
  );
}
