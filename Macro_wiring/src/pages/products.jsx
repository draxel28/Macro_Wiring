import { useState } from "react";
import ProductCard from "../assets/components/Productcards";
import CableAssy from "../assets/images/CABLE ASSEMBIES/cable-assy.jpg";
import CableAssy2 from "../assets/images/CABLE ASSEMBIES/cable-assy2.jpg";
import CableAssy3 from "../assets/images/CABLE ASSEMBIES/cable-assy3.jpg";
import CableAssy4 from "../assets/images/CABLE ASSEMBIES/cable-assy4.jpg";
import seven from "../assets/images/INJECTION MOLDING/7.png";
import eight from "../assets/images/INJECTION MOLDING/8.png";
import nine from "../assets/images/INJECTION MOLDING/9.png";
import ten from "../assets/images/INJECTION MOLDING/10.png";
import eighteen from "../assets/images/INJECTION MOLDING/18.png";
import nineteen from "../assets/images/INJECTION MOLDING/19.png";
import twenty from "../assets/images/INJECTION MOLDING/20.png";
import twentyone from "../assets/images/INJECTION MOLDING/21.png";
import twentytwo from "../assets/images/INJECTION MOLDING/23.png";
import twentyfour from "../assets/images/POWER CORDS/24.png";
import busbar_assemblies1 from "../assets/images/POWER CORDS/busbar-assemblies1.jpg";
import busbar_assemblies2 from "../assets/images/POWER CORDS/busbar-assemblies2.jpg";
import hubbel_leviton from "../assets/images/POWER CORDS/hubel-leviton-plugs.jpg";
import icecords from "../assets/images/POWER CORDS/ice-cords.jpg";
import { useLocation } from "react-router-dom";
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
      {
        name: "SA-2001",
        description: "Precision assembly unit",
        image: seven,
      },
      {
        name: "SA-2002",
        description: "Electronic assembly",
        image: eight,
      },
      {
        name: "SA-2003",
        description: "Mechanical assembly",
        image: nine,
      },
      {
        name: "SA-2003",
        description: "Mechanical assembly",
        image: ten,
      },
      {
        name: "SA-2003",
        description: "Mechanical assembly",
        image: eighteen,
      },
      {
        name: "SA-2003",
        description: "Mechanical assembly",
        image: nineteen,
      },
      { name: "SA-2004", description: "Custom subcon unit", image: twenty },
      {
        name: "SA-2003",
        description: "Mechanical assembly",
        image: twentyone,
      },
      {
        name: "SA-2003",
        description: "Mechanical assembly",
        image: twentytwo,
      },
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
      { name: "PC-4003", description: "Extension cord", image: CableAssy3 },
      { name: "PC-4004", description: "Custom power cable", image: CableAssy4 },
    ],
  },
  {
    category: "Wire Harnesses",
    items: [
      { name: "WH-4001", description: "Standard harness", image: CableAssy },
      { name: "WH-4002", description: "Heavy-duty harness", image: CableAssy2 },
      { name: "WH-4003", description: "Custom harness", image: CableAssy3 },
      { name: "WH-4004", description: "Industrial harness", image: CableAssy4 },
    ],
  },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const [selectedCategories, setSelectedCategories] = useState(
    location.state?.category ? [location.state.category] : [],
  );

  const categories = productData.map((c) => c.category);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Flatten products with category reference
  const allProducts = productData.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      category: category.category,
    })),
  );

  const filteredProducts =
    selectedCategories.length === 0
      ? allProducts.slice(0, 9) // 👈 Show only first 9 products
      : allProducts.filter((product) => {
          const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          const matchesCategory = selectedCategories.includes(product.category);

          return matchesSearch && matchesCategory;
        });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <h1 className="text-4xl font-bold mb-12">Our Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Sidebar */}
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-6">Filter</h2>

            {/* Search */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Checkbox Categories */}
            <div>
              <h3 className="font-medium mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="accent-blue-600"
                    />
                    <span className="text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            {filteredProducts.length === 0 ? (
              <p className="text-gray-500">No products found.</p>
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
    </div>
  );
};

export default Products;
