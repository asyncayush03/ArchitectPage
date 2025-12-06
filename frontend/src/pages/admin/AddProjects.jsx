import React, { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Upload,
  Trash2,
  Image as ImageIcon,
  FolderOpen,
  Building,
  DollarSign,
  Calendar,
  TrendingUp,
  Save,
  Loader,
  FileText,
  X,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProjects() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [project, setProject] = useState({
    name: "",
    client: "",
    type: "",
    budget: "",
    startDate: "",
    status: "",
    description: "",
    location: "",
    progress: 0,
  });

  const [images, setImages] = useState([]);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const updated = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      caption: "",
    }));

    setImages((prev) => [...prev, ...updated]);
  };

  // Handle caption update
  const updateCaption = (index, value) => {
    const updated = [...images];
    updated[index].caption = value;
    setImages(updated);
  };

  // Remove selected image
  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Project
  const submitProject = async (e) => {
    e.preventDefault();
    setSaving(true);

    const form = new FormData();

    // append project fields
    Object.keys(project).forEach((key) => {
      form.append(key, project[key]);
    });

    // append images + captions
    images.forEach((img) => {
      form.append("images", img.file);
      form.append("captions", img.caption);
    });

    try {
      const res = await axios.post("/api/v1/admin/project", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Project added successfully!");
      console.log("Project Added:", res.data);
      navigate("/admin/projects");
    } catch (error) {
      console.error("Error adding project:", error.response?.data || error);
      alert("Error adding project: " + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in-up { 
          animation: fadeInUp 0.6s ease-out forwards; 
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        
        {/* Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-12 px-4 sm:px-6 lg:px-8 mb-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative max-w-5xl mx-auto">
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
                      <Plus className="w-6 h-6" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-light tracking-tight">
                      Add New Project
                    </h1>
                  </div>
                  <p className="text-white/80 text-sm">
                    Create a new project with details and images
                  </p>
                </div>
              </div>

              <div className="hidden md:block float-animation">
                <FolderOpen className="w-20 h-20 opacity-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8 animate-fade-in-up">
            
            <form onSubmit={submitProject} className="space-y-6">
              
              {/* Basic Information Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-red-600" />
                  Basic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => setProject({ ...project, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                      placeholder="Enter project name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      value={project.client}
                      onChange={(e) => setProject({ ...project, client: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                      placeholder="Enter client name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type *
                    </label>
                    <select
                      value={project.type}
                      onChange={(e) => setProject({ ...project, type: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300 bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select Project Type</option>
                      <option value="architecture">Architecture</option>
                      <option value="interiors">Interiors</option>
                      <option value="landscapes">Landscapes</option>
                      <option value="urban planning">Urban Planning</option>
                      <option value="exhibitions">Exhibitions</option>
                      <option value="competitions">Competitions</option>
                      <option value="sketches">Sketches</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={project.location}
                      onChange={(e) => setProject({ ...project, location: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                      placeholder="Enter project location"
                    />
                  </div>
                </div>
              </div>

              {/* Financial & Timeline Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-red-600" />
                  Financial & Timeline
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget *
                    </label>
                    <input
                      type="text"
                      value={project.budget}
                      onChange={(e) => setProject({ ...project, budget: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                      placeholder="e.g., $500,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={project.startDate}
                      onChange={(e) => setProject({ ...project, startDate: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Progress (%)
                    </label>
                    <input
                      type="number"
                      value={project.progress}
                      onChange={(e) => setProject({ ...project, progress: e.target.value })}
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                      placeholder="0-100"
                    />
                  </div>
                </div>
              </div>

              {/* Status & Description Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                  Status & Description
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status *
                    </label>
                    <select
                      value={project.status}
                      onChange={(e) => setProject({ ...project, status: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300 bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select Status</option>
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) => setProject({ ...project, description: e.target.value })}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300 resize-none"
                      placeholder="Enter project description..."
                    />
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-red-600" />
                  Project Images
                </h2>

                {/* Upload Area */}
                <label className="block w-full py-12 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-red-500 transition-all duration-300 group">
                  <Upload className="mx-auto w-12 h-12 text-gray-400 group-hover:text-red-600 transition-colors duration-300" />
                  <p className="text-gray-600 mt-3 font-medium">Click to upload images</p>
                  <p className="text-gray-400 text-sm mt-1">Support: JPG, PNG, GIF (Max 10MB each)</p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>

                {/* Image Preview Grid */}
                {images.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-700 mb-4">
                      Uploaded Images ({images.length})
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className="relative bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-3 group"
                        >
                          {/* Image Preview */}
                          <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden mb-3">
                            <img
                              src={img.preview}
                              alt="preview"
                              className="w-full h-full object-cover"
                            />
                            {/* Delete Button */}
                            <button
                              onClick={() => deleteImage(index)}
                              type="button"
                              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700 hover:scale-110"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Caption Input */}
                          <input
                            type="text"
                            placeholder="Add caption (optional)"
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 transition-colors duration-300"
                            value={img.caption}
                            onChange={(e) => updateCaption(index, e.target.value)}
                          />

                          {/* Image Number */}
                          <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 text-white text-xs font-semibold rounded">
                            #{index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {saving ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Saving Project...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Project
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Fields marked with * are required. You can add multiple images and captions for each. Make sure all information is accurate before saving.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}