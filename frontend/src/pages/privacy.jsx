import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Download, Lock, Mail, Database, Eye, Globe, ShieldCheck,
  FileText, Award, Clock, Shield, FileDown, ChevronRight, CheckCircle,
  AlertCircle, Scale, Users, Sparkles, Building2, Phone, MapPin
} from 'lucide-react';
import { Link ,useNavigate} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../Components/header'; 
import Footer from '../Components/footer'; 

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('collection');
  const [downloading, setDownloading] = useState(false);
 const navigate = useNavigate();
  const sections = [
    { id: 'collection', label: 'Data Collection', icon: Database, color: 'from-blue-600 to-indigo-600' },
    { id: 'usage', label: 'How We Use Data', icon: Eye, color: 'from-emerald-600 to-teal-600' },
    { id: 'cookies', label: 'Cookies & Tracking', icon: Globe, color: 'from-amber-600 to-orange-600' },
    { id: 'security', label: 'Data Security', icon: Lock, color: 'from-rose-600 to-red-600' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -50% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.scrollTo(0, 0);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };



  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 antialiased flex flex-col">
      <Helmet>
        <title>Privacy Policy | VR & Sons Bricks - Since 1986</title>
        <meta name="description" content="Privacy Policy for VR & Sons Bricks regarding data collection, usage, and security measures." />
      </Helmet>

      {/* ANIMATION STYLES */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
      <Header />

      {/* MAIN CONTENT - No padding top since header is fixed */}
      <main className="flex-grow relative">
        
         {/* Background Pattern */}
<div className="fixed inset-0 opacity-[0.03] pointer-events-none"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='88' height='44' viewBox='0 0 88 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h88v44H0V0zm2 2h84v20H2V2zm44 22h42v18H46V24zM2 24h42v18H2V24z' fill='%237C2F26' fill-opacity='0.8' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    backgroundSize: '88px 44px'
  }}
></div>

        {/* HERO SECTION */}
