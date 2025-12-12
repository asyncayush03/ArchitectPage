import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import CentanniLogo from "../../assets/centanni-logo.png"; // <-- update path if needed

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Projects", path: "/projects" },
    { label: "About Us", path: "/aboutus" },
    { label: "Media", path: "/media" },
    { label: "Article", path: "/article" }, // <-- NEW item added
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path) => window.location.pathname === path;

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-enter {
          animation: slideDown 0.25s ease-out;
        }
        .dropdown-enter {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>

      {/* FIXED NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 border-b border-gray-200 shadow-lg backdrop-blur-xl"
            : "bg-white/90 border-b border-gray-100 backdrop-blur-lg"
        }`}
      >
        {/* glow line */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a href="/" className="group flex items-center space-x-3">
              <img
                src={CentanniLogo}
                alt="CENT'ANNI logo"
                className="h-8 md:h-10 w-auto transform group-hover:scale-110 group-hover:translate-y-0.5 transition-transform duration-300"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  <a
                    href={item.path}
                    onMouseEnter={() =>
                      item.hasDropdown && setActiveDropdown(index)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                    className={`relative px-5 py-2 text-sm tracking-wide transition-all duration-300 group flex items-center gap-1
                      ${
                        isActive(item.path)
                          ? "text-red-600 font-medium"
                          : "text-gray-700 hover:text-red-600 font-light"
                      }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    )}

                    <span
                      className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-300
                        ${
                          isActive(item.path)
                            ? "w-3/4 opacity-100"
                            : "w-0 group-hover:w-3/4 opacity-0 group-hover:opacity-100"
                        }`}
                    />
                  </a>

                  {/* Dropdown Menu (if used later) */}
                  {item.hasDropdown && activeDropdown === index && (
                    <div
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 dropdown-enter"
                    >
                      <a
                        href="/services/design"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        Design Services
                      </a>
                      <a
                        href="/services/development"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        Development
                      </a>
                      <a
                        href="/services/consulting"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        Consulting
                      </a>
                    </div>
                  )}
                </div>
              ))}

              {/* CTA Button */}
              <a
                href="/contact"
                className="ml-4 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-red-500/40 transform hover:scale-105 transition-all duration-300"
              >
                GET IN TOUCH
              </a>
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
          <div className="md:hidden bg-white border-t border-gray-100 mobile-menu-enter">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 text-sm tracking-wide rounded-lg transition-all duration-300
                    ${
                      isActive(item.path)
                        ? "bg-red-50 text-red-600 font-medium border border-red-200"
                        : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                    }`}
                >
                  {item.label}
                </a>
              ))}

              <a
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 block text-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all duration-300"
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer so content not hidden behind navbar */}
      <div aria-hidden="true" className="h-20" />
    </>
  );
};

export default Navbar;
