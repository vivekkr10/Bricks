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
import ProductForm from "./pages/AdminDashboard/ProductForm.jsx";
import Profile from "./pages/AdminDashboard/profile.jsx";
import BlogDetail from "./pages/blog/blogDetail.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

// 3. The Temporary Fix
import ComingSoon from "./Components/commingsoon.jsx";
import { ProductsPage, ProductDetails } from "./pages/Products";
import Contact from "./pages/contactPage/ContactSection.jsx";
import AboutPage from "./pages/AboutPage/About.jsx";
// Projects Page
import ProjectPage from "./pages/Project/Project.jsx";
import FeaturedArticle from "./pages/blog/FeaturedArticle.jsx";
import ContactSection from "./pages/contactPage/ContactSection";
import ProjectDetailsPage from "./pages/Project/ProjectDetailPage.jsx";
import ForgotPasswordOTP from "./pages/auth/ForgotPasswordOTP";

import InquiryPage from "./Inquiry/InquiryForm.jsx";
import ThankYouPage from "./Inquiry/ThankYou.jsx";

import Layout from "./Layout";

function App() {
  return (
    <>
      <ScrollToTop />
      <Route path="/" element={<Home />} />

      <Routes>
        {/* ================= ADMIN ROUTES (NO LAYOUT) ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ProductForm"
          element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          }
        />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/forgot-password" element={<ForgotPasswordOTP />} />

        {/* ================= PUBLIC ROUTES (WITH LAYOUT) ================= */}

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/blog" element={<FeaturedArticle />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
          <Route path="*" element={<ComingSoon />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
