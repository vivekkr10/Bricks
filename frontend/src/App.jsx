import ScrollToTop from "./components/ScrollToTop.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Services from './pages/services'

function App() {


  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
         <Route path="/services" element={< Services/>} />
        

     </Routes>
    </BrowserRouter>
  );
}

export default App
