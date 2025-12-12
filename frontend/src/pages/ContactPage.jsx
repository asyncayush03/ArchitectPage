import React, { useState } from "react";
import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
} from "lucide-react";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation (frontend)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post("/api/contact", formData);

      if (res.data.success) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          message: "",
        });
      }
    } catch (error) {
      alert("Failed to send message. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <style>{`
        * {-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}
        body {overflow-x: hidden;}
        @keyframes fade-in {from {opacity: 0;transform: translateY(20px);}to {opacity: 1;transform: translateY(0);}}
        .animate-fade-in {animation: fade-in 0.8s ease-out;will-change: opacity, transform;}
        .scroll-indicator {animation: bounce 2s infinite;}
        @keyframes bounce {0%, 100% { transform: translateY(0); }50% { transform: translateY(10px); }}
        @keyframes float {0%, 100% { transform: translateY(0px); }50% { transform: translateY(-10px); }}
        .animate-float {animation: float 3s ease-in-out infinite;}
        @keyframes shimmer {0% {background-position: -1000px 0;}100% {background-position: 1000px 0;}}
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* Hero Header */}
      <header className="relative text-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/30 to-transparent"></div>
        <div className="relative z-10">
          <div className="inline-block mb-4 px-8 py-2 bg-red-500/5 rounded-full border border-red-200/30">
            <h1 className="text-gray-800 text-sm tracking-[0.4em] font-light">
              CONTACT US
            </h1>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto mt-6 mb-8"></div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto px-4 leading-relaxed">
            Let's start a conversation about your vision. CENT’ANNI is here to design timeless spaces.
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </header>

      {/* Visit Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-8 py-2 bg-gradient-to-r from-red-500/10 via-red-500/5 to-red-500/10 rounded-full">
            <h2 className="text-red-400 text-lg tracking-[0.3em] font-light">
              VISIT US
            </h2>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Our Studio */}
          <div className="group relative bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-400"></div>
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative flex items-start gap-4">
              <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors duration-300">
                <MapPin className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold mb-3 text-lg">
                  Our Studio
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="font-medium text-gray-800">CENT’ANNI</span>
                  <br />
                  E-78, Sector-80, Noida
                  <br />
                  Uttar Pradesh, India
                  <br />
                  Architecture | Interior | Landscape | Urban Planning |
                  Exhibitions
                </p>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="group relative bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-400"></div>
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative flex items-start gap-4">
              <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors duration-300">
                <Clock className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800 font-semibold mb-4 text-lg">
                  Office Hours
                </h3>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-gray-600">{schedule.day}</span>
                      <span className="text-gray-800 font-semibold">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-8 py-2 bg-gradient-to-r from-red-500/10 via-red-500/5 to-red-500/10 rounded-full">
            <h2 className="text-red-400 text-lg tracking-[0.3em] font-light">
              QUICK CONTACT
            </h2>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Project Inquiries */}
          <div className="group relative bg-gradient-to-br from-white to-red-50/30 rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-400"></div>
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative">
              <h3 className="text-gray-800 font-semibold mb-6 text-lg flex items-center gap-2">
                Project Inquiries
                <ArrowRight className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform duration-300" />
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:design@centanni.in"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white transition-colors duration-300 group/item"
                >
                  <div className="p-2 bg-red-100 rounded-lg group-hover/item:bg-red-200 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-gray-700 text-sm group-hover/item:text-red-500 transition-colors duration-300">
                    designcentanni@gmail.com
                  </span>
                </a>
                <a
                  href="tel:+91-7303863399"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white transition-colors duration-300 group/item"
                >
                  <div className="p-2 bg-red-100 rounded-lg group-hover/item:bg-red-200 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-gray-700 text-sm group-hover/item:text-red-500 transition-colors duration-300">
                    +91-73038 63399
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* General Inquiries */}
          <div className="group relative bg-gradient-to-br from-white to-red-50/30 rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-400"></div>
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative">
              <h3 className="text-gray-800 font-semibold mb-6 text-lg flex items-center gap-2">
                General Inquiries
                <ArrowRight className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform duration-300" />
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:design@centanni.in"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white transition-colors duration-300 group/item"
                >
                  <div className="p-2 bg-red-100 rounded-lg group-hover/item:bg-red-200 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-gray-700 text-sm group-hover/item:text-red-500 transition-colors duration-300">
                    design@centanni.in
                  </span>
                </a>
                <a
                  href="tel:+91-7303863399"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white transition-colors duration-300 group/item"
                >
                  <div className="p-2 bg-red-100 rounded-lg group-hover/item:bg-red-200 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-gray-700 text-sm group-hover/item:text-red-500 transition-colors duration-300">
                    +91-73038 63399
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Send Message Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-8 py-2 bg-gradient-to-r from-red-500/10 via-red-500/5 to-red-500/10 rounded-full">
            <h2 className="text-red-400 text-lg tracking-[0.3em] font-light">
              SEND MESSAGE
            </h2>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl p-10 border border-gray-200 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-400"></div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-300 text-sm"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-300 text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-300 text-sm"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-300 text-sm"
                  >
                    <option value="">Select type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="mixed-use">Mixed Use</option>
                    <option value="interior">Interior Design</option>
                    <option value="landscape">Landscape</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-300 text-sm resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={handleSubmit}
                  className="group px-12 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold tracking-wider rounded-full hover:shadow-2xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  SEND MESSAGE
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 animate-fade-in">
        <div className="relative mb-12">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
          <h2 className="text-center text-red-400 text-sm tracking-[0.3em] font-light relative bg-white inline-block left-1/2 -translate-x-1/2 px-6">
            FIND US
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-2xl border border-gray-200">
          
          <iframe
            title="J.B.K. Architecture Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14163.188421790268!2d77.36729657142956!3d28.56092870888667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef590948edbf%3A0x7a9b12f8f0b3f193!2sSector%2078%2C%20Noida%2C%20Uttar%20Pradesh!5e1!3m2!1sen!2sin!4v1765563414799!5m2!1sen!2sin"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
