import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import Navbar from './Nav';   
import Dashboard from './Dashboard';   
import ProductForm from './ProductForm'; 
import ProfileSettings from './profile'; 
import ProductDetails from './View'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MainDashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [editId, setEditId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    // Call backend to clear the httpOnly cookie
    await axios.get('http://localhost:5000/api/auth/logout', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      },
      withCredentials: true
    });
  } catch (err) {
    // Even if API call fails, still clear local storage and redirect
    console.error('Logout error:', err);
  } finally {
    // Always clear localStorage and redirect
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/admin-login');
  }
};

  return (
    // ❌ BODY SCROLL OFF
    <div className="flex h-screen overflow-hidden bg-[#F8F7F5]">

      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        handleLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* MAIN AREA */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300
          ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}
        `}
      >
        {/* NAVBAR FIXED */}
        <Navbar onProfileClick={() => setActivePage('profile')} />

        {/* ✅ ONLY DASHBOARD SCROLLS */}
        <main className="flex-1 overflow-y-auto p-4">
          
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

          {(activePage === 'add' || activePage === 'edit') && (
            <ProductForm 
              editId={activePage === 'edit' ? editId : null} 
              onCancel={() => { 
                setActivePage('dashboard'); 
                setEditId(null); 
              }} 
            />
          )}

          {activePage === 'profile' && (
            <ProfileSettings onCancel={() => setActivePage('dashboard')} />
          )}

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