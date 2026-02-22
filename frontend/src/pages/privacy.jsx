import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Download, Lock, Mail, Database, Eye, Globe, ShieldCheck,
  FileText, Award, Clock, Shield, FileDown, ChevronRight, CheckCircle,
  AlertCircle, Scale, Users, Sparkles, Building2, Phone, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../Components/header'; 
import Footer from '../Components/footer'; 

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('collection');
  const [downloading, setDownloading] = useState(false);

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

  const downloadPDF = () => {
    setDownloading(true);
    
    const content = `VR & SONS - PRIVACY POLICY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Version 2.0 | Last Updated: February 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. INFORMATION WE COLLECT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
At VR & Sons Bricks, we collect information only when necessary to serve your construction needs. This typically occurs when you voluntarily submit an inquiry form or contact our support team.

• Personal Identity: Name, Email Address, and Mobile Number
• Project Details: Delivery Location, Required Quantity, and Product Type
• Technical Data: IP Address (for spam prevention) and Browser Type

2. HOW WE USE DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your data is strictly used for business operations related to your inquiry:
• Generating Price Quotes
• Arranging Logistics

We do NOT sell, trade, or rent your personal identification information to outside parties. Data is only shared with trusted logistics partners for delivery purposes.

3. COOKIES & TRACKING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Our website uses standard "cookies" to enhance your user experience. These are small files placed on your hard drive for record-keeping purposes.

You may choose to set your web browser to refuse cookies, or to alert you when cookies are being sent. If you do so, note that some parts of the Site may not function properly, particularly the Inquiry Forms.

4. DATA SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
We adopt appropriate data collection, storage, and processing practices to protect against unauthorized access or destruction of your personal information.

Our inquiry database is hosted on secure cloud infrastructure (Google Cloud Platform) utilizing industry-standard encryption protocols.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VR & Sons Bricks - Since 1986
7XF5+3WX, Kamrej Char Rasta, Kamrej, Gujarat 394185
privacy@vrandsons.com | +91 98254 74047 | +91 98252 66811
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'VR-Sons-Privacy-Policy.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setTimeout(() => {
      setDownloading(false);
    }, 1500);
  };

  const currentYear = new Date().getFullYear();

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
        <div className="fixed inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #7C2F26 0px, #7C2F26 2px, transparent 2px, transparent 12px)`,
            backgroundSize: '30px 30px'
          }}
        ></div>

        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-stone-900 to-stone-800 overflow-hidden min-h-[70vh] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" 
              alt="Corporate Office Glass Building" 
              className="w-full h-full object-cover opacity-30"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/90 to-transparent"></div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="max-w-4xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-600/10 backdrop-blur-sm rounded-full border border-orange-600/30 mb-6"
              >
                <ShieldCheck className="w-3 h-3 text-orange-500" />
                <span className="text-orange-400 text-xs font-medium uppercase tracking-wider">Privacy & Security</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-serif"
              >
                Privacy{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                  Policy
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg text-stone-300 max-w-2xl leading-relaxed mb-8"
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
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <Award className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-stone-300">Version 2.0</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-stone-300">Updated Feb 2026</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <Lock className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-stone-300">256-bit Encryption</span>
                </div>
              </motion.div>

              {/* Download Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button 
                  onClick={downloadPDF}
                  disabled={downloading}
                  className="group relative overflow-hidden bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 text-sm inline-flex items-center gap-2 shadow-lg"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  {downloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <FileDown size={18} /> Download Privacy Policy
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-xl shadow-lg p-4 border border-stone-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-600" />
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
                              ? "bg-orange-50 text-orange-700 border-l-3 border-orange-600" 
                              : "text-stone-600 hover:bg-stone-50"
                          }`}
                        >
                          <link.icon className={`w-4 h-4 ${isActive ? "text-orange-600" : "text-stone-400"}`} />
                          {link.label}
                          {isActive && <ChevronRight className="w-3 h-3 ml-auto text-orange-600" />}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Stats Card */}
                <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl p-4 text-white border border-stone-700">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-500" />
                    DATA PROTECTION
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-300">Encryption</span>
                      <span className="text-sm font-bold text-orange-500">256-bit AES</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-300">Compliance</span>
                      <span className="text-sm font-bold text-orange-500">GDPR Ready</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-300">Audit Trail</span>
                      <span className="text-sm font-bold text-orange-500">24/7</span>
                    </div>
                  </div>
                </div>
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
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                    01
                  </div>
                  <h2 className="text-2xl font-bold text-stone-800 font-serif">Information We Collect</h2>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
                  <p className="text-stone-700 leading-relaxed mb-6 border-l-4 border-blue-600 pl-4">
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
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
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
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-serif">Questions about your data?</h3>
                <p className="text-stone-400 mb-6 text-sm">Our privacy team is here to address any concerns about your personal information.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <a 
                    href="mailto:privacy@vrandsons.com" 
                    className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                  >
                    <Mail size={16} /> Contact Privacy Team
                  </a>
                  <Link 
                    to="/" 
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all border border-white/20"
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