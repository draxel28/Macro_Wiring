import React, { useState, useEffect } from "react";
import { Lock, ShieldCheck, Scale, FileText, CheckCircle2, ChevronRight } from "lucide-react";

// Memoized checkbox for stable rendering with larger text
const AgreementCheckbox = React.memo(({ checked, onChange, label }) => (
  <label className="flex items-start gap-4 cursor-pointer group py-2">
    <input 
      type="checkbox" 
      className="hidden" 
      checked={checked}
      onChange={onChange}
    />
    <div 
      className={`mt-0.5 w-6 h-6 rounded-md border-2 transition-all duration-200 flex flex-shrink-0 items-center justify-center ${
        checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
      }`}
      style={{ transform: 'translateZ(0)' }} 
    >
      {checked && <CheckCircle2 size={14} className="text-white" />}
    </div>
    <span className="text-[13px] font-bold text-gray-700 uppercase tracking-tight select-none group-hover:text-blue-600 transition-colors text-left leading-snug">
      {label}
    </span>
  </label>
));

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isWelcoming, setIsWelcoming] = useState(false);
  const [hasAgreedMain, setHasAgreedMain] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("macro_cookies_accepted");
    if (!hasAccepted) {
      setIsVisible(true);
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleAcceptMain = () => {
    if (!hasAgreedMain) return;
    setIsWelcoming(true);
    setTimeout(() => {
      localStorage.setItem("macro_cookies_accepted", "true");
      setIsVisible(false);
      setIsWelcoming(false);
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }, 3200); 
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/95 backdrop-blur-2xl transition-all duration-1000 p-4">
      
      {!isWelcoming ? (
        /* --- HIGH READABILITY CONSENT CARD --- */
        <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-white/20 animate-fade-in relative transform-gpu">
          
          {/* Header Section */}
          <div className="p-10 pb-6 flex flex-col items-center text-center">
            <div className="bg-blue-600 text-white p-5 rounded-2xl mb-6 shadow-xl shadow-blue-200">
              <Lock size={36} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Legal Compliance</h2>
            <p className="text-[14px] text-gray-500 leading-relaxed max-w-lg">
              In compliance with the <b>Philippine Data Privacy Act of 2012 (RA 10173)</b>, Macro Wiring Technologies Co. Inc. ensures all personal data is handled securely.
            </p>
          </div>

          {/* Expanded Legal Content Area */}
          <div className="mx-6 md:mx-10 p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-8 max-h-[45vh] overflow-y-auto custom-scrollbar shadow-inner">
            
            {/* Privacy Policy Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-green-600">
                <ShieldCheck size={22} />
                <h3 className="text-[12px] font-black uppercase tracking-[0.15em]">Privacy Policy</h3>
              </div>
              <div className="space-y-4 text-[14px] text-gray-600 leading-relaxed">
                <p>
                  We collect personal information (Name, Email, Contact Number) <b>only</b> when voluntarily submitted via our Contact Us form. This data is used exclusively to respond to your specific business inquiries and is processed in line with our <b>ISO 9001:2015</b> quality procedures.
                </p>
                <p>
                  <b>Information Security:</b> We do not provide public user accounts. Your information is stored in secured internal systems protected against unauthorized access. We do not sell or share details with third-party marketers.
                </p>
                <p>
                  <b>Your Privacy Rights:</b> You have the right to request access to the information you submitted, ask for its correction, or request that we permanently delete your inquiry data from our records.
                </p>
              </div>
            </section>

            <div className="h-px bg-gray-200 w-full" />

            {/* Terms Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600">
                <Scale size={22} />
                <h3 className="text-[12px] font-black uppercase tracking-[0.15em]">Terms & Conditions</h3>
              </div>
              <p className="text-[13px] text-gray-500 italic">
                Access to and use of this website is subject to the laws of the Republic of the Philippines.
              </p>
              <div className="space-y-3">
                {[
                  { t: "Philippine Scope", d: "Information concerning products or services is applicable only in the Philippines." },
                  { t: "Intellectual Property", d: "Distribution, modification, or reproduction of content (text, images, source code) is prohibited without written permission." },
                  { t: "Liability Disclaimer", d: "Browsing is at the user's risk. We assume no liability for errors or omissions in site contents." },
                  { t: "Communications", d: "Inquiries transmitted to this site are treated as non-confidential for business processing purposes." },
                  { t: "Third-Party Links", d: "We are not responsible for the content of any off-site pages or linked websites." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <ChevronRight size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-[14px] text-gray-600 leading-snug">
                      <span className="font-bold text-gray-800">{item.t}:</span> {item.d}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Action Area */}
          <div className="p-10 pt-8 space-y-6">
            <AgreementCheckbox 
              checked={hasAgreedMain}
              onChange={() => setHasAgreedMain(!hasAgreedMain)}
              label="I have reviewed and agree to the Privacy Policy and Terms of Service"
            />

            <button 
              disabled={!hasAgreedMain}
              onClick={handleAcceptMain}
              className={`w-full font-black py-5 rounded-2xl transition-all uppercase tracking-widest text-sm shadow-2xl active:scale-95 ${
                hasAgreedMain 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100 cursor-pointer' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              I Accept and Enter Site
            </button>
          </div>
        </div>
      ) : (
        /* --- WELCOME ANIMATION --- */
        <div className="flex flex-col items-center justify-center text-center px-6 max-w-4xl">
          <p className="text-blue-400 text-xl md:text-2xl font-light uppercase tracking-[0.6em] mb-4 animate-welcome-text">
            Welcome to
          </p>
          <div className="relative">
            <h1 className="text-white text-4xl md:text-7xl font-black tracking-tighter leading-none animate-text-zoom-pass">
              MACRO WIRING <br />
              <span className="text-blue-500">TECHNOLOGIES</span> <br />
              <span className="text-2xl md:text-4xl font-light tracking-[0.3em] text-gray-400">COMPANY INC.</span>
            </h1>
            <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full animate-glow-pulse -z-10" />
          </div>
        </div>
      )}

      <style>{`
        .transform-gpu { transform: translateZ(0); backface-visibility: hidden; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
        
        @keyframes welcomeText { 
          0% { opacity: 0; transform: translateY(20px); } 
          20%, 80% { opacity: 1; transform: translateY(0); } 
          100% { opacity: 0; transform: translateY(-20px); filter: blur(10px); } 
        }

        @keyframes textZoomPass { 
          0% { opacity: 0; transform: scale(0.9); filter: blur(10px); } 
          40% { opacity: 1; transform: scale(1); filter: blur(0px); } 
          100% { opacity: 0; transform: scale(1.1); filter: blur(20px); } 
        }

        @keyframes glowPulse { 0% { opacity: 0; scale: 0.5; } 50% { opacity: 1; scale: 1.2; } 100% { opacity: 0; scale: 2; } }
        
        .animate-welcome-text { animation: welcomeText 3.2s ease-in-out forwards; }
        .animate-text-zoom-pass { animation: textZoomPass 3.2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-glow-pulse { animation: glowPulse 3.2s ease-out forwards; }
        
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default CookieConsent;