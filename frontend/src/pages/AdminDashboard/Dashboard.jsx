import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus, EyeOff, Eye, Pencil, Trash2,
  Image as ImageIcon, Search,
  Package, CheckCircle, XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";


const Dashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/all-products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

 const filteredProducts = products.filter((p) => {
  const name = p.name?.toString().toLowerCase() || "";
  const type = p.type?.toString().toLowerCase() || "";
  const usage = p.usage?.toString().toLowerCase() || "";
  const search = searchTerm.toLowerCase();

  return name.includes(search) || type.includes(search) || usage.includes(search);
});



  const total = filteredProducts.length;
  const active = filteredProducts.filter((p) => p.status === "Active").length;
  const inactive = total - active;

 const toggleStatus = async (id) => {
  try {
    const response = await axios.patch(`http://localhost:5000/api/products/toggle-status/${id}`);
    
    if (response.data.success) {
      setProducts(prevProducts => 
        prevProducts.map((p) =>
          p._id === id ? { ...p, status: response.data.newStatus } : p
        )
      );
    }
  } catch (error) {
    console.error("Status Toggle Error:", error);
    alert("Failed to update status");
  }
};

 const deleteProduct = async (e, id) => {
  e.stopPropagation();
  if (window.confirm("Are you sure you want to delete this product?")) {
    try {
      await axios.delete(`http://localhost:5000/api/products/delete-product/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.log("Error", error.response || error);
      alert("Error deleting product");
    }
  }
};

  return (
    // Background: Stone-50 (#F9F8F7)
    <div className="min-h-screen bg-[#F9F8F7] p-8 text-[#44403C]">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-black text-[#1C1917] tracking-tight">Product Catalog</h2>
          <p className="text-[#78716C] mt-1 text-sm">Manage your brick inventory and listings.</p>
        </div>

        <div className="flex gap-4 items-center w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#78716C]" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // Input Bg: Stone-100, Border: Stone-200
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-[#E7E5E4] outline-none focus:ring-2 focus:ring-[#EA580C]/20 transition-all shadow-sm"
            />
          </div>

          <button
            onClick={() => navigate("/product-form")}
            // Primary: Orange-600 (#EA580C)
            className="bg-[#EA580C] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-orange-600/20 hover:bg-[#c2410c] transition-colors whitespace-nowrap"
          >
            <Plus size={20} /> New Product
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Stat label="TOTAL INVENTORY" value={total} color="orange" />
        <Stat label="ACTIVE LISTINGS" value={active} color="green" />
        <Stat label="INACTIVE" value={inactive} color="stone" />
      </div>

      {/* PRODUCT LIST */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredProducts.map((p) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              // Card: Pure White (#FFFFFF), Border: Stone-200 (#E7E5E4)
              className="bg-white p-5 rounded-2xl border border-[#E7E5E4] flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition-shadow"
            >
              {/* Image Container */}
              <div className="w-24 h-24 bg-[#F5F5F4] rounded-xl flex items-center justify-center shrink-0 overflow-hidden border border-[#E7E5E4]">
                {p.image ? (
                  <img src={p.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={32} className="text-[#D6D3D1]" />
                )}
              </div>

              <div className="flex-1 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-[#1C1917]">{p.productName}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        p.status === "Active" ? "bg-green-100 text-[#15803D]" : "bg-stone-100 text-[#78716C]"
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <p className="text-[#78716C] text-sm mt-0.5">{p.shortDescription}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <ActionButton onClick={() => toggleStatus(p._id)} icon={p.status === "Inactive" ? <EyeOff size={18} /> : <Eye size={18} />} />
                    <ActionButton onClick={() => navigate(`/add?id=${p._id}`)} icon={<Pencil size={18} />} />
                    <ActionButton onClick={(e) => deleteProduct(e, p._id)} icon={<Trash2 size={18} />} variant="danger" />
                  </div>
                </div>

                <div className="mt-4 flex gap-8 border-t border-[#F5F5F4] pt-4">
                  <div>
                    <p className="text-[10px] font-bold text-[#78716C] uppercase tracking-widest">Specifications</p>
                    <p className="text-sm text-[#44403C] font-medium">{p.specifications}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#78716C] uppercase tracking-widest">Usage Area</p>
                    <p className="text-sm text-[#44403C] font-medium">{p.usageArea}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ===== HELPER COMPONENTS ===== */

const Stat = ({ label, value, color }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) { setCount(end); return; }
    const duration = 800;
    const stepTime = Math.max(Math.floor(duration / (end || 1)), 20);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  const styles = {
    orange: { icon: <Package size={22} className="text-[#EA580C]" />, bg: "bg-white", border: "border-[#E7E5E4]", accent: "bg-[#EA580C]" },
    green: { icon: <CheckCircle size={22} className="text-[#15803D]" />, bg: "bg-white", border: "border-[#E7E5E4]", accent: "bg-[#15803D]" },
    stone: { icon: <XCircle size={22} className="text-[#78716C]" />, bg: "bg-white", border: "border-[#E7E5E4]", accent: "bg-[#78716C]" },
  }[color];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`${styles.bg} p-6 rounded-2xl border ${styles.border} shadow-sm relative overflow-hidden group`}
    >
      <div className="absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: styles.accent.split('[')[1].split(']')[0] }}></div>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-[#78716C] tracking-widest uppercase">{label}</p>
          <p className="text-4xl font-black mt-2 text-[#1C1917]">{count}</p>
        </div>
        <div className="p-3 bg-[#F9F8F7] rounded-xl border border-[#E7E5E4]">
          {styles.icon}
        </div>
      </div>
    </motion.div>
  );
};

const ActionButton = ({ icon, onClick, variant = "default" }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`p-2.5 rounded-lg border transition-colors ${
      variant === "danger" 
      ? "bg-red-50 border-red-100 text-red-600 hover:bg-red-600 hover:text-white" 
      : "bg-white border-[#E7E5E4] text-[#78716C] hover:border-[#EA580C] hover:text-[#EA580C]"
    }`}
  >
    {icon}
  </motion.button>
);

export default Dashboard;


