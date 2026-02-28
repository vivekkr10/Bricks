import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import "./App.css";

const Services = lazy(() => import("./pages/services"));
const AdminLogin = lazy(() => import("./pages/auth/adminLogin.jsx"));
const AdminRegister = lazy(() => import("./pages/auth/adminRegister.jsx"));
const Terms = lazy(() => import("./pages/terms.jsx"));
const Privacy = lazy(() => import("./pages/privacy.jsx"));
const Home = lazy(() => import("./Home/home.jsx"));
const Dashboard = lazy(() => import("./pages/AdminDashboard/DashboardMain.jsx"));
const ProductForm = lazy(() => import("./pages/AdminDashboard/ProductForm.jsx"));
const Profile = lazy(() => import("./pages/AdminDashboard/profile.jsx"));
const BlogDetail = lazy(() => import("./pages/blog/blogDetail.jsx"));
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

const ComingSoon = lazy(() => import("./Components/commingsoon.jsx"));
const ProductsPage = lazy(() => import("./pages/Products/ProductsPage.jsx"));
const ProductDetails = lazy(() => import("./pages/Products/ProductDetailPage.jsx"));
const Contact = lazy(() => import("./pages/contactPage/ContactSection.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage/About.jsx"));
const ProjectPage = lazy(() => import("./pages/Project/Project.jsx"));
const FeaturedArticle = lazy(() => import("./pages/blog/FeaturedArticle.jsx"));
const ContactSection = lazy(() => import("./pages/contactPage/ContactSection"));
const ProjectDetailsPage = lazy(() => import("./pages/Project/ProjectDetailPage.jsx"));
const ForgotPasswordOTP = lazy(() => import("./pages/auth/ForgotPasswordOTP"));
const InquiryPage = lazy(() => import("./Inquiry/InquiryForm.jsx"));
const ThankYouPage = lazy(() => import("./Inquiry/ThankYou.jsx"));



function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-stone-50">
          <div className="w-10 h-10 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Admin Auth Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} /> 
         <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} /> 
        <Route path="/ProductForm" element={<ProtectedRoute><ProductForm/></ProtectedRoute>} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/forgot-password" element={<ForgotPasswordOTP />} />
        {/* Other Routes */}
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
        <Route path="/contact" element={<ContactSection />} />

       <Route path="/inquiry" element={<InquiryPage />} />
      <Route path="/thankyou" element={<ThankYouPage />} />
        {/* 404 Fallback - Keep this at the end */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
      </Suspense>
    </>
  );
}

export default App;