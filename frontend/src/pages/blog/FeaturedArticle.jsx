import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  Heart,
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
  Hammer
} from "lucide-react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { blogPosts } from "./blogData";

/* ================= PRIMARY BUTTON ================= */
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
const PrimaryButton = ({ children, onClick, className = "" }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`relative overflow-hidden group bg-gradient-to-r from-red-600 via-red-600 to-orange-600 
    hover:from-red-700 hover:to-orange-700 text-white font-semibold tracking-wide 
    px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 ${className}`}
  >
    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
    <span className="relative flex items-center justify-center gap-2">
      {children}
    </span>
  </motion.button>
);

const SecondaryButton = ({ children, onClick, className = "" }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`relative group text-red-600 hover:text-red-700 px-6 py-3 rounded-xl 
      font-medium transition-all duration-300 inline-flex items-center gap-2 border-2 border-red-200 hover:border-red-600 ${className}`}
  >
    {children}
  </motion.button>
);

/* ================= CATEGORY PILL ================= */
const CategoryPill = ({ category, count, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 
      ${active 
        ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
  >
    {category}
    {count > 0 && (
      <span className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs
        ${active ? 'bg-white text-red-600' : 'bg-red-600 text-white'}`}>
        {count}
      </span>
    )}
  </motion.button>
);

/* ================= FEATURED SLIDER - WIDER (90% SCREEN WIDTH) ================= */
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
    <div className="relative w-[1300px] mx-auto h-[600px] rounded-3xl overflow-hidden shadow-2xl group border border-white/20">
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

          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-12 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="max-w-3xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    <Sparkles size={14} /> Featured Story
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm border border-white/30">
                    #{currentIndex + 1} of {featuredPosts.length}
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {featuredPosts[currentIndex].title}
                </h2>

                <p className="text-lg md:text-xl text-white/80 mb-6 line-clamp-2 max-w-2xl">
                  {featuredPosts[currentIndex].excerpt}
                </p>

                <div className="flex items-center gap-4 mb-8 text-white/70">
                  <span className="flex items-center gap-2">
                    <User size={16} />
                    {featuredPosts[currentIndex].author}
                  </span>
                  <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {featuredPosts[currentIndex].date}
                  </span>
                  <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    5 min read
                  </span>
                </div>

                <PrimaryButton
                  onClick={() => onPostClick(featuredPosts[currentIndex].id)}
                  className="px-8 py-4 text-lg"
                >
                  Read Full Article <ArrowRight size={18} className="ml-2" />
                </PrimaryButton>
              </motion.div>
            </div>
          </div>

          {/* Category Tag */}
          <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/30">
            <span className="flex items-center gap-2">
              <Tag size={14} /> {featuredPosts[currentIndex].category}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={() => { setAutoplay(false); setDirection(-1); setCurrentIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-12 h-12 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10 flex items-center justify-center border border-white/30"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => { setAutoplay(false); setDirection(1); setCurrentIndex((prev) => (prev + 1) % featuredPosts.length); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-12 h-12 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10 flex items-center justify-center border border-white/30"
      >
        <ChevronRight size={24} />
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {featuredPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => { setAutoplay(false); setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }}
            className={`transition-all duration-300 ${
              index === currentIndex 
                ? 'w-10 h-2 bg-red-600' 
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
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
  const [liked, setLiked] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/blog/${post.id}`)}
      className="group bg-white rounded-2xl overflow-hidden 
      shadow-lg hover:shadow-2xl transition-all duration-500 
      border border-gray-100 hover:border-red-300 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg z-10">
          {post.category}
        </span>

        {post.trending && (
          <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg flex items-center gap-1 z-10">
            <Flame size={12} /> Trending
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-full text-white hover:bg-red-500 transition-all z-10"
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <User size={12} /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} /> 2.5k
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </motion.article>
  );
};

/* ================= MAIN BLOG ================= */
export default function Blog() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

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
  const visiblePosts = regularPosts.slice(0, visibleCount);
  const hasMore = visibleCount < regularPosts.length;

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 3);
      setIsLoading(false);
    }, 800);
  };

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

  return (
   <div className="relative min-h-screen bg-gray-50 flex flex-col overflow-hidden">

  {/* Subtle Brick Pattern Background */}
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

      {/* ================= HERO SECTION - FULL PAGE HEIGHT ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* New Hero Image - Construction Site with Bricks */}
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2070&q=100"
          alt="Construction Site with Bricks"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Very Light Overlay - Just enough for text readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Subtle Brick Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #8B4513 0px, #8B4513 2px, transparent 2px, transparent 12px)`,
            backgroundSize: '60px 60px'
          }}
        ></div>

        {/* Hero Content - No Stats */}
        <div className="relative z-10 text-center max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg mb-8"
            >
              <Sparkles className="w-5 h-5 text-red-600" />
              <span className="text-gray-800 text-sm font-medium tracking-wide">VR & SONS KNOWLEDGE HUB</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 drop-shadow-lg">
              Insights That Shape
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
                Modern Construction
              </span>
            </h1>

            {/* Rich Description */}
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover expert construction insights, material knowledge, sustainability trends, 
              and industry best practices from four decades of hands-on experience in the brick industry.
            </p>

            {/* CTA */}
            <div className="mt-10">
              <PrimaryButton
                onClick={() =>
                  window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
                }
                className="text-lg px-10 py-4"
              >
                Explore Articles <ArrowRight size={20} className="ml-2" />
              </PrimaryButton>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements - Construction Icons */}
        <div className="absolute bottom-10 left-10 text-white/10 hidden lg:block">
          <HardHat size={80} />
        </div>
        <div className="absolute top-10 right-10 text-white/10 hidden lg:block">
          <Hammer size={80} />
        </div>
        <div className="absolute bottom-10 right-10 text-white/10 hidden lg:block">
          <Building2 size={80} />
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* ================= SPACER ================= */}
      <div className="h-16"></div>

      {/* ================= FEATURED SECTION - WIDER (90% SCREEN WIDTH) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-3">
              <Star className="w-4 h-4 fill-red-600" />
              <span className="text-sm font-medium">Editor's Choice</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Stories</span>
            </h2>
            <p className="text-gray-500 mt-2">Hand-picked articles from our construction experts</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        <FeaturedSlider
          posts={blogPosts}
          onPostClick={(id) => navigate(`/blog/${id}`)}
        />
      </section>

      {/* ================= SEPARATOR ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200"></div>
      </div>

      {/* ================= ATTRACTIVE SEARCH + FILTER SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">All Articles</h3>
              <p className="text-gray-500">Browse our complete collection of construction insights</p>
            </div>

            {/* Attractive Search Bar */}
            <div className="w-full lg:w-96">
              <div className={`absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-2xl blur-xl transition-opacity ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className="relative flex items-center bg-gray-100 rounded-2xl border-2 border-transparent focus-within:border-red-600 transition-all">
                <Search size={20} className="absolute left-4 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search articles by title, author, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-12 pr-12 py-4 bg-transparent rounded-2xl outline-none text-gray-700"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-4 text-gray-400 hover:text-gray-600">
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
              <Filter size={16} /> Filter by Category
            </h4>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <CategoryPill
                  key={category}
                  category={category}
                  count={categoryCounts[category]}
                  active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                />
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== 'All' || searchQuery) && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200"
            >
              <span className="text-sm text-gray-500">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full text-red-600 text-sm border border-red-200">
                    {selectedCategory}
                    <X size={14} className="cursor-pointer hover:text-red-800" onClick={() => setSelectedCategory('All')} />
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full text-red-600 text-sm border border-red-200">
                    "{searchQuery}"
                    <X size={14} className="cursor-pointer hover:text-red-800" onClick={() => setSearchQuery('')} />
                  </span>
                )}
                <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-gray-700 underline">
                  Clear all
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ================= BLOG GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <SecondaryButton onClick={clearFilters}>
              Clear Filters
            </SecondaryButton>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-500">
                Showing <span className="font-semibold text-gray-800">{visiblePosts.length}</span> of{' '}
                <span className="font-semibold text-gray-800">{regularPosts.length}</span> articles
              </p>
              <span className="text-sm text-gray-400">Sort by: Latest</span>
            </div>

            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
              {visiblePosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <SecondaryButton onClick={loadMore} disabled={isLoading} className="px-10 py-4">
                  {isLoading ? (
                    <>
                      <Loader size={18} className="animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More Articles
                    </>
                  )}
                </SecondaryButton>
              </div>
            )}
          </>
        )}
      </section>

     

      <Footer />
      </div>
    </div>
    </div>
  );
}