import React, { useState } from 'react';
import { 
  LayoutDashboard, LogOut, BrickWall, 
  User, Menu, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ activePage, setActivePage, handleLogout, isCollapsed, setIsCollapsed }) => {
  // Mobile drawer open/close state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const brickImg = "/src/assets/img3.jpeg"; 

  return (
    <>
      {/* MOBILE HEADER (Sirf phone view me dikhega) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white flex items-center justify-between px-6 z-[60] border-b border-[#EA580C]/30">
        <div className="flex items-center gap-3">
          <BrickWall size={20} className="text-red-700" />
          <h1 className="font-black text-sm text-black">VR & SONS</h1>
        </div>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-[#EA580C] hover:bg-[#EA580C]/10 rounded-lg transition-colors"
        >
          {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* OVERLAY (Mobile me sidebar ke piche ka kala parda) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.div 
        className={`h-screen text-[#F5F5F4] flex flex-col fixed left-0 top-0 shadow-2xl z-[58] border-r border-[#292524] transition-all duration-300 overflow-hidden
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'w-20' : 'w-72'}`}
        style={{
          backgroundImage: `linear-gradient(rgba(50, 20, 20, .8), rgba(50, 20, 20, .8)), url(${brickImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* TOP SECTION */}
        <div className={`p-6 flex ${isCollapsed ? 'flex-col gap-4' : 'flex-row justify-between'} items-center overflow-hidden`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#EA580C] rounded-xl flex items-center justify-center shadow-lg shadow-orange-900/20 shrink-0">
              <BrickWall size={24} className="text-white" />
            </div>
            
            {!isCollapsed && (
              <div className="whitespace-nowrap">
                <h1 className="font-black text-lg tracking-tight leading-none text-[#F5F5F4]">VR & SONS</h1>
                <p className="text-[12px] text-[#EA580C] font-bold tracking-[1.5px] uppercase mt-1">Bricks Industry</p>
              </div>
            )}
          </div>
        </div>

        <div><div className="h-[1px] bg-[#EA580C]" /></div>

        {/* MIDDLE: Navigation */}
        <nav className="flex-1 mt-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden">
          <NavItem 
            icon={<LayoutDashboard size={22} />} 
            label="Dashboard" 
            active={activePage === 'dashboard'} 
            isCollapsed={isCollapsed}
            onClick={() => { setActivePage('dashboard'); setIsMobileOpen(false); }}
          />
          <NavItem 
            icon={<User size={22} />} 
            label="Profile" 
            active={activePage === 'profile'} 
            isCollapsed={isCollapsed}
            onClick={() => { setActivePage('profile'); setIsMobileOpen(false); }}
          />
        </nav>

        <div><div className="h-[1.5px] bg-[#EA580C]" /></div>

        {/* BOTTOM: Logout Section */}
        <div className="p-4 mt-auto border-t border-[#292524]">
          <button 
            onClick={handleLogout}
            className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-300 group hover:bg-red-500/10 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className="p-2 group-hover:bg-[#EA580C] rounded-lg  text-white group-hover:text-white transition-colors duration-300 shrink-0">
              <LogOut size={20} />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-sm group-hover:text-[#EA580C] uppercase tracking-widest text-white whitespace-nowrap">Logout</span>
            )}
          </button>
        </div>
      </motion.div>
    </>
  );
};

const NavItem = ({ icon, label, active, isCollapsed, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 group relative border-l-4 ${
      active 
      ? 'bg-[#292524] border-[#EA580C] text-red-600' 
      : 'hover:bg-[#292524]/50 border-transparent hover:text-white text-white'
    } ${isCollapsed ? 'justify-center' : ''}`}
  >
    <div className={`shrink-0 ${active ? 'text-red-600' : 'group-hover:text-white'} transition-colors`}>
      {icon}
    </div>
    {!isCollapsed && (
      <span className={`font-semibold text-sm tracking-wide whitespace-nowrap ${active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
        {label}
      </span>
    )}
  </div>
);

export default Sidebar;