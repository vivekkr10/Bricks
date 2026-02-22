import React, { useState, useEffect, useMemo } from "react";
import {
  Plus, EyeOff, Eye, Pencil, Trash2, Search, Package, 
  CheckCircle, XCircle, LayoutGrid, List, Filter, 
  ArrowUpRight, ImageIcon, Settings2, HardHat, X, Edit,
  ChevronLeft, ChevronRight // Naye icons
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All Bricks", "Hamptons", "Classic Reds", "Multies", "Rumbled", "Yellows","Darks","Reclaimed"];

const Dashboard = ({ onAddClick, onEditClick ,onViewClick }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("brick_products");
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: "Premium Red Clay Brick",
        type: "Red Clay",
        shortDesc: "High-density traditional bricks for load-bearing walls.",
        specs: "230 x 110 x 75mm | 10.5 N/mm²",
        usage: "Foundation, Exterior Walls",
        status: "Active",
        grade: "A++",
        stock: 45000,
        temp: 1050
      },
      {
        id: 2,
        name: "Eco Fly-Ash Block",
        type: "Fly Ash",
        shortDesc: "Sustainable lightweight blocks for high-rise buildings.",
        specs: "250 x 120 x 80mm | 7.5 N/mm²",
        usage: "Partition Walls",
        status: "Active",
        grade: "A",
        stock: 12000,
        temp: 0
      }
    ];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Bricks");
  const [viewMode, setViewMode] = useState("grid"); 
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // --- PAGINATION LOGIC (Naya Add Kiya Gaya) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.type?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "All Bricks" || p.type === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, activeCategory]);

  // Current page ke items nikalne ke liye
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Search ya category badalne par page 1 par reset karein
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === "Active").length,
    inactive: products.filter(p => p.status !== "Active").length,
    stock: products.reduce((acc, curr) => acc + (curr.stock || 0), 0)
  };

  const toggleStatus = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" } : p
    );
    setProducts(updated);
    localStorage.setItem("brick_products", JSON.stringify(updated));
  };

  const deleteProduct = (id) => {
    if (window.confirm("Permanent delete this asset from catalog?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem("brick_products", JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen text-[#44403C] font-sans">
      <div className="relative max-w-full mx-auto p-2 lg:p-2">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 md:mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-[#1C1917] tracking-tight leading-tight font-serif">
              Bricks <span className="text-orange-600">Catalog</span>
            </h1>
            <p className="text-[#78716C] font-medium max-w-md text-sm md:text-base font-sans">Real-time inventory and product monitoring.</p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={onAddClick}
            className="w-full md:w-auto text-white px-8 py-4 rounded-[1rem] font-black flex items-center justify-center gap-3 shadow-xl bg-orange-600 transition-shadow hover:shadow-orange-200"
          >
            <Plus size={20} /> Add New Product
          </motion.button>
        </header>

        {/* --- STATS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
           <StatCard label="Total Products" value={stats.total} icon={<Package />} color="stone" />
           <StatCard label="Active Products" value={stats.active} icon={<CheckCircle />} color="green" />
           <StatCard label="Inactive Products" value={stats.inactive} icon={<XCircle />} color="orange" />
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="bg-white p-4 rounded-[1.5rem] border border-stone-200 shadow-xl mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-orange-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-[1.5rem] bg-stone-50 outline-none border border-transparent focus:border-orange-200 focus:bg-white font-bold transition-all"
              />
            </div>
            
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="flex bg-stone-100 p-1.5 rounded-[1rem] border border-stone-200 flex-1 lg:flex-none">
                 <button onClick={() => setViewMode('grid')} className={`flex-1 lg:flex-none p-3 rounded-[1rem] transition-all flex justify-center ${viewMode === 'grid' ? "bg-white text-orange-600 shadow-md" : "text-stone-400"}`}><LayoutGrid size={20} /></button>
                 <button onClick={() => setViewMode('list')} className={`flex-1 lg:flex-none p-3 rounded-[1rem] transition-all flex justify-center ${viewMode === 'list' ? "bg-white text-orange-600 shadow-md" : "text-stone-400"}`}><List size={20} /></button>
              </div>

              <button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-[1rem] font-black text-sm transition-all border ${isFilterOpen ? "bg-orange-600 text-white border-orange-600" : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"}`}>
                {isFilterOpen ? <X size={20} /> : <Filter size={20} />}
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t pt-4">
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {CATEGORIES.map(cat => (
                    <CategoryPill key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- PRODUCTS LIST (Using currentItems for Pagination) --- */}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
          <AnimatePresence mode="popLayout">
            {currentItems.map((p) => (
              <motion.div layout key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
                {viewMode === 'list' ? (
                  <ListViewCard p={p} toggleStatus={toggleStatus} onEdit={onEditClick} onDelete={deleteProduct} onView={onViewClick} />
                ) : (
                  <GridViewCard p={p} toggleStatus={toggleStatus} onEdit={onEditClick} onDelete={deleteProduct} onView={onViewClick} />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <Package size={48} className="mx-auto text-stone-200 mb-4" />
              <p className="text-stone-400 font-bold uppercase tracking-widest text-sm">No products found</p>
            </div>
          )}
        </div>

        {/* --- PAGINATION CONTROLS (Naya UI Section) --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12 pb-10">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-3 rounded-xl border border-stone-200 bg-white disabled:opacity-30 hover:bg-orange-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-xl font-bold transition-all border ${
                    currentPage === index + 1 
                    ? "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-100" 
                    : "bg-white text-stone-600 border-stone-200 hover:border-orange-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-3 rounded-xl border border-stone-200 bg-white disabled:opacity-30 hover:bg-orange-50 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- AAPKE BAAKI COMPONENTS (StatCard, ListViewCard, GridViewCard, etc. - NO CHANGE) ---

const StatCard = ({ label, value, icon, color }) => {
  const themes = {
    orange: "text-orange-600 bg-orange-50 border-orange-100",
    green: "text-green-600 bg-green-50 border-green-100",
    stone: "text-stone-600 bg-stone-50 border-stone-200",
  };
  return (
    <div className="bg-white p-4 rounded-[1.5rem] border border-stone-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-xl ${themes[color]} border shrink-0`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <div className="flex flex-col">
        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">{label}</p>
        <h3 className="text-2xl font-black text-[#1C1917] tracking-tighter leading-none">{value}</h3>
      </div>
    </div>
  );
};

const ListViewCard = ({ p, toggleStatus, onEdit, onDelete, onView }) => (
  <div className="bg-white p-5 md:p-6 rounded-[2rem] border border-stone-200 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center hover:shadow-xl hover:border-orange-200 transition-all group relative">
    <div className="w-full md:w-32 h-40 md:h-32 bg-stone-50 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center shrink-0 overflow-hidden border border-stone-100 shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
      {p.image ? (
        <img src={p.image} alt="" className="w-full h-full object-cover" />
      ) : (
        <ImageIcon size={32} className="text-stone-200 group-hover:text-orange-200" />
      )}
    </div>

    <div className="flex-1 w-full space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl md:text-2xl font-black text-[#1C1917] tracking-tight">{p.name}</h3>
            <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
              p.status === "Active" ? "bg-green-50 text-green-700 border-green-100" : "bg-stone-50 text-stone-500 border-stone-200"
            }`}>
              {p.status}
            </span>
          </div>
          <p className="text-stone-500 font-medium text-sm mt-1 line-clamp-1">{p.shortDesc}</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
           <ActionButton onClick={() => toggleStatus(p.id)} icon={p.status === "Active" ? <Eye size={18}/> : <EyeOff size={18}/>} tooltip="Toggle Visibility" />
           <ActionButton onClick={() => onEdit(p.id)} icon={<Edit size={18}/>} tooltip="Modify Asset" />
           <ActionButton onClick={() => onDelete(p.id)} icon={<Trash2 size={18}/>} variant="danger" tooltip="Decommission" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-stone-100 items-end">
         <InfoBlock label="Batch Size" value={p.size} icon={<Settings2 size={12}/>} />
         <InfoBlock label="Application" value={p.application} icon={<HardHat size={12}/>} />
         <button onClick={() => onView(p)} className="sm:ml-auto w-full sm:w-fit p-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 md:hover:scale-110 transition-all border border-orange-100 flex items-center justify-center gap-2">
            <span className="sm:hidden font-bold text-xs uppercase tracking-widest">View Details</span>
            <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  </div>
);

const GridViewCard = ({ p, toggleStatus, onEdit, onDelete, onView }) => (
  <div className="bg-white p-4 rounded-[1.5rem] border border-stone-200 hover:shadow-2xl transition-all group h-full flex flex-col">
    <div className="w-full h-48 bg-stone-50 rounded-[1.5rem] mb-4 overflow-hidden border border-stone-100 relative shadow-inner">
       {p.image ? (
        <img src={p.image} alt="" className="w-full h-full object-cover" />
      ) : (
        <ImageIcon size={48} className="text-stone-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-[1rem] text-[9px] font-black uppercase tracking-widest border border-stone-100 shadow-sm">
        {p.type}
      </div>
    </div>
    
    <div className="flex-1 space-y-2 mb-6 px-1">
      <h3 className="text-xl md:text-xl font-black text-[#1C1917] tracking-tight group-hover:text-orange-600 transition-colors line-clamp-1 uppercase font-sarif">{p.name}</h3>
      <p className="text-stone-500 text-sm font-medium line-clamp-2 leading-relaxed">{p.shortDesc}</p>
    </div>

    <div className="space-y-4 px-1 pb-1">
      <div className="grid grid-cols-2 gap-2">
        <InfoBlock label="Batch Size" value={p.size} icon={<Settings2 size={12}/>} />
        <InfoBlock label="Application" value={p.application} icon={<HardHat size={12}/>} />
      </div>

      <div className="flex justify-between gap-2 pt-2">
        <ActionButton onClick={() => toggleStatus(p.id)} icon={p.status === "Active" ? <Eye size={18}/> : <EyeOff size={18}/>} tooltip="Toggle Visibility" />
           <ActionButton onClick={() => onEdit(p.id)} icon={<Edit size={18}/>} tooltip="Modify Asset" />
           <ActionButton onClick={() => onDelete(p.id)} icon={<Trash2 size={18}/>} variant="danger" tooltip="Decommission" />
        <ActionButton onClick={() => onView(p)} icon={<ArrowUpRight size={18}/>} tooltip="View Details" />
      </div>
    </div>
  </div>
);

const CategoryPill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border whitespace-nowrap
      ${active 
        ? "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-100" 
        : "bg-white text-stone-500 border-stone-100 hover:border-orange-600 hover:text-stone-600"
      }`}
  >
    {label}
  </button>
);

const InfoBlock = ({ label, value, icon }) => (
  <div className="space-y-1">
    <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5 leading-none">
       {icon} {label}
    </p>
    <p className="text-xs font-bold text-stone-800 line-clamp-1">{value}</p>
  </div>
);

const ActionButton = ({ icon, onClick, variant = "default", tooltip }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    title={tooltip}
    className={`flex-1 sm:flex-none p-3 rounded-xl border transition-all shadow-sm flex items-center justify-center ${
      variant === "danger" 
      ? "bg-red-50 border-red-100 text-red-600 hover:bg-red-600 hover:text-white" 
      : "bg-white border-stone-200 text-stone-500 hover:border-orange-600 hover:text-orange-600"
    }`}
  >
    {icon}
  </motion.button>
);

export default Dashboard;
