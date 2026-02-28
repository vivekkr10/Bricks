import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Calendar,
  User,
  Tag,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  BookOpen,
  Quote,
  Filter,
  ChevronUp,
  Star,
  Award,
  Users,
  Eye,
  Clock,
  TrendingUp,
  Zap,
  Layers,
  Grid,
  List,
  Loader,
  Building2,
  HardHat,
  Hammer,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  ChevronDown,
  Home,
  BookMarked,
  Newspaper,
  FolderOpen
} from "lucide-react";

import Header from "../../Components/header";
import Footer from "../../Components/footer";
import { blogPosts } from "./blogData";

/* ================= BRICK WALL PATTERN ================= */
const BrickWall = ({ opacity = 0.1, color = "#8B4513" }) => (
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
        width="140"
        height="70"
        patternUnits="userSpaceOnUse"
      >
        <rect x="4" y="4" width="132" height="28" fill="none" stroke={color} strokeWidth="1.5" rx="4" opacity={opacity * 12} />
        <rect x="72" y="36" width="66" height="26" fill="none" stroke={color} strokeWidth="1.5" rx="4" opacity={opacity * 12} />
        <rect x="4" y="36" width="66" height="26" fill="none" stroke={color} strokeWidth="1.5" rx="4" opacity={opacity * 12} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#bwall-${color.replace("#", "")})`} opacity={opacity} />
  </svg>
);

/* ================= BUTTON COMPONENTS ================= */


const SecondaryButton = ({ children, onClick, className = "" }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`relative group text-red-700 hover:text-red-700 px-6 py-3 md:px-6 md:py-3 rounded-xl md:rounded-xl 
      font-medium transition-all duration-300 inline-flex items-center gap-2 border-2 border-red-200 hover:border-red-700 text-sm md:text-base ${className}`}
  >
    {children}
  </motion.button>
);

