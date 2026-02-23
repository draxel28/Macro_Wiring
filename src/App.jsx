import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Header";
import Footer from "./assets/components/footer";
import Home from "./pages/Home";
import Products from "./pages/products";
import ScrollToTop from "./assets/components/scroll_to_top";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
