import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Plus,
  Trash2,
  Edit,
  Calendar,
  Image as ImageIcon,
  Video,
  AlertCircle,
  RefreshCw,
  Search,
  Eye,
  Play,
} from "lucide-react";

/**
 * ManageArticles.jsx
 * - UI & behavior follow ManageMedia.jsx
 * - Fetches from /api/v1/admin/article or /api/v1/admin/articles (tries both)
 * - Supports images + videos preview, search, view/edit/delete
 */

export default function ManageArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  // Helper to normalize a media URL (same logic as your other files)
  const normalizeUrl = (rawUrl) =>
    rawUrl ? (rawUrl.startsWith("http") ? rawUrl : `http://localhost:8080${rawUrl}`) : null;

  // Try both singular/plural endpoints so it works with either backend naming
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Try primary endpoint first
      const endpoints = ["/api/v1/admin/article", "/api/v1/admin/articles"];
      let res = null;

      for (const ep of endpoints) {
        try {
          res = await axios.get(ep);
          if (res && (Array.isArray(res.data) || Array.isArray(res.data.articles) || Array.isArray(res.data.items))) {
            break; // found a usable response
          }
        } catch (e) {
          // try next
          res = null;
        }
      }

      if (!res) {
        throw new Error("No article endpoint returned a valid response");
      }

      // normalize possible response shapes:
      // - res.data (array)
      // - res.data.articles
      // - res.data.items
      let data = [];
      if (Array.isArray(res.data)) data = res.data;
      else if (Array.isArray(res.data.articles)) data = res.data.articles;
      else if (Array.isArray(res.data.items)) data = res.data.items;
      else if (Array.isArray(res.data.data)) data = res.data.data;
      else data = [];

      // normalize each article shape minimally
      const normalized = data.map((a) => {
        // media: could be images array [{url,...}] or videos array etc.
        const images = a.images || (a.media?.images) || [];
        const videos = a.videos || (a.media?.videos) || [];

        // build a unified media array with type
        const media = [
          ...((images || []).map((it) => ({ type: "image", url: it.url || it }))),
          ...((videos || []).map((it) => ({ type: "video", url: it.url || it }))),
        ].filter(Boolean);

        // If article has single image/video as string props
        if (a.image && media.length === 0) media.push({ type: "image", url: a.image });
        if (a.video && media.length === 0) media.push({ type: "video", url: a.video });

        return {
          _id: a._id || a.id,
          title: a.title || a.name || "Untitled Article",
          description: a.description || a.body || a.summary || "",
          createdAt: a.createdAt || a.created || a.date,
          media: media.map((m) => ({ type: m.type, url: normalizeUrl(m.url) })),
        };
      });

      setArticles(normalized);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError(err.message || "Failed to load articles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [location.key, fetchArticles]);

  // Delete article (try singular/plural delete endpoints)
  const deleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) return;

    try {
      const token = localStorage.getItem("token");
      // try two endpoint shapes
      const endpoints = [`/api/v1/admin/article/${id}`, `/api/v1/admin/articles/${id}`];
      let res = null;
      for (const ep of endpoints) {
        try {
          res = await axios.delete(ep, { headers: { Authorization: `Bearer ${token}` } });
          if (res && (res.status === 200 || res.status === 204)) break;
        } catch (e) {
          res = null;
        }
      }
      if (!res) throw new Error("Delete request failed");

      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete article error:", err);
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  // Filter articles by search term (title or description)
  const filtered = articles.filter((a) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return (
      a.title?.toLowerCase().includes(q) ||
      a.description?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-20px);} to { opacity: 1; transform: translateX(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-slide-in { animation: slideIn 0.6s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-red-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Video className="w-6 h-6" />
                </div>
                <h1 className="text-3xl md:text-4xl font-light tracking-tight">Manage Articles</h1>
              </div>
              <p className="text-white/80 text-sm">Create, edit and manage articles with images & videos</p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/admin/articles/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
              >
                <Plus className="w-5 h-5" />
                Add New Article
              </Link>

              <button
                onClick={fetchArticles}
                className="inline-flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-md hover:bg-white/20 transition"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100 animate-fade-in-up delay-100">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles by title or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                />
              </div>

              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filtered.length}</span> of <span className="font-semibold text-gray-900">{articles.length}</span> articles
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Loading articles...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 animate-fade-in-up">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Articles</h3>
                  <p className="text-red-700 mb-4">{error}</p>
                  <button
                    onClick={fetchArticles}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Articles Found</h3>
              <p className="text-gray-600 mb-6">{searchTerm ? "Try different search terms." : "Create your first article to show images, videos and rich descriptions."}</p>
              {searchTerm ? (
                <button onClick={() => setSearchTerm("")} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                  Clear Search
                </button>
              ) : (
                <Link to="/admin/articles/new" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300">
                  <Plus className="w-5 h-5" />
                  Create First Article
                </Link>
              )}
            </div>
          )}

          {/* Articles List */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid gap-6">
              {filtered.map((article, idx) => {
                const media = article.media || [];
                const imageCount = media.filter((m) => m.type === "image").length;
                const videoCount = media.filter((m) => m.type === "video").length;
                const first = media[0];

                return (
                  <div
                    key={article._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group animate-slide-in"
                    style={{ animationDelay: `${idx * 0.05}s`, opacity: 0 }}
                  >
                    <div className="flex flex-col lg:flex-row gap-6 p-6">
                      {/* Preview */}
                      <div className="relative w-full lg:w-64 h-48 lg:h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 group-hover:shadow-lg transition-shadow duration-300">
                        {first ? (
                          first.type === "image" ? (
                            <img src={first.url} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          ) : (
                            // video preview: show poster if provided, else show play overlay
                            <>
                              <div className="w-full h-full bg-black/5 flex items-center justify-center">
                                {/* try to show <video> with muted preview if browser allows */}
                                <video src={first.url} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center">
                                  <Play className="w-6 h-6 text-white" />
                                </div>
                              </div>
                            </>
                          )
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                            <ImageIcon className="w-10 h-10 mb-2" />
                            <span className="text-xs">No Media</span>
                          </div>
                        )}

                        {/* media count badge */}
                        {(imageCount + videoCount) > 0 && (
                          <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 text-white text-xs font-semibold rounded-full backdrop-blur-sm flex items-center gap-2">
                            {videoCount > 0 && <Video className="w-3 h-3" />}
                            {imageCount > 0 && <ImageIcon className="w-3 h-3" />}
                            {imageCount + videoCount}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-2xl font-medium text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                              {article.title}
                            </h3>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-red-600" />
                                <span className="font-medium">Published:</span>
                                {article.createdAt ? new Date(article.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric"}) : "—"}
                              </span>

                              <span className="flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-red-600" />
                                <span className="font-medium">{imageCount} Image{imageCount !== 1 ? "s" : ""}</span>
                              </span>

                              <span className="flex items-center gap-2">
                                <Video className="w-4 h-4 text-red-600" />
                                <span className="font-medium">{videoCount} Video{videoCount !== 1 ? "s" : ""}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                          {article.description || "No description provided for this article."}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/admin/articles/${article._id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 text-sm font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Link>

                          <Link
                            to={`/admin/articles/edit/${article._id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-300 hover:scale-105 text-sm font-medium"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Link>

                          <button
                            onClick={() => deleteArticle(article._id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105 text-sm font-medium group/btn"
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
