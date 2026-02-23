import ProductCard from "../components/Productcards";

const productData = [
  {
    category: "Wire Harnesses",
    items: [
      { name: "WH-1001", description: "Automotive wire harness" },
      { name: "WH-1002", description: "Industrial wire harness" },
      { name: "WH-1003", description: "Custom wire harness" },
      { name: "WH-1004", description: "Heavy-duty harness" },
    ],
  },
  {
    category: "Subcon Assemblies",
    items: [
      { name: "SA-2001", description: "Precision assembly unit" },
      { name: "SA-2002", description: "Electronic assembly" },
      { name: "SA-2003", description: "Mechanical assembly" },
      { name: "SA-2004", description: "Custom subcon unit" },
    ],
  },
  {
    category: "Cable Assemblies",
    items: [
      { name: "CA-3001", description: "High-speed cable" },
      { name: "CA-3002", description: "USB cable assembly" },
      { name: "CA-3003", description: "HDMI assembly" },
      { name: "CA-3004", description: "Industrial cable" },
    ],
  },
  {
    category: "Power Cords",
    items: [
      { name: "PC-4001", description: "Standard power cord" },
      { name: "PC-4002", description: "Heavy-duty cord" },
      { name: "PC-4003", description: "Extension cord" },
      { name: "PC-4004", description: "Custom power cable" },
    ],
  },
];

const Products = () => {
  return (
    <div className="px-6 md:px-16 py-16 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-16">Our Products</h1>

      {productData.map((category, index) => (
        <div key={index} className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 border-l-4 border-gray-800 pl-4">
            {category.category}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.items.map((product, i) => (
              <ProductCard
                key={i}
                name={product.name}
                description={product.description}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
