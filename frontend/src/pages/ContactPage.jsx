import React, { useState } from "react";
import { ChevronDown, Mail, Phone, MapPin, Clock, Send, User, MessageSquare } from "lucide-react";

const ContactPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: ""
  });

  const contactCards = [
    {
      title: "Project Inquiries",
      subtitle: "New Projects & Consultations",
      email: "projects@jbkarchitecture.com",
      phone: "+91 22 1234 5678",
      color: "red-400",
      icon: <Mail className="w-6 h-6" />
    },
    {
      title: "Vendor Relations",
      subtitle: "Partnerships & Procurement",
      email: "vendors@jbkarchitecture.com",
      phone: "+91 22 1234 5679",
      color: "amber-400",
      icon: <Phone className="w-6 h-6" />
    },
    {
      title: "Careers",
      subtitle: "Join Our Team",
      email: "careers@jbkarchitecture.com",
      phone: "+91 22 1234 5680",
      color: "red-400",
      icon: <User className="w-6 h-6" />
    },
    {
      title: "PR & Media",
      subtitle: "Press & Collaborations",
      email: "pr@jbkarchitecture.com",
      phone: "+91 22 1234 5681",
      color: "amber-400",
      icon: <MessageSquare className="w-6 h-6" />
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
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
      `}</style>

      {/* Hero Header */}
      <header className="relative text-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/50 to-transparent"></div>
        <div className="relative z-10">
          <div className="inline-block mb-4 px-8 py-2 bg-gradient-to-r from-amber-500/10 via-red-500/10 to-amber-500/10 rounded-full">
            <h1 className="text-gray-800 text-sm tracking-[0.4em] font-light">
              CONTACT US
            </h1>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-6 mb-8"></div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto px-4 leading-relaxed">
            Let's start a conversation about your architectural vision. We're here to bring your ideas to life.
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </header>

      {/* Contact Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient accent on hover */}
              <div 
                className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-${card.color} to-transparent transition-all duration-500`}
                style={{
                  opacity: hoveredCard === index ? 1 : 0
                }}
              ></div>

              <div className="flex items-start gap-4">
                <div className={`text-${card.color} flex-shrink-0 mt-1 transform group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-gray-800 mb-1 text-lg group-hover:text-${card.color} transition-colors duration-300`}>
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-xs mb-4 tracking-wide">{card.subtitle}</p>
                  
                  <div className="space-y-2">
                    <a
                      href={`mailto:${card.email}`}
                      className="flex items-center gap-2 text-gray-700 text-sm hover:text-red-400 transition-colors duration-300"
                    >
                      <Mail className="w-4 h-4" />
                      {card.email}
                    </a>
                    <a
                      href={`tel:${card.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-gray-700 text-sm hover:text-red-400 transition-colors duration-300"
                    >
                      <Phone className="w-4 h-4" />
                      {card.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & Office Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-fade-in">
            <div className="relative mb-8">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-r from-red-400 to-transparent"></div>
              <h2 className="text-red-400 text-sm tracking-[0.3em] font-light pl-20">
                SEND MESSAGE
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm"
                >
                  <option value="">Select project type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="mixed-use">Mixed Use</option>
                  <option value="interior">Interior Design</option>
                  <option value="landscape">Landscape</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="group w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-red-400 to-amber-400 text-white text-xs font-semibold tracking-wider rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                SEND MESSAGE
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Office Info */}
          <div className="animate-fade-in">
            <div className="relative mb-8">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-r from-amber-400 to-transparent"></div>
              <h2 className="text-amber-400 text-sm tracking-[0.3em] font-light pl-20">
                VISIT US
              </h2>
            </div>

            <div className="bg-gradient-to-br from-gray-100 to-white rounded-lg p-8 border border-gray-200 shadow-lg mb-8">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-gray-800 font-semibold mb-2">Our Studio</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    J.B.K. Architecture<br />
                    123 Design Avenue, Architecture District<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <Clock className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-gray-800 font-semibold mb-3">Office Hours</h3>
                    <div className="space-y-2">
                      {officeHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{schedule.day}</span>
                          <span className="text-gray-800 font-medium">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
              <h3 className="text-gray-800 font-semibold mb-4 text-sm tracking-wider uppercase">
                Quick Contact
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:info@jbkarchitecture.com"
                  className="flex items-center gap-3 text-gray-700 hover:text-red-400 transition-colors duration-300 text-sm"
                >
                  <Mail className="w-5 h-5 text-amber-400" />
                  info@jbkarchitecture.com
                </a>
                <a
                  href="tel:+912212345678"
                  className="flex items-center gap-3 text-gray-700 hover:text-red-400 transition-colors duration-300 text-sm"
                >
                  <Phone className="w-5 h-5 text-amber-400" />
                  +91 (22) 1234-5678
                </a>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.901253327179!2d-73.9796811845949!3d40.764356079326774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f4b3cb8e4b%3A0x705bf1b6e1a4a4a9!2sCentral%20Park!5e0!3m2!1sen!2sus!4v1682961928769!5m2!1sen!2sus"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Footer CTA
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 animate-fade-in">
        <div className="relative p-12 sm:p-16 rounded-lg bg-gradient-to-br from-gray-100 to-white border border-gray-200 shadow-xl overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200/30 to-red-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-800 mb-4 tracking-wide">
              Ready to Begin?
            </h3>
            <p className="text-gray-600 text-sm mb-8 max-w-xl mx-auto leading-relaxed">
              Schedule a consultation with our team to discuss your architectural project and vision
            </p>
            <a
              href="tel:+912212345678"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-400 to-amber-400 text-white text-xs font-semibold tracking-wider rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              CALL US NOW
            </a>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="text-center py-16 text-gray-500 text-sm border-t border-gray-200">
        <h3 className="text-lg font-light text-gray-800 mb-2 tracking-wide">
          J.B.K. Architecture
        </h3>
        <p className="text-xs tracking-wider">
          Creating spaces that inspire
        </p>
        <p className="mt-4 text-xs">
          © 2025 J.B.K. Architecture — All Rights Reserved
        </p>
      </footer> */}
    </div>
  );
};

export default ContactPage;