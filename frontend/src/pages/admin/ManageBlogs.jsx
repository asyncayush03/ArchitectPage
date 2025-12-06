import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Calendar, 
  Tag, 
  Image as ImageIcon,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  Sparkles
} from "lucide-react";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const location = useLocation();

  // -----------------------------
  // Fetch all blogs
  // -----------------------------
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("📥 Fetching blogs:", "/api/v1/admin/blog");
      const res = await axios.get("/api/v1/admin/blog");
      console.log("📄 Blogs loaded:", res.data);

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
  }, [location.key, fetchBlogs]);

  // -----------------------------
  // Delete blog
  // -----------------------------
  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog? This action cannot be undone.")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`/api/v1/admin/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("🗑 Blog deleted:", res.data);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || blog.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ["all", ...new Set(blogs.map(b => b.category).filter(Boolean))];

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
        
        .animate-fade-in-up { 
          animation: fadeInUp 0.6s ease-out forwards; 
        }
        .animate-slide-in { 
          animation: slideIn 0.6s ease-out forwards; 
        }
        
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-red-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-light tracking-tight">
                    Manage Blogs
                  </h1>
                </div>
                <p className="text-white/80 text-sm">
                  Create, edit, and manage your blog content
                </p>
              </div>
              
              <Link
                to="/admin/create/new"
                className="animate-fade-in-up delay-100 inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 w-fit"
              >
                <Plus className="w-5 h-5" />
                Add New Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100 animate-fade-in-up delay-200">
            <div className="flex flex-col md:flex-row gap-4">
              
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blogs by title or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300 bg-white appearance-none cursor-pointer min-w-[200px]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredBlogs.length}</span> of <span className="font-semibold text-gray-900">{blogs.length}</span> blogs
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Loading blogs...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 animate-fade-in-up">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Blogs</h3>
                  <p className="text-red-700 mb-4">{error}</p>
                  <button
                    onClick={fetchBlogs}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredBlogs.length === 0 && (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Blogs Found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterCategory !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "Get started by creating your first blog post"}
              </p>
              {(searchTerm || filterCategory !== "all") ? (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterCategory("all");
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                  Clear Filters
                </button>
              ) : (
                <Link
                  to="/admin/blogs/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Create First Blog
                </Link>
              )}
            </div>
          )}

          {/* Blogs Grid */}
          {!loading && !error && filteredBlogs.length > 0 && (
            <div className="grid gap-6">
              {filteredBlogs.map((blog, index) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group animate-slide-in"
                  style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                >
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    
                    {/* Image */}
                    <div className="w-full md:w-48 h-48 md:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 group-hover:shadow-lg transition-shadow duration-300">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <ImageIcon className="w-8 h-8 mb-2" />
                          <span className="text-xs">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                            {blog.title}
                          </h3>
                          
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-full font-medium">
                              <Tag className="w-3 h-3" />
                              {blog.category || "Uncategorized"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {blog.content}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/admin/blogs/edit/${blog._id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 text-sm font-medium"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Link>
                        
                        <button
                          onClick={() => deleteBlog(blog._id)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105 text-sm font-medium group/btn"
                        >
                          <Trash2 className="w-4 h-4 group-hover/btn:animate-pulse" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}