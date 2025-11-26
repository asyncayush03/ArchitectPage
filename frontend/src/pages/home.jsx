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

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);

  // Hero Slides
  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop",
      title: "Contemporary Architecture",
      subtitle: "Crafting Spaces That Inspire",
      cta: "Explore Projects",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&h=1080&fit=crop",
      title: "Interior Excellence",
      subtitle: "Where Design Meets Sophistication",
      cta: "View Interiors",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop",
      title: "Commercial Innovation",
      subtitle: "Building Tomorrow's Workspaces",
      cta: "Discover More",
    },
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Featured Projects
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

  // Stats
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

  // Services
  const services = [
    {
      title: "Architecture",
      desc: "Contemporary structures and sustainable design solutions for residential and commercial projects.",
      icon: "A",
      color: "from-red-600 to-red-700",
    },
    {
      title: "Interior Design",
      desc: "Sophisticated interior spaces that blend functionality with aesthetic excellence.",
      icon: "I",
      color: "from-gray-700 to-gray-800",
    },
    {
      title: "Commercial Spaces",
      desc: "Innovative office and retail environments designed for modern businesses.",
      icon: "C",
      color: "from-red-600 to-red-700",
    },
    {
      title: "Product Design",
      desc: "Custom furniture and lighting collections that combine craft with creativity.",
      icon: "P",
      color: "from-gray-700 to-gray-800",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <style>{`
        * {-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}
        body {overflow-x: hidden;}
        @keyframes fade-in {from {opacity: 0;transform: translateY(20px);}to {opacity: 1;transform: translateY(0);}}
        @keyframes slide-up {from {opacity: 0;transform: translateY(40px);}to {opacity: 1;transform: translateY(0);}}
        @keyframes float {0%, 100% { transform: translateY(0px); }50% { transform: translateY(-10px); }}
        .animate-fade-in {animation: fade-in 0.8s ease-out;}
        .animate-slide-up {animation: slide-up 1s ease-out;}
        .animate-float {animation: float 3s ease-in-out infinite;}
        .scroll-indicator {animation: bounce 2s infinite;}
        @keyframes bounce {0%, 100% { transform: translateY(0); }50% { transform: translateY(10px); }}
        @keyframes scroll {0% { transform: translateX(0); }100% { transform: translateX(-50%); }}
        .animate-scroll {animation: scroll 30s linear infinite;}
        .animate-scroll:hover {animation-play-state: paused;}
      `}</style>

      {/* Hero Section with Slideshow */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl animate-slide-up">
              <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-red-600/30 via-gray-800/30 to-red-600/30 backdrop-blur-sm rounded-full border border-red-500/30">
                <p className="text-white text-xs tracking-[0.4em] font-light">
                  SINCE 2002
                </p>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight leading-tight">
                {heroSlides[currentSlide].title}
              </h1>

              <p className="text-xl sm:text-2xl text-gray-200 mb-8 font-light">
                {heroSlides[currentSlide].subtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold tracking-wider rounded-full hover:shadow-2xl hover:shadow-red-600/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white text-sm font-semibold tracking-wider rounded-full border-2 border-red-500/50 hover:bg-red-600/20 hover:border-red-500 transition-all duration-300">
                  GET IN TOUCH
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-12 bg-gradient-to-r from-red-600 to-red-700"
                  : "w-8 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="w-6 h-6 text-white/70" />
        </div>
      </section>

      {/* Partners Carousel */}
      <section className="py-16 bg-black border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-gray-400 text-xs tracking-[0.4em] font-light uppercase mb-2">
              Trusted By Industry Leaders
            </p>
            <h3 className="text-2xl font-light text-white">Our Partners</h3>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center gap-12 px-6">
                  {[
                    { name: "Godrej" },
                    { name: "Tata" },
                    { name: "Birla" },
                    { name: "Mahindra" },
                    { name: "DLF" },
                    { name: "Lodha" },
                  ].map((partner, index) => (
                    <div
                      key={`${setIndex}-${index}`}
                      className="flex-shrink-0 w-40 h-20 flex items-center justify-center bg-white/5 rounded-lg border border-gray-800 hover:border-red-600/50 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className="text-gray-400 group-hover:text-white transition-colors text-center px-4">
                        <div className="font-semibold text-lg">
                          {partner.name}
                        </div>
                        <div className="text-xs text-gray-600 group-hover:text-gray-400">
                          PARTNER
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="animate-fade-in">
              <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-red-600/20 via-gray-700/20 to-red-600/20 rounded-full border border-red-500/30">
                <p className="text-gray-300 text-xs tracking-[0.4em] font-light">
                  ABOUT US
                </p>
              </div>

              <h2 className="text-4xl sm:text-5xl font-light text-white mb-6 tracking-tight">
                Building Dreams Since 2002
              </h2>

              <p className="text-gray-300 leading-relaxed mb-6">
                J.B.K. Architecture is a highly respected firm founded by Indar
                Bir Mehta, Ar. Jyoti Dabir, and Ar. K.R. Mehta Chitrkar. We
                specialize in contemporary and sustainable design, offering
                comprehensive services from conception to completion.
              </p>

              <p className="text-gray-400 leading-relaxed mb-8">
                Our projects have been featured in international architecture
                publications, and we're recognized for our holistic approach to
                creating spaces that inspire and endure.
              </p>

              <button className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold tracking-wider rounded-full hover:shadow-xl hover:shadow-red-600/50 transform hover:scale-105 transition-all duration-300">
                LEARN MORE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop"
                  alt="Architecture 1"
                  className="rounded-lg shadow-xl w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"
                  alt="Architecture 2"
                  className="rounded-lg shadow-xl w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&h=400&fit=crop"
                  alt="Architecture 3"
                  className="rounded-lg shadow-xl w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"
                  alt="Architecture 4"
                  className="rounded-lg shadow-xl w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black relative overflow-hidden border-y border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-gray-800/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-red-600 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl sm:text-5xl font-light text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-8 py-2 bg-gradient-to-r from-red-600/20 via-gray-700/20 to-red-600/20 rounded-full border border-red-500/30">
              <p className="text-gray-300 text-xs tracking-[0.4em] font-light">
                OUR SERVICES
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-light text-white mb-4 tracking-tight">
              Comprehensive Design Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From architecture to interiors, we offer full-spectrum design
              services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-red-600/50 shadow-lg hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-500 text-center animate-fade-in backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center text-3xl font-light text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {service.icon}
                </div>
                <h3 className="font-semibold text-white mb-3 text-lg group-hover:text-red-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-8 py-2 bg-gradient-to-r from-red-600/20 via-gray-700/20 to-red-600/20 rounded-full border border-red-500/30">
              <p className="text-gray-300 text-xs tracking-[0.4em] font-light">
                FEATURED WORK
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-light text-white mb-4 tracking-tight">
              Recent Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Explore our latest architectural and design achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:shadow-2xl transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-1 text-xs font-semibold text-gray-800 tracking-wide uppercase">
                      {project.category}
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <Maximize2 className="w-5 h-5 text-gray-800" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-500 z-10"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                    <h3 className="text-xl font-light mb-2 tracking-wide group-hover:text-red-500 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-4 mb-3 text-xs text-gray-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{project.year}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-200 leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {project.desc}
                    </p>

                    <div className="flex items-center gap-2 text-red-500 text-xs font-semibold tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span>VIEW PROJECT</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold tracking-wider rounded-full hover:shadow-xl hover:shadow-red-600/50 transform hover:scale-105 transition-all duration-300">
              VIEW ALL PROJECTS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden border-t border-gray-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-600/20 to-gray-800/20 rounded-full blur-3xl animate-float"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-light text-white mb-6 tracking-tight">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Let's collaborate to bring your architectural vision to life. Our
            team is ready to create something exceptional.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold tracking-wider rounded-full hover:shadow-2xl hover:shadow-red-600/50 transform hover:scale-105 transition-all duration-300">
              <Mail className="w-5 h-5" />
              GET IN TOUCH
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="tel:+912212345678"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white text-sm font-semibold tracking-wider rounded-full border-2 border-red-500/50 hover:bg-red-600/20 hover:border-red-500 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              CALL US NOW
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
