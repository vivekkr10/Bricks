import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import productsData from './productsData';
import Header from '../../Components/header';
import Footer from '../../Components/footer';
import axios from "axios";
// BrickWall pattern
const BrickWall = ({ opacity = 0.06, color = "#8B4513" }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
    <defs>
      <pattern id={`bwall-${color.replace("#", "")}`} x="0" y="0" width="88" height="44" patternUnits="userSpaceOnUse">
        <rect x="2" y="2" width="84" height="20" fill="none" stroke={color} strokeWidth="1" rx="2" opacity={opacity * 12} />
        <rect x="46" y="24" width="42" height="18" fill="none" stroke={color} strokeWidth="1" rx="2" opacity={opacity * 12} />
        <rect x="2" y="24" width="42" height="18" fill="none" stroke={color} strokeWidth="1" rx="2" opacity={opacity * 12} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#bwall-${color.replace("#", "")})`} opacity={opacity} />
  </svg>
);

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1000);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  // Inquiry form state
  const [inquiryForm, setInquiryForm] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    deliveryLocation: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const pageContainerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  // Mock images array (in real app, these would come from product data)
  const productImages = [
    product?.image || '/images/default-brick.jpg',
    '/images/brick-angle.jpg',
    '/images/brick-closeup.jpg',
    '/images/brick-application.jpg',
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!inquiryForm.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!inquiryForm.mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(inquiryForm.mobileNumber.replace(/\D/g, ''))) {
      errors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!inquiryForm.emailAddress.trim()) {
      errors.emailAddress = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryForm.emailAddress)) {
      errors.emailAddress = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form field changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInquiryForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!inquiryForm.fullName || !inquiryForm.mobileNumber) {
      setFormErrors({ submit: "Please fill in required fields." });
      return;
    }

    setFormSubmitting(true);

    try {

      const payload = {
        name: inquiryForm.fullName,
        email: inquiryForm.emailAddress,
        phone: inquiryForm.mobileNumber,
        message: inquiryForm.message,
        productName: product.productName,
        requiredQty: quantity,
        deliveryLoc: inquiryForm.deliveryLocation
      }
      const res = await axios.post("http://localhost:5000/api/inquiry", payload);

      if (res.data.success) {
        setFormSuccess(true);
        // Reset form after success
        setInquiryForm({
          fullName: "",
          emailAddress: "",
          mobileNumber: "",
          deliveryLocation: "",
          message: ""
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setFormErrors({ submit: "Failed to send inquiry. Please try again." });
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handle close form
  const handleCloseForm = () => {
    setShowInquiryForm(false);
    setInquiryForm({
      fullName: '',
      mobileNumber: '',
      emailAddress: '',
      deliveryLocation: '',
      message: ''
    });
    setFormErrors({});
    setFormSuccess(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-gray-600 whitespace-nowrap">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
            <svg className="w-32 h-32 mx-auto text-gray-400 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-6">Product Not Found</h2>
          <p className="text-gray-600 mt-2 mb-6">The product you're looking for doesn't exist or is unavailable.</p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Browse All Products
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-stone-50 text-stone-800" style={{ fontFamily: "'Jost', sans-serif" }}>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Jost:wght@300;400;500;600;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', Georgia, serif !important; }
        html { scroll-behavior: smooth; }
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(3deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(-2deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(4deg)} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(60px) skewY(1.5deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .float-a { animation: floatA 5s ease-in-out infinite; }
        .float-b { animation: floatB 7s ease-in-out infinite 1s; }
        .float-c { animation: floatC 6s ease-in-out infinite 2.5s; }
        .float-d { animation: floatA 8s ease-in-out infinite 1.5s; }
        .spin-slow { animation: spinSlow 28s linear infinite; }
        .section-reveal { opacity:0; transform:translateY(40px); transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1); }
        .section-reveal.visible { opacity:1; transform:translateY(0); }
        .brick-hover { transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease; }
        .brick-hover:hover { transform: translateY(-10px) rotate(-1.5deg); box-shadow: 0 30px 60px rgba(234,88,12,0.18); }
      `}</style>

        <Helmet>
          <title>{product?.name || 'Product'} | Premium Construction Bricks</title>
          <meta name="description" content={product?.fullDescription?.substring(0, 160) || ''} />
          <meta name="keywords" content={`${product?.name}, ${product?.category}, bricks, construction materials`} />
        </Helmet>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-b border-orange-100 sticky top-0 z-30 shadow-sm"
        >
          <div className={`${pageContainerClass} py-4`}>
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-stone-500 hover:text-orange-600 transition-colors font-medium">Home</Link>
              <span className="text-stone-400">›</span>
              <Link to="/products" className="text-stone-500 hover:text-orange-600 transition-colors font-medium">Products</Link>
              <span className="text-stone-400">›</span>
              <span className="text-stone-900 font-semibold">{product?.name}</span>
            </div>
          </div>
        </motion.div>

        <div className={`${pageContainerClass} py-12`}>
          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-32">
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl shadow-orange-200/50 mb-6 group brick-hover">
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-[550px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-orange-600 text-white font-bold text-xs tracking-widest rounded-full shadow-lg">
                      {product.productType}
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="px-4 py-2 bg-yellow-500 text-white font-semibold text-xs tracking-widest rounded-full shadow-lg flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.16 2.75a.75.75 0 00-1.32 0l-.82 2.047h-2.148a.75.75 0 000 1.5h2.005l-.656 1.644H2.75a.75.75 0 000 1.5h1.844l-.82 2.047a.75.75 0 001.39.556l.955-2.603h1.562l-.82 2.047a.75.75 0 001.39.556l.955-2.603h2.148a.75.75 0 000-1.5h-2.005l.656-1.644h2.349a.75.75 0 000-1.5h-2.206l.82-2.047a.75.75 0 00-1.39-.556l-.955 2.603H8.16z" />
                      </svg>
                      <span>Price on Inquiry</span>
                    </div>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-4">
                  {productImages.map((img, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setSelectedImage(index)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index
                        ? 'border-orange-600 shadow-lg shadow-orange-200'
                        : 'border-stone-200 hover:border-orange-400'
                        }`}
                    >
                      <img src={img} alt={`View ${index + 1}`} className="w-full h-24 object-cover" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl shadow-orange-200/50 p-10">
                {/* Title & Rating */}
                <h1 className="text-5xl font-serif font-bold text-stone-900 mb-2">{product.productName}</h1>

                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-orange-100">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-stone-600 font-medium">(124 reviews)</span>
                  <span className="text-stone-300">|</span>
                  <span className="text-emerald-600 font-semibold tracking-wide">In Stock</span>
                </div>

                {/* Quick Specs */}
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border border-orange-100">
                    <p className="text-xs font-semibold text-orange-600 mb-2 tracking-widest uppercase">Strength</p>
                    <p className="text-xl font-bold text-stone-900">{product.specifications.strength}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border border-orange-100">
                    <p className="text-xs font-semibold text-orange-600 mb-2 tracking-widest uppercase">Size</p>
                    <p className="text-xl font-bold text-stone-900">{product.specifications.size}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border border-orange-100">
                    <p className="text-xs font-semibold text-orange-600 mb-2 tracking-widest uppercase">Weight</p>
                    <p className="text-xl font-bold text-stone-900">{product.specifications.weight}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border border-orange-100">
                    <p className="text-xs font-semibold text-orange-600 mb-2 tracking-widest uppercase">Water Absorption</p>
                    <p className="text-xl font-bold text-stone-900">{product.specifications.waterAbsorption}</p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-10">
                  <label className="block text-sm font-semibold text-stone-900 mb-4 tracking-wide">
                    Required Quantity (in pcs)
                  </label>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuantity(Math.max(100, quantity - 100))}
                      className="w-12 h-12 rounded-xl border-2 border-orange-200 flex items-center justify-center hover:bg-orange-50 text-stone-900 font-bold hover:border-orange-400 transition-all"
                    >
                      −
                    </motion.button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(100, parseInt(e.target.value) || 100))}
                      className="flex-1 px-6 py-3 border-2 border-orange-200 rounded-xl text-center text-lg font-semibold text-stone-900 focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                      min="100"
                      step="100"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuantity(quantity + 100)}
                      className="w-12 h-12 rounded-xl border-2 border-orange-200 flex items-center justify-center hover:bg-orange-50 text-stone-900 font-bold hover:border-orange-400 transition-all"
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-5 mb-10">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(234, 88, 12, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowInquiryForm(true)}
                    className="flex-1 px-8 py-5 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 transition-all font-bold text-lg tracking-wide shadow-lg flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    GET QUOTE NOW
                  </motion.button>
                </div>

                {/* Key Features */}
                <div className="border-t-2 border-orange-100 pt-8">
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6">Key Features</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      'Premium Quality',
                      'IS Standard Certified',
                      'High Durability',
                      'Eco-Friendly',
                      'Perfect Finish',
                      'Thermal Insulation'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                        <svg className="w-6 h-6 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-stone-800 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-2xl shadow-orange-200/50 overflow-hidden mb-20"
            >
              {/* Tab Headers */}
              <div className="flex border-b-2 border-orange-100">
                {[
                  {
                    id: 'description',
                    label: 'Description',
                    icon: (
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3.5a1 1 0 01-.82-.4l-2.09-2.59a1 1 0 00-.78-.4H4a2 2 0 01-2-2V4z" />
                      </svg>
                    )
                  },
                  {
                    id: 'specifications',
                    label: 'Specifications',
                    icon: (
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h1a1 1 0 001-1v-6a1 1 0 00-1-1h-1z" />
                      </svg>
                    )
                  },
                  {
                    id: 'applications',
                    label: 'Applications',
                    icon: (
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a1 1 0 001 1h12a1 1 0 001-1V6a2 2 0 00-2-2H4zm0 4v4a2 2 0 002 2h8a2 2 0 002-2V8H4z" clipRule="evenodd" />
                      </svg>
                    )
                  },
                  {
                    id: 'manufacturing',
                    label: 'Manufacturing',
                    icon: (
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.5 1.5H4a2 2 0 00-2 2V15a2 2 0 002 2h12a2 2 0 002-2V6.5a2 2 0 00-2-2h-5V1.5zm-3 3a1 1 0 011-1h1a1 1 0 011 1v2h-3v-2zm6 0a1 1 0 011-1h1a1 1 0 011 1v2h-3v-2z" />
                      </svg>
                    )
                  }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-5 font-semibold transition-all relative ${activeTab === tab.id
                      ? 'text-orange-600'
                      : 'text-stone-600 hover:text-stone-800 hover:bg-stone-50'
                      }`}
                  >
                    <span className="mr-2">{typeof tab.icon === 'string' ? tab.icon : tab.icon}</span>
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'description' && (
                      <div>
                        <h3 className="text-3xl font-serif font-bold text-stone-900 mb-6">Product Description</h3>
                        <p className="text-stone-700 leading-relaxed mb-8 text-lg">{product.fullDescription}</p>

                        <h4 className="text-xl font-serif font-bold text-stone-900 mb-5">Benefits</h4>
                        <ul className="grid grid-cols-2 gap-4">
                          {[
                            'Superior strength and durability',
                            'Excellent thermal insulation',
                            'Low maintenance requirements',
                            'Fire resistant properties',
                            'Sound insulation capabilities',
                            'Environmentally sustainable'
                          ].map((benefit, index) => (
                            <li key={index} className="flex items-center gap-3 text-stone-700 p-3 bg-orange-50 rounded-xl border border-orange-100">
                              <svg className="w-6 h-6 text-orange-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeTab === 'specifications' && (
                      <div>
                        <h3 className="text-3xl font-serif font-bold text-stone-900 mb-8">Technical Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border border-orange-100">
                              <span className="text-stone-700 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                              <span className="font-bold text-stone-900 text-lg">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'applications' && (
                      <div>
                        <h3 className="text-3xl font-serif font-bold text-stone-900 mb-8">Ideal Applications</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          {product.applicationAreas.map((area, index) => (
                            <div key={index} className="text-center p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl hover:shadow-xl transition-all border border-orange-100 hover:border-orange-300">
                              <div className="text-4xl mb-4">🏗️</div>
                              <span className="font-semibold text-stone-900">{area}</span>
                            </div>
                          ))}
                        </div>
                        <p className="mt-8 text-sm text-stone-500 italic text-center">
                          * Suitable for both load-bearing and partition walls based on construction requirements
                        </p>
                      </div>
                    )}

                    {activeTab === 'manufacturing' && (
                      <div>
                        <h3 className="text-3xl font-serif font-bold text-stone-900 mb-6">Manufacturing Process</h3>
                        <div className="flex items-center gap-3 mb-8">
                          <span className="px-5 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold tracking-wide">
                            {product.manufacturingType}
                          </span>
                        </div>

                        <div className="prose prose-stone max-w-none">
                          <p className="text-stone-700 mb-8 text-lg leading-relaxed">
                            Our bricks are manufactured using state-of-the-art technology ensuring
                            consistent quality, dimensional accuracy, and superior strength.
                          </p>

                          <h4 className="text-2xl font-serif font-bold text-stone-900 mb-6">Quality Control Process</h4>
                          <div className="space-y-5">
                            {[
                              { step: 'Raw Material Testing', desc: 'All incoming materials are tested for purity and composition' },
                              { step: 'Controlled Mixing', desc: 'Precise proportions mixed in automated batching plants' },
                              { step: 'Molding & Shaping', desc: 'High-pressure molding for uniform density and shape' },
                              { step: 'Drying & Curing', desc: 'Controlled environment drying for optimal strength' },
                              { step: 'Final Inspection', desc: 'Each batch tested for strength, absorption, and dimensions' }
                            ].map((item, index) => (
                              <div key={index} className="flex gap-5 p-5 bg-orange-50 rounded-xl border border-orange-100">
                                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                                  {index + 1}
                                </div>
                                <div>
                                  <h5 className="font-semibold text-stone-900">{item.step}</h5>
                                  <p className="text-stone-700">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Reviews Section */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl shadow-orange-200/50 p-12"
            >
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-10">Customer Reviews</h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Rating Summary */}
                <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border border-orange-100">
                  <div className="text-6xl font-serif font-bold text-orange-600 mb-4">{product.rating}</div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-3xl ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-stone-300'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-stone-700 text-center font-medium">Based on {product.reviews} reviews</p>

                  {/* Rating Breakdown */}
                  <div className="mt-8 w-full space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const percentage = Math.random() * 100 | 0; // Simulate percentages
                      return (
                        <div key={rating} className="flex items-center gap-3">
                          <span className="text-sm font-medium text-stone-700 w-8">{rating}★</span>
                          <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-500 transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-2 space-y-6">
                  {[
                    { name: 'Rajesh Kumar', rating: 5, date: '2 weeks ago', text: 'Excellent quality bricks! Perfect for our residential project. Highly recommended.' },
                    { name: 'Amit Singh', rating: 5, date: '1 month ago', text: 'Best bricks in the market. Strong, durable, and great customer support.' },
                    { name: 'Priya Patel', rating: 4, date: '1.5 months ago', text: 'Good quality and reasonable prices. Delivery was on time.' }
                  ].map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b-2 border-orange-100 pb-8 last:border-b-0"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-stone-900 text-lg">{review.name}</h4>
                          <p className="text-sm text-stone-600">{review.date}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xl ${i < review.rating ? 'text-yellow-500' : 'text-stone-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-stone-700 leading-relaxed">{review.text}</p>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-8 px-6 py-4 border-2 border-orange-300 text-orange-600 rounded-2xl hover:bg-orange-50 transition-all font-semibold text-lg tracking-wide"
                  >
                    View All Reviews
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-4xl font-serif font-bold text-stone-900 mb-12">Related Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {relatedProducts.map((related, index) => (
                    <motion.div
                      key={related.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      onClick={() => navigate(`/product/${related.id}`)}
                      className="cursor-pointer group"
                    >
                      <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-orange-200/50 transition-all">
                        <div className="relative h-56 overflow-hidden bg-stone-100">
                          <img
                            src={related.image || '/images/default-brick.jpg'}
                            alt={related.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-6">
                          <h3 className="font-serif font-bold text-stone-900 mb-3 text-lg group-hover:text-orange-600 transition-colors">
                            {related.name}
                          </h3>
                          <p className="text-sm text-stone-600 line-clamp-2">{related.shortDescription}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Inquiry Form Modal */}
          <AnimatePresence>
            {showInquiryForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 scroll-smooth"
                onClick={handleCloseForm}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl shadow-orange-200/50 max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {formSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Thank You!</h3>
                      <p className="text-stone-600">Your inquiry has been submitted successfully. We'll contact you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-serif font-bold text-stone-900">Get Quote</h3>
                          <p className="text-orange-600 font-semibold mt-1">{product?.name}</p>
                        </div>
                        <button
                          onClick={handleCloseForm}
                          className="text-stone-400 hover:text-stone-600 transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                          <label className="block text-sm font-semibold text-stone-900 mb-2 tracking-wide">Full Name *</label>
                          <input
                            type="text"
                            name="fullName"
                            value={inquiryForm.fullName}
                            onChange={handleFormChange}
                            placeholder="Enter your full name"
                            className={`w-full px-4 py-3 border-2 rounded-lg transition-all text-stone-900 placeholder:text-stone-400 focus:outline-none ${formErrors.fullName
                              ? 'border-red-500 focus:ring-2 focus:ring-red-300'
                              : 'border-orange-200 focus:ring-2 focus:ring-orange-600 focus:border-transparent'
                              }`}
                          />
                          {formErrors.fullName && (
                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                              <span>⚠</span> {formErrors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Mobile Number */}
                        <div>
                          <label className="block text-sm font-semibold text-stone-900 mb-2 tracking-wide">Mobile Number *</label>
                          <input
                            type="tel"
                            name="mobileNumber"
                            value={inquiryForm.mobileNumber}
                            onChange={handleFormChange}
                            placeholder="10-digit mobile number"
                            className={`w-full px-4 py-3 border-2 rounded-lg transition-all text-stone-900 placeholder:text-stone-400 focus:outline-none ${formErrors.mobileNumber
                              ? 'border-red-500 focus:ring-2 focus:ring-red-300'
                              : 'border-orange-200 focus:ring-2 focus:ring-orange-600 focus:border-transparent'
                              }`}
                          />
                          {formErrors.mobileNumber && (
                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                              <span>⚠</span> {formErrors.mobileNumber}
                            </p>
                          )}
                        </div>

                        {/* Email Address */}
                        <div>
                          <label className="block text-sm font-semibold text-stone-900 mb-2 tracking-wide">Email Address *</label>
                          <input
                            type="email"
                            name="emailAddress"
                            value={inquiryForm.emailAddress}
                            onChange={handleFormChange}
                            placeholder="your.email@example.com"
                            className={`w-full px-4 py-3 border-2 rounded-lg transition-all text-stone-900 placeholder:text-stone-400 focus:outline-none ${formErrors.emailAddress
                              ? 'border-red-500 focus:ring-2 focus:ring-red-300'
                              : 'border-orange-200 focus:ring-2 focus:ring-orange-600 focus:border-transparent'
                              }`}
                          />
                          {formErrors.emailAddress && (
                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                              <span>⚠</span> {formErrors.emailAddress}
                            </p>
                          )}
                        </div>

                        {/* Required Quantity */}
                        <div>
                          <label className="block text-sm font-semibold text-stone-900 mb-2 tracking-wide">Required Quantity</label>
                          <input
                            type="number"
                            value={quantity}
                            readOnly
                            className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg bg-orange-50 text-stone-900 font-medium cursor-not-allowed"
                          />
                          <p className="mt-1 text-xs text-stone-500">Quantity from product page: {quantity.toLocaleString()} units</p>
                        </div>

                        {/* Delivery Location */}
                        <div>
                          <label className="block text-sm font-semibold text-stone-900 mb-2 tracking-wide">Delivery Location</label>
                          <input
                            type="text"
                            name="deliveryLocation"
                            value={inquiryForm.deliveryLocation}
                            onChange={handleFormChange}
                            placeholder="Enter delivery address or city"
                            className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all text-stone-900 placeholder:text-stone-400 focus:outline-none"
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-sm font-semibold text-stone-900 mb-2 tracking-wide">Additional Details</label>
                          <textarea
                            name="message"
                            value={inquiryForm.message}
                            onChange={handleFormChange}
                            rows="3"
                            placeholder="Any special requirements or queries?"
                            className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all text-stone-900 placeholder:text-stone-400 focus:outline-none resize-none"
                          ></textarea>
                        </div>

                        {/* Error message for submission */}
                        {formErrors.submit && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-red-50 border border-red-300 rounded-lg"
                          >
                            <p className="text-xs text-red-600 flex items-center gap-2">
                              <span>⚠</span> {formErrors.submit}
                            </p>
                          </motion.div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-6 border-t border-stone-200">
                          <motion.button
                            type="submit"
                            disabled={formSubmitting}
                            whileHover={{ scale: formSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: formSubmitting ? 1 : 0.98 }}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:shadow-lg hover:shadow-orange-600/30 transition-all font-bold tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {formSubmitting ? (
                              <>
                                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Submitting...
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Submit Inquiry
                              </>
                            )}
                          </motion.button>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCloseForm}
                            className="px-6 py-3 border-2 border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-all font-semibold"
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </form>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
