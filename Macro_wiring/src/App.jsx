import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Header";
import Footer from "./assets/components/footer"; // Ensure case matches your filename
import Home from "./pages/Home";
import Products from "./pages/products";
import Certifications from "./pages/Certifications";
import AboutUs from "./pages/AboutUs";
import ScrollToTop from "./assets/components/scroll_to_top";
import CookieConsent from "./assets/components/CookieConsent"; // 1. IMPORT HERE

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>

      {/* 2. PLACE HERE (Global visibility) */}
      <CookieConsent />

      <Footer />
    </>
  );
}

export default App;