import React from "react";
import { Building2, Users, Award, Sparkles, ChevronDown } from "lucide-react";

export default function Aboutus() {
  const projectImages = [
    { title: "Modern Villa", category: "Residential", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop" },
    { title: "Corporate Hub", category: "Commercial", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop" },
    { title: "Urban Oasis", category: "Mixed Use", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop" },
    { title: "Skyline Tower", category: "High Rise", image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop" },
    { title: "Heritage Restoration", category: "Restoration", image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&h=600&fit=crop" },
    { title: "Innovation Center", category: "Corporate", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop" },
    { title: "Coastal Retreat", category: "Residential", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop" },
    { title: "Plaza Design", category: "Public Space", image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&h=600&fit=crop" },
    { title: "Boutique Hotel", category: "Hospitality", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop" },
  ];

  const strengths = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Hands-on approach",
      desc: "Our team oversees projects to maintain the highest standards.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Contemporary style",
      desc: "We draw inspiration from local environment and heritage.",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Comprehensive approach",
      desc: "We provide master planning and landscape design services.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Industry recognition",
      desc: "Featured in international architecture publications.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <style>{`
        * {-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}
        body {overflow-x: hidden;}

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* HERO */}
      <header className="relative text-center pt-16 pb-10 md:pt-20 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/40 to-transparent" />

        <div className="relative z-10">
          <div className="inline-block mb-4 px-8 py-2 bg-red-500/5 rounded-full border border-red-200/40 shadow-sm">
            <h1 className="text-gray-800 text-sm tracking-[0.4em] font-light">
              ABOUT US
            </h1>
          </div>

          <p className="mt-4 text-sm md:text-base text-gray-500 max-w-xl mx-auto font-light">
            Crafting spaces that balance functionality, emotion and timeless design.
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto mt-6" />
        </div>

        {/* small scroll hint, closer to card */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </header>

      {/* FOUNDERS / HERO IMAGE (pulled up to reduce gap) */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-24 -mt-6 md:-mt-10 relative z-10">
        <div className="relative group overflow-hidden rounded-2xl shadow-2xl border border-gray-100 bg-white">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop"
            alt="Founders"
            className="w-full h-auto transform-gpu transition-transform duration-500 group-hover:scale-105"
          />

          {/* red badge */}
          <div className="absolute top-6 right-6 z-20 animate-float">
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white px-6 py-3 text-xs font-bold shadow-xl rounded-md">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <div className="leading-tight">
                  <div>ARCHITECTURE</div>
                  <div className="text-[10px] uppercase tracking-wide">Top Fifty</div>
                </div>
              </div>
            </div>
          </div>

          {/* text over image */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-light mb-3 tracking-wide">
              Visionary Leadership
            </h2>
            <p className="text-xs md:text-sm text-gray-200 max-w-3xl leading-relaxed">
              Founded by pioneers in contemporary architecture and sustainable design,
              CENT’ANNI leads projects with an eye for detail, integrity and innovation.
            </p>
          </div>
        </div>

        {/* Philosophy + Vision & Mission Section */}
        <section className="mt-16 md:mt-20 max-w-6xl mx-auto px-2 md:px-4">
          {/* Section Title */}
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-gray-800 tracking-wide">
              Who We Are
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Philosophy Column */}
            <div
              className="group p-7 md:p-8 rounded-xl bg-white border border-gray-200 shadow-lg 
              hover:shadow-2xl hover:border-red-300 transition-all duration-500
              transform hover:-translate-y-2 opacity-0 translate-y-6 philosophy-card"
            >
              <div className="relative inline-block mb-4">
                <h3 className="text-red-500 text-xs md:text-sm tracking-[0.25em] font-light">
                  OUR PHILOSOPHY
                </h3>
                <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-500 -translate-x-1/2" />
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                CENT’ANNI is founded on the belief that architecture has the power to
                transform lives and communities. The quality of our surroundings directly
                influences our sense of wellbeing and belonging.
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Our philosophy focuses on balancing functionality, user experience,
                sustainability and emotional value. We evolve each space through a
                meaningful inside-out design approach.
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                At the intersection of simplicity, technology and creativity,
                CENT’ANNI creates designs enriched with environmental sensitivity and
                cultural context.
              </p>

              <p className="text-gray-600 text-sm leading-relaxed">
                Collaboration is central to our process. Guided by our clients’ visions
                and shaped by our experience, every project becomes a thoughtful and
                impactful architectural journey.
              </p>
            </div>

            {/* Vision & Mission Column */}
            <div
              className="group p-7 md:p-8 rounded-xl bg-white border border-gray-200 shadow-lg 
              hover:shadow-2xl hover:border-red-300 transition-all duration-500
              transform hover:-translate-y-2 opacity-0 translate-y-6 mission-card"
            >
              <div className="relative inline-block mb-4">
                <h3 className="text-red-500 text-xs md:text-sm tracking-[0.25em] font-light">
                  OUR VISION & MISSION
                </h3>
                <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-500 -translate-x-1/2" />
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                CENT’ANNI envisions becoming a leading architectural practice in the
                region and a globally recognized studio driven by design innovation and
                timeless quality.
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                We devote focused effort to delivering high-precision built environments
                through collaboration with structural, MEP and civil consultants,
                ensuring clarity and excellence at every stage.
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Our mission is to create architecture that is aesthetically meaningful,
                economically efficient and environmentally conscious — enriching
                communities and uplifting human experience.
              </p>

              <p className="text-gray-600 text-sm leading-relaxed">
                CENT’ANNI aims to be a practice shaped by people and for people — working
                toward a world that feels more alive, connected and beautifully livable.
              </p>
            </div>
          </div>
        </section>

        {/* Animation Styles for cards */}
        <style>{`
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .philosophy-card {
            animation: fadeUp 0.8s ease forwards;
            animation-delay: 0.1s;
          }
          .mission-card {
            animation: fadeUp 0.8s ease forwards;
            animation-delay: 0.3s;
          }
        `}</style>

        {/* Project Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 md:mt-20 px-2 md:px-4">
          {projectImages.map((img, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer bg-white"
            >
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-full object-cover transform-gpu transition-transform duration-300 group-hover:scale-105 aspect-video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <p className="text-white font-semibold text-sm mb-1">
                    {img.title}
                  </p>
                  <p className="text-red-400 text-xs tracking-wider">
                    {img.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strengths Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-32">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-8 py-2 bg-gradient-to-r from-red-500/10 via-red-500/10 to-red-500/10 rounded-full">
            <h2 className="text-red-400 text-lg tracking-[0.3em] font-light">
              STRENGTHS
            </h2>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {strengths.map((strength, idx) => (
            <div
              key={idx}
              className="p-8 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-red-200"
            >
              <div className="flex items-start gap-4">
                <div className="text-red-500">{strength.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 text-base">
                    {strength.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {strength.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
