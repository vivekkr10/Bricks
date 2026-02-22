// src/pages/AdminDashboard/MainDashboard.jsx
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
  const [selectedProduct, setSelectedProduct] = useState(null); // Product data store karne ke liye

  const handleLogout = () => {
    if(window.confirm("Are you sure you want to logout?")) {
      alert("Logged out!");
    }
  };

  return (
    <div className="flex min-h-screen">
      
      <style>{`
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Jost', sans-serif; }
      `}</style>

      {/* 1. Sidebar hamesha rahega */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        handleLogout={handleLogout} 
      />

      <div className="flex-1 ml-72 flex flex-col">
        {/* 2. Navbar hamesha rahega */}
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
                setSelectedProduct(product); // Product object save kiya
                setActivePage('view');        // Page change kiya
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

          {/* 3. Profile Settings View */}
          {activePage === 'profile' && (
            <ProfileSettings onCancel={() => setActivePage('dashboard')} />
          )}

          {/* 4. Product Details View (Jo aapne manga tha) */}
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