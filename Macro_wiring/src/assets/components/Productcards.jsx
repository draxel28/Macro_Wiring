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
      <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 border">
        <div className="h-48 w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>

          <button
            onClick={() => {
              setActiveIndex(0);
              setIsOpen(true);
            }}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            View Details
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">{name}</h2>

            {/* Main Image */}
            {gallery.length > 0 && (
              <div className="relative flex items-center justify-center">
                <img
                  src={gallery[activeIndex]}
                  alt="Product"
                  className="max-h-[450px] object-contain rounded-xl"
                />

                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                    >
                      <ChevronLeft />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                    >
                      <ChevronRight />
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex justify-center gap-3 mt-6 flex-wrap">
                {gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    onClick={() => setActiveIndex(index)}
                    className={`h-20 w-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                      activeIndex === index
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Counter */}
            {gallery.length > 1 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                {activeIndex + 1} / {gallery.length}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
