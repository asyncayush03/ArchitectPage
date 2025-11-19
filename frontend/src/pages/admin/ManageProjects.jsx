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
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ManageProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ---------------------------------------------------
  // FETCH PROJECTS  (/api/v1/admin/project)
  // ---------------------------------------------------
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await axios.get("/api/v1/admin/project");
        console.log("Fetched Projects:", res.data);
        setProjects(res.data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    loadProjects();
  }, []);

  // ---------------------------------------------------
  // DELETE PROJECT
  // ---------------------------------------------------
  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await axios.delete(`/api/v1/admin/project/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      alert("Project deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete project.");
    }
  };

  // ---------------------------------------------------
  // SEARCH
  // ---------------------------------------------------
  const filteredProjects = projects.filter((proj) => {
    const q = searchQuery.toLowerCase();
    return (
      proj.name?.toLowerCase().includes(q) ||
      proj.client?.toLowerCase().includes(q) ||
      proj.type?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-100">
      {/* Page Header */}
      <div className="relative h-48 overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-600"></div>

        <div className="relative h-full flex items-center justify-between max-w-7xl mx-auto px-6 text-white">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <div>
              <h2 className="text-4xl font-bold mb-1">Manage Projects</h2>
              <p className="text-emerald-100">Add, edit & manage projects</p>
            </div>
          </div>

          <FolderOpen className="w-20 h-20 opacity-30" />
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Toolbar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 border border-stone-100">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 flex gap-3 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button className="p-3 border border-stone-200 rounded-xl hover:bg-stone-50 transition">
                <Filter className="w-5 h-5 text-stone-600" />
              </button>
            </div>

            {/* Add new project */}
            <Link
              to="/admin/projects/new"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add New Project
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">Total Projects</p>
            <p className="text-3xl font-bold text-stone-800">
              {projects.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">
              {projects.filter((p) => p.status === "In Progress").length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">Completed</p>
            <p className="text-3xl font-bold text-emerald-600">
              {projects.filter((p) => p.status === "Completed").length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">Planning</p>
            <p className="text-3xl font-bold text-amber-600">
              {projects.filter((p) => p.status === "Planning").length}
            </p>
          </div>
        </div>

        {/* Project List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-stone-100 group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon */}
                <div className="w-full md:w-48 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <FolderOpen className="w-12 h-12 text-white opacity-50" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-stone-800 mb-1 group-hover:text-emerald-600 transition">
                        {project.name}
                      </h3>

                      <p className="text-stone-500 text-sm">
                        Client: {project.client}
                      </p>
                      <p className="text-stone-400 text-xs mt-1">
                        {project.description}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : project.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Row info */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-stone-500 flex items-center gap-1">
                        <Building className="w-3 h-3" /> Type
                      </p>
                      <p className="text-sm font-semibold text-stone-700">
                        {project.type}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-stone-500 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" /> Budget
                      </p>
                      <p className="text-sm font-semibold text-stone-700">
                        {project.budget}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-stone-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Start Date
                      </p>
                      <p className="text-sm font-semibold text-stone-700">
                        {project.startDate}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {project.progress !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-stone-600">Progress</span>
                        <span className="text-sm font-semibold text-emerald-600">
                          {project.progress}%
                        </span>
                      </div>

                      <div className="w-full bg-stone-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/projects/${project._id}`)}
                      className="flex-1 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition text-sm"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/admin/projects/edit/${project._id}`)
                      }
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => deleteProject(project._id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
