import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight, ChevronRight,
  ExternalLink, Maximize2, Sparkles, Star, X, Zap,
} from 'lucide-react';
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { projects } from '../../data/projects';

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
const getProjectLinkProps = (link) => ({
  href: link,
  target: link.startsWith('http') ? '_blank' : undefined,
  rel: link.startsWith('http') ? 'noreferrer' : undefined,
});

const categoryColors = {
  'Full Stack E-Commerce': { bg: 'rgba(11,99,246,0.10)',   text: '#0b63f6', dot: '#0b63f6' },
  'Frontend Development':  { bg: 'rgba(99,102,241,0.10)',  text: '#6366f1', dot: '#6366f1' },
  'Luxury Brand Showcase': { bg: 'rgba(180,130,60,0.12)',  text: '#b4823c', dot: '#b4823c' },
  Fitness:                 { bg: 'rgba(34,197,94,0.10)',   text: '#16a34a', dot: '#16a34a' },
  Campaign:                { bg: 'rgba(239,68,68,0.10)',   text: '#dc2626', dot: '#dc2626' },
  'E-Commerce':            { bg: 'rgba(255,143,50,0.12)',  text: '#ff8f32', dot: '#ff8f32' },
  Management:              { bg: 'rgba(168,85,247,0.10)',  text: '#9333ea', dot: '#9333ea' },
  Design:                  { bg: 'rgba(20,210,200,0.10)',  text: '#0d9488', dot: '#0d9488' },
};
const getCatStyle = (cat) =>
  categoryColors[cat] ?? { bg: 'rgba(11,99,246,0.08)', text: '#0b63f6', dot: '#0b63f6' };

/* ───────────────────────────────────────────
   iOS Slide-to-Explore button
─────────────────────────────────────────── */
const THUMB = 60;
const PAD   = 6;

