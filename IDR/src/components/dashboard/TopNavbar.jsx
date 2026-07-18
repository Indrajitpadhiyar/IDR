import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function TopNavbar({ onMenuToggle, pageTitle = '' }) {
  const { user, isAdmin, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <div className="dash-topnav">
      {/* Left: Menu + Page Title */}
      <div className="flex items-center gap-3">
        {isAdmin && (
          <button
            onClick={onMenuToggle}
            className="lg:hidden dash-btn-ghost p-2"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {pageTitle && (
          <h1 className="text-lg font-semibold text-[var(--dash-text)] hidden sm:block">
            {pageTitle}
          </h1>
        )}
      </div>

      {/* Center: Search */}
      {isAdmin && (
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dash-text-muted)]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dash-input pl-10 py-2 text-sm bg-[var(--dash-bg)] border-transparent focus:bg-white focus:border-[var(--dash-blue)]"
            />
          </div>
        </div>
      )}

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <button className="relative dash-btn-ghost p-2.5 rounded-xl" aria-label="Notifications">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--dash-orange)] rounded-full" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--dash-orange)] to-[var(--dash-blue)] flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {initials}
            </div>
            <div className="hidden sm:block text-left leading-none">
              <p className="text-xs font-semibold text-[var(--dash-text)] truncate max-w-[120px]">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] text-[var(--dash-text-muted)] mt-0.5">
                {isAdmin ? 'Admin' : 'Client'}
              </p>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-[var(--dash-text-muted)] transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-52 bg-white border border-[var(--dash-border)] rounded-2xl shadow-lg py-2 z-50"
              >
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-sm font-semibold text-[var(--dash-text)]">{user?.name}</p>
                  <p className="text-xs text-[var(--dash-text-muted)] truncate">{user?.email}</p>
                </div>

                {isAdmin && (
                  <div className="py-1">
                    <Link
                      to="/admin"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-[var(--dash-text-muted)] hover:text-[var(--dash-text)] hover:bg-slate-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      to="/admin/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-[var(--dash-text-muted)] hover:text-[var(--dash-text)] hover:bg-slate-50 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                  </div>
                )}

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => { setProfileOpen(false); logout(); }}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
