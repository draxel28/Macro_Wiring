import videoBg from "./MWTC.mp4";
import marqueeImage from "./marqueeImage.png";
import marqueeImage1 from "./marqueeImage1.png";
import marqueeImage2 from "./marqueeImage2.png";
import marqueeImage3 from "./marqueeImage3.png";
import marqueeImage4 from "./marqueeImage4.png";
import marqueeImage5 from "./marqueeImage5.png";
import marqueeImage6 from "./marqueeImage6.png";
import marqueeImage7 from "./marqueeImage7.png";

function Hero() {
  const marqueeImages = [
    marqueeImage,
    marqueeImage1,
    marqueeImage2,
    marqueeImage3,
    marqueeImage4,
    marqueeImage5,
    marqueeImage6,
    marqueeImage7,
  ];

  return (
    <>
      {/* HERO SECTION (VIDEO ONLY) */}
      <section className="relative h-[70vh] md:h-[80vh] w-full">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoBg}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ zIndex: 0 }}
        />

        <div
          className="absolute inset-0 bg-gray-900"
          style={{ opacity: 0.9, zIndex: 1 }}
        />

        <div
          className="relative flex flex-col justify-center items-center h-full text-center px-6 text-white"
          style={{ zIndex: 2 }}
        >
          <p className="text-4xl md:text-3xl max-w-3xl mb-8 text-gray-200">
            Precision Wire Harness Solution by JP
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Making Our Wire Harnesses Your Own
          </h1>

          <p className="text-lg md:text-3xl max-w-3xl mb-8 text-gray-200">
            with 20 years in the industry we deliver trusted partner solutions
            for branded electronic products worldwide.
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

      {/* MARQUEE SECTION BELOW VIDEO */}
      <section className="w-full py-6 overflow-hidden bg-gray-200">
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...marqueeImages, ...marqueeImages].map((img, index) => (
              <img
                key={index}
                src={img}
                alt="brand"
                className="h-14 object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Animation */}
      <style>
        {`
.marquee-wrapper{
  overflow:hidden;
  width:100%;
}

.marquee-track{
  display:flex;
  gap:10rem;
  width:max-content;
  animation: marqueeScroll 35s linear infinite;
}

@keyframes marqueeScroll{
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
`}
      </style>
    </>
  );
}

export default Hero;