<section className="relative bg-gradient-to-r from-stone-950 via-stone-900 to-stone-800 overflow-hidden min-h-[85vh] flex items-center justify-center">
          {/* Background Image */}
  <motion.div
    initial={{ scale: 1.1 }}
    animate={{ scale: 1 }}
    transition={{ duration: 6, ease: "easeOut" }}
    className="absolute inset-0"
  >            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" 
              alt="Corporate Office Glass Building" 
              className="w-full h-full object-cover opacity-25"
            />
  </motion.div>

          {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-stone-900/5 via-white/5 to-stone-900/10"></div>
<motion.button
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  onClick={() => navigate(-1)}
  className=" cursor-pointer
    absolute 
    top-20 sm:top-24 md:top-28 
    left-4 sm:left-6 md:left-10
    z-30
    flex items-center gap-2 
    px-3 sm:px-4 py-2 
    rounded-full
    bg-white/80 backdrop-blur-md 
    border border-white/20
    text-red-700 text-xs sm:text-sm
    hover:bg-white/70 hover:text-red-800
    transition-all duration-300 
    group shadow-md
  "
>
  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
  <span className="hidden sm:inline">Back</span>
</motion.button>
          {/* Hero Content */}
  <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
            
              {/* Badge */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 
      bg-stone-300 backdrop-blur-sm rounded-full 
      border border-red-700 mb-6"
    >
      <span className="w-2 h-2 text-red-700 bg-red-700 rounded-full animate-pulse"></span>
      <span className="text-red-700 text-xs font-medium uppercase tracking-wider">
        Privacy & Security
      </span>
    </motion.div>

              {/* Title */}
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
      font-bold text-white mb-6 font-serif leading-tight"
    >
      Privacy{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-orange-400 to-amber-400">
        Policy
      </span>
    </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg text-stone-300 max-w-2xl leading-relaxed mb-10"
              >
                We value your trust and are committed to protecting your personal information with enterprise-grade security measures.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <Award className="w-4 h-4 text-red-700" />
                  <span className="text-xs text-stone-300">Version 2.0</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <Clock className="w-4 h-4 text-red-700" />
                  <span className="text-xs text-stone-300">Updated Feb 2026</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <Lock className="w-4 h-4 text-red-700" />
                  <span className="text-xs text-stone-300">256-bit Encryption</span>
                </div>
              </motion.div>

           
           
          </div>
        </section>

        {/* CONTENT SECTION */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-xl shadow-lg p-4 border border-stone-200">
                  <h3 className="text-xs  font-serif  font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-700" />
                    Contents
                  </h3>
                  <nav className="space-y-1">
                    {sections.map((link) => {
                      const isActive = activeSection === link.id;
                      return (
                        <button 
                          key={link.id}
                          onClick={() => scrollToSection(link.id)}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all text-sm ${
                            isActive 
                              ? "bg-orange-50 text-red-700 border-l-3 border-red-700" 
                              : "text-stone-600 hover:bg-stone-50"
                          }`}
                        >
                          <link.icon className={`w-4 h-4 ${isActive ? "text-red-700" : "text-stone-400"}`} />
                          {link.label}
                          {isActive && <ChevronRight className="w-3 h-3 ml-auto text-red-700" />}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Stats Card */}
                {/* <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl p-4 text-white border border-stone-700">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-red-700" />
                    DATA PROTECTION
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-300">Encryption</span>
                      <span className="text-sm font-bold text-red-700">256-bit AES</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-300">Compliance</span>
                      <span className="text-sm font-bold text-red-700">GDPR Ready</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-300">Audit Trail</span>
                      <span className="text-sm font-bold text-red-700">24/7</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-9 space-y-8">
              
              {/* Section 01: Data Collection */}
              <motion.section
                id="collection"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-700 to-red-700 rounded-lg flex items-center justify-center text-white font-bold">
                    01
                  </div>
                  <h2 className="text-2xl font-bold text-stone-800 font-serif">Information We Collect</h2>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
                  <p className="text-stone-700 leading-relaxed mb-4 border-l-4 border-red-600 pl-4">
                    At <span className="font-semibold text-blue-700">VR & Sons Bricks</span>, we collect information only when necessary to serve your construction needs. This typically occurs when you voluntarily submit an inquiry form or contact our support team.
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      { title: 'Personal Identity', desc: 'Name, Email Address, and Mobile Number' },
                      { title: 'Project Details', desc: 'Delivery Location, Required Quantity, and Product Type' },
                      { title: 'Technical Data', desc: 'IP Address (for spam prevention) and Browser Type' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-stone-800">{item.title}:</span>
                          <span className="text-sm text-stone-600 ml-2">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* Section 02: Usage */}
              <motion.section
                id="usage"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                    02
                  </div>
                  <h2 className="text-2xl font-bold text-stone-800 font-serif">How We Use Data</h2>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" /> Core Operations
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-stone-600 p-2 hover:bg-stone-50 rounded-lg transition-all">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          Generating Price Quotes
                        </li>
                        <li className="flex items-center gap-2 text-sm text-stone-600 p-2 hover:bg-stone-50 rounded-lg transition-all">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          Arranging Logistics
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                      <h4 className="font-semibold text-emerald-800 mb-2 text-sm flex items-center gap-2">
                        <Scale className="w-4 h-4" /> No Third-Party Sales
                      </h4>
                      <p className="text-sm text-stone-600">
                        We do <span className="font-medium text-emerald-700">not sell, trade, or rent</span> your personal information. Data is only shared with trusted logistics partners for delivery purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Section 03: Cookies */}
              <motion.section
                id="cookies"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
                    03
                  </div>
                  <h2 className="text-2xl font-bold text-stone-800 font-serif">Cookies & Tracking</h2>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-1 space-y-4">
                      <p className="text-stone-600">
                        Our website uses standard "cookies" to enhance your user experience. These are small files placed on your hard drive for record-keeping purposes.
                      </p>
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <p className="text-sm text-amber-800 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>You may choose to set your web browser to refuse cookies. If you do so, note that some parts of the Site may not function properly, particularly the Inquiry Forms.</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center md:w-32">
                      <Globe className="w-20 h-20 text-stone-200" />
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Section 04: Security */}
              <motion.section
                id="security"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                    04
                  </div>
                  <h2 className="text-2xl font-bold text-stone-800 font-serif">Data Security</h2>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <div className="flex gap-3">
                    <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-3">
                      <p className="text-stone-700">
                        We adopt appropriate data collection, storage, and processing practices to protect against unauthorized access or destruction of your personal information.
                      </p>
                      <div className="bg-white p-3 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4" />
                          Our inquiry database is hosted on secure cloud infrastructure utilizing industry-standard 256-bit AES encryption protocols.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl p-8 text-center border border-stone-700"
              >
                <div className="w-12 h-12 bg-red-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-serif">Questions about your data?</h3>
                <p className="text-stone-400 mb-6 text-sm">Our privacy team is here to address any concerns about your personal information.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <a 
                    href="mailto:support@vrandsons.com" 
                    className="inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-orange-800 text-white px-6 py-3 rounded-xl text-sm hover:shadow-xl  hover:-translate-y-1 font-medium transition-all"
                  >
                    <Mail size={16} /> Contact Privacy Team
                  </a>
                  <Link 
                    to="/" 
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-sm font-medium hover:shadow-xl  hover:-translate-y-1 transition-all border border-white/20"
                  >
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}