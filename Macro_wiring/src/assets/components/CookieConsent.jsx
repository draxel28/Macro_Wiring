import React, { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Check if the user has already accepted
    const hasAccepted = localStorage.getItem("macro_cookies_accepted");
    
    // 2. If not accepted, show the banner after a short delay
    if (!hasAccepted) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // 3. Save the choice to localStorage
    localStorage.setItem("macro_cookies_accepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[999] md:right-auto md:max-w-sm animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <ShieldCheck size={20} />
          </div>
          <h4 className="font-bold text-gray-900">Privacy Notice</h4>
        </div>

        <p className="text-[11px] text-gray-600 leading-relaxed mb-6">
          Macro Wiring Technologies uses cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies in accordance with the <b>Philippine Data Privacy Act</b>.
        </p>

        <div className="flex gap-3">
          <button 
            onClick={handleAccept}
            className="flex-1 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl hover:bg-black transition active:scale-95"
          >
            I Accept
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="px-2 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;