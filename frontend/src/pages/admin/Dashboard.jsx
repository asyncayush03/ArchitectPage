import React, { useState } from "react";
import {
  LayoutGrid,
  Users,
  FileText,
  Settings,
  TrendingUp,
  FolderOpen,
  ArrowRight,
  BarChart3,
  Activity,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      id: "blogs",
      title: "Manage Blogs",
      description: "Create & edit articles",
      icon: FileText,
      color: "from-red-500 to-red-700",
      stats: "24 Articles",
      to: "/admin/media",
    },
    {
      id: "employees",
      title: "Manage Employees",
      description: "Add/manage team members",
      icon: Users,
      color: "from-red-600 to-red-800",
      stats: "12 Members",
      to: "/admin/employees",
    },
    {
      id: "projects",
      title: "Manage Projects",
      description: "Add projects & details",
      icon: FolderOpen,
      color: "from-red-500 to-red-700",
      stats: "36 Projects",
      to: "/admin/projects",
    },
  ];

  const stats = [
    {
      label: "Total Views",
      value: "45.2K",
      change: "+12.5%",
      icon: TrendingUp,
      color: "red",
    },
    {
      label: "Active Projects",
      value: "36",
      change: "+3",
      icon: FolderOpen,
      color: "red",
    },
    {
      label: "Team Members",
      value: "12",
      change: "+2",
      icon: Users,
      color: "red",
    },
    {
      label: "Published Posts",
      value: "24",
      change: "+5",
      icon: FileText,
      color: "red",
    },
  ];

  const quickActions = [
    {
      label: "New Project",
      icon: FolderOpen,
      to: "/admin/projects",
      color: "red",
    },
    {
      label: "Add Member",
      icon: Users,
      to: "/admin/employees",
      color: "red",
    },
    {
      label: "Write Post",
      icon: FileText,
      to: "/admin/media",
      color: "red",
    },
    {
      label: "Settings",
      icon: Settings,
      to: "/admin/settings",
      color: "gray",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes slideInLeft { 
          from { opacity: 0; transform: translateX(-30px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in-up { 
          animation: fadeInUp 0.8s ease-out forwards; 
        }
        .animate-slide-in-left { 
          animation: slideInLeft 0.8s ease-out forwards; 
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <div className="mb-6 float-animation">
              <LayoutGrid className="w-20 h-20 text-white mx-auto opacity-90" />
            </div>
            
            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-6xl font-light mb-4 tracking-tight text-white animate-fade-in-up">
                Admin Dashboard
              </h1>
            </div>
            
            <div className="overflow-hidden">
              <p className="text-xl text-white/90 mb-8 font-light max-w-2xl mx-auto animate-fade-in-up delay-100">
                Manage your architecture portfolio with ease
              </p>
            </div>

            <div className="flex justify-center gap-4 animate-fade-in-up delay-200">
              <Link 
                to="/admin/projects"
                className="px-8 py-3 bg-white text-red-600 font-medium hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-2xl active:scale-95"
              >
                NEW PROJECT
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                className="px-8 py-3 border-2 border-white text-white font-medium hover:bg-white hover:text-red-600 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                VIEW ANALYTICS
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium mb-2">OVERVIEW</p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-red-600 group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-red-50 group-hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <stat.icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-green-600 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-3xl font-light text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-sm tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Management Cards Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] text-red-600 uppercase font-medium mb-4">MANAGEMENT</p>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">Control Center</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Manage all aspects of your architecture portfolio from one place</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cards.map((card, index) => (
                <Link
                  key={card.id}
                  to={card.to}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
                >
                  <div className="relative p-8">
                    {/* Background Gradient on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Icon Background Pattern */}
                    <div className="absolute bottom-0 right-0 opacity-5">
                      <card.icon className="w-40 h-40 transform rotate-12" />
                    </div>

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <card.icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-medium text-gray-900 mb-2 group-hover:text-white transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 mb-6 group-hover:text-white/90 transition-colors duration-300">
                        {card.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                          {card.stats}
                        </span>
                        <div className="flex items-center gap-2 text-red-600 group-hover:text-white font-medium transition-all duration-300 group-hover:gap-3">
                          <span>Manage</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">Quick Actions</h3>
                  <p className="text-gray-600">Fast access to common tasks</p>
                </div>
                <Sparkles className="w-8 h-8 text-red-600" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.to}
                    className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-white transition-all duration-300 border-2 border-gray-100 hover:border-red-600 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 bg-red-50 group-hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <action.icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors duration-300">
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Activity Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-medium text-gray-900">Recent Activity</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { action: "New project added", time: "2 hours ago", color: "green" },
                    { action: "Blog post published", time: "5 hours ago", color: "blue" },
                    { action: "Team member updated", time: "1 day ago", color: "purple" },
                    { action: "Settings changed", time: "2 days ago", color: "gray" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className={`w-2 h-2 rounded-full bg-${item.color}-500 mt-2`} />
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{item.action}</p>
                        <p className="text-sm text-gray-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Overview */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-medium text-gray-900">Performance Overview</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Projects Completion", value: "85%", width: "85%" },
                    { label: "Team Productivity", value: "92%", width: "92%" },
                    { label: "Client Satisfaction", value: "96%", width: "96%" },
                    { label: "Content Engagement", value: "78%", width: "78%" },
                  ].map((metric, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                        <span className="text-sm font-semibold text-red-600">{metric.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-600 to-red-700 h-2 rounded-full transition-all duration-1000"
                          style={{ width: metric.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}