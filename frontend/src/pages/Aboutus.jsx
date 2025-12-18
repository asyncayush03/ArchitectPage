import React, { useEffect, useRef, useState } from "react";
import { Building2, Users, Award, Sparkles, ChevronDown, ArrowRight } from "lucide-react";

export default function Aboutus() {
  const workSamples = [
    {
      title: "Modern Villa",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    },
    {
      title: "Corporate Hub",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    },
    {
      title: "Urban Oasis",
      category: "Mixed Use",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    },
    {
      title: "Skyline Tower",
      category: "High Rise",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
    },
    {
      title: "Heritage Restoration",
      category: "Restoration",
      image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&h=600&fit=crop",
    },
    {
      title: "Innovation Center",
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    },
  ];

  const strengths = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Hands-on Approach",
      desc: "Our team oversees projects to maintain the highest standards of quality and precision.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Contemporary Style",
      desc: "We draw inspiration from local environment and cultural heritage.",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Comprehensive Approach",
      desc: "We provide master planning and landscape design services.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Industry Recognition",
      desc: "Featured in international architecture publications.",
    },
  ];

  const whoRef = useRef(null);
  const strengthsRef = useRef(null);
  const projectsRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const [whoVisible, setWhoVisible] = useState(false);
  const [strengthsVisible, setStrengthsVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);

  useEffect(() => {
    const options = { root: null, threshold: 0.2 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (entry.target === whoRef.current) {
          setWhoVisible(true);
        }
        if (entry.target === strengthsRef.current) {
          setStrengthsVisible(true);
        }
        if (entry.target === projectsRef.current) {
          setProjectsVisible(true);
        }
      });
    }, options);

    if (whoRef.current) observer.observe(whoRef.current);
    if (strengthsRef.current) observer.observe(strengthsRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);

    return () => {
      if (whoRef.current) observer.unobserve(whoRef.current);
      if (strengthsRef.current) observer.unobserve(strengthsRef.current);
      if (projectsRef.current) observer.unobserve(projectsRef.current);
    };
  }, []);

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <style>{`
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        .animate-fade-in-up { 
          animation: fadeInUp 0.8s ease-out forwards; 
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
      `}</style>

      {/* HERO SECTION */}
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
              ABOUT OUR STUDIO
            </p>
          </div>

          <div className="overflow-hidden">
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight text-gray-900 animate-fade-in-up delay-100">
              Who We Are
            </h1>
          </div>

          <div className="overflow-hidden">
            <p className="text-xl text-gray-600 mb-12 font-light max-w-2xl mx-auto animate-fade-in-up delay-200">
              Crafting spaces that balance functionality, emotion and timeless design through visionary leadership and innovative solutions.
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-white">
        {/* Philosophy & Vision Section */}
        <section ref={whoRef} className="py-24 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium mb-3">
                OUR FOUNDATION
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Philosophy, Vision & Mission
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Philosophy */}
              <div
                className={`group p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-500 transform ${
                  whoVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: whoVisible ? "0ms" : "0ms" }}
              >
                <h3 className="text-red-600 text-sm tracking-[0.2em] font-medium uppercase mb-4">
                  Philosophy
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  CENT'ANNI is founded on the belief that architecture has the power to transform lives and communities. Quality surroundings directly influence our sense of wellbeing and belonging.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We balance functionality, user experience, sustainability and emotional value through meaningful inside-out design.
                </p>
              </div>

              {/* Vision */}
              <div
                className={`group p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-500 transform ${
                  whoVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: whoVisible ? "120ms" : "0ms" }}
              >
                <h3 className="text-red-600 text-sm tracking-[0.2em] font-medium uppercase mb-4">
                  Vision
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  CENT'ANNI envisions becoming a leading architectural practice in the region and globally recognized studio driven by design innovation and timeless quality.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We deliver high-precision built environments through collaboration with structural, MEP and civil consultants.
                </p>
              </div>

              {/* Mission */}
              <div
                className={`group p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-500 transform ${
                  whoVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: whoVisible ? "240ms" : "0ms" }}
              >
                <h3 className="text-red-600 text-sm tracking-[0.2em] font-medium uppercase mb-4">
                  Mission
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Our mission is to create architecture that is aesthetically meaningful, economically efficient and environmentally conscious.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We enrich communities and uplift human experience through spaces shaped by people and for people.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strengths Section */}
        <section ref={strengthsRef} className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium mb-3">
                WHAT SETS US APART
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Our Strengths
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {strengths.map((strength, idx) => (
                <div
                  key={idx}
                  className={`group p-8 bg-white rounded-2xl border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-500 transform ${
                    strengthsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: strengthsVisible ? `${idx * 120}ms` : "0ms",
                  }}
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      {strength.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {strength.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {strength.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Samples - Image Grid with Hover Overlay */}
        <section ref={projectsRef} className="py-24 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium mb-3">
                FEATURED WORKS
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Our Work Samples
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workSamples.map((work, index) => (
                <div
                  key={index}
                  className={`group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in-up ${
                    projectsVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    animationDelay: projectsVisible ? `${(index % 3) * 0.1}s` : "0ms",
                    opacity: projectsVisible ? 1 : 0,
                  }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Background Image */}
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay - Always visible dark overlay */}
                  <div className="absolute inset-0 bg-black/40 transition-all duration-500" />

                  {/* Content Overlay - Shows on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8 transition-all duration-500 ${
                      hoveredProject === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="transform transition-all duration-500">
                      <span className="inline-block px-4 py-1 bg-red-600 text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-sm mb-4">
                        {work.category}
                      </span>
                      <h3 className="text-2xl font-semibold text-white mb-3">
                        {work.title}
                      </h3>
                      <p className="text-gray-200 text-sm leading-relaxed mb-5">
                        A contemporary architectural solution showcasing innovation and timeless design principles.
                      </p>
                      <button className="text-sm font-semibold text-red-400 flex items-center gap-2 uppercase tracking-wide hover:text-red-300 transition-colors duration-300 group/btn">
                        VIEW PROJECT
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}