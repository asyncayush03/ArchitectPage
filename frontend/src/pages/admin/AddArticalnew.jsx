// AddArticle.jsx
import React, { useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
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
    tags: "",
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const API_BASE = "/api/v1/admin";

  /* ================= HELPERS ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [
      ...prev,
      ...files.map((f) => ({
        file: f,
        preview: URL.createObjectURL(f),
      })),
    ]);
  };

  const handleVideosChange = (e) => {
    const files = Array.from(e.target.files || []);
    setVideos((prev) => [
      ...prev,
      ...files.map((f) => ({
        file: f,
        preview: URL.createObjectURL(f),
      })),
    ]);
  };

  const removeImage = (idx) =>
    setImages((p) => p.filter((_, i) => i !== idx));

  const removeVideo = (idx) =>
    setVideos((p) => p.filter((_, i) => i !== idx));

  /* ================= SUBMIT ================= */
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      alert("Title and description are required");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
      images.forEach((i) => fd.append("images", i.file));
      videos.forEach((v) => fd.append("videos", v.file));

      const token = localStorage.getItem("token");

      await axios.post(`${API_BASE}/article`, fd, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Article created successfully!");
      navigate("/admin/article");
    } catch (err) {
      alert("Failed to create article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-red-600 text-white py-10 px-6 mb-8">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white/20 rounded"
          >
            <ArrowLeft />
          </button>
          <h1 className="text-3xl font-light flex items-center gap-2">
            <Plus /> Create Article
          </h1>
        </div>
      </div>

      {/* FORM */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <form
          onSubmit={onSubmit}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* ARTICLE INFO */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="text-red-600" /> Article Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Article Title"
                className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
              <input
                type="date"
                name="publishDate"
                value={form.publishDate}
                onChange={handleChange}
                className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            <input
              name="summary"
              value={form.summary}
              onChange={handleChange}
              placeholder="Short summary"
              className="mt-4 border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-red-500 outline-none"
            />

            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="tags (comma separated)"
              className="mt-4 border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="text-red-600" /> Description
            </h2>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={7}
              placeholder="Write full article content..."
              className="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* MEDIA UPLOAD */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Images className="text-red-600" /> Media Uploads
            </h2>

            {/* IMAGES */}
            <label className="block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-red-500">
              <Images className="mx-auto mb-2 text-red-600" />
              Upload Images
              <input type="file" multiple hidden onChange={handleImagesChange} />
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {images.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img.preview}
                      className="h-36 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* VIDEOS */}
            <label className="block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-red-500 mt-6">
              <Video className="mx-auto mb-2 text-red-600" />
              Upload Videos
              <input type="file" multiple hidden onChange={handleVideosChange} />
            </label>

            {videos.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                {videos.map((v, i) => (
                  <div key={i} className="relative">
                    <video
                      src={v.preview}
                      controls
                      className="h-40 w-full rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeVideo(i)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border rounded-lg"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-6 py-3 bg-red-600 text-white rounded-lg flex items-center gap-2"
            >
              {loading ? <Loader className="animate-spin" /> : <Save />}
              Publish Article
            </button>
          </div>
        </form>

        {/* HELP */}
        <div className="mt-6 bg-blue-50 border p-4 rounded-lg flex gap-2">
          <AlertCircle className="text-blue-600" />
          <p className="text-sm">
            Provide a short summary for listing pages. Use images and videos to
            enrich your article.
          </p>
        </div>
      </div>
    </div>
  );
}
