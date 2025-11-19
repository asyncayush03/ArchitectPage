import React, { useState } from 'react';
import { FolderOpen, ArrowLeft, Plus, Edit, Trash2, Search, Filter, Calendar, DollarSign, Building } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ManageProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    { id: 1, name: 'Riverside Residence', client: 'John & Mary Smith', status: 'In Progress', progress: 65, budget: '$850K', startDate: '2024-06-01', type: 'Residential', description: 'Modern family home with river views' },
    { id: 2, name: 'Downtown Office Complex', client: 'Tech Innovations Inc', status: 'Planning', progress: 20, budget: '$2.5M', startDate: '2024-09-15', type: 'Commercial', description: 'Multi-story office building' },
    { id: 3, name: 'Green Valley Villa', client: 'Anderson Family', status: 'In Progress', progress: 80, budget: '$1.2M', startDate: '2024-03-10', type: 'Residential', description: 'Luxury villa with sustainable features' },
    { id: 4, name: 'City Library Renovation', client: 'City Council', status: 'Completed', progress: 100, budget: '$3.8M', startDate: '2023-08-01', type: 'Public', description: 'Historic library restoration' },
    { id: 5, name: 'Lakeside Apartment Complex', client: 'Urban Development Corp', status: 'In Progress', progress: 45, budget: '$5.2M', startDate: '2024-04-20', type: 'Residential', description: '120-unit apartment building' },
    { id: 6, name: 'Boutique Hotel Renovation', client: 'Hospitality Group', status: 'Planning', progress: 15, budget: '$2.8M', startDate: '2024-10-01', type: 'Commercial', description: 'Historic hotel modernization' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(proj =>
    proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proj.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proj.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-100">
      {/* Header */}
      {/* <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
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
      </header> */}

      {/* Page Hero */}
      <div className="relative h-48 overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-600"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="white" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        <div className="relative h-full flex items-center justify-between max-w-7xl mx-auto px-6 text-white">
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-4xl font-bold mb-1">Manage Projects</h2>
              <p className="text-emerald-100">Add projects and track details</p>
            </div>
          </div>
          <FolderOpen className="w-20 h-20 opacity-30" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Toolbar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 border border-stone-100">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 flex gap-3 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <button className="p-3 border border-stone-200 rounded-xl hover:bg-stone-50 transition">
                <Filter className="w-5 h-5 text-stone-600" />
              </button>
            </div>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <Link to="/admin/projects/new">Add New Project</Link>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">Total Projects</p>
            <p className="text-3xl font-bold text-stone-800">{projects.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">{projects.filter(p => p.status === 'In Progress').length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">Completed</p>
            <p className="text-3xl font-bold text-emerald-600">{projects.filter(p => p.status === 'Completed').length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">Planning</p>
            <p className="text-3xl font-bold text-amber-600">{projects.filter(p => p.status === 'Planning').length}</p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-stone-100 group">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FolderOpen className="w-12 h-12 text-white opacity-50" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold text-stone-800 mb-1 group-hover:text-emerald-600 transition truncate">
                        {project.name}
                      </h3>
                      <p className="text-stone-500 text-sm truncate">Client: {project.client}</p>
                      <p className="text-stone-400 text-xs mt-1">{project.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ml-2 ${
                      project.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-stone-500 mb-1 flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        Type
                      </p>
                      <p className="text-sm font-semibold text-stone-700">{project.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 mb-1 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        Budget
                      </p>
                      <p className="text-sm font-semibold text-stone-700">{project.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Start Date
                      </p>
                      <p className="text-sm font-semibold text-stone-700">{project.startDate}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-stone-600">Progress</span>
                      <span className="text-sm font-semibold text-emerald-600">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full transition-all duration-500"
                        style={{ width: `${project.progress}% `}}
></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition font-medium text-sm">
                      View Details
                    </button>
                    <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}