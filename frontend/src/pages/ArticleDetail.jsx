// src/pages/ArticleDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Image as ImageIcon,
  Video,
  X,
  Play,
} from "lucide-react";

/**
 * Article Detail page
 * - tries multiple endpoints
 * - Vite safe (no process.env)
 * - falls back to dummy data if API fails
 */

const fallbackDummy = {
  _id: "dummy-1",
  title: "Sustainable Urban Villa — Case Study",
  publishDate: "2025-09-05T00:00:00.000Z",
  summary:
    "A compact villa design using cross-ventilation and recycled materials.",
  description: `<p>This case study explores a compact urban villa designed to maximize natural light and ventilation while minimising energy consumption.</p>
<ul>
  <li>Passive ventilation & daylighting</li>
  <li>Locally-sourced, reclaimed materials</li>
  <li>Smart irrigation and rooftop garden</li>
</ul>
<p>The design also includes modular interior furniture to adapt to different family sizes.</p>`,
  tags: ["architecture", "sustainability", "case-study"],
  images: [
    {
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80",
    },
  ],
  videos: [
    {
      url: "../public/test.mp4",
    },
  ],
  createdAt: "2025-09-05T00:00:00.000Z",
};

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({
    open: false,
    index: 0,
    type: "image",
  });

  // ✅ Vite-safe API base
  const API_BASE =
    import.meta.env.VITE_API_BASE ||
    "http://localhost:8080/api/v1/admin";

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);

      const endpoints = [
        `/api/v1/admin/article/${id}`,
        `/api/v1/admin/articles/${id}`,
        `${API_BASE}/article/${id}`,
        `${API_BASE}/articles/${id}`,
      ];

      for (const endpoint of endpoints) {
        try {
          const res = await axios.get(endpoint, { timeout: 10000 });

          let data = res.data?.article || res.data;

          if (data && (data._id || data.id)) {
            setArticle(normalize(data));
            setLoading(false);
            return;
          }

          if (Array.isArray(res.data)) {
            const found = res.data.find(
              (a) => a._id === id || a.id === id
            );
            if (found) {
              setArticle(normalize(found));
              setLoading(false);
              return;
            }
          }
        } catch {
          // try next endpoint
        }
      }

      console.warn("API failed → using fallback article");
      setArticle(normalize(fallbackDummy));
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  const normalize = (a) => ({
    _id: a._id || a.id || "unknown",
    title: a.title || "Untitled",
    publishDate:
      a.publishDate || a.createdAt || new Date().toISOString(),
    summary: a.summary || "",
    description: a.description || "",
    tags: Array.isArray(a.tags)
      ? a.tags
      : typeof a.tags === "string"
      ? a.tags.split(",").map((t) => t.trim())
      : [],
    images: Array.isArray(a.images)
      ? a.images.map((i) => ({ url: i.url || i }))
      : [],
    videos: Array.isArray(a.videos)
      ? a.videos.map((v) => ({ url: v.url || v }))
      : [],
  });

  const openLightbox = (index, type) =>
    setLightbox({ open: true, index, type });

  const closeLightbox = () =>
    setLightbox({ open: false, index: 0, type: "image" });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const allMedia = [
    ...article.images.map((i) => ({ type: "image", url: i.url })),
    ...article.videos.map((v) => ({ type: "video", url: v.url })),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 p-2 bg-white border rounded hover:shadow"
        >
          <ArrowLeft />
        </button>

        <h1 className="text-4xl font-light mb-2">{article.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-red-600" />
            {new Date(article.publishDate).toDateString()}
          </span>
          <span className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-red-600" />
            {article.tags.map((t, i) => (
              <span key={i} className="px-2 py-1 bg-gray-100 rounded-full">
                {t}
              </span>
            ))}
          </span>
        </div>

        {article.summary && (
          <p className="text-gray-700 mb-6">{article.summary}</p>
        )}

        {/* Main Media */}
        <div className="bg-gray-100 rounded overflow-hidden mb-6">
          {allMedia[0]?.type === "image" ? (
            <img
              src={allMedia[0].url}
              className="w-full h-96 object-cover"
            />
          ) : (
            <video
              src={allMedia[0].url}
              controls
              className="w-full h-96"
            />
          )}
        </div>

        {/* Thumbnails */}
        {allMedia.length > 1 && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
            {allMedia.map((m, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i, m.type)}
                className="border rounded overflow-hidden"
              >
                {m.type === "image" ? (
                  <img
                    src={m.url}
                    className="w-full h-24 object-cover"
                  />
                ) : (
                  <div className="relative h-24 bg-black/20 flex items-center justify-center">
                    <Play className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.description }}
        />

        {/* Lightbox */}
        {lightbox.open && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 bg-white p-2 rounded"
            >
              <X />
            </button>

            {allMedia[lightbox.index].type === "image" ? (
              <img
                src={allMedia[lightbox.index].url}
                className="max-h-[80vh]"
              />
            ) : (
              <video
                src={allMedia[lightbox.index].url}
                controls
                autoPlay
                className="max-h-[80vh]"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
