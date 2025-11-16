import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  // -----------------------------
  // Fetch all blogs (NO API BASE)
  // -----------------------------
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("📥 Fetching blogs:", "/api/v1/admin/blog");

      const res = await axios.get("/api/v1/admin/blog");

      console.log("📄 Blogs loaded:", res.data);

      // handle both array or object.blogs
      const data = Array.isArray(res.data) ? res.data : res.data.blogs;

      setBlogs(data || []);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(err.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [location.key]);

  // -----------------------------
  // Delete blog
  // -----------------------------
  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(`/api/v1/admin/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("🗑 Blog deleted:", res.data);

      // update list locally
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Delete failed");
    }
  };

  // -----------------------------
  // UI — DO NOT TOUCH
  // -----------------------------
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Manage Blogs</h2>
        <Link to="/admin/blogs/new" className="bg-amber-500 text-white px-4 py-2 rounded">
          Add New
        </Link>
      </div>

      {loading && <p>Loading…</p>}

      {error && (
        <div className="bg-red-50 p-4 border border-red-200 rounded">
          <p className="text-red-600 mb-2">Error: {error}</p>
          <button onClick={fetchBlogs} className="px-3 py-1 bg-red-500 text-white rounded">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && blogs.length === 0 && <p>No blogs found.</p>}

      {!loading &&
        !error &&
        blogs.map((blog) => (
          <div key={blog._id} className="bg-white border rounded p-4 flex gap-4 items-start">
            <div className="w-36 h-24 bg-gray-100 rounded overflow-hidden">
              {blog.image ? (
                <img
                  src={blog.image}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-500">
                {blog.category} · {new Date(blog.createdAt).toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">{blog.content}</p>
            </div>

            <button
              onClick={() => deleteBlog(blog._id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}
