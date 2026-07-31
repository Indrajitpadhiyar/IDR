import { useEffect, useRef, lazy, Suspense } from "react";
import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion } from "motion/react";

import LocomotiveScroll from "locomotive-scroll";

import { applyRouteSeo } from "./utils/seo";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";

// Pages
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Services from "./components/Pages/Services";
import TechShowcase from "./components/Pages/TechShowcase";
import WorkShowcasePage from "./components/Pages/WorkShowcasePage";
import NotFound from "./components/Pages/NotFound";
import Contact from "./components/Contact/Contact";
import WebsiteMaintenance from "./components/Pages/WebsiteMaintenance";

// Lazy-loaded Dashboard components
const LoginPage = lazy(() => import("./components/dashboard/auth/LoginPage"));
const RegisterPage = lazy(() => import("./components/dashboard/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./components/dashboard/auth/ForgotPasswordPage"));
const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout"));

// User Dashboard
const UserDashboard = lazy(() => import("./components/dashboard/user/UserDashboard"));
const SubscriptionPage = lazy(() => import("./components/dashboard/user/SubscriptionPage"));
const ProfilePage = lazy(() => import("./components/dashboard/user/ProfilePage"));
const SettingsPage = lazy(() => import("./components/dashboard/user/SettingsPage"));
const InvoicesPage = lazy(() => import("./components/dashboard/user/InvoicesPage"));
const SupportPage = lazy(() => import("./components/dashboard/user/SupportPage"));
const WebsitePage = lazy(() => import("./components/dashboard/user/WebsitePage"));

// Admin Dashboard
const AdminDashboard = lazy(() => import("./components/dashboard/admin/AdminDashboard"));
const UsersPage = lazy(() => import("./components/dashboard/admin/UsersPage"));
const SubscriptionManager = lazy(() => import("./components/dashboard/admin/SubscriptionManager"));
const PaymentsPage = lazy(() => import("./components/dashboard/admin/PaymentsPage"));
const SupportAdmin = lazy(() => import("./components/dashboard/admin/SupportAdmin"));
const AnalyticsPage = lazy(() => import("./components/dashboard/admin/AnalyticsPage"));
const Reports = lazy(() => import("./components/dashboard/admin/Reports"));
const AdminSettings = lazy(() => import("./components/dashboard/admin/AdminSettings"));

// Legal Pages
import Terms from "./components/SiteInfo/Terms";
import Privacy from "./components/SiteInfo/Privacy";
import Refund from "./components/SiteInfo/Refund";
import Cancellation from "./components/SiteInfo/Cancellation";
import Disclaimer from "./components/SiteInfo/Disclaimer";

// -----------------------------
// Smooth easing
// -----------------------------
const easing = (t) => 1 - Math.pow(1 - t, 3);

function App() {
  const location = useLocation();

  // Scroll instance
  const scrollRef = useRef(null);

  // ======================================================
  // SEO Handler
  // ======================================================
  useEffect(() => {
    applyRouteSeo(location.pathname);
  }, [location.pathname]);

  // ======================================================
  // Initialize Locomotive Scroll
  // ======================================================
  useEffect(() => {
    const locomotive = new LocomotiveScroll({
      lenisOptions: {
        duration: 0.9,
        lerp: 0.14,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.2,
        gestureOrientation: "vertical",
      },
    });

    scrollRef.current = locomotive;

    // Refresh after layout render
    const refreshTimeout = setTimeout(() => {
      locomotive.update();
    }, 400);

    return () => {
      clearTimeout(refreshTimeout);

      if (scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const scroll = scrollRef.current;

    if (!scroll) return;

    const animationFrame = window.requestAnimationFrame(() => {
      // HASH SCROLL
      if (location.hash) {
        const targetId = location.hash.replace("#", "");

        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          setTimeout(() => {
            scroll.scrollTo(targetElement, {
              offset: -110,
              duration: 1.2,
              easing,
            });
          }, 150);
        }
      }

      // NORMAL PAGE SCROLL TOP
      else {
        scroll.scrollTo(0, {
          duration: 0,
          disableLerp: true,
          immediate: true,
        });
      }
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [location.pathname, location.hash]);

  return (
    <SocketProvider>
      <AuthProvider>
      {/* ========================================= */}
      {/* Toast Notifications */}
      {/* ========================================= */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
        }}
      />

      {/* ========================================= */}
      {/* Application Routes */}
      {/* ========================================= */}
      <Suspense fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-[var(--dash-text)]">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-[var(--dash-orange)] rounded-full animate-spin mb-4" />
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Loading Portal...</p>
        </div>
      }>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tech-showcase" element={<TechShowcase />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/website-maintenance" element={<WebsiteMaintenance />} />
          <Route path="/amc" element={<WebsiteMaintenance />} />
          <Route
            path="/website-maintenance-amc"
            element={<WebsiteMaintenance />}
          />

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* User Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout isAdmin={false} pageTitle="Client Portal" />}>
            <Route index element={<UserDashboard />} />
            <Route path="subscription" element={<SubscriptionPage />} />
            <Route path="website" element={<WebsitePage />} />
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Admin Dashboard */}
          <Route path="/admin" element={<DashboardLayout isAdmin={true} pageTitle="Admin Console" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="subscriptions" element={<SubscriptionManager />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="support" element={<SupportAdmin />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Portfolio */}
          <Route path="/projects" element={<WorkShowcasePage />} />
          <Route path="/our-work" element={<WorkShowcasePage />} />

          {/* Legal Pages */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* Floating WhatsApp Button */}
      {location.pathname !== "/login" && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
          {/* Pulsing ring */}
          <span className="absolute inline-flex h-14 w-14 animate-ping rounded-full bg-[#25D366] opacity-75" />

          <motion.a
            href="https://wa.me/919714833771?text=Hello%20IDR%20Tech%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] cursor-pointer"
            aria-label="Chat on WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="h-7 w-7 fill-white"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
          </motion.a>
        </div>
      )}
      </AuthProvider>
    </SocketProvider>
  );
}

export default App;
