const ProductCard = ({ name, description, image }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 border">
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>

      </div>
    </div>
  );
};

export default ProductCard;
