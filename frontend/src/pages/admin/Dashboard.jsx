import React, { useState } from 'react';
import { LayoutGrid, Users, FileText, Mail, Settings, TrendingUp, BarChart3, FolderOpen } from 'lucide-react';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  const cards = [
    {
      id: 'blogs',
      title: 'Manage Blogs',
      description: 'Create & edit articles',
      icon: FileText,
      color: 'from-amber-500 to-orange-600',
      stats: '24 Articles'
    },
    {
      id: 'employees',
      title: 'Manage Employees',
      description: 'Add/manage team members',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      stats: '12 Members'
    },
    {
      id: 'projects',
      title: 'Manage Projects',
      description: 'Add projects & details',
      icon: FolderOpen,
      color: 'from-emerald-500 to-teal-600',
      stats: '36 Projects'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">J</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-800">J.B.K.</h1>
              <p className="text-xs text-stone-500 uppercase tracking-wider">Architecture</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#" className="text-stone-600 hover:text-stone-900 transition">Projects</a>
            <a href="#" className="text-stone-600 hover:text-stone-900 transition">Studio</a>
            <a href="#" className="text-stone-600 hover:text-stone-900 transition">Blog</a>
            <a href="#" className="text-stone-600 hover:text-stone-900 transition">Media</a>
            <a href="#" className="text-stone-600 hover:text-stone-900 transition">Contact</a>
          </nav>
          <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
            GET IN TOUCH
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-600"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="white" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        <div className="relative h-full flex flex-col items-center justify-center text-white">
          <LayoutGrid className="w-16 h-16 mb-4 opacity-90" />
          <h2 className="text-5xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-stone-300 text-lg">Manage your architecture portfolio</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Views', value: '45.2K', change: '+12.5%', icon: TrendingUp },
            { label: 'Active Projects', value: '36', change: '+3', icon: FolderOpen },
            { label: 'Team Members', value: '12', change: '+2', icon: Users },
            { label: 'Published Posts', value: '24', change: '+5', icon: FileText }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-stone-100">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-8 h-8 text-stone-400" />
                <span className="text-emerald-600 text-sm font-semibold">{stat.change}</span>
              </div>
              <p className="text-3xl font-bold text-stone-800 mb-1">{stat.value}</p>
              <p className="text-stone-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div 
              key={card.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative p-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
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
                  <button className="bg-stone-100 group-hover:bg-white text-stone-800 px-6 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg">
                    Manage
                  </button>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
                <card.icon className="w-full h-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-lg border border-stone-100">
          <h3 className="text-2xl font-bold text-stone-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'New Project', icon: FolderOpen, color: 'emerald' },
              { label: 'Add Member', icon: Users, color: 'blue' },
              { label: 'Write Post', icon: FileText, color: 'amber' },
              { label: 'Settings', icon: Settings, color: 'stone' }
            ].map((action, i) => (
              <button 
                key={i}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl bg-${action.color}-50 hover:bg-${action.color}-100 transition-all group border border-${action.color}-100`}
              >
                <action.icon className={`w-8 h-8 text-${action.color}-600 group-hover:scale-110 transition-transform`} />
                <span className={`text-sm font-medium text-${action.color}-800`}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}