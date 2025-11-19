import React, { useState, useEffect } from "react";
import { ChevronDown, ArrowRight, MapPin, Calendar, Maximize2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PROJECTS_PER_PAGE = 15;
 // ----------------------------
// FETCH PROJECTS FROM BACKEND
// ----------------------------
useEffect(() => {
  const loadProjects = async () => {
    try {
      const res = await axios.get("/api/v1/admin/project");  // ✅ FIXED PATH
      console.log("Fetched Projects:", res.data);

      setProjects(res.data.projects || []);
    } catch (error) {
      console.log("Error loading projects", error);
    }
  };

  loadProjects();
}, []);

useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  // ----------------------------
  // FILTERS
  // ----------------------------
  const categories = [
    { id: "all", label: "All Projects" },
    { id: "interiors", label: "Interiors" },
    { id: "architecture", label: "Architecture" },
    { id: "commercial", label: "Commercial" },
    { id: "product", label: "Product Design" },
  ];

   const filteredProjects =
  activeFilter === "all"
    ? projects
    : projects.filter((p) => p.type?.toLowerCase() === activeFilter);


  const indexOfLast = currentPage * PROJECTS_PER_PAGE;
  const indexOfFirst = indexOfLast - PROJECTS_PER_PAGE;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
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
         {currentProjects.map((project, index) => {
            const firstImage = project.images?.[0]?.url
              ? `http://localhost:8080${project.images[0].url}`
              : "https://via.placeholder.com/800x600?text=No+Image";

            return (
              <div
                key={project._id}
                className={`group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:shadow-2xl transition-all duration-500 animate-fade-in stagger-${
                  (index % 3) + 1
                }`}
                onMouseEnter={() => setHoveredProject(project._id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => navigate(`/projects/${project._id}`)}
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={firstImage}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Category */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-1 text-xs font-semibold text-gray-800 tracking-wide uppercase">
                      {project.type || "Project"}
                    </div>
                  </div>

                  {/* Zoom icon */}
                  <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <Maximize2 className="w-5 h-5 text-gray-800" />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-500 z-10"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                    <h3 className="text-xl font-light mb-2 tracking-wide group-hover:text-amber-400 transition-colors duration-300">
                      {project.name}
                    </h3>

                    <div className="flex items-center gap-4 mb-3 text-xs text-gray-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{project.location || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {project.startDate
                            ? new Date(project.startDate).getFullYear()
                            : "----"}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-200 leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {project.description?.slice(0, 100)}...
                    </p>

                    <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span>VIEW PROJECT</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No projects found in this category.
          </p>
        )}

        {/* PAGINATION BUTTONS */}
{totalPages > 1 && (
  <div className="flex justify-center items-center gap-4 mt-16">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
      className={`px-5 py-2 text-sm rounded-lg border ${
        currentPage === 1
          ? "bg-gray-200 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      Previous
    </button>

    <span className="text-gray-700 text-sm">
      Page {currentPage} of {totalPages}
    </span>

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => p + 1)}
      className={`px-5 py-2 text-sm rounded-lg border ${
        currentPage === totalPages
          ? "bg-gray-200 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      Next
    </button>
  </div>
)}

      </section>
    </div>
  );
};

export default Projects;
