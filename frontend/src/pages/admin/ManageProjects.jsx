import React, { useState, useEffect } from "react";
import {
  FolderOpen,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Building,
  MapPin,
  TrendingUp,
  Clock,
  AlertCircle,
  Sparkles,
  Eye,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

export default function ManageProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  // ---------------------------------------------------
  // FETCH PROJECTS
  // ---------------------------------------------------
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/admin/project");
        console.log("Fetched Projects:", res.data);
        setProjects(res.data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // ---------------------------------------------------
  // DELETE PROJECT
  // ---------------------------------------------------
  const deleteProject = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    )
      return;

    try {
      await axios.delete(`/api/v1/admin/project/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete project.");
    }
  };

  // ---------------------------------------------------
  // FILTER & SEARCH
  // ---------------------------------------------------
  const filteredProjects = projects.filter((proj) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      proj.name?.toLowerCase().includes(q) ||
      proj.client?.toLowerCase().includes(q) ||
      proj.type?.toLowerCase().includes(q);

    const matchesStatus = filterStatus === "all" || proj.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "In Progress").length,
    completed: projects.filter((p) => p.status === "Completed").length,
    planning: projects.filter((p) => p.status === "Planning").length,
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes slideIn { 
          from { opacity: 0; transform: translateX(-20px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in-up { 
          animation: fadeInUp 0.6s ease-out forwards; 
        }
        .animate-slide-in { 
          animation: slideIn 0.6s ease-out forwards; 
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-16 px-4 sm:px-6 lg:px-8 mb-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 animate-fade-in-up">
                <button
                  onClick={() => navigate(-1)}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm hover:scale-110 active:scale-95"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <FolderOpen className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight">
                      Manage Projects
                    </h1>
                  </div>
                  <p className="text-white/80 text-sm">
                    Add, edit & manage your project portfolio
                  </p>
                </div>
              </div>

              <div className="hidden md:block float-animation">
                <FolderOpen className="w-24 h-24 opacity-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Search & Filter Toolbar */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100 animate-fade-in-up delay-100">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects by name, client, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                />
              </div>

              {/* Status Filter */}
              <div className="relative min-w-[200px]">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300 bg-white appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Add New Button */}
              <Link
                to="/admin/projects/new"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                Add New Project
              </Link>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredProjects.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {projects.length}
                </span>{" "}
                projects
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-red-500 group cursor-pointer animate-fade-in-up delay-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-50 group-hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <FolderOpen className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Projects</p>
              <p className="text-3xl font-light text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                {stats.total}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-500 group cursor-pointer animate-fade-in-up delay-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Clock className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">In Progress</p>
              <p className="text-3xl font-light text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {stats.inProgress}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-green-500 group cursor-pointer animate-fade-in-up delay-400">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 group-hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Sparkles className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Done
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-3xl font-light text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                {stats.completed}
              </p>
            </div>

            <div
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-amber-500 group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: "0.5s", opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-50 group-hover:bg-amber-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <AlertCircle className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                  New
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Planning</p>
              <p className="text-3xl font-light text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                {stats.planning}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Loading projects...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No Projects Found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first project"}
              </p>
              {searchQuery || filterStatus !== "all" ? (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterStatus("all");
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                  Clear Filters
                </button>
              ) : (
                <Link
                  to="/admin/projects/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Create First Project
                </Link>
              )}
            </div>
          )}

          {/* Projects List */}
          {!loading && filteredProjects.length > 0 && (
            <div className="grid gap-6">
              {filteredProjects.map((project, index) => {
                const rawUrl = project.images?.[0]?.url;
                const API_BASE_URL = import.meta.env.VITE_API_URL;
                const firstImage = rawUrl
                
  ? rawUrl.startsWith("http")
    ? rawUrl
    : `${API_BASE_URL}${rawUrl}`
  : null;

                return (
                  <div
                    key={project._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group animate-slide-in"
                    style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                  >
                    <div className="flex flex-col lg:flex-row gap-6 p-6">
                      {/* Project Thumbnail */}
                      <div className="w-full lg:w-56 h-48 lg:h-40 rounded-lg overflow-hidden flex-shrink-0">
                        {firstImage ? (
                          <img
                            src={firstImage}
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
                            <FolderOpen className="w-16 h-16 text-white opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                          <div className="flex-1">
                            <h3 className="text-2xl font-medium text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                              {project.name}
                            </h3>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                <Building className="w-4 h-4 text-red-600" />
                                {project.client || "N/A"}
                              </span>
                              {project.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4 text-red-600" />
                                  {project.location}
                                </span>
                              )}
                            </div>

                            <p className="text-gray-600 text-sm line-clamp-2">
                              {project.description || "No description available"}
                            </p>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                              project.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : project.status === "In Progress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {project.status || "Unknown"}
                          </span>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                              <Building className="w-3 h-3" /> Type
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {project.type || "N/A"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                              <Building className="w-3 h-3" /> Area (Sq.ft)
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {project.area || "N/A"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                              <Calendar className="w-3 h-3" /> Start Date
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {project.startDate
                                ? new Date(
                                    project.startDate
                                  ).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        {project.progress !== undefined && (
                          <div className="mb-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-600 font-medium">
                                Progress
                              </span>
                              <span className="text-sm font-semibold text-red-600">
                                {project.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-red-500 to-red-700 h-full rounded-full transition-all duration-1000"
                                style={{ width: `${project.progress || 0}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => navigate(`/projects/${project._id}`)}
                            className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 text-sm font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>

                          <button
                            onClick={() =>
                              navigate(`/admin/projects/edit/${project._id}`)
                            }
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm font-medium"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>

                          <button
                            onClick={() => deleteProject(project._id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 text-sm font-medium group/btn"
                          >
                            <Trash2 className="w-4 h-4 group-hover/btn:animate-pulse" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
