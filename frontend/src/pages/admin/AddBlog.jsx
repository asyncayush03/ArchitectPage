import React, { useState } from 'react';
import { FileText, ArrowLeft, Plus, Edit, Trash2, Eye, Search, Filter, Calendar, Tag } from 'lucide-react';

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([
    { id: 1, title: 'Modern Residential Design Trends', date: '2024-10-15', status: 'Published', views: 1234, category: 'Residential' },
    { id: 2, title: 'Sustainable Architecture Practices', date: '2024-10-20', status: 'Published', views: 2100, category: 'Sustainability' },
    { id: 3, title: 'Urban Planning in 2024', date: '2024-10-25', status: 'Draft', views: 0, category: 'Urban' },
    { id: 4, title: 'Minimalist Interior Spaces', date: '2024-10-28', status: 'Published', views: 890, category: 'Interior' },
    { id: 5, title: 'Biophilic Design Elements', date: '2024-11-01', status: 'Published', views: 1567, category: 'Design' },
    { id: 6, title: 'Smart Home Integration', date: '2024-11-03', status: 'Draft', views: 0, category: 'Technology' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Page Hero */}
      <div className="relative h-48 overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-600"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="white" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        <div className="relative h-full flex items-center justify-between max-w-7xl mx-auto px-6 text-white">
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-4xl font-bold mb-1">Manage Blogs</h2>
              <p className="text-stone-300">Create and edit articles</p>
            </div>
          </div>
          <FileText className="w-20 h-20 opacity-30" />
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
                  placeholder="Search articles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>
              <button className="p-3 border border-stone-200 rounded-xl hover:bg-stone-50 transition">
                <Filter className="w-5 h-5 text-stone-600" />
              </button>
            </div>
            <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Article
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">Total Articles</p>
            <p className="text-3xl font-bold text-stone-800">{blogs.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">Published</p>
            <p className="text-3xl font-bold text-emerald-600">{blogs.filter(b => b.status === 'Published').length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">Drafts</p>
            <p className="text-3xl font-bold text-amber-600">{blogs.filter(b => b.status === 'Draft').length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">Total Views</p>
            <p className="text-3xl font-bold text-blue-600">{blogs.reduce((sum, b) => sum + b.views, 0).toLocaleString()}</p>
          </div>
        </div>

        {/* Blogs List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-stone-100 group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      blog.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {blog.status}
                    </span>
                    <span className="text-stone-400 text-sm flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {blog.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-amber-600 transition">
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-stone-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {blog.views.toLocaleString()} views
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}