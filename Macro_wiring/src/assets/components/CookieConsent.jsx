import React, { useState, useEffect, useCallback } from "react";
import { Lock, ShieldCheck, Scale, FileText, CheckCircle2, X } from "lucide-react";
import logo from "./mwtci-logo.png"; 

// Memoized checkbox to prevent modal flickering
const AgreementCheckbox = React.memo(({ checked, onChange, title }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input 
      type="checkbox" 
      className="hidden" 
      checked={checked}
      onChange={onChange}
    />
    <div 
      className={`w-5 h-5 rounded-md border-2 transition-colors duration-200 flex items-center justify-center ${
        checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
      }`}
      style={{ transform: 'translateZ(0)' }} 
    >
      {checked && <CheckCircle2 size={12} className="text-white" />}
    </div>
    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-tight select-none">
      I have reviewed and agree to the {title}
    </span>
  </label>
));

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isWelcoming, setIsWelcoming] = useState(false);
  const [modalType, setModalType] = useState(null); 
  const [isExitingModal, setIsExitingModal] = useState(false);
  const [hasAgreedInModal, setHasAgreedInModal] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("macro_cookies_accepted");
    if (!hasAccepted) {
      setIsVisible(true);
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleAcceptMain = () => {
    setIsWelcoming(true); // This triggers the Welcome sequence
    setTimeout(() => {
      localStorage.setItem("macro_cookies_accepted", "true");
      setIsVisible(false);
      setIsWelcoming(false);
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }, 3200); // Extended slightly for full animation impact
  };

  const closeLegalModal = () => {
    setIsExitingModal(true);
    setTimeout(() => {
      setModalType(null);
      setIsExitingModal(false);
      setHasAgreedInModal(false);
    }, 300);
  };

  const toggleAgreement = useCallback(() => {
    setHasAgreedInModal(prev => !prev);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900 backdrop-blur-2xl transition-all duration-1000">
      
      {!isWelcoming ? (
        /* --- MAIN CONSENT CARD --- */
        <div className="bg-white w-[90%] max-w-md rounded-[2.5rem] shadow-2xl p-10 flex flex-col items-center text-center border border-gray-100 animate-fade-in relative transform-gpu">
          <div className="bg-blue-600 text-white p-4 rounded-2xl mb-6 shadow-lg shadow-blue-200">
            <Lock size={32} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Privacy & Data Consent</h2>
          
          <p className="text-xs text-gray-500 leading-relaxed mb-8">
            In compliance with the <b>Philippine Data Privacy Act</b>, we require your consent to use cookies for functionality and traffic analysis.
          </p>

          <button 
            onClick={handleAcceptMain}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-xl shadow-blue-100 uppercase tracking-widest text-xs mb-6"
          >
            I Accept and Enter Site
          </button>

          <div className="flex gap-4 justify-center">
             <button onClick={() => setModalType('privacy')} className="text-[10px] text-blue-600 hover:underline uppercase font-bold tracking-tighter cursor-pointer">Privacy Policy</button>
             <span className="text-gray-200">|</span>
             <button onClick={() => setModalType('terms')} className="text-[10px] text-blue-600 hover:underline uppercase font-bold tracking-tighter cursor-pointer">Terms of Service</button>
          </div>
        </div>
      ) : (
        /* --- RESTORED WELCOME SEQUENCE --- */
        <div className="flex flex-col items-center justify-center text-center px-6">
          <p className="text-blue-400 text-xl md:text-2xl font-light uppercase tracking-[0.5em] mb-8 animate-welcome-text">
            Welcome to
          </p>
          <div className="relative">
            <img 
              src={logo} 
              alt="Macro Wiring Logo" 
              className="w-64 md:w-96 object-contain animate-logo-zoom-pass"
            />
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-glow-pulse" />
          </div>
        </div>
      )}

      {/* NO-FLICKER LEGAL MODAL */}
      {modalType && (
        <div className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 transition-opacity duration-300 ${isExitingModal ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md -z-10" />
          
          <div className={`bg-white w-full max-w-2xl max-h-[85vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border border-white/20 transform-gpu animate-fade-in ${isExitingModal ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
            <div className="p-6 md:p-8 border-b bg-gray-50/80 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${modalType === 'privacy' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {modalType === 'privacy' ? <ShieldCheck size={24} /> : <Scale size={24} />}
                </div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">{modalType === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}</h2>
              </div>
              <button onClick={closeLegalModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            
            <div className="p-6 md:p-10 overflow-y-auto text-gray-600 space-y-6 text-sm">
              {modalType === 'terms' ? (
                <div className="space-y-4">
                   <p className="italic font-medium">Subject to the laws of the Republic of the Philippines.</p>
                   {[
                    { t: "Philippine Scope", d: "Information is applicable specifically within the Philippines." },
                    { t: "Intellectual Property", d: "Reproduction of Macro Wiring source code, text, or images is prohibited." },
                    { t: "Liability", d: "Use of this site is at the user's risk. We are not liable for errors." }
                  ].map((item, i) => (
                    <div key={i} className="border-l-2 border-blue-100 pl-4">
                      <h4 className="text-gray-900 font-bold flex items-center gap-2"><FileText size={14} className="text-blue-500" /> {item.t}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.d}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-5">
                  <p>In compliance with <b>RA 10173 (Data Privacy Act of 2012)</b>.</p>
                  <section>
                    <h4 className="text-gray-900 font-bold">Data Collection</h4>
                    <p className="text-xs mt-1">We collect data following <b>ISO 9001:2015</b> protocols.</p>
                  </section>
                  <section>
                    <h4 className="text-gray-900 font-bold text-blue-600">Your Privacy Rights</h4>
                    <p className="text-xs mt-1 italic">You have the right to access, correct, or request the deletion of your data.</p>
                  </section>
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 border-t space-y-4">
              <AgreementCheckbox 
                checked={hasAgreedInModal} 
                onChange={toggleAgreement} 
                title={modalType === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              />
              <button 
                disabled={!hasAgreedInModal}
                onClick={closeLegalModal}
                className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  hasAgreedInModal ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .transform-gpu { transform: translateZ(0); backface-visibility: hidden; }
        
        @keyframes welcomeText {
          0% { opacity: 0; transform: translateY(10px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-50px); filter: blur(10px); }
        }

        @keyframes logoZoomPass {
          0% { opacity: 0; transform: scale(0.5); filter: brightness(0); }
          40% { opacity: 1; transform: scale(1); filter: brightness(1); }
          70% { opacity: 1; transform: scale(1.1); filter: brightness(1.2); }
          100% { opacity: 0; transform: scale(4); filter: blur(30px); }
        }

        @keyframes glowPulse {
          0% { opacity: 0; scale: 0.5; }
          50% { opacity: 1; scale: 1.2; }
          100% { opacity: 0; scale: 2; }
        }

        .animate-welcome-text { animation: welcomeText 3.2s ease-in-out forwards; }
        .animate-logo-zoom-pass { animation: logoZoomPass 3.2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-glow-pulse { animation: glowPulse 3.2s ease-out forwards; }
        
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CookieConsent;