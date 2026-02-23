import CableAssy from "../products/CABLE.jpg";
import circuitbreaker from "../products/CIRCUIT BREAKERS2.jpg";
import iceCords from "../products/ICE CORDS.jpg";
import seven from "../products/seven.png";
import { Link } from "react-router-dom";
function Section_B() {
  return (
    <section className="bg-gray-100 text-gray-800 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Top Label */}
        <p className="text-gray-400 uppercase tracking-widest mb-3">
          Offerings
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Our Featured Products
        </h2>

        {/* Sub Text */}
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          Check out our hot products today — strong electrical wire solutions
          for your business needs.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {/* Card 1 */}
          <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2">
            <div className="h-48 overflow-hidden">
              <img
                src={CableAssy}
                alt="Industrial Wiring"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Cable Assemblies
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                High-capacity wiring built for factories and heavy-duty
                commercial applications.
              </p>
              <Link
                to="/products"
                state={{ category: "Cable Assemblies" }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2">
            <div className="h-48 overflow-hidden">
              <img
                src={circuitbreaker}
                alt="Residential Wiring"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Injection Molding
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Safe and durable electrical wiring solutions designed for modern
                homes.
              </p>
              <Link
                to="/products"
                state={{ category: "Injection Molding" }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2">
            <div className="h-48 overflow-hidden">
              <img
                src={iceCords}
                alt="Commercial Cables"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Power Cords
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Reliable and efficient cables engineered for business and office
                infrastructures.
              </p>
              <Link
                to="/products"
                state={{ category: "Power Cords" }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2">
            <div className="h-48 overflow-hidden">
              <img
                src={seven}
                alt="Flexible Copper Wire"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Wire Harnesses
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Premium quality copper wiring built for flexibility,
                conductivity, and long-term durability.
              </p>
              <Link
                to="/products"
                state={{ category: "Wire Harnesses" }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section_B;
