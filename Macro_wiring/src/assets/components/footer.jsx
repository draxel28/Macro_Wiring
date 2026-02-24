import React, { useState } from "react";
import { MapPin, Phone, Mail, Navigation, ShieldCheck, Scale, FileText, CheckCircle2 } from "lucide-react";

function Footer() {
  const [modalContent, setModalContent] = useState(null);
  const [hasAgreed, setHasAgreed] = useState(false);

  // Verified Waze Place URL for Macro Wiring Technologies Co. Inc.
  const wazeUrl = "https://www.waze.com/live-map/directions/ph/calabarzon/rosario/macro-wiring-technologies-co.-inc.?to=place.ChIJsz9nAegsljMRK2UJp8jp0RI";

  const handleClose = () => {
    setModalContent(null);
    setHasAgreed(false); 
  };

  const LegalModal = ({ title, type }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border border-white/20">
        
        {/* Modal Header */}
        <div className="p-8 border-b bg-gray-50/80 flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${type === 'privacy' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
            {type === 'privacy' ? <ShieldCheck size={28} /> : <Scale size={28} />}
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{title}</h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Legal Acknowledgment Required</p>
          </div>
        </div>
        
        {/* Detailed Legal Content */}
        <div className="p-8 md:p-10 overflow-y-auto text-gray-600 space-y-8">
          {type === 'terms' ? (
            <div className="space-y-6">
              <p className="text-sm italic font-medium">Access to and use of this website is subject to the following terms and conditions and all applicable laws of the Republic of the Philippines.</p>
              <section className="space-y-4">
                {[
                  { t: "Philippine Scope", d: "The information concerning products or services is applicable only in the Philippines." },
                  { t: "Intellectual Property", d: "Distribution, modification, or reproduction of content (text, images, source code) is prohibited without written permission from the owner." },
                  { t: "Liability Disclaimer", d: "Browsing is at the user's risk. We assume no liability for errors or omissions in site contents." },
                  { t: "Communications", d: "Electronic mail transmitted to this site is treated as non-confidential and non-proprietary." },
                  { t: "Third-Party Links", d: "We are not responsible for the content of any off-site pages or other sites linked to this website." }
                ].map((item, i) => (
                  <div key={i}>
                    <h4 className="text-gray-900 font-bold text-sm mb-1 flex items-center gap-2">
                      <FileText size={14} className="text-blue-500" /> {item.t}
                    </h4>
                    <p className="text-xs leading-relaxed pl-6">{item.d}</p>
                  </div>
                ))}
              </section>
            </div>
          ) : (
            <div className="space-y-6 text-sm">
              <p>In compliance with the <b>Philippine Data Privacy Act of 2012 (RA 10173)</b>, Macro Wiring Technologies Co. Inc. ensures all personal data is handled securely.</p>
              <div className="space-y-4">
                <section>
                  <h4 className="text-gray-900 font-bold">Data Collection</h4>
                  <p className="text-xs mt-1">We collect personal info (Name, Email, Contact) solely to respond to inquiries and document stakeholder concerns in line with our <b>ISO 9001:2015</b> and <b>ISO 14001:2015</b> standards.</p>
                </section>
                <section>
                  <h4 className="text-gray-900 font-bold">Data Retention & Rights</h4>
                  <p className="text-xs mt-1">Users have the right to access, object, or request correction/deletion of their data. We do not sell or share data with third parties for marketing.</p>
                </section>
              </div>
            </div>
          )}
        </div>

        {/* Action Area */}
        <div className="p-8 bg-gray-50 border-t space-y-6">
          <label className="flex items-center gap-4 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                className="hidden" 
                checked={hasAgreed}
                onChange={() => setHasAgreed(!hasAgreed)}
              />
              <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${hasAgreed ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                {hasAgreed && <CheckCircle2 size={16} className="text-white" />}
              </div>
            </div>
            <span className="text-xs font-bold text-gray-700 select-none uppercase tracking-tight">
              I have read and agree to the {title}
            </span>
          </label>

          <button 
            disabled={!hasAgreed}
            onClick={handleClose}
            className={`w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
              hasAgreed 
              ? 'bg-gray-900 text-white hover:bg-black active:scale-[0.98] shadow-xl shadow-blue-200' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">MACRO WIRING</h2>
          <p className="text-gray-400 leading-relaxed">
            With over 20 years of excellence, we are a leading Tier-1 partner 
            for precision wire harness and power cord solutions.
          </p>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-500" /> CONTACT
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <span className="block text-gray-500 text-xs uppercase font-bold">Inquiries</span>
              <a href="tel:+63464377204" className="hover:text-blue-400 transition">(+63 46) 437-7204</a>
            </li>
            <li>
              <a href="tel:+63464772499" className="hover:text-blue-400 transition">(+63 46) 477-2499</a>
            </li>
            <li>
              <span className="block text-gray-500 text-xs uppercase font-bold mt-2">Email</span>
              <a href="mailto:sales@macrowiring.co" className="hover:text-blue-400 transition flex items-center gap-2">
                <Mail className="w-4 h-4" /> sales@macrowiring.co
              </a>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-500" /> LOCATION
          </h3>
          <p className="text-gray-400 leading-relaxed text-sm">
            Lot 3 Block 17 Phase 4<br />
            Cavite Economic Zone<br />
            Rosario, Cavite<br />
            Philippines 4106
          </p>
          <a 
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 px-4 rounded-full transition-all shadow-lg cursor-pointer"
          >
            <Navigation className="w-3 h-3" /> GET DIRECTIONS (WAZE)
          </a>
        </div>

        {/* Interactive Map */}
        <div className="h-48 lg:h-full min-h-[150px] rounded-2xl overflow-hidden border border-gray-800 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500 shadow-inner">
          <iframe
            title="Macro Wiring Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.846467384462!2d120.8931!3d14.4069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339794e821673f33%3A0x12d1e98ce4a7652b!2sMacro%20Wiring%20Technologies%20Co.%20Inc.!5e0!3m2!1sen!2sph!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
        <p>© 2026 Macro Wiring Technologies Co. Inc. All Rights Reserved.</p>
        <div className="flex gap-6">
          <button onClick={() => setModalContent('privacy')} className="hover:text-white transition cursor-pointer">Privacy Policy</button>
          <button onClick={() => setModalContent('terms')} className="hover:text-white transition cursor-pointer">Terms of Service</button>
        </div>
      </div>

      {/* Render Modal */}
      {modalContent && (
        <LegalModal 
          title={modalContent === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'} 
          type={modalContent} 
        />
      )}
    </footer>
  );
}

export default Footer;