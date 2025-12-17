import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ArrowRight,
  MapPin,
  Calendar,
  Maximize2,
  Sparkles,
} from "lucide-react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const PROJECTS_PER_PAGE = 15;

  // ----------------------------
  // FETCH PROJECTS FROM BACKEND
  // ----------------------------
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/admin/project");
        console.log("Fetched Projects:", res.data);
        setProjects(res.data.projects || []);
      } catch (error) {
        console.log("Error loading projects", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  // ----------------------------
  // UPDATED FILTERS
  // ----------------------------
  const categories = [
    { id: "all", label: "All Projects" },
    { id: "architecture", label: "Architecture" },
    { id: "interiors", label: "Interiors" },
    { id: "landscapes", label: "Landscapes" },
    { id: "urban planning", label: "Urban Planning" },
    { id: "exhibitions", label: "Exhibitions" },
    { id: "competitions", label: "Competitions" },
    { id: "sketches", label: "Sketches" },
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
    <>
      <style>{`
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes bounceSlow { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-10px); } 
        }
        
        .animate-fade-in-up { 
          animation: fadeInUp 0.8s ease-out forwards; 
        }
        
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
      `}</style>

      <div className="bg-white text-gray-800 min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />

          {/* Animated background elements */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 left-20 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <div className="mb-6 overflow-hidden">
              <p className="text-sm tracking-[0.3em] text-red-600 font-medium uppercase animate-fade-in-up">
                OUR PORTFOLIO
              </p>
            </div>

            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight text-gray-900 animate-fade-in-up delay-100">
                Featured Projects
              </h1>
            </div>

            <div className="overflow-hidden">
              <p className="text-xl text-gray-600 mb-12 font-light max-w-2xl mx-auto animate-fade-in-up delay-200">
                Explore our collection of contemporary architecture, interior
                design, and innovative spatial solutions
              </p>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce-slow">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </section>

        {/* Filter Navigation */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium mb-2">
                FILTER BY CATEGORY
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 text-sm tracking-wide transition-all duration-300 rounded-full ${
                    activeFilter === category.id
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-red-600 hover:text-red-600 hover:shadow-md"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredProjects.length}
                </span>{" "}
                {activeFilter === "all"
                  ? "projects"
                  : `${activeFilter} projects`}
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-600">Loading projects...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No projects found in this category
                </p>
                <button
                  onClick={() => setActiveFilter("all")}
                  className="mt-4 px-6 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
                >
                  View All Projects
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProjects.map((project, index) => {
                  const rawUrl = project.images?.[0]?.url;
                  const firstImage = rawUrl
                    ? rawUrl.startsWith("http")
                      ? rawUrl
                      : `http://localhost:8080${rawUrl}`
                    : "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop";

                  const year = project.startDate
                    ? new Date(project.startDate).getFullYear()
                    : "----";

                  return (
                    <div
                      key={project._id}
                      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 animate-fade-in-up"
                      style={{
                        animationDelay: `${(index % 3) * 0.1}s`,
                        opacity: 0,
                      }}
                      onMouseEnter={() => setHoveredProject(project._id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => navigate(`/projects/${project._id}`)}
                    >
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={firstImage}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Dark gradient on bottom like reference */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                        {/* Category badge (top-left, solid red) */}
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-1 bg-red-600 text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-sm">
                            {project.type || "Project"}
                          </span>
                        </div>

                        {/* Expand / arrows icon (center) */}
                        <div
                          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                            hoveredProject === project._id
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-2"
                          }`}
                        >
                          <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                            <Maximize2 className="w-5 h-5 text-red-600" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-6 py-5">
                        {/* Title */}
                        <h3 className="text-xl font-semibold mb-2 text-red-600 group-hover:text-red-700 transition-colors duration-300">
                          {project.name}
                        </h3>

                        {/* Location + Year */}
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {project.location || "Location"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {year}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                          {project.description ||
                            "A contemporary residential masterpiece blending minimalist design with sustainable architecture."}
                        </p>

                        {/* View project */}
                        <button className="text-sm font-semibold text-red-600 flex items-center gap-2 uppercase tracking-wide group-hover:gap-3 transition-all duration-300">
                          VIEW PROJECT
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-600 hover:text-red-600 hover:shadow-md"
                  }`}
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-300 ${
                          currentPage === pageNum
                            ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                            : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-600 hover:text-red-600"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-600 hover:text-red-600 hover:shadow-md"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>

        
      </div>
    </>
  );
};

export default Projects;
