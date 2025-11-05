import React, { useState } from 'react';
import { Users, ArrowLeft, Plus, Edit, Trash2, Search, Filter, Calendar, Mail, Phone } from 'lucide-react';

export default function ManageEmployees() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Sarah Johnson', role: 'Lead Architect', email: 'sarah@jbk.com', phone: '+1 234 567 8901', status: 'Active', joined: '2020-01-15' },
    { id: 2, name: 'Michael Chen', role: 'Senior Designer', email: 'michael@jbk.com', phone: '+1 234 567 8902', status: 'Active', joined: '2021-03-20' },
    { id: 3, name: 'Emily Rodriguez', role: 'Project Manager', email: 'emily@jbk.com', phone: '+1 234 567 8903', status: 'Active', joined: '2021-07-10' },
    { id: 4, name: 'David Kim', role: 'Interior Designer', email: 'david@jbk.com', phone: '+1 234 567 8904', status: 'On Leave', joined: '2022-02-01' },
    { id: 5, name: 'Jessica Brown', role: 'Architectural Technician', email: 'jessica@jbk.com', phone: '+1 234 567 8905', status: 'Active', joined: '2022-05-12' },
    { id: 6, name: 'Robert Taylor', role: 'CAD Specialist', email: 'robert@jbk.com', phone: '+1 234 567 8906', status: 'Active', joined: '2023-01-08' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-700 to-cyan-600"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="white" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        <div className="relative h-full flex items-center justify-between max-w-7xl mx-auto px-6 text-white">
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-4xl font-bold mb-1">Manage Employees</h2>
              <p className="text-blue-100">Add and manage team members</p>
            </div>
          </div>
          <Users className="w-20 h-20 opacity-30" />
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
                  placeholder="Search employees..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <button className="p-3 border border-stone-200 rounded-xl hover:bg-stone-50 transition">
                <Filter className="w-5 h-5 text-stone-600" />
              </button>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Employee
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">Total Employees</p>
            <p className="text-3xl font-bold text-stone-800">{employees.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">Active</p>
            <p className="text-3xl font-bold text-emerald-600">{employees.filter(e => e.status === 'Active').length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
            <p className="text-sm text-stone-500 mb-2">On Leave</p>
            <p className="text-3xl font-bold text-amber-600">{employees.filter(e => e.status === 'On Leave').length}</p>
          </div>
        </div>

        {/* Employees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-stone-100 group">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold text-stone-800 group-hover:text-blue-600 transition truncate">
                        {employee.name}
                      </h3>
                      <p className="text-stone-500 text-sm">{employee.role}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ml-2 ${
                      employee.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {employee.status}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-stone-600 flex items-center gap-2">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{employee.email}</span>
                    </p>
                    <p className="text-sm text-stone-600 flex items-center gap-2">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      {employee.phone}
                    </p>
                    <p className="text-sm text-stone-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      Joined {employee.joined}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium text-sm">
                      Edit Profile
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