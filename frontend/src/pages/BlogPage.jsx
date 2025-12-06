import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, Calendar, ArrowRight, X, Image as ImageIcon, Sparkles } from "lucide-react";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Blogs
  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/admin/blog");
        const list = Array.isArray(res.data) ? res.data : res.data.blogs;
        setBlogs(list || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // Categories
  const categories = [
    { id: "all", label: "All Events" },
    { id: "updates", label: "Latest Updates" },
    { id: "design", label: "Design Philosophy" },
    { id: "insight", label: "Industry Insights" },
  ];

  const filteredBlogs =
    activeFilter === "all"
      ? blogs
      : blogs.filter((b) => b.category?.toLowerCase() === activeFilter);

  const toggleExpand = (blogId) => {
    setExpandedEvent(expandedEvent === blogId ? null : blogId);
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
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in-up { 
          animation: fadeInUp 0.8s ease-out forwards; 
        }
        .animate-bounce-slow { 
          animation: bounceSlow 2s ease-in-out infinite; 
        }
        .animate-zoom-in {
          animation: zoomIn 0.3s ease-out forwards;
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
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <div className="mb-6 overflow-hidden">
              <p className="text-sm tracking-[0.3em] text-red-600 font-medium uppercase animate-fade-in-up">
                MEDIA & EVENTS
              </p>
            </div>
            
            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight text-gray-900 animate-fade-in-up delay-100">
                Our Stories
              </h1>
            </div>
            
            <div className="overflow-hidden">
              <p className="text-xl text-gray-600 mb-12 font-light max-w-2xl mx-auto animate-fade-in-up delay-200">
                Insights, innovations, and inspiration from the world of contemporary architecture
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
              <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium mb-2">FILTER BY CATEGORY</p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 text-sm tracking-wide transition-all duration-300 ${
                    activeFilter === category.id
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-600 hover:text-red-600 hover:shadow-md"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{filteredBlogs.length}</span> {activeFilter === "all" ? "events" : `${activeFilter} events`}
              </p>
            </div>
          </div>
        </section>

        {/* Events Gallery */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-600">Loading events...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-20">
                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No events found in this category</p>
                <button 
                  onClick={() => setActiveFilter("all")}
                  className="mt-4 px-6 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
                >
                  View All Events
                </button>
              </div>
            ) : (
              <div className="space-y-16">
                {filteredBlogs.map((blog, blogIndex) => {
                  // Assuming blog has an images array or single image
                  const images = blog.images || [{ url: blog.image }];
                  const isExpanded = expandedEvent === blog._id;
                  const displayImages = isExpanded ? images : images.slice(0, 5);
                  const hasMoreImages = images.length > 5;

                  return (
                    <div
                      key={blog._id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in-up"
                      style={{ animationDelay: `${blogIndex * 0.1}s`, opacity: 0 }}
                    >
                      {/* Event Header */}
                      <div className="p-8 border-b border-gray-100">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="px-3 py-1 bg-red-600 text-white text-xs font-medium uppercase tracking-wider rounded">
                                {blog.category || "Event"}
                              </span>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                              </div>
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
                              {blog.title}
                            </h2>
                            
                            <p className="text-gray-600 leading-relaxed max-w-3xl">
                              {blog.content}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-400">
                            <ImageIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">{images.length}</span>
                          </div>
                        </div>
                      </div>

                      {/* Image Grid */}
                      <div className="p-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {displayImages.map((img, imgIndex) => {
                            const imageUrl = img.url 
                              ? `http://localhost:8080${img.url}` 
                              : `http://localhost:8080${img}`;

                            return (
                              <div
                                key={imgIndex}
                                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-gray-100"
                                onClick={() => setSelectedImage(imageUrl)}
                              >
                                <img
                                  src={imageUrl}
                                  alt={`${blog.title} - ${imgIndex + 1}`}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="absolute bottom-2 left-2 right-2">
                                    <p className="text-white text-xs font-medium">
                                      Image {imgIndex + 1}
                                    </p>
                                  </div>
                                </div>

                                {/* Zoom indicator */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                    <ArrowRight className="w-6 h-6 text-gray-900 rotate-45" />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* See More Button */}
                        {hasMoreImages && !isExpanded && (
                          <div className="mt-8 text-center">
                            <button
                              onClick={() => toggleExpand(blog._id)}
                              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                            >
                              <span>See All {images.length} Images</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {/* Show Less Button */}
                        {isExpanded && (
                          <div className="mt-8 text-center">
                            <button
                              onClick={() => toggleExpand(blog._id)}
                              className="px-8 py-3 bg-white text-gray-700 font-medium border-2 border-gray-200 hover:border-red-600 hover:text-red-600 transition-all duration-300 hover:shadow-md inline-flex items-center gap-2"
                            >
                              <span>Show Less</span>
                              <ChevronDown className="w-4 h-4 rotate-180" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Image Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-zoom-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 backdrop-blur-sm"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <div className="max-w-6xl max-h-[90vh] overflow-auto">
              <img
                src={selectedImage}
                alt="Full size"
                className="w-full h-auto rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Stay Updated</h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss an update on our latest projects and insights.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-8 py-4 bg-white text-red-600 font-medium hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-2xl active:scale-95">
                SUBSCRIBE NOW
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-medium hover:bg-white hover:text-red-600 transition-all duration-300 hover:scale-105 active:scale-95">
                VIEW ALL POSTS
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;