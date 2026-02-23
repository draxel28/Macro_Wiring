import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Header";
import Footer from "./assets/components/footer";
import Home from "./pages/Home";
import Products from "./pages/products";
import Certifications from "./pages/Certifications"; // 1. Import the new page
import ScrollToTop from "./assets/components/scroll_to_top";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/certifications" element={<Certifications />} /> {/* 2. Add the Route */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;