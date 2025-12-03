import React, { useState, useEffect } from "react";
import { ChevronDown, ArrowRight, MapPin, Calendar, Maximize2, Sparkles } from "lucide-react";
import axios from "axios";
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
        @keyframes slideInLeft { 
          from { opacity: 0; transform: translateX(-30px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        @keyframes bounceSlow { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-10px); } 
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .animate-fade-in-up { 
          animation: fadeInUp 0.8s ease-out forwards; 
        }
        .animate-slide-in-left { 
          animation: slideInLeft 0.8s ease-out forwards; 
        }
        .animate-bounce-slow { 
          animation: bounceSlow 2s ease-in-out infinite; 
        }
        
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
        
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      <div className="bg-white text-gray-800 min-h-screen">
        
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
          
          {/* Animated background elements */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
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
                Explore our collection of contemporary architecture, interior design, and innovative spatial solutions
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
              <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium mb-2">FILTER BY CATEGORY</p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 text-sm tracking-wide transition-all duration-300 ${
                    activeFilter === category.id
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-600 hover:text-red-600 hover:shadow-md"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{filteredProjects.length}</span> {activeFilter === "all" ? "projects" : `${activeFilter} projects`}
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
                <p className="text-gray-500 text-lg">No projects found in this category</p>
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
                  const firstImage = project.images?.[0]?.url
                    ? `http://localhost:8080${project.images[0].url}`
                    : "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop";

                  return (
                    <div
                      key={project._id}
                      className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                      style={{ animationDelay: `${(index % 3) * 0.1}s`, opacity: 0 }}
                      onMouseEnter={() => setHoveredProject(project._id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => navigate(`/projects/${project._id}`)}
                    >
                      <div className="relative overflow-hidden h-64">
                        <img
                          src={firstImage}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-red-600 text-white text-xs font-medium uppercase tracking-wider">
                            {project.type || "Project"}
                          </span>
                        </div>
                        
                        {/* Zoom Icon */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                          hoveredProject === project._id ? "opacity-100" : "opacity-0"
                        }`}>
                          <Maximize2 className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-medium mb-2 text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                          {project.name}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {project.location || "N/A"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {project.startDate ? new Date(project.startDate).getFullYear() : "----"}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                          {project.description || "Explore this exceptional project showcasing our commitment to design excellence."}
                        </p>
                        
                        <button className="text-red-600 font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300 hover:text-red-700">
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

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Have a Project in Mind?</h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Let's collaborate to bring your architectural vision to life. Our team is ready to create something exceptional.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button 
                onClick={() => navigate("/contact")}
                className="px-8 py-4 bg-white text-red-600 font-medium hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-2xl active:scale-95"
              >
                START A PROJECT
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate("/studio")}
                className="px-8 py-4 border-2 border-white text-white font-medium hover:bg-white hover:text-red-600 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                LEARN MORE
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;