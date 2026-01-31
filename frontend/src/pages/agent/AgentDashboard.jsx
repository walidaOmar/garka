import React from 'react';
import { 
  Shield, TrendingUp, Wallet, Star, Clock, 
  CheckCircle, Briefcase, ChevronRight, AlertCircle,
  LayoutDashboard, Users, FileText, Settings, LogOut,
  Search, Bell
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AgentDashboard.css';

const AgentDashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const stats = [
    { label: 'Trust Score', value: '94/100', change: '+4 points', icon: Shield, color: 'text-blue-600', accent: '#3b82f6' },
    { label: 'Active Jobs', value: '8', change: '+2 this week', icon: Briefcase, color: 'text-purple-600', accent: '#8b5cf6' },
    { label: 'Monthly Earnings', value: '₦330K', change: '+25% from last month', icon: Wallet, color: 'text-green-600', accent: '#10b981' },
    { label: 'Verified Listings', value: '15', change: '3 pending', icon: CheckCircle, color: 'text-indigo-600', accent: '#6366f1' },
  ];

  const recentJobs = [
    { id: 1, client: 'John Adebayo', amount: '₦15,000', type: 'C-of-O Verification', status: 'In-progress', priority: 'High', time: '2 hours ago' },
    { id: 2, client: 'Sarah Johnson', amount: '₦25,000', type: 'Property Documentation', status: 'Pending', priority: 'Medium', time: '1 day ago' },
    { id: 3, client: 'Michael Chen', amount: '₦10,000', type: 'AGIS Record Search', status: 'Completed', priority: 'Low', time: '2 days ago' },
    { id: 4, client: 'Grace Okafor', amount: '₦18,000', type: 'Survey Plan Verification', status: 'In-progress', priority: 'High', time: '3 days ago' },
  ];

  const sidebarLinks = [
    { name: 'Overview', path: '/agent/dashboard', icon: LayoutDashboard },
    { name: 'Active Jobs', path: '/agent/jobs', icon: Briefcase },
    { name: 'Listings', path: '/agent/listings', icon: Search },
    { name: 'Clients', path: '/agent/clients', icon: Users },
    { name: 'Reports', path: '/agent/reports', icon: FileText },
    { name: 'Settings', path: '/agent/settings', icon: Settings },
  ];

  return (
    <div className="agent-dashboard-wrapper">
      {/* Fixed Sidebar */}
      <aside className="agent-sidebar">
        <div className="agent-sidebar-brand">
          <Shield size={32} className="text-blue-500" />
          <span className="text-xl font-bold">DigiAGIS</span>
        </div>
        
        <div className="flex-1 space-y-1">
          {sidebarLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`agent-sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              <link.icon size={20} />
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        <button 
          onClick={logout}
          className="agent-sidebar-link mt-auto text-red-400 hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Flexible Main Content */}
      <main className="agent-main-content">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Chinedu!</h1>
            <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
              <span className="status-indicator status-online"></span>
              Online & Ready for new jobs • ABJ-AGIS-2847
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              CO
            </div>
          </div>
        </header>

        {/* Modular Stat Cards */}
        <div className="agent-stats-container">
          {stats.map((stat, idx) => (
            <div key={idx} className="agent-stat-card" style={{ borderLeftColor: stat.accent }}>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-gray-50 text-gray-600">
                  <stat.icon size={24} />
                </div>
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase">
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Job Queue */}
          <section className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-lg font-bold">Recent Job Requests</h2>
              <Link to="/agent/jobs" className="text-blue-600 text-sm font-semibold hover:underline">View Queue</Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentJobs.map((job) => (
                <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      job.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <FileText size={24} />
                    </div>
                    <div>
                      <p className="font-bold">{job.client}</p>
                      <p className="text-xs text-gray-500">{job.type} • {job.priority} Priority</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right hidden sm:block">
                      <p className="font-bold">{job.amount}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{job.time}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      job.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                      job.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {job.status}
                    </span>
                    <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Performance Sidebar */}
          <aside className="space-y-6">
            <div className="bg-[#1e293b] rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-400" />
                Performance Metrics
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Response Rate</span>
                    <span className="font-bold">2.1h</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 italic">Faster than 85% of peers</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Completion Rate</span>
                    <span className="font-bold">98%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 italic">49 out of 50 jobs completed</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-sm font-bold mb-4 uppercase tracking-widest text-gray-400">Urgent Notifications</h2>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3">
                  <AlertCircle size={18} className="text-red-500 shrink-0" />
                  <p className="text-xs font-semibold text-red-700">2 jobs expiring in less than 24 hours</p>
                </div>
                <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-center gap-3">
                  <Clock size={18} className="text-orange-500 shrink-0" />
                  <p className="text-xs font-semibold text-orange-700">3 new inquiries waiting response</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;
