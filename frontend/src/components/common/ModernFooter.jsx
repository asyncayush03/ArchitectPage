import React, { useState } from "react";
import {
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
} from "lucide-react";

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [email, setEmail] = useState("");

  const quickLinks = [
    { label: "About Us", url: "/about" },
    { label: "Services", url: "/services" },
    { label: "Portfolio", url: "/portfolio" },
    { label: "Blog", url: "/blog" },
    { label: "Careers", url: "/careers" },
    { label: "Contact", url: "/contact" },
  ];

  const services = [
    { label: "Web Design", url: "/services/web-design" },
    { label: "Brand Identity", url: "/services/branding" },
    { label: "Digital Marketing", url: "/services/marketing" },
    { label: "Consulting", url: "/services/consulting" },
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", url: "#", color: "from-pink-500 to-purple-600" },
    { icon: Twitter, label: "Twitter", url: "#", color: "from-blue-400 to-blue-600" },
    { icon: Linkedin, label: "LinkedIn", url: "#", color: "from-blue-600 to-blue-800" },
    { icon: Facebook, label: "Facebook", url: "#", color: "from-blue-500 to-blue-700" },
  ];

  const handleNewsletterSubmit = () => {
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .footer-item {
          animation: fadeInUp 0.6s ease forwards;
        }
        .footer-item:nth-child(1) { animation-delay: 0.1s; opacity: 0; }
        .footer-item:nth-child(2) { animation-delay: 0.2s; opacity: 0; }
        .footer-item:nth-child(3) { animation-delay: 0.3s; opacity: 0; }
        .footer-item:nth-child(4) { animation-delay: 0.4s; opacity: 0; }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* CTA Section */}
        <div className="mb-16 text-center">
          <div className="relative mb-8 flex justify-center">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            <h2 className="relative text-center text-red-600 text-xs tracking-[0.3em] font-semibold bg-gradient-to-br from-gray-50 to-white px-6 uppercase">
              Stay Connected
            </h2>
          </div>

          <h3 className="text-gray-900 text-4xl md:text-5xl font-light mb-6 tracking-tight">
            Let&apos;s Build Something Amazing
          </h3>

          <p className="text-gray-600 text-center max-w-2xl mx-auto leading-relaxed mb-8">
            Join our community and get the latest updates on projects, insights, and industry trends delivered to your inbox.
          </p>

          {/* Newsletter */}
          <div className="max-w-md mx-auto flex gap-2">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white border-2 border-gray-200 focus:outline-none focus:border-red-500 text-gray-800 placeholder:text-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div>
            <button
              onClick={handleNewsletterSubmit}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-medium hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 pb-12 border-b border-gray-200">

          {/* Company Info */}
          <div className="footer-item">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30 float-animation">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-600 rounded-full shadow-md" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-semibold text-xl tracking-tight">
                  LOGO
                </span>
                <span className="text-gray-500 text-[10px] tracking-[0.2em] uppercase font-medium">
                  Creative Studio
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Creating exceptional digital experiences that inspire and engage. Your trusted partner in creative excellence.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 group cursor-pointer">
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                  123 Creative Street<br />
                  Design District, City 12345
                </p>
              </div>

              <div className="flex items-center gap-3 group cursor-pointer">
                <Phone className="w-5 h-5 text-red-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                  +1 (555) 123-4567
                </p>
              </div>

              <div className="flex items-center gap-3 group cursor-pointer">
                <Mail className="w-5 h-5 text-red-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                  hello@creative.com
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-item">
            <h5 className="text-gray-900 font-semibold text-sm tracking-wide mb-6 uppercase">
              Quick Links
            </h5>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="group inline-flex items-center text-sm text-gray-600 hover:text-red-600 transition-all duration-300"
                  >
                    <ArrowRight className="w-0 h-4 mr-0 text-red-600 group-hover:w-4 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <span className="group-hover:translate-x-1 transform transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-item">
            <h5 className="text-gray-900 font-semibold text-sm tracking-wide mb-6 uppercase">
              Our Services
            </h5>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.url}
                    className="group inline-flex items-center text-sm text-gray-600 hover:text-red-600 transition-all duration-300"
                  >
                    <ArrowRight className="w-0 h-4 mr-0 text-red-600 group-hover:w-4 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <span className="group-hover:translate-x-1 transform transition-transform duration-300">
                      {service.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div className="footer-item">
            <h5 className="text-gray-900 font-semibold text-sm tracking-wide mb-6 uppercase">
              Business Hours
            </h5>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="text-gray-900 font-medium">9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="text-gray-900 font-medium">10:00 - 16:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="text-gray-900 font-medium">Closed</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Follow Us</p>
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
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform ${
                        isHovered
                          ? "scale-110 border-transparent text-white shadow-lg"
                          : "border-gray-300 text-gray-600 hover:border-red-500"
                      }`}
                      style={{
                        background: isHovered
                          ? `linear-gradient(135deg, #ef4444, #dc2626)`
                          : "white",
                      }}
                    >
                      <IconComponent size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-6">
            <p>© 2024 Creative Studio. All Rights Reserved.</p>
            <a href="/privacy" className="hover:text-red-600 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-red-600 transition-colors duration-300">
              Terms of Service
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500">Made with</span>
            <span className="text-red-600 animate-pulse">❤</span>
            <span className="text-gray-500">by Creative Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;