import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ChevronDown,
  Calendar,
  ArrowRight,
  X,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";

const MediaGalleryPage = () => {
  const [events, setEvents] = useState([]);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Events
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/admin/blog");
        console.log("Fetched events:", res.data);

        const list = res.data.events || res.data.blogs || res.data || [];

        // Sort by date - most recent first
        const sortedList = list.sort((a, b) => {
          const dateA = new Date(a.eventDate || a.createdAt);
          const dateB = new Date(b.eventDate || b.createdAt);
          return dateB - dateA; // Descending (newest first)
        });

        setEvents(sortedList);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const toggleExpand = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  // Helper to get correct image URL (Cloudinary OR local uploads)
  const getImageUrl = (img) => {
    let imageUrl = img?.url || img; // support {url: "..."} or plain string

    if (!imageUrl) return "";

    // If it's already an absolute URL (Cloudinary, etc.), use as is
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }

    // Otherwise treat as local uploads path
    return `http://localhost:8080${imageUrl}`;
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
          <div
            className="absolute bottom-20 left-20 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

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
                Explore our collection of memorable events and moments captured
                through time
              </p>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce-slow">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </section>

        {/* Event Count Section */}
        <section className="py-12 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium mb-2">
                TIMELINE
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-4" />
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {events.length}
                </span>{" "}
                events sorted by most recent
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
            ) : events.length === 0 ? (
              <div className="text-center py-20">
                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No events found</p>
                <p className="text-gray-400 text-sm mt-2">
                  Check back soon for updates
                </p>
              </div>
            ) : (
              <div className="space-y-16">
                {events.map((event, eventIndex) => {
                  const images =
                    event.images || (event.image ? [{ url: event.image }] : []);
                  const isExpanded = expandedEvent === event._id;
                  const displayImages = isExpanded
                    ? images
                    : images.slice(0, 5);
                  const hasMoreImages = images.length > 5;

                  const eventDate = event.eventDate || event.createdAt;

                  return (
                    <div
                      key={event._id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in-up"
                      style={{
                        animationDelay: `${eventIndex * 0.1}s`,
                        opacity: 0,
                      }}
                    >
                      {/* Event Header */}
                      <div className="p-8 border-b border-gray-100">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-4">
                              <Calendar className="w-5 h-5 text-red-600" />
                              <span className="text-red-600 font-medium">
                                {new Date(eventDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
                              {event.title}
                            </h2>

                            {event.content && (
                              <p className="text-gray-600 leading-relaxed max-w-3xl">
                                {event.content}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full">
                            <ImageIcon className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-semibold text-red-600">
                              {images.length}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Image Grid */}
                      <div className="p-8">
                        {images.length > 0 ? (
                          <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                              {displayImages.map((img, imgIndex) => {
                                const imageUrl = getImageUrl(img);

                                return (
                                  <div
                                    key={imgIndex}
                                    className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-gray-100"
                                    onClick={() => setSelectedImage(imageUrl)}
                                  >
                                    <img
                                      src={imageUrl}
                                      alt={`${event.title} - ${
                                        imgIndex + 1
                                      }`}
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
                                  onClick={() => toggleExpand(event._id)}
                                  className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                                >
                                  <span>
                                    See All {images.length} Images
                                  </span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            )}

                            {/* Show Less Button */}
                            {isExpanded && (
                              <div className="mt-8 text-center">
                                <button
                                  onClick={() => toggleExpand(event._id)}
                                  className="px-8 py-3 bg-white text-gray-700 font-medium border-2 border-gray-200 hover:border-red-600 hover:text-red-600 transition-all duration-300 hover:shadow-md inline-flex items-center gap-2"
                                >
                                  <span>Show Less</span>
                                  <ChevronDown className="w-4 h-4 rotate-180" />
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">
                              No images available for this event
                            </p>
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
      </div>
    </>
  );
};

export default MediaGalleryPage;
