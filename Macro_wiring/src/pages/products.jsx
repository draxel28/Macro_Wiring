import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, ArrowUp } from "lucide-react";

// --- PATHS ---
import ProductCard from "../assets/components/Productcards";
import "../App.css";

// --- IMAGES ---
import CableAssy from "../assets/images/CABLE ASSEMBIES/cable-assy.jpg";
import CableAssy2 from "../assets/images/CABLE ASSEMBIES/cable-assy2.jpg";
import CableAssy3 from "../assets/images/CABLE ASSEMBIES/cable-assy3.jpg";
import CableAssy4 from "../assets/images/CABLE ASSEMBIES/cable-assy4.jpg";
import seven from "../assets/images/INJECTION MOLDING/7.png";
import eight from "../assets/images/INJECTION MOLDING/8.png";
import nine from "../assets/images/INJECTION MOLDING/9.png";
import twenty from "../assets/images/INJECTION MOLDING/20.png";
import twentyfour from "../assets/images/POWER CORDS/24.png";
import busbar_assemblies1 from "../assets/images/POWER CORDS/busbar-assemblies1.jpg";
import busbar_assemblies2 from "../assets/images/POWER CORDS/busbar-assemblies2.jpg";
import hubbel_leviton from "../assets/images/POWER CORDS/hubel-leviton-plugs.jpg";
import icecords from "../assets/images/POWER CORDS/ice-cords.jpg";

const productData = [
  {
    category: "Cable Assemblies",
    items: [
      {
        name: "WH-1001",
        description: "Automotive wire harness",
        image: CableAssy,
      },
      {
        name: "WH-1002",
        description: "Industrial wire harness",
        image: CableAssy2,
      },
      {
        name: "WH-1003",
        description: "Custom wire harness",
        image: CableAssy3,
      },
      { name: "WH-1004", description: "Heavy-duty harness", image: CableAssy4 },
    ],
  },
  {
    category: "Injection Molding",
    items: [
      { name: "SA-2001", description: "Precision assembly unit", image: seven },
      { name: "SA-2002", description: "Electronic assembly", image: eight },
      { name: "SA-2003", description: "Mechanical assembly", image: nine },
      { name: "SA-2004", description: "Custom subcon unit", image: twenty },
    ],
  },
  {
    category: "Power Cords",
    items: [
      { name: "CA-3001", description: "High-speed cable", image: twentyfour },
      {
        name: "CA-3002",
        description: "USB cable assembly",
        image: busbar_assemblies1,
      },
      {
        name: "CA-3003",
        description: "HDMI assembly",
        image: busbar_assemblies2,
      },
      {
        name: "CA-3004",
        description: "Industrial cable",
        image: hubbel_leviton,
      },
      { name: "CA-3005", description: "ICE Cords", image: icecords },
    ],
  },
  {
    category: "Sub-Con",
    items: [
      { name: "PC-4001", description: "Standard power cord", image: CableAssy },
      { name: "PC-4002", description: "Heavy-duty cord", image: CableAssy2 },
    ],
  },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState(
    location.state?.category ? [location.state.category] : [],
  );

  // State for Scroll to Top Button
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Show/Hide logic
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Overlap prevention logic (detects if user is near the footer)
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrolled = window.scrollY;

      if (scrolled + windowHeight > fullHeight - 120) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const categories = productData.map((c) => c.category);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const allProducts = productData.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      category: category.category,
    })),
  );

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen relative">
      {/* Header Section */}
      <div className="tech-header-container text-white py-16 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="motherboard-traces"></div>
          <div className="moving-glow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase"
            style={{
              textShadow: "0 0 15px rgba(96, 165, 250, 0.6)",
              letterSpacing: "0.02em",
            }}
          >
            Products
          </h1>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-6 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
          <p className="text-blue-100 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">
            High-quality wiring solutions and precision components tailored for
            global industrial standards.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
{/* Sidebar Filter */}
<div className="md:col-span-1">
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28 h-fit">
    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
      <Search className="w-5 h-5 text-blue-600" /> Filter
    </h2>
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-400 text-xs uppercase tracking-widest mb-4">
        Categories
      </h3>
      {productData.map((cat, index) => {
        const isChecked = selectedCategories.includes(cat.category);
        return (
          <label
            key={index}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer group transition-all duration-300 ${
              isChecked ? "bg-blue-50/50" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCategoryChange(cat.category)}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
              <span className={`transition-colors duration-300 text-sm ${
                isChecked ? "text-blue-700 font-semibold" : "text-gray-700 group-hover:text-blue-600"
              }`}>
                {cat.category}
              </span>
            </div>
            
            {/* Tech-styled Count Badge */}
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold transition-all duration-300 border ${
              isChecked 
              ? "bg-blue-600 text-white border-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.5)]" 
              : "bg-gray-100 text-gray-500 border-gray-200 group-hover:border-blue-200"
            }`}>
              {cat.items.length.toString().padStart(2, '0')}
            </span>
          </label>
        );
      })}
    </div>
  </div>
</div>

          {/* Product Grid */}
          <div className="md:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <p className="text-gray-500">
                  No products found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product, i) => (
                  <ProductCard
                    key={i}
                    name={product.name}
                    description={product.description}
                    image={product.image}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- GLASSMORPHISM SCROLL TO TOP BUTTON (RIGHT SIDE) --- */}
      <button
        onClick={scrollToTop}
        className={`fixed z-50 p-4 
          bg-white/20 backdrop-blur-md text-gray-800 
          rounded-full shadow-xl border border-white/40
          transition-all duration-500 
          hover:bg-blue-600 hover:text-white hover:border-transparent hover:-translate-y-2 
          active:scale-95 flex items-center justify-center 
          ${isAtBottom ? "bottom-24 right-8" : "bottom-8 right-8"}
          ${showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-50 translate-y-10 pointer-events-none"}`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Products;
