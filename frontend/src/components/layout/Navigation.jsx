import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Search, Building, Users, Shield, MapPin, 
  TrendingUp, CheckCircle, MessageSquare, Bell, 
  Settings, User, LogOut, ChevronLeft, ChevronRight,
  PlusCircle, FileText, Wallet, BarChart3, Heart,
  Target, Calendar, Phone, HelpCircle, ShieldCheck,
  PieChart, Menu as MenuIcon, X, RefreshCw, Award
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const userRole = (user?.role || user?.userType || 'buyer').toLowerCase();

  const navigationItems = {
    general: {
      title: 'General',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: Home, color: 'text-blue-500', roles: ['all'] },
        { name: 'Marketplace', path: '/marketplace', icon: Search, color: 'text-green-500', roles: ['all'] },
        { name: 'Messages', path: '/messages', icon: MessageSquare, badge: '3', color: 'text-purple-500', roles: ['all'] },
        { name: 'Notifications', path: '/notifications', icon: Bell, badge: '12', color: 'text-yellow-500', roles: ['all'] },
      ]
    },
    buyer: {
      title: 'Buyer Tools',
      items: [
        { name: 'Saved Properties', path: '/buyer/saved', icon: Heart, color: 'text-pink-500', roles: ['buyer', 'user'] },
        { name: 'My Searches', path: '/buyer/searches', icon: Target, color: 'text-blue-500', roles: ['buyer', 'user'] },
        { name: 'Verification History', path: '/buyer/verifications', icon: Shield, color: 'text-green-500', roles: ['buyer', 'user'] },
      ]
    },
    seller: {
      title: 'Seller Tools',
      items: [
        { name: 'List Property', path: '/seller/list', icon: PlusCircle, color: 'text-green-500', roles: ['seller'] },
        { name: 'My Listings', path: '/seller/listings', icon: Building, badge: '5', color: 'text-blue-500', roles: ['seller'] },
      ]
    },
    agent: {
      title: 'Agent Hub',
      items: [
        { name: 'Verification Jobs', path: '/agent/jobs', icon: ShieldCheck, badge: '8', color: 'text-purple-500', roles: ['agent'] },
        { name: 'Client Portfolio', path: '/agent/clients', icon: Users, color: 'text-blue-500', roles: ['agent'] },
        { name: 'Earnings', path: '/agent/earnings', icon: Wallet, color: 'text-green-500', roles: ['agent'] },
        { name: 'Schedule', path: '/agent/schedule', icon: Calendar, color: 'text-red-500', roles: ['agent'] },
      ]
    },
    platform: {
      title: 'Platform',
      items: [
        { name: 'Verification Queue', path: '/platform/verification', icon: RefreshCw, badge: '24', color: 'text-blue-500', roles: ['deal_initiator', 'admin'] },
        { name: 'Deal Coordination', path: '/platform/coordination', icon: CheckCircle, color: 'text-green-500', roles: ['deal_initiator'] },
        { name: 'Commission Tracking', path: '/platform/commission', icon: PieChart, color: 'text-purple-500', roles: ['deal_initiator', 'admin'] },
        { name: 'User Management', path: '/platform/users', icon: Users, color: 'text-orange-500', roles: ['admin'] },
      ]
    },
    support: {
      title: 'Support',
      items: [
        { name: 'Help Center', path: '/help', icon: HelpCircle, color: 'text-gray-500', roles: ['all'] },
        { name: 'Contact Support', path: '/contact', icon: Phone, color: 'text-blue-500', roles: ['all'] },
        { name: 'Settings', path: '/settings', icon: Settings, color: 'text-purple-500', roles: ['all'] },
      ]
    }
  };

  const getUserItems = () => {
    return Object.values(navigationItems).filter(section => 
      section.items.some(item => item.roles.includes('all') || item.roles.includes(userRole))
    ).map(section => ({
      ...section,
      items: section.items.filter(item => item.roles.includes('all') || item.roles.includes(userRole))
    }));
  };

  const sections = getUserItems();

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>

      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:relative flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800
        text-white transition-all duration-300 ease-in-out z-50 shadow-2xl
        ${collapsed ? 'w-20' : 'w-64'}
      `}>
        <div className="p-6 border-b border-gray-700 relative">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  DigiAGIS
                </h1>
                <p className="text-xs text-gray-400">Secure Property Deals</p>
              </div>
            )}
          </Link>
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 bg-gray-800 border border-gray-700 rounded-full p-1.5 hover:bg-gray-700 transition-colors z-50"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
          {sections.map((section) => (
            <div key={section.title} className="space-y-2">
              {!collapsed && (
                <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold px-3">
                  {section.title}
                </h3>
              )}
              
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`
                        group relative flex items-center rounded-xl transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-l-4 border-blue-500 text-white shadow-inner' 
                          : 'hover:bg-gray-800/50 text-gray-300 hover:text-white'
                        }
                        ${collapsed ? 'justify-center p-3' : 'px-4 py-3'}
                      `}
                    >
                      <div className="relative">
                        <Icon size={20} className={`${item.color} ${isActive ? 'scale-110' : ''} transition-transform`} />
                        {item.badge && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      
                      {!collapsed && (
                        <span className="ml-3 font-medium text-sm flex-1">{item.name}</span>
                      )}
                      
                      {collapsed && (
                        <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                          {item.name}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className={`border-t border-gray-700 p-4 ${collapsed ? 'px-3' : 'px-4'}`}>
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                    {(user?.fullName || user?.name || 'U').charAt(0)}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800 shadow-sm" />
                </div>
                
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{user?.fullName || user?.name}</p>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{userRole}</p>
                  </div>
                )}
              </div>
              
              <button
                onClick={logout}
                className={`
                  flex items-center text-gray-400 hover:text-red-400 transition-colors w-full
                  ${collapsed ? 'justify-center p-2' : 'px-2 py-2 space-x-3'}
                `}
              >
                <LogOut size={18} />
                {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link to="/login" className={`flex items-center text-gray-300 hover:text-white p-2 ${collapsed ? 'justify-center' : 'space-x-3'}`}>
                <User size={18} />
                {!collapsed && <span className="text-sm">Sign In</span>}
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navigation;
