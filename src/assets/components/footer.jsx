import { MapPin, Phone, Mail, Navigation } from "lucide-react";

function Footer() {
  // Verified Waze Place URL for Macro Wiring Technologies Co. Inc.
  const wazeUrl = "https://www.waze.com/live-map/directions/ph/calabarzon/rosario/macro-wiring-technologies-co.-inc.?to=place.ChIJsz9nAegsljMRK2UJp8jp0RI";

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6">
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

        {/* Interactive Site Map */}
        <div className="h-48 lg:h-full min-h-[150px] rounded-2xl overflow-hidden border border-gray-800 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500 shadow-inner">
          <iframe
            title="Macro Wiring Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.843642145347!2d120.865582!3d14.406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339795e80f2724ef%3A0x10973313b93bf435!2sMacro%20Wiring%20Technologies%20Co.%20Inc.!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
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
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;