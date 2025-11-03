import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Projects', path: '/' },
    { label: 'Studio', path: '/studio' },
    { label: 'Blog', path: '/blog' },
    { label: 'Media', path: '/media' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-enter {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center space-x-3"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-amber-400 rounded-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-400 rounded-sm transform group-hover:scale-110 transition-transform duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-800 font-light text-lg tracking-wider leading-tight">
                J.B.K.
              </span>
              <span className="text-gray-500 text-[10px] tracking-[0.2em] uppercase">
                Architecture
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="relative px-5 py-2 text-sm font-light text-gray-700 hover:text-gray-900 tracking-wide transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-red-400 to-amber-400 group-hover:w-3/4 transition-all duration-300"></span>
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-4 px-6 py-2 bg-gradient-to-r from-red-400 to-amber-400 text-white text-xs font-semibold tracking-wider rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              GET IN TOUCH
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 mobile-menu-enter">
          <div className="px-4 py-6 space-y-3">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm font-light text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block text-center px-6 py-3 bg-gradient-to-r from-red-400 to-amber-400 text-white text-xs font-semibold tracking-wider rounded-full hover:shadow-lg transition-all duration-300"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;