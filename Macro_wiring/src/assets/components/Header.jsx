function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">Macro Wiring</h1>

        {/* Links */}
        <ul className="flex gap-8 text-sm font-medium">
          <li className="hover:text-blue-400 cursor-pointer transition">
            Home
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition">
            Products
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition">
            Certification
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition">
            About Us
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition">
            Contact
          </li>
        </ul>

        {/* Button */}
        <button className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
