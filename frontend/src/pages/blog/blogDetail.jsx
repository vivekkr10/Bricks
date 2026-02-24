import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Tag, 
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  ChevronRight,
  Sparkles,
  Heart,
  MessageCircle,
  BookOpen,
  Clock,
  Eye
} from 'lucide-react';
import Header from '../../Components/Header.jsx';
import Footer from '../../Components/Footer';
import { blogPosts } from './blogData';

const PrimaryButton = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`bg-gradient-to-r from-red-700 to-red-700 hover:from-red-700 hover:to-red-800 
      text-white font-semibold tracking-wide px-6 py-3 rounded-lg shadow-lg 
      hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${className}`}
  >
    {children}
  </button>
);

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const found = blogPosts.find(p => p.id === parseInt(id));
    setPost(found);
    
    if (found) {
      const related = blogPosts
        .filter(p => p.category === found.category && p.id !== found.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
    
    window.scrollTo(0, 0);
  }, [id]);

  // const handleShare = (platform) => {
  //   const url = window.location.href;
  //   const text = `Check out this article: ${post?.title}`;
    
  //   let shareUrl = '';
  //   switch(platform) {
  //     case 'facebook':
  //       shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  //       break;
  //     case 'twitter':
  //       shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  //       break;
  //     case 'linkedin':
  //       shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  //       break;
  //     case 'email':
  //       shareUrl = `mailto:?subject=${encodeURIComponent(post?.title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
  //       break;
  //   }
    
  //   if (shareUrl) {
  //     window.open(shareUrl, '_blank');
  //   }
  //   setShowShareMenu(false);
  // };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
            <PrimaryButton onClick={() => navigate('/blog')}>
              Back to Blog
            </PrimaryButton>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-gray-500 hover:text-red-700">Home</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <Link to="/blog" className="text-gray-500 hover:text-red-700">Blog</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-800 font-medium line-clamp-1">{post.title}</span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Blog</span>
          </button>
        </div>

        {/* Article Header - Separate from Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-600 text-white text-sm px-4 py-1.5 rounded-full font-medium inline-flex items-center gap-1">
              <Sparkles size={14} /> {post.category}
            </span>
            {post.featured && (
              <span className="bg-red-500 text-white text-sm px-4 py-1.5 rounded-full">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-4xl font-serif md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-500">
            <span className="flex items-center gap-2">
              <User size={16} /> {post.author}
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="flex items-center gap-2">
              <Calendar size={16} /> {post.date}
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="flex items-center gap-2">
              <Clock size={16} /> 5 min read
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="flex items-center gap-2">
              <Eye size={16} /> 2.5k views
            </span>
          </div>
        </div>

        {/* Featured Image - Separate Section */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative  rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Article Content - No Card, Just Text */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Engagement Bar */}
          {/* <div className="flex items-center justify-between mb-10 pb-8 border-b border-gray-200"> */}
            
            {/* <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
              >
                <Share2 size={18} /> Share
              </button>
              
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-12 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-2 flex gap-1 z-10"
                >
                  <button onClick={() => handleShare('facebook')} className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                    <Facebook size={18} className="text-blue-600" />
                  </button>
                  <button onClick={() => handleShare('twitter')} className="p-2 hover:bg-sky-50 rounded-lg transition-colors">
                    <Twitter size={18} className="text-sky-500" />
                  </button>
                  <button onClick={() => handleShare('linkedin')} className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                    <Linkedin size={18} className="text-blue-700" />
                  </button>
                  <button onClick={() => handleShare('email')} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Mail size={18} className="text-gray-600" />
                  </button>
                </motion.div>
              )}
            </div> */}
          {/* </div> */}

          {/* Article Content - Clean Text */}
          <article className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 font-medium leading-relaxed mb-8 border-l-4 border-red-600 pl-4">
              {post.excerpt}
            </p>

            <div className="space-y-6 text-gray-600">
              <p>
                In the ever-evolving world of construction, staying informed about the latest materials, techniques, and industry standards is crucial for success. At VR & SONS, we've been at the forefront of brick manufacturing for nearly four decades, and we're excited to share our expertise with you.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">The Importance of Quality Materials</h3>
              <p>
                The foundation of any great structure lies in the quality of its materials. When it comes to bricks, several factors determine their performance and longevity. From compressive strength to water absorption rates, each characteristic plays a vital role in how your building will stand the test of time.
              </p>

              <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200 my-8">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles size={20} className="text-red-700" /> Key Takeaway
                </h4>
                <p className="text-gray-700">
                  Quality bricks can last for centuries when properly manufactured and maintained. Always source from reputable manufacturers with proven track records.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Key Considerations</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-red-700 rounded-full mt-2.5"></span>
                  <span><strong className="text-gray-800">Strength:</strong> Ensure bricks meet the required compressive strength for your project's structural needs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-red-700 rounded-full mt-2.5"></span>
                  <span><strong className="text-gray-800">Durability:</strong> Consider factors like frost resistance and efflorescence potential.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-red-700 rounded-full mt-2.5"></span>
                  <span><strong className="text-gray-800">Aesthetics:</strong> Color consistency and texture can significantly impact your building's appearance.</span>
                </li>
              </ul>

              <p className="mt-8">
                Whether you're a contractor, architect, or homeowner planning a construction project, understanding these fundamentals will help you make informed decisions. At VR & SONS, we're committed to providing not just premium bricks, but also the knowledge to help you build better.
              </p>
            </div>
          </article>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Tag size={18} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Tags:</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer">
                  {post.category}
                </span>
                <span className="px-4 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer">
                  Construction
                </span>
                <span className="px-4 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer">
                  Building Materials
                </span>
                <span className="px-4 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer">
                  Brick Quality
                </span>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-700 to-red-600 flex items-center justify-center text-white text-2xl font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-1">About {post.author}</h4>
                <p className="text-gray-600 text-sm">
                  Senior construction expert with over 15 years of experience in brick manufacturing and quality control. Regular contributor to industry publications and speaker at construction forums.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts - Clean Cards (Separate Section) */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-100 py-16 mt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">You Might Also Like</h2>
                <p className="text-gray-600">Explore more articles from our blog</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(related => (
                  <motion.div
                    key={related.id}
                    whileHover={{ y: -5 }}
                    onClick={() => navigate(`/blog/${related.id}`)}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="p-5">
                      <span className="inline-block bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full mb-3">
                        {related.category}
                      </span>
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-700 transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{related.date}</span>
                        <span className="text-red-700 text-sm font-medium hover:underline">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}