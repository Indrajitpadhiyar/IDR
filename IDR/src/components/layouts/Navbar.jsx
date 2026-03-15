import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  {
    name: 'Services',
    href: '#',
    subLinks: [
      { name: 'Web Development', href: '#our-work' },
      { name: 'UI/UX Design', href: '#our-work' },
      { name: 'Web Services', href: '#our-work' },
      // { name: 'APP development', href: '#our-work' }
    ]
  },
  { name: 'Portfolio', href: '#our-work' },
  { name: 'Team', href: '#team' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDropdown = (name, e) => {
    e.preventDefault();
    setActiveMobileDropdown(activeMobileDropdown === name ? null : name);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${scrolled ? 'bg-white shadow-sm py-2' : 'bg-white py-4'
          }`}
      >
        <div className="max-w-[1440px] px-6 lg:px-12 mx-auto flex items-center justify-between">

          {/* LOGO */}
          <a href="/" className="flex flex-col leading-none no-underline relative z-50">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
                <img src="/IDR.jpeg" alt="IDR Tech Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">IDR Tech</span>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden xl:flex items-center gap-6 lg:gap-8 h-full">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group cursor-pointer flex items-center gap-1.5 py-4">
                <a href={link.href} className="text-[15px] font-medium text-gray-800 hover:text-orange-500 transition-colors">
                  {link.name}
                </a>
                {link.subLinks && (
                  <>
                    <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-orange-500 transition-transform group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-56 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                      <div className="py-2">
                        {link.subLinks.map(sub => (
                          <a key={sub.name} href={sub.href} className="block px-5 py-3 text-[15px] font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="hidden xl:flex items-center gap-6">
            {/* <button className="text-gray-900 hover:text-orange-500 transition-colors rounded-full p-2 border border-gray-300 flex items-center justify-center w-10 h-10">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button> */}
            <a href="#contact" className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors">
              Contact us
            </a>
            <div className="flex items-center gap-1 cursor-pointer hover:text-orange-500 text-sm font-medium text-gray-800 transition-colors">
              EN
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="xl:hidden relative z-50 text-gray-900 focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[990] bg-white pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-5 pb-10">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-gray-100 pb-3">
                  <div className="flex items-center justify-between">
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.subLinks) {
                          toggleDropdown(link.name, e);
                        } else {
                          setMobileOpen(false);
                        }
                      }}
                      className="text-2xl font-bold text-gray-900"
                    >
                      {link.name}
                    </a>
                    {link.subLinks && (
                      <button
                        onClick={(e) => toggleDropdown(link.name, e)}
                        className="p-2 text-gray-400 hover:text-orange-500 focus:outline-none"
                      >
                        <motion.svg
                          animate={{ rotate: activeMobileDropdown === link.name ? 180 : 0 }}
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {link.subLinks && activeMobileDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-3 pl-4 pt-4 pb-2">
                          {link.subLinks.map(sub => (
                            <a
                              key={sub.name}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="text-[17px] font-semibold text-gray-600 hover:text-orange-500"
                            >
                              {sub.name}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="pt-6">
                <a href="#contact" onClick={() => setMobileOpen(false)} className="block w-full text-center px-6 py-4 bg-orange-500 hover:bg-orange-600 transition-colors text-white text-lg font-bold rounded-full">
                  Contact us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
