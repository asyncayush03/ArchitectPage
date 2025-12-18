import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import {
  ChevronDown,
  Calendar,
  ArrowRight,
  X,
  Image as ImageIcon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const MediaGalleryPage = () => {
  const [events, setEvents] = useState([]);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [allImages, setAllImages] = useState([]);

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
          return dateB - dateA;
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

    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }
    return `http://localhost:8080${imageUrl}`;
  };

  const openImage = (images, index) => {
    const processedImages = images.map(img => getImageUrl(img));
    setAllImages(processedImages);
    setSelectedImageIndex(index);
    setSelectedImage(processedImages[index]);
  };

  const goToPrevious = () => {
    const newIndex = selectedImageIndex === 0 ? allImages.length - 1 : selectedImageIndex - 1;
    setSelectedImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = selectedImageIndex === allImages.length - 1 ? 0 : selectedImageIndex + 1;
    setSelectedImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
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

        /* NEW: slide-in animations for cards */
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .card-animate-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .card-animate-right {
          animation: slideInRight 0.8s ease-out forwards;
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

        {/* Events Gallery – editorial style rows */}
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
              <div className="space-y-20">
                {events.map((event, eventIndex) => {
                  const images =
                    event.images || (event.image ? [{ url: event.image }] : []);
                  const primaryImage =
                    images.length > 0 ? getImageUrl(images[0]) : null;
                  const secondaryImages = images.slice(1);
                  const isExpanded = expandedEvent === event._id;
                  const eventDate = event.eventDate || event.createdAt;

                  const rowReverse = eventIndex % 2 === 1; // alternate layout
                  const animateFromRight = rowReverse; // match layout direction

                  return (
                    <div
                      key={event._id}
                      className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:border-red-300 transition-all duration-500 ${
                        animateFromRight
                          ? "card-animate-right"
                          : "card-animate-left"
                      }`}
                      style={{
                        animationDelay: `${eventIndex * 0.12}s`,
                        opacity: 0,
                      }}
                    >
                      <div
                        className={`flex flex-col md:flex-row ${
                          rowReverse ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        {/* Image side */}
                        <div
                          className="md:w-1/2 w-full cursor-pointer group"
                          onClick={() =>
                            primaryImage && openImage(images, 0)
                          }
                        >
                          {primaryImage ? (
                            <div className="h-72 md:h-[420px] overflow-hidden">
                              <img
                                src={primaryImage}
                                alt={event.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            </div>
                          ) : (
                            <div className="h-72 md:h-[420px] flex items-center justify-center bg-gray-100">
                              <ImageIcon className="w-12 h-12 text-gray-300" />
                            </div>
                          )}
                        </div>

                        {/* Text side */}
                        <div className="md:w-1/2 w-full flex flex-col justify-center p-8 md:p-10">
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

                          <h2 className="text-3xl md:text-4xl font-semibold tracking-wide text-gray-900 uppercase mb-3">
                            {event.title}
                          </h2>

                          {event.content && (
                            <p className="text-gray-600 leading-relaxed mb-8 max-w-xl text-sm">
                              {event.content}
                            </p>
                          )}

                          {/* underline + VIEW like reference design */}
                          <button
                            onClick={() =>
                              secondaryImages.length > 0
                                ? toggleExpand(event._id)
                                : primaryImage &&
                                  openImage(images, 0)
                            }
                            className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-red-600 uppercase hover:text-red-700 transition-colors duration-300"
                          >
                            <span className="w-12 h-[2px] bg-red-600" />
                            <span>VIEW</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          {/* small info about images count */}
                          {images.length > 1 && (
                            <p className="mt-3 text-xs text-gray-400">
                              {images.length} images in this story
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Expanded thumbnail strip */}
                      {isExpanded && secondaryImages.length > 0 && (
                        <div className="px-6 pb-6 pt-4 bg-white border-t border-gray-100">
                          <div className="flex justify-between items-center mb-3">
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-600 font-medium">
                              Gallery
                            </p>
                            <button
                              onClick={() => toggleExpand(event._id)}
                              className="text-xs text-gray-600 hover:text-red-600 flex items-center gap-1 font-medium transition-colors duration-300"
                            >
                              Show Less
                              <ChevronDown className="w-3 h-3 rotate-180" />
                            </button>
                          </div>
                          <div className="flex gap-3 overflow-x-auto pb-2">
                            {secondaryImages.map((img, imgIndex) => {
                              const imageUrl = getImageUrl(img);
                              return (
                                <div
                                  key={imgIndex}
                                  className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 cursor-pointer group border border-gray-200 hover:border-red-300 transition-all duration-300"
                                  onClick={() => openImage(images, imgIndex + 1)}
                                >
                                  <img
                                    src={imageUrl}
                                    alt={`${event.title} - ${imgIndex + 2}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
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
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 backdrop-blur-sm z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 backdrop-blur-sm z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 backdrop-blur-sm z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <p className="text-white text-sm font-medium">
                {selectedImageIndex + 1} / {allImages.length}
              </p>
            </div>

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