import React, { useState, useEffect } from "react";
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

// 🔹 LOGO IMAGES (green text logos)
import logo1 from "../assets/Picture1.png";
import logo2 from "../assets/Picture2.png";
import logo4 from "../assets/Picture4.png";
import logo6 from "../assets/Picture6.png";
import logo7 from "../assets/Picture7.png";
import logo8 from "../assets/Picture8.png";
import logo9 from "../assets/Picture9.png";
import logo10 from "../assets/Picture10.png";
import logo11 from "../assets/picture11.png";
import logo12 from "../assets/picture12.png";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);

  // 👇 images for About section from Cloudinary
  const [aboutImages, setAboutImages] = useState([]);

  // 👇 HERO SLIDES – ONLY 3 FIXED CLOUDINARY IMAGES
  //    👉 Put your 3 Cloudinary URLs here
  const [heroSlides] = useState([
    {
      image: "https://res.cloudinary.com/djw8eyyg4/image/upload/v1765191080/hotels/Hotel_Paharganj/Architecture/3.jpg", // e.g. "https://res.cloudinary.com/.../hero1.jpg"
      title: "Contemporary Architecture",
      subtitle: "Crafting Spaces That Inspire",
      cta: "Explore Projects",
    },
    {
      image: "https://res.cloudinary.com/djw8eyyg4/image/upload/v1765190986/hotels/Hotel_Kanpur/Architecure/3.jpg",
      title: "Interior Excellence",
      subtitle: "Where Design Meets Sophistication",
      cta: "View Interiors",
    },
    {
      image: "https://res.cloudinary.com/djw8eyyg4/image/upload/v1765189409/hotels/Allenger/View_2.jpg",
      title: "Commercial Innovation",
      subtitle: "Building Tomorrow's Workspaces",
      cta: "Discover More",
    },
  ]);

  // 🔹 Fetch Cloudinary images once:
  //    - set aboutImages (specific publicIds)
  //    (no longer touches heroSlides)
  useEffect(() => {
    const url = "http://localhost:8080/api/images";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("🔍 RAW /api/images response:", data);

        let imagesArray = [];

        if (Array.isArray(data)) {
          imagesArray = data;
        } else if (Array.isArray(data.images)) {
          imagesArray = data.images;
        } else if (Array.isArray(data.resources)) {
          imagesArray = data.resources;
        } else {
          console.log("❌ No images array found in response");
          return;
        }

        const normalized = imagesArray
          .map((img) => ({
            publicId: img.publicId || img.public_id || img.id,
            url: img.url || img.secure_url,
          }))
          .filter((img) => img.url);

        console.log("✅ Normalized images:", normalized);

        // ====== ABOUT IMAGES ONLY ======
        const getId = (img) => (img.publicId || "").toLowerCase();

        const himachal = normalized.find((img) =>
          getId(img).includes("hotel_himachal")
        );
        const paharganj = normalized.find((img) =>
          getId(img).includes("hotel_paharganj")
        );

        const pickedAbout = [himachal, paharganj].filter(Boolean);
        console.log("✅ About images picked:", pickedAbout);
        setAboutImages(pickedAbout);
      })
      .catch((err) => {
        console.error("Error fetching /api/images:", err);
      });
  }, []);

  // hero slider auto-change
  useEffect(() => {
    if (!heroSlides.length) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const featuredProjects = [
    {
      id: 1,
      title: "Modern Villa Residence",
      category: "Architecture",
      location: "Mumbai, India",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      desc: "A contemporary residential masterpiece blending minimalist design with sustainable architecture.",
    },
    {
      id: 2,
      title: "Corporate Headquarters",
      category: "Commercial",
      location: "Bangalore, India",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      desc: "Dynamic office space designed to foster collaboration and innovation.",
    },
    {
      id: 3,
      title: "Luxury Penthouse",
      category: "Interior",
      location: "Delhi, India",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop",
      desc: "Sophisticated interior design featuring bespoke furniture and elegant materials.",
    },
  ];

  const stats = [
    {
      number: "500+",
      label: "Projects Completed",
      icon: <Building2 className="w-8 h-8" />,
    },
    { number: "50+", label: "Team Members", icon: <Users className="w-8 h-8" /> },
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
              <button className="px-8 py-4 bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50 active:scale-95">
                {heroSlides[currentSlide]?.cta}
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-medium hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 active:scale-95">
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
        <section className="py-16 bg-gray-50 border-y border-gray-200 overflow-hidden">
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

        {/* ABOUT SECTION */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-fade-in">
              <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium">
                ABOUT US
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Building Dreams Since 2019
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2019, CENT’ANNI is a young, multi-disciplinary architecture firm driven by the belief that great design can shape communities. Rooted in collaboration, sustainability, and meticulous attention to detail, the studio crafts bespoke solutions that balance beauty, efficiency, and innovation across hospitality, residential, commercial, industrial, and competition projects.
              </p>
              <p className="text-gray-600 leading-relaxed">
                In just a few years, CENT’ANNI has grown from a small practice into a trusted name, consistently delivering thoughtful, enduring spaces that challenge conventions and set new benchmarks in every context they touch.
              </p>
              <button className="px-8 py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-600/30 active:scale-95 mt-4 group">
                <span className="flex items-center gap-2">
                  LEARN MORE
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg group">
                <img
                  src={
                    aboutImages[0]?.url ||
                    "https://res.cloudinary.com/djw8eyyg4/image/upload/v1765190972/hotels/Hotel_Kanpur/Architecure/2.jpg"
                  }
                  alt={aboutImages[0]?.publicId || "Interior 1"}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-lg mt-8 group">
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

        {/* SERVICES */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
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
                  className="p-8 bg-gray-50 hover:bg-white border-2 border-gray-100 hover:border-red-600 transition-all duration-300 group cursor-pointer hover:shadow-2xl hover:shadow-red-600/10 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-red-600 group-hover:bg-red-700 text-white rounded-lg flex items-center justify-center text-2xl font-light mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
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

        {/* FEATURED PROJECTS */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-red-600 text-white text-xs font-medium uppercase tracking-wider">
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
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {project.desc}
                    </p>
                    <button className="text-red-600 font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300 hover:text-red-700">
                      VIEW PROJECT
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-600/30 active:scale-95">
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
