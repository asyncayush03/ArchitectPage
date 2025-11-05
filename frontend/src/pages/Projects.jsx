import React, { useState } from "react";
import { ChevronDown, ArrowRight, MapPin, Calendar, Maximize2 } from "lucide-react";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "interiors", label: "Interiors" },
    { id: "architecture", label: "Architecture" },
    { id: "commercial", label: "Commercial" },
    { id: "product", label: "Product Design" },
  ];

  const projects = [
    {
      id: 1,
      title: "Modern Villa Residence",
      category: "architecture",
      location: "Mumbai, India",
      year: "2024",
      area: "5,000 sq ft",
      desc: "A contemporary residential masterpiece blending minimalist design with sustainable architecture.",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title: "Luxury Penthouse Interior",
      category: "interiors",
      location: "Delhi, India",
      year: "2024",
      area: "3,500 sq ft",
      desc: "Sophisticated interior design featuring bespoke furniture and elegant material palette.",
      img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: "Corporate Headquarters",
      category: "commercial",
      location: "Bangalore, India",
      year: "2024",
      area: "25,000 sq ft",
      desc: "Dynamic office space designed to foster collaboration and innovation in the tech industry.",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      title: "Custom Furniture Collection",
      category: "product",
      location: "Studio Design",
      year: "2024",
      area: "Collection",
      desc: "Handcrafted furniture pieces combining traditional craftsmanship with modern aesthetics.",
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 5,
      title: "Boutique Hotel Design",
      category: "interiors",
      location: "Goa, India",
      year: "2023",
      area: "15,000 sq ft",
      desc: "Coastal-inspired interiors creating a tranquil retreat experience for discerning travelers.",
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 6,
      title: "Urban Mixed-Use Complex",
      category: "architecture",
      location: "Pune, India",
      year: "2023",
      area: "50,000 sq ft",
      desc: "Innovative mixed-use development integrating residential, retail, and public spaces.",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 7,
      title: "Retail Flagship Store",
      category: "commercial",
      location: "Mumbai, India",
      year: "2023",
      area: "8,000 sq ft",
      desc: "Brand-focused retail environment with striking visual merchandising and customer flow.",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 8,
      title: "Lighting Design Series",
      category: "product",
      location: "Studio Design",
      year: "2023",
      area: "Collection",
      desc: "Sculptural lighting fixtures that blur the line between art and functional design.",
      img: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 9,
      title: "Heritage Home Restoration",
      category: "architecture",
      location: "Jaipur, India",
      year: "2023",
      area: "7,500 sq ft",
      desc: "Careful restoration preserving historical character while introducing modern amenities.",
      img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 10,
      title: "Contemporary Apartment",
      category: "interiors",
      location: "Hyderabad, India",
      year: "2023",
      area: "2,800 sq ft",
      desc: "Open-plan living space with carefully curated art and custom millwork throughout.",
      img: "https://images.unsplash.com/photo-1502672260066-6bc35f0a9e06?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 11,
      title: "Innovation Center",
      category: "commercial",
      location: "Chennai, India",
      year: "2022",
      area: "35,000 sq ft",
      desc: "Flexible workspace designed for startups and creative enterprises with shared amenities.",
      img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 12,
      title: "Modular Shelving System",
      category: "product",
      location: "Studio Design",
      year: "2022",
      area: "Collection",
      desc: "Versatile storage solution with endless configurations for residential and commercial use.",
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <style>{`
        * {-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}
        body {overflow-x: hidden;}
        @keyframes fade-in {from {opacity: 0;transform: translateY(20px);}to {opacity: 1;transform: translateY(0);}}
        .animate-fade-in {animation: fade-in 0.8s ease-out;will-change: opacity, transform;}
        .scroll-indicator {animation: bounce 2s infinite;}
        @keyframes bounce {0%, 100% { transform: translateY(0); }50% { transform: translateY(10px); }}
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
      `}</style>

      {/* Hero Header */}
      <header className="relative text-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/50 to-transparent"></div>
        <div className="relative z-10">
          <div className="inline-block mb-4 px-8 py-2 bg-gradient-to-r from-amber-500/10 via-red-500/10 to-amber-500/10 rounded-full">
            <h1 className="text-gray-800 text-sm tracking-[0.4em] font-light">
              PROJECTS
            </h1>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-6 mb-8"></div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto px-4 leading-relaxed">
            Explore our portfolio of contemporary architecture, interior design, commercial spaces, and bespoke product collections
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </header>

      {/* Filter Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 text-xs tracking-wider font-light rounded-full transition-all duration-300 ${
                activeFilter === category.id
                  ? "bg-gradient-to-r from-red-400 to-amber-400 text-white shadow-lg"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-gray-800"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:shadow-2xl transition-all duration-500 animate-fade-in stagger-${(index % 3) + 1}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-1 text-xs font-semibold text-gray-800 tracking-wide uppercase">
                    {project.category}
                  </div>
                </div>

                {/* Zoom Icon on Hover */}
                <div 
                  className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300"
                >
                  <Maximize2 className="w-5 h-5 text-gray-800" />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-500 z-10"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                  <h3 className="text-xl font-light mb-2 tracking-wide group-hover:text-amber-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-3 text-xs text-gray-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 mb-1">
                    {project.area}
                  </p>
                  
                  <p className="text-sm text-gray-200 leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {project.desc}
                  </p>

                  {/* View Project Link */}
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>VIEW PROJECT</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-400 to-amber-400 text-white text-xs font-semibold tracking-wider rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            LOAD MORE PROJECTS
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="relative mb-12">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
          <h2 className="text-center text-red-400 text-sm tracking-[0.3em] font-light relative bg-white inline-block left-1/2 -translate-x-1/2 px-6">
            OUR EXPERTISE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group p-8 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-amber-200 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-400/20 to-amber-400/20 rounded-full flex items-center justify-center text-2xl font-light text-gray-800 group-hover:scale-110 transition-transform duration-300">
              I
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-base group-hover:text-amber-600 transition-colors">
              Interiors
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sophisticated residential and hospitality interiors
            </p>
          </div>

          <div className="group p-8 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-amber-200 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-400/20 to-amber-400/20 rounded-full flex items-center justify-center text-2xl font-light text-gray-800 group-hover:scale-110 transition-transform duration-300">
              A
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-base group-hover:text-amber-600 transition-colors">
              Architecture
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Contemporary structures and sustainable design
            </p>
          </div>

          <div className="group p-8 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-amber-200 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-400/20 to-amber-400/20 rounded-full flex items-center justify-center text-2xl font-light text-gray-800 group-hover:scale-110 transition-transform duration-300">
              C
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-base group-hover:text-amber-600 transition-colors">
              Commercial
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Corporate offices and retail environments
            </p>
          </div>

          <div className="group p-8 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-amber-200 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-400/20 to-amber-400/20 rounded-full flex items-center justify-center text-2xl font-light text-gray-800 group-hover:scale-110 transition-transform duration-300">
              P
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-base group-hover:text-amber-600 transition-colors">
              Product Design
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Custom furniture and lighting collections
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="relative p-12 sm:p-16 rounded-lg bg-gradient-to-br from-gray-100 to-white border border-gray-200 shadow-xl overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200/30 to-red-200/30 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-800 mb-4 tracking-wide">
              Have a Project in Mind?
            </h3>
            <p className="text-gray-600 text-sm mb-8 max-w-xl mx-auto leading-relaxed">
              Let's collaborate to create something exceptional. Get in touch to discuss your vision.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-400 to-amber-400 text-white text-xs font-semibold tracking-wider rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              START A PROJECT
              <ArrowRight className="w-4 h-4" />
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
          Creating timeless spaces
        </p>
        <p className="mt-4 text-xs">
          © 2025 J.B.K. Architecture — All Rights Reserved
        </p>
      </footer> */}
    </div>
  );
};

export default Projects;