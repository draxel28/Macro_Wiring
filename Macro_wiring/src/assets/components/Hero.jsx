import videoBg from "./MWTC.mp4";

function Hero() {
  return (
    <section className="relative min-h-screen w-full">
      {/* Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={videoBg}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          zIndex: 0,
          position: "absolute",
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gray-900"
        style={{
          opacity: 0.9,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col justify-center items-center min-h-screen text-center px-6 text-white"
        style={{ zIndex: 2 }}
      >
        <p className="text-4xl md:text-3xl max-w-3xl mb-8 text-gray-200">
          Precision Wire Harness Solution
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Making Our Wire Harnesses Your Own
        </h1>

        <p className="text-lg md:text-3xl max-w-3xl mb-8 text-gray-200">
          with 20 years in the industrywe deliver trusted partner solutions for
          branded electronic products worldwide.
        </p>

        <div className="flex gap-4 mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg transition">
            Get a Free Consultation
          </button>

          <button className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg text-lg transition">
            View Our Projects
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