function SlideToExplore({ total }) {
  const navigate   = useNavigate();
  const trackRef   = useRef(null);
  const maxXRef    = useRef(0);
  const [maxX, setMaxX]           = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [done, setDone]           = useState(false);
  const [origin, setOrigin]       = useState({ x: 0, y: 0 });

  const x        = useMotionValue(0);
  const progress = useTransform(x, (v) => maxXRef.current > 0 ? Math.min(1, v / maxXRef.current) : 0);

  /* derived animations */
  const labelOpacity   = useTransform(progress, [0, 0.35], [1, 0]);
  const releaseOpacity = useTransform(progress, [0.72, 1],  [0, 1]);
  const fillRight      = useTransform(progress, [0, 1], ['0%', '100%']);
  const thumbBg        = useTransform(progress,
    [0, 1],
    ['linear-gradient(135deg,#ff8f32,#e54a10)', 'linear-gradient(135deg,#0b63f6,#1542a8)'],
  );

  /* measure track */
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const tw = trackRef.current.offsetWidth;
      const mx = tw - THUMB - PAD * 2;
      maxXRef.current = mx;
      setMaxX(mx);
      animate(x, 0, { duration: 0.25 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    const prog = maxXRef.current > 0 ? x.get() / maxXRef.current : 0;
    if (prog >= 0.88) {
      /* capture center of thumb in viewport coords */
      if (trackRef.current) {
        const r = trackRef.current.getBoundingClientRect();
        setOrigin({ x: r.right - THUMB / 2 - PAD, y: r.top + r.height / 2 });
      }
      setDone(true);
      setTimeout(() => navigate('/projects'), 680);
    } else {
      animate(x, 0, { type: 'spring', stiffness: 480, damping: 36 });
    }
  };

  const maxDiag = typeof window !== 'undefined'
    ? Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 1.15
    : 2400;

  return (
    <>
      {/* ── Slider track ── */}
      <div
        ref={trackRef}
        className="relative mt-6 select-none overflow-hidden"
        style={{
          height: THUMB + PAD * 2,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.88)',
          border: '1.5px solid rgba(11,99,246,0.16)',
          boxShadow: '0 16px 48px rgba(11,99,246,0.10)',
        }}
      >
        {/* Progress fill */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0,
            right: fillRight,  /* trick: right shrinks as fill grows */
            borderRadius: 999,
            background: 'linear-gradient(135deg, rgba(11,99,246,0.10), rgba(11,99,246,0.05))',
          }}
        />

        {/* Label: default */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ opacity: labelOpacity }}
        >
          <span
            className="select-none text-sm font-bold tracking-wide sm:text-base"
            style={{ color: '#12306d' }}
          >
            Slide to explore all {total} projects
          </span>
        </motion.div>

        {/* Label: release */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ opacity: releaseOpacity }}
        >
          <span className="select-none text-sm font-bold" style={{ color: '#0b63f6' }}>
            Release to open →
          </span>
        </motion.div>

        {/* Draggable thumb */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: maxX }}
          dragElastic={0.01}
          dragMomentum={false}
          style={{
            x,
            position: 'absolute',
            top: PAD,
            left: PAD,
            width: THUMB,
            height: THUMB,
            borderRadius: '50%',
            background: thumbBg,
            boxShadow: '0 4px 20px rgba(255,143,50,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isDragging ? 'grabbing' : 'grab',
            zIndex: 10,
            touchAction: 'none',
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </motion.div>
      </div>

      {/* ── Full-screen ripple ── */}
      {done && (
        <motion.div
          className="fixed z-[99999] rounded-full"
          style={{
            left:  origin.x - THUMB / 2,
            top:   origin.y - THUMB / 2,
            width:  THUMB,
            height: THUMB,
            background: 'linear-gradient(135deg, #0b63f6, #1542a8)',
            pointerEvents: 'none',
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: maxDiag / THUMB, opacity: 1 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </>
  );
}

/* ─────────────────────────────────────────
   macOS‑style Full‑Page Modal
───────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const cs = getCatStyle(project.category);
  const isExternal = project.link.startsWith('http');

  /* close on Esc */
  useEffect(() => {
    const fn = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#0a1628]/75 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      {/* Panel — macOS zoom spring */}
      <motion.div
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[2rem] shadow-[0_64px_160px_rgba(0,0,0,0.6)]"
        style={{ background: '#ffffff' }}
        initial={{ opacity: 0, scale: 0.12, y: 40 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{   opacity: 0, scale: 0.12, y: 40  }}
        transition={{ type: 'spring', stiffness: 360, damping: 32, mass: 0.85 }}
      >
        {/* macOS title bar */}
        <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
          <button
            onClick={onClose}
            className="group relative flex h-3.5 w-3.5 items-center justify-center rounded-full transition-all duration-150 hover:brightness-90 active:scale-90"
            style={{ background: '#ff5f57' }}
            title="Close"
          >
            <X className="h-2 w-2 text-[#7a1815] opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
          </button>
          <div className="h-3.5 w-3.5 rounded-full" style={{ background: '#febc2e' }} />
          <div className="h-3.5 w-3.5 rounded-full" style={{ background: '#28c840' }} />
          <span
            className="ml-3 font-['DM_Mono',monospace] text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: '#9ca3af' }}
          >
            {project.category}
          </span>
          <span className="ml-auto font-['DM_Mono',monospace] text-[10px] tracking-widest" style={{ color: '#c8d0dc' }}>
            IDR Tech · Project Preview
          </span>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2">
          {/* Image col */}
          <div className="relative min-h-[260px] overflow-hidden md:min-h-[420px]">
            <motion.img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.18, duration: 0.65, ease: 'easeOut' }}
              draggable={false}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.06), transparent 50%)' }}
            />
          </div>

          {/* Info col */}
          <motion.div
            className="flex flex-col justify-center p-8 lg:p-10"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 0.45, ease: 'easeOut' }}
          >
            <span
              className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ background: cs.bg, color: cs.text }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: cs.dot }} />
              {project.category}
            </span>

            <h3
              className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl"
              style={{ color: '#12306d' }}
            >
              {project.title}
            </h3>

            <div
              className="my-5 h-[2px] w-12 rounded-full"
              style={{ background: `linear-gradient(90deg, ${cs.dot}, #ff8f32)` }}
            />

            <p className="text-sm leading-[1.85]" style={{ color: '#5e78ad' }}>
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                {...getProjectLinkProps(project.link)}
                className="brand-btn-primary px-6 py-3 text-sm"
              >
                {isExternal ? 'View live project' : 'Get in touch'}
                <ExternalLink className="h-4 w-4" />
              </a>
              <button onClick={onClose} className="brand-btn-secondary px-5 py-3 text-sm">
                Close
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Constants
───────────────────────────────────────── */
const GAP = 20; // px — matches gap-5 (1.25rem = 20px)

