import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function AddBlog() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const API_BASE = "/api/v1/admin";

  // ------------------------------
  // Handle image preview
  // ------------------------------
  const handleFileChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  // ------------------------------
  // Submit blog using AXIOS
  // ------------------------------
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("onSubmit called", { title, category, content, file });

    if (!title.trim()) {
      alert("Title required");
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();
      form.append("title", title);
      form.append("category", category);
      form.append("content", content);
      if (file) form.append("image", file);

      console.log("📤 Sending form data to", `${API_BASE}/blog`);

      for (let pair of form.entries()) {
        console.log("form field:", pair[0], pair[1]);
      }

      const token = localStorage.getItem("token");

      const res = await axios.post(`${API_BASE}/blog`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // optional if blogs are not protected
        },
      });

      console.log("✅ Blog added successfully:", res.data);
      alert("Blog added successfully!");
      navigate('/admin/blogs');

    } catch (err) {
      console.error("❌ Error adding blog:", err);
      alert("Error adding blog (see console)");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // UI BELOW — DO NOT TOUCH
  // ------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Create New Blog Post</h1>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blogs
            </button>
          </div>
          <p className="text-gray-600">Share your thoughts with the world</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blog Title <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter an engaging title..."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <input
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Technology, Lifestyle, Business..."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all outline-none"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  placeholder="Write your blog content here..."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all outline-none resize-y"
                />
                <p className="mt-2 text-sm text-gray-500">
                  {content.length} characters
                </p>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Featured Image
                </label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-amber-400 transition-colors">
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">{file?.name}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setPreviewUrl(null);
                          }}
                          className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div className="mt-4">
                        <label className="cursor-pointer">
                          <span className="text-amber-600 hover:text-amber-700 font-medium">Upload an image</span>
                          <span className="text-gray-600"> or drag and drop</span>
                          <input
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <button 
                  onClick={onSubmit}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing...
                    </span>
                  ) : "Publish Blog Post"}
                </button>

                <button 
                  onClick={() => window.history.back()}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Need help? Check out our <span className="text-amber-600 hover:underline cursor-pointer">writing guidelines</span></p>
        </div>
      </div>
    </div>
  );
}
