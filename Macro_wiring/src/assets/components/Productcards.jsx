import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ProductCard = ({ name, description, image, gallery = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function to ensure scroll is restored if component unmounts
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKey);
    }

    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, activeIndex]);

  const nextImage = () => {
    if (gallery.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    if (gallery.length === 0) return;
    setActiveIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  return (
    <>
      {/* PRODUCT CARD */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 border flex flex-col h-full">
        <div className="h-48 w-full overflow-hidden">
          <img
            src={image}
            alt={typeof name === 'string' ? name : "Product"}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-1">{description}</p>

          <button 
            onClick={() => setIsOpen(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition w-full font-bold"
          >
            View Details
          </button>
        </div>
      </div>

      {/* MODAL / LIGHTBOX */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition"
          >
            <X size={32} />
          </button>

          <div className="relative max-w-5xl w-full flex items-center justify-center">
            {gallery.length > 1 && (
              <button onClick={prevImage} className="absolute left-0 md:-left-16 text-white p-2 hover:bg-white/10 rounded-full transition">
                <ChevronLeft size={48} />
              </button>
            )}

            <div className="w-full flex flex-col items-center">
              <img 
                src={gallery.length > 0 ? gallery[activeIndex] : image} 
                alt={name} 
                className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
              {gallery.length > 0 && (
                <p className="text-white mt-4 font-mono text-sm">
                  {activeIndex + 1} / {gallery.length}
                </p>
              )}
            </div>

            {gallery.length > 1 && (
              <button onClick={nextImage} className="absolute right-0 md:-right-16 text-white p-2 hover:bg-white/10 rounded-full transition">
                <ChevronRight size={48} />
              </button>
            )}
          </div>
        </div>
      )}
    </> // Added the missing closing fragment tag here
  );
};

export default ProductCard;