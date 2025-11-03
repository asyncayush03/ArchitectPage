import React, { useState } from "react";
import { ChevronDown, Calendar, Clock, ArrowRight } from "lucide-react";

const BlogPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeSection, setActiveSection] = useState("all");

  const sections = [
    {
      id: "updates",
      title: "Latest Updates",
      label: "UPDATES",
      color: "red-400",
      cards: [
        {
          title: "Sustainable Architecture 2025",
          desc: "Exploring eco-friendly design principles and green building innovations shaping the future of construction.",
          img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1000&q=80",
          date: "March 15, 2025",
          readTime: "5 min read",
          category: "Sustainability"
        },
        {
          title: "Studio Expansion",
          desc: "J.B.K. Architecture opens new design center, expanding our capabilities in contemporary architecture.",
          img: "https://images.unsplash.com/photo-1556767576-cfba2b6b8af9?auto=format&fit=crop&w=1000&q=80",
          date: "March 10, 2025",
          readTime: "3 min read",
          category: "Company News"
        },
      ],
    },
    {
      id: "design",
      title: "Design Philosophy",
      label: "DESIGN",
      color: "amber-400",
      cards: [
        {
          title: "Minimalist Contemporary",
          desc: "The art of creating sophisticated spaces through simplicity and thoughtful material selection.",
          img: "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1000&q=80",
          date: "March 8, 2025",
          readTime: "6 min read",
          category: "Design Theory"
        },
        {
          title: "Heritage Meets Modern",
          desc: "Balancing traditional architectural elements with contemporary design for timeless structures.",
          img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
          date: "March 5, 2025",
          readTime: "7 min read",
          category: "Case Study"
        },
      ],
    },
    {
      id: "trending",
      title: "Industry Insights",
      label: "INSIGHTS",
      color: "red-400",
      cards: [
        {
          title: "Smart Building Technology",
          desc: "How IoT and automation are revolutionizing architectural design and building management.",
          img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
          date: "March 1, 2025",
          readTime: "8 min read",
          category: "Technology"
        },
        {
          title: "Future of Urban Planning",
          desc: "Exploring master planning strategies for sustainable, livable cities in the coming decades.",
          img: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=1000&q=80",
          date: "February 28, 2025",
          readTime: "6 min read",
          category: "Urban Design"
        },
      ],
    },
  ];

  const filteredSections = activeSection === "all" 
    ? sections 
    : sections.filter(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <style>{`
        * {-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}
        body {overflow-x: hidden;}
        @keyframes fade-in {from {opacity: 0;transform: translateY(20px);}to {opacity: 1;transform: translateY(0);}}
        .animate-fade-in {animation: fade-in 0.8s ease-out;will-change: opacity, transform;}
        .scroll-indicator {animation: bounce 2s infinite;}
        @keyframes bounce {0%, 100% { transform: translateY(0); }50% { transform: translateY(10px); }}
      `}</style>

      {/* Hero Header */}
      <header className="relative text-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/50 to-transparent"></div>
        <div className="relative z-10">
          <div className="inline-block mb-4 px-8 py-2 bg-gradient-to-r from-amber-500/10 via-red-500/10 to-amber-500/10 rounded-full">
            <h1 className="text-gray-800 text-sm tracking-[0.4em] font-light">
              BLOG
            </h1>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-6 mb-8"></div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto px-4 leading-relaxed">
            Insights, innovations, and inspiration from the world of contemporary architecture
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </header>

      {/* Navigation Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
        <button
          onClick={() => setActiveSection("all")}
          className={`px-6 py-2 text-xs tracking-wider font-light rounded-full transition-all duration-300 ${
            activeSection === "all"
              ? "bg-gradient-to-r from-red-400 to-amber-400 text-white shadow-lg"
              : "bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-gray-800"
          }`}
        >
          ALL POSTS
        </button>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-6 py-2 text-xs tracking-wider font-light rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? "bg-gradient-to-r from-red-400 to-amber-400 text-white shadow-lg"
                : "bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-gray-800"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Blog Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredSections.map((section, sectionIdx) => (
          <section 
            key={section.id} 
            id={section.id} 
            className="mb-24 animate-fade-in"
            style={{ animationDelay: `${sectionIdx * 0.1}s` }}
          >
            <div className="relative mb-12">
              <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-${section.color} to-transparent`}></div>
              <h2 className={`text-center text-${section.color} text-sm tracking-[0.3em] font-light relative bg-white inline-block left-1/2 -translate-x-1/2 px-6`}>
                {section.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {section.cards.map((card, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:shadow-2xl transition-all duration-500"
                  onMouseEnter={() => setHoveredCard(`${section.id}-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image Container */}
                  <div className="relative h-80 sm:h-96 overflow-hidden">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-1 text-xs font-semibold text-gray-800 tracking-wide">
                        {card.category}
                      </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-500 z-10"></div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white z-20">
                      <div className="flex items-center gap-4 mb-3 text-xs text-gray-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{card.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{card.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl font-light mb-3 tracking-wide group-hover:text-amber-400 transition-colors duration-300">
                        {card.title}
                      </h3>
                      
                      <p className="text-sm text-gray-200 leading-relaxed mb-4 max-w-md">
                        {card.desc}
                      </p>

                      {/* Read More Link */}
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span>READ MORE</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Featured Section - Newsletter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 mt-32">
        <div className="relative p-12 sm:p-16 rounded-lg bg-gradient-to-br from-gray-100 to-white border border-gray-200 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200/30 to-red-200/30 rounded-full blur-3xl"></div>
          <div className="relative z-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-800 mb-4 tracking-wide">
              Stay Updated
            </h3>
            <p className="text-gray-600 text-sm mb-8 max-w-xl mx-auto leading-relaxed">
              Subscribe to receive insights on contemporary architecture, design philosophy, and our latest projects
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-amber-400 text-sm transition-all duration-300"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-red-400 to-amber-400 text-white rounded-full text-xs font-semibold tracking-wider hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-16 text-gray-500 text-sm border-t border-gray-200">
        <h3 className="text-lg font-light text-gray-800 mb-2 tracking-wide">
          J.B.K. Architecture
        </h3>
        <p className="text-xs tracking-wider">
          Inspiring design, sustainable innovation
        </p>
        <p className="mt-4 text-xs">
          © 2025 J.B.K. Architecture — All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default BlogPage;