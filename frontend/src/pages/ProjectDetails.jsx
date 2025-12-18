import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Calendar,
  User,
  Tag,
  Layers,
  CheckCircle,
  Key,
  Home,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [slide, setSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const getImageUrl = (img) => {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    if (!img || !img.url) return null;
    return img.url.startsWith("http") ? img.url : `${API_BASE_URL}${img.url}`;
  };

  // SLIDE AUTO ROTATION
  useEffect(() => {
    if (!project?.images || project.images.length === 0) return;
    const timer = setInterval(() => {
      setSlide((prev) => (project.images ? (prev + 1) % project.images.length : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, [project]);

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FETCH PROJECT
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`/api/v1/admin/project/${id}`);
        setProject(res.data.project);
      } catch (error) {
        console.log("Error loading project:", error);
      }
    };
    fetchProject();
  }, [id]);

  // KEYBOARD NAVIGATION FOR LIGHTBOX
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (!project?.images?.length) return;
      if (e.key === "Escape") setLightboxOpen(false);
      else if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % project.images.length);
      else if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + project.images.length) % project.images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading project...</p>
        </div>
      </div>
    );
  }

  const images = project.images || [];

  const getDescriptionPreview = (text) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length <= 100) return text;
    return words.slice(0, 100).join(" ") + "...";
  };

  const descriptionPreview = getDescriptionPreview(project.description);
  const hasMoreContent = project.description && project.description.trim().split(/\s+/).length > 100;

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }
        .info-item {
          transition: all 0.3s ease;
        }
        .info-item:hover {
          transform: translateX(8px);
          background-color: #fef2f2;
        }
      `}</style>

      <div className="min-h-screen bg-white">
        
        {/* FULLSCREEN CAROUSEL */}
        <div className="relative h-screen w-full overflow-hidden bg-gray-900">
          {images.length > 0 ? (
            images.map((img, i) => {
              const url = getImageUrl(img);
              if (!url) return null;
              return (
                <img
                  key={i}
                  src={url}
                  alt={img.caption || project.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    slide === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              );
            })
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <p className="text-white text-xl">No images available</p>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <button
            onClick={() => navigate(-1)}
            className={`fixed top-6 left-6 z-50 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
              scrolled ? "bg-white text-gray-900 shadow-lg" : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 text-white z-10">
            <div className="max-w-7xl mx-auto">
              <div className="inline-block mb-4 px-5 py-2 bg-red-600 rounded">
                <p className="text-xs tracking-[0.3em] font-semibold uppercase">{project.type || "Project"}</p>
              </div>

              <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">{project.name}</h1>

              <div className="flex flex-wrap gap-6 text-sm text-gray-200">
                {project.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                )}
                {project.startDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.startDate).getFullYear()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={() => setSlide((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 rounded-full text-white hover:bg-white/30 backdrop-blur-sm transition z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => setSlide((prev) => (prev + 1) % images.length)}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 rounded-full text-white hover:bg-white/30 backdrop-blur-sm transition z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className={`h-2 rounded-full transition-all ${
                      slide === i ? "bg-red-600 w-8" : "bg-white/40 w-2 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* PROJECT OVERVIEW - FULL WIDTH SECTION */}
        <section className="bg-gray-50 py-16 md:py-20 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4">Project Overview</h2>
              <div className="w-16 h-1 bg-red-600 mx-auto" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Project Name */}
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 col-span-2 info-item">
                <div className="flex items-center gap-3 mb-2">
                  <Home className="w-5 h-5 text-red-600" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Name</span>
                </div>
                <p className="text-gray-900 font-medium">{project.name}</p>
              </div>

              {/* Project Area */}
              {project.budget && (
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 info-item">
                  <div className="flex items-center gap-3 mb-2">
                    <Layers className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Area</span>
                  </div>
                  <p className="text-gray-900 font-medium">{project.budget} sq.ft</p>
                </div>
              )}

              {/* Client */}
              {project.client && (
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 info-item">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</span>
                  </div>
                  <p className="text-gray-900 font-medium">{project.client}</p>
                </div>
              )}

              {/* Start Date */}
              {project.startDate && (
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 info-item">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</span>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              )}

              {/* Status */}
              {project.status && (
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 info-item">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</span>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
              )}

              {/* Keys */}
              {project.keys && (
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 info-item">
                  <div className="flex items-center gap-3 mb-2">
                    <Key className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Keys</span>
                  </div>
                  <p className="text-gray-900 font-medium">{project.keys}</p>
                </div>
              )}

              {/* Floors */}
              {project.floors && (
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 info-item">
                  <div className="flex items-center gap-3 mb-2">
                    <Layers className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Floors</span>
                  </div>
                  <p className="text-gray-900 font-medium">{project.floors}</p>
                </div>
              )}

              {/* Location */}
              {project.location && (
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 col-span-2 info-item">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</span>
                  </div>
                  <p className="text-gray-900 font-medium">{project.location}</p>
                </div>
              )}

              {/* Category */}
              {project.type && (
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 info-item">
                  <div className="flex items-center gap-3 mb-2">
                    <Tag className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</span>
                  </div>
                  <p className="text-gray-900 font-medium capitalize">{project.type}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* DESCRIPTION & FEATURES - 2 COLUMNS */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* LEFT COLUMN - DESCRIPTION */}
              <div className="animate-fade-in-up">
                <div className="mb-6">
                  <h2 className="text-2xl font-light text-gray-900 mb-2">Project Description</h2>
                  <div className="w-16 h-1 bg-red-600" />
                </div>

                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {showFullDescription ? project.description : descriptionPreview}
                  </p>

                  {hasMoreContent && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                    >
                      {showFullDescription ? (
                        <>
                          <span>Show Less</span>
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span>Show More</span>
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}

                  {!project.description && (
                    <p className="text-gray-400 italic">No description available.</p>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN - ADDITIONAL FEATURES */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-light text-gray-900 mb-2">Additional Features</h2>
                  <div className="w-16 h-1 bg-red-600" />
                </div>

                {project.additionalFeatures && project.additionalFeatures.length > 0 ? (
                  <div className="space-y-3">
                    {project.additionalFeatures.map((feature, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-gray-200 rounded-lg p-5 hover:border-red-600 hover:shadow-md transition-all duration-300 animate-slide-in"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">{feature.key}</p>
                            <p className="text-sm text-gray-600">{feature.value}</p>
                          </div>
                          <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold text-red-600">{idx + 1}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <p className="text-gray-400 italic">No additional features listed.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* IMAGE GALLERY */}
        {images.length > 0 && (
          <section className="bg-gray-50 py-16 md:py-24 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-gray-900 mb-4">Project Gallery</h2>
                <div className="w-16 h-1 bg-red-600 mx-auto" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((img, i) => {
                  const url = getImageUrl(img);
                  if (!url) return null;

                  return (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                      onClick={() => {
                        setLightboxIndex(i);
                        setLightboxOpen(true);
                      }}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={url}
                          alt={img.caption || `Gallery ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      {img.caption && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <p className="text-white text-sm p-4">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* LIGHTBOX */}
        {lightboxOpen && images[lightboxIndex] && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300 backdrop-blur-sm"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i - 1 + images.length) % images.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i + 1) % images.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="max-w-6xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <img
                src={getImageUrl(images[lightboxIndex])}
                alt={images[lightboxIndex].caption || `Image ${lightboxIndex + 1}`}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              {images[lightboxIndex].caption && (
                <p className="text-white text-center mt-4">{images[lightboxIndex].caption}</p>
              )}
              <p className="text-white/70 text-center text-sm mt-2">
                {lightboxIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}