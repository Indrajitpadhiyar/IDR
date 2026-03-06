import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   NAV CONFIG
───────────────────────────────────────────────────────────── */
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Our Team', href: '#team' },
  { name: 'Our Work', href: '#our-work' },
  { name: 'Contact', href: '#contact' },
];

const STAR_COLORS = ['#a78bfa', '#60a5fa', '#f472b6', '#34d399', '#fbbf24', '#fff'];

const StarParticle = ({ x, y, color, angle, distance, size, onDone }) => {
  const rad = (angle * Math.PI) / 180;
  const tx = Math.cos(rad) * distance;
  const ty = Math.sin(rad) * distance;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999]"
      style={{ left: x, top: y, width: size, height: size }}
      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      animate={{ opacity: 0, scale: 0, x: tx, y: ty }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      onAnimationComplete={onDone}
    >
      <svg viewBox="0 0 20 20" fill={color} className="w-full h-full drop-shadow-lg">
        <polygon points="10,1 12.9,7 19.5,7.6 14.7,12 16.5,18.5 10,15 3.5,18.5 5.3,12 0.5,7.6 7.1,7" />
      </svg>
    </motion.div>
  );
};

let starId = 0;
const useStarBurst = () => {
  const [stars, setStars] = useState([]);
  const burst = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const count = 10;
    const newStars = Array.from({ length: count }, (_, i) => ({
      id: ++starId,
      x: cx,
      y: cy,
      color: STAR_COLORS[i % STAR_COLORS.length],
      angle: (360 / count) * i + Math.random() * 20,
      distance: 32 + Math.random() * 28,
      size: 8 + Math.random() * 8,
    }));
    setStars((prev) => [...prev, ...newStars]);
  }, []);
  const removeStar = useCallback((id) => {
    setStars((prev) => prev.filter((s) => s.id !== id));
  }, []);
  return { stars, burst, removeStar };
};

