import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Calendar, 
  Image as ImageIcon,
  AlertCircle,
  RefreshCw,
  Search,
  Sparkles,
  Images,
  Eye
} from "lucide-react";

export default function ManageMedia() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  // -----------------------------
  // Fetch all media/events
  // -----------------------------
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("📥 Fetching media/events:", "/api/v1/admin/blog");
      const res = await axios.get("/api/v1/admin/blog");
      console.log("📄 Media loaded:", res.data);

      const data = res.data.events || [];
setEvents(data);

    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(err.message || "Failed to load media");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [location.key, fetchEvents]);

  // -----------------------------
  // Delete event
  // -----------------------------
  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`/api/v1/admin/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("🗑 Event deleted:", res.data);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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
                    <Images className="w-6 h-6" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-light tracking-tight">
                    Manage Media & Events
                  </h1>
                </div>
                <p className="text-white/80 text-sm">
                  Create, edit, and manage your event gallery
                </p>
              </div>
              
              <Link
                to="/admin/media/new"
                className="animate-fade-in-up delay-100 inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 w-fit"
              >
                <Plus className="w-5 h-5" />
                Add New Event
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100 animate-fade-in-up delay-200">
            <div className="flex flex-col md:flex-row gap-4">
              
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors duration-300"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredEvents.length}</span> of <span className="font-semibold text-gray-900">{events.length}</span> events
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Loading events...</p>
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
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Events</h3>
                  <p className="text-red-700 mb-4">{error}</p>
                  <button
                    onClick={fetchEvents}
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
          {!loading && !error && filteredEvents.length === 0 && (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Images className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? "Try adjusting your search criteria" 
                  : "Get started by creating your first event"}
              </p>
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                  Clear Search
                </button>
              ) : (
                <Link
                  to="/admin/media/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Create First Event
                </Link>
              )}
            </div>
          )}

          {/* Events Grid */}
          {!loading && !error && filteredEvents.length > 0 && (
            <div className="grid gap-6">
              {filteredEvents.map((event, index) => {
                // Handle multiple images
                const images = event.images || (event.image ? [{ url: event.image }] : []);
                const imageCount = images.length;
                const firstImage = images[0];

                return (
                  <div
                    key={event._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group animate-slide-in"
                    style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                  >
                    <div className="flex flex-col lg:flex-row gap-6 p-6">
                      
                      {/* Image Preview */}
                      <div className="relative w-full lg:w-64 h-48 lg:h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 group-hover:shadow-lg transition-shadow duration-300">
                        {firstImage ? (
                          <>
                            <img
                              src={firstImage.url || firstImage}
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Image count badge */}
                            {imageCount > 1 && (
                              <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 text-white text-xs font-semibold rounded-full backdrop-blur-sm flex items-center gap-1">
                                <ImageIcon className="w-3 h-3" />
                                {imageCount}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                            <ImageIcon className="w-10 h-10 mb-2" />
                            <span className="text-xs">No Images</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-2xl font-medium text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                              {event.title}
                            </h3>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-red-600" />
                                <span className="font-medium">Event Date:</span>
                                {event.eventDate 
                                  ? new Date(event.eventDate).toLocaleDateString('en-US', { 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric' 
                                    })
                                  : new Date(event.createdAt).toLocaleDateString('en-US', { 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric' 
                                    })
                                }
                              </span>
                              
                              <span className="flex items-center gap-2">
                                <Images className="w-4 h-4 text-red-600" />
                                <span className="font-medium">{imageCount} {imageCount === 1 ? 'Image' : 'Images'}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/admin/media/${event._id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 text-sm font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            View Gallery
                          </Link>

                          <Link
                            to={`/admin/media/edit/${event._id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-300 hover:scale-105 text-sm font-medium"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Link>
                          
                          <button
                            onClick={() => deleteEvent(event._id)}
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