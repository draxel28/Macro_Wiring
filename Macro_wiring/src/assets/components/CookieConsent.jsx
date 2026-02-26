import React, { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import logo from "./mwtci-logo.png"; // Importing the logo as requested

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isWelcoming, setIsWelcoming] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("macro_cookies_accepted");
    if (!hasAccepted) {
      setIsVisible(true);
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleAccept = () => {
    setIsWelcoming(true); // Start the welcome animation
    
    // After 2.5 seconds, remove everything and restore scroll
    setTimeout(() => {
      localStorage.setItem("macro_cookies_accepted", "true");
      setIsVisible(false);
      setIsWelcoming(false);
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }, 2500);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900 backdrop-blur-xl transition-all duration-700">
      
      {!isWelcoming ? (
        /* --- COOKIE CONSENT UI --- */
        <div className="bg-white w-[90%] max-w-md rounded-[2rem] shadow-2xl p-8 flex flex-col items-center text-center border border-gray-100 animate-fade-in">
          <div className="bg-blue-600 text-white p-4 rounded-2xl mb-6 shadow-lg shadow-blue-200">
            <Lock size={32} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Protected</h2>
          
          <p className="text-sm text-gray-600 leading-relaxed mb-8">
            To comply with the <b>Philippine Data Privacy Act</b>, please accept our terms 
            to unlock the website content. We use cookies to ensure you get the 
            best experience.
          </p>

          <button 
            onClick={handleAccept}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-100 uppercase tracking-widest text-xs"
          >
            I Accept and Enter Site
          </button>

          <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-tighter">
            Macro Wiring Technologies Co. Inc. Official Website
          </p>
        </div>
      ) : (
        /* --- WELCOME MESSAGE UI --- */
        <div className="flex flex-col items-center text-center px-6">
          <p className="text-blue-400 text-xl md:text-2xl font-light uppercase tracking-[0.5em] mb-4 animate-welcome-text">
            Welcome to
          </p>
          <img 
            src={logo} 
            alt="Macro Wiring Logo" 
            className="w-64 md:w-80 object-contain animate-welcome-logo"
          />
        </div>
      )}

      <style>{`
        @keyframes welcomeText {
          0% { opacity: 0; transform: translateY(20px); filter: blur(10px); }
          30% { opacity: 1; transform: translateY(0); filter: blur(0px); }
          80% { opacity: 1; transform: translateY(0); filter: blur(0px); }
          100% { opacity: 0; transform: translateY(-20px); filter: blur(10px); }
        }

        @keyframes welcomeLogo {
          0% { opacity: 0; scale: 0.9; filter: brightness(0); }
          40% { opacity: 1; scale: 1; filter: brightness(1); }
          80% { opacity: 1; scale: 1; filter: brightness(1); }
          100% { opacity: 0; scale: 1.1; filter: blur(5px); }
        }

        .animate-welcome-text {
          animation: welcomeText 2.5s ease-in-out forwards;
        }

        .animate-welcome-logo {
          animation: welcomeLogo 2.5s ease-in-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; scale: 0.95; }
          to { opacity: 1; scale: 1; }
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;