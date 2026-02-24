import { useState } from "react";
import { Search } from "lucide-react";
import "../App.css"; 

// --- UPDATED IMAGE IMPORTS ---
import iso9001 from "../assets/components/certificates/iso-9001.png";
import iso14001 from "../assets/components/certificates/iso-14001.png";
import ulLogo from "../assets/components/certificates/ul-logo.png";
import rohs from "../assets/components/certificates/rohs-reach.png";
import ecovadis from "../assets/components/certificates/eco-vadis.png";
import seipi from "../assets/components/certificates/seipi-logo.png";
import bestImg from "../assets/components/certificates/da-best-removebg-preview.png";
import bestEmployer from "../assets/components/certificates/best-employer.png";

const certData = [
  {
    category: "Management Systems",
    items: [
      { name: "ISO 9001:2015", description: "Quality Management System", image: iso9001, status: "Certified" },
      { name: "ISO 14001:2015", description: "Environmental Management System", image: iso14001, status: "Certified" },
    ],
  },
  {
    category: "Product Safety",
    items: [
      { name: "UL Recognized", description: "Wire Harness & Power Cord Safety (E89012)", image: ulLogo, status: "Active" },
      { name: "RoHS & REACH", description: "Environmental Material Compliance", image: rohs, status: "Compliant" },
    ],
  },
  {
    category: "Industry & ESG",
    items: [
      { name: "EcoVadis Silver", description: "Sustainability & CSR Rating", image: ecovadis, status: "Awarded" },
      { name: "SEIPI Member", description: "Semiconductor & Electronics Industry", image: seipi, status: "Member" },
      { name: "Best Employer", description: "PEZA Outstanding Employer Award", image: bestEmployer, status: "Awarded" },
      { name: "PEME Quality", description: "Excellence in Manufacturing", image: bestImg, status: "Awarded" },
    ],
  },
];

const Certifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...certData.map((c) => c.category)];

  const allCerts = certData.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category }))
  );

  const filteredCerts = allCerts.filter((cert) => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || cert.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
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
              textShadow: '0 0 15px rgba(96, 165, 250, 0.6)',
              letterSpacing: '0.02em'
            }}
          >
            Quality Assurance
          </h1>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-6 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
          <p className="text-blue-100 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Our commitment to excellence is verified by international governing bodies and global industry standards.
          </p>
        </div>
      </div>

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
                  placeholder="Search standards..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-400 text-xs uppercase tracking-widest mb-4">Categories</h3>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedCategory === cat
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Certificates Grid */}
          <div className="md:col-span-3">
            {filteredCerts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <p className="text-gray-500">No matching certifications found.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCerts.map((cert, i) => (
                  <div key={i} className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="h-40 flex items-center justify-center mb-6 bg-gray-50 rounded-xl p-4">
                      <img src={cert.image} alt={cert.name} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 leading-tight">{cert.name}</h3>
                      <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">
                        {cert.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{cert.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;