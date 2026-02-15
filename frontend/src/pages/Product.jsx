import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Download, Phone, Award, Leaf, Shield, Zap } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";

/* Text Animation Component - Letter by Letter Reveal */
function AnimatedText({ text, className = "", delay = 0 }) {
  const letters = text.split("");
  return (
    <motion.div className={className}>
      {letters.map((letter, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.05,
            delay: delay + idx * 0.03,
          }}
          style={{ display: letter === " " ? "inline" : "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* Word Stagger Animation */
function AnimatedWords({ text, className = "", delay = 0 }) {
  const words = text.split(" ");
  return (
    <motion.div className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: delay + idx * 0.08,
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

const shadeFilters = [
  "Classic Reds",
  "Multies",
  "Darks",
  "Hamptons",
  "Yellows",
  "Rumbled",
  "Reclaimed",
];

const productsData = [
  { id: 1, code: "T001", name: "Crown Red Orange", category: "Classic Reds", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea", description: "Heritage Blend represents the timeless beauty of hand-crafted brickwork." },
  { id: 2, code: "T002", name: "Heritage Blend", category: "Classic Reds", image: "https://images.unsplash.com/photo-1590608897129-79da98d15969", description: "Classic red brick with authentic terracotta finish." },
  { id: 3, code: "T003", name: "Old Colonial Mix", category: "Darks", image: "https://images.unsplash.com/photo-1582582494700-7c6f46d7c4f6", description: "Deep, sophisticated dark shade for modern architecture." },
  { id: 4, code: "T004", name: "Burgundy Heritage", category: "Darks", image: "https://images.unsplash.com/photo-1600485674646-ee6a5bf2b84e", description: "Rich burgundy tones that enhance architectural elegance." },
  { id: 5, code: "T005", name: "Soft Terracotta", category: "Yellows", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea", description: "Warm golden yellows bringing warmth to facades." },
  { id: 6, code: "T006", name: "Hampton Grey", category: "Hamptons", image: "https://images.unsplash.com/photo-1590608897129-79da98d15969", description: "Sophisticated grey tones with subtle texture variations." },
  { id: 7, code: "T007", name: "Rumbled Blend", category: "Rumbled", image: "https://images.unsplash.com/photo-1582582494700-7c6f46d7c4f6", description: "Textured finish with character and depth." },
  { id: 8, code: "T008", name: "Reclaimed Vintage", category: "Reclaimed", image: "https://images.unsplash.com/photo-1600485674646-ee6a5bf2b84e", description: "Aged appearance with historical authenticity." },
  { id: 9, code: "T009", name: "Multi Classic", category: "Multies", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea", description: "Multi-colored blend for dynamic architectural expression." },
];

/* Reusable Sticky Header */
function StickyHeader() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-40"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-light tracking-widest text-gray-900">BRICKS</h1>
        <nav className="hidden md:flex gap-8 text-xs tracking-widest text-gray-600">
          <button className="hover:text-gray-900 transition">Collections</button>
          <button className="hover:text-gray-900 transition">About</button>
          <button className="hover:text-gray-900 transition">Contact</button>
        </nav>
      </div>
    </motion.header>
  );
}

/* Hero Banner */
function HeroBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-96 md:h-[28rem] overflow-hidden bg-gray-950"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl"
        >
          <div className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide text-white mb-6 leading-tight">
            <AnimatedText text="India's Largest" delay={0.3} className="block" />
            <AnimatedText text="Exposed Brick Collection" delay={0.8} className="block" />
          </div>
          <AnimatedWords 
            text="Premium handcrafted bricks for architectural excellence"
            className="text-base md:text-lg text-gray-200 font-light tracking-wide max-w-2xl mx-auto mb-8"
            delay={1.5}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-px w-16 bg-gradient-to-r from-transparent via-white to-transparent"
        />
      </div>
    </motion.div>
  );
}

/* Sticky Side Buttons */
function FixedSideButtons() {
  const buttonVariants = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0 },
  };

  const handleDownloadBrochure = () => {
    alert("Brochure download initiated. Check your downloads folder!");
  };

  const handleRequestCallback = () => {
    alert("Thank you for your interest! A representative will contact you shortly.");
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.15, delayChildren: 1.2 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 space-y-4 z-30"
    >
      <motion.button
        variants={buttonVariants}
        whileHover={{ x: -6, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={handleDownloadBrochure}
        className="w-14 h-14 bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 shadow-lg border border-gray-600 transition duration-300 group"
        title="Download Brochure"
      >
        <Download size={24} className="group-hover:scale-110 transition duration-300" />
      </motion.button>
      <motion.button
        variants={buttonVariants}
        whileHover={{ x: -6, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={handleRequestCallback}
        className="w-14 h-14 bg-[#c8a882] text-white flex items-center justify-center hover:bg-[#b89870] shadow-lg border border-gray-300 transition duration-300 group"
        title="Request Call Back"
      >
        <Phone size={24} className="group-hover:scale-110 transition duration-300" />
      </motion.button>
    </motion.div>
  );
}

/* Premium Footer */
function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-900 text-gray-300 mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h4 className="text-white text-sm tracking-widest font-light mb-6">BRICKS</h4>
          <p className="text-xs leading-relaxed text-gray-400">
            Curating India's finest exposed brick collection for architectural excellence since decades.
          </p>
        </div>
        <div>
          <h5 className="text-white text-xs tracking-widest font-light mb-4">COLLECTIONS</h5>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="#" className="hover:text-gray-200 transition">Classic Reds</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Heritage Blends</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Reclaimed Legacy</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white text-xs tracking-widest font-light mb-4">INFORMATION</h5>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="#" className="hover:text-gray-200 transition">About Us</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Specifications</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white text-xs tracking-widest font-light mb-4">CONTACT</h5>
          <p className="text-xs text-gray-400 leading-relaxed">
            <span className="block">+91 XXXX XXXX XX</span>
            <span className="block mt-2">info@bricksco.in</span>
          </p>
        </div>
      </div>
      <div className="border-t border-gray-800 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center text-xs text-gray-500">
        <p>&copy; 2024 Premium Bricks. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-gray-300 transition">Privacy</a>
          <a href="#" className="hover:text-gray-300 transition">Terms</a>
        </div>
      </div>
    </motion.footer>
  );
}

function ProductsPage() {
  const [selectedShades, setSelectedShades] = useState([]);
  const [tempSelectedShades, setTempSelectedShades] = useState([]);
  const navigate = useNavigate();

  const filteredProducts = selectedShades.length === 0 
    ? productsData
    : productsData.filter((product) => selectedShades.includes(product.category));

  const handleShadeChange = (shade) => {
    if (tempSelectedShades.includes(shade)) {
      setTempSelectedShades(tempSelectedShades.filter(s => s !== shade));
    } else {
      setTempSelectedShades([...tempSelectedShades, shade]);
    }
  };

  const handleApplyFilters = () => {
    setSelectedShades(tempSelectedShades);
  };

  const handleClearAll = () => {
    setTempSelectedShades([]);
    setSelectedShades([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroBanner />

      <div className="flex max-w-7xl mx-auto px-6 py-20 gap-12 lg:gap-20">
        {/* Left Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-80 hidden lg:block flex-shrink-0"
        >
          {/* Shade/Colour Section */}
          <div className="mb-16">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#c8a882] text-white px-6 py-4 text-xs tracking-widest font-light mb-6 shadow-sm"
            >
              <AnimatedText text="SHADE / COLOUR" />
            </motion.div>
            <div className="space-y-3 bg-white p-7 border border-gray-150 shadow-sm">
              <motion.button
                onClick={handleClearAll}
                className="w-full text-left px-3 py-2 text-sm text-[#c8a882] font-light hover:bg-[#f5f3f0] transition duration-200 rounded mb-2"
              >
                Clear All Filters
              </motion.button>
              <div className="h-px bg-gray-200" />
              {shadeFilters.map((shade, idx) => (
                <motion.label 
                  key={shade} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-center gap-3 cursor-pointer group py-2 px-2 hover:bg-[#f5f3f0] rounded transition duration-200"
                >
                  <input
                    type="checkbox"
                    checked={tempSelectedShades.includes(shade)}
                    onChange={() => handleShadeChange(shade)}
                    className="w-4 h-4 accent-[#c8a882] cursor-pointer rounded"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-[#c8a882] transition duration-300 font-light">
                    <AnimatedText text={shade} delay={0.05} />
                  </span>
                </motion.label>
              ))}
              <div className="h-px bg-gray-200 my-4" />
              <motion.button
                onClick={handleApplyFilters}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="w-full bg-[#c8a882] text-white px-4 py-3 text-xs tracking-widest font-light rounded shadow-sm hover:bg-[#b89968] transition duration-300"
              >
                <AnimatedText text="APPLY FILTERS" delay={0.1} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Right Content Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 min-w-0"
        >
          {/* Section Title */}
          <div className="mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-6 mb-8"
            >
              <div className="h-px flex-1 bg-gray-250" />
              <h2 className="text-xs tracking-widest text-gray-500 font-light whitespace-nowrap">
                <AnimatedText text="TIMELESS COLLECTION" />
              </h2>
              <div className="h-px flex-1 bg-gray-250" />
            </motion.div>
            <AnimatedWords 
              text="Premium brick selections that embody architectural heritage and authentic craftsmanship. Each collection tells a story of durability and refined aesthetics."
              className="text-gray-600 text-base leading-relaxed font-light max-w-xl"
              delay={0.3}
            />
          </div>

          {/* Products Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/products/${product.id}`)}
                className="group cursor-pointer"
              >
                {/* Product Card */}
                <div className="bg-white overflow-hidden transition duration-300 hover:shadow-2xl border border-gray-100 hover:border-gray-300">
                  {/* Image Container */}
                  <div className="relative w-full h-80 overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
                    />
                    {/* Category Tag */}
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="absolute top-5 right-5 bg-[#c8a882]/95 text-white px-4 py-2 text-xs tracking-widest font-light shadow-lg"
                    >
                      {product.category}
                    </motion.div>
                  </div>

                  {/* Card Body */}
                  <div className="p-7 bg-white">
                    <div className="mb-4">
                      <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xs tracking-widest text-[#c8a882] font-light mb-3"
                      >
                        {product.code}
                      </motion.p>
                      <motion.h3 
                        whileHover={{ color: "#c8a882" }}
                        className="text-lg font-light tracking-wide text-gray-900 group-hover:text-[#c8a882] transition duration-300 leading-tight min-h-[1.5em]"
                      >
                        <AnimatedText text={product.name} delay={0.1} />
                      </motion.h3>
                    </div>
                    <motion.div 
                      className="flex items-center justify-between pt-5 border-t border-gray-150"
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-xs text-gray-500 font-light">Explore</span>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-[#c8a882] transition duration-300" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 font-light">No products found for this shade.</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Fixed Side Buttons */}
      <FixedSideButtons />
    </div>
  );
}

/* Brick Colour Harmony Component */
function BrickColourHarmony() {
  const harmonyVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-b from-white via-[#fafaf8] to-[#f5f3f0] py-28"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-light tracking-wide text-gray-900 mb-6 leading-tight">
            <AnimatedText text="Brick Colour Harmony" delay={0.1} />
          </h2>
          <AnimatedWords 
            text="Explore complementary brick combinations that create architectural balance and aesthetic cohesion for your projects."
            className="text-gray-600 text-base font-light max-w-2xl mx-auto leading-relaxed"
            delay={0.5}
          />
        </motion.div>

        <motion.div
          variants={harmonyVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {shadeFilters.map((shade, idx) => (
            <motion.div
              key={shade}
              variants={itemVariants}
              whileHover={{ scale: 1.04, y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative rounded overflow-hidden shadow-lg cursor-pointer group h-64"
            >
              <img
                src={productsData[idx % productsData.length].image}
                alt={shade}
                className="h-full w-full object-cover group-hover:scale-125 transition-transform duration-700"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/80 group-hover:via-black/50 transition duration-500" />
              
              {/* Content Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <h3 className="text-white text-xl tracking-widest font-light mb-2 text-center px-4">
                  <AnimatedText text={shade} delay={0.05} />
                </h3>
                <p className="text-gray-300 text-xs opacity-0 group-hover:opacity-100 transition duration-300">
                  <AnimatedWords text="Explore Collection" delay={0.15} />
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* Product Details Page */
function ProductDetails() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600">Product Not Found</p>
      </div>
    );
  }

  const features = [
    { icon: Award, label: "Traditional Appeal" },
    { icon: Shield, label: "Fire Resistant" },
    { icon: Leaf, label: "Sustainable" },
    { icon: Zap, label: "Authentic Finish" },
  ];

  return (
      <div className="min-h-screen bg-white scroll-smooth">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-24 items-center">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center"
        >
          <div className="w-full rounded shadow-xl border border-gray-200 overflow-hidden group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          </div>
        </motion.div>

        {/* Right: Details */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col justify-center"
        >
          {/* Brick Code */}
          <div className="mb-10">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs tracking-widest text-[#c8a882] font-light mb-3"
            >
              PRODUCT CODE
            </motion.p>
            <div className="text-6xl font-light text-gray-900 tracking-wide leading-tight overflow-hidden">
              <AnimatedText text={product.code} delay={0.4} />
            </div>
          </div>

          {/* Product Name */}
          <div className="text-3xl font-light tracking-wide text-gray-900 mb-12 leading-relaxed">
            <AnimatedText text={product.name} delay={0.8} />
          </div>

          {/* Description Tab */}
          <div className="mb-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#e8dcc8] px-6 py-4 text-xs tracking-widest font-light text-gray-800 mb-8 shadow-sm"
            >
              Description
            </motion.div>

            {/* Features List */}
            <ul className="space-y-4 mb-10">
              {[
                "Traditional appeal with timeless aesthetics",
                "Authentic terracotta finish for genuine charm",
                "Fire resistant certified for safety",
                "Sustainable production and environmentally conscious"
              ].map((feature, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  className="flex items-start gap-4 text-gray-700"
                >
                  <span className="text-[#c8a882] font-light mt-1">•</span>
                  <span className="text-base font-light leading-relaxed">
                    <AnimatedWords text={feature} delay={0.5 + idx * 0.1} />
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Long Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-gray-600 text-base leading-relaxed font-light mb-10"
            >
              <AnimatedWords 
                text={`${product.description} Premium handcrafted brick designed for architectural excellence. Combines aesthetic refinement with long-lasting durability, perfect for residential and commercial façades. Each brick is meticulously crafted to ensure consistent quality and authentic character that enhances any architectural design.`}
                delay={0.9}
              />
            </motion.p>
          </div>

          {/* Features Icon Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="grid grid-cols-4 gap-4 mb-12 py-10 border-t border-b border-gray-200"
          >
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group"
                >
                  <div className="flex justify-center mb-3">
                    <IconComponent size={28} className="text-[#c8a882] group-hover:scale-110 transition duration-300" />
                  </div>
                  <p className="text-xs text-gray-700 font-light leading-tight">{feature.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => alert(`Sample requested for ${product.name}! We'll contact you shortly.`)}
              className="flex-1 bg-[#c8a882] text-white px-8 py-4 text-sm tracking-widest font-light hover:bg-[#b89870] transition duration-300 shadow-lg cursor-pointer"
            >
              REQUEST SAMPLE
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => alert(`Specifications for ${product.code}: ${product.name}\n\nDimensions: Standard Brick\nColor: ${product.category}\nFire Rating: A1\nSustainability: Certified`)}
              className="flex-1 border-2 border-[#c8a882] text-[#c8a882] px-8 py-4 text-sm tracking-widest font-light hover:bg-[#c8a882] hover:text-white transition duration-300 cursor-pointer"
            >
              SPECIFICATIONS
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Brick Colour Harmony Section */}
      <BrickColourHarmony />

      {/* Fixed Side Buttons */}
      <FixedSideButtons />
    </div>
  );
}

/* ---------------- MAIN APP ---------------- */

export default function BricksApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}
