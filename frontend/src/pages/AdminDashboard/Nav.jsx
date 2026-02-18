import { Bell, UserCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full h-16 bg-white/80 backdrop-blur-md border-b border-[#E7E5E4] flex items-center justify-between px-8 sticky top-0 z-50">
      
      {/* LEFT: Branding */}
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-bold tracking-widest text-[#1C1917]">
          ADMIN DASHBOARD
        </h2>
      </div>

      {/* CENTER: Search Bar (New based on your palette) */}
      

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-4">
        
       
        <div className="h-6 w-[1px] bg-[#E7E5E4] mx-1"></div>

        {/* Profile */}
        <button
          className="flex items-center gap-3 pl-2 py-1 pr-1 rounded-full hover:bg-[#F5F5F4] transition-all"
          onClick={() => navigate("/profile")}
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-[#1C1917]">Admin User</p>
            <p className="text-[10px] text-stone-500">Super Admin</p>
          </div>
          <UserCircle className="text-stone-800" size={32} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;