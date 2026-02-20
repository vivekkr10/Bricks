import React, { useState } from 'react';
import { 
  LayoutDashboard, LogOut, BrickWall, 
  Settings, 
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ activePage, setActivePage, handleLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Aap yahan apni bricks ki image ka path daal sakte hain
  const brickImg = "/src/assets/img3.jpeg"; // Replace with your actual image path

  return (
    <motion.div 
      animate={{ width: isCollapsed ? 88 : 288 }}
      // Fixed size and positions as per your original code
      className="h-screen text-[#F5F5F4] flex flex-col fixed left-0 top-0 shadow-2xl z-50 border-r border-[#292524] transition-all duration-300 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(50, 20, 20, .8), rgba(50, 20, 20, .8)), url(${brickImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      
      {/* 1. TOP SECTION: Logo & Toggle Button */}
      <div 
        className={`p-6 flex ${isCollapsed ? 'flex-col gap-4' : 'flex-row justify-between'} items-center overflow-hidden cursor-pointer`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#EA580C] rounded-xl flex items-center justify-center shadow-lg shadow-orange-900/20 shrink-0">
            <BrickWall size={24} className="text-white" />
          </div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={false}
                animate={{ width: isCollapsed ? 88 : 187.5 }}
                className="whitespace-nowrap"
              >
                <h1 className="font-black text-lg tracking-tight leading-none text-[#F5F5F4]">VR & SONS</h1>
                <p className="text-[12px] text-[#EA580C] font-bold tracking-[1.5px] uppercase mt-1">Bricks Industry</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div >
        <div className="h-[1px] bg-[#EA580C]" />
      </div>

      {/* 2. MIDDLE: Navigation */}
      <nav className="flex-1 mt-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <NavItem 
          icon={<LayoutDashboard size={22} />} 
          label="Dashboard" 
          active={activePage === 'dashboard'} 
          isCollapsed={isCollapsed}
          onClick={() => setActivePage('dashboard')}
        />
        <NavItem 
          icon={<User size={22} />} 
          label="profile" 
          active={activePage === 'profile'} 
          isCollapsed={isCollapsed}
          onClick={() => setActivePage('profile')}
        />
      </nav>

        <div >
        <div className="h-[1.5px] bg-[#EA580C]" />
      </div>

      {/* 3. BOTTOM: Logout Section */}
      <div className="p-4 mt-auto border-t border-[#292524]">
        <button 
          onClick={handleLogout}
          className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-300 group hover:bg-red-500/10 ${isCollapsed ? 'justify-center' : ''}`}
        >
          <div className="p-2 bg-[#292524] rounded-lg group-hover:bg-[#EA580C] text-[#EA580C] group-hover:text-white transition-colors duration-300 shrink-0">
            <LogOut size={20} />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-sm text-[#EA580C] uppercase tracking-widest group-hover:text-white whitespace-nowrap">Logout</span>
          )}
        </button>
      </div>
    </motion.div>
  );
};

const NavItem = ({ icon, label, active, isCollapsed, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 group relative border-l-4 ${
      active 
      ? 'bg-[#292524] border-[#EA580C] text-[#F5F5F4]' 
      : 'hover:bg-[#292524]/50 border-transparent text-[#EA580C] hover:text-[#F5F5F4]'
    } ${isCollapsed ? 'justify-center' : ''}`}
  >
    <div className={`shrink-0 ${active ? 'text-[#F5F5F4]' : 'group-hover:text-[#F5F5F4]'} transition-colors`}>
      {icon}
    </div>
    
    {!isCollapsed && (
      <span className={`font-semibold text-sm tracking-wide whitespace-nowrap ${active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
        {label}
      </span>
    )}

    {isCollapsed && (
      <div className="absolute left-20 bg-[#292524] text-[#F5F5F4] text-[10px] font-bold px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-[60] uppercase tracking-widest shadow-2xl border border-[#78716C]/20">
        {label}
      </div>
    )}
  </div>
);

export default Sidebar;