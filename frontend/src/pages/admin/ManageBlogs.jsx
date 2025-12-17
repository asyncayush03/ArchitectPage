import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import {
  Plus,
  Trash2,
  Calendar,
  Image as ImageIcon,
  AlertCircle,
  RefreshCw,
  Search,
  Sparkles,
  Images,
  Eye,
} from "lucide-react";

export default function ManageMedia() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  /* =============================
     FETCH EVENTS
  ============================== */
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("/api/v1/admin/blog");
      const data = res.data.events || [];
      setEvents(data);
    } catch (err) {
      setError(err.message || "Failed to load media");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [location.key, fetchEvents]);

  /* =============================
     DELETE EVENT
  ============================== */
  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/v1/admin/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  /* =============================
     FILTER
  ============================== */
  const filteredEvents = events.filter((event) =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {/* HEADER */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 px-6 border-b border-red-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Images className="w-6 h-6" />
                </div>
                <h1 className="text-3xl md:text-4xl font-light">
                  Manage Media & Events
                </h1>
              </div>
              <p className="text-white/80 text-sm">
                Create and manage your event gallery
              </p>
            </div>

            <Link
              to="/admin/media/new"
              className="animate-fade-in-up delay-100 inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 font-medium hover:bg-gray-100 transition"
            >
              <Plus className="w-5 h-5" />
              Add New Event
            </Link>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* SEARCH */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in-up delay-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredEvents.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {events.length}
                </span>{" "}
                events
              </p>
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Loading events...</p>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 animate-fade-in-up">
              <div className="flex gap-4">
                <AlertCircle className="text-red-600" />
                <div>
                  <p className="text-red-700 mb-4">{error}</p>
                  <button
                    onClick={fetchEvents}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* EVENTS */}
          {!loading && !error && filteredEvents.length > 0 && (
            <div className="grid gap-6">
              {filteredEvents.map((event, index) => {
                const images = event.images || [];
                const firstImage = images[0];

                return (
                  <div
                    key={event._id}
                    className="bg-white rounded-lg shadow-md border border-gray-100 animate-slide-in"
                    style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                  >
                    <div className="flex flex-col lg:flex-row gap-6 p-6">
                      {/* IMAGE */}
                      <div className="w-full lg:w-64 h-40 bg-gray-100 rounded-lg overflow-hidden">
                        {firstImage ? (
                          <img
                            src={firstImage.url || firstImage}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon />
                          </div>
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-medium mb-3">
                          {event.title}
                        </h3>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-red-600" />
                            {event.eventDate
                              ? new Date(event.eventDate).toDateString()
                              : new Date(event.createdAt).toDateString()}
                          </span>

                          <span className="flex items-center gap-2">
                            <Images className="w-4 h-4 text-red-600" />
                            {images.length} Images
                          </span>
                        </div>

                        {/* ACTIONS (NO EDIT) */}
                        <div className="flex gap-3">
                          <Link
                            to={`/admin/media/${event._id}`}
                            className="px-4 py-2 bg-gray-100 rounded flex items-center gap-2 hover:bg-gray-200"
                          >
                            <Eye className="w-4 h-4" />
                            View Gallery
                          </Link>

                          <button
                            onClick={() => deleteEvent(event._id)}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded flex items-center gap-2 hover:bg-red-600 hover:text-white transition"
                          >
                            <Trash2 className="w-4 h-4" />
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
