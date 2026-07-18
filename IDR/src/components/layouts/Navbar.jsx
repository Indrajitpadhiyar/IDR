import { useEffect, useState, startTransition, useRef } from "react";
import {
  ArrowRight,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { label: "Home", id: "home", kind: "hash" },
  { label: "About", id: "about", kind: "hash" },
  { label: "Services", kind: "route", to: "/services" },
  { label: "Work", id: "our-work", kind: "hash" },
  { label: "Tech Lab", kind: "route", to: "/tech-showcase" },
  // { label: "AMC", kind: "route", to: "/website-maintenance" },
];

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
    });
  }, [location.pathname]);

  const handleScroll = (id) => {
    // If not on homepage → redirect first
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);

    if (element) {
      const offset = 110;

      const top = element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }

    setMobileOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className={`glass-panel flex items-center justify-between rounded-3xl px-4 py-3 sm:px-5 ${
              scrolled
                ? "border-white/85 shadow-[0_20px_50px_rgba(11,99,246,0.12)]"
                : ""
            }`}
          >
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/70 bg-white shadow-[0_12px_28px_rgba(11,99,246,0.12)]">
                <img
                  src="/IDR.jpeg"
                  alt="IDR Tech logo"
                  width={44}
                  height={44}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="leading-none">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0b63f6]">
                  IDR Tech
                </p>

                <p className="mt-1 text-sm text-[#5e78ad]">
                  Web design and development studio
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) =>
                link.kind === "route" ? (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm font-semibold text-[#12306d] transition-colors duration-300 hover:text-[#0b63f6]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.id}
                    onClick={() => handleScroll(link.id)}
                    className="text-sm font-semibold text-[#12306d] transition-colors duration-300 hover:text-[#0b63f6]"
                  >
                    {link.label}
                  </button>
                ),
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-4 lg:flex">
              <button
                onClick={() => handleScroll("contact")}
                className="brand-btn-primary px-5 py-3 text-sm"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </button>

              {isAuthenticated ? (
                /* Profile Dropdown */
                <div
                  className="relative animate-in fade-in zoom-in duration-300"
                  ref={profileRef}
                >
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-white/60 bg-white/70 hover:bg-white transition-all duration-300 shadow-[0_8px_30px_rgba(11,99,246,0.06)] hover:shadow-[0_12px_40px_rgba(11,99,246,0.12)] cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF8F32] to-[#0b63f6] flex items-center justify-center text-white text-xs font-bold shadow-sm border border-white/80">
                      {initials}
                    </div>
                    <span className="text-xs font-bold text-[#12306d] truncate max-w-[90px] hidden xl:inline-block">
                      {user?.name?.split(" ")[0] || "Profile"}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#5e78ad] transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-2 w-56 glass-panel bg-white/95 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_20px_50px_rgba(11,99,246,0.15)] py-2.5 z-50 text-left"
                      >
                        <div className="px-4 py-2 border-b border-slate-100/80 mb-1.5">
                          <p className="text-sm font-semibold text-[#12306d] leading-none mb-1">
                            {user?.name}
                          </p>
                          <p className="text-[10px] text-[#5e78ad] truncate leading-none">
                            {user?.email}
                          </p>
                        </div>

                        <div className="py-1">
                          <Link
                            to={isAdmin ? "/admin" : "/dashboard"}
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#5e78ad] hover:text-[#0b63f6] hover:bg-blue-50/50 transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4 text-[#0b63f6]" />
                            Dashboard
                          </Link>
                          {isAdmin && (
                            <Link
                              to="/admin/settings"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#5e78ad] hover:text-[#0b63f6] hover:bg-blue-50/50 transition-colors"
                            >
                              <User className="w-4 h-4 text-[#0b63f6]" />
                              Profile Settings
                            </Link>
                          )}
                        </div>

                        <div className="border-t border-slate-100/80 pt-1.5 mt-1.5">
                          <button
                            onClick={() => {
                              setProfileOpen(false);
                              logout();
                            }}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50/50 transition-colors w-full text-left cursor-pointer"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Sleek Sign In Link */
                <Link
                  to="/login"
                  className="text-sm font-semibold text-[#12306d] transition-colors duration-300 hover:text-[#0b63f6] px-4 py-2.5 rounded-2xl border border-white/60 bg-white/50 hover:bg-white/80 shadow-sm"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[#12306d] transition-colors duration-300 hover:border-[#0b63f6]/30 hover:text-[#0b63f6] lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[rgba(11,99,246,0.14)] px-4 pb-6 pt-24 backdrop-blur-md sm:px-6 lg:hidden"
            style={{ willChange: "opacity, backdrop-filter" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="glass-panel mx-auto flex h-full max-w-2xl flex-col rounded-[36px] p-6"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="rounded-[28px] bg-[linear-gradient(135deg,rgba(11,99,246,0.12),rgba(255,143,50,0.14),rgba(255,255,255,0.92))] p-5">
                <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#0b63f6]">
                  Navigation
                </div>

                <p className="mt-3 max-w-md text-sm leading-7 text-[#5e78ad]">
                  IDR Tech builds modern websites, UI/UX systems, and digital
                  experiences for brands that want a better online presence.
                </p>
              </div>

              {/* Mobile Links */}
              <div className="mt-8 flex flex-1 flex-col gap-3">
                {navLinks.map((link, index) =>
                  link.kind === "route" ? (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{
                        duration: 0.22,
                        delay: index * 0.04,
                      }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-[24px] border border-white/80 bg-white/86 px-5 py-4 text-lg font-semibold text-[#12306d] shadow-[0_14px_36px_rgba(11,99,246,0.08)]"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{
                        duration: 0.22,
                        delay: index * 0.04,
                      }}
                      onClick={() => handleScroll(link.id)}
                      className="rounded-[24px] border border-white/80 bg-white/86 px-5 py-4 text-left text-lg font-semibold text-[#12306d] shadow-[0_14px_36px_rgba(11,99,246,0.08)]"
                      style={{ willChange: "transform, opacity" }}
                    >
                      {link.label}
                    </motion.button>
                  ),
                )}
              </div>

              {/* Mobile CTA & Auth Block */}
              <div className="mt-auto pt-6 space-y-4">
                <button
                  onClick={() => handleScroll("contact")}
                  className="brand-btn-primary w-full flex items-center justify-center gap-2"
                >
                  Contact us
                  <ArrowRight className="h-4 w-4" />
                </button>

                {isAuthenticated ? (
                  <div className="border-t border-slate-200/50 pt-5 mt-4 text-left">
                    <div className="flex items-center gap-3 mb-4 px-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF8F32] to-[#0b63f6] flex items-center justify-center text-white text-xs font-bold shadow-sm border border-white/80">
                        {initials}
                      </div>
                      <div className="leading-tight">
                        <p className="text-sm font-semibold text-[#12306d]">
                          {user?.name}
                        </p>
                        <p className="text-xs text-[#5e78ad] truncate max-w-[200px]">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={isAdmin ? "/admin" : "/dashboard"}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center gap-1.5 rounded-2xl border border-white/85 bg-white/70 hover:bg-white py-3 text-xs font-bold text-[#12306d] transition-all shadow-sm"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#0b63f6]" />
                        Dashboard
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin/settings"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-center gap-1.5 rounded-2xl border border-white/85 bg-white/70 hover:bg-white py-3 text-xs font-bold text-[#12306d] transition-all shadow-sm"
                        >
                          <User className="w-3.5 h-3.5 text-[#0b63f6]" />
                          Profile
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          setMobileOpen(false);
                          logout();
                        }}
                        className="col-span-2 flex items-center justify-center gap-2 rounded-2xl border border-rose-100 bg-rose-50/60 hover:bg-rose-50 py-3 text-xs font-bold text-rose-600 transition-all cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/80 bg-white/80 hover:bg-white py-3 text-sm font-bold text-[#12306d] shadow-sm transition-all text-center"
                  >
                    Sign In to Portal
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
