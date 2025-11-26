import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  Youtube,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const ModernFooter = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const quickLinks = [
    { label: "Projects", url: "/projects" },
    { label: "Studio", url: "/studio" },
    { label: "Blog", url: "/blog" },
    { label: "Media", url: "/media" },
    { label: "Contact", url: "/contact" },
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", url: "#" },
    { icon: Youtube, label: "YouTube", url: "#" },
    { icon: Facebook, label: "Facebook", url: "#" },
    { icon: Mail, label: "Email", url: "#" },
  ];

  return (
    <footer className="relative bg-black border-t border-gray-800">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contact-item {
          animation: fadeInUp 0.6s ease forwards;
        }
        .contact-item:nth-child(1) { animation-delay: 0.1s; }
        .contact-item:nth-child(2) { animation-delay: 0.2s; }
        .contact-item:nth-child(3) { animation-delay: 0.3s; }
        .contact-item:nth-child(4) { animation-delay: 0.4s; }
      `}</style>

      {/* Soft radial glow in background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/15 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-red-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* TITLE / CTA */}
        <div className="mb-16">
          <div className="relative mb-10 flex justify-center">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />
            <h2 className="relative text-center text-red-400 text-[11px] tracking-[0.35em] font-medium bg-black px-6 uppercase">
              Get in touch
            </h2>
          </div>

          <h3 className="text-white text-4xl md:text-5xl font-light text-center mb-6 tracking-tight">
            Let&apos;s Create Something Beautiful
          </h3>

          <p className="text-gray-400 text-center max-w-2xl mx-auto leading-relaxed mb-10">
            We are ready to lead you into the exciting world of contemporary
            architecture and sustainable design.
          </p>
        </div>

        {/* OFFICE + LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 pb-12 border-b border-gray-800/80">

          {/* OFFICE */}
          <div className="contact-item">
            <h5 className="text-gray-300 font-semibold text-xs tracking-[0.25em] mb-5 uppercase">
              Our Office
            </h5>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                <p className="leading-relaxed text-gray-400">
                  123 Design Avenue
                  <br />
                  Architecture District
                  <br />
                  Mumbai, India 400001
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <p className="text-gray-300">+91 (22) 1234-5678</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <p className="text-gray-300">info@jbkarchitecture.com</p>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="contact-item">
            <h5 className="text-gray-300 font-semibold text-xs tracking-[0.25em] mb-5 uppercase">
              Quick Links
            </h5>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.url}
                    className="group inline-flex items-center text-sm text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <span className="mr-2 h-px w-0 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-4 transition-all duration-300" />
                    <span className="tracking-wide group-hover:translate-x-1 transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* (Optional) Newsletter – stay commented if not needed */}
          {/* 
          <div className="contact-item">
            <h5 className="text-gray-300 font-semibold text-xs tracking-[0.25em] mb-5 uppercase">
              Newsletter
            </h5>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Subscribe to receive updates on our latest projects and design insights.
            </p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-full bg-black/50 border border-gray-700 focus:outline-none focus:border-red-500 text-sm text-gray-200 placeholder:text-gray-500 transition-all duration-300"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transition-all duration-300">
                Join
              </button>
            </div>
          </div>
          */}
        </div>

        {/* BOTTOM ROW */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* BRAND + ADMIN */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-[6px] flex items-center justify-center shadow-lg shadow-red-900/70">
                  <span className="text-white font-semibold text-sm">J</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-[4px] shadow-md shadow-amber-500/70" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-light text-base tracking-[0.25em] leading-tight uppercase">
                  J.B.K.
                </span>
                <span className="text-gray-500 text-[9px] tracking-[0.25em] uppercase">
                  Architecture
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-[11px] mb-1">
              © 2025 J.B.K. Architecture. All Rights Reserved.
            </p>

            <Link
              to="/login"
              className="text-gray-400 text-[11px] tracking-[0.2em] uppercase font-medium hover:text-red-400 transition-colors duration-300"
            >
              Admin Access
            </Link>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-3">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              const isHovered = hoveredSocial === index;
              return (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 transform ${
                    isHovered
                      ? "scale-110 border-transparent text-white"
                      : "border-gray-700 text-gray-300 hover:border-red-500/60"
                  }`}
                  style={{
                    background: isHovered
                      ? "linear-gradient(135deg, #ef4444, #f97316)"
                      : "rgba(0,0,0,0.6)",
                    boxShadow: isHovered
                      ? "0 10px 30px rgba(239, 68, 68, 0.45)"
                      : "none",
                  }}
                >
                  <IconComponent size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
