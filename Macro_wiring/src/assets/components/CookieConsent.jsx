import React, { useState, useEffect } from "react";
import { ShieldCheck, Lock } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("macro_cookies_accepted");
    if (!hasAccepted) {
      setIsVisible(true);
      // Force scroll lock on mount
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    // Cleanup function: ensures scroll is restored if component unmounts
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem("macro_cookies_accepted", "true");
    setIsVisible(false);
    // Restore scroll
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/90 backdrop-blur-xl">
      <div className="bg-white w-[90%] max-w-md rounded-[2rem] shadow-2xl p-8 flex flex-col items-center text-center border border-gray-100">
        
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
    </div>
  );
};

export default CookieConsent;