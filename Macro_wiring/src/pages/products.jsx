import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, ArrowUp, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// --- PATHS ---
import ProductCard from "../assets/components/Productcards";
import "../App.css";

// --- IMAGES ---
import CableAssy from "../assets/images/CABLE ASSEMBIES/cable-assy.jpg";
import CableAssy2 from "../assets/images/CABLE ASSEMBIES/cable-assy2.jpg";
import CableAssy3 from "../assets/images/CABLE ASSEMBIES/cable-assy3.jpg";
import CableAssy4 from "../assets/images/CABLE ASSEMBIES/cable-assy4.jpg";

// WH-1001 Gallery Images
import WH1001_1 from "../assets/images/CABLE ASSEMBIES/img-1.jpg";
import WH1001_2 from "../assets/images/CABLE ASSEMBIES/img-2.jpg";
import WH1001_3 from "../assets/images/CABLE ASSEMBIES/img-3.jpg";

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
        // Array of images for the gallery
        gallery: [WH1001_1, WH1001_2, WH1001_3] 
      },
      {
        name: "WH-1002",
        description: "Industrial wire harness",
        image: CableAssy2,
        gallery: [CableAssy2, CableAssy3, CableAssy4],
      },
      {
        name: "WH-1003",
        description: "Custom wire harness",
        image: CableAssy3,
        gallery: [CableAssy3, CableAssy, CableAssy4],
      },
      {
        name: "WH-1004",
        description: "Heavy-duty harness",
        image: CableAssy4,
        gallery: [CableAssy4, CableAssy3],
      },
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

const HighlightText = ({ text, highlight }) => {
  if (!highlight.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-blue-900 rounded-sm px-0.5 font-bold">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState(
    location.state?.category ? [location.state.category] : [],
  );

  // Gallery States
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [activeProductName, setActiveProductName] = useState("");

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) setShowScrollTop(true);
      else setShowScrollTop(false);

      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrolled = window.scrollY;

      if (scrolled + windowHeight > fullHeight - 120) setIsAtBottom(true);
      else setIsAtBottom(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Open Gallery Logic
  const openGallery = (product) => {
    if (product.gallery && product.gallery.length > 0) {
      setCurrentGallery(product.gallery);
      setCurrentImgIndex(0);
      setActiveProductName(product.name);
      setIsGalleryOpen(true);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
        alert("No additional images available for this product.");
    }
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % currentGallery.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
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
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">Products</h1>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-6 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
          <p className="text-blue-100 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">
            High-quality wiring solutions and precision components tailored for global industrial standards.
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
                <h3 className="font-semibold text-gray-400 text-xs uppercase tracking-widest mb-4">Categories</h3>
                {productData.map((cat, index) => {
                  const isChecked = selectedCategories.includes(cat.category);
                  return (
                    <label key={index} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer group transition-all duration-300 ${isChecked ? "bg-blue-50/50" : "hover:bg-gray-50"}`}>
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" checked={isChecked} onChange={() => handleCategoryChange(cat.category)} className="w-4 h-4 accent-blue-600 rounded cursor-pointer" />
                        <span className={`transition-colors duration-300 text-sm ${isChecked ? "text-blue-700 font-semibold" : "text-gray-700 group-hover:text-blue-600"}`}>{cat.category}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold transition-all duration-300 border ${isChecked ? "bg-blue-600 text-white border-blue-400" : "bg-gray-100 text-gray-500 border-gray-200"}`}>
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
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300"><p className="text-gray-500">No products found matching your criteria.</p></div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product, i) => (
                  <div key={i} className="relative group">
                    <ProductCard
                      name={<HighlightText text={product.name} highlight={searchTerm} />}
                      description={<HighlightText text={product.description} highlight={searchTerm} />}
                      image={product.image}
                    />
                    {/* View Details Button Layer */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none">
                        <button 
                            onClick={() => openGallery(product)}
                            className="pointer-events-auto bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm shadow-2xl flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105"
                        >
                            <ZoomIn size={16} /> View Details
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      {isGalleryOpen && (
        <div 
            className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
            onClick={closeGallery}
        >
            {/* Header / Info */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-white">
                <div>
                    <h2 className="text-xl font-black tracking-tight uppercase">{activeProductName}</h2>
                    <p className="text-xs text-blue-400 font-bold tracking-widest uppercase">Image {currentImgIndex + 1} of {currentGallery.length}</p>
                </div>
                <button onClick={closeGallery} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Main Image Container */}
            <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <button onClick={prevImg} className="absolute left-0 md:-left-16 z-10 p-4 bg-white/10 hover:bg-white text-white hover:text-blue-600 rounded-full transition-all active:scale-90">
                    <ChevronLeft size={32} />
                </button>

                <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                    <img 
                        src={currentGallery[currentImgIndex]} 
                        alt="Gallery" 
                        className="max-w-full max-h-full object-contain animate-in zoom-in-95 duration-500"
                    />
                </div>

                <button onClick={nextImg} className="absolute right-0 md:-right-16 z-10 p-4 bg-white/10 hover:bg-white text-white hover:text-blue-600 rounded-full transition-all active:scale-90">
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Thumbnails (Optional) */}
            <div className="mt-8 flex gap-3 overflow-x-auto p-2" onClick={(e) => e.stopPropagation()}>
                {currentGallery.map((img, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => setCurrentImgIndex(idx)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${currentImgIndex === idx ? "border-blue-500 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "border-transparent opacity-50 hover:opacity-100"}`}
                    >
                        <img src={img} className="w-full h-full object-cover" alt="thumb" />
                    </button>
                ))}
            </div>
        </div>
      )}

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed z-50 p-4 bg-white/20 backdrop-blur-md text-gray-800 rounded-full shadow-xl border border-white/40 transition-all duration-500 hover:bg-blue-600 hover:text-white hover:-translate-y-2 active:scale-95 flex items-center justify-center ${isAtBottom ? "bottom-24 right-8" : "bottom-8 right-8"} ${showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-50 translate-y-10 pointer-events-none"}`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Products;
