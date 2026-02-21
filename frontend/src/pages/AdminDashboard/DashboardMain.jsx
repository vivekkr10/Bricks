// src/App.js
import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Sidebar import karein
import Navbar from './Nav';   // Navbar import karein
import Dashboard from './Dashboard';   // Dashboard page import karein
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function App() {



  const [activePage, setActivePage] = useState('dashboard');

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/api/auth/logout', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        withCredentials: true
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('admin');
      delete axios.defaults.headers.common['Authorization'];
      navigate('/admin-login');
    }
  };

  return (
    // 'flex' class use karke dono ko side-by-side layenge
    <div className="flex min-h-screen bg-slate-50">

      {/* SIDEBAR: Iska width fixed rahega (w-72) */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        handleLogout={handleLogout}
      />

      {/* MAIN CONTENT AREA: Ye flex-1 lega aur sidebar ke baad shuru hoga */}
      <div className="flex-1 ml-72 flex flex-col">

        {/* TOP NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT: Yahan dashboard dikhega */}
        <main className="p-4">
          {activePage === 'dashboard' && <Dashboard />}

        </main>

      </div>
    </div>
  );
}

export default App;