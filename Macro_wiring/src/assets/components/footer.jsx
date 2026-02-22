function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">MACRO WIRING</h2>
          <p className="text-gray-400 leading-relaxed">
            With 20+ years in the industry, we are your trusted partner for
            precision wire harness solutions.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">CONTACT</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Tel: (+63 46) 437-7204</li>
            <li>Tel: (+63 46) 477-2499</li>
            <li>Fax: (+63 46) 437-9272</li>
            <li>Email: sales@macrowiring.co</li>
          </ul>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">LOCATION</h3>
          <p className="text-gray-400 leading-relaxed">
            Lot 3 Block 17 Phase 4<br />
            Cavite Economic Zone
            <br />
            Rosario, Cavite
            <br />
            Philippines 4106
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
        © 2026 Macro Wiring Technologies Co. Inc. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