/* ================= CATEGORY DROPDOWN ================= */
const CategoryDropdown = ({ categories, selectedCategory, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-gray-700 text-sm md:text-base"
      >
        <span>{selectedCategory}</span>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 max-h-64 overflow-y-auto"
          >
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  onSelect(category);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-red-50 ${
                  selectedCategory === category 
                    ? 'bg-red-50 text-red-700 font-medium' 
                    : 'text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ================= FEATURED SLIDER ================= */
const FeaturedSlider = ({ posts, onPostClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const featuredPosts = posts.filter(p => p.featured).slice(0, 5);

  useEffect(() => {
    if (!autoplay || featuredPosts.length === 0) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % featuredPosts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay, featuredPosts.length]);

  const handlePrevious = () => {
    setAutoplay(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredPosts.length);
  };

  const handleDotClick = (index) => {
    setAutoplay(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    })
  };

  if (featuredPosts.length === 0) return null;

  return (
    <div className="
relative w-full 
h-[380px] sm:h-[420px] md:h-[500px] lg:h-[620px] 
overflow-hidden 
shadow-2xl 
group
">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <img
            src={featuredPosts[currentIndex].image}
            alt={featuredPosts[currentIndex].title}
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay */}
         <div className="
absolute inset-0 
bg-gradient-to-r 
from-black/80 via-black/50 to-transparent 
sm:from-black/70 sm:via-black/40
"></div> 

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="max-w-xl md:max-w-2xl"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                  <span className="inline-flex items-center gap-1 md:gap-2 bg-red-700 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-lg">
                    <Sparkles size={12} className="md:w-4 md:h-4" /> Featured Story
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm border border-white/30">
                    #{currentIndex + 1} of {featuredPosts.length}
                  </span>
                </div>

                <h2 className="text-xl md:text-3xl lg:text-4xl font-serif xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight line-clamp-2 md:line-clamp-3">
                  {featuredPosts[currentIndex].title}
                </h2>

                <p className="text-sm md:text-base lg:text-lg text-white/80 mb-4 md:mb-6 line-clamp-2 max-w-xl">
                  {featuredPosts[currentIndex].excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-8 text-white/70 text-xs md:text-sm">
                  <span className="flex items-center gap-1 md:gap-2">
                    <User size={12} className="md:w-4 md:h-4" />
                    {featuredPosts[currentIndex].author}
                  </span>
                  <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                  <span className="flex items-center gap-1 md:gap-2">
                    <Calendar size={12} className="md:w-4 md:h-4" />
                    {featuredPosts[currentIndex].date}
                  </span>
                  <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                  <span className="flex items-center gap-1 md:gap-2">
                    <Clock size={12} className="md:w-4 md:h-4" />
                    5 min read
                  </span>
                </div>

                <button
                  onClick={() => onPostClick(featuredPosts[currentIndex].id)}
                  className="bg-gradient-to-r from-red-700 to-red-700 hover:from-red-700 hover:to-red-800 
                    text-white font-semibold tracking-wide px-4 py-2 md:px-8 md:py-4 rounded-xl md:rounded-2xl shadow-xl 
                    hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2 text-sm md:text-base"
                >
                  Read Full Article <ArrowRight size={16} className="md:w-5 md:h-5" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Category Tag */}
          <div className="absolute top-3 right-3 md:top-6 md:right-6 bg-black/40 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-2 rounded-full border border-white/30">
            <span className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <Tag size={12} className="md:w-4 md:h-4" /> {featuredPosts[currentIndex].category}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Always visible */}
     {/* Left Arrow */}
<button
  onClick={handlePrevious}
  className="absolute left-4 sm:left-6 md:left-8 lg:left-10 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-9 h-9 sm:w-11 sm:h-11 lg:w-14 lg:h-14 rounded-full backdrop-blur-sm transition-all hover:scale-110 z-20 flex items-center justify-center"
>
  <ChevronLeft size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
</button>

{/* Right Arrow */}
<button
  onClick={handleNext}
  className="absolute right-4 sm:right-6 md:right-8 lg:right-10 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-9 h-9 sm:w-11 sm:h-11 lg:w-14 lg:h-14 rounded-full backdrop-blur-sm transition-all hover:scale-110 z-20 flex items-center justify-center"
>
  <ChevronRight size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
</button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          key={currentIndex}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
          className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
        />
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 md:gap-2 z-10">
        {featuredPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 ${
              index === currentIndex 
                ? 'w-6 h-1.5 md:w-10 md:h-2 bg-red-600' 
                : 'w-1.5 h-1.5 md:w-2 md:h-2 bg-white/50 hover:bg-white/80'
            } rounded-full`}
          />
        ))}
      </div>
    </div>
  );
};

/* ================= BLOG CARD ================= */
const BlogCard = ({ post, index }) => {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/blog/${post.id}`)}
      className="group bg-white rounded-xl md:rounded-2xl overflow-hidden 
      shadow-md hover:shadow-xl transition-all duration-500 
      border border-gray-100 hover:border-red-300 cursor-pointer"
    >
      <div className="relative h-40 md:h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <span className="absolute top-3 left-3 bg-red-700 text-white text-[10px] md:text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-full font-medium shadow-lg z-10">
          {post.category}
        </span>

        {post.trending && (
          <span className="absolute top-3 right-3 bg-red-700 text-white text-[10px] md:text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-full font-medium shadow-lg flex items-center gap-1 z-10">
            <Flame size={10} className="md:w-3 md:h-3" /> Trending
          </span>
        )}
      </div>

      <div className="p-3 md:p-5">
        <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-gray-500 mb-1 md:mb-2">
          <span className="flex items-center gap-1">
            <Calendar size={10} className="md:w-3 md:h-3" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <User size={10} className="md:w-3 md:h-3" /> {post.author}
          </span>
        </div>

        <h3 className="text-sm md:text-lg font-serif font-semibold mb-1 md:mb-2 group-hover:text-red-700 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </motion.article>
  );
};

