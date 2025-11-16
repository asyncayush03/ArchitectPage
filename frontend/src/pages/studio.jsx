import React, { useState } from "react";
import { Building2, Users, Award, Sparkles, ChevronDown } from "lucide-react";

export default function Studio() {

  const architects = [
    { id: 1, name: "Architect 1", role: "Senior Architect", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop" },
    { id: 2, name: "Architect 2", role: "Lead Designer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" },
    { id: 3, name: "Architect 3", role: "Project Architect", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" },
    { id: 4, name: "Architect 4", role: "Design Architect", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
    { id: 5, name: "Architect 5", role: "Associate", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop" },
    { id: 6, name: "Architect 6", role: "Associate", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
    { id: 7, name: "Architect 7", role: "Junior Architect", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
    { id: 8, name: "Architect 8", role: "Junior Architect", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
  ];

  const designers = [
    { id: 1, name: "Designer 1", role: "Creative Director", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" },
    { id: 2, name: "Designer 2", role: "Senior Designer", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop" },
    { id: 3, name: "Designer 3", role: "Graphic Designer", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop" },
    { id: 4, name: "Designer 4", role: "3D Specialist", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" },
    { id: 5, name: "Designer 5", role: "Visualization", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop" },
    { id: 6, name: "Designer 6", role: "Design Associate", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop" },
    { id: 7, name: "Designer 7", role: "Design Associate", image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=400&fit=crop" },
  ];

  const interiorConcept = [
    { id: 1, name: "Interior 1", role: "Lead Designer", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop" },
    { id: 2, name: "Interior 2", role: "Space Planner", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
    { id: 3, name: "Interior 3", role: "Designer", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop" },
    { id: 4, name: "Interior 4", role: "Designer", image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=400&fit=crop" },
    { id: 5, name: "Interior 5", role: "Associate", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop" },
    { id: 6, name: "Interior 6", role: "Associate", image: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=400&h=400&fit=crop" },
    { id: 7, name: "Interior 7", role: "Junior Designer", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop" },
    { id: 8, name: "Interior 8", role: "Junior Designer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
    { id: 9, name: "Interior 9", role: "Intern", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop" },
  ];

  const constructionMgmt = [
    { id: 1, name: "Construction 1", role: "Project Manager", image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop" },
    { id: 2, name: "Construction 2", role: "Site Engineer", image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop" },
    { id: 3, name: "Construction 3", role: "Supervisor", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop" },
    { id: 4, name: "Construction 4", role: "Coordinator", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop" },
    { id: 5, name: "Construction 5", role: "Assistant", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" },
  ];

  const civilEngineering = [
    { id: 1, name: "Civil 1", role: "Structural Engineer", image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop" },
    { id: 2, name: "Civil 2", role: "Civil Engineer", image: "https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?w=400&h=400&fit=crop" },
    { id: 3, name: "Civil 3", role: "Engineer", image: "https://images.unsplash.com/photo-1558203728-00f45181dd84?w=400&h=400&fit=crop" },
    { id: 4, name: "Civil 4", role: "Associate", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop" },
    { id: 5, name: "Civil 5", role: "Assistant", image: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=400&h=400&fit=crop" },
    { id: 6, name: "Civil 6", role: "Trainee", image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop" },
  ];

  const hrDepartment = [
    { id: 1, name: "HR 1", role: "HR Manager", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop" },
    { id: 2, name: "HR 2", role: "HR Associate", image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=400&fit=crop" },
    { id: 3, name: "HR 3", role: "Recruitment", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop" },
  ];

  const adminDepartment = [
    { id: 1, name: "Admin 1", role: "Operations Manager", image: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=400&h=400&fit=crop" },
    { id: 2, name: "Admin 2", role: "Office Manager", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop" },
    { id: 3, name: "Admin 3", role: "Administrator", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop" },
    { id: 4, name: "Admin 4", role: "Coordinator", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop" },
    { id: 5, name: "Admin 5", role: "Assistant", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop" },
    { id: 6, name: "Admin 6", role: "Executive", image: "https://images.unsplash.com/photo-1487309078313-fad80c3ec1e5?w=400&h=400&fit=crop" },
    { id: 7, name: "Admin 7", role: "Associate", image: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=400&h=400&fit=crop" },
    { id: 8, name: "Admin 8", role: "Support", image: "https://images.unsplash.com/photo-1573166364524-d9dbfd8bbf82?w=400&h=400&fit=crop" },
    { id: 9, name: "Admin 9", role: "Intern", image: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=400&h=400&fit=crop" },
  ];

  const itDepartment = [
    { id: 1, name: "IT 1", role: "IT Manager", image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop" },
    { id: 2, name: "IT 2", role: "Tech Support", image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop" },
  ];

  const publicRelations = [
    { id: 1, name: "PR 1", role: "PR Manager", image: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=400&h=400&fit=crop" },
    { id: 2, name: "PR 2", role: "Communications", image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop" },
  ];

  const clientEngagement = [
    { id: 1, name: "Client Manager", role: "Client Relations", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop" },
  ];

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
      desc: "Our team of architects constantly oversees projects to maintain the highest standards.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Contemporary style",
      desc: "We draw inspiration from local environment and heritage.",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Comprehensive approach",
      desc: "Beyond architectural work, we provide master planning and landscape design services.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Industry recognition",
      desc: "Our projects have been featured in international architecture publications.",
    },
  ];

  const TeamMember = ({ name, role, image }) => (
    <div className="group relative cursor-pointer">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform-gpu transition-transform duration-300 group-hover:scale-105 will-change-transform"
          loading="lazy"
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
        >
          <div>
            <p className="text-white text-sm font-semibold mb-1">{name}</p>
            <p className="text-amber-400 text-xs font-light tracking-wide">
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const TeamSection = ({ title, members, columns = 4 }) => {
    const gridColsClass = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    };

    return (
      <div className="mb-24 animate-fade-in">
        <div className="relative mb-12">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
          <h2 className="text-center text-red-400 text-sm tracking-[0.3em] font-light relative bg-white inline-block left-1/2 -translate-x-1/2 px-6">
            {title}
          </h2>
        </div>
        <div
          className={`grid ${gridColsClass[columns]} gap-6 max-w-6xl mx-auto`}
        >
          {members.map((member) => (
            <TeamMember
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.image}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <style>{`
        * {-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}
        body {overflow-x: hidden;}
        @keyframes fade-in {from {opacity: 0;transform: translateY(20px);}to {opacity: 1;transform: translateY(0);} }
        .animate-fade-in {animation: fade-in 0.8s ease-out;}
        @keyframes float {0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); }}
        .animate-float {animation: float 3s ease-in-out infinite;}
        .scroll-indicator {animation: bounce 2s infinite;}
        @keyframes bounce {0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); }}
      `}</style>

      {/* HERO */}
      <header className="relative text-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/50 to-transparent"></div>
        <div className="relative z-10">
          <div className="inline-block mb-4 px-8 py-2 bg-gradient-to-r from-amber-500/10 via-red-500/10 to-amber-500/10 rounded-full">
            <h1 className="text-gray-800 text-sm tracking-[0.4em] font-light">
              ABOUT US
            </h1>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-6"></div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </header>

      {/* FOUNDERS */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-full mx-auto">
          <div className="relative group overflow-hidden rounded-lg shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>

            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop"
              alt="Founders"
              className="w-full h-auto transform-gpu transition-transform duration-500 group-hover:scale-105"
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
              <h2 className="text-3xl font-light mb-4 tracking-wide">
                Visionary Leadership
              </h2>
              <p className="text-sm text-gray-200 max-w-3xl leading-relaxed">
                Founded by pioneers in contemporary architecture and sustainable
                design
              </p>
            </div>
          </div>

          <div className="mt-16 text-gray-600 text-sm leading-relaxed text-center max-w-5xl mx-auto px-4">
            <p className="mb-6">
              <span className="text-2xl font-light text-gray-800 block mb-4">
                J.B.K. Architecture
              </span>
              A highly respected architecture firm founded in 2002 by Indar Bir
              Mehta, Ar. Jyoti Dabir, and Ar. K.R. Mehta Chitrkar. We have
              completed commercial projects of different scales, including
              premium line interiors, planning, and landscape designs.
            </p>
            <p>
              Many of our works have been featured in international architecture
              publications. With a holistic approach, the firm focuses on
              contemporary and sustainable design. We offer a creative response
              from conception to completion that sets remarkable standards in
              building and planning.
            </p>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 px-4">
            {projectImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
              >
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full h-full object-cover transform-gpu transition-transform duration-300 group-hover:scale-105 aspect-video"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                >
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">
                      {img.title}
                    </p>
                    <p className="text-amber-400 text-xs tracking-wider">
                      {img.category}
                    </p>
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
              <div
                key={idx}
                className="group p-8 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-amber-200"
              >
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

      {/* TEAM SECTIONS */}
      <TeamSection title="Architects" members={architects} />
      <TeamSection title="Designers" members={designers} />
      <TeamSection
        title="Interior Concept & Design"
        members={interiorConcept}
      />
      <TeamSection
        title="Construction Management"
        members={constructionMgmt}
        columns={3}
      />
      <TeamSection
        title="Civil Engineering"
        members={civilEngineering}
        columns={3}
      />
      <TeamSection title="Human Resources" members={hrDepartment} columns={3} />
      <TeamSection
        title="Administration"
        members={adminDepartment}
        columns={4}
      />
      <TeamSection title="IT Department" members={itDepartment} columns={2} />
      <TeamSection
        title="Public Relations"
        members={publicRelations}
        columns={2}
      />
      <TeamSection
        title="Client Engagement"
        members={clientEngagement}
        columns={1}
      />

      {/* FOOTER */}
      <footer className="text-center py-16 text-gray-500 text-sm border-t border-gray-200 mt-24">
        © 2025 J.B.K. Architecture — All Rights Reserved
      </footer>
    </div>
  );
}