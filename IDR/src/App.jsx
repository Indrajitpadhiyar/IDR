import { useEffect, useRef } from 'react';
import './App.css';
import LocomotiveScroll from 'locomotive-scroll';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { applyRouteSeo } from './utils/seo';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import WorkShowcasePage from './components/Pages/WorkShowcasePage';
import Services from './components/Pages/Services';
import TechShowcase from './components/Pages/TechShowcase';
import Terms from './components/SiteInfo/Terms';
import Privacy from './components/SiteInfo/Privacy';
import Refund from './components/SiteInfo/Refund';
import Cancellation from './components/SiteInfo/Cancellation';
import Disclaimer from './components/SiteInfo/Disclaimer'; 

const easing = (time) => 1 - Math.pow(1 - time, 3);

function App() {
  const location = useLocation();
  const scrollRef = useRef(null);

  useEffect(() => {
    applyRouteSeo(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      lenisOptions: {
        duration: 1.45,
        lerp: 0.08,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        gestureOrientation: 'vertical',
        easing,
      },
    });

    scrollRef.current = scroll;

    return () => {
      scroll.destroy();
      scrollRef.current = null;
    };
  }, []);

  useEffect(() => {
    const scroll = scrollRef.current;

    if (!scroll) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      if (location.hash) {
        scroll.scrollTo(location.hash, {
          offset: -110,
          duration: 1.3,
          easing,
        });
      } else {
        scroll.scrollTo(0, {
          immediate: true,
          force: true,
        });
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.hash, location.pathname]);

  return (
    <>
      <Toaster /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<WorkShowcasePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tech-showcase" element={<TechShowcase />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/cancellation" element={<Cancellation />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
      </Routes>
    </>
  );
}

export default App;