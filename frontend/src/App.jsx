import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import "./App.css";

import Home from "./Home/home.jsx";
import Services from "./pages/services.jsx";
import Terms from "./pages/terms.jsx";
import Privacy from "./pages/privacy.jsx";
import AboutPage from "./pages/AboutPage/About.jsx";
import ProjectPage from "./pages/Project/Project.jsx";
import ComingSoon from "./Components/commingsoon.jsx";
import { ProductsPage, ProductDetails } from "./pages/Product";

import FeaturedArticle from "./pages/blog/FeaturedArticle.jsx";
import ContactSection from "./pages/contactPage/ContactSection";
import Inquiry from "./pages/contactPage/Inquiry";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />

        <Route path="/blog" element={<FeaturedArticle />} />

        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/inquiry" element={<Inquiry />} />

        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </>
  );
}

export default App;
