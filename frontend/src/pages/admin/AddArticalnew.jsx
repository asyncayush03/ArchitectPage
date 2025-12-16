// AddArticle.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Calendar,
  Image as ImageIcon,
  Video,
  Save,
  Loader,
  X,
  Plus,
  AlertCircle,
  Images,
} from "lucide-react";

export default function AddArticle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    publishDate: "",
    summary: "",
    description: "",
    tags: "", // comma separated
  });

  const [images, setImages] = useState([]); // { file, preview }
  const [videos, setVideos] = useState([]); // { file, preview }

  const API_BASE = "/api/v1/admin";

  // Helpers
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // handle multiple images
  const handleImagesChange = (e) => {
    const selected = Array.from(e.target.files || []);
    const mapped = selected.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...mapped]);
  };

  // handle multiple videos
  const handleVideosChange = (e) => {
    const selected = Array.from(e.target.files || []);
    const mapped = selected.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setVideos((prev) => [...prev, ...mapped]);
  };

  const removeImage = (idx) => {
    setImages((prev) => {
      // revoke objectURL
      try { URL.revokeObjectURL(prev[idx].preview); } catch {}
      return prev.filter((_, i) => i !== idx);
    });
  };

  const removeVideo = (idx) => {
    setVideos((prev) => {
      try { URL.revokeObjectURL(prev[idx].preview); } catch {}
      return prev.filter((_, i) => i !== idx);
    });
  };

  // Submit - tries primary endpoint then fallback if necessary
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Title is required.");
      return;
    }
    if (!form.description.trim()) {
      alert("Description is required.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      if (form.publishDate) formData.append("publishDate", form.publishDate);
      if (form.summary) formData.append("summary", form.summary);
      if (form.description) formData.append("description", form.description);
      if (form.tags) formData.append("tags", form.tags);

      images.forEach((img) => formData.append("images", img.file));
      videos.forEach((v) => formData.append("videos", v.file));

      const token = localStorage.getItem("token");

      // endpoints to try (singular then plural)
      const endpoints = [`${API_BASE}/article`, `${API_BASE}/articles`];

      let res = null;
      let lastError = null;

      for (const ep of endpoints) {
        try {
          res = await axios.post(ep, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token ? `Bearer ${token}` : undefined,
            },
            timeout: 60000,
          });
          if (res && (res.status === 200 || res.status === 201)) break;
        } catch (err) {
          lastError = err;
          res = null;
        }
      }

      if (!res) {
        throw lastError || new Error("Failed to create article");
      }

      alert("Article created successfully!");
      navigate("/admin/article");
    } catch (err) {
      console.error("Error creating article:", err);
      alert("Error adding article: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
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

        /* small clamp for previews text if needed */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-12 px-4 sm:px-6 lg:px-8 mb-8">
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
                      Create New Article
                    </h1>
                  </div>
                  <p className="text-white/80 text-sm">
                    Add article details, upload images & videos, and publish.
                  </p>
                </div>
              </div>

              <div className="hidden md:block float-animation">
                <Images className="w-20 h-20 opacity-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8 animate-fade-in-up">
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-600" />
                  Article Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      required
                      placeholder="Enter article title..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      name="publishDate"
                      value={form.publishDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Summary (short)
                    </label>
                    <input
                      type="text"
                      name="summary"
                      value={form.summary}
                      onChange={handleChange}
                      placeholder="Short summary shown in lists..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={form.tags}
                      onChange={handleChange}
                      placeholder="e.g. architecture,interiors,case-study"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-red-600" />
                  Description
                </h2>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={8}
                  placeholder="Write the full article content here..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                />
              </div>

              {/* Media Uploads */}
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Images className="w-5 h-5 text-red-600" />
                  Media Uploads
                </h2>

                {/* Upload area for images */}
                <label className="block w-full py-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-red-500 transition-all duration-300 group mb-4">
                  <ImageIcon className="mx-auto w-10 h-10 text-gray-400 group-hover:text-red-600 transition-colors duration-300" />
                  <p className="text-gray-600 mt-3 font-medium">Click to upload images</p>
                  <p className="text-gray-400 text-sm mt-1">Support: JPG, PNG (Max 10MB each)</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImagesChange}
                    className="hidden"
                  />
                </label>

                {/* Image previews */}
                {images.length > 0 ? (
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Images ({images.length})</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {images.map((img, i) => (
                        <div key={i} className="relative bg-white border-2 border-gray-200 rounded-lg shadow-sm p-2 group">
                          <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                            <img src={img.preview} alt={`img-${i}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                              <button type="button" onClick={() => removeImage(i)} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 px-1">
                            <p className="text-xs text-gray-600 truncate">{img.file.name}</p>
                            <p className="text-xs text-gray-400">{(img.file.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 text-center py-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No images uploaded yet</p>
                  </div>
                )}

                {/* Upload area for videos */}
                <label className="block w-full py-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-red-500 transition-all duration-300 group mb-4">
                  <Video className="mx-auto w-10 h-10 text-gray-400 group-hover:text-red-600 transition-colors duration-300" />
                  <p className="text-gray-600 mt-3 font-medium">Click to upload videos</p>
                  <p className="text-gray-400 text-sm mt-1">Support: MP4, WEBM (Max 50MB each)</p>
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={handleVideosChange}
                    className="hidden"
                  />
                </label>

                {/* Video previews */}
                {videos.length > 0 ? (
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Videos ({videos.length})</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {videos.map((v, i) => (
                        <div key={i} className="relative bg-white border-2 border-gray-200 rounded-lg shadow-sm p-2 group">
                          <div className="relative h-44 bg-black/5 rounded-lg overflow-hidden">
                            <video
                              src={v.preview}
                              className="w-full h-full object-cover"
                              controls
                              muted
                              playsInline
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                              <button type="button" onClick={() => removeVideo(i)} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 px-1">
                            <p className="text-xs text-gray-600 truncate">{v.file.name}</p>
                            <p className="text-xs text-gray-400">{(v.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 text-center py-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <Video className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No videos uploaded yet</p>
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
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Publish Article
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Help */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800">
                  <strong>Tips:</strong> Provide a concise summary (used in lists). Use images to support the story and upload videos for case-study walkthroughs. Tags improve discovery — separate them with commas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
