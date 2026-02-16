import { useState } from "react";
import blogData from "./blogData.js";
import FeaturedBlog from "./FeaturedBlog.jsx";
import SmallBlogCard from "./SmallBlogCard.jsx";
import { Search } from 'lucide-react';

const BlogSection = () => {
  const [search, setSearch] = useState("");

  const sortedBlogs = [...blogData].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const filteredBlogs = sortedBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.description.toLowerCase().includes(search.toLowerCase()),
  );

  const featured = filteredBlogs[0];
  const rest = filteredBlogs.slice(1);

  return (
    <>
      <section className="h-[60vh] bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden">
         <img
          src="https://www.mymodernhome.com/media/images/My_Modern_Home_Plan.2e16d0ba.fill-1920x1080.format-webp_Ip6STla.webp"
          alt="Contact banner"
          className="w-full h-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Centered text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight mb-6">
            Explore Our Latest 
            <span className="text-[#fd6828]"> Blogs </span>  
            & 
            <br /> Industry 
            <span className="text-[#F54900]"> Insights </span> 
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
           Discover informative blogs about brick manufacturing, modern construction practices, and eco-friendly building materials. Our articles are designed to help builders, contractors, and homeowners make smarter decisions.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 min-h-screen py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h1 className="text-4xl font-bold mb-4 md:mb-0">Blog Insights</h1>
            
           <div className="border border-gray-500 px-4 py-2 rounded-lg w-full md:w-72 focus:ring-2 focus:ring-blue-500 outline-none flex items-center gap-3">
             <Search size={15}/>
                <input
                type="text"
                placeholder="Search blog..."
                value={search}
                className="outline-none"
                onChange={(e) => setSearch(e.target.value)}
                />
           </div>
          </div>

          {/* Featured Blog */}
          {featured && (
            <div className="mb-16">
              <FeaturedBlog blog={featured} />
            </div>
          )}

          {/* Grid Blogs */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((blog) => (
              <SmallBlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSection;
