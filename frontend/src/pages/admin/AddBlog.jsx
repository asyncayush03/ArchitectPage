import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Calendar,
  Image as ImageIcon,
  Save,
  Loader,
  X,
  Plus,
  AlertCircle,
  Images,
} from "lucide-react";

export default function AddMedia() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    eventDate: "",
  });

  const [images, setImages] = useState([]);

  const API_BASE = "/api/v1/admin";

  // ------------------------------
  // Handle multiple images upload
  // ------------------------------
  const handleImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    const newImages = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  // ------------------------------
  // Remove image
  // ------------------------------
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ------------------------------
  // Handle form input change
  // ------------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ------------------------------
  // Submit event using AXIOS
  // ------------------------------
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("onSubmit called", { ...form, images: images.length });

    if (!form.title.trim()) {
      alert("Event name is required");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("eventDate", form.eventDate);
      
      // Append multiple images
      images.forEach((img) => {
        formData.append("images", img.file);
      });

      console.log("📤 Sending form data to", `${API_BASE}/blog`);

      const token = localStorage.getItem("token");

      const res = await axios.post(`${API_BASE}/blog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Event added successfully:", res.data);
      alert("Event added successfully!");
      navigate("/admin/media");
    } catch (err) {
      console.error("❌ Error adding event:", err);
      alert("Error adding event: " + (err.response?.data?.message || err.message));
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
                      Create New Event
                    </h1>
                  </div>
                  <p className="text-white/80 text-sm">
                    Add event details and upload your media gallery
                  </p>
                </div>
              </div>

              <div className="hidden md:block float-animation">
                <Images className="w-20 h-20 opacity-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8 animate-fade-in-up">
            
            <form onSubmit={onSubmit} className="space-y-6">
              
              {/* Event Information Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-600" />
                  Event Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Name *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                      placeholder="Enter event name..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={form.eventDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Event Images Section */}
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-red-600" />
                  Event Gallery ({images.length} {images.length === 1 ? 'image' : 'images'})
                </h2>

                {/* Upload Area */}
                <label className="block w-full py-12 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-red-500 transition-all duration-300 group mb-6">
                  <Upload className="mx-auto w-12 h-12 text-gray-400 group-hover:text-red-600 transition-colors duration-300" />
                  <p className="text-gray-600 mt-3 font-medium">Click to upload images</p>
                  <p className="text-gray-400 text-sm mt-1">Support: JPG, PNG, GIF (Max 10MB each)</p>
                  <p className="text-red-600 text-xs mt-2 font-semibold">Multiple images can be selected at once</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImagesChange}
                    className="hidden"
                  />
                </label>

                {/* Image Preview Grid */}
                {images.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-4">
                      Uploaded Images
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className="relative bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-2 group"
                        >
                          {/* Image Preview */}
                          <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={img.preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Delete Button Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-110 transition-all duration-300"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>

                            {/* Image Number */}
                            <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs font-semibold rounded backdrop-blur-sm">
                              #{index + 1}
                            </div>
                          </div>

                          {/* File Info */}
                          <div className="mt-2 px-1">
                            <p className="text-xs text-gray-600 truncate">{img.file.name}</p>
                            <p className="text-xs text-gray-400">
                              {(img.file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No images message */}
                {images.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No images uploaded yet</p>
                    <p className="text-gray-400 text-xs mt-1">Click the upload area above to add images</p>
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
                  disabled={loading || images.length === 0}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Creating Event...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Create Event
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800">
                  <strong>Tips:</strong> Give your event a descriptive name. Select the event date accurately. Upload multiple images at once by selecting them together. You can remove any image by hovering over it and clicking the X button.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}