/* ================= PAGINATION COMPONENT ================= */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage === 1) {
        pages.push(1, 2, '...', totalPages);
      } else if (currentPage === totalPages) {
        pages.push(1, '...', totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    return pages;
  };

  const handlePageClick = (page) => {
    if (typeof page === 'number') {
      onPageChange(page);
      // Scroll to blog section
      window.scrollTo({ top: 800, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mt-8 md:mt-12">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1.5 md:p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-red-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 transition-all"
      >
        <ChevronsLeft size={16} className="md:w-5 md:h-5" />
      </button>
      
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          disabled={page === '...'}
          className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs md:text-sm font-medium transition-all ${
            currentPage === page
              ? 'bg-red-700 text-white shadow-lg shadow-red-600/30'
              : page === '...'
              ? 'cursor-default bg-transparent text-gray-600'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-red-700 hover:text-white'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1.5 md:p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-red-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 transition-all"
      >
        <ChevronsRight size={16} className="md:w-5 md:h-5" />
      </button>
    </div>
  );
};

/* ================= MAIN BLOG ================= */
export default function Blog() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get page from URL or default to 1
  const queryParams = new URLSearchParams(location.search);
  const pageFromUrl = parseInt(queryParams.get('page')) || 1;
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const searchRef = useRef(null);

  const postsPerPage = 6;
  const categories = ["All", "Materials", "Brick Quality", "Sustainability", "Industry", "Eco-Friendly", "Construction Tips"];

  // Calculate category counts
  const categoryCounts = categories.reduce((acc, category) => {
    if (category === "All") {
      acc[category] = blogPosts.length;
    } else {
      acc[category] = blogPosts.filter(p => p.category === category).length;
    }
    return acc;
  }, {});

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const regularPosts = filteredPosts.filter(p => !p.featured);
  const totalRegularPosts = regularPosts.length;
  const totalPages = Math.ceil(totalRegularPosts / postsPerPage);

  // Get current page posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Update URL when page changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (currentPage > 1) {
      params.set('page', currentPage);
    } else {
      params.delete('page');
    }
    const newUrl = `${location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [currentPage, location.pathname]);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current page display text
  const getDisplayText = () => {
    if (totalRegularPosts === 0) return "No articles";
    return `Showing ${indexOfFirstPost + 1}-${Math.min(indexOfLastPost, totalRegularPosts)} of ${totalRegularPosts} articles`;
  };

  return (
    <div className="relative min-h-screen bg-stone-50 flex flex-col overflow-hidden">
      {/* Brick Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BrickWall opacity={0.05} color="#8B4513" />
        <div className="absolute inset-0 bg-stone-50/75"></div>
      </div>

      <div className="relative z-10 flex flex-col">
        {/* Scroll Progress */}
        <div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 z-50"
          style={{ width: `${scrollProgress}%` }}
        />

        <Header />

        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] lg:h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2070&q=100"
            alt="Construction Site with Bricks"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-black/40 md:bg-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/50 via-stone-950/40 via-20% to-transparent to-60%"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #8B4513 0px, #8B4513 2px, transparent 2px, transparent 12px)`,
              backgroundSize: '60px 60px'
            }}
          ></div>

          <div className="relative z-10 text-center max-w-5xl px-4 md:px-6 py-8 md:py-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg mb-4 md:mb-8"
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-red-700" />
                <span className="text-gray-800 text-xs md:text-sm font-medium font-serif tracking-wide">VR & SONS KNOWLEDGE HUB</span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif lg:text-6xl xl:text-7xl font-bold text-white mb-3 md:mb-6 drop-shadow-lg">
                Insights That Shape
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 mt-1 md:mt-2">
                  Modern Construction
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4 mb-4 md:mb-6">
                Discover expert construction insights, material knowledge, sustainability trends, 
                and industry best practices from four decades of hands-on experience in the brick industry.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mt-4 md:mt-8">
                <button
                  onClick={() =>
                    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
                  }
                  className="inline-flex items-center cursor-pointer px-6 py-3 bg-red-700 text-white font-bold font-sans text-xs uppercase tracking-wide rounded-xl hover:bg-red-800 transition-all duration-300  hover:-translate-y-1"
                >
                  Explore Articles <ArrowRight size={16}  />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="h-8 md:h-16"></div>

{/* ================= FEATURED SECTION ================= */}
<section className="relative w-full py-10 sm:py-12 md:py-16">

  {/* Heading Container */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-10">
    <div>
      <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 md:px-4 md:py-2 rounded-full mb-2 md:mb-3">
        <Star className="w-3 h-3 md:w-4 md:h-4 fill-red-700" />
        <span className="text-xs md:text-sm font-medium">
          Editor's Choice
        </span>
      </div>

      <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-800">
        Featured{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-600">
          Stories
        </span>
      </h2>

      <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">
        Hand-picked articles from our construction experts
      </p>
    </div>
  </div>

  {/* Slider With Side Spacing */}
  <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
    <FeaturedSlider
      posts={blogPosts}
      onPostClick={(id) => navigate(`/blog/${id}`)}
    />
  </div>

</section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200"></div>
        </div>

        {/* ================= SEARCH + FILTER SECTION ================= */}
<section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-8 sm:py-10">
  <div className="max-w-7xl mx-auto">
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 px-4 md:px-6 py-3 rounded-t-xl md:rounded-t-2xl">
        <h3 className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
          <Filter size={16} className="md:w-4 md:h-4" />
          Find Articles
        </h3>
      </div>

      {/* 2-Line Filter Content */}
      <div className="p-4 md:p-5">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Line 1: Search + Quick Links (moved to left) */}
          <div className="flex-1 flex flex-col sm:flex-row gap-3">
            {/* Search - Compact */}
            <div className="flex-1">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 outline-none focus:outline-none focus:ring-0"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Category Pills - Moved here from Line 2 */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500 mr-1 whitespace-nowrap">Quick:</span>
              {categories.slice(0, 4).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all outline-none focus:outline-none focus:ring-0 whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                  {cat !== 'All' && ` (${categoryCounts[cat] || 0})`}
                </button>
              ))}
            </div>
          </div>

          {/* Line 2: Results Count Only (moved to right) */}
          <div className="flex items-center justify-end gap-2">
            <span className="text-xs text-gray-500">
              <span className="font-semibold text-red-600">{filteredPosts.length}</span> articles
            </span>
            
            {/* Active Filters (if any) */}
            {(selectedCategory !== 'All' || searchQuery) && (
              <div className="flex items-center gap-1">
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded-md text-xs border border-red-200">
                    {selectedCategory}
                    <button 
                      onClick={() => setSelectedCategory('All')}
                      className="outline-none focus:outline-none focus:ring-0"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded-md text-xs border border-red-200">
                    "{searchQuery}"
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="outline-none focus:outline-none focus:ring-0"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                <button 
                  onClick={clearFilters}
                  className="text-xs text-gray-500 hover:text-gray-700 underline outline-none focus:outline-none focus:ring-0"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        {/* ================= BLOG GRID WITH PAGINATION ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 md:py-20 bg-white rounded-2xl md:rounded-3xl shadow-lg">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="md:w-8 md:h-8 text-gray-400" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
              <p className="text-sm md:text-base text-gray-500 mb-4 md:mb-6">Try adjusting your search or filter criteria</p>
              <SecondaryButton onClick={clearFilters}>
                Clear Filters
              </SecondaryButton>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 md:mb-8">
                <p className="text-xs md:text-sm text-gray-500">
                  {getDisplayText()}
                </p>
              </div>

              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4 md:gap-6 lg:gap-8`}>
                {currentPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </section>
        <Footer />
      </div>

    
    </div>
  );
}