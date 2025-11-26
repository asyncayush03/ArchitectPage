import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Projects", path: "/projects" },
    { label: "Studio", path: "/studio" },
    { label: "Blog", path: "/blog" },
    { label: "Media", path: "/media" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* FIXED NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 border-b border-red-900/60 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "bg-gradient-to-b from-black/95 via-black/70 to-transparent border-b border-white/10 backdrop-blur-lg"
        }`}
      >
        <style>{`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .mobile-menu-enter {
            animation: slideDown 0.25s ease-out;
          }
        `}</style>

        {/* Subtle glow line under navbar */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">

            {/* Logo */}
            <Link to="/" className="group flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-[6px] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-900/60">
                  <span className="text-white font-semibold text-lg tracking-wide">
                    J
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-400 rounded-[4px] transform group-hover:scale-110 transition-transform duration-300 shadow-md shadow-amber-500/60" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-light text-lg tracking-[0.25em] leading-tight uppercase">
                  J.B.K.
                </span>
                <span className="text-gray-400 text-[10px] tracking-[0.25em] uppercase">
                  Architecture
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`relative px-5 py-2 text-xs tracking-[0.18em] uppercase transition-all duration-300 group
                    ${
                      isActive(item.path)
                        ? "text-red-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                >
                  <span className="font-light">{item.label}</span>

                  {/* Bottom gradient underline */}
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-red-500 via-amber-400 to-red-500 rounded-full transition-all duration-300
                    ${
                      isActive(item.path)
                        ? "w-3/4 opacity-100"
                        : "w-0 group-hover:w-3/4 opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              ))}

              {/* Optional CTA – uncomment if needed */}
              {/* 
              <Link
                to="/contact"
                className="ml-4 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-[11px] font-semibold tracking-[0.18em] rounded-full uppercase hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] transform hover:scale-105 transition-all duration-300"
              >
                Get in touch
              </Link>
              */}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-200 hover:bg-white/5 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-black/95 border-t border-white/10 mobile-menu-enter backdrop-blur-xl">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 text-xs tracking-[0.18em] uppercase rounded-lg transition-all duration-300
                    ${
                      isActive(item.path)
                        ? "bg-red-600/20 text-red-300 border border-red-500/40"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <span className="font-light">{item.label}</span>
                </Link>
              ))}

              {/* Optional CTA – uncomment if needed */}
              {/*
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 block text-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-[11px] font-semibold tracking-[0.2em] rounded-full uppercase hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-all duration-300"
              >
                Get in touch
              </Link>
              */}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer so page content is not hidden behind fixed navbar */}
      <div aria-hidden="true" className="h-20" />
    </>
  );
};

export default Navbar;
