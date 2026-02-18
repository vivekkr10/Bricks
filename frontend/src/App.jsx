import ScrollToTop from "./components/ScrollToTop.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Services from "./pages/services";
import AdminLogin from "./pages/auth/adminLogin.jsx";
import AdminRegister from "./pages/auth/adminRegister.jsx";
import Terms from "./pages/terms.jsx";
import Privacy from "./pages/privacy.jsx";
import Home from "./Home/home.jsx";
import Dashboard from "./pages/AdminDashboard/DashboardMain.jsx";
import ProductForm from "./pages/AdminDashboard/ProductForm.jsx"
import Profile from "./pages/AdminDashboard/profile.jsx"


// 3. The Temporary Fix
import ComingSoon from "./Components/commingsoon.jsx";
import { ProductsPage, ProductDetails } from "./pages/Products";
import BlogSection from "./pages/blog/BlogSection.jsx";
import Contact from "./pages/contactPage/Contact.jsx";
import BlogDetails from "./pages/blog/BlogDetails.jsx";
import AboutPage from "./pages/AboutPage/About.jsx";
// Projects Page 
import ProjectPage from "./pages/Project/Project.jsx";

import ProjectDetailsPage from "./pages/Project/ProjectDetailPage.jsx";

import ForgotPasswordOTP from "./pages/auth/ForgotPasswordOTP";
import ForgotPassword from "./pages/auth/ForgotPassword";






function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Admin Auth Routes */}
        <Route path="/dashboard" element={<Dashboard/>} /> 
         <Route path="/profile" element={<Profile/>} /> 
        <Route path="/ ProductForm" element={<ProductForm/>} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        <Route path="/forgot-password" element={<ForgotPasswordOTP />} />
        {/* Other Routes */}
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/blog" element={<BlogSection />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />

        {/* 404 Fallback - Keep this at the end */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;