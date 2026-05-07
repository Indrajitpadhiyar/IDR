import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

/* ─── tiny helpers ─── */
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    className="w-6 h-6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    className="w-4 h-4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ─── page-level icon map ─── */
const PAGE_META = {
  'Terms & Conditions':    { color: '#0b63f6', bg: 'from-[#0b63f6] to-[#0040c8]', tag: 'Legal Agreement' },
  'Privacy Policy':        { color: '#7c3aed', bg: 'from-[#7c3aed] to-[#4f1d96]', tag: 'Data Protection' },
  Disclaimer:              { color: '#ea580c', bg: 'from-[#ea580c] to-[#9a3412]', tag: 'Important Notice' },
  'Refund Policy':         { color: '#059669', bg: 'from-[#059669] to-[#065f46]', tag: 'Refund Guidelines' },
  'Cancellation Policy':   { color: '#db2777', bg: 'from-[#db2777] to-[#831843]', tag: 'Cancellation Terms' },
};

/* ─── extract h2 headings from JSX children ─── */
function extractHeadings(children) {
  const headings = [];
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    const { type, props } = node;
    if (type === 'h2' && props?.children) {
      headings.push(typeof props.children === 'string' ? props.children : props.children.toString());
    }
    if (props?.children) {
      const c = props.children;
      if (Array.isArray(c)) c.forEach(walk);
      else walk(c);
    }
  };
  const c = children?.props?.children;
  if (Array.isArray(c)) c.forEach(walk);
  else walk(c);
  return headings;
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
const LegalLayout = ({ title, effectiveDate, children }) => {
  const meta = PAGE_META[title] || PAGE_META['Terms & Conditions'];
  const headings = extractHeadings(children);
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRefs = useRef([]);
  const contentRef = useRef(null);

  /* track scroll → highlight sidebar item */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* inject ids into h2 elements via ref + DOM */
  useEffect(() => {
    if (!contentRef.current) return;
    const h2s = contentRef.current.querySelectorAll('h2');
    sectionRefs.current = Array.from(h2s);
    h2s.forEach((el, i) => { el.id = `section-${i}`; });
  });

  const scrollTo = (i) => {
    const el = document.getElementById(`section-${i}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#f4f7ff] text-[#12306d]">
      <Navbar />

      {/* ── Hero Banner ── */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${meta.bg} pt-32 pb-16`}>
        {/* Mesh / orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-2xl" />
          {/* grid lines */}
          <svg className="absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Tag chip */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm mb-5">
              <ShieldIcon />
              {meta.tag}
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm">
                <ClockIcon />
                Effective: <strong>{effectiveDate}</strong>
              </span>
              <span className="text-white/50 text-sm">
                This document governs your use of IDR Tech services.
              </span>
            </div>
          </motion.div>
        </div>

        {/* wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-12" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,48 C480,0 960,48 1440,16 L1440,48 Z" fill="#f4f7ff" />
          </svg>
        </div>
      </div>

      {/* ── Body ── */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex gap-8 lg:gap-12">

          {/* ── Sidebar (desktop) ── */}
          {headings.length > 0 && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block w-64 shrink-0"
            >
              <div className="sticky top-28">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#8fa3c8]">
                  On this page
                </p>
                <nav className="space-y-1">
                  {headings.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => scrollTo(i)}
                      className={`w-full text-left flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 group ${
                        activeIdx === i
                          ? 'font-semibold text-white'
                          : 'text-[#5e78ad] hover:bg-white hover:shadow-sm hover:text-[#12306d]'
                      }`}
                      style={activeIdx === i ? { backgroundColor: meta.color } : {}}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                          activeIdx === i ? 'bg-white/20 text-white' : 'bg-[#e8eeff] text-[#5e78ad] group-hover:bg-blue-100'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="line-clamp-2 leading-snug">{h}</span>
                    </button>
                  ))}
                </nav>

                {/* back to top */}
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="mt-6 w-full rounded-xl border border-[#e0e8ff] bg-white px-4 py-2.5 text-xs font-semibold text-[#5e78ad] hover:border-[#c0cff8] hover:text-[#12306d] transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="w-4 h-4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  Back to top
                </button>
              </div>
            </motion.aside>
          )}

          {/* ── Content Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="min-w-0 flex-1"
          >
            <div
              ref={contentRef}
              className="rounded-3xl bg-white shadow-[0_4px_40px_rgba(11,99,246,0.06)] border border-[#e8eeff] p-6 sm:p-10"
            >
              {/* section styling via CSS vars */}
              <style>{`
                .legal-content section {
                  border-bottom: 1px solid #eef2ff;
                  padding-bottom: 2rem;
                }
                .legal-content section:last-child {
                  border-bottom: none;
                  padding-bottom: 0;
                }
                .legal-content h2 {
                  scroll-margin-top: 120px;
                  display: flex;
                  align-items: center;
                  gap: 0.6rem;
                  font-size: 1.1rem;
                  font-weight: 700;
                  color: #12306d;
                  margin-bottom: 0.75rem;
                }
                .legal-content h2::before {
                  content: '';
                  display: inline-block;
                  width: 4px;
                  height: 1.1em;
                  border-radius: 99px;
                  background: ${meta.color};
                  flex-shrink: 0;
                  margin-right: 4px;
                }
                .legal-content p {
                  color: #4a5e8a;
                  line-height: 1.85;
                  font-size: 0.95rem;
                }
                .legal-content ul {
                  list-style: none;
                  padding: 0;
                  margin-top: 0.6rem;
                  display: flex;
                  flex-direction: column;
                  gap: 0.4rem;
                }
                .legal-content ul li {
                  display: flex;
                  align-items: flex-start;
                  gap: 0.6rem;
                  color: #4a5e8a;
                  font-size: 0.93rem;
                  line-height: 1.7;
                }
                .legal-content ul li::before {
                  content: '';
                  display: inline-block;
                  width: 6px;
                  height: 6px;
                  border-radius: 50%;
                  background: ${meta.color};
                  margin-top: 0.55em;
                  flex-shrink: 0;
                }
                .legal-content strong { color: #12306d; font-weight: 700; }
                .legal-content a { color: ${meta.color}; font-weight: 500; text-decoration: underline; text-underline-offset: 3px; }
                .legal-content a:hover { opacity: 0.75; }
                .legal-content em, .legal-content .italic { color: #8fa3c8; }

                /* highlighted callout sections */
                .legal-content .rounded-3xl {
                  border-radius: 1.25rem !important;
                  margin-top: 0.5rem;
                }

                @media (max-width: 640px) {
                  .legal-content h2 { font-size: 1rem; }
                  .legal-content p, .legal-content ul li { font-size: 0.88rem; }
                }
              `}</style>

              <div className="legal-content space-y-8">
                {children}
              </div>
            </div>

            {/* ── Mobile TOC (accordion style, shown only on small screens) ── */}
            {headings.length > 0 && (
              <MobileTOC headings={headings} scrollTo={scrollTo} color={meta.color} />
            )}

            {/* ── Bottom info strip ── */}
            <div className="mt-6 rounded-2xl bg-white border border-[#e8eeff] px-6 py-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
              <p className="text-xs text-[#8fa3c8]">
                Last updated: <span className="font-semibold text-[#5e78ad]">{effectiveDate}</span>
              </p>
              <a
                href="mailto:idrtech23@gmail.com"
                className="text-xs font-semibold rounded-lg px-3 py-1.5 transition-colors text-white"
                style={{ backgroundColor: meta.color }}
              >
                Contact IDR Tech →
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

/* ─── Mobile TOC ─── */
function MobileTOC({ headings, scrollTo, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden mt-4">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between rounded-2xl border border-[#e8eeff] bg-white px-5 py-3.5 text-sm font-semibold text-[#12306d] shadow-sm"
      >
        <span>📋 Jump to section</span>
        <svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 rounded-2xl border border-[#e8eeff] bg-white p-3 shadow-lg"
        >
          {headings.map((h, i) => (
            <button
              key={i}
              onClick={() => { scrollTo(i); setOpen(false); }}
              className="w-full text-left flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#5e78ad] hover:bg-[#f4f7ff] hover:text-[#12306d] transition-colors"
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: color }}
              >
                {i + 1}
              </span>
              {h}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default LegalLayout;
