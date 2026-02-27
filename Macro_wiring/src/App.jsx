import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Header";
import Footer from "./assets/components/footer"; // Matches your lowercase filename
import Home from "./pages/Home";
import Products from "./pages/products";
import Certifications from "./pages/Certifications"; // Plural import
import AboutUs from "./pages/AboutUs";
import ScrollToTop from "./assets/components/scroll_to_top";
import CookieConsent from "./assets/components/CookieConsent";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      {/* Utility to reset scroll position on page change */}
      <ScrollToTop />

      {/* Navigation - now with active links and contact scroll */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        {/* URL path is now lowercase 'certifications' to match your Navbar link */}
        <Route path="/certifications" element={<Certifications />} />

        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        {/* Note: No separate /contact route is needed because the 
            Navbar now scrolls to the Footer instead */}
      </Routes>

      {/* Mandatory Privacy/Terms Overlay - Blocks scroll until accepted */}
      <CookieConsent />

      <Footer />
    </>
  );
}

export default App;
