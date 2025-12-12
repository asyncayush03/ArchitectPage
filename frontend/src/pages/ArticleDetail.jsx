// src/pages/ArticleDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Calendar, Tag, Image as ImageIcon, Video, X, Play } from "lucide-react";

/**
 * Article Detail page
 * - attempts to fetch from /api/v1/admin/article/:id and /api/v1/admin/articles/:id
 * - falls back to dummyData if fetch fails
 */
const fallbackDummy = {
  _id: "dummy-1",
  title: "Sustainable Urban Villa — Case Study",
  publishDate: "2025-09-05T00:00:00.000Z",
  summary: "A compact villa design using cross-ventilation and recycled materials.",
  description: `<p>This case study explores a compact urban villa designed to maximize natural light and ventilation while minimising energy consumption. The project uses passive solar strategies, reclaimed wood finishes, and a green roof to reduce heat gain and increase biodiversity.</p>
<ul>
  <li>Passive ventilation & daylighting</li>
  <li>Locally-sourced, reclaimed materials</li>
  <li>Smart irrigation and rooftop garden</li>
</ul>
<p>The design also includes modular interior furniture to adapt to different family sizes.</p>`,
  tags: ["architecture", "sustainability", "case-study"],
  images: [
    { url: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80" },
    { url: "https://images.unsplash.com/photo-1505691723518-36a7b1f9a9b5?w=1200&q=80" },
    { url: "https://images.unsplash.com/photo-1505842465776-3d1b1b1e5c02?w=1200&q=80" },
  ],
  videos: [
    { url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" }
  ],
  createdAt: "2025-09-05T00:00:00.000Z",
};

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, index: 0, type: "image" });

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      // endpoints to try (both shapes)
      const endpoints = [
        `/api/v1/admin/article/${id}`,
        `/api/v1/admin/articles/${id}`,
        // absolute fallback (if you use REACT_APP_API_BASE)
        `${process.env.REACT_APP_API_BASE || "http://localhost:8080/api/v1/admin"}/article/${id}`,
        `${process.env.REACT_APP_API_BASE || "http://localhost:8080/api/v1/admin"}/articles/${id}`,
      ];

      let res = null;
      let lastErr = null;

      for (const ep of endpoints) {
        try {
          res = await axios.get(ep, { timeout: 10000 });
          // some backends return object in res.data.article or res.data
          let data = res.data;
          if (data && data.article) data = data.article;
          if (data && (data._id || data.id)) {
            setArticle(normalize(data));
            setLoading(false);
            return;
          }
          // if response is an array and id matches
          if (Array.isArray(res.data)) {
            const found = res.data.find((a) => a._id === id || a.id === id);
            if (found) {
              setArticle(normalize(found));
              setLoading(false);
              return;
            }
          }
        } catch (err) {
          lastErr = err;
          // try next
        }
      }

      // If fetch fails, fall back to dummy data (helpful for dev/demo)
      console.warn("Article fetch failed, using fallback dummy. Last error:", lastErr?.message || lastErr);
      setArticle(normalize(fallbackDummy));
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  // Normalize article shape to consistent structure
  const normalize = (a) => {
    return {
      _id: a._id || a.id || "unknown",
      title: a.title || a.name || "Untitled",
      publishDate: a.publishDate || a.createdAt || a.created || new Date().toISOString(),
      summary: a.summary || "",
      description: a.description || a.body || a.content || "",
      tags: Array.isArray(a.tags) ? a.tags : (typeof a.tags === "string" && a.tags.length ? a.tags.split(",").map(t => t.trim()) : []),
      images: (a.images && Array.isArray(a.images)) ? a.images.map(i => ({ url: i.url || i })) : (a.image ? [{ url: a.image }] : []),
      videos: (a.videos && Array.isArray(a.videos)) ? a.videos.map(v => ({ url: v.url || v })) : (a.video ? [{ url: a.video }] : []),
    };
  };

  const openLightbox = (index, type = "image") => setLightbox({ open: true, index, type });
  const closeLightbox = () => setLightbox({ open: false, index: 0, type: "image" });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Article not found</p>
          <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-gray-100 rounded">Go Back</button>
        </div>
      </div>
    );
  }

  const allMedia = [
    ...(article.images || []).map((it) => ({ type: "image", url: it.url })),
    ...(article.videos || []).map((it) => ({ type: "video", url: it.url })),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-start gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-white border hover:shadow">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-2">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-600" />
                {new Date(article.publishDate).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
              </span>

              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-red-600" />
                {article.tags && article.tags.length ? article.tags.map((t, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{t}</span>
                )) : <span className="text-xs text-gray-400">No tags</span>}
              </span>
            </div>
            {article.summary && <p className="mt-4 text-gray-700">{article.summary}</p>}
          </div>
        </div>

        {/* Main grid: media left, content right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* left: media */}
          <div className="lg:col-span-7">
            {/* large preview */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
              {allMedia && allMedia.length ? (
                allMedia[0].type === "image" ? (
                  <img src={allMedia[0].url} alt={article.title} className="w-full h-84 md:h-96 object-cover" />
                ) : (
                  <div className="relative w-full h-84 md:h-96 bg-black/5">
                    <video src={allMedia[0].url} className="w-full h-full object-cover" controls />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className="w-full h-84 md:h-96 flex items-center justify-center text-gray-400">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
            </div>

            {/* thumbnails */}
            {allMedia && allMedia.length > 1 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-3">
                {allMedia.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => openLightbox(i, m.type)}
                    className="rounded-lg overflow-hidden bg-white border hover:shadow transition"
                    title={m.type}
                  >
                    {m.type === "image" ? (
                      <img src={m.url} alt={`media-${i}`} className="w-full h-24 object-cover" />
                    ) : (
                      <div className="relative w-full h-24 bg-black/5 flex items-center justify-center">
                        <video src={m.url} className="w-full h-full object-cover" muted />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
                            <Play className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* right: content */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-xl font-medium mb-3">About this article</h2>

              <div className="prose max-w-none mb-4" dangerouslySetInnerHTML={{ __html: article.description }} />

              {/* Videos inline */}
              {article.videos && article.videos.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2"><Video className="w-4 h-4 text-red-600" /> Videos</h3>
                  <div className="space-y-4">
                    {article.videos.map((v, idx) => (
                      <div key={idx} className="rounded overflow-hidden border">
                        <video src={v.url} controls className="w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags && article.tags.length ? article.tags.map((t, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 bg-gray-100 rounded-full">{t}</span>
                  )) : <span className="text-xs text-gray-400">No tags</span>}
                </div>
              </div>

              <div className="mt-6">
                <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Back</button>
              </div>
            </div>

            {/* Related / dummy suggestions */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Related articles</h4>
              <div className="space-y-3">
                {/* static dummy related items */}
                <div className="p-3 rounded border bg-white">
                  <a href="#" className="font-medium text-gray-900">Adaptive Interiors for Small Homes</a>
                  <p className="text-xs text-gray-500 truncate">Design strategies to make small spaces feel larger</p>
                </div>
                <div className="p-3 rounded border bg-white">
                  <a href="#" className="font-medium text-gray-900">Green Roof Benefits & Case Studies</a>
                  <p className="text-xs text-gray-500 truncate">How green roofs lower temperature and boost biodiversity</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox modal */}
        {lightbox.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="relative max-w-4xl w-full">
              <button onClick={closeLightbox} className="absolute top-3 right-3 z-10 p-2 rounded bg-white">
                <X className="w-5 h-5" />
              </button>

              <div className="bg-black rounded">
                {allMedia[lightbox.index].type === "image" ? (
                  <img src={allMedia[lightbox.index].url} alt="lightbox" className="w-full max-h-[80vh] object-contain" />
                ) : (
                  <video src={allMedia[lightbox.index].url} controls autoPlay className="w-full max-h-[80vh]" />
                )}
              </div>

              {/* simple prev/next */}
              <div className="flex justify-between mt-3">
                <button onClick={() => setLightbox((s) => ({ ...s, index: Math.max(0, s.index - 1) }))} className="px-4 py-2 bg-white rounded">Prev</button>
                <button onClick={() => setLightbox((s) => ({ ...s, index: Math.min(allMedia.length - 1, s.index + 1) }))} className="px-4 py-2 bg-white rounded">Next</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
