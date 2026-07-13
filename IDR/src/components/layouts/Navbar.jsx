import { useEffect, useState, startTransition } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', id: 'home', kind: 'hash' },
  { label: 'About', id: 'about', kind: 'hash' },
  { label: 'Services', kind: 'route', to: '/services' },
  { label: 'Work', id: 'our-work', kind: 'hash' },
  { label: 'Tech Lab', kind: 'route', to: '/tech-showcase' },
  { label: 'AMC', kind: 'route', to: '/website-maintenance' },
];

const Navbar = () => {
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
    });
  }, [location.pathname]);

  const handleScroll = (id) => {
    // If not on homepage → redirect first
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);

    if (element) {
      const offset = 110;

      const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top,
        behavior: 'smooth',
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
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className={`glass-panel flex items-center justify-between rounded-3xl px-4 py-3 sm:px-5 ${scrolled
                ? 'border-white/85 shadow-[0_20px_50px_rgba(11,99,246,0.12)]'
                : ''
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
                link.kind === 'route' ? (
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
            <div className="hidden items-center gap-3 lg:flex">
              <button
                onClick={() => handleScroll('contact')}
                className="brand-btn-primary px-5 py-3 text-sm"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[#12306d] transition-colors duration-300 hover:border-[#0b63f6]/30 hover:text-[#0b63f6] lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
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
            style={{ willChange: 'opacity, backdrop-filter' }}
          >
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: 'circOut' }}
              className="glass-panel mx-auto flex h-full max-w-2xl flex-col rounded-[36px] p-6"
              style={{ willChange: 'transform, opacity' }}
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
                  link.kind === 'route' ? (
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
                      style={{ willChange: 'transform, opacity' }}
                    >
                      {link.label}
                    </motion.button>
                  ),
                )}
              </div>

              {/* Mobile CTA */}
              <button
                onClick={() => handleScroll('/contact')}
                className="brand-btn-primary mt-6"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;