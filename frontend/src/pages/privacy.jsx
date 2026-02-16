import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Lock, Mail, Database, Eye, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('collection');

  const sections = [
    { id: 'collection', label: 'Data Collection', icon: Database },
    { id: 'usage', label: 'How We Use Data', icon: Eye },
    { id: 'cookies', label: 'Cookies & Tracking', icon: Globe },
    { id: 'security', label: 'Data Security', icon: Lock },
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

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans bg-white text-slate-800 antialiased min-h-screen">
      <Helmet>
        <title>Privacy Policy | VR & Sons Bricks</title>
        <meta name="description" content="Privacy Policy for VR & Sons Bricks regarding data collection and usage." />
      </Helmet>

      {/* --- INLINE STYLES FOR ANIMATION --- */}
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s infinite alternate ease-in-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* --- Immersive Hero Section --- */}
      <div className="relative w-full h-[50vh] min-h-[400px] bg-slate-900 overflow-hidden flex items-end justify-center group">
        
        {/* Animated Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" 
            alt="Corporate Office Glass Building" 
            className="w-full h-full object-cover opacity-40 animate-subtle-zoom transform-gpu"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
        
        {/* Hero Content (Centered & Animated) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 lg:pb-16 flex flex-col items-center text-center">
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            Privacy <span className="text-orange-600">Policy</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl font-light leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            We value your trust and are committed to protecting your personal information.
          </p>
          
          <div className="mt-8 flex items-center gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs border border-white/20 backdrop-blur-md">
              Version 2.0
            </span>
            <span className="text-slate-400 text-sm">Last Updated: February 2026</span>
          </div>
        </div>
      </div>

      {/* --- Main Content Layout --- */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-24">
          
          {/* --- Sidebar (Table of Contents) --- */}
          <aside className="lg:col-span-1">
            <div className="sticky top-12 space-y-8">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">Contents</h3>
                <nav className="space-y-2">
                  {sections.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <button 
                        key={link.id}
                        onClick={() => scrollToSection(link.id)}
                        className={`w-full group flex items-center justify-between p-3 rounded-xl transition-all text-left font-medium
                          ${isActive 
                            ? "bg-white shadow-sm text-orange-600 ring-1 ring-slate-200" 
                            : "text-slate-600 hover:bg-white hover:text-orange-600"
                          }
                        `}
                      >
                        <span className="flex items-center">
                          <link.icon className={`w-4 h-4 mr-3 transition-opacity ${isActive ? "opacity-100 text-orange-500" : "opacity-50 group-hover:opacity-100"}`} />
                          {link.label}
                        </span>
                        <ArrowRight className={`w-4 h-4 transition-all ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Download PDF Card */}
              <div className="hidden lg:block p-6 bg-slate-900 rounded-2xl text-white">
                <h4 className="font-bold mb-2">Need a copy?</h4>
                <p className="text-sm text-slate-400 mb-4">Download the official signed document for your records.</p>
                <button className="w-full py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
          </aside>

          {/* --- Main Content Article --- */}
          <article className="lg:col-span-3 space-y-20">
            
            {/* Section 01: Data Collection */}
            <section id="collection" className="scroll-mt-24 border-b border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-black text-slate-200">01</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Information We Collect</h2>
              </div>
              <div className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-300">
                <div className="prose prose-lg prose-slate max-w-none text-slate-600">
                  <p className="text-xl leading-relaxed text-slate-700 font-medium mb-6">
                    At <strong>VR & Sons Bricks</strong>, we collect information only when necessary to serve your construction needs. This typically occurs when you voluntarily submit an inquiry form or contact our support team.
                  </p>
                  <ul className="space-y-2 list-none pl-0">
                    <li className="flex items-start">
                      <div className="min-w-[8px] h-[8px] rounded-full bg-orange-500 mt-2.5 mr-3"></div>
                      <span><strong>Personal Identity:</strong> Name, Email Address, and Mobile Number.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="min-w-[8px] h-[8px] rounded-full bg-orange-500 mt-2.5 mr-3"></div>
                      <span><strong>Project Details:</strong> Delivery Location, Required Quantity, and Product Type.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="min-w-[8px] h-[8px] rounded-full bg-orange-500 mt-2.5 mr-3"></div>
                      <span><strong>Technical Data:</strong> IP Address (for spam prevention) and Browser Type.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 02: Usage */}
            <section id="usage" className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-black text-slate-200">02</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">How We Use Data</h2>
              </div>
              
              <div className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-300">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-orange-600" /> Core Operations
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Your data is strictly used for business operations related to your inquiry:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center bg-white px-4 py-3 rounded-lg border border-slate-200 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
                        <span className="font-semibold text-slate-700">Generating Price Quotes</span>
                      </li>
                      <li className="flex items-center bg-white px-4 py-3 rounded-lg border border-slate-200 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
                        <span className="font-semibold text-slate-700">Arranging Logistics</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-100 rounded-2xl transform -rotate-1"></div>
                    <div className="relative bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">
                      <h4 className="font-bold text-orange-800 mb-2 uppercase text-sm tracking-wide">No Third-Party Sales</h4>
                      <p className="text-slate-700 leading-relaxed">
                        We do <strong className="text-orange-600 border-b-2 border-orange-200">not sell, trade, or rent</strong> your personal identification information to outside parties. Data is only shared with trusted logistics partners for delivery purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 03: Cookies */}
            <section id="cookies" className="scroll-mt-24 border-b border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-black text-slate-200">03</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Cookies & Tracking</h2>
              </div>
              
              <div className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-300">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-2/3 text-lg text-slate-600 leading-relaxed space-y-4">
                    <p>
                      Our website uses standard "cookies" to enhance your user experience. These are small files placed on your hard drive for record-keeping purposes.
                    </p>
                    <p>
                      You may choose to set your web browser to refuse cookies, or to alert you when cookies are being sent. If you do so, note that some parts of the Site may not function properly, particularly the Inquiry Forms.
                    </p>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-center">
                    <Globe className="w-32 h-32 text-slate-200" />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 04: Security */}
            <section id="security" className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-black text-slate-200">04</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Data Security</h2>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-6 md:p-8 rounded-r-xl">
                <div className="flex items-start">
                  <Lock className="w-8 h-8 text-green-600 mr-4 flex-shrink-0 mt-1" />
                  <div className="text-lg text-slate-700 leading-relaxed">
                    <p className="mb-4">
                      We adopt appropriate data collection, storage, and processing practices to protect against unauthorized access or destruction of your personal information.
                    </p>
                    <p>
                      Our inquiry database is hosted on secure cloud infrastructure (Google Cloud Platform) utilizing industry-standard encryption protocols.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Box */}
            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">Questions about your data?</h3>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                  If you have any questions about this Privacy Policy or your dealings with this site, please contact us.
                </p>
                <div className="flex justify-center gap-4">
                  <a href="mailto:privacy@vrandsons.com" className="px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-orange-50 transition-colors">
                    Contact Team
                  </a>
                  <Link to="/" className="px-6 py-3 border border-slate-600 text-white font-bold rounded-lg hover:border-white transition-colors">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>

          </article>
        </div>
      </div>

    </div>
  );
}