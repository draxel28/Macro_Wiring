import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  // Helper function for NavLink classes
  const navLinkStyles = ({ isActive }) =>
    `relative transition duration-300 pb-1 block md:inline-block ${
      isActive
        ? "text-blue-400 active-link font-bold"
        : "text-white hover:text-blue-400"
    } nav-link-animated`;

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <h1 className="text-xl font-bold hover:text-blue-400 transition cursor-pointer">
            Macro Wiring Technologies Co. Inc.
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden block text-white focus:outline-none p-2"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Links */}
        <ul
          className={`${
            isOpen ? "flex flex-col py-6 space-y-6" : "hidden"
          } w-full md:flex md:flex-row md:space-y-0 md:py-0 md:w-auto md:gap-8 text-base md:text-sm font-medium mt-4 md:mt-0 border-t border-gray-800 md:border-none`}
        >
          <li>
            <NavLink to="/" end onClick={closeMenu} className={navLinkStyles}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/products"
              onClick={closeMenu}
              className={navLinkStyles}
            >
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/certifications"
              onClick={closeMenu}
              className={navLinkStyles}
            >
              Certifications
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about-us"
              onClick={closeMenu}
              className={navLinkStyles}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={navLinkStyles}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