/* ─────────────────────────────────────────
   WorkShow
───────────────────────────────────────── */
const WorkShow = () => {
  const mainProject  = projects[0];
  const sideProjects = projects.slice(1);

  /* ── Carousel state ── */
  const outerRef   = useRef(null);   // overflow-hidden wrapper
  const innerRef   = useRef(null);   // draggable flex row
  const dragX      = useMotionValue(0);

  const [cardWidth,  setCardWidth]  = useState(380);
  const [dragMax,    setDragMax]    = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  /* ── Modal state ── */
  const [modal, setModal] = useState(null);

  /* ── Measure & resize ── */
  useEffect(() => {
    const measure = () => {
      if (!outerRef.current) return;
      const outerW = outerRef.current.offsetWidth;
      let cols = 1;
      if (outerW >= 1024) cols = 3;
      else if (outerW >= 640) cols = 2;
      const cw  = (outerW - (cols - 1) * GAP) / cols;
      const innerW = sideProjects.length * cw + (sideProjects.length - 1) * GAP;
      const max    = Math.max(0, innerW - outerW);
      setCardWidth(cw);
      setDragMax(max);
      /* Clamp current position if window shrank */
      const cur = dragX.get();
      if (cur < -max) animate(dragX, -max, { duration: 0.3 });
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, [sideProjects.length]);

  /* ── Navigate to a card index ── */
  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(sideProjects.length - 1, idx));
    const target  = Math.max(-dragMax, Math.min(0, -clamped * (cardWidth + GAP)));
    animate(dragX, target, { type: 'spring', stiffness: 320, damping: 30, mass: 0.85 });
    setActiveCard(clamped);
  };

  /* ── Snap on drag end ── */
  const handleDragEnd = (_, info) => {
    const step      = cardWidth + GAP;
    const current   = dragX.get();
    const projected = current + info.velocity.x * 0.09; // momentum projection
    const idx       = Math.round(-projected / step);
    goTo(idx);
  };

  /* ── Modal helpers ── */
  const openModal  = (project) => { setModal(project); document.body.style.overflow = 'hidden'; };
  const closeModal = ()         => { setModal(null);    document.body.style.overflow = '';       };



  return (
    <>
      <section id="our-work" className="section-shell relative overflow-hidden px-4 sm:px-6 lg:px-8">

        {/* ── Ambient ── */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-0 top-1/4 h-[40vh] w-[40vw] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,143,50,0.07) 0%, transparent 70%)' }} />
          <div className="absolute left-0 bottom-1/3 h-[30vh] w-[30vw] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(11,99,246,0.07) 0%, transparent 70%)' }} />
        </div>

        <div className="mx-auto max-w-7xl">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <span className="section-eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              Our Best Work
            </span>
            <h2 className="section-title mt-6" style={{ color: '#12306d' }}>
              Digital products
              <span
                className="mt-2 block bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #0b63f6, #1542a8, #ff8f32)' }}
              >
                built to impress.
              </span>
            </h2>
            <p className="section-copy mx-auto mt-6">
              A curated selection of websites and interfaces — each custom-built for performance,
              clarity, and brand impact.
            </p>
          </motion.div>

          {/* ══ FEATURED CARD ══ */}
          <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group mb-10 overflow-hidden rounded-[2rem] border border-white/80 shadow-[0_32px_80px_rgba(11,99,246,0.12)] backdrop-blur-sm"
            style={{ background: 'rgba(255,255,255,0.92)' }}
          >
            <div className="grid lg:grid-cols-[1.15fr_1fr]">
              {/* Image */}
              <div className="relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:min-h-[500px]">
                <img
                  src={mainProject.image}
                  alt={mainProject.title}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.06) 0%,transparent 30%,transparent 70%,rgba(0,0,0,0.08) 100%)' }} />
                <div className="absolute top-5 left-5">
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md"
                    style={{ background: 'rgba(11,99,246,0.80)', border: '1px solid rgba(255,255,255,0.25)' }}
                  >
                    <Star className="h-2.5 w-2.5 fill-white" />
                    Featured
                  </span>
                </div>
                <button
                  onClick={() => openModal(mainProject)}
                  className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}
                  title="Quick view"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                {(() => {
                  const cs = getCatStyle(mainProject.category);
                  return (
                    <div className="mb-5 flex items-center gap-3">
                      <span
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
                        style={{ background: cs.bg, color: cs.text }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: cs.dot }} />
                        {mainProject.category}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
                        style={{ background: 'rgba(255,143,50,0.1)', color: '#ff8f32' }}
                      >
                        <Zap className="h-2.5 w-2.5" />
                        Live
                      </span>
                    </div>
                  );
                })()}

                <h3
                  className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-[2.1rem]"
                  style={{ color: '#12306d' }}
                >
                  {mainProject.title}
                </h3>
                <div className="my-6 h-px w-16 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #0b63f6, #ff8f32)' }} />
                <p className="text-[0.95rem] leading-relaxed" style={{ color: '#5e78ad' }}>
                  {mainProject.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    {...getProjectLinkProps(mainProject.link)}
                    className="brand-btn-primary px-6 py-3 text-sm"
                  >
                    View live project
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <Link to="/projects" className="brand-btn-secondary px-6 py-3 text-sm">
                    Full portfolio
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>

          {/* ══ DRAGGABLE CAROUSEL ══ */}

          {/* Outer clip */}
          <div
            ref={outerRef}
            className="overflow-hidden rounded-[1rem] pb-2"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {/* Inner draggable row */}
            <motion.div
              ref={innerRef}
              drag="x"
              dragConstraints={{ left: -dragMax, right: 0 }}
              dragElastic={0.04}
              dragMomentum={false}
              style={{ x: dragX, display: 'flex', gap: GAP + 'px' }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, info) => {
                setIsDragging(false);
                handleDragEnd(e, info);
              }}
            >
              {sideProjects.map((project, index) => {
                const cs = getCatStyle(project.category);
                return (
                  <motion.article
                    key={project.title}
                    className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/90 backdrop-blur-md"
                    style={{
                      width: cardWidth + 'px',
                      flexShrink: 0,
                      background: 'rgba(255,255,255,0.92)',
                      boxShadow: '0 16px 44px rgba(11,99,246,0.08)',
                      transition: 'box-shadow 0.3s, transform 0.3s',
                    }}
                    whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(11,99,246,0.14)' }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: 200 }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        draggable={false}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        style={{ pointerEvents: 'none' }}
                      />
                      {/* Top accent bar */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[1.75rem]"
                        style={{ background: `linear-gradient(90deg, ${cs.dot}, ${cs.dot}55)` }}
                      />
                      {/* Category pill */}
                      <div className="absolute top-3 right-3">
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
                          style={{
                            background: 'rgba(255,255,255,0.95)',
                            color: cs.text,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                          }}
                        >
                          {project.category}
                        </span>
                      </div>
                      {/* Expand btn on hover */}
                      <div className="absolute bottom-3 right-3 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); openModal(project); }}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                          style={{ background: 'rgba(11,99,246,0.88)', backdropFilter: 'blur(6px)' }}
                          title="Quick view"
                        >
                          <Maximize2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          className="text-base font-extrabold leading-tight tracking-tight transition-colors duration-200 group-hover:text-[#0b63f6]"
                          style={{ color: '#12306d' }}
                        >
                          {project.title}
                        </h3>
                        <a
                          {...getProjectLinkProps(project.link)}
                          onClick={(e) => e.stopPropagation()}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200"
                          style={{ background: '#eef4ff', color: '#0b63f6' }}
                          aria-label={`Open ${project.title}`}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#0b63f6'; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = '#eef4ff'; e.currentTarget.style.color = '#0b63f6'; }}
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>

                      <p
                        className="mt-2 flex-1 text-xs leading-relaxed line-clamp-2"
                        style={{ color: '#5e78ad' }}
                      >
                        {project.description}
                      </p>

                      <button
                        onClick={() => openModal(project)}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-200 hover:gap-2.5"
                        style={{ color: cs.text }}
                      >
                        <Maximize2 className="h-3 w-3" />
                        Quick view
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>

          {/* ══ SLIDE-TO-EXPLORE ══ */}
          <SlideToExplore total={projects.length} />

        </div>
      </section>

      {/* ══ MODAL ══ */}
      <AnimatePresence>
        {modal && (
          <ProjectModal project={modal} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default WorkShow;
