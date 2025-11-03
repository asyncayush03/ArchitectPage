import React, { useState } from "react";
import { Building2, Users, Award, Sparkles, ChevronDown } from "lucide-react";
import modernVilla from "../assets/projects/modern.jpg";
import corporateHub from "../assets/projects/modern.jpg";
import urbanOasis from "../assets/projects/modern.jpg";
import skylineTower from "../assets/projects/modern.jpg";
import heritageRestoration from "../assets/projects/modern.jpg";
import innovationCenter from "../assets/projects/modern.jpg";
import coastalRetreat from "../assets/projects/modern.jpg";
import plazaDesign from "../assets/projects/modern.jpg";
import boutiqueHotel from "../assets/projects/modern.jpg";

export default function Studio() {
  const [hoveredMember, setHoveredMember] = useState(null);

  const architects = [
    { id: 1, name: 'Architect 1', role: 'Senior Architect', image: '' },
    { id: 2, name: 'Architect 2', role: 'Lead Designer', image: '' },
    { id: 3, name: 'Architect 3', role: 'Project Architect', image: '' },
    { id: 4, name: 'Architect 4', role: 'Design Architect', image: '' },
    { id: 5, name: 'Architect 5', role: 'Associate', image: '' },
    { id: 6, name: 'Architect 6', role: 'Associate', image: '' },
    { id: 7, name: 'Architect 7', role: 'Junior Architect', image: '' },
    { id: 8, name: 'Architect 8', role: 'Junior Architect', image: '' },
  ];

  const designers = [
    { id: 1, name: 'Designer 1', role: 'Creative Director' },
    { id: 2, name: 'Designer 2', role: 'Senior Designer' },
    { id: 3, name: 'Designer 3', role: 'Graphic Designer' },
    { id: 4, name: 'Designer 4', role: '3D Specialist' },
    { id: 5, name: 'Designer 5', role: 'Visualization' },
    { id: 6, name: 'Designer 6', role: 'Design Associate' },
    { id: 7, name: 'Designer 7', role: 'Design Associate' },
  ];

  const interiorConcept = [
    { id: 1, name: 'Interior 1', role: 'Lead Designer' },
    { id: 2, name: 'Interior 2', role: 'Space Planner' },
    { id: 3, name: 'Interior 3', role: 'Designer' },
    { id: 4, name: 'Interior 4', role: 'Designer' },
    { id: 5, name: 'Interior 5', role: 'Associate' },
    { id: 6, name: 'Interior 6', role: 'Associate' },
    { id: 7, name: 'Interior 7', role: 'Junior Designer' },
    { id: 8, name: 'Interior 8', role: 'Junior Designer' },
    { id: 9, name: 'Interior 9', role: 'Intern' },
  ];

  const constructionMgmt = [
    { id: 1, name: 'Construction 1', role: 'Project Manager' },
    { id: 2, name: 'Construction 2', role: 'Site Engineer' },
    { id: 3, name: 'Construction 3', role: 'Supervisor' },
    { id: 4, name: 'Construction 4', role: 'Coordinator' },
    { id: 5, name: 'Construction 5', role: 'Assistant' },
  ];

  const civilEngineering = [
    { id: 1, name: 'Civil 1', role: 'Structural Engineer' },
    { id: 2, name: 'Civil 2', role: 'Civil Engineer' },
    { id: 3, name: 'Civil 3', role: 'Engineer' },
    { id: 4, name: 'Civil 4', role: 'Associate' },
    { id: 5, name: 'Civil 5', role: 'Assistant' },
    { id: 6, name: 'Civil 6', role: 'Trainee' },
  ];

  const hrDepartment = [
    { id: 1, name: 'HR 1', role: 'HR Manager' },
    { id: 2, name: 'HR 2', role: 'HR Associate' },
    { id: 3, name: 'HR 3', role: 'Recruitment' },
  ];

  const adminDepartment = [
    { id: 1, name: 'Admin 1', role: 'Operations Manager' },
    { id: 2, name: 'Admin 2', role: 'Office Manager' },
    { id: 3, name: 'Admin 3', role: 'Administrator' },
    { id: 4, name: 'Admin 4', role: 'Coordinator' },
    { id: 5, name: 'Admin 5', role: 'Assistant' },
    { id: 6, name: 'Admin 6', role: 'Executive' },
    { id: 7, name: 'Admin 7', role: 'Associate' },
    { id: 8, name: 'Admin 8', role: 'Support' },
    { id: 9, name: 'Admin 9', role: 'Intern' },
  ];

  const itDepartment = [
    { id: 1, name: 'IT 1', role: 'IT Manager' },
    { id: 2, name: 'IT 2', role: 'Tech Support' },
  ];

  const publicRelations = [
    { id: 1, name: 'PR 1', role: 'PR Manager' },
    { id: 2, name: 'PR 2', role: 'Communications' },
  ];

  const clientEngagement = [
    { id: 1, name: 'Client Manager', role: 'Client Relations' },
  ];

  const projectImages = [
    { title: 'Modern Villa', category: 'Residential' },
    { title: 'Corporate Hub', category: 'Commercial' },
    { title: 'Urban Oasis', category: 'Mixed Use' },
    { title: 'Skyline Tower', category: 'High Rise' },
    { title: 'Heritage Restoration', category: 'Restoration' },
    { title: 'Innovation Center', category: 'Corporate' },
    { title: 'Coastal Retreat', category: 'Residential' },
    { title: 'Plaza Design', category: 'Public Space' },
    { title: 'Boutique Hotel', category: 'Hospitality' }
  ];

  const strengths = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Hands-on approach',
      desc: 'Our team of architects constantly oversees projects to maintain the highest standards. This level of attention to detail creates finished spaces that exceed expectations and stand the test of time.'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Contemporary style',
      desc: 'We draw inspiration from local environment and heritage. This creates unique, functional, and aesthetically pleasing spaces that harmonize with their surroundings while pushing design boundaries.'
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Comprehensive approach',
      desc: 'Beyond architectural work, we provide master planning and landscape design services. This allows us to create holistic, sustainable designs that consider every aspect of the built environment.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Industry recognition',
      desc: 'Our projects have been featured in international architecture publications. This recognition speaks to the quality of our work and innovative approach to contemporary design challenges.'
    }
  ];

  const TeamMember = ({ name, role, id, image }) => (
    <div 
      className="group relative cursor-pointer"
      onMouseEnter={() => setHoveredMember(id)}
      onMouseLeave={() => setHoveredMember(null)}
    >
      <div className="relative overflow-hidden aspect-square">
        <div className="absolute inset-0">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
              <div className="text-center p-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-400 to-gray-500 rounded-full mb-3 transition-all duration-500 group-hover:from-amber-500 group-hover:to-amber-600"></div>
                <p className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{name}</p>
              </div>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
          <div>
            <p className="text-white text-sm font-semibold mb-1">{name}</p>
            <p className="text-amber-400 text-xs font-light tracking-wide">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const TeamSection = ({ title, members, columns = 4 }) => {
    const gridColsClass = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4'
    };
    
    return (
      <div className="mb-24 animate-fade-in">
        <div className="relative mb-12">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
          <h2 className="text-center text-red-400 text-sm tracking-[0.3em] font-light relative bg-white inline-block left-1/2 -translate-x-1/2 px-6">
            {title}
          </h2>
        </div>
        <div className={`grid ${gridColsClass[columns]} gap-6 max-w-6xl mx-auto`}>
          {members.map((member) => (
            <TeamMember key={member.id} name={member.name} role={member.role} id={`${title}-${member.id}`} image={member.image} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <style>{`
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          overflow-x: hidden;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
          will-change: opacity, transform;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
          will-change: transform;
        }
        .scroll-indicator {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        
        img {
          image-rendering: -webkit-optimize-contrast;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>

      {/* Hero Header */}
      <header className="relative text-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/50 to-transparent"></div>
        <div className="relative z-10">
          <div className="inline-block mb-4 px-8 py-2 bg-gradient-to-r from-amber-500/10 via-red-500/10 to-amber-500/10 rounded-full">
            <h1 className="text-gray-800 text-sm tracking-[0.4em] font-light">ABOUT US</h1>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-6"></div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </header>

      {/* Founders Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-full mx-auto">
        <div className="relative group overflow-hidden rounded-lg shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
          <img 
            src="https://www.bing.com/images/search?view=detailV2&ccid=HAc%2fkfRf&id=8931284A1AF6C802258614FA4413EF6FA37F223F&thid=OIP.HAc_kfRfbBI3WOZbHSqv9gHaEK&mediaurl=https%3a%2f%2fwww.findhealthtips.com%2fwp-content%2fuploads%2f2018%2f05%2fSiddharth-Malhotra-handsome-men-world-2018.jpg&exph=720&expw=1280&q=handsome+men&FORM=IRPRST&ck=ED10DEFC13A1C8D1A6CA96DA84809BC9&selectedIndex=75&itb=0" 
            alt="Founders"
            className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-6 right-6 z-20 animate-float">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-black px-6 py-3 text-xs font-bold shadow-lg">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <div>
                  <div>ARCHITECTURE</div>
                  <div className="text-[10px]">TOP FIFTY</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 z-20 p-12 text-white">
            <h2 className="text-3xl font-light mb-4 tracking-wide">Visionary Leadership</h2>
            <p className="text-sm text-gray-200 max-w-3xl leading-relaxed">
              Founded by pioneers in contemporary architecture and sustainable design
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-gray-600 text-sm leading-relaxed text-center max-w-5xl mx-auto px-4">
          <p className="mb-6">
            <span className="text-2xl font-light text-gray-800 block mb-4">J.B.K. Architecture</span>
            A highly respected architecture firm founded in 2002 by Indar Bir Mehta, Ar. Jyoti Dabir, and Ar. K.R. Mehta Chitrkar. We have completed commercial projects of different scales, including premium line interiors, planning, and landscape designs.
          </p>
          <p>
            Many of our works have been featured in international architecture publications. With a holistic approach, the firm focuses on contemporary and sustainable design. We offer a creative response from conception to completion that sets remarkable standards in building and planning.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 px-4">
          {projectImages.map((img, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                <div className="text-center">
                  <Building2 className="w-12 h-12 text-white mx-auto mb-2 opacity-50" />
                  <p className="text-white text-xs font-semibold">{img.title}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{img.title}</p>
                  <p className="text-amber-400 text-xs tracking-wider">{img.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-32">
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-8 py-2 bg-gradient-to-r from-red-500/10 via-amber-500/10 to-red-500/10 rounded-full">
            <h2 className="text-red-400 text-lg tracking-[0.3em] font-light">
              Strengths
            </h2>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {strengths.map((strength, idx) => (
            <div key={idx} className="group p-8 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-amber-200">
              <div className="flex items-start gap-4">
                <div className="text-amber-500 group-hover:text-amber-600 transition-colors flex-shrink-0 mt-1">
                  {strength.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 text-base group-hover:text-amber-600 transition-colors">
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
        </div>
      </section>

      {/* Team Sections */}
      <div className="max-w-7xl mx-auto px-8">
        <TeamSection title="ARCHITECTS" members={architects} columns={4} />
        <TeamSection title="DESIGNERS" members={designers} columns={4} />
        <TeamSection title="INTERIOR CONCEPT" members={interiorConcept} columns={4} />
        <TeamSection title="CONSTRUCTION MANAGEMENT" members={constructionMgmt} columns={4} />
        <TeamSection title="CIVIL ENGINEERING" members={civilEngineering} columns={4} />
        <TeamSection title="HR DEPARTMENT" members={hrDepartment} columns={3} />
        <TeamSection title="ADMINISTRATION DEPARTMENT" members={adminDepartment} columns={4} />
        <TeamSection title="IT DEPARTMENT" members={itDepartment} columns={2} />
        <TeamSection title="PUBLIC RELATIONS" members={publicRelations} columns={2} />
        <TeamSection title="CLIENT ENGAGEMENT AND SUPPORT" members={clientEngagement} columns={1} />
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16 px-8 mt-32">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl mb-12 font-light tracking-wide">Get in touch with us</h3>
          
          <div className="grid grid-cols-2 gap-12 mb-12">
            <div className="space-y-4">
              <a href="mailto:hello@bluearchitects.com" className="block text-amber-400 hover:text-amber-300 transition-colors text-sm">
                hello@bluearchitects.com
              </a>
              <a href="mailto:careers@bluearchitects.com" className="block text-gray-300 hover:text-white transition-colors text-sm">
                careers@bluearchitects.com
              </a>
            </div>
            <div className="space-y-4">
              <a href="mailto:vm@bluearchitects.com" className="block text-gray-300 hover:text-white transition-colors text-sm">
                vm@bluearchitects.com
              </a>
              <a href="mailto:PR@bluearchitects.com" className="block text-gray-300 hover:text-white transition-colors text-sm">
                PR@bluearchitects.com
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-8 max-w-2xl">
            If you are really in need of us! Feel free to text/call/email us and check out our Instagram page!
          </p>

          <div className="flex items-center justify-between">
            <button className="border border-white px-8 py-3 text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300 group">
              <span className="flex items-center gap-2">
                SCROLL UP
                <ChevronDown className="w-4 h-4 rotate-180 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>

            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 border border-white/30 hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300 cursor-pointer flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}