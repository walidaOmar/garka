import React, { useState } from 'react';
import { 
  Shield, Star, MapPin, Briefcase, Wallet, 
  CheckCircle, Clock, Bell, ChevronRight, 
  Activity, TrendingUp, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './AgentDashboard.css';

const AgentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('active');

  const stats = [
    { title: 'Active Jobs', value: '8', sub: '+2 this week' },
    { title: 'Monthly Earnings', value: '₦330K', sub: '+25% from last month' },
    { title: 'Trust Score', value: '94/100', sub: '+4 points' },
    { title: 'Verified Listings', value: '15', sub: '3 pending' },
  ];

  const jobs = {
    active: [
      { id: 1, name: 'John Adebayo', amount: '15,000', service: 'C-of-O Verification', status: 'In-progress', priority: 'High' },
      { id: 2, name: 'Sarah Johnson', amount: '25,000', service: 'Property Documentation', status: 'Pending', priority: 'Medium' },
    ],
    available: [
      { id: 3, name: 'Michael Chen', amount: '10,000', service: 'AGIS Record Search', status: 'Available', priority: 'Low' },
      { id: 4, name: 'Grace Okafor', amount: '18,000', service: 'Survey Plan Verification', status: 'Available', priority: 'High' },
    ],
    completed: [
      { id: 5, name: 'David Wilson', amount: '12,000', service: 'Deed Registration', status: 'Completed', priority: 'Medium' },
    ]
  };

  return (
    <div className="dashboard-container p-4 md:p-8">
      {/* Agent Header Section */}
      <div className="agent-header-banner mb-8">
        <div className="flex items-center gap-6">
          <div className="avatar-placeholder">
            {user?.fullName?.charAt(0) || 'C'}
          </div>
          <div>
            <h2 className="text-2xl font-bold">Chinedu Okoro</h2>
            <p className="text-sm opacity-90 font-medium">
              Certified AGIS Agent • <span className="font-mono">ABJ-AGIS-2847</span>
            </p>
            <div className="flex items-center gap-3 mt-2 text-sm">
              <span className="flex items-center gap-1 text-yellow-300 font-bold">
                <Star size={14} className="fill-current" /> 4.9/5.0
              </span>
              <span className="opacity-80">(128 reviews)</span>
              <span className="flex items-center gap-1 opacity-90">
                <MapPin size={14} /> Abuja, Nigeria
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="elite-badge">ELITE TIER</span>
          <p className="text-4xl font-black mt-2">94</p>
          <p className="text-xs uppercase font-bold tracking-widest opacity-80">Trust Score</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="metric-card">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{stat.title}</p>
            <h3 className="text-2xl font-bold text-[#2E7D32]">{stat.value}</h3>
            <p className="text-[11px] text-green-600 font-bold mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
        {['active', 'available', 'completed', 'listings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-btn capitalize whitespace-nowrap ${activeTab === tab ? 'active' : ''}`}
          >
            {tab.replace('-', ' ')} {tab !== 'listings' ? 'Jobs' : ''}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center justify-between">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Job Requests
              <span className="text-xs text-blue-600 hover:underline cursor-pointer">View All</span>
            </h3>
            
            <div className="space-y-4">
              {(jobs[activeTab] || []).length > 0 ? (
                jobs[activeTab].map((job) => (
                  <div key={job.id} className="job-card flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        job.priority === 'High' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{job.name}</h4>
                        <p className="text-xs text-gray-500 font-medium">{job.service}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`status-pill ${
                            job.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                            job.priority === 'Medium' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {job.status} • {job.priority} Priority
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <p className="text-lg font-black text-[#2E7D32]">₦{job.amount}</p>
                      <button className="text-xs font-bold text-[#2E7D32] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Details <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <Activity size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">No {activeTab} jobs found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel Area */}
        <div className="space-y-6">
          <div className="side-panel-card">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                <Clock size={16} className="text-[#2E7D32]" /> Response Time
              </h4>
              <TrendingUp size={16} className="text-green-600" />
            </div>
            <p className="text-3xl font-black text-[#2E7D32]">2.1h</p>
            <div className="mt-4 space-y-2">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#2E7D32]" style={{ width: '85%' }}></div>
              </div>
              <p className="text-[10px] text-gray-500 font-bold italic">Faster than 85% of active agents</p>
            </div>
          </div>

          <div className="side-panel-card">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                <CheckCircle size={16} className="text-[#2E7D32]" /> Completion Rate
              </h4>
              <Star size={16} className="text-yellow-500" />
            </div>
            <p className="text-3xl font-black text-[#2E7D32]">98%</p>
            <div className="mt-4 space-y-2">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#388E3C]" style={{ width: '98%' }}></div>
              </div>
              <p className="text-[10px] text-gray-500 font-bold italic">49/50 jobs completed successfully</p>
            </div>
          </div>

          <div className="side-panel-card bg-[#E8F5E9] border-none">
            <h4 className="font-bold text-[#2E7D32] text-sm flex items-center gap-2">
              <Bell size={16} /> Payment Alerts
            </h4>
            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500 uppercase">Received</span>
                <span className="text-lg font-black text-[#2E7D32]">₦17,000</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Pending Platform Fee: ₦1,700</p>
              <button className="btn-primary-green mt-4 text-xs">
                Pay Platform Fee
              </button>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-center gap-3">
            <AlertCircle size={20} className="text-orange-500" />
            <p className="text-xs font-bold text-orange-700">You have 3 new job inquiries waiting for response!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
