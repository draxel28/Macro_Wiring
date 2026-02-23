const ProductCard = ({ name, description }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300 border">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
