import { ShieldCheck, Wrench, Clock, Star } from "lucide-react";
function SectionA() {
  return (
    <section className="bg-white text-gray-900 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Small Muted Title */}
        <br />
        <br />
        <br />
        <p className="text-gray-400 uppercase tracking-widest mb-3">
          Why Choose Us?
        </p>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          The Best Wiring Company <br />
          in of Cavite
        </h2>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Card 1 */}
          <div
            className="group bg-white p-8 rounded-xl flex-1 shadow-lg border border-gray-200 
                  transition duration-300 hover:bg-gray-800 hover:-translate-y-2 hover:shadow-2xl text-left"
          >
            <ShieldCheck
              className="w-10 h-10 text-blue-600 mb-4 
                            transition group-hover:text-blue-400"
            />

            <h3
              className="text-xl font-semibold mb-4 text-gray-800 
                   transition group-hover:text-white"
            >
              Certified Professionals
            </h3>

            <p className="text-gray-600 transition group-hover:text-gray-300">
              Licensed electricians ensuring safe and compliant installations.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="group bg-white p-8 rounded-xl flex-1 shadow-lg border border-gray-200 
                  transition duration-300 hover:bg-gray-800 hover:-translate-y-2 hover:shadow-2xl text-left"
          >
            <Wrench
              className="w-10 h-10 text-blue-600 mb-4 
                       transition group-hover:text-blue-400"
            />

            <h3
              className="text-xl font-semibold mb-4 text-gray-800 
                   transition group-hover:text-white"
            >
              High-Quality Materials
            </h3>

            <p className="text-gray-600 transition group-hover:text-gray-300">
              Durable and trusted materials for long-lasting performance.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="group bg-white p-8 rounded-xl flex-1 shadow-lg border border-gray-200 
                  transition duration-300 hover:bg-gray-800 hover:-translate-y-2 hover:shadow-2xl text-left"
          >
            <Clock
              className="w-10 h-10 text-blue-600 mb-4 
                      transition group-hover:text-blue-400"
            />

            <h3
              className="text-xl font-semibold mb-4 text-gray-800 
                   transition group-hover:text-white"
            >
              On-Time Delivery
            </h3>

            <p className="text-gray-600 transition group-hover:text-gray-300">
              Efficient execution without compromising quality.
            </p>
          </div>

          {/* Card 4 */}
          <div
            className="group bg-white p-8 rounded-xl flex-1 shadow-lg border border-gray-200 
                  transition duration-300 hover:bg-gray-800 hover:-translate-y-2 hover:shadow-2xl text-left"
          >
            <Star
              className="w-10 h-10 text-blue-600 mb-4 
                     transition group-hover:text-blue-400"
            />

            <h3
              className="text-xl font-semibold mb-4 text-gray-800 
                   transition group-hover:text-white"
            >
              Trusted Across Cavite
            </h3>

            <p className="text-gray-600 transition group-hover:text-gray-300">
              Proven track record serving residential and commercial clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionA;
