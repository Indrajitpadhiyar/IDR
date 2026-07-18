import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import BottomNav from './BottomNav';

export default function DashboardLayout({ isAdmin = false, pageTitle = '' }) {
  const { isAuthenticated } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => setSidebarCollapsed((v) => !v);
  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);

  const sidebarWidth = sidebarCollapsed ? 'var(--dash-sidebar-collapsed)' : 'var(--dash-sidebar-w)';

  return (
    <div className="dash-root">
      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-[39] bg-slate-900/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={mobileMenuOpen ? '[&>.dash-sidebar]:transform-none [&>.dash-sidebar]:mobile-open' : ''}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          isAdmin={isAdmin}
        />
      </div>

      {/* Mobile sidebar override */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-y-0 left-0 z-40 lg:hidden"
          style={{ width: 'var(--dash-sidebar-w)' }}
        >
          <div className="dash-sidebar mobile-open" style={{ transform: 'translateX(0)' }}>
            <Sidebar
              collapsed={false}
              onToggle={() => setMobileMenuOpen(false)}
              isAdmin={isAdmin}
            />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div
        className="transition-[margin] duration-300 ease-in-out min-h-screen flex flex-col"
        style={{ marginLeft: `clamp(0px, ${sidebarWidth}, ${sidebarWidth})` }}
      >
        {/* Hide margin on mobile */}
        <style>{`
          @media (max-width: 1024px) {
            .dash-root > div:last-child { margin-left: 0 !important; }
          }
        `}</style>

        <TopNavbar onMenuToggle={toggleMobileMenu} pageTitle={pageTitle} />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <motion.div
            key={pageTitle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
}
