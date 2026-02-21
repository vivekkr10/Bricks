import React, { useState } from "react";
import {
  ArrowLeft,
  Tag,
  Layers,
  Settings,
  Box,
  ShieldCheck,
  HardHat,
  FileText,
  HelpCircle,
  CheckCircle2,
  Info,
  Package,
  Calendar,
  Factory,
  Truck,
  BadgeCheck,
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================================
   ROOT COMPONENT
========================================================= */

const ProductDetails = ({ product, onBack }) => {
  const [activeImg, setActiveImg] = useState(
    product?.images?.[0] || product?.image
  );
  const [activeTab, setActiveTab] = useState("overview");

  if (!product) {
    return <ProductNotFound onBack={onBack} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-stone-300 font-sans">
      <div className="flex flex-col-reverse lg:flex-row h-screen overflow-hidden">

        {/* ================= LEFT IMAGE PANEL ================= */}
        <ImagePanel
          product={product}
          activeImg={activeImg}
          setActiveImg={setActiveImg}
          onBack={onBack}
        />

        {/* ================= RIGHT DETAILS PANEL ================= */}
        <div className="w-full  lg:w-[50%] overflow-y-auto bg-[#0D0D0D]">

         

          <div className="px-6 md:px-8 lg:px-5 pb-20">

            <HeaderSection product={product} />

            <InfoGrid product={product} />

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <TabWrapper key="overview">
                  <OverviewTab product={product} />
                </TabWrapper>
              )}

              {activeTab === "specs" && (
                <TabWrapper key="specs">
                  <SpecsTab product={product} />
                </TabWrapper>
              )}

              {activeTab === "usage" && (
                <TabWrapper key="usage">
                  <UsageTab product={product} />
                </TabWrapper>
              )}

              {activeTab === "logistics" && (
                <TabWrapper key="logistics">
                  <LogisticsTab product={product} />
                </TabWrapper>
              )}
            </AnimatePresence>

            <FooterBadges />
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   IMAGE PANEL
========================================================= */

const ImagePanel = ({ product, activeImg, setActiveImg, onBack }) => (
  <div className="relative w-full lg:w-[50%] h-[45vh] lg:h-full bg-stone-900 border-r border-white/5">

    <AnimatePresence mode="wait">
      <motion.img
        key={activeImg}
        src={activeImg}
        alt={product.name}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full object-cover"
      />
    </AnimatePresence>

    {/* Back */}
    <button
      onClick={onBack}
      className="absolute top-6 left-6 flex items-center gap-2 px-3 py-2  backdrop-blur-md rounded-lg border border-white/10 bg-orange-600 hover:scale-105 transition"
    >
      <ArrowLeft size={14} className="text-white" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-white">
        Back
      </span>
    </button>

    {/* Image Counter */}
    {product.images?.length > 0 && (
      <div className="absolute bottom-6 right-6 px-3 py-1 bg-black/60 rounded text-[10px] text-white uppercase tracking-widest">
        {product.images.indexOf(activeImg) + 1} / {product.images.length}
      </div>
    )}

    {/* Thumbnails */}
    <div className="absolute bottom-6 left-6 flex gap-2">
      {product.images?.map((img, i) => (
        <button
          key={i}
          onClick={() => setActiveImg(img)}
          className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
            activeImg === img
              ? "border-orange-500 scale-105"
              : "border-transparent opacity-40"
          }`}
        >
          <img src={img} className="w-full h-full object-cover" />
        </button>
      ))}
    </div>
  </div>
);

/* =========================================================
   STICKY ACTION BAR
========================================================= */





/* =========================================================
   HEADER
========================================================= */

const HeaderSection = ({ product }) => (
  <header className="mt-10 mb-12 space-y-4">
    <div className="flex justify-between items-center">
      <StatusBadge status={product.status} />
    </div>

    <h1 className="text-xl md:text-1.5xl font-black text-white uppercase tracking-tight">
      {product.name}
    </h1>

    <p className="text-sm italic text-stone-500 max-w-2xl">
      {product.shortDesc || "No short description available."}
    </p>
  </header>
);

const StatusBadge = ({ status }) => (
  <span className="text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded bg-orange-500/10 text-orange-500">
    {status || "Active"}
  </span>
);

/* =========================================================
   INFO GRID
========================================================= */

const InfoGrid = ({ product }) => (
  <div className="grid grid-cols-2 md:grid-rows-2 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden mb-14">
    <InfoBlock label="Category" value={product.type} icon={<Layers size={14} />} />
    <InfoBlock label="Application" value={product.application} icon={<HardHat size={14} />} />
    <InfoBlock label="Product Code" value={`#${product.id}`} icon={<Tag size={14} />} />
    <InfoBlock label="Manufacturer" value={product.brand || "In-House"} icon={<Factory size={14} />} />
  </div>
);

/* =========================================================
   TABS
========================================================= */

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: <Info size={14} /> },
    { id: "specs", label: "Specifications", icon: <Settings size={14} /> },
    { id: "logistics", label: "Logistics", icon: <Truck size={14} /> }
  ];

  return (
    <div className="flex gap-6 mb-6 border-b border-white/5">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 pb-4 text-xs font-bold uppercase  transition ${
            activeTab === tab.id
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-stone-500 hover:text-white"
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const TabWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

/* =========================================================
   TABS CONTENT
========================================================= */

const OverviewTab = ({ product }) => (
  <Section title="Product Overview" icon={<FileText size={14} />}>
    <p className="text-sm leading-loose text-stone-400">
      {product.detailedDesc || "Detailed description not available."}
    </p>
  </Section>
);

const SpecsTab = ({ product }) => (
  <Section title="Technical Specifications" icon={<Settings size={14} />}>
    <div className="grid grid-cols-2 gap-4">
      <SpecItem label="Brick Type" value={product.brickType || "Clay Brick"} />
      <SpecItem label="Dimensions" value={product.size || "190 × 90 × 90 mm"} />
      <SpecItem label="Compressive Strength" value="10 N/mm²" />
      <SpecItem label="Water Absorption" value="< 15%" />
      <SpecItem label="Finish" value="Smooth" />
      <SpecItem label="Color" value="Red" />
    </div>
  </Section>
);

const UsageTab = ({ product }) => (
  <Section title="Usage Guidelines" icon={<HelpCircle size={14} />}>
    <div className="flex gap-3 p-4 rounded-xl bg-orange-500/5 border border-orange-500/20">
      <HelpCircle size={16} className="text-orange-500 mt-1" />
      <p className="text-xs italic leading-relaxed text-stone-400">
        {product.usage || "Usage guidelines not specified."}
      </p>
    </div>
  </Section>
);

const LogisticsTab = () => (
  <Section title="Logistics & Packaging" icon={<Package size={14} />}>
    <div className="grid grid-cols-2 gap-4">
      <SpecItem label="Packaging" value="Palletized" />
      <SpecItem label="Dispatch Time" value="2–3 Working Days" />
      <SpecItem label="Transport" value="Truck / Container" />
      <SpecItem label="Stock Status" value="Available" />
    </div>
  </Section>
);

/* =========================================================
   UI BUILDING BLOCKS
========================================================= */

const Section = ({ title, icon, children }) => (
  <section className="mb-14 space-y-6">
    <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-orange-500 border-l-2 border-orange-500 pl-3">
      {icon}
      {title}
    </h3>
    {children}
  </section>
);

const InfoBlock = ({ label, value, icon }) => (
  <div className="bg-[#0D0D0D] p-5 hover:bg-white/[0.03] transition">
    <div className="flex items-center gap-2 mb-2 text-stone-600">
      {icon}
      <span className="text-[9px] uppercase tracking-widest font-black">
        {label}
      </span>
    </div>
    <p className="text-xs font-bold text-white truncate">{value}</p>
  </div>
);

const SpecItem = ({ label, value }) => (
  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
    <p className="text-[10px] uppercase tracking-widest text-stone-500">
      {label}
    </p>
    <p className="text-sm font-bold text-white mt-1">{value}</p>
  </div>
);

/* =========================================================
   FOOTER
========================================================= */

const FooterBadges = () => (
  <footer className="grid  h-1 grid-cols-3 gap-4 text-center text-[9px] uppercase tracking-widest opacity-60 border-t border-white/5 pt-13 ">
    <Badge icon={<ShieldCheck size={12} />} label="ISO Certified" />
    <Badge icon={<CheckCircle2 size={12} />} label="Quality Tested" />
    <Badge icon={<Box size={12} />} label="Ready Stock" />
  </footer>
);

const Badge = ({ icon, label }) => (
  <div className="flex justify-center gap-2 items-center">
    {icon}
    {label}
  </div>
);

/* =========================================================
   NOT FOUND
========================================================= */

const ProductNotFound = ({ onBack }) => (
  <div className="min-h-screen flex items-center justify-center bg-black text-white">
    <div className="text-center space-y-6">
      <ImageIcon size={48} className="mx-auto opacity-20" />
      <h2 className="text-sm uppercase tracking-widest font-black">
        Product Not Found
      </h2>
      <button
        onClick={onBack}
        className="text-xs uppercase tracking-widest border-b border-orange-500 text-orange-500"
      >
        Go Back
      </button>
    </div>
  </div>
);

export default ProductDetails;