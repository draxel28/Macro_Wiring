import video from "../components/MWTC.mp4";
function section_D() {
  return (
    <section className="relative bg-white py-24 px-6 overflow-hidden">
      {/* Decorative Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50 -z-10"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE – TEXT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            How We Transform Business
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            We modernize operations through high-performance industrial
            electrical systems, strategic infrastructure planning, and scalable
            energy solutions built for long-term success.
          </p>

          <ul className="space-y-3 mb-8 text-gray-700">
            <li>✔ Increased operational efficiency</li>
            <li>✔ Reliable industrial-grade systems</li>
            <li>✔ Sustainable energy integration</li>
            <li>✔ Long-term cost optimization</li>
          </ul>

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg 
                         hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Discover Our Process
          </button>
        </div>

        {/* RIGHT SIDE – VIDEO */}
        <div className="relative group">
          <div
            className="absolute -inset-4 bg-blue-100 rounded-3xl 
                      blur-xl opacity-40 group-hover:opacity-60 
                      transition duration-500"
          ></div>

          <video
            className="relative rounded-2xl shadow-2xl w-full 
                   h-87.5 md:h-112.5 object-cover 
                   transition duration-500 group-hover:scale-105"
            controls
            poster="/thumbnail.jpg"
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}

export default section_D;
