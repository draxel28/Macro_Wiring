import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle smooth scrolling
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback to top if ID isn't found (useful for Home)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
        
        {/* Logo */}
        <h1 
          className="text-xl font-bold cursor-pointer" 
          onClick={() => scrollToSection('home')}
        >
          Macro Wiring Technologies Co. Inc.
        </h1>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden block text-white focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Links */}
        <ul className={`${
          isOpen ? "block" : "hidden"
        } w-full md:flex md:w-auto md:gap-8 text-sm font-medium mt-4 md:mt-0 transition-all duration-300`}>
          
          {/* HOME LINK - Now Connected */}
          <li 
            onClick={() => scrollToSection('home')}
            className="py-2 md:py-0 hover:text-blue-400 cursor-pointer transition"
          >
            Home
          </li>

          <li className="py-2 md:py-0 hover:text-blue-400 cursor-pointer transition">Products</li>
          <li className="py-2 md:py-0 hover:text-blue-400 cursor-pointer transition">Certification</li>
          <li className="py-2 md:py-0 hover:text-blue-400 cursor-pointer transition">About Us</li>
          <li className="py-2 md:py-0 hover:text-blue-400 cursor-pointer transition">Contact</li>
        </ul>
        
      </div>
    </nav>
  );
}

export default Navbar;