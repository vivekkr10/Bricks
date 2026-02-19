import React, { useState } from "react";

export default function FeaturedArticle() {

  const [selectedPost, setSelectedPost] = useState(null);

  return (

    <div className="bg-white text-white">

      {/* ================= HERO SECTION ================= */}
      <section className="w-full py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
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

                <span className="text-gray-400 text-sm">
                  8 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LATEST INSIGHTS SECTION ================= */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">

          {/* LEFT BLOG GRID */}
          <div className="lg:col-span-2">

            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold">
                <span className="text-gray-400">LATEST </span>
                <span className="text-orange-500">INSIGHTS</span>
              </h2>
            </div>

            {/* Blog Cards */}
            <div className="grid md:grid-cols-2 gap-8">

              {[
                {
                  title: "5 Essential Brick Quality Standards You Must Know",
                  image: "https://i.pinimg.com/736x/7a/45/16/7a4516adc67529f95fc4cc7abbf277fa.jpg",
                  tag: "QUALITY"
                },
                {
                  title: "The Different Types of Bricks Used in Modern Construction",
                  image: "https://i.pinimg.com/736x/03/35/3d/03353d6f8b4082aad4089e4117c39ced.jpg",
                  tag: "TYPES"
                },
                {
                  title: "Eco-Friendly Materials for Sustainable Buildings",
                  image: "https://i.pinimg.com/736x/e7/dd/31/e7dd31cb8ddf5b822caccae11b0e2ebd.jpg",
                  tag: "ECO-FRIENDLY"
                },
                {
                  title: "Top Masonry Trends to Watch in 2024",
                  image: "https://i.pinimg.com/1200x/24/63/23/246323f121d9cb00b355371b1329963a.jpg",
                  tag: "INDUSTRY"
                }

              ].map((post, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPost(post)}
                  className="bg-[#2a1a13] cursor-pointer rounded-xl overflow-hidden hover:scale-[1.02] transition duration-300 shadow-lg"
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
                </div>
              ))}

            </div>
          </div>

          {/* RIGHT SIDEBAR */}
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

            <div className="bg-orange-500 p-8 rounded-xl text-black">
              <h3 className="text-xl font-bold mb-4">ASK A MASONRY EXPERT</h3>
              <p className="mb-6">
                Need technical specifications for your next build?
                Our engineers are here to help.
              </p>
              <button className="bg-black text-white px-5 py-3 rounded-lg">
                GET PROFESSIONAL ADVICE
              </button>
            </div>

            <div className="bg-[#2a1a13] p-6 rounded-xl">
              <h3 className="font-semibold mb-4 text-orange-500">POPULAR TAGS</h3>
              <div className="flex flex-wrap gap-3">
                {["BRICKS","CEMENT","MODERN","ECO","CIVIL","SAFETY"].map((tag, i) => (
                  <span key={i} className="bg-[#1a120b] px-3 py-1 rounded-lg text-sm hover:bg-orange-500 cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= BLOG DETAIL POPUP ================= */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 overflow-y-auto">
          <div className="bg-[#2a1a13] max-w-4xl w-full rounded-2xl p-8 relative text-gray-300">

            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-6 text-white text-2xl"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-orange-500 mb-6">
              {selectedPost.title}
            </h2>

            <div className="space-y-8 leading-relaxed">

              <div>
                <h3 className="text-xl font-semibold text-orange-200 mb-3">
                  Types of Bricks Used in Construction
                </h3>
                <p>
                  The construction industry uses several types of bricks such as burnt clay bricks,
                  fly ash bricks, concrete bricks, engineering bricks, and sand lime bricks.
                  Each type offers different levels of compressive strength, durability,
                  insulation, and cost efficiency depending on project requirements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-200 mb-3">
                  Advantages of Fly Ash Bricks
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>High compressive strength and durability</li>
                  <li>Low water absorption rate</li>
                  <li>Environment friendly and sustainable</li>
                  <li>Better thermal insulation properties</li>
                  <li>Uniform shape and smooth finish</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-200 mb-3">
                  Brick Quality Standards
                </h3>
                <p>
                  Quality bricks must have uniform dimensions, sharp edges,
                  minimum compressive strength of 3.5 N/mm²,
                  water absorption less than 20%, and should produce
                  a clear ringing sound when struck together.
                  They must be free from cracks and major surface flaws.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-200 mb-3">
                  Sustainable Construction Materials
                </h3>
                <p>
                  Sustainable construction materials include fly ash bricks, AAC blocks,
                  recycled steel, bamboo, green concrete, and natural insulation materials.
                  These materials reduce environmental impact, improve energy efficiency,
                  and support eco-friendly infrastructure development.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
