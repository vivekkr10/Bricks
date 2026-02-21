import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';

const ComingSoon = () => {
  const location = useLocation();
  
  // Extract page name from URL (e.g., "/about" -> "About")
  const pageName = location.pathname.replace('/', '').replace('-', ' ');

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-stone-50">
      <div className="p-6 bg-white rounded-full shadow-xl mb-6">
        <Construction className="w-16 h-16 text-orange-600" />
      </div>
      
      <h1 className="text-4xl font-black text-stone-900 mb-4 capitalize">
        {pageName || "Page"} 
      </h1>
      
      <p className="text-xl text-stone-500 max-w-md mb-8">
        We are currently building this section. <br/>
        The <strong>{pageName}</strong> page will be available soon with premium content.
      </p>

      <Link 
        to="/" 
        className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Return Home
      </Link>
    </div>
  );
};

export default ComingSoon;