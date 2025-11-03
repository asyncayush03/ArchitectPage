import React, { useState } from "react";
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const ModernFooter = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const contactItems = [
    { 
      label: "Project Inquiries", 
      email: "projects@jbkarchitecture.com",
      icon: <Mail className="w-4 h-4" />
    },
    { 
      label: "Vendor Inquiries", 
      email: "vendors@jbkarchitecture.com",
      icon: <Mail className="w-4 h-4" />
    },
    { 
      label: "Careers", 
      email: "careers@jbkarchitecture.com",
      icon: <Mail className="w-4 h-4" />
    },
    { 
      label: "PR & Media", 
      email: "pr@jbkarchitecture.com",
      icon: <Mail className="w-4 h-4" />
    },
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", url: "#" },
    { icon: Youtube, label: "YouTube", url: "#" },
    { icon: Facebook, label: "Facebook", url: "#" },
    { icon: Mail, label: "Email", url: "#" },
  ];

  const quickLinks = [
    { label: "Projects", url: "/" },
    { label: "Studio", url: "/studio" },
    { label: "Blog", url: "/blog" },
    { label: "Media", url: "/media" },
    { label: "Contact", url: "/contact" },
  ];

  const handleSendRequest = () => {
    alert("Request form would open here!");
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section - Get in Touch */}
        <div className="mb-16">
          <div className="relative mb-12">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
            <h2 className="text-center text-red-400 text-sm tracking-[0.3em] font-light relative bg-white inline-block left-1/2 -translate-x-1/2 px-6">
              GET IN TOUCH
            </h2>
          </div>

          <h3 className="text-gray-800 text-4xl md:text-5xl font-light text-center mb-8 tracking-wide">
            Let's Create Something Beautiful
          </h3>

          <p className="text-gray-600 text-center max-w-2xl mx-auto leading-relaxed mb-12">
            We are ready to lead you into the exciting world of contemporary architecture and sustainable design.
          </p>
        </div>

        {/* Contact Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactItems.map((item, index) => (
            <div
              key={index}
              className="contact-item opacity-0 group"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="text-amber-500 group-hover:text-red-400 transition-colors duration-300">
                  {item.icon}
                </div>
                <div className="text-gray-500 text-xs uppercase tracking-widest font-semibold">
                  {item.label}
                </div>
              </div>
              <a
                href={`mailto:${item.email}`}
                className="text-gray-700 text-sm inline-block relative group-hover:text-red-400 transition-all duration-300"
                style={{
                  transform: hoveredItem === index ? "translateX(5px)" : "translateX(0)",
                }}
              >
                {item.email}
                <span
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-red-400 to-amber-400 transition-all duration-300"
                  style={{
                    width: hoveredItem === index ? "100%" : "0",
                  }}
                />
              </a>
            </div>
          ))}
        </div> */}

        {/* CTA Section */}
        {/* <div className="bg-gradient-to-br from-gray-100 to-white rounded-2xl p-8 md:p-12 mb-16 text-center border border-gray-200 shadow-lg">
          <h4 className="text-2xl font-light text-gray-800 mb-4 tracking-wide">
            Ready to Start Your Project?
          </h4>
          <p className="text-gray-600 text-sm mb-6 max-w-xl mx-auto">
            Share your vision with us and let's bring your architectural dreams to life
          </p>
          <button
            onClick={handleSendRequest}
            className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-400 to-amber-400 text-white text-xs font-semibold tracking-wider rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            SEND REQUEST
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div> */}

        {/* Office Info & Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 pb-16 border-b border-gray-200">
          {/* Office Info */}
          <div>
            <h5 className="text-gray-800 font-semibold text-sm tracking-wider mb-4 uppercase">
              Our Office
            </h5>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-600 text-sm">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                <p>123 Design Avenue<br />Architecture District<br />Mumbai, India 400001</p>
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <p>+91 (22) 1234-5678</p>
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <p>info@jbkarchitecture.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-gray-800 font-semibold text-sm tracking-wider mb-4 uppercase">
              Quick Links
            </h5>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-600 text-sm hover:text-red-400 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-gray-800 font-semibold text-sm tracking-wider mb-4 uppercase">
              Newsletter
            </h5>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Subscribe to receive updates on our latest projects and design insights.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-amber-400 text-sm transition-all duration-300"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-red-400 to-amber-400 text-white rounded-full text-xs font-semibold hover:shadow-lg transition-all duration-300">
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-amber-400 rounded-sm flex items-center justify-center">
                  <span className="text-white font-bold text-sm">J</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-sm"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-800 font-light text-base tracking-wider leading-tight">
                  J.B.K.
                </span>
                <span className="text-gray-500 text-[9px] tracking-[0.2em] uppercase">
                  Architecture
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-xs">
              © 2025 J.B.K. Architecture. All Rights Reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-110"
                  style={{
                    background: hoveredSocial === index 
                      ? "linear-gradient(135deg, #f87171, #fbbf24)" 
                      : "transparent",
                    boxShadow: hoveredSocial === index 
                      ? "0 5px 15px rgba(248, 113, 113, 0.3)" 
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