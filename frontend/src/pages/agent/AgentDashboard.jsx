import React from 'react';
import { 
  Shield, TrendingUp, Wallet, Star, Clock, 
  CheckCircle, Briefcase, ChevronRight, AlertCircle 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AgentDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Trust Score', value: '94/100', change: '+4 points', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Jobs', value: '8', change: '+2 this week', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Monthly Earnings', value: '₦330K', change: '+25% from last month', icon: Wallet, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Verified Listings', value: '15', change: '3 pending', icon: CheckCircle, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  ];

  const recentJobs = [
    { id: 1, client: 'John Adebayo', amount: '₦15,000', type: 'C-of-O Verification', status: 'In-progress', priority: 'High', time: '2 hours ago' },
    { id: 2, client: 'Sarah Johnson', amount: '₦25,000', type: 'Property Documentation', status: 'Pending', priority: 'Medium', time: '1 day ago' },
    { id: 3, client: 'Michael Chen', amount: '₦10,000', type: 'AGIS Record Search', status: 'Completed', priority: 'Low', time: '2 days ago' },
    { id: 4, client: 'Grace Okafor', amount: '₦18,000', type: 'Survey Plan Verification', status: 'In-progress', priority: 'High', time: '3 days ago' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 lg:p-6">
      {/* Header Profile */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            CO
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chinedu Okoro</h1>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              Certified AGIS Agent • <span className="font-mono ml-1">ABJ-AGIS-2847</span>
            </p>
            <div className="flex items-center mt-2 space-x-2">
              <span className="flex items-center text-yellow-500 text-sm font-semibold">
                <Star size={14} className="fill-current mr-1" /> 4.9/5.0
              </span>
              <span className="text-gray-400 text-xs">(128 reviews)</span>
              <span className="text-gray-500 text-xs px-2 py-0.5 bg-gray-100 rounded-full">Abuja, Nigeria</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">Level</span>
            <span className="text-sm font-extrabold text-gray-900">ELITE TIER</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500 flex items-center justify-center">
            <span className="text-lg font-bold text-indigo-600">94</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl`}>
                <stat.icon size={20} />
              </div>
              <TrendingUp size={16} className="text-gray-300" />
            </div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            <p className="text-[10px] font-bold text-green-600 mt-2 flex items-center">
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Job Requests</h2>
            <button className="text-indigo-600 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentJobs.map((job) => (
              <div key={job.id} className="p-5 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${job.status === 'Completed' ? 'bg-green-500' : 'bg-orange-500'}`} />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{job.client}</p>
                    <p className="text-xs text-gray-500">{job.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-900">{job.amount}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">{job.time}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      job.status === 'Completed' ? 'bg-green-50 text-green-600' : 
                      job.status === 'Pending' ? 'bg-gray-100 text-gray-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {job.status}
                    </span>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Metrics */}
        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-100">
            <h2 className="text-lg font-bold mb-4">Quick Insights</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-indigo-100 flex items-center">
                    <Clock size={14} className="mr-2" /> Response Time
                  </span>
                  <span className="text-lg font-bold">2.1h</span>
                </div>
                <div className="w-full bg-indigo-500 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-white h-full" style={{ width: '85%' }} />
                </div>
                <p className="text-[10px] text-indigo-100 mt-2 font-medium italic">Faster than 85% of agents</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-indigo-100 flex items-center">
                    <CheckCircle size={14} className="mr-2" /> Completion Rate
                  </span>
                  <span className="text-lg font-bold">98%</span>
                </div>
                <div className="w-full bg-indigo-500 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-white h-full" style={{ width: '98%' }} />
                </div>
                <p className="text-[10px] text-indigo-100 mt-2 font-medium italic">49/50 jobs completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Urgent Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-red-50 text-red-700 border border-red-100 hover:bg-red-100 transition-colors">
                <div className="flex items-center text-xs font-bold">
                  <AlertCircle size={14} className="mr-2" /> 2 Expiring Jobs
                </div>
                <ChevronRight size={14} />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-orange-50 text-orange-700 border border-orange-100 hover:bg-orange-100 transition-colors">
                <div className="flex items-center text-xs font-bold">
                  <Clock size={14} className="mr-2" /> 3 New Inquiries
                </div>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
