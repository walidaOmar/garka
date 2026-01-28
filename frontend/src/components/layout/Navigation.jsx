import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Search, Users, User, BarChart3, Shield, 
  FileText, MessageSquare, Bell, Settings, LogOut,
  Building, MapPin, TrendingUp, Wallet, CheckCircle,
  Plus, Calendar, Star, Heart
} from 'lucide-react';
import { Button, IconButton } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const userRole = user?.role || user?.userType || 'USER';

  const navItems = {
    all: [
      { name: 'Dashboard', path: '/dashboard', icon: Home },
      { name: 'Marketplace', path: '/marketplace', icon: Search },
      { name: 'Messages', path: '/messages', icon: MessageSquare },
      { name: 'Notifications', path: '/notifications', icon: Bell, badge: 3 },
    ],
    USER: [
      { name: 'My Properties', path: '/buyer/properties', icon: Heart },
      { name: 'Verification', path: '/buyer/verifications', icon: Shield },
      { name: 'Saved', path: '/buyer/saved', icon: Star },
    ],
    AGENT: [
      { name: 'Verification Jobs', path: '/agent/jobs', icon: Shield, badge: 5 },
      { name: 'My Listings', path: '/agent/listings', icon: Building },
      { name: 'Clients', path: '/agent/clients', icon: Users },
      { name: 'Earnings', path: '/agent/earnings', icon: Wallet },
    ],
    DEAL_INITIATOR: [
      { name: 'Coordination', path: '/initiator/hub', icon: CheckCircle, badge: 12 },
      { name: 'Active Deals', path: '/initiator/deals', icon: TrendingUp },
      { name: 'Commissions', path: '/initiator/commission', icon: Wallet },
    ],
    ADMIN: [
      { name: 'Admin Hub', path: '/admin/dashboard', icon: Shield },
      { name: 'All Properties', path: '/admin/properties', icon: Building },
      { name: 'User Management', path: '/admin/users', icon: Users },
      { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
    ]
  };

  const currentNavItems = [...navItems.all, ...(navItems[userRole.toUpperCase()] || [])];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900">DigiAGIS</span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {currentNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
            {(user?.fullName || user?.name || 'U').charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.fullName || user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{userRole.replace('_', ' ')}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          fullWidth 
          icon={LogOut} 
          onClick={logout}
          size="sm"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
