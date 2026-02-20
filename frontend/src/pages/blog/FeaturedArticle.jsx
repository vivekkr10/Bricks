import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= BRICK WALL PATTERN ================= */
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

/* ================= FEATURED ARTICLE COMPONENT ================= */
export default function FeaturedArticle() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white text-white"
    >
      {/* ================= HERO SECTION ================= */}
      <section className="w-full py-8 px-6">
        <div className="max-w-8xl mx-auto">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <img
              src="https://i.pinimg.com/1200x/c5/21/59/c521594136d1b7d4453996db7424c915.jpg"
              alt="Fly Ash Brick"
              className="w-full h-[500px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90"></div>

            <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16">
              <span className="bg-orange-500 text-xs font-semibold px-4 py-1 rounded-full w-fit uppercase tracking-wider">
                Sustainability Feature
              </span>

              <h1 className="mt-6 text-3xl md:text-5xl font-bold max-w-3xl">
                Sustainable Construction: Why Fly Ash Bricks are the Future
              </h1>

              <p className="text-gray-300 mt-6 max-w-2xl">
                Discover how fly ash bricks are revolutionizing the construction industry with superior durability and eco-friendly properties.
              </p>

              <div className="flex items-center gap-6 mt-8">
                <button className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-lg font-medium">
                  Read Featured Article →
                </button>
                <span className="text-gray-400 text-sm">8 min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= LATEST INSIGHTS SECTION ================= */}
      {/* <section className="relative py-5 px-6 ml-115.5 bg-[white]"> */}
      <section className="relative py-5 px-6 bg-white">
        {/* Brick Pattern Background */}
        <BrickWall opacity={0.05} color="#8B4513" />

        {/* <div className="relative max-w-10xl mx-auto grid lg:grid-cols-3 gap-12"> */}
        <div className="relative max-w-7xl mx-auto">
          {/* LEFT BLOG GRID */}
          {/* <div className="lg:col-span-2"> */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold">
                <span className="text-gray-400">LATEST </span>
                <span className="text-orange-500">INSIGHTS</span>
              </h2>
            </div>

            
            <div className="space-y-8">
            <div className="bg-[#2a1a13] p-6 rounded-xl">
              <h3 className="font-semibold mb-4 text-orange-500">SEARCH</h3>
              <input
                type="text"
                placeholder="Search insights..."
                className="w-full bg-[#1a120b] border border-gray-700 px-4 py-2 rounded-lg focus:outline-none"
              />
            </div> 



            <div className="bg-[#2a1a13] p-6 rounded-xl">
              <h3 className="font-semibold mb-4 text-orange-500">CATEGORIES</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex justify-between hover:text-orange-500 cursor-pointer">
                  Materials <span>12</span>
                </li>
                <li className="flex justify-between text-orange-500">
                  Brick Quality <span>8</span>
                </li>
                <li className="flex justify-between hover:text-orange-500 cursor-pointer">
                  Sustainability <span>15</span>
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "5 Essential Brick Quality Standards You Must Know",
                  image:
                    "https://i.pinimg.com/736x/7a/45/16/7a4516adc67529f95fc4cc7abbf277fa.jpg",
                  tag: "QUALITY",
                },
                {
                  title:
                    "The Different Types of Bricks Used in Modern Construction",
                  image:
                    "https://i.pinimg.com/736x/03/35/3d/03353d6f8b4082aad4089e4117c39ced.jpg",
                  tag: "TYPES",
                },
                {
                  title:
                    "Eco-Friendly Materials for Sustainable Buildings",
                  image:
                    "https://i.pinimg.com/736x/e7/dd/31/e7dd31cb8ddf5b822caccae11b0e2ebd.jpg",
                  tag: "ECO-FRIENDLY",
                },
                {
                  title: "Top Masonry Trends to Watch in 2024",
                  image:
                    "https://i.pinimg.com/1200x/24/63/23/246323f121d9cb00b355371b1329963a.jpg",
                  tag: "INDUSTRY",
                },
                {
                  title:
                    "Eco-Friendly Materials for Sustainable Buildings",
                  image:
                    "https://i.pinimg.com/736x/e7/dd/31/e7dd31cb8ddf5b822caccae11b0e2ebd.jpg",
                  tag: "ECO-FRIENDLY",
                },
                {
                  title: "Top Masonry Trends to Watch in 2024",
                  image:
                    "https://i.pinimg.com/1200x/24/63/23/246323f121d9cb00b355371b1329963a.jpg",
                  tag: "INDUSTRY",
                },
              ].map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedPost(post)}
                  className="bg-[#2a1a13] cursor-pointer rounded-xl overflow-hidden transition duration-300 shadow-lg"
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt=""
                      className="h-56 w-full object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-orange-500 text-xs px-3 py-1 rounded font-semibold">
                      {post.tag}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-4 text-white">
                      {post.title}
                    </h3>
                    <button className="text-orange-500 font-medium hover:underline">
                      READ MORE →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          {/* <div className="space-y-8">
            <div className="bg-[#2a1a13] p-6 rounded-xl">
              <h3 className="font-semibold mb-4 text-orange-500">SEARCH</h3>
              <input
                type="text"
                placeholder="Search insights..."
                className="w-full bg-[#1a120b] border border-gray-700 px-4 py-2 rounded-lg focus:outline-none"
              />
            </div> */}

            {/* <div className="bg-[#2a1a13] p-6 rounded-xl">
              <h3 className="font-semibold mb-4 text-orange-500">CATEGORIES</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex justify-between hover:text-orange-500 cursor-pointer">
                  Materials <span>12</span>
                </li>
                <li className="flex justify-between text-orange-500">
                  Brick Quality <span>8</span>
                </li>
                <li className="flex justify-between hover:text-orange-500 cursor-pointer">
                  Sustainability <span>15</span>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </section>

      {/* ================= BLOG DETAIL POPUP ================= */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 overflow-y-auto"
          >
            <motion.div
              className="bg-[#2a1a13] max-w-4xl w-full rounded-2xl p-8 relative text-gray-300"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-5 right-6 text-white text-2xl"
              >
                ✕
              </button>

              <h2 className="text-3xl font-bold text-orange-500 mb-6">
                {selectedPost.title}
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}