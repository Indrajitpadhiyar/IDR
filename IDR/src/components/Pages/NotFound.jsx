import { ArrowRight, Compass, Home, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Footer from '../layouts/Footer';
import Navbar from '../layouts/Navbar';

const quickLinks = [
  { label: 'Explore services', to: '/services' },
  { label: 'View work', to: '/our-work' },
  { label: 'Meet the studio', to: '/about' },
];

const NotFound = () => {
  return (
    <div className="min-h-screen overflow-hidden text-[#12306d]">
      <Navbar />

      <main className="not-found-page relative min-h-screen px-4 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-12 pb-20 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.section
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative z-10"
          >
            <span className="section-eyebrow">
              <Compass className="h-4 w-4" />
              Page not found
            </span>

            <h1 className="mt-7 max-w-4xl text-[clamp(4.8rem,18vw,13rem)] font-black leading-[0.78] tracking-[0em] text-[#12306d]">
              404
            </h1>

            <p className="mt-7 max-w-2xl font-['Sora'] text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.98] tracking-[0em] text-[#10224a]">
              This page drifted out of frame.
            </p>

            <p className="section-copy mt-6">
              The link may be broken, moved, or still waiting for its launch moment. Head back to the studio and keep exploring.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/" className="brand-btn-primary">
                <Home className="h-4 w-4" />
                Back home
              </Link>

              <Link to="/contact" className="brand-btn-secondary">
                Contact us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, scale: 0.94, y: 34 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: 'easeOut' }}
            className="not-found-panel relative z-10"
          >
            <div className="not-found-panel__media">
              <img
                src="/IDR.jpeg"
                alt="IDR Tech"
                width="220"
                height="220"
                decoding="async"
                className="h-28 w-28 rounded-[30px] object-cover shadow-[0_24px_55px_rgba(11,99,246,0.18)] sm:h-36 sm:w-36"
              />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.32em] text-[#ff7a1a]">IDR Tech</p>
                <h2 className="mt-3 font-['Sora'] text-3xl font-bold leading-tight tracking-[0em] text-[#12306d] sm:text-4xl">
                  Let us point you somewhere useful.
                </h2>
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-center justify-between rounded-[24px] border border-white/80 bg-white/82 px-5 py-4 text-sm font-bold text-[#12306d] shadow-[0_16px_34px_rgba(11,99,246,0.08)] transition duration-300 hover:-translate-y-1 hover:text-[#0b63f6]"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-[#244a9b]/10 bg-[#f7fbff]/82 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#244a9b]/10 text-[#244a9b]">
                  <Search className="h-5 w-5" />
                </div>
                <p className="text-sm leading-7 text-[#5e78ad]">
                  If you typed the address manually, check the URL once more. Otherwise, the links above should get you moving again.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
