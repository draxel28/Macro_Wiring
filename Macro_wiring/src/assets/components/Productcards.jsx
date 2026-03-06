import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const ProductCard = ({ name, description, image, gallery = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
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
      {/* PRODUCT CARD - Added onClick and cursor-pointer here */}
      <div 
        onClick={() => setIsOpen(true)}
        className="group bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 border flex flex-col h-full cursor-pointer relative"
      >
        <div className="h-48 w-full overflow-hidden relative">
          <img
            src={image}
            alt={typeof name === 'string' ? name : "Product"}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          {/* Subtle Hover Overlay to indicate it's clickable */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center">
            <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition duration-300" size={32} />
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition">{name}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-1">{description}</p>
        </div>
      </div>

      {/* MODAL / LIGHTBOX */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)} // Close when clicking backdrop
        >
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition z-[110]"
          >
            <X size={32} />
          </button>

          <div 
            className="relative max-w-5xl w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
          >
            {gallery.length > 1 && (
              <button onClick={prevImage} className="absolute left-0 md:-left-20 text-white p-2 hover:bg-white/10 rounded-full transition z-[110]">
                <ChevronLeft size={48} />
              </button>
            )}

            <div className="w-full flex flex-col items-center">
              <img 
                src={gallery.length > 0 ? gallery[activeIndex] : image} 
                alt={typeof name === 'string' ? name : "Product"} 
                className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
              />
              {gallery.length > 0 && (
                <div className="mt-4 flex flex-col items-center gap-1">
                   <p className="text-white font-mono text-sm">
                    {activeIndex + 1} / {gallery.length}
                  </p>
                </div>
              )}
            </div>

            {gallery.length > 1 && (
              <button onClick={nextImage} className="absolute right-0 md:-right-20 text-white p-2 hover:bg-white/10 rounded-full transition z-[110]">
                <ChevronRight size={48} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;