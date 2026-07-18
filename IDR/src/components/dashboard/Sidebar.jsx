import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  CreditCard,
  Globe,
  Server,
  FileText,
  LifeBuoy,
  Settings,
  LogOut,
  Users,
  BarChart3,
  Wallet,
  ClipboardList,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const userNavItems = [
  { label: 'Current Package', to: '/dashboard', icon: CreditCard },
  { label: 'Upgrade AMC Plan', to: '/website-maintenance', icon: Zap },
];

const adminNavItems = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'Users', to: '/admin/users', icon: Users },
  { label: 'Subscriptions', to: '/admin/subscriptions', icon: CreditCard },
  { label: 'Payments', to: '/admin/payments', icon: Wallet },
  { label: 'Support', to: '/admin/support', icon: LifeBuoy },
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
  { label: 'Reports', to: '/admin/reports', icon: ClipboardList },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

export default function Sidebar({ collapsed, onToggle, isAdmin = false }) {
  const location = useLocation();
  const { logout } = useAuth();
  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <aside className={`dash-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo Header */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[var(--dash-border)]">
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 shadow-sm shrink-0 bg-white">
            <img src="/IDR.jpeg" alt="IDR Tech" className="w-full h-full object-cover" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="leading-none min-w-0"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--dash-blue)]">IDR Tech</p>
              <p className="text-[10px] text-[var(--dash-text-muted)] mt-0.5 truncate">
                {isAdmin ? 'Admin Panel' : 'Client Portal'}
              </p>
            </motion.div>
          )}
        </Link>
      </div>



      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {!collapsed && (
          <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--dash-text-muted)]/60">
            {isAdmin ? 'Administration' : 'Navigation'}
          </p>
        )}
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`dash-sidebar-link ${isActive ? 'active' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && isActive && (
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-[var(--dash-orange)]/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <div className="px-3 py-2 hidden lg:block mt-auto border-t border-[var(--dash-border)]/50">
        <button
          onClick={onToggle}
          className="dash-sidebar-link w-full justify-start text-[var(--dash-text-muted)] hover:bg-slate-50"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen className="w-[18px] h-[18px] shrink-0" /> : <PanelLeftClose className="w-[18px] h-[18px] shrink-0" />}
          {!collapsed && <span className="ml-2.5">Collapse</span>}
        </button>
      </div>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-[var(--dash-border)]">
        <button
          onClick={logout}
          className="dash-sidebar-link text-rose-500 hover:text-rose-600 hover:bg-rose-50"
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
