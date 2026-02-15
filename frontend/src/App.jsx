import ScrollToTop from "./components/ScrollToTop.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Services from './pages/services'
import Products from './pages/Product'

function App() {


  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
         <Route path="/services" element={< Services/>} />
          <Route path="/product" element={< Product/>} />
        

     </Routes>
    </BrowserRouter>
  );
}

export default App
