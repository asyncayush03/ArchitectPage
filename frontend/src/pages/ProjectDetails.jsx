import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Calendar,
  Maximize2,
  User,
  DollarSign,
  Tag,
} from "lucide-react";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [slide, setSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // SLIDE AUTO ROTATION
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) =>
        project?.images ? (prev + 1) % project.images.length : 0
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [project]);

  // SCROLL EFFECT WITH INTERSECTION OBSERVER
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Animate elements on scroll
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible && !section.classList.contains('visible')) {
          section.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FETCH DATA
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

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading project...</p>
      </div>
    );
  }

  const images = project.images || [];

  // FORMAT DESCRIPTION INTO 3 COLUMNS
  const descriptionColumns = (() => {
    const words = project.description.split(" ");
    const perColumn = Math.ceil(words.length / 3);

    return [
      words.slice(0, perColumn).join(" "),
      words.slice(perColumn, perColumn * 2).join(" "),
      words.slice(perColumn * 2).join(" "),
    ];
  })();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <style>{`
        * {-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}
        body {overflow-x: hidden;}
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        .stagger-6 { transition-delay: 0.6s; }
      `}</style>

      {/* FULLSCREEN SLIDESHOW */}
      <div className="relative h-screen w-full overflow-hidden">
        {images.map((img, i) => (
          <img
            key={i}
            src={`http://localhost:8080${img.url}`}
            alt={img.caption || project.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              slide === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Back Button with Scroll Effect */}
        <button
          onClick={() => navigate(-1)}
          className={`fixed top-6 left-6 z-50 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
            scrolled 
              ? "bg-white/90 text-gray-800 shadow-lg" 
              : "bg-white/20 text-white hover:bg-white/40"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Project Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 text-white z-10">
          <div className="max-w-7xl mx-auto">
            {/* Category Badge */}
            <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-red-400/80 to-amber-400/80 backdrop-blur-sm rounded-full">
              <p className="text-xs tracking-[0.3em] font-semibold uppercase">
                {project.type}
              </p>
            </div>

            {/* Project Title */}
            <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-4 drop-shadow-2xl">
              {project.name}
            </h1>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{project.location || "Location"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(project.startDate).getFullYear()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4" />
                <span>{project.area || "Area"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE CONTROLS */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setSlide((prev) => (prev - 1 + images.length) % images.length)
              }
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 rounded-full text-white hover:bg-white/40 backdrop-blur-sm transition z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => setSlide((prev) => (prev + 1) % images.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 rounded-full text-white hover:bg-white/40 backdrop-blur-sm transition z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    slide === i ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                ></button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* PROJECT INFO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Section Header */}
        <div className="relative mb-16 animate-on-scroll">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-r from-red-400 to-transparent"></div>
          <h2 className="text-red-400 text-sm tracking-[0.3em] font-light pl-20">
            PROJECT OVERVIEW
          </h2>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="animate-on-scroll stagger-1">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-amber-500" />
              <h3 className="text-gray-500 text-xs uppercase tracking-widest font-semibold">
                Client
              </h3>
            </div>
            <p className="text-gray-800 text-lg font-light">{project.client}</p>
          </div>

          <div className="animate-on-scroll stagger-2">
            <div className="flex items-center gap-3 mb-3">
              <Tag className="w-5 h-5 text-amber-500" />
              <h3 className="text-gray-500 text-xs uppercase tracking-widest font-semibold">
                Category
              </h3>
            </div>
            <p className="text-gray-800 text-lg font-light capitalize">{project.type}</p>
          </div>

          <div className="animate-on-scroll stagger-3">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-5 h-5 text-amber-500" />
              <h3 className="text-gray-500 text-xs uppercase tracking-widest font-semibold">
                Budget
              </h3>
            </div>
            <p className="text-gray-800 text-lg font-light">{project.budget}</p>
          </div>

          <div className="animate-on-scroll stagger-4">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-amber-500" />
              <h3 className="text-gray-500 text-xs uppercase tracking-widest font-semibold">
                Completed
              </h3>
            </div>
            <p className="text-gray-800 text-lg font-light">
              {new Date(project.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* DESCRIPTION SECTION */}
        <div className="relative mb-16 animate-on-scroll">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-r from-amber-400 to-transparent"></div>
          <h2 className="text-amber-400 text-sm tracking-[0.3em] font-light pl-20">
            ABOUT PROJECT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-gray-700 leading-relaxed text-sm mb-24">
          {descriptionColumns.map((col, i) => (
            <p
              key={i}
              className={`animate-on-scroll stagger-${i + 1}`}
            >
              {col}
            </p>
          ))}
        </div>

        {/* IMAGE GALLERY */}
        <div className="relative mb-16 animate-on-scroll">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
          <h2 className="text-center text-red-400 text-sm tracking-[0.3em] font-light relative bg-gray-50 inline-block left-1/2 -translate-x-1/2 px-6">
            PROJECT GALLERY
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, i) => (
            <div
              key={i}
              className={`group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 animate-on-scroll stagger-${(i % 6) + 1}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={`http://localhost:8080${img.url}`}
                  alt={img.caption || `Gallery image ${i + 1}`}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {img.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-light">{img.caption}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 animate-on-scroll">
        <div className="relative p-12 sm:p-16 rounded-lg bg-gradient-to-br from-gray-100 to-white border border-gray-200 shadow-xl overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200/30 to-red-200/30 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-800 mb-4 tracking-wide">
              Interested in Similar Projects?
            </h3>
            <p className="text-gray-600 text-sm mb-8 max-w-xl mx-auto leading-relaxed">
              Explore more of our portfolio or get in touch to discuss your vision
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-300 text-gray-800 text-xs font-semibold tracking-wider rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                VIEW ALL PROJECTS
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-400 to-amber-400 text-white text-xs font-semibold tracking-wider rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                START YOUR PROJECT
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="text-center py-16 text-gray-500 text-sm border-t border-gray-200 animate-on-scroll">
        <h3 className="text-lg font-light text-gray-800 mb-2 tracking-wide">
          J.B.K. Architecture
        </h3>
        <p className="text-xs tracking-wider">
          Creating timeless spaces
        </p>
        <p className="mt-4 text-xs">
          © 2025 J.B.K. Architecture — All Rights Reserved
        </p>
      </footer> */}
    </div>
  );
}