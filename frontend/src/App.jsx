import ScrollToTop from "./components/ScrollToTop.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Services from './pages/services'
import AdminRegister from './pages/auth/adminRegister.jsx'
import Login from "./pages/auth/login.jsx";
// import Signup from "./pages/auth/signup.jsx";
import Terms from "./pages/terms.jsx";
import Privacy from "./pages/privacy.jsx";
import Home from "./Home/home.jsx";


// 3. The Temporary Fix
import ComingSoon from "./Components/commingsoon.jsx";
import { ProductsPage, ProductDetails } from './pages/Product'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
          <Route path="/" element={< Home/>} />

         <Route path="/services" element={< Services/>} />
         <Route path="/admin-register" element={< AdminRegister/>} />
         <Route path="/login" element={< Login/>} />
         {/* <Route path="/signup" element={< Signup/>} /> */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />

            <Route path="/about" element={<ComingSoon />} />
            <Route path="/projects" element={<ComingSoon />} />
            <Route path="/blog" element={<ComingSoon />} />
            <Route path="/contact" element={<ComingSoon />} />
            {/* Fallback for 404 (optional) */}
            <Route path="*" element={<ComingSoon />} />


         <Route path="/terms" element={< Terms/>} />
         <Route path="/privacy" element={< Privacy/>} />         
     </Routes>


      
    </BrowserRouter>
  );
}

export default App
