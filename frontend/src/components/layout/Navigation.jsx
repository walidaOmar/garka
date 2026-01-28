import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Search, Shield, MessageSquare, Bell, LogOut, 
  Menu as MenuIcon, X, LogIn, UserPlus, Palette,
  ChevronDown, Heart, Star, ShieldCheck, Building,
  Wallet, PieChart, Users, Settings, Activity
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Manu.css';

const themes = [
  { name: 'Indigo', class: 'theme-indigo', primary: '#4f46e5' },
  { name: 'Ocean', class: 'theme-ocean', primary: '#0891b2' },
  { name: 'Sunset', class: 'theme-sunset', primary: '#e11d48' },
  { name: 'Emerald', class: 'theme-emerald', primary: '#059669' }
];

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('theme-indigo');
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef(null);
  const [showThemes, setShowThemes] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const userRole = (user?.role || user?.userType || 'GUEST').toUpperCase();

  const navItems = {
    all: [
      { name: 'Home', path: '/', icon: Home },
      { name: 'Marketplace', path: '/marketplace', icon: Search },
    ],
    GUEST: [
      { name: 'Support', path: '/support', icon: MessageSquare },
    ],
    USER: [
      { name: 'My Properties', path: '/buyer/properties', icon: Heart },
      { name: 'Verification', path: '/buyer/verifications', icon: Shield },
    ],
    AGENT: [
      { name: 'Jobs', path: '/agent/jobs', icon: ShieldCheck, badge: 5 },
      { name: 'Listings', path: '/agent/listings', icon: Building },
      { name: 'Earnings', path: '/agent/earnings', icon: Wallet },
    ],
    DEAL_INITIATOR: [
      { name: 'Hub', path: '/initiator/hub', icon: CheckCircle, badge: 12 },
      { name: 'Deals', path: '/initiator/deals', icon: Activity },
      { name: 'Commissions', path: '/initiator/commission', icon: PieChart },
    ],
    ADMIN: [
      { name: 'Users', path: '/admin/users', icon: Users },
      { name: 'Platform', path: '/admin/dashboard', icon: Settings },
    ]
  };

  const currentNavItems = [...navItems.all, ...(navItems[userRole] || [])];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const activeLink = navRef.current?.querySelector('.active-nav-link');
    if (activeLink) {
      setIndicatorStyle({
        width: `${activeLink.offsetWidth}px`,
        left: `${activeLink.offsetLeft}px`,
        opacity: 1
      });
    } else {
      setIndicatorStyle({ opacity: 0 });
    }
  }, [location.pathname, userRole]);

  return (
    <div className={`manu-container ${currentTheme} ${scrolled ? 'scrolled' : ''}`}>
      <nav className="manu-navbar" ref={navRef}>
        <div className="manu-logo">
          <Shield size={28} className="logo-icon" />
          <span className="logo-text">DigiAGIS</span>
        </div>

        {/* Desktop Menu */}
        <div className="manu-links-desktop">
          {currentNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`manu-link ${location.pathname === item.path ? 'active-nav-link' : ''}`}
            >
              <item.icon size={18} className="link-icon" />
              <span>{item.name}</span>
              {item.badge && <span className="badge pulse">{item.badge}</span>}
            </Link>
          ))}
          <div className="sliding-indicator" style={indicatorStyle} />
        </div>

        <div className="manu-actions">
          {/* Theme Switcher */}
          <div className="theme-switcher-container">
            <IconButton onClick={() => setShowThemes(!showThemes)} className="action-btn">
              <Palette size={20} />
            </IconButton>
            {showThemes && (
              <div className="theme-dropdown slide-in">
                {themes.map((t) => (
                  <button 
                    key={t.name} 
                    onClick={() => { setCurrentTheme(t.class); setShowThemes(false); }}
                    className="theme-option"
                  >
                    <div className="color-dot" style={{ background: t.primary }} />
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="auth-actions">
            {user ? (
              <div className="user-profile-menu group">
                <div className="user-avatar-trigger">
                  <div className="avatar-circle">{(user.fullName || user.name || 'U').charAt(0)}</div>
                  <ChevronDown size={14} className="chevron" />
                </div>
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <p className="user-name">{user.fullName || user.name}</p>
                    <p className="user-role">{userRole}</p>
                  </div>
                  <hr />
                  <button onClick={logout} className="logout-btn">
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="guest-btns">
                <Link to="/login" className="login-text-btn">Login</Link>
                <Link to="/register" className="register-glow-btn">Join</Link>
              </div>
            )}
          </div>

          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`manu-mobile-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          {currentNavItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              onClick={() => setIsOpen(false)}
              className={`mobile-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const IconButton = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`icon-btn ${className}`}>{children}</button>
);

export default Navigation;
