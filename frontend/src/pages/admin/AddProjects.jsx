import React, { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Upload,
  Loader,
  Image as ImageIcon,
  FolderOpen,
  Building,
  DollarSign,
  TrendingUp,
  Save,
  X,
} from "lucide-react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function AddProjects() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [project, setProject] = useState({
    name: "",
    client: "",
    type: "",
    area: "",
    startDate: "",
    status: "",
    description: "",
    location: "",
    progress: "", // EMPTY DEFAULT

    additionalFeatures: [{ key: "", value: "" }],
  });

  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const updated = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      caption: "",
    }));

    setImages((prev) => [...prev, ...updated]);
  };

  const updateCaption = (index, value) => {
    const updated = [...images];
    updated[index].caption = value;
    setImages(updated);
  };

  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    setProject({
      ...project,
      additionalFeatures: [
        ...project.additionalFeatures,
        { key: "", value: "" },
      ],
    });
  };

  const updateFeature = (index, field, value) => {
    const updated = [...project.additionalFeatures];
    updated[index][field] = value;
    setProject({ ...project, additionalFeatures: updated });
  };

  const deleteFeature = (index) => {
    setProject({
      ...project,
      additionalFeatures: project.additionalFeatures.filter(
        (_, i) => i !== index
      ),
    });
  };

  const submitProject = async (e) => {
    e.preventDefault();
    setSaving(true);

    const form = new FormData();

    Object.keys(project).forEach((key) => {
      if (key !== "additionalFeatures") {
        form.append(key, project[key]);
      }
    });

    project.additionalFeatures.forEach((feat) => {
      form.append("feature_keys", feat.key);
      form.append("feature_values", feat.value);
    });

    images.forEach((img) => {
      form.append("images", img.file);
      form.append("captions", img.caption);
    });

    try {
      const res = await axios.post("/api/v1/admin/project", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Project added successfully!");
      navigate("/admin/projects");
    } catch (error) {
      alert(
        "Error adding project: " +
          (error.response?.data?.message || error.message)
      );
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
        .input {
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          width: 100%;
          transition: 0.3s;
        }
        .input:focus {
          outline: none;
          border-color: #dc2626;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* HEADER */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-12 px-4 sm:px-6 lg:px-8 mb-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative max-w-5xl mx-auto animate-fade-in-up">
            <div className="flex items-center gap-6">
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
                  Create a new project with details, images & features
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8 animate-fade-in-up">
            <form onSubmit={submitProject} className="space-y-8">
              {/* BASIC INFO */}
              <div className="border-b pb-6">
                <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                  <Building className="w-5 h-5 text-red-600" /> Basic
                  Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    className="input"
                    placeholder="Project Name *"
                    required
                    value={project.name}
                    onChange={(e) =>
                      setProject({ ...project, name: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    className="input"
                    placeholder="Client Name *"
                    required
                    value={project.client}
                    onChange={(e) =>
                      setProject({ ...project, client: e.target.value })
                    }
                  />

                  <select
                    className="input"
                    required
                    value={project.type}
                    onChange={(e) =>
                      setProject({ ...project, type: e.target.value })
                    }
                  >
                    <option value="">Select Project Type</option>

                    <option value="Architecture">Architecture</option>
                    <option value="Interiors">Interiors</option>
                    <option value="Landscapes">Landscapes</option>
                    <option value="Urban Planning">Urban Planning</option>
                    <option value="Exhibitions">Exhibitions</option>
                    <option value="Competitions">Competitions</option>
                    <option value="Sketches">Sketches</option>
                    <option value="EPC">E.P.C</option>
                  </select>

                  <input
                    type="text"
                    className="input"
                    placeholder="Location"
                    value={project.location}
                    onChange={(e) =>
                      setProject({ ...project, location: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* AREA, DATE, PROGRESS */}
              <div className="border-b pb-6">
                <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-red-600" /> Area &
                  Timeline
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input
                    type="text"
                    className="input"
                    placeholder="Area (sq ft) *"
                    required
                    value={project.area}
                    onChange={(e) =>
                      setProject({ ...project, area: e.target.value })
                    }
                  />

                  <input
                    type="date"
                    className="input"
                    required
                    value={project.startDate}
                    onChange={(e) =>
                      setProject({ ...project, startDate: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    className="input"
                    placeholder="Progress %"
                    min="0"
                    max="100"
                    value={project.progress}
                    onChange={(e) => {
                      let value = Number(e.target.value);

                      if (value < 0) value = 0;
                      if (value > 100) value = 100;

                      setProject({
                        ...project,
                        progress: value,
                        status: value === 100 ? "Completed" : project.status,
                      });
                    }}
                  />
                </div>
              </div>

              {/* STATUS + DESCRIPTION */}
              <div className="border-b pb-6">
                <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-red-600" /> Status &
                  Description
                </h2>

                <select
                  className="input"
                  required
                  value={project.status}
                  onChange={(e) =>
                    setProject({ ...project, status: e.target.value })
                  }
                >
                  <option value="">Select Status</option>
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <textarea
                  rows="6"
                  className="input mt-4"
                  placeholder="Project description *"
                  required
                  value={project.description}
                  onChange={(e) =>
                    setProject({ ...project, description: e.target.value })
                  }
                />
              </div>

              {/* ADDITIONAL FEATURES */}
              <div className="border-b pb-6">
                <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                  <Plus className="w-5 h-5 text-red-600" /> Additional Features
                </h2>

                {project.additionalFeatures.map((feat, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative"
                  >
                    <input
                      type="text"
                      className="input"
                      placeholder="Feature Title (Key)"
                      value={feat.key}
                      onChange={(e) =>
                        updateFeature(index, "key", e.target.value)
                      }
                    />

                    <input
                      type="text"
                      className="input"
                      placeholder="Feature Description (Value)"
                      value={feat.value}
                      onChange={(e) =>
                        updateFeature(index, "value", e.target.value)
                      }
                    />

                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => deleteFeature(index)}
                        className="absolute -right-3 -top-3 bg-red-600 text-white p-2 rounded-full"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addFeature}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg"
                >
                  + Add More
                </button>
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                  <ImageIcon className="w-5 h-5 text-red-600" /> Project Images
                </h2>

                <label className="block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer">
                  <Upload className="mx-auto text-gray-400" />
                  <p className="text-gray-600 mt-2">Click to upload images</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

                {images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="relative bg-white border rounded-lg shadow p-3"
                      >
                        <img
                          src={img.preview}
                          className="w-full h-48 object-cover rounded-lg"
                        />

                        <button
                          type="button"
                          onClick={() => deleteImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow"
                        >
                          <X size={16} />
                        </button>

                        <input
                          type="text"
                          placeholder="Caption"
                          className="input mt-3"
                          value={img.caption}
                          onChange={(e) => updateCaption(index, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={saving}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader className="animate-spin" /> Saving...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Save /> Save Project
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
