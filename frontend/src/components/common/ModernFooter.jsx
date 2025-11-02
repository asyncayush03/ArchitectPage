import React, { useState } from "react";
import { Instagram, Youtube, Facebook } from "lucide-react";
import { FaPinterest } from "react-icons/fa"; // ✅ Pinterest from react-icons

const ModernFooter = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const contactItems = [
    { label: "Project Inquiries", email: "hello@23dcarchitects.com" },
    { label: "Vendor Inquiries", email: "vm@23dcarchitects.com" },
    { label: "Careers", email: "careers@23dcarchitects.com" },
    { label: "PR & Collaborations", email: "pr@23dcarchitects.com" },
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", url: "#" },
    { icon: Youtube, label: "YouTube", url: "#" },
    { icon: Facebook, label: "Facebook", url: "#" },
    { icon: FaPinterest, label: "Pinterest", url: "#" },
    { icon: "Be", label: "Behance", url: "#", isText: true },
  ];

  const handleSendRequest = () => {
    alert("Request form would open here!");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-5"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <footer
        className="relative w-full max-w-1xl rounded-3xl overflow-hidden"
        style={{
          background: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Animated gradient border */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, #667eea, #764ba2, #f093fb, #4facfe)",
            backgroundSize: "200% 100%",
            animation: "gradientShift 3s ease infinite",
          }}
        />

        <style>{`
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
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

        <div className="p-10 md:p-16">
          {/* Social Links */}
          <div className="flex gap-4 mb-12">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #667eea, #764ba2)";
                    e.currentTarget.style.boxShadow =
                      "0 5px 15px rgba(102, 126, 234, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {social.isText ? social.icon : <IconComponent size={20} />}
                </a>
              );
            })}
          </div>

          {/* Main Heading */}
          <h1 className="text-white text-5xl md:text-6xl font-light mb-16 tracking-tight">
            Get in touch with us
          </h1>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {contactItems.map((item, index) => (
              <div
                key={index}
                className="contact-item opacity-0"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="text-gray-500 text-xs uppercase tracking-widest mb-3 font-semibold">
                  {item.label}
                </div>
                <a
                  href={`mailto:${item.email}`}
                  className="text-white text-lg inline-block transition-all duration-300 relative"
                  style={{
                    transform:
                      hoveredItem === index
                        ? "translateX(5px)"
                        : "translateX(0)",
                    color: hoveredItem === index ? "#667eea" : "#fff",
                  }}
                >
                  {item.email}
                  <span
                    className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                    style={{
                      width: hoveredItem === index ? "100%" : "0",
                      background: "linear-gradient(90deg, #667eea, #764ba2)",
                    }}
                  />
                </a>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-2xl">
            We are ready to lead you into the exciting world of architecture and
            interior design.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleSendRequest}
            className="relative overflow-hidden px-10 py-4 text-white font-semibold uppercase tracking-wider rounded-full transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              boxShadow: "0 5px 20px rgba(102, 126, 234, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 8px 30px rgba(102, 126, 234, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 5px 20px rgba(102, 126, 234, 0.3)";
            }}
          >
            <span className="relative z-10">SEND REQUEST</span>
            <span
              className="absolute top-0 left-0 w-full h-full transition-transform duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                transform: "translateX(-100%)",
              }}
            />
          </button>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-16 pt-8 border-t border-gray-800">
            <div className="text-gray-600 text-sm">
              Copyright 23DC Architects.
            </div>
            <div
              className="text-2xl font-bold tracking-widest"
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              23DC
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernFooter;
