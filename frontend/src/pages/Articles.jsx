import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ArrowRight,
  Calendar,
  Tag,
  Image,
  Video,
  Sparkles,
  Play,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredArticle, setHoveredArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // FETCH ARTICLES FROM BACKEND
  // ----------------------------
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/admin/articles");
        const articlesData = res.data?.articles || res.data || [];
        console.log("Fetched Articles:", articlesData);
        setArticles(articlesData);
      } catch (error) {
        console.error("API failed, using dummy data", error);
        setArticles(dummyArticles);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  useEffect(() => {
    setDisplayCount(5);
  }, [activeFilter]);

  // ----------------------------
  // FILTERS
  // ----------------------------
  const categories = [
    { id: "all", label: "All Articles" },
    { id: "architecture", label: "Architecture" },
    { id: "sustainability", label: "Sustainability" },
    { id: "case-study", label: "Case Studies" },
    { id: "design", label: "Design" },
    { id: "research", label: "Research" },
  ];

  const filteredArticles =
    activeFilter === "all"
      ? articles
      : articles.filter(
          (a) =>
            a.tags?.some((tag) => tag.toLowerCase() === activeFilter) ||
            a.category?.toLowerCase() === activeFilter
        );

  const displayedArticles = filteredArticles.slice(0, displayCount);
  const hasMore = displayCount < filteredArticles.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 5);
  };

  // ----------------------------
  // NORMALIZE ARTICLE DATA
  // ----------------------------
  const normalizeArticle = (article) => {
    const fixUrl = (url) => {
      if (!url) return null;
      return url.startsWith("http") ? url : `http://localhost:8080${url}`;
    };

    return {
      _id: article._id || article.id,
      title: article.title || article.name || "Untitled",
      publishDate:
        article.publishDate || article.createdAt || new Date().toISOString(),
      summary: article.summary || article.description?.substring(0, 150) || "",
      tags: Array.isArray(article.tags) ? article.tags : [],
      images: (article.images || []).map((img) => ({
        url: fixUrl(img.url || img),
      })),
      videos: (article.videos || []).map((vid) => ({
        url: fixUrl(vid.url || vid),
      })),
    };
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes bounceSlow { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-10px); } 
        }
        
        .animate-fade-in-up { 
          animation: fadeInUp 0.8s ease-out forwards; 
        }
        
        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
      `}</style>

      <div className="bg-white text-gray-800 min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />

          {/* Animated background elements */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 left-20 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <div className="mb-6 overflow-hidden">
              <p className="text-sm tracking-[0.3em] text-red-600 font-medium uppercase animate-fade-in-up">
                INSIGHTS & STORIES
              </p>
            </div>

            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight text-gray-900 animate-fade-in-up delay-100">
                Articles & Research
              </h1>
            </div>

            <div className="overflow-hidden">
              <p className="text-xl text-gray-600 mb-12 font-light max-w-2xl mx-auto animate-fade-in-up delay-200">
                Explore our latest thoughts on architecture, sustainability, and
                design innovation
              </p>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce-slow">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </section>

        {/* Filter Navigation */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium mb-2">
                FILTER BY CATEGORY
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 text-sm tracking-wide transition-all duration-300 rounded-full ${
                    activeFilter === category.id
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-red-600 hover:text-red-600 hover:shadow-md"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {displayedArticles.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {filteredArticles.length}
                </span>{" "}
                articles
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-600">Loading articles...</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No articles found in this category
                </p>
                <button
                  onClick={() => setActiveFilter("all")}
                  className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
                >
                  View All Articles
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedArticles.map((article, index) => {
                    const normalized = normalizeArticle(article);

                    const firstImage =
                      normalized.images?.[0]?.url ||
                      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop";

                    const firstVideo = normalized.videos?.[0]?.url;
                    const hasVideo = normalized.videos?.length > 0;

                    return (
                      <div
                        key={normalized._id}
                        
                        className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 animate-fade-in-up"
                        style={{
                          animationDelay: `${(index % 3) * 0.1}s`,
                          opacity: 0,
                        }}
                        onMouseEnter={() => setHoveredArticle(normalized._id)}
                        onMouseLeave={() => setHoveredArticle(null)}
                        onClick={() => navigate(`/articles/${normalized._id}`)}
                      >
                        {/* Media Preview */}
                        <div className="relative h-64 overflow-hidden">
                          {hasVideo && firstVideo ? (
                            <div className="relative w-full h-full">
                              <video
                                src={firstVideo}
                                className="w-full h-full object-cover"
                                muted
                                loop
                                playsInline
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                              {/* Play icon overlay */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <Play className="w-8 h-8 text-red-600 ml-1" />
                                </div>
                              </div>

                              {/* Video badge */}
                              <div className="absolute top-4 right-4">
                                <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-sm flex items-center gap-1">
                                  <Video className="w-3 h-3" />
                                  VIDEO
                                </span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <img
                                src={firstImage}
                                alt={normalized.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                              {/* Image badge */}
                              <div className="absolute top-4 right-4">
                                <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-sm flex items-center gap-1">
                                  <Image className="w-3 h-3" />
                                  ARTICLE
                                </span>
                              </div>
                            </>
                          )}

                          {/* Media count indicator */}
                          <div className="absolute bottom-4 right-4 flex items-center gap-2">
                            {normalized.images?.length > 0 && (
                              <span className="px-2 py-1 bg-black/60 text-white text-xs rounded flex items-center gap-1">
                                <Image className="w-3 h-3" />
                                {normalized.images.length}
                              </span>
                            )}
                            {normalized.videos?.length > 0 && (
                              <span className="px-2 py-1 bg-black/60 text-white text-xs rounded flex items-center gap-1">
                                <Video className="w-3 h-3" />
                                {normalized.videos.length}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="px-6 py-5">
                          {/* Tags */}
                          {normalized.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {normalized.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="text-xl font-semibold mb-2 text-red-600 group-hover:text-red-700 transition-colors duration-300 line-clamp-2">
                            {normalized.title}
                          </h3>

                          {/* Date */}
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <Calendar className="w-4 h-4" />
                            {new Date(
                              normalized.publishDate
                            ).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>

                          {/* Summary */}
                          <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                            {normalized.summary ||
                              "Discover insights and perspectives on architecture, design, and sustainability."}
                          </p>

                          {/* Read More */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // 🔑 prevents card click conflict
                              navigate(`/articles/${normalized._id}`);
                            }}
                            className="text-sm font-semibold text-red-600 flex items-center gap-2 uppercase tracking-wide group-hover:gap-3 transition-all duration-300"
                          >
                            READ ARTICLE
                            <ArrowRight className="w-4 h-4" />
                          </button>
                          
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center mt-12">
                    <button
                      onClick={handleLoadMore}
                      className="px-8 py-4 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30 flex items-center gap-2"
                    >
                      LOAD MORE ARTICLES
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Show all loaded message */}
                {!hasMore && filteredArticles.length > 5 && (
                  <div className="text-center mt-12">
                    <p className="text-gray-500">
                      All {filteredArticles.length} articles loaded
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

// Dummy data for fallback/demo
const dummyArticles = [
  {
    _id: "1",
    title: "Sustainable Urban Villa — Case Study",
    publishDate: "2025-09-05",
    summary:
      "A compact villa design using cross-ventilation and recycled materials.",
    tags: ["architecture", "sustainability", "case-study"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
      },
    ],
    videos: [],
  },
  {
    _id: "2",
    title: "The Future of Adaptive Architecture",
    publishDate: "2025-08-20",
    summary:
      "Exploring how buildings can respond to changing environmental conditions.",
    tags: ["research", "architecture", "design"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
      },
    ],
    videos: [],
  },
  {
    _id: "3",
    title: "Minimalist Interior Design Principles",
    publishDate: "2025-08-15",
    summary:
      "Creating serene spaces through thoughtful material selection and negative space.",
    tags: ["design", "interiors"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
      },
    ],
    videos: [],
  },
  {
    _id: "4",
    title: "Green Roofs and Urban Biodiversity",
    publishDate: "2025-07-30",
    summary:
      "How green roofs contribute to urban ecosystems and building efficiency.",
    tags: ["sustainability", "research"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
      },
    ],
    videos: [],
  },
  {
    _id: "5",
    title: "Historic Renovation: Balancing Old and New",
    publishDate: "2025-07-15",
    summary:
      "A case study on preserving heritage while introducing modern functionality.",
    tags: ["case-study", "architecture"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      },
    ],
    videos: [],
  },
  {
    _id: "6",
    title: "Biophilic Design in Modern Offices",
    publishDate: "2025-07-01",
    summary:
      "Integrating nature into workplace design for improved wellbeing and productivity.",
    tags: ["design", "sustainability"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      },
    ],
    videos: [],
  },
];

export default Articles;
