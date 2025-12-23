import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ArrowRight,
  Building2,
  Users,
  Award,
  Sparkles,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Maximize2,
} from "lucide-react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

// 🔹 LOGO IMAGES (green text logos)
import logo1 from "../assets/Picture1.png";
import logo2 from "../assets/Picture2.png";
import logo4 from "../assets/Picture4.png";
import logo6 from "../assets/Picture6.png";
import logo7 from "../assets/Picture7.png";
import logo8 from "../assets/picture8.png";
import logo9 from "../assets/Picture9.png";
import logo10 from "../assets/Picture10.png";
import logo11 from "../assets/picture11.png";
import logo12 from "../assets/picture12.png";

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);

  //  images for About section from Cloudinary
  const [aboutImages, setAboutImages] = useState([]);

  //  Projects fetched for Featured Projects (only 3 most recent)
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  //  Scroll animation refs & state
  const aboutTextRef = useRef(null);
  const aboutImageRef = useRef(null);
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);

  const [aboutVisible, setAboutVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);

  //  HERO SLIDES – ONLY 3 FIXED CLOUDINARY IMAGES
  const [heroSlides] = useState([
    {
      image:
        "https://res.cloudinary.com/djw8eyyg4/image/upload/v1765191080/hotels/Hotel_Paharganj/Architecture/3.jpg",
      title: "Contemporary Architecture",
      subtitle: "Crafting Spaces That Inspire",
      cta: "Explore Projects",
    },
    {
      image:
        "https://res.cloudinary.com/djw8eyyg4/image/upload/v1765190986/hotels/Hotel_Kanpur/Architecure/3.jpg",
      title: "Interior Excellence",
      subtitle: "Where Design Meets Sophistication",
      cta: "Explore Projects",
    },
    {
      image:
        "https://res.cloudinary.com/djw8eyyg4/image/upload/v1765189409/hotels/Allenger/View_2.jpg",
      title: "Commercial Innovation",
      subtitle: "Building Tomorrow's Workspaces",
      cta: "Explore Projects",
    },
  ]);

  // Helper: get epoch ms from Mongo ObjectId if createdAt not present
  const getTimestampFromObjectId = (id = "") => {
    try {
      if (typeof id !== "string" || id.length < 8) return 0;
      return parseInt(id.substring(0, 8), 16) * 1000;
    } catch {
      return 0;
    }
  };

  // 🔹 Fetch Cloudinary images once:
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("/api/images");
        const data = res.data;

        let imagesArray = [];

        if (Array.isArray(data)) {
          imagesArray = data;
        } else if (Array.isArray(data.images)) {
          imagesArray = data.images;
        } else if (Array.isArray(data.resources)) {
          imagesArray = data.resources;
        } else {
          return;
        }

        const normalized = imagesArray
          .map((img) => ({
            publicId: img.publicId || img.public_id || img.id,
            url: img.url || img.secure_url,
          }))
          .filter((img) => img.url);

        const getId = (img) => (img.publicId || "").toLowerCase();

        const himachal = normalized.find((img) =>
          getId(img).includes("hotel_himachal")
        );
        const paharganj = normalized.find((img) =>
          getId(img).includes("hotel_paharganj")
        );

        const pickedAbout = [himachal, paharganj].filter(Boolean);
        setAboutImages(pickedAbout);
      } catch (err) {
        console.error("Error fetching /api/images:", err);
      }
    };

    fetchImages();
  }, []);

  // 🔹 hero slider auto-change
  useEffect(() => {
    if (!heroSlides.length) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // 🔹 Intersection Observer for scroll animations
  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.2,
    };

    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (
          entry.target === aboutTextRef.current ||
          entry.target === aboutImageRef.current
        ) {
          setAboutVisible(true);
        }

        if (entry.target === servicesRef.current) {
          setServicesVisible(true);
        }

        if (entry.target === projectsRef.current) {
          setProjectsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (aboutTextRef.current) observer.observe(aboutTextRef.current);
    if (aboutImageRef.current) observer.observe(aboutImageRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);

    return () => {
      if (aboutTextRef.current) observer.unobserve(aboutTextRef.current);
      if (aboutImageRef.current) observer.unobserve(aboutImageRef.current);
      if (servicesRef.current) observer.unobserve(servicesRef.current);
      if (projectsRef.current) observer.unobserve(projectsRef.current);
    };
  }, []);

  // ---------- New: fetch latest 3 projects from DB ----------
  useEffect(() => {
    let cancelled = false;

    const loadLatestProjects = async () => {
      setFeaturedLoading(true);
      try {
        // DO NOT change your endpoint
        const res = await axios.get("/api/v1/admin/project");
        const allProjects = res.data?.projects || [];

        // Sort by createdAt (newest first), fallback to startDate, fallback to ObjectId timestamp
        const sorted = allProjects.sort((a, b) => {
          const aDate =
            new Date(
              a.createdAt || a.startDate || getTimestampFromObjectId(a._id)
            ).getTime() || 0;
          const bDate =
            new Date(
              b.createdAt || b.startDate || getTimestampFromObjectId(b._id)
            ).getTime() || 0;
          return bDate - aDate;
        });

        const topThree = sorted.slice(0, 3).map((p) => {
          // same image logic as in Projects.jsx (relative -> prefix)
          const rawUrl = p.images?.[0]?.url;
          const API_BASE_URL = import.meta.env.VITE_API_URL;

          const firstImage = rawUrl
            ? rawUrl.startsWith("http")
              ? rawUrl
              : `${API_BASE_URL}${rawUrl}`
            : "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop";

          const year = p.startDate
            ? new Date(p.startDate).getFullYear()
            : p.createdAt
            ? new Date(p.createdAt).getFullYear()
            : "----";

          return {
            id: p._id,
            title: p.name || p.title || "Untitled Project",
            category: p.type || "Project",
            location: p.location || "Location",
            year,
            image: firstImage,
            desc:
              p.description ||
              "A contemporary piece of architecture showcasing design excellence.",
          };
        });

        if (!cancelled) {
          setFeaturedProjects(topThree);
        }
      } catch (err) {
        console.error("Error fetching projects for home featured:", err);
      } finally {
        if (!cancelled) setFeaturedLoading(false);
      }
    };

    loadLatestProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = [
    {
      number: "500+",
      label: "Projects Completed",
      icon: <Building2 className="w-8 h-8" />,
    },
    {
      number: "50+",
      label: "Team Members",
      icon: <Users className="w-8 h-8" />,
    },
    {
      number: "20+",
      label: "Years Experience",
      icon: <Award className="w-8 h-8" />,
    },
    {
      number: "100+",
      label: "Happy Clients",
      icon: <Sparkles className="w-8 h-8" />,
    },
  ];

  const services = [
    {
      title: "Architecture",
      desc: "Contemporary structures and sustainable design solutions for residential and commercial projects.",
      icon: "A",
    },
    {
      title: "Interior Design",
      desc: "Sophisticated interior spaces that blend functionality with aesthetic excellence.",
      icon: "I",
    },
    {
      title: "Commercial Spaces",
      desc: "Innovative office and retail environments designed for modern businesses.",
      icon: "C",
    },
    {
      title: "Product Design",
      desc: "Custom furniture and lighting collections that combine craft with creativity.",
      icon: "P",
    },
  ];

  // 🔹 All company logos used in carousel
  const partners = [
    { name: "Group108", logo: logo1, url: "https://www.group-108.com/" },
    { name: "Allengers", logo: logo2, url: "https://www.allengers.com/" },
    { name: "FORVIA", logo: logo4, url: "https://www.hella.com/en/" },
    { name: "Mobec", logo: logo6, url: "https://mobec.io/" },
    { name: "BAANTALAI", logo: logo7, url: "https://baantalai.com/" },
    {
      name: "indo asia tour",
      logo: logo8,
      url: "https://www.indoasia-tours.com/",
    },
    { name: "ispace", logo: logo9, url: "https://www.ispace.com/" },
    { name: "VAS", logo: logo10, url: "https://modern.com" },
    { name: "DHALIWALS", logo: logo11, url: "https://modern.com" },
    { name: "YASHIKA INFOTRONICS", logo: logo12, url: "https://modern.com" },
  ];

  return (
    <>
      <style>{`
        @keyframes scroll { 
          0% { transform: translateX(0); } 
          100% { transform: translateX(-100%); } 
        }
        @keyframes slowZoom { 0%, 100% { transform: scale(1.05); } 50% { transform: scale(1.1); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounceSlow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-scroll { animation: scroll 40s linear infinite; }
        .animate-slow-zoom { animation: slowZoom 20s ease-in-out infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fade-in { animation: fadeInUp 1s ease-out forwards; }
        .animate-bounce-slow { animation: bounceSlow 2s ease-in-out infinite; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }

        /* Cross-browser 3-line clamp (works without Tailwind plugin) */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          max-height: 4.5em; /* approx 3 lines at 1.5em line-height */
          line-height: 1.5em;
        }
      `}</style>

      <div className="bg-white text-gray-800">
        {/* HERO SECTION */}
        <section className="relative h-screen overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
              {slide && (
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transform scale-105 animate-slow-zoom"
                />
              )}
            </div>
          ))}

          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
            <div className="mb-4 overflow-hidden">
              <p className="text-sm tracking-[0.3em] text-red-500 font-light uppercase animate-fade-in-up">
                SINCE 2019
              </p>
            </div>
            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight text-white animate-fade-in-up animation-delay-200">
                {heroSlides[currentSlide]?.title}
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="text-xl md:text-2xl text-gray-200 mb-12 font-light max-w-2xl animate-fade-in-up animation-delay-400">
                {heroSlides[currentSlide]?.subtitle}
              </p>
            </div>
            <div className="flex gap-4 animate-fade-in-up animation-delay-600">
              {/* pill CTA buttons */}
              <button
                onClick={() => navigate("/projects")}
                className="px-8 py-4 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50 active:scale-95"
              >
                {heroSlides[currentSlide]?.cta}
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                GET IN TOUCH
              </button>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 rounded-full transition-all duration-500 hover:scale-110 ${
                  currentSlide === index
                    ? "w-12 bg-red-600"
                    : "w-8 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
          <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 animate-bounce-slow">
            <span className="text-xs tracking-widest text-white">SCROLL</span>
            <ChevronDown className="w-5 h-5 text-white" />
          </div>
        </section>

        {/* COMPANY LOGO CAROUSEL */}
        <section className="py-10 bg-gray-50 border-y border-gray-200 overflow-hidden">
          <div className="text-center mb-8">
            <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium">
              Trusted By Industry Leaders
            </p>
          </div>
          <div className="relative">
            <div className="text-gray-400 text-sm tracking-widest mb-6 text-center">
              Our Partners
            </div>
            <div className="flex gap-16 px-8 animate-scroll">
              {partners.map((partner, index) => (
                <a
                  key={index}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center min-w-[200px] group transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <div className="w-40 h-16 flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-2 tracking-widest group-hover:text-red-500 transition-colors duration-300">
                    {partner.name.toUpperCase()}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION with scroll left-right / right-left animation */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            {/* TEXT */}
            <div
              ref={aboutTextRef}
              className={`space-y-6 transition-all duration-1000 ease-out ${
                aboutVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-16"
              }`}
            >
              <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium">
                ABOUT US
              </p>

              {/* Typography flair with tighter space between B & uilding */}
              <div className="flex items-baseline gap-1 md:gap-2">
                <span className="text-6xl md:text-7xl text-red-600 font-light leading-none">
                  B
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                  uilding Dreams Since 2019
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Founded in 2019, CENT’ANNI is a young, multi-disciplinary
                architecture firm driven by the belief that great design can
                shape communities. Rooted in collaboration, sustainability, and
                meticulous attention to detail, the studio crafts bespoke
                solutions that balance beauty, efficiency, and innovation across
                hospitality, residential, commercial, industrial, and
                competition projects.
              </p>
              <p className="text-gray-600 leading-relaxed">
                In just a few years, CENT’ANNI has grown from a small practice
                into a trusted name, consistently delivering thoughtful,
                enduring spaces that challenge conventions and set new
                benchmarks in every context they touch.
              </p>
              {/* pill Learn More button */}
              <button className="px-8 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-600/30 active:scale-95 mt-4 group">
                <span className="flex items-center gap-2">
                  LEARN MORE
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>

            {/* IMAGES */}
            <div
              ref={aboutImageRef}
              className={`grid grid-cols-2 gap-4 transition-all duration-1000 ease-out ${
                aboutVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-16"
              }`}
            >
              <div className="overflow-hidden rounded-lg group shadow-lg shadow-black/5">
                <img
                  src={
                    aboutImages[0]?.url ||
                    "https://res.cloudinary.com/djw8eyyg4/image/upload/v1765190972/hotels/Hotel_Kanpur/Architecure/2.jpg"
                  }
                  alt={aboutImages[0]?.publicId || "Interior 1"}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="overflow-hidden rounded-lg group shadow-lg shadow-black/5">
                <img
                  src={
                    aboutImages[1]?.url ||
                    "https://res.cloudinary.com/djw8eyyg4/image/upload/v1765189409/hotels/Allenger/View_2.jpg"
                  }
                  alt={aboutImages[1]?.publicId || "Interior 2"}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES – scroll bottom to top with stagger */}
        <section className="py-10 bg-white">
          <div ref={servicesRef} className="max-w-7xl mx-auto px-4">
            <div
              className={`text-center mb-16 transform transition-all duration-1000 ${
                servicesVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium mb-4">
                OUR SERVICES
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Comprehensive Design Solutions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From architecture to interiors, we offer full-spectrum design
                services
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`p-8 bg-gray-50 hover:bg-white border-2 border-gray-100 hover:border-red-600 transition-all duration-700 group cursor-pointer hover:shadow-2xl hover:shadow-red-600/10 hover:-translate-y-2 transform ${
                    servicesVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDelay: servicesVisible
                      ? `${index * 120}ms`
                      : "0ms",
                  }}
                >
                  <div className="w-16 h-16 bg-red-600 group-hover:bg-red-700 text-white rounded-xl flex items-center justify-center text-2xl font-light mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS – fetches 3 latest from DB */}
        <section className="py-10 bg-gray-50">
          <div ref={projectsRef} className="max-w-7xl mx-auto px-4">
            <div
              className={`text-center mb-16 transform transition-all duration-1000 ${
                projectsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium mb-4">
                FEATURED WORK
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Recent Projects
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our latest architectural and design achievements
              </p>
            </div>

            {/* Loading / Empty handling */}
            {featuredLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : featuredProjects.length === 0 ? (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No recent projects yet.</p>
                <div className="mt-4">
                  <button
                    onClick={() => navigate("/projects")}
                    className="px-6 py-2 bg-red-600 text-white rounded-full"
                  >
                    View All Projects
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 transform ${
                      projectsVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{
                      transitionDelay: projectsVisible
                        ? `${index * 130}ms`
                        : "0ms",
                    }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <div className="relative overflow-hidden h-64">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4">
                        <span
                          className="inline-flex items-center px-6 py-2 rounded-full
  bg-gradient-to-r from-red-500 via-red-600 to-red-700
  text-white text-xs font-semibold uppercase tracking-[0.2em] shadow-lg"
                        >
                          {project.category}
                        </span>
                      </div>
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                          hoveredProject === project.id
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <Maximize2 className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-medium mb-2 text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {project.year}
                        </span>
                      </div>
                      {/* clamped description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {project.desc}
                      </p>
                      <button className="text-red-600 font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300 hover:text-red-700 px-4 py-2 rounded-full hover:bg-red-50">
                        VIEW PROJECT
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/projects")}
                className="px-10 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-600/30 active:scale-95"
              >
                VIEW ALL PROJECTS
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
