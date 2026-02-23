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
      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] md:h-[80vh] w-full flex items-center">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoBg}
          autoPlay loop muted playsInline preload="auto"
          style={{ zIndex: 0 }}
        />

        <div
          className="absolute inset-0 bg-gray-900/90" // Using Tailwind opacity shorthand
          style={{ zIndex: 1 }}
        />

        <div
          className="relative flex flex-col justify-center items-center h-full text-center px-6 text-white w-full"
          style={{ zIndex: 2 }}
        >
          {/* Subheader: Smaller on mobile */}
          <p className="text-xl md:text-3xl max-w-3xl mb-4 text-gray-300 uppercase tracking-wide">
            Precision Wire Harness Solution 
          </p>

          {/* Main Title: scaled down for mobile */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Making Our Wire Harnesses <br className="hidden md:block" /> Your Own
          </h1>

          {/* Description: Adjusted font size */}
          <p className="text-base md:text-xl max-w-2xl mb-10 text-gray-200">
            With 20 years in the industry, we deliver trusted partner solutions
            for branded electronic products worldwide.
          </p>

          {/* Buttons: Stacked on mobile, side-by-side on tablet+ */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition w-full sm:w-auto">
              Get a Free Consultation
            </button>

            <button className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition w-full sm:w-auto">
              View Our Projects
            </button>
          </div>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <section className="w-full py-8 overflow-hidden bg-gray-100 border-y border-gray-300">
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...marqueeImages, ...marqueeImages].map((img, index) => (
              <img
                key={index}
                src={img}
                alt="brand"
                className="h-10 md:h-16 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      <style>
        {`
        .marquee-wrapper { overflow: hidden; width: 100%; }
        .marquee-track {
          display: flex;
          gap: 4rem; /* Reduced gap for better flow */
          width: max-content;
          animation: marqueeScroll 30s linear infinite;
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (min-width: 768px) {
          .marquee-track { gap: 10rem; }
        }
        `}
      </style>
    </>
  );
}

export default Hero;
