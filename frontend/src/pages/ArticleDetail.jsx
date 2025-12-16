import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Image as ImageIcon,
  Video as VideoIcon,
  X,
  Play,
  ChevronLeft,
  ChevronRight,
  Share2,
  Clock,
  User,
} from "lucide-react";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({
    open: false,
    index: 0,
    type: "image",
  });

  // ----------------------------
  // FETCH ARTICLE FROM DATABASE
  // ----------------------------
  useEffect(() => {
  const fetchArticle = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/admin/article/${id}`);
      const data = res.data?.article;

      if (!data) {
        throw new Error("Article not found");
      }

      setArticle(normalizeArticle(data));
    } catch (error) {
      console.error("Failed to fetch article:", error);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  fetchArticle();
}, [id]);


  // ----------------------------
  // NORMALIZE ARTICLE DATA
  // ----------------------------
  const normalizeArticle = (a) => {
    const fixUrl = (url) => {
      if (!url) return null;
      return url.startsWith("http") ? url : `http://localhost:8080${url}`;
    };

    return {
      _id: a._id || a.id || "unknown",
      title: a.title || "Untitled Article",
      publishDate: a.publishDate || a.createdAt || new Date().toISOString(),
      summary: a.summary || "",
      description: a.description || a.content || "",
      author: a.author || "Anonymous",
      readTime: a.readTime || "5 min read",
      tags: Array.isArray(a.tags)
        ? a.tags
        : typeof a.tags === "string"
        ? a.tags.split(",").map((t) => t.trim())
        : [],
      images: Array.isArray(a.images)
        ? a.images.map((i) => ({ url: fixUrl(i.url || i) }))
        : [],
      videos: Array.isArray(a.videos)
        ? a.videos.map((v) => ({ url: fixUrl(v.url || v) }))
        : [],
    };
  };

  // ----------------------------
  // LIGHTBOX HANDLERS
  // ----------------------------
  const openLightbox = (index, type) => {
    setLightbox({ open: true, index, type });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, index: 0, type: "image" });
  };

  const nextMedia = () => {
    const allMedia = [...article.images, ...article.videos];
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % allMedia.length,
    }));
  };

  const prevMedia = () => {
    const allMedia = [...article.images, ...article.videos];
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + allMedia.length) % allMedia.length,
    }));
  };

  if (loading) {
    return (
      <>
        <style>{`
          @keyframes pulse-scale {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
          }
        `}</style>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 w-20 h-20 border-4 border-red-300 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
          </div>
          <p className="mt-6 text-gray-600 font-light text-lg animate-pulse">Loading article...</p>
        </div>
      </>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <h2 className="text-2xl text-gray-700 mb-4">Article not found</h2>
        <button
          onClick={() => navigate("/articles")}
          className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
        >
          Back to Articles
        </button>
      </div>
    );
  }

  const allMedia = [
    ...article.images.map((i) => ({ type: "image", url: i.url })),
    ...article.videos.map((v) => ({ type: "video", url: v.url })),
  ];

  const mainMedia = allMedia[0] || { type: "image", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200" };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        .prose h1 { font-size: 2em; font-weight: 600; margin: 1em 0 0.5em; }
        .prose h2 { font-size: 1.5em; font-weight: 600; margin: 1.5em 0 0.5em; }
        .prose h3 { font-size: 1.25em; font-weight: 600; margin: 1.25em 0 0.5em; }
        .prose p { margin: 1em 0; line-height: 1.8; }
        .prose ul, .prose ol { margin: 1em 0; padding-left: 2em; }
        .prose li { margin: 0.5em 0; }
        .prose a { color: #dc2626; text-decoration: underline; }
        .prose blockquote {
          border-left: 4px solid #dc2626;
          padding-left: 1em;
          margin: 1.5em 0;
          font-style: italic;
          color: #4b5563;
        }
      `}</style>

      <div className="min-h-screen bg-white">
        {/* Hero Section with Image */}
        <div className="relative h-[70vh] overflow-hidden bg-black">
          {mainMedia.type === "video" ? (
            <video
              src={mainMedia.url}
              className="w-full h-full object-cover opacity-70"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={mainMedia.url}
              alt={article.title}
              className="w-full h-full object-cover opacity-70"
            />
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Share Button */}
          <button
            onClick={() => navigator.share?.({ title: article.title, url: window.location.href })}
            className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            <Share2 className="w-5 h-5 text-white" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-light text-white mb-4 leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.publishDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {article.author}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
          {/* Summary */}
          {article.summary && (
            <div className="mb-12 animate-slide-up">
              <p className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed italic border-l-4 border-red-600 pl-6">
                {article.summary}
              </p>
            </div>
          )}

          {/* Media Gallery */}
          {allMedia.length > 1 && (
            <div className="mb-12 animate-slide-up">
              <h3 className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                MEDIA GALLERY
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allMedia.map((media, idx) => (
                  <button
                    key={idx}
                    onClick={() => openLightbox(idx, media.type)}
                    className="relative group overflow-hidden rounded-lg aspect-square bg-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    {media.type === "image" ? (
                      <img
                        src={media.url}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="relative w-full h-full bg-black/20 flex items-center justify-center">
                        <video
                          src={media.url}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          muted
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-12 h-12 text-white group-hover:scale-125 transition-transform" />
                        </div>
                      </div>
                    )}

                    {/* Media Type Badge */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {media.type === "image" ? (
                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs rounded-full flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" />
                          Image
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs rounded-full flex items-center gap-1">
                          <VideoIcon className="w-3 h-3" />
                          Video
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="animate-slide-up">
            <div
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: article.description }}
            />
          </div>

          {/* Tags Section */}
          {article.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200 animate-slide-up">
              <h3 className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                TAGS
              </h3>
              <div className="flex flex-wrap gap-3">
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back to Articles Button */}
          <div className="mt-16 text-center animate-slide-up">
            <button
              onClick={() => navigate("/articles")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30"
            >
              <ArrowLeft className="w-5 h-5" />
              BACK TO ARTICLES
            </button>
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightbox.open && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 animate-fade-in">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 group z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous Button */}
            {allMedia.length > 1 && (
              <button
                onClick={prevMedia}
                className="absolute left-6 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 z-10"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Next Button */}
            {allMedia.length > 1 && (
              <button
                onClick={nextMedia}
                className="absolute right-6 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 z-10"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Media Display */}
            <div className="max-w-7xl max-h-[90vh] mx-auto px-4">
              {allMedia[lightbox.index]?.type === "image" ? (
                <img
                  src={allMedia[lightbox.index].url}
                  alt={`Media ${lightbox.index + 1}`}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
              ) : (
                <video
                  src={allMedia[lightbox.index]?.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[90vh] rounded-lg"
                />
              )}
            </div>

            {/* Counter */}
            {allMedia.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm">
                {lightbox.index + 1} / {allMedia.length}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};


export default ArticleDetail;