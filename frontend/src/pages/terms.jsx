import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Download, Mail, FileText, Truck, CreditCard, 
  ShieldAlert, BrickWall, Award, Clock, Shield, FileDown,
  ChevronRight, CheckCircle, AlertCircle, Scale, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../Components/header'; 
import Footer from '../Components/footer'; 

export default function Terms() {
  const [activeSection, setActiveSection] = useState('intro');
  const [downloading, setDownloading] = useState(false);

  const sections = [
    { id: 'intro', label: 'Introduction', icon: FileText, color: 'from-blue-600 to-indigo-600' },
    { id: 'pricing', label: 'Pricing & Payments', icon: CreditCard, color: 'from-emerald-600 to-teal-600' },
    { id: 'delivery', label: 'Delivery & Logistics', icon: Truck, color: 'from-amber-600 to-orange-600' },
    { id: 'liability', label: 'Liability & Warranty', icon: ShieldAlert, color: 'from-rose-600 to-red-600' },
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
    
    const content = `VR & SONS - TERMS OF SERVICE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Version 2.4 | Last Updated: February 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. INTRODUCTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Welcome to VR & Sons Bricks. These terms govern your use of our digital inquiry platform and the subsequent supply of construction materials including Red Bricks, Fly Ash Bricks, and Paver Blocks.

By submitting an inquiry through this website, you acknowledge that this platform serves as a lead generation tool and not a direct e-commerce store. We are committed to transparency in our manufacturing processes and supply chain logistics.

2. PRICING & PAYMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
We do not accept online payments through this website. All financial transactions must be settled offline via:
• Bank Transfer (NEFT/RTGS)
• Crossed Cheque

Construction material prices are subject to raw material costs. Rates provided via inquiry responses are valid for 7 days only. Prices may be revised without prior notice if the validity period expires.

3. DELIVERY & LOGISTICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The customer must arrange labor for unloading materials at the construction site unless "Unloading Included" is explicitly mentioned in the official invoice.

Due to the nature of red clay and fly ash products, a breakage tolerance of 3% to 5% during transit and unloading is considered industry standard and acceptable.

4. LIMITATION OF LIABILITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VR & Sons will not be held liable for structural defects resulting from improper storage, handling, or usage of bricks after delivery.

Visual representations on this website are for reference; actual product color and texture may vary slightly due to kiln firing processes. Customers are encouraged to request physical samples before bulk ordering.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VR & Sons Bricks - Since 1986
7XF5+3WX, Kamrej Char Rasta, Kamrej, Gujarat 394185
support@vrandsons.com | +91 98254 74047 | +91 98252 66811
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'VR-Sons-Terms-of-Service.txt';
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
        <title>Terms of Service | VR & Sons Bricks - Since 1986</title>
        <meta name="description" content="Review our terms of service for premium construction materials including red bricks, fly ash bricks, and paver blocks." />
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

      {/* Header - Your exact header component */}
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

        {/* HERO SECTION - Now directly below header with no gap */}
        <section className="relative bg-gradient-to-br from-stone-900 to-stone-800 overflow-hidden min-h-[80vh] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80" 
              alt="Brick Construction" 
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
                <BrickWall className="w-3 h-3 text-orange-500" />
                <span className="text-orange-400 text-xs font-medium uppercase tracking-wider">Terms & Conditions</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-serif"
              >
                Terms of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                  Service
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg text-stone-300 max-w-2xl leading-relaxed mb-8"
              >
                Please review our comprehensive terms carefully. We believe in complete transparency and building lasting trust with our clients.
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
                  <span className="text-xs text-stone-300">Version 2.4</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-stone-300">Updated Feb 2026</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <Shield className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-stone-300">Legally Binding</span>
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
                      <FileDown size={18} /> Download Terms
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
                    TRUSTED BY
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-300">Projects Completed</span>
                      <span className="text-sm font-bold text-orange-500">312+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-300">Happy Clients</span>
                      <span className="text-sm font-bold text-orange-500">1000+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-300">Years of Trust</span>
                      <span className="text-sm font-bold text-orange-500">40+</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-9 space-y-8">
              
              {/* Section 01: Introduction */}
              <motion.section
                id="intro"
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
                  <h2 className="text-2xl font-bold text-stone-800 font-serif">Introduction</h2>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
                  <p className="text-stone-700 leading-relaxed mb-4 border-l-4 border-blue-600 pl-4">
                    Welcome to <span className="font-semibold text-blue-700">VR & Sons Bricks</span>. These terms govern your use of our digital inquiry platform and the subsequent supply of premium construction materials.
                  </p>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    By submitting an inquiry through this website, you acknowledge that this platform serves as a lead generation tool. We are committed to transparency in our manufacturing processes and supply chain logistics.
                  </p>
                </div>
              </motion.section>

              {/* Section 02: Pricing */}
              <motion.section
                id="pricing"
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
                  <h2 className="text-2xl font-bold text-stone-800 font-serif">Pricing & Payments</h2>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-emerald-600" /> Payment Methods
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-stone-600">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          Bank Transfer (NEFT/RTGS)
                        </li>
                        <li className="flex items-center gap-2 text-sm text-stone-600">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          Crossed Cheque
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                      <h4 className="font-semibold text-emerald-800 mb-2 text-sm flex items-center gap-2">
                        <Scale className="w-4 h-4" /> Price Validity
                      </h4>
                      <p className="text-sm text-stone-600">
                        Rates provided are valid for <span className="font-medium text-emerald-700">7 days only</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Section 03: Delivery */}
              <motion.section
                id="delivery"
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
                  <h2 className="text-2xl font-bold text-stone-800 font-serif">Delivery & Logistics</h2>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
                  <div className="space-y-4">
                    <div className="p-4 bg-stone-50 rounded-lg">
                      <h3 className="font-semibold text-stone-800 mb-2 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-amber-600" /> Unloading Responsibility
                      </h3>
                      <p className="text-sm text-stone-600">Customer must arrange labor for unloading unless explicitly mentioned in the invoice.</p>
                    </div>
                    <div className="p-4 bg-stone-50 rounded-lg">
                      <h3 className="font-semibold text-stone-800 mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-orange-600" /> Breakage Tolerance
                      </h3>
                      <p className="text-sm text-stone-600">A breakage tolerance of <span className="font-medium text-orange-600">3% to 5%</span> during transit is considered acceptable.</p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Section 04: Liability */}
              <motion.section
                id="liability"
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
                  <h2 className="text-2xl font-bold text-stone-800 font-serif">Limitation of Liability</h2>
                </div>
                
                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <div className="flex gap-3">
                    <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-stone-700 space-y-2">
                      <p>VR & Sons is not liable for defects resulting from improper storage or handling after delivery.</p>
                      <p className="text-stone-600">Product colors may vary slightly due to firing processes. Request samples before bulk ordering.</p>
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
                <h3 className="text-xl font-bold text-white mb-2 font-serif">Have Questions?</h3>
                <p className="text-stone-400 mb-6 text-sm">Our team is here to help with bulk orders and contracts.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <a 
                    href="mailto:support@vrandsons.com" 
                    className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                  >
                    <Mail size={16} /> Contact Team
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