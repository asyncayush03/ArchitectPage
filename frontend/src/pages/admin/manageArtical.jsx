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
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ManageArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  // popup state
  const [viewer, setViewer] = useState({
    open: false,
    index: 0,
    media: [],
  });

  const normalizeUrl = (url) =>
    url?.startsWith("http") ? url : `http://localhost:8080${url}`;

  /* =============================
     FETCH ARTICLES
  ============================== */
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("/api/v1/admin/articles");
      const data = res.data?.articles || [];

      const normalized = data.map((a) => ({
        _id: a._id,
        title: a.title,
        description: a.summary || a.description || "",
        createdAt: a.publishDate || a.createdAt,
        images: (a.images || []).map((i) => ({
          type: "image",
          url: normalizeUrl(i.url),
        })),
        videos: (a.videos || []).map((v) => ({
          type: "video",
          url: normalizeUrl(v.url),
        })),
      }));

      setArticles(normalized);
    } catch (err) {
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [location.key, fetchArticles]);

  /* =============================
     DELETE ARTICLE
  ============================== */
  const deleteArticle = async (id) => {
    if (!window.confirm("Delete this article permanently?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/v1/admin/article/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  /* =============================
     VIEWER HANDLERS
  ============================== */
  const openViewer = (article) => {
    const media = [...article.images, ...article.videos];
    if (media.length === 0) return;

    setViewer({
      open: true,
      index: 0,
      media,
    });
  };

  const closeViewer = () =>
    setViewer({ open: false, index: 0, media: [] });

  const nextMedia = () =>
    setViewer((v) => ({
      ...v,
      index: Math.min(v.media.length - 1, v.index + 1),
    }));

  const prevMedia = () =>
    setViewer((v) => ({
      ...v,
      index: Math.max(0, v.index - 1),
    }));

  /* =============================
     FILTER
  ============================== */
  const filtered = articles.filter((a) => {
    const q = searchTerm.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* =============================
         MEDIA VIEWER MODAL
      ============================== */}
      {viewer.open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <button
            onClick={closeViewer}
            className="absolute top-4 right-4 bg-white p-2 rounded"
          >
            <X />
          </button>

          <button
            onClick={prevMedia}
            className="absolute left-4 bg-white p-2 rounded disabled:opacity-30"
            disabled={viewer.index === 0}
          >
            <ChevronLeft />
          </button>

          <button
            onClick={nextMedia}
            className="absolute right-4 bg-white p-2 rounded disabled:opacity-30"
            disabled={viewer.index === viewer.media.length - 1}
          >
            <ChevronRight />
          </button>

          <div className="max-w-4xl w-full">
            {viewer.media[viewer.index].type === "image" ? (
              <img
                src={viewer.media[viewer.index].url}
                alt=""
                className="w-full max-h-[80vh] object-contain rounded"
              />
            ) : (
              <video
                src={viewer.media[viewer.index].url}
                controls
                autoPlay
                className="w-full max-h-[80vh] rounded"
              />
            )}
          </div>
        </div>
      )}

      {/* =============================
         PAGE UI (UNCHANGED STYLE)
      ============================== */}
      <div className="min-h-screen bg-gray-50">
        <div className="bg-red-600 text-white py-10 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-light">Manage Articles</h1>
            <Link
              to="/admin/article/new"
              className="bg-white text-red-600 px-5 py-2 rounded flex items-center gap-2"
            >
              <Plus /> Add Article
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Search */}
          <div className="mb-6 flex gap-4 items-center">
            <Search className="text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="border p-3 rounded w-full"
            />
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading &&
            filtered.map((article) => {
              const mediaCount =
                article.images.length + article.videos.length;

              return (
                <div
                  key={article._id}
                  className="bg-white mb-4 p-6 rounded shadow flex gap-6"
                >
                  <div className="w-48 h-32 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    {article.images[0] ? (
                      <img
                        src={article.images[0].url}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-medium">{article.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {article.description}
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => openViewer(article)}
                        className="px-4 py-2 bg-gray-100 rounded flex items-center gap-2"
                      >
                        <Eye /> View ({mediaCount})
                      </button>

                      <Link
                        to={`/admin/articles/edit/${article._id}`}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded flex items-center gap-2"
                      >
                        <Edit /> Edit
                      </Link>

                      <button
                        onClick={() => deleteArticle(article._id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded flex items-center gap-2"
                      >
                        <Trash2 /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
