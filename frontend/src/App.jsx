import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop.jsx";
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
<<<<<<< aboutChangesAndProjectChanges
import ProductsPage from "./pages/Products/ProductsPage.jsx"
import ProductDetails from "./pages/Products/ProductDetailPage.jsx";
import BlogSection from "./pages/blog/BlogSection.jsx";
import Contact from "./pages/contactPage/Contact.jsx";
import BlogDetails from "./pages/blog/BlogDetails.jsx";
=======
import { ProductsPage, ProductDetails } from "./pages/Products";
import Contact from "./pages/contactPage/ContactSection.jsx";
>>>>>>> main
import AboutPage from "./pages/AboutPage/About.jsx";
// Projects Page
import ProjectPage from "./pages/Project/Project.jsx";

import FeaturedArticle from "./pages/blog/FeaturedArticle.jsx";
import ContactSection from "./pages/contactPage/ContactSection";
import Inquiry from "./pages/contactPage/Inquiry";

import ProjectDetailsPage from "./pages/Project/ProjectDetailPage.jsx";

import ForgotPasswordOTP from "./pages/auth/ForgotPasswordOTP";

  




function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Admin Auth Routes */}
        <Route path="/dashboard" element={<Dashboard/>} /> 
         <Route path="/profile" element={<Profile/>} /> 
        <Route path="/product-form" element={<ProductForm/>} />
         
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password" element={<ForgotPasswordOTP />} />
        {/* Other Routes */}
        <Route path="/services" element={<Services />} />
        {/* <Route path="/admin-register" element={<AdminRegister />} /> */}

        <Route path="/products" element={<ProductsPage />} />
<<<<<<< aboutChangesAndProjectChanges
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/blog" element={<BlogSection />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
=======
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/blog" element={<FeaturedArticle />} />
>>>>>>> main
        <Route path="/contact" element={<Contact />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="/contact" element={<ContactSection />} />


        

        {/* 404 Fallback - Keep this at the end */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </>
  );
}

export default App;