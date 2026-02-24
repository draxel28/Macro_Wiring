import React, { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("macro_cookies_accepted");
    if (!hasAccepted) {
      // Show after a 2-second delay for smoother UX
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("macro_cookies_accepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[200] md:left-auto md:max-w-md animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 relative overflow-hidden">
        {/* Subtle Background Decoration */}
        <div className="absolute -right-4 -top-4 text-blue-50 opacity-50">
          <ShieldCheck size={100} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <ShieldCheck size={20} />
            </div>
            <h4 className="font-bold text-gray-900">Privacy Preference</h4>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed mb-6">
            We use cookies and process personal data to ensure the best experience on our website, 
            in compliance with the <b>Data Privacy Act of 2012</b>. By continuing, you agree to our 
            Terms and Privacy Policy.
          </p>

          <div className="flex gap-3">
            <button 
              onClick={handleAccept}
              className="flex-1 bg-gray-900 text-white text-[11px] font-black uppercase tracking-widest py-3 rounded-xl hover:bg-black transition active:scale-95 shadow-lg shadow-gray-200"
            >
              Accept All
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="px-4 py-3 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;