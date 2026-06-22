import { useEffect, useRef } from 'react';
import './App.css';

import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LocomotiveScroll from 'locomotive-scroll';

import { applyRouteSeo } from './utils/seo';

// Pages
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Services from './components/Pages/Services';
import TechShowcase from './components/Pages/TechShowcase';
import WorkShowcasePage from './components/Pages/WorkShowcasePage';
import NotFound from './components/Pages/NotFound';
import Contact from './components/Contact/Contact';

// Legal Pages
import Terms from './components/SiteInfo/Terms';
import Privacy from './components/SiteInfo/Privacy';
import Refund from './components/SiteInfo/Refund';
import Cancellation from './components/SiteInfo/Cancellation';
import Disclaimer from './components/SiteInfo/Disclaimer';

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
        duration: 1.4,
        lerp: 0.08,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        gestureOrientation: 'vertical',
        easing,
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
        const targetId = location.hash.replace('#', '');

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
    <>
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
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tech-showcase" element={<TechShowcase />} />
        <Route path="/contact" element={<Contact />} />

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
    </>
  );
}

export default App;