/* ─────────────────────────────────────────────────────────────
   SINGLE NAV LINK (desktop)
───────────────────────────────────────────────────────────── */
const NavLink = ({ link, active, onClick, onBurst }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    onBurst(e);
    setClicked(true);
    setTimeout(() => setClicked(false), 400);
    // pass the href string so the parent can scroll
    onClick(link.href);
  };

  return (
    <li className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <motion.a
        href={link.href}
        onClick={handleClick}
        whileTap={{ scale: 0.92 }}
        className={`relative flex flex-col items-center px-5 py-2.5 rounded-xl text-[16px] font-semibold cursor-pointer no-underline whitespace-nowrap select-none transition-colors duration-200
          ${active ? 'text-violet-700' : 'text-gray-600 hover:text-violet-700'}`}
      >
        <AnimatePresence>
          {(hovered || active) && (
            <motion.span
              layoutId="nav-pill"
              className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {clicked && (
            <motion.span
              className="absolute inset-0 rounded-xl border-2 border-violet-400"
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 1.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            />
          )}
        </AnimatePresence>

        <span className="relative z-10">{link.name}</span>

        <motion.span
          className="relative z-10 block h-[2.5px] w-full rounded-full bg-gradient-to-r from-violet-500 via-blue-400 to-pink-400 mt-0.5 origin-center"
          initial={false}
          animate={{ scaleX: hovered || active ? 1 : 0, opacity: hovered || active ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.a>
    </li>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const lastScrollY = useRef(0);

  const { stars, burst, removeStar } = useStarBurst();

  /* ── scroll handler ── */
  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY;
      setScrolled(cur > 60);
      if (cur > lastScrollY.current && cur > 100) {
        setVisible(false);
        setMobileOpen(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = cur;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (href) => {
    if (!href || !href.startsWith('#')) return;
    const target = document.getElementById(href.slice(1));
    if (target) {
      const offset = 72; // header height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setMobileOpen(false);
    // manually scroll after closing mobile menu (prevents jump behind header)
    scrollToSection(href);
  };

  /* ── Mobile nav click with star burst ── */
  const handleMobileLinkClick = (e, href) => {
    e.preventDefault();
    burst(e);
    // close menu immediately
    setMobileOpen(false);
    setActiveLink(href);
    // wait a tick so the menu has started collapsing before scrolling
    setTimeout(() => scrollToSection(href), 120);
  };

  return (
    <>
      {/* ══════ STAR PARTICLES (portal-like, fixed overlay) ══════ */}
      {stars.map((s) => (
        <StarParticle key={s.id} {...s} onDone={() => removeStar(s.id)} />
      ))}

      {/* ══════ NAVBAR ══════ */}
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: visible ? 0 : '-110%', opacity: 1 }}
        transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-[background,box-shadow,border-color] duration-400
          ${scrolled
            ? 'bg-white/80 backdrop-blur-2xl shadow-[0_4px_32px_rgba(109,40,217,0.12)] border-b border-violet-100/60'
            : 'bg-white/95 border-b border-transparent'
          }`}
      >
        {/* Top gradient accent bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-violet-500 via-blue-400 to-pink-400" />

        <div className="max-w-[1300px] mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-3 relative">

          {/* ── LOGO ── */}
          <a
            href="/"
            onClick={(e) => { burst(e); handleLinkClick('/'); }}
            className="flex items-center gap-2.5 no-underline flex-shrink-0 group"
          >
            {/* <motion.div
              whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              transition={{ duration: 0.4 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-black text-[13px] tracking-tight shadow-[0_4px_14px_rgba(109,40,217,0.40)] group-hover:shadow-[0_6px_20px_rgba(109,40,217,0.55)] transition-shadow duration-300"
            >
              IDR
            </motion.div> */}
            <div className="flex flex-col leading-none">
              <span className="text-[26px] font-extrabold bg-gradient-to-r from-violet-600 via-blue-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
                IDR Tech
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                Innovation
              </span>
            </div>
          </a>

          {/* ── DESKTOP LINKS (centered absolutely) ── */}
          <ul className="hidden lg:flex items-center list-none m-0 p-0 gap-2 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                link={link}
                active={activeLink === link.href}
                onClick={handleLinkClick}
                onBurst={burst}
              />
            ))}
          </ul>

          {/* ── HAMBURGER ── */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
            className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-[5px] cursor-pointer rounded-xl border border-violet-100 bg-white/80 hover:bg-violet-50 transition-colors duration-200 flex-shrink-0"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-5 h-0.5 bg-gray-700 rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-0.5 bg-gray-700 rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-5 h-0.5 bg-gray-700 rounded-full"
            />
          </button>
        </div>
      </motion.header>

      {/* ══════ MOBILE MENU ══════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-[63px] left-0 right-0 z-[999] bg-white/95 backdrop-blur-2xl border-b border-violet-100 shadow-[0_16px_48px_rgba(109,40,217,0.13)] overflow-hidden"
          >
            {/* accent bar */}
            <div className="h-[2px] w-full bg-gradient-to-r from-violet-500 via-blue-400 to-pink-400" />

            <ul className="list-none m-0 p-3">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ x: -24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleMobileLinkClick(e, link.href)}
                    whileTap={{ scale: 0.96 }}
                    className={`flex items-center justify-between px-4 py-3 text-[15px] font-semibold rounded-xl no-underline transition-all duration-200
                      ${activeLink === link.href
                        ? 'bg-gradient-to-r from-violet-50 to-blue-50 text-violet-700 border border-violet-100'
                        : 'text-gray-700 hover:bg-violet-50/70 hover:text-violet-700'
                      }`}
                  >
                    <span>{link.name}</span>
                    {activeLink === link.href && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-violet-500 text-xs"
                      >
                        ✦
                      </motion.span>
                    )}
                  </motion.a>

                  {/* sub-links */}
                  {link.children && (
                    <ul className="list-none p-0 pl-3 mt-0.5 mb-1.5">
                      {link.children.map((child) => (
                        <li key={child.name}>
                          <motion.a
                            href={child.href}
                            onClick={(e) => handleMobileLinkClick(e, child.href)}
                            whileTap={{ scale: 0.96 }}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 rounded-lg no-underline hover:bg-violet-50 hover:text-violet-600 transition-colors duration-200 group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-300 group-hover:bg-violet-500 transition-colors duration-200" />
                            {child.name}
                          </motion.a>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="px-6 pb-6 pt-2"
            >
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
