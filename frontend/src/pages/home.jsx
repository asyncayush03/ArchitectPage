import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Maximize2
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);

  // Hero Slides
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop",
      title: "Contemporary Architecture",
      subtitle: "Crafting Spaces That Inspire",
      cta: "Explore Projects"
    },
    {
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&h=1080&fit=crop",
      title: "Interior Excellence",
      subtitle: "Where Design Meets Sophistication",
      cta: "View Interiors"
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop",
      title: "Commercial Innovation",
      subtitle: "Building Tomorrow's Workspaces",
      cta: "Discover More"
    }
  ];

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Featured Projects
  const featuredProjects = [
    {
      id: 1,
      title: "Modern Villa Residence",
      category: "Architecture",
      location: "Mumbai, India",
      year: "2024",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      desc: "A contemporary residential masterpiece blending minimalist design with sustainable architecture."
    },
    {
      id: 2,
      title: "Corporate Headquarters",
      category: "Commercial",
      location: "Bangalore, India",
      year: "2024",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      desc: "Dynamic office space designed to foster collaboration and innovation."
    },
    {
      id: 3,
      title: "Luxury Penthouse",
      category: "Interior",
      location: "Delhi, India",
      year: "2024",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop",
      desc: "Sophisticated interior design featuring bespoke furniture and elegant materials."
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed", icon: <Building2 className="w-8 h-8" /> },
    { number: "50+", label: "Team Members", icon: <Users className="w-8 h-8" /> },
    { number: "20+", label: "Years Experience", icon: <Award className="w-8 h-8" /> },
    { number: "100+", label: "Happy Clients", icon: <Sparkles className="w-8 h-8" /> }
  ];

  const services = [
    { title: "Architecture", desc: "Contemporary structures...", icon: "A", color: "from-red-400 to-amber-400" },
    { title: "Interior Design", desc: "Sophisticated interior spaces...", icon: "I", color: "from-amber-400 to-red-400" },
    { title: "Commercial Spaces", desc: "Innovative office environments...", icon: "C", color: "from-red-400 to-amber-400" },
    { title: "Product Design", desc: "Custom furniture & lighting...", icon: "P", color: "from-amber-400 to-red-400" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-6xl text-white font-light mb-6">{heroSlides[currentSlide].title}</h1>
            <p className="text-2xl text-gray-200 mb-8">{heroSlides[currentSlide].subtitle}</p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/projects")}
                className="px-8 py-4 bg-gradient-to-r from-red-400 to-amber-400 text-white rounded-full flex gap-2 items-center"
              >
                {heroSlides[currentSlide].cta}
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all ${
                currentSlide === index ? "w-12 bg-gradient-to-r from-red-400 to-amber-400" : "w-8 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-amber-400 mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-5xl text-white font-light">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 bg-white shadow-xl rounded-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${service.color} rounded-full flex justify-center items-center text-3xl text-white`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="relative group overflow-hidden rounded-lg shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-96">
                  <img src={project.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-light mb-2">{project.title}</h3>

                    <div className="flex gap-4 text-xs text-gray-300 mb-3">
                      <div className="flex gap-1"><MapPin className="w-3" /> {project.location}</div>
                      <div className="flex gap-1"><Calendar className="w-3" /> {project.year}</div>
                    </div>

                    <p className="opacity-0 group-hover:opacity-100 transition-all">{project.desc}</p>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 text-amber-400 transition-all mt-3">
                      VIEW PROJECT <ArrowRight className="w-4" />
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
