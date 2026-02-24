import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { AlignCenter } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import ProductSkeleton from "./ProductSkeleton";
import Header from "../../Components/header.jsx";
import Footer from "../../Components/footer.jsx";

// BrickWall pattern background
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

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    applicationType: "",
    searchQuery: "",
  });
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const productsRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products/all-products",
        );
        const data = await res.json();

        const activeProducts = data.filter((p) => p.status === "Active");

        setProducts(activeProducts);
        setFilteredProducts(activeProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, products, sortBy]);

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((p) => p.productType === filters.category);
    }

    // Filter by application type
    if (filters.applicationType) {
      filtered = filtered.filter((p) =>
        p.usageArea
          ?.toLowerCase()
          .includes(filters.applicationType.toLowerCase()),
      );
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.productName?.toLowerCase().includes(query) ||
          (p.shortDescription || "").toLowerCase().includes(query) ||
          p.productType.toLowerCase().includes(query),
      );
    }

    // Apply sorting
    // Apply sorting
    switch (sortBy) {
      case "name-asc":
        filtered.sort((a, b) => a.productName.localeCompare(b.productName));
        break;

      case "name-desc":
        filtered.sort((a, b) => b.productName.localeCompare(a.productName));
        break;

      case "strength-desc":
        filtered.sort((a, b) => {
          const strengthA = parseFloat(a.specifications?.strength) || 0;
          const strengthB = parseFloat(b.specifications?.strength) || 0;
          return strengthB - strengthA;
        });
        break;

      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(filtered);
  };
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      applicationType: "",
      searchQuery: "",
    });
    setSortBy("default");
  };

  // Pagination calculations
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Get unique categories for filter
  const categories = [...new Set(products.map((p) => p.productType))];

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

  // Text reveal animation
  const textRevealVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  // Fade in from top
  const fadeInTopVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Fade in from bottom
  const fadeInBottomVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Scale animation
  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Stagger container for lists
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Stagger item for lists
  const staggerItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  const heroEase = [0.22, 1, 0.36, 1];

  const brickCategoryCards = [
    {
      title: "Classic Reds",
      subtitle: "Warm & Timeless",
      image:
        "https://imgs.search.brave.com/AzPQ__YBQbMVOokRYNfsvMwDjBflQcFa0NJSI0KztKc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGF3c29ucy5jby51/ay9tZWRpYS9jYXRh/bG9nL3Byb2R1Y3Qv/dy9hL3dhcm5oYW1f/MjB0ZXJyYWNvdHRh/XzIwYnJpY2tzLTI3/ODY1LWV4dHJhLWxh/cmdlXzEuanBnP29w/dGltaXplPW1lZGl1/bSZiZy1jb2xvcj0y/NTUsMjU1LDI1NSZm/aXQ9Ym91bmRzJmhl/aWdodD0zMjAmd2lk/dGg9MzIwJmNhbnZh/cz0zMjA6MzIw",
      overlay: "bg-black/40",
      titleClass: "text-white",
      subtitleClass: "text-red-100",
    },
    {
      title: "Multis",
      subtitle: "Dynamic Blend",
      image:
        "https://imgs.search.brave.com/Yw5epWUYQtzziGgnxX0Mbp5NAw6eEWHGj3IN7K1GldU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWxjYW5mai5uaXRy/b2Nkbi5jb20vTGxy/VW1DaENYc2xETmt0/cHNDcFNXaW1Kd1Rh/bFJ2TFQvYXNzZXRzL2ltYWdlcy9vcHRp/bWl6ZWQvcmV2LWY4/MTYxZDYvYnJpY2tt/eXdhbGxzLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8w/Ny9ibGVuZDF4LmpwZw",
      overlay: "bg-black/40",
      titleClass: "text-white",
      subtitleClass: "text-amber-100",
    },
    {
      title: "Darks",
      subtitle: "Modern Elegance",
      image:
        "https://imgs.search.brave.com/pIqMbuUAsDaBuO864_xPnoBMnQ5b9s0CcKNKakO0VGE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGRicy5jb20uYXUv/d3AtY29udGVudC91/cGxvYWRzLzIwMjEv/MDgvZGFyay1zaWx2/ZXItZ3JleS1ob21l/c3RlYWQtc29saWQt/YnJpY2tzLmpwZw",
      overlay: "bg-black/40",
      titleClass: "text-white",
      subtitleClass: "text-slate-200",
    },
    {
      title: "Hamptons",
      subtitle: "Coastal Refined",
      image:
        "https://imgs.search.brave.com/cVKg0qRTU0NxldwO6Cj0GEndkVFr0J7T3AesG249Plo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9saXJw/LmNkbi13ZWJzaXRl/LmNvbS9kNjI0MTM3/Ny9kbXMzcmVwL211/bHRpL29wdC9wZ2gt/YnJpY2tzXy1zaG9y/ZWxpbmVfZWxraG9y/bl8yMzB4MTEweDc2/LTE5MjB3LmpwZw",
      overlay: "bg-black/30",
      titleClass: "text-white",
      subtitleClass: "text-white",
    },
    {
      title: "Yellows",
      subtitle: "Warm Glow",
      image:
        "https://imgs.search.brave.com/uZoo23saM2XVZkOG7JgFf9eAfS5eTJBW4ndwsABIfxc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi90ZXh0/dXJlLW1hZGUteWVs/bG93LW9sZC1icmlj/a3MtMTkxMzk2NDYz/LmpwZw",
      overlay: "bg-black/40",
      titleClass: "text-white",
      subtitleClass: "text-yellow-100",
    },
    {
      title: "Rumbled",
      subtitle: "Rustic Touch",
      image:
        "https://imgs.search.brave.com/5W55riRd3XbMGIZNmVld0Q-Pj89pE9dT98PDn1W1D3E/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9icmlj/ay5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjUvMDEvMjAx/OTA3MTVfRUNfTGVh/Y3JvZnQuanBn",
      overlay: "bg-black/40",
      titleClass: "text-white",
      subtitleClass: "text-amber-100",
    },
    {
      title: "Reclaimed",
      subtitle: "Heritage Appeal",
      image:
        "https://imgs.search.brave.com/N4Fq89jX423mKZQKCvj7UbvFfDhfG2OSEaO18Q4GrOg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzgyNzQwOTQvci9p/bC83Yzc0NTgvMTcw/NDIzOTMzMS9pbF82/MDB4NjAwLjE3MDQy/MzkzMzFfYWdtMy5q/cGc",
      overlay: "bg-black/35",
      titleClass: "text-white",
      subtitleClass: "text-stone-200",
    },
  ];

  useEffect(() => {
    const categoryQuery = searchParams.get("category");
    if (categoryQuery) {
      // This uses your existing handleFilterChange function
      handleFilterChange("category", categoryQuery);

      // Optional: Scroll to products section immediately when a category is selected via URL
      setTimeout(() => {
        if (productsRef.current) {
          productsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [searchParams]);

  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-stone-50 text-stone-800"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Jost:wght@300;400;500;600;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Jost', sans-serif; }
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(3deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(-2deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(4deg)} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slideInLeft { from{transform:translateX(-50px); opacity:0} to{transform:translateX(0); opacity:1} }
        @keyframes slideInRight { from{transform:translateX(50px); opacity:0} to{transform:translateX(0); opacity:1} }
        @keyframes slideInUp { from{transform:translateY(30px); opacity:0} to{transform:translateY(0); opacity:1} }
        @keyframes fadeInScale { from{opacity:0; transform:scale(0.9)} to{opacity:1; transform:scale(1)} }
        @keyframes textReveal { from{opacity:0; transform:translateY(10px)} to{opacity:1; transform:translateY(0)} }
        .slide-in-left { animation: slideInLeft 0.6s ease-out forwards !important; }
        .slide-in-right { animation: slideInRight 0.6s ease-out forwards !important; }
        .slide-in-up { animation: slideInUp 0.6s ease-out forwards !important; }
        .fade-in-scale { animation: fadeInScale 0.5s ease-out forwards !important; }
        .line-animation { position: relative; }
        .float-a { animation: floatA 5s ease-in-out infinite; }
        .float-b { animation: floatB 7s ease-in-out infinite 1s; }
        .float-c { animation: floatC 6s ease-in-out infinite 2.5s; }
        .float-d { animation: floatA 8s ease-in-out infinite 1.5s; }
        .spin-slow { animation: spinSlow 28s linear infinite; }
        .section-reveal { opacity:0; transform:translateY(40px); transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1); }
        .section-reveal.visible { opacity:1; transform:translateY(0); }
        .pulse-dot { animation: pulse 2s ease-in-out infinite; }
        @keyframes floatCard3D {
          0%,100% {
            transform: translateY(0) rotateX(var(--tilt-x, 4deg)) rotateY(var(--tilt-y, 6deg));
          }
          50% {
            transform: translateY(-8px) rotateX(var(--tilt-x-mid, 3deg)) rotateY(var(--tilt-y-mid, 5deg));
          }
        }
        @keyframes floatCard3DMobile {
          0%,100% { transform: translateY(0) rotateX(2deg) rotateY(3deg); }
          50% { transform: translateY(-4px) rotateX(1deg) rotateY(2deg); }
        }
        .brick-float-scene {
          perspective: 1320px;
          transform-style: preserve-3d;
        }
        .brick-float-card {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          will-change: transform;
          animation-name: floatCard3D;
          animation-duration: var(--float-duration, 5s);
          animation-delay: var(--float-delay, 0s);
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(0.42, 0, 0.2, 1);
          animation-fill-mode: both;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .brick-float-card:hover {
          animation-play-state: paused;
        }
        .brick-float-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16);
          opacity: 0;
          transition: opacity 0.35s ease-in-out;
          pointer-events: none;
        }
        .brick-float-card:hover::after {
          opacity: 1;
        }
        @keyframes heroGradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes heroTextShimmer {
          0%, 100% { text-shadow: 0 0 0 rgba(239, 68, 68, 0); }
          50% { text-shadow: 0 0 14px rgba(239, 68, 68, 0.28); }
        }
        .hero-gradient-shimmer {
          background-image: linear-gradient(90deg, #f87171, #ef4444, #b91c1c, #ef4444, #f87171);
          background-size: 220% 220%;
          animation: heroGradientShift 8s ease-in-out infinite;
        }
        .hero-text-shimmer {
          animation: heroTextShimmer 7.5s ease-in-out infinite;
        }
        @media (max-width: 768px) {
          .brick-float-scene {
            perspective: 1000px;
          }
          .brick-float-card {
            animation-name: floatCard3DMobile;
            animation-duration: 6s;
            border-color: rgba(255, 255, 255, 0.12);
          }
        }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.6)} }
        
        /* Button hover effects */
        button:not(:disabled) {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        button:disabled {
          cursor: not-allowed;
        }
        .hover-scale {
          transition: transform 0.2s ease;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
        .hover-scale:active {
          transform: scale(0.95);
        }
      `}</style>

        {/* Hero Section */}
        <section
          className="relative overflow-hidden pt-32 pb-20"
          style={{
            backgroundImage:
              "url(https://imgs.search.brave.com/sbXckuXlnnLcPxZ2osxS5ZyA9Os89QVDKBCEzjgOVcc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzM5LzcyLzAy/LzM2MF9GXzczOTcy/MDIyNV93STQxbVBn/aVR1M2JnMEFoQmJn/N2NrTW1vdXZsT2NO/NC5qcGc)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <BrickWall opacity={0.08} color="#8B4513" />

          {/* Background overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30 pointer-events-none" />

          <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 lg:pl-14 xl:pl-16 2xl:pl-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center lg:items-start">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, ease: heroEase }}
              >
                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
                  className="inline-block mb-8"
                >
                  <div className="flex items-center gap-3 bg-gradient-to-r from-red-50 to-transparent border border-red-200/60 rounded-full px-6 py-3">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 animate-pulse" />
                    <motion.span
                      className="text-xs font-bold tracking-widest text-red-700 uppercase inline-block"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.2,
                        ease: heroEase,
                      }}
                    >
                      Premium Selection | 40+ Years of Excellence
                    </motion.span>
                  </div>
                </motion.div>

                {/* Main Headline */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.75, ease: "easeOut" }}
                >
                  <motion.h1
                    className="font-serif text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.35, duration: 0.9, ease: "easeOut" }}
                  >
                    Exceptional Bricks <br className="hidden md:block" />
                    <motion.span
                      className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-orange-400"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.56,
                        duration: 0.75,
                        ease: "easeOut",
                      }}
                    >
                      Engineered for Excellence
                    </motion.span>
                  </motion.h1>
                </motion.div>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.65, duration: 0.8, ease: "easeOut" }}
                  className="text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-xl mb-8 line-animation"
                >
                  Discover our premium collection of 7 distinctive brick types,
                  each crafted for strength, durability, and timeless
                  architectural beauty.
                </motion.p>

                {/* Key Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.86, duration: 0.75, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row gap-8 mb-10 stats-container"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-2xl text-white">1000+</div>
                      <div className="text-sm text-white/70">
                        Satisfied Customers
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-2xl text-white">
                        7 Types
                      </div>
                      <div className="text-sm text-white/70">
                        Distinctive Colors
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Buttons with hover effects */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05, duration: 0.75, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full max-w-2xl -mt-3"
                >
                  <button
                    onClick={() => {
                      if (productsRef.current) {
                        productsRef.current.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                    className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xs sm:text-sm tracking-wide rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden whitespace-nowrap"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Explore All Products
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                  </button>
                  <button
                    onClick={() => navigate("/contact")}
                    className="group w-full sm:w-auto px-6 py-4 bg-white text-red-700 font-bold text-sm tracking-wide rounded-xl shadow-xl shadow-black/20 hover:bg-red-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Request Catalog
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                  </button>
                </motion.div>
              </motion.div>

              {/* Right - Visual Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative mt-10 lg:mt-24 w-full lg:max-w-[620px] lg:ml-auto flex flex-col"
              >
                <div className="absolute inset-8 bg-gradient-to-br from-red-200/25 via-amber-100/15 to-transparent rounded-[36px] blur-3xl pointer-events-none" />
                {/* Brick Color Preview Grid */}
                <motion.div
                  className="hidden lg:grid brick-float-scene relative z-10 grid grid-cols-2 lg:grid-cols-3 gap-x-7 lg:gap-x-8 gap-y-8 lg:gap-y-9 place-items-center content-start pr-2 lg:pr-8 xl:pr-10"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {brickCategoryCards.slice(0, 6).map((card, index) => {
                    return (
                      <motion.div
                        key={`${card.title}-shell`}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.65,
                          ease: "easeOut",
                          delay: 0.1 + index * 0.08,
                        }}
                        className={`w-full flex justify-center ${index >= 3 ? "lg:mt-8" : ""} ${index === 1 ? "lg:-mt-3 lg:z-10" : ""}`}
                      >
                        <motion.div
                          key={card.title}
                          whileHover={{
                            scale: 1.045,
                            y: -6,
                            rotateX: 1.2,
                            rotateY: 1.6,
                            boxShadow:
                              "0 30px 52px rgba(15, 23, 42, 0.36), 0 0 24px rgba(239, 68, 68, 0.2)",
                          }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="brick-float-card relative group overflow-hidden cursor-pointer"
                          style={{
                            "--tilt-x": `${3 + (index % 4)}deg`,
                            "--tilt-y": `${4 + ((index + 1) % 5)}deg`,
                            "--tilt-x-mid": `${2 + (index % 3)}deg`,
                            "--tilt-y-mid": `${3 + (index % 4)}deg`,
                            "--float-delay": `${(index % 4) * 0.5}s`,
                            "--float-duration": `${4.2 + (index % 3) * 0.6}s`,
                            width: "100%",
                            maxWidth: "160px",
                            aspectRatio: "1 / 1",
                            borderRadius: "18px",
                            backgroundImage: `url(${card.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            boxShadow:
                              "0 12px 24px rgba(15, 23, 42, 0.2), 0 4px 18px rgba(15, 23, 42, 0.12)",
                            transition:
                              "box-shadow 0.35s ease-in-out, transform 0.35s ease-in-out",
                          }}
                        >
                          <div className={`absolute inset-0 ${card.overlay}`} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-white/10 pointer-events-none" />
                          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-3">
                            <div
                              className={`font-serif text-xl font-bold ${card.titleClass}`}
                            >
                              {card.title}
                            </div>
                            <div
                              className={`text-xs font-semibold mt-1 ${card.subtitleClass}`}
                            >
                              {card.subtitle}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Floating accent box */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-40 pointer-events-none"
                />
              </motion.div>
            </div>
          </div>
          {/* Bottom divider */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 120"
              className="w-full h-auto"
            >
              <path
                fill="#f5f5f4"
                d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,53.3C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
              />
            </svg>
          </div>
        </section>

        {/* Products Section - Sidebar + Grid Layout */}
        <section ref={productsRef} className="py-20 relative scroll-smooth">
          <BrickWall opacity={0.05} color="#8B4513" />
          <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 relative z-10">
            {loading ? (
              <ProductSkeleton viewMode={viewMode} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 xl:gap-12">
                {/* Left Sidebar - Filters */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-1"
                >
                  <div className="sticky top-32">
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mb-8">
                      Filters
                    </h3>
                    <ProductFilters
                      filters={filters}
                      categories={categories}
                      onFilterChange={handleFilterChange}
                      onClearFilters={clearFilters}
                      viewMode={viewMode}
                      setViewMode={setViewMode}
                      sortBy={sortBy}
                      setSortBy={setSortBy}
                      totalProducts={filteredProducts.length}
                      totalAvailable={products.length}
                      isSidebar={true}
                    />
                  </div>
                </motion.div>

                {/* Right Content - Products Grid */}
                <div className="lg:col-span-3 lg:pl-6 xl:pl-10 2xl:pl-12">
                  {/* Results Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 flex justify-between items-center"
                  >
                    <div>
                      <motion.p
                        className="font-serif text-3xl font-bold text-stone-900 mb-2"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                      >
                        Our Collection
                      </motion.p>
                      <motion.p
                        className="text-stone-600"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        Showing{" "}
                        <motion.span
                          className="font-semibold text-stone-900"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                        >
                          {filteredProducts.length}
                        </motion.span>{" "}
                        of{" "}
                        <motion.span
                          className="font-semibold text-stone-900"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                        >
                          {products.length}
                        </motion.span>{" "}
                        products
                      </motion.p>
                    </div>

                    {filteredProducts.length === 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearFilters}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold hover:scale-105 active:scale-95"
                      >
                        Clear All Filters
                      </motion.button>
                    )}
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {filteredProducts.length > 0 ? (
                      <motion.div
                        key={`products-${filters.category}-${filters.applicationType}-${filters.searchQuery}-${viewMode}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: 20 }}
                        layout
                        className={
                          viewMode === "grid"
                            ? "grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-10 xl:gap-12 w-full"
                            : "flex flex-col gap-6 w-full"
                        }
                      >
                        {paginatedProducts.map((product) => (
                          <motion.div
                            key={product._id}
                            variants={itemVariants}
                            layout
                            transition={{ layout: { duration: 0.3 } }}
                            className="h-full"
                          >
                            <ProductCard
                              product={product}
                              viewMode={viewMode}
                            />
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
                          No Products Found
                        </h3>
                        <p className="text-stone-600 mt-2 max-w-md mx-auto">
                          Try adjusting your filters or explore our other
                          categories.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Pagination with hover effects */}
                  {filteredProducts.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-3 mt-12 flex-wrap"
                    >
                      {/* Previous Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          handlePageChange(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          currentPage === 1
                            ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700 hover:scale-105 active:scale-95"
                        }`}
                      >
                        ← Previous
                      </motion.button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1 flex-wrap justify-center">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1,
                        ).map((pageNum) => (
                          <motion.button
                            key={pageNum}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                              currentPage === pageNum
                                ? "bg-red-600 text-white shadow-lg shadow-red-200 hover:scale-110 active:scale-95"
                                : "bg-stone-100 text-stone-800 hover:bg-stone-200 hover:scale-110 active:scale-95"
                            }`}
                          >
                            {pageNum}
                          </motion.button>
                        ))}
                      </div>

                      {/* Next Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1),
                          )
                        }
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          currentPage === totalPages
                            ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700 hover:scale-105 active:scale-95"
                        }`}
                      >
                        Next →
                      </motion.button>

                      {/* Page Info */}
                      <div className="text-stone-600 font-medium ml-4 text-sm md:text-base">
                        Page {currentPage} of {totalPages} (
                        {filteredProducts.length} products)
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
