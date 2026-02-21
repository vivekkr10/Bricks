import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import Navbar from './Nav';   
import Dashboard from './Dashboard';   
import ProductForm from './ProductForm'; 
import ProfileSettings from './profile'; 
import ProductDetails from './View'; 

function MainDashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [editId, setEditId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // State for Sidebar Shrink/Expand
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    if(window.confirm("Are you sure you want to logout?")) {
      alert("Logged out!");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F7F5]">
      
      <style>{`
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Jost', sans-serif; }
      `}</style>

      {/* 1. Sidebar with collapsed states */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        handleLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* 2. Main Content Area */}
      {/* ml-0: Mobile pe space cover karega | lg:ml: Desktop pe sidebar ke hisab se space chhodega */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out 
        ml-0 
        ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}
      >
        {/* Navbar */}
        <Navbar onProfileClick={() => setActivePage('profile')} />

        <main className="p-4 flex-1">
          {/* Dashboard View */}
          {activePage === 'dashboard' && (
            <Dashboard 
              onAddClick={() => setActivePage('add')} 
              onEditClick={(id) => { 
                setEditId(id); 
                setActivePage('edit'); 
              }} 
              onViewClick={(product) => {
                setSelectedProduct(product); 
                setActivePage('view');        
              }}
            />
          )}

          {/* Product Form View (Add/Edit) */}
          {(activePage === 'add' || activePage === 'edit') && (
            <ProductForm 
              editId={activePage === 'edit' ? editId : null} 
              onCancel={() => { 
                setActivePage('dashboard'); 
                setEditId(null); 
              }} 
            />
          )}

          {/* Profile Settings View */}
          {activePage === 'profile' && (
            <ProfileSettings onCancel={() => setActivePage('dashboard')} />
          )}

          {/* Product Details View */}
          {activePage === 'view' && (
            <ProductDetails 
              product={selectedProduct} 
              onBack={() => {
                setActivePage('dashboard');
                setSelectedProduct(null);
              }} 
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default MainDashboard;