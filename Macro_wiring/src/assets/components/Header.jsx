import { useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  const handleAdminLogin = () => {
    if (adminPassword === "MacroAdmin123") {
      sessionStorage.setItem("admin_access", "true");
      setShowAdminModal(false);
      setAdminPassword("");
      setAdminError("");
      navigate("/admin");
    } else {
      setAdminError("Incorrect password.");
    }
  };

  const isAdminActive = location.pathname === "/admin";

  // Common styles: 'w-full' ensures the animated line spans the menu width
  const navLinkStyles = ({ isActive }) =>
    `relative transition duration-300 pb-1 block w-full text-left nav-link-animated ${
      isActive
        ? "text-blue-400 active-link font-bold"
        : "text-white hover:text-blue-400"
    }`;

  // Admin button forced to 'w-full' so the underline animation is long
  const adminButtonStyle = `relative transition duration-300 pb-1 block w-full text-left nav-link-animated bg-transparent border-none cursor-pointer ${
    isAdminActive
      ? "text-blue-400 active-link font-bold"
      : "text-white hover:text-blue-400"
  }`;

  return (
    <>
      <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
          <Link to="/" onClick={closeMenu}>
            <h1 className="text-xl font-bold hover:text-blue-400 transition cursor-pointer">
              Macro Wiring Technologies Co. Inc.
            </h1>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden block text-white focus:outline-none p-2"
          >
            ☰
          </button>

          <ul
            className={`${
              isOpen ? "flex flex-col py-6 space-y-6" : "hidden"
            } w-full md:flex md:flex-row md:space-y-0 md:py-0 md:w-auto md:gap-8 items-start`}
          >
            <li className="w-full md:w-auto">
              <NavLink to="/" end onClick={closeMenu} className={navLinkStyles}>
                Home
              </NavLink>
            </li>

            <li className="w-full md:w-auto">
              <NavLink to="/products" onClick={closeMenu} className={navLinkStyles}>
                Products
              </NavLink>
            </li>

            <li className="w-full md:w-auto">
              <NavLink to="/certifications" onClick={closeMenu} className={navLinkStyles}>
                Certifications
              </NavLink>
            </li>

            <li className="w-full md:w-auto">
              <NavLink to="/about-us" onClick={closeMenu} className={navLinkStyles}>
                About Us
              </NavLink>
            </li>

            <li className="w-full md:w-auto">
              <NavLink to="/contact" onClick={closeMenu} className={navLinkStyles}>
                Contact Us
              </NavLink>
            </li>

            <li className="w-full md:w-auto">
              <button
                onClick={() => {
                  closeMenu();
                  setShowAdminModal(true);
                }}
                className={adminButtonStyle}
              >
                Admin
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Admin Login Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 relative">
            <button
              onClick={() => {
                setShowAdminModal(false);
                setAdminError("");
                setAdminPassword("");
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Admin Login
            </h2>

            <div className="space-y-4">
              <input
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none text-gray-900"
              />

              {adminError && (
                <p className="text-red-500 text-sm">{adminError}</p>
              )}

              <button
                onClick={handleAdminLogin}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;