import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  Truck,
  Award,
  ClipboardCheck,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../Components/header";
import Footer from "../../Components/footer";

/* ================= BRICK WALL ================= */
const BrickWall = ({ opacity = 0.06, color = "#8B4513" }) => {
  const id = React.useId();

  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <defs>
        <pattern id={id} width="88" height="44" patternUnits="userSpaceOnUse">
          <rect x="2" y="2" width="84" height="20" fill="none" stroke={color} strokeWidth="1" rx="2" opacity={opacity * 15} />
          <rect x="46" y="24" width="42" height="18" fill="none" stroke={color} strokeWidth="1" rx="2" opacity={opacity * 15} />
          <rect x="2" y="24" width="42" height="18" fill="none" stroke={color} strokeWidth="1" rx="2" opacity={opacity * 15} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity={opacity} />
    </svg>
  );
};

/* ================= FAQ ITEM ================= */
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-stone-200 py-4">
      <button
        onClick={onClick}
        className="flex justify-between w-full text-left font-semibold text-stone-800"
      >
        {question}
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180 text-red-700" : ""
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-40 mt-3" : "max-h-0"
        }`}
      >
        <p className="text-stone-600 text-sm">{answer}</p>
      </div>
    </div>
  );
};

export default function ContactSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      detail: "VR & Sons Architectural Clay",
      subDetail: "Kamrej Char Rasta, Gujarat 394185",
      link: "https://maps.google.com/?q=Kamrej+Char+Rasta+Gujarat",
    },
    {
      icon: Phone,
      title: "Sales & Technical",
      detail: "+91 98254 74047",
      subDetail: "Alt: 98252 66811 / 95860 24642",
      link: "tel:+919825474047",
    },
    {
      icon: Mail,
      title: "Email Support",
      detail: "support@vrandsons.com",
      subDetail: "Response within 6 business hours",
      link: "mailto:support@vrandsons.com",
    },
  ];

  const [openIndex, setOpenIndex] = React.useState(null);

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* HERO */}
        <section className="relative h-[600px] flex items-center justify-center text-center text-white">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
            alt="Architectural Building"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/70" />

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl px-6"
          >
            <ShieldCheck className="mx-auto mb-4 text-red-600" />
            <h1 className="text-5xl md:text-7xl font-serif mb-6">
              Let’s Build Something <span className="italic text-stone-300">Timeless</span>
            </h1>
            <p className="text-stone-300 mb-8">
              Reach out to Gujarat’s trusted architectural clay experts.
            </p>
            <Link
              to="/inquiry"
              className="inline-flex items-center gap-3 bg-red-700 px-10 py-4 rounded-xl uppercase tracking-widest text-sm hover:bg-red-800 transition"
            >
              Send Inquiry <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>

        {/* EVERYTHING BELOW HERO HAS BRICK BG */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <BrickWall />
          </div>

          <div className="relative z-10">
            {/* TRUST STATS */}
            <div className="py-24 px-6">
              <div className="max-w-6xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl font-serif text-stone-900">
                    Built on <span className="italic text-red-700">Trust & Craftsmanship</span>
                  </h2>
                  <div className="w-20 h-[2px] bg-red-700 mx-auto mt-6"></div>
                </motion.div>

                <div className="grid md:grid-cols-4 gap-8">
                  {[
                    { icon: Award, number: "40+", label: "Years Experience" },
                    { icon: Truck, number: "All India", label: "Supply Network" },
                    { icon: ClipboardCheck, number: "312+", label: "Projects Delivered" },
                    { icon: ShieldCheck, number: "100%", label: "Quality Assured" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group bg-white p-10 rounded-3xl shadow-md border border-stone-100 hover:shadow-xl transition duration-300 text-center"
                    >
                      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-stone-100 flex items-center justify-center group-hover:bg-red-700 transition">
                        <item.icon className="w-7 h-7 text-red-700 group-hover:text-white transition" />
                      </div>
                      <h3 className="text-3xl font-sans text-stone-900 mb-2">{item.number}</h3>
                      <p className="text-stone-500 text-sm tracking-wide uppercase">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* CONTACT SECTION */}
            <div className="py-24 px-6 bg-[#f1ede7]">
              <div className="max-w-6xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
                    Get in <span className="italic text-red-700">Touch</span>
                  </h2>
                  <div className="w-20 h-[2px] bg-red-700 mx-auto mt-6"></div>
                  <p className="mt-6 text-stone-600 max-w-2xl mx-auto text-sm md:text-base">
                    Connect with our architectural clay specialists for project discussions,
                    technical support, or site visits.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                  {contactInfo.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={idx}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -5 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-white p-8 md:p-10 rounded-3xl shadow-md border border-stone-100 hover:shadow-xl transition duration-300 text-center w-full"
                      >
                        <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-6 rounded-2xl bg-stone-100 flex items-center justify-center group-hover:bg-red-700 transition">
                          <Icon className="w-6 h-6 md:w-7 md:h-7 text-red-700 group-hover:text-white transition" />
                        </div>
                        <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-3">{item.title}</h3>
                        <p className="text-lg md:text-xl font-sans text-stone-900 break-words leading-snug">{item.detail}</p>
                        <p className="text-sm text-stone-500 mt-2 break-all">{item.subDetail}</p>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* MAP + FORM SECTION */}
            <div className="py-10 pt-20 px-6">
              <div className="max-w-6xl mx-auto">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-serif text-center mb-16 text-stone-900"
                >
                  Visit or Send Us an Inquiry
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                  {/* LEFT SIDE — MAP */}
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-serif text-stone-800">Our Manufacturing Hub</h3>
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200 h-[280px] md:h-[320px]">
                      <iframe
                        title="VR & Sons Location - Kamrej, Gujarat"
                        src="https://maps.google.com/maps?q=Kamrej+Char+Rasta,+Surat,+Gujarat,+IN&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </motion.div>

                  {/* RIGHT SIDE — FORM */}
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white p-10 rounded-3xl shadow-xl border border-stone-100"
                  >
                    <h3 className="text-2xl font-serif mb-8 text-stone-900">Quick Inquiry</h3>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <input className="border border-stone-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="Your Name" />
                        <input className="border border-stone-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="Phone Number" />
                      </div>
                      <input className="border border-stone-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="Project Location" />
                      <textarea rows="4" className="border border-stone-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="Project Details" />
                      <button type="submit" className="w-full bg-red-700 text-white py-3 rounded-lg uppercase tracking-widest text-sm hover:bg-red-800 transition">
                        Submit Inquiry
                      </button>
                    </form>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="py-20 px-6 relative z-10"
            >
              <div className="max-w-4xl mx-auto bg-white/90 border-stone-100 backdrop-blur-sm p-12 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-serif mb-8 text-center">Frequently Asked Questions</h2>
                {[
                  { question: "Do you supply outside Gujarat?", answer: "Yes, we supply across India with site-direct logistics support." },
                  { question: "What is the minimum order quantity?", answer: "Minimum order depends on brick type. Contact our team for details." },
                  { question: "Do you provide samples?", answer: "Yes, sample bricks can be dispatched upon request." },
                ].map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}