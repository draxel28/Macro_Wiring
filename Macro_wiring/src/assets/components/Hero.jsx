import React from "react";
import { Link } from "react-router-dom"; 
import videoBg from "./MWTC.mp4";
import logo from "./mwtci logo.png";

// --- MARQUEE IMAGE IMPORTS ---
import marqueeImage from "./marquee/marqueeImage.png";
import marqueeImage1 from "./marquee/marqueeImage1.png";
import marqueeImage2 from "./marquee/marqueeImage2.png";
import marqueeImage3 from "./marquee/marqueeImage3.png";
import marqueeImage4 from "./marquee/marqueeImage4.png";
import marqueeImage5 from "./marquee/marqueeImage5.png";
import marqueeImage6 from "./marquee/marqueeImage6.png";
import marqueeImage7 from "./marquee/marqueeImage7.png";

function Hero() {
  const marqueeImages = [
    marqueeImage, marqueeImage1, marqueeImage2, marqueeImage3,
    marqueeImage4, marqueeImage5, marqueeImage6, marqueeImage7,
  ];

  return (
    <>
      <section id="home" className="relative min-h-[80vh] md:h-[85vh] w-full flex items-center overflow-hidden">
        {/* VIDEO BACKGROUND - Added subtle zoom animation */}
        <video
          className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
          src={videoBg}
          autoPlay loop muted playsInline preload="auto"
          style={{ zIndex: 0 }}
        />

        {/* OVERLAY - Slightly darker for better text readability */}
        <div
          className="absolute inset-0 bg-gray-900/85" 
          style={{ zIndex: 1 }}
        />

        <div
          className="relative flex flex-col justify-center items-center h-full text-center px-6 text-white w-full"
          style={{ zIndex: 2 }}
        >
          {/* Logo with Slide Down Entrance */}
          <img
            src={logo}
            alt="Company Logo"
            className="w-40 md:w-56 object-contain -mt-16 mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-fade-in-down"
          />

          <p className="text-blue-400 text-sm md:text-lg font-bold uppercase tracking-[0.3em] mb-4 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
            Precision Wire Harness Solutions
          </p>

          {/* MAIN HEADING with Slide Up Entrance */}
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-black mb-6 leading-tight uppercase tracking-tight animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Making Our Wire Harnesses <br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
              Your Own
            </span>
          </h1>

          <p className="text-base md:text-xl max-w-2xl mb-10 text-gray-300 font-light leading-relaxed animate-fade-in" style={{ animationDelay: '0.8s' }}>
            With over <span className="text-white font-semibold">20 years</span> in the industry, we deliver trusted partner solutions for branded electronic products worldwide.
          </p>

          {/* BUTTONS SECTION with Fade Entrance */}
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto animate-fade-in" style={{ animationDelay: '1s' }}>
            <Link 
              to="/products" 
              className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] text-center"
            >
              View Our Products
            </Link>

            <a 
              href="#contact" 
              className="border-2 border-white/30 hover:border-white/100 backdrop-blur-sm px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 text-center"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <section className="relative z-10 w-full bg-white border-y border-gray-200 overflow-hidden -mt-6 md:mt-0 py-6 md:py-14">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-400 text-[9px] md:text-xs uppercase tracking-[0.4em] mb-6 md:mb-10 font-bold">
            Trusted Industry Partners
          </p>
          
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {[...marqueeImages, ...marqueeImages].map((img, index) => (
                <div key={index} className="flex items-center justify-center">
                  <img
                    src={img}
                    alt="brand partner"
                    className="h-7 md:h-14 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
        /* 1. Slow Zoom for Video */
        @keyframes slowZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-slow-zoom {
          animation: slowZoom 20s ease-in-out infinite;
        }

        /* 2. Entrance Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }
        .animate-fade-in-down {
          animation: fadeInDown 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease forwards;
          opacity: 0;
        }

        /* 3. Marquee Styles */
        .marquee-wrapper { 
          overflow: hidden; 
          width: 100%; 
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .marquee-track {
          display: flex;
          gap: 3rem; 
          width: max-content;
          animation: marqueeScroll 40s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (min-width: 768px) {
          .marquee-track { 
            gap: 8rem; 
          }
        }
        `}
      </style>
    </>
  );
}

export default Hero;