import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-white/10">
      <div className="mr-auto max-w-1xl px-0  ml-0 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo / Title */}
          <div className="flex items-center space-x-3">
            <a
              href="#"
              className="text-white bg-gray-800/40 px-4 py-2 rounded-md text-lg font-semibold tracking-wide shadow-sm hover:bg-gray-700/50 transition backdrop-blur-sm"
            >
              Architect
            </a>
          </div>

          {/* Right side (Desktop) */}
          <div className="hidden sm:flex space-x-4">
            <a
              href="#"
              className="rounded-md px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800/40 hover:bg-gray-700/50 hover:text-white transition backdrop-blur-sm shadow-sm"
            >
              Projects
            </a>
            <a
              href="#"
              className="rounded-md px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800/40 hover:bg-gray-700/50 hover:text-white transition backdrop-blur-sm shadow-sm"
            >
              Studio
            </a>
            <Link
              to="/blog"
              className="rounded-md px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800/40 hover:bg-gray-700/50 hover:text-white transition backdrop-blur-sm shadow-sm"
            >
              Blog
            </Link>
            <a
              href="#"
              className="rounded-md px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800/40 hover:bg-gray-700/50 hover:text-white transition backdrop-blur-sm shadow-sm"
            >
              Media
            </a>
            <Link
              to="/contact"
              className="rounded-md px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800/40 hover:bg-gray-700/50 hover:text-white transition backdrop-blur-sm shadow-sm"
            >
              Contact
            </Link>
          </div>

          {/* Hamburger Menu Button (Mobile) */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition backdrop-blur-sm"
            >
              {menuOpen ? (
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
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-900/40 backdrop-blur-lg border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-200 bg-gray-800/40 hover:bg-gray-700/50 hover:text-white transition backdrop-blur-sm shadow-sm"
            >
              Projects
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-200 bg-gray-800/40 hover:bg-gray-700/50 hover:text-white transition backdrop-blur-sm shadow-sm"
            >
              Studio
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-200 bg-gray-800/40 hover:bg-gray-700/50 hover:text-white transition backdrop-blur-sm shadow-sm"
            >
              Blog
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-200 bg-gray-800/40 hover:bg-gray-700/50 hover:text-white transition backdrop-blur-sm shadow-sm"
            >
              Media
            </a>
            <Link to ="/contact"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-200 bg-gray-800/40 hover:bg-gray-700/50 hover:text-white transition backdrop-blur-sm shadow-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
