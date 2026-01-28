import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Search, Users, User, BarChart3, Shield, 
  FileText, MessageSquare, Bell, Settings, LogOut,
  Building, MapPin, TrendingUp, Wallet, CheckCircle,
  Plus, Calendar, Star, Heart, Menu, X, LogIn, UserPlus,
  Briefcase, DollarSign, Clock, FileCheck, ClipboardList,
  Map, Activity, PieChart
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const userRole = user?.role || user?.userType || 'GUEST';

  const navItems = {
    all: [
      { name: 'Home', path: '/', icon: Home },
      { name: 'Marketplace', path: '/marketplace', icon: Search },
    ],
    GUEST: [
      { name: 'How it Works', path: '/how-it-works', icon: Activity },
      { name: 'Contact Support', path: '/support', icon: MessageSquare },
    ],
    USER: [
      { name: 'My Dashboard', path: '/dashboard', icon: Activity },
      { name: 'My Properties', path: '/buyer/properties', icon: Heart },
      { name: 'Verification', path: '/buyer/verifications', icon: Shield },
      { name: 'Saved Listings', path: '/buyer/saved', icon: Star },
      { name: 'Messages', path: '/messages', icon: MessageSquare },
    ],
    AGENT: [
      { name: 'Agent Dashboard', path: '/agent-dashboard', icon: Activity },
      { name: 'Verification Jobs', path: '/agent/jobs', icon: Shield, badge: 5 },
      { name: 'My Properties', path: '/agent/listings', icon: Building },
      { name: 'Manage Clients', path: '/agent/clients', icon: Users },
      { name: 'Financials/Earnings', path: '/agent/earnings', icon: DollarSign },
      { name: 'Activity Log', path: '/agent/logs', icon: Clock },
      { name: 'Messages', path: '/messages', icon: MessageSquare },
    ],
    DEAL_INITIATOR: [
      { name: 'DI Dashboard', path: '/deal-initiator-dashboard', icon: Activity },
      { name: 'Coordination Hub', path: '/initiator/hub', icon: CheckCircle, badge: 12 },
      { name: 'Active Deals', path: '/initiator/deals', icon: TrendingUp },
      { name: 'Commissions', path: '/initiator/commission', icon: Wallet },
      { name: 'Property Verification', path: '/initiator/verification', icon: FileCheck },
      { name: 'Inspection Schedule', path: '/initiator/schedule', icon: Calendar },
      { name: 'Messages', path: '/messages', icon: MessageSquare },
    ],
    ADMIN: [
      { name: 'Admin Overview', path: '/admin/dashboard', icon: PieChart },
      { name: 'Global Properties', path: '/admin/properties', icon: Building },
      { name: 'User Management', path: '/admin/users', icon: Users },
      { name: 'Verification Queue', path: '/admin/verifications', icon: ClipboardList },
      { name: 'Financial Reports', path: '/admin/reports', icon: BarChart3 },
      { name: 'System Settings', path: '/admin/settings', icon: Settings },
      { name: 'Messages', path: '/messages', icon: MessageSquare },
    ]
  };

  const currentNavItems = [...navItems.all, ...(navItems[userRole.toUpperCase()] || [])];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header (Visible only on mobile) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">DigiAGIS</span>
        </div>
        <button 
          onClick={toggleMenu}
          className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header (Hidden on mobile as it has its own) */}
          <div className="hidden lg:flex p-4 border-b border-gray-200 items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DigiAGIS</span>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-16 lg:mt-0">
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all active:scale-95 touch-manipulation ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600 font-semibold shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-indigo-600' : 'text-gray-500'} />
                  <span className="text-sm">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 space-y-2">
            {user ? (
              <>
                <div className="flex items-center space-x-3 mb-2 p-2 rounded-lg bg-gray-50">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                    {(user?.fullName || user?.name || 'U').charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">{user?.fullName || user?.name}</p>
                    <p className="text-[10px] text-indigo-600 font-medium uppercase tracking-wider">{userRole.replace('_', ' ')}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  fullWidth 
                  icon={LogOut} 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    window.location.href = '/';
                  }}
                  size="sm"
                  className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  fullWidth 
                  icon={LogIn} 
                  onClick={() => {
                    window.location.href = '/login';
                    setIsOpen(false);
                  }}
                  size="sm"
                >
                  Sign In
                </Button>
                <Button 
                  variant="primary" 
                  fullWidth 
                  icon={UserPlus} 
                  onClick={() => {
                    window.location.href = '/register';
                    setIsOpen(false);
                  }}
                  size="sm"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
