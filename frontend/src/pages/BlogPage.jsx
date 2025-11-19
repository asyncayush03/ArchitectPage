import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, Calendar, ArrowRight } from "lucide-react";

const BlogPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeSection, setActiveSection] = useState("all");
  const [blogs, setBlogs] = useState([]);

  // Fetch Blogs
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await axios.get("/api/v1/admin/blog");
        const list = Array.isArray(res.data) ? res.data : res.data.blogs;
        setBlogs(list || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    loadBlogs();
  }, []);

  // Categories Map
  const categoryMap = {
    updates: "Latest Updates",
    design: "Design Philosophy",
    insight: "Industry Insights",
  };

  // Build sections dynamically using categories
  const sections = Object.keys(categoryMap).map((cat) => ({
    id: cat,
    title: categoryMap[cat],
    label: categoryMap[cat].toUpperCase(),
    color: cat === "design" ? "amber-400" : "red-400",
    cards: blogs.filter((b) => b.category?.toLowerCase() === cat),
  }));

  const filteredSections =
    activeSection === "all"
      ? sections
      : sections.filter((sec) => sec.id === activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">

      {/* Hero Header */}
      <header className="relative text-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/50 to-transparent"></div>
        <div className="relative z-10">
          <div className="inline-block mb-4 px-8 py-2 bg-gradient-to-r from-amber-500/10 via-red-500/10 to-amber-500/10 rounded-full">
            <h1 className="text-gray-800 text-sm tracking-[0.4em] font-light">BLOG</h1>
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

      {/* Category Filter Buttons */}
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
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-${section.color} to-transparent`}
              ></div>
              <h2
                className={`text-center text-${section.color} text-sm tracking-[0.3em] font-light relative bg-white inline-block left-1/2 -translate-x-1/2 px-6`}
              >
                {section.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {section.cards.length === 0 && (
                <p className="text-gray-500">No blogs available.</p>
              )}

              {section.cards.map((card, index) => {
                const isOpen = hoveredCard === `${section.id}-${index}`;

                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative h-80 sm:h-96 overflow-hidden">
                      <img
                        src={`http://localhost:8080${card.image}`}
                        alt={card.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                          isOpen
                            ? "scale-110 blur-md brightness-50"
                            : "group-hover:scale-110"
                        }`}
                      />

                      {/* Overlay */}
                      <div
                        className={`absolute inset-0 transition-all duration-700 z-10 ${
                          isOpen ? "bg-black/70" : "bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                        }`}
                      ></div>

                      {/* Content */}
                      <div
                        className={`absolute left-0 right-0 p-6 sm:p-8 text-white z-20 transition-all duration-700 overflow-y-auto ${
                          isOpen ? "top-0 h-full" : "bottom-0"
                        }`}
                      >
                        <h3 className="text-2xl sm:text-3xl font-light mb-3 tracking-wide group-hover:text-amber-400 transition-colors duration-300">
                          {card.title}
                        </h3>

                        <p className="text-sm text-gray-200 leading-relaxed mb-4">
                          {isOpen ? card.content : `${card.content.slice(0, 120)}...`}
                        </p>

                        {!isOpen && (
                          <div className="flex items-center gap-4 mb-3 text-xs text-gray-300">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(card.createdAt).toDateString()}</span>
                            </div>
                          </div>
                        )}

                        <div
                          className="flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-wide cursor-pointer mt-3"
                          onClick={() =>
                            setHoveredCard(isOpen ? null : `${section.id}-${index}`)
                          }
                        >
                          <span>{isOpen ? "CLOSE" : "READ MORE"}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
