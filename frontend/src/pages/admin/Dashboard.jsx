import React from "react";
import {
  LayoutGrid,
  Users,
  FileText,
  Settings,
  TrendingUp,
  FolderOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const cards = [
    {
      id: "blogs",
      title: "Manage Blogs",
      description: "Create & edit articles",
      icon: FileText,
      color: "from-amber-500 to-orange-600",
      stats: "24 Articles",
      to: "/admin/media",
    },
    {
      id: "employees",
      title: "Manage Employees",
      description: "Add/manage team members",
      icon: Users,
      color: "from-blue-500 to-cyan-600",
      stats: "12 Members",
      to: "/admin/employees",
    },
    {
      id: "projects",
      title: "Manage Projects",
      description: "Add projects & details",
      icon: FolderOpen,
      color: "from-emerald-500 to-teal-600",
      stats: "36 Projects",
      to: "/admin/projects",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-100">
      {/* Header */}
      {/* <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        {/* <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">J</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-800">J.B.K.</h1>
              <p className="text-xs text-stone-500 uppercase tracking-wider">
                Architecture
              </p>
            </div>
          </div>
          {/* (optional) top-nav links could go here 
          <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
            GET IN TOUCH
          </button>
        </div>  
      </header> */}

      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-600" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\\"60\\" height=\\"60\\" viewBox=\\"0 0 60 60\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cg fill=\\"none\\" fill-rule=\\"evenodd\\"%3E%3Cg fill=\\"white\\" fill-opacity=\\"0.4\\"%3E%3Cpath d=\\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <div className="relative h-full flex flex-col items-center justify-center text-white">
          <LayoutGrid className="w-16 h-16 mb-4 opacity-90" />
          <h2 className="text-5xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-stone-300 text-lg">
            Manage your architecture portfolio
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: "Total Views",
              value: "45.2K",
              change: "+12.5%",
              icon: TrendingUp,
            },
            
            {
              label: "Active Projects",
              value: "36",
              change: "+3",
              icon: FolderOpen,
            },
            { label: "Team Members", value: "12", change: "+2", icon: Users },
            {
              label: "Published Posts",
              value: "24",
              change: "+5",
              icon: FileText,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-stone-100"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-8 h-8 text-stone-400" />
                <span className="text-emerald-600 text-sm font-semibold">
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-stone-800 mb-1">
                {stat.value}
              </p>
              <p className="text-stone-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <Link key={card.id} to={card.to}>
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                {/* hover overlay that doesn't block clicks */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />
                <div className="relative p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-2 group-hover:text-white transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-stone-600 mb-6 group-hover:text-white/90 transition-colors">
                    {card.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone-500 group-hover:text-white/80 transition-colors">
                      {card.stats}
                    </span>
                    <span className="bg-stone-100 group-hover:bg-white text-stone-800 px-6 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg">
                      Manage
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
                  <card.icon className="w-full h-full" />
                </div>
              </div>
            </Link>
          ))}
        </div>
         
        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-lg border border-stone-100">
          <h3 className="text-2xl font-bold text-stone-800 mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Using fixed Tailwind classes (avoids purge issues) */}
            <Link
              to="/admin/projects"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition-all group border border-emerald-100"
            >
              <FolderOpen className="w-8 h-8 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-emerald-800">
                New Project
              </span>
            </Link>

            <Link
              to="/admin/employees"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-all group border border-blue-100"
            >
              <Users className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-blue-800">
                Add Member
              </span>
            </Link>

            <Link
              to="/admin/blogs"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-amber-50 hover:bg-amber-100 transition-all group border border-amber-100"
            >
              <FileText className="w-8 h-8 text-amber-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-amber-800">
                Write Post
              </span>
            </Link>

            <button
              type="button"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-all group border border-stone-100"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Settings className="w-8 h-8 text-stone-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-stone-800">
                Settings
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
