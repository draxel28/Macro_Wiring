import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./assets/components/Header";
import Footer from "./assets/components/footer";
import Home from "./pages/Home";
import Products from "./pages/products";
import Certifications from "./pages/Certifications";
import AboutUs from "./pages/AboutUs";
import ScrollToTop from "./assets/components/scroll_to_top";
import CookieConsent from "./assets/components/CookieConsent";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

function ProtectedRoute({ children }) {
  const isAuth = sessionStorage.getItem("admin_access") === "true";
  return isAuth ? children : <Navigate to="/" replace />;
}

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
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>

      <CookieConsent />
      <Footer />
    </>
  );
}

export default App;
