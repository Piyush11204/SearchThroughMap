import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 fixed w-full z-20 text-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">
          ProfileMap
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a
            href="/"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#features"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="profiles"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Profiles
          </a>
          <a
            href="#contact"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden space-y-2 px-4 py-4 bg-gray-700">
          <a
            href="/"
            className="block text-gray-300 hover:text-white transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#features"
            className="block text-gray-300 hover:text-white transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="profiles"
            className="block text-gray-300 hover:text-white transition-colors duration-200"
          >
            Profiles
          </a>
          <a
            href="#contact"
            className="block text-gray-300 hover:text-white transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
