import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Sparkles, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { applyRouteSeo } from '../../utils/seo';
import { projects } from '../../data/projects';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

const WORK_FILTERS = [
  { id: 'all', label: 'All Work' },
  { id: 'commerce', label: 'E-Commerce', match: ['E-Commerce', 'E-commerce', 'Full Stack E-Commerce'] },
  { id: 'design', label: 'Design & Brand', match: ['Design', 'Luxury Brand Showcase', 'Campaign', 'Fitness'] },
  { id: 'dev', label: 'Development', match: ['Frontend Development', 'Management'] },
];

const WORK_STATS = [
  { value: `${projects.length}`, label: 'Projects' },
  { value: '4', label: 'Categories' },
  { value: '100%', label: 'Custom built' },
  { value: 'Live', label: 'Demos' },
];

const filterProjects = (filterId) => {
  if (filterId === 'all') return projects;
  const filter = WORK_FILTERS.find((f) => f.id === filterId);
  if (!filter?.match) return projects;
  return projects.filter((p) => filter.match.includes(p.category));
};

const getProjectLinkProps = (link) => ({
  href: link,
  target: link.startsWith('http') ? '_blank' : undefined,
  rel: link.startsWith('http') ? 'noreferrer' : undefined,
});

/* ── Category colour map ── */
const categoryColors = {
  'Full Stack E-Commerce': '#0b63f6',
  'Frontend Development':  '#6366f1',
  'Luxury Brand Showcase': '#b4823c',
  Fitness:                 '#16a34a',
  Campaign:                '#dc2626',
  'E-Commerce':            '#ff8f32',
  Management:              '#9333ea',
  Design:                  '#0d9488',
};
const getCatColor = (cat) => categoryColors[cat] ?? '#0b63f6';

/* ════════════════════════════════════════
   SPOTLIGHT — full-width featured card
════════════════════════════════════════ */
function ProjectSpotlight({ project }) {
  const linkProps = getProjectLinkProps(project.link);
  const isExternal = project.link.startsWith('http');
  const accentColor = getCatColor(project.category);

  return (
    <motion.article
      key={project.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/80 shadow-[0_32px_80px_rgba(11,99,246,0.12)]"
      style={{ background: 'rgba(255,255,255,0.93)' }}
    >
      <div className="grid lg:grid-cols-2">

        {/* ── Image: left column, no text overlay ── */}
        <div className="relative min-h-[300px] overflow-hidden sm:min-h-[400px] lg:min-h-[480px]">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Minimal edge vignette only */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.06) 0%, transparent 40%)' }}
          />
          {/* Accent top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}55)` }}
          />
          {/* Featured badge */}
          <div className="absolute top-5 left-5">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md"
              style={{ background: 'rgba(18,48,109,0.75)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <Star className="h-2.5 w-2.5 fill-white" />
              Featured
            </span>
          </div>
        </div>

        {/* ── Info: right column, clean white ── */}
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
          {/* Category pill */}
          <span
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ background: `${accentColor}18`, color: accentColor }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accentColor }} />
            {project.category}
          </span>

          <h2
            className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-[2.1rem]"
            style={{ color: '#12306d' }}
          >
            {project.title}
          </h2>

          {/* Accent rule */}
          <div
            className="my-6 h-[2px] w-14 rounded-full"
            style={{ background: `linear-gradient(90deg, ${accentColor}, #ff8f32)` }}
          />

          <p className="text-[0.95rem] leading-[1.8]" style={{ color: '#5e78ad' }}>
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a {...linkProps} className="brand-btn-primary px-6 py-3 text-sm">
              {isExternal ? 'View live project' : 'Get in touch'}
              {isExternal ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </a>
            <Link to="/#contact" className="brand-btn-secondary px-6 py-3 text-sm">
              Start similar project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ════════════════════════════════════════
   PROJECT CARD — image top, info below
════════════════════════════════════════ */
function ProjectCard({ project, index }) {
  const linkProps = getProjectLinkProps(project.link);
  const accentColor = getCatColor(project.category);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/90 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(11,99,246,0.13)]"
      style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 16px 44px rgba(11,99,246,0.07)' }}
    >
      {/* ── Image block — full width, fixed height ── */}
      <div className="relative h-52 overflow-hidden sm:h-56">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top accent stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}44)` }}
        />

        {/* Category pill — top-right corner, on image but very small & styled */}
        <div className="absolute top-3 right-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
            style={{ background: 'rgba(255,255,255,0.95)', color: accentColor, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
          >
            {project.category}
          </span>
        </div>

        {/* Link button — bottom-right, appears on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <a
            {...linkProps}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-lg"
            style={{ background: accentColor }}
            aria-label={`Open ${project.title}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* ── Info block — completely below image ── */}
      <div className="flex flex-1 flex-col p-5">
        <h3
          className="text-base font-extrabold leading-tight tracking-tight transition-colors duration-200 group-hover:text-[#0b63f6] sm:text-[1.05rem]"
          style={{ color: '#12306d' }}
        >
          {project.title}
        </h3>

        <p
          className="mt-2.5 flex-1 text-xs leading-relaxed line-clamp-2 sm:text-[0.82rem]"
          style={{ color: '#5e78ad' }}
        >
          {project.description}
        </p>

        <a
          {...linkProps}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold transition-colors duration-200 hover:gap-2.5"
          style={{ color: accentColor }}
        >
          View project
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.article>
  );
}

/* ════════════════════════════════════════
   PAGE
════════════════════════════════════════ */
const WorkShowcasePage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    applyRouteSeo('/projects');
  }, []);

  const filteredProjects = useMemo(() => filterProjects(activeFilter), [activeFilter]);
  const spotlightProject = filteredProjects[0] ?? projects[0];
  const gridProjects     = filteredProjects.slice(1);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ color: '#12306d' }}>
      <Navbar />

      <main className="relative pb-24">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[15%] left-1/2 h-[55vh] w-[110vw] -translate-x-1/2 rounded-[100%]"
            style={{ background: 'radial-gradient(ellipse at center, rgba(11,99,246,0.12) 0%, transparent 68%)' }} />
          <div className="absolute bottom-0 right-0 h-[40vh] w-[45vw]"
            style={{ background: 'radial-gradient(circle at 100% 100%, rgba(255,143,50,0.1) 0%, transparent 62%)' }} />
          <div className="hero-diagonal-band absolute inset-0 opacity-70" />
          <div className="tech-dot-grid absolute inset-0 opacity-35" />
          <div className="absolute inset-0 flex items-start justify-center pt-36">
            <span className="select-none font-black tracking-[-0.06em] text-[clamp(6rem,22vw,16rem)]"
              style={{ color: 'rgba(11,99,246,0.03)' }}>
              WORK
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">

          {/* ── Hero header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="text-center"
          >
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 font-['DM_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.2em] text-[#0b63f6] transition-all hover:gap-3"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to home
            </Link>

            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[rgba(11,99,246,0.16)] bg-white/75 px-4 py-2 shadow-[0_8px_30px_rgba(11,99,246,0.08)] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#ff8f32]" />
              <span className="font-['DM_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.22em] text-[#5e78ad]">
                Our Best Work · Full Portfolio
              </span>
            </div>

            <h1 className="text-[clamp(2.2rem,6.5vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.04em]" style={{ color: '#12306d' }}>
              <span className="block">Projects</span>
              <span className="mt-1 block">
                <span className="hero-outline-text">crafted</span>
                {' '}
                <span className="bg-gradient-to-r from-[#ff8f32] via-[#faa967] to-[#e54a10] bg-clip-text text-transparent">
                  with intent.
                </span>
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: '#5e78ad' }}>
              From luxury brand experiences to full-stack commerce — explore the digital products we design,
              engineer, and ship for clients who want more than a template.
            </p>

            {/* Stats ribbon */}
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-[rgba(11,99,246,0.12)] bg-[rgba(11,99,246,0.08)] sm:grid-cols-4">
              {WORK_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center bg-white/80 px-4 py-5 backdrop-blur-sm">
                  <span className="text-2xl font-extrabold tracking-tight sm:text-3xl" style={{ color: '#12306d' }}>{stat.value}</span>
                  <span className="mt-1 font-['DM_Mono',monospace] text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: '#5e78ad' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Filter bar ── */}
          <div className="sticky top-28 z-20 mx-auto mb-10 mt-14 max-w-3xl">
            <div className="flex flex-wrap justify-center gap-1.5 rounded-[1.25rem] border border-[rgba(11,99,246,0.12)] bg-white/85 p-1.5 shadow-[0_12px_40px_rgba(11,99,246,0.08)] backdrop-blur-md">
              {WORK_FILTERS.map((filter) => {
                const count = filterProjects(filter.id).length;
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-300 sm:min-w-[120px] sm:text-sm ${
                      isActive
                        ? 'bg-[#12306d] text-white shadow-md shadow-[#12306d]/20'
                        : 'text-[#5e78ad] hover:bg-[#eef4ff] hover:text-[#0b63f6]'
                    }`}
                  >
                    {filter.label}
                    <span className={`rounded-md px-1.5 py-0.5 font-['DM_Mono',monospace] text-[10px] ${
                      isActive ? 'bg-white/15 text-white/90' : 'bg-[#eef4ff] text-[#0b63f6]'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Spotlight card ── */}
          <div className="mb-8">
            <AnimatePresence mode="wait">
              <ProjectSpotlight project={spotlightProject} key={spotlightProject.title} />
            </AnimatePresence>
          </div>

          {/* ── Grid — uniform card layout ── */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {gridProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="rounded-[1.75rem] border border-dashed border-[rgba(11,99,246,0.2)] bg-white/70 px-6 py-16 text-center">
              <p className="text-lg font-bold" style={{ color: '#12306d' }}>No projects in this category yet.</p>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className="mt-4 text-sm font-bold text-[#0b63f6] hover:text-[#ff8f32]"
              >
                View all work
              </button>
            </div>
          )}

          {/* ── CTA band ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="mt-16 overflow-hidden rounded-[2rem] border border-white/80 p-2 shadow-[0_24px_60px_rgba(11,99,246,0.1)]"
            style={{ background: 'rgba(255,255,255,0.82)' }}
          >
            <div className="rounded-[1.65rem] bg-gradient-to-r from-[#12306d] to-[#1542a8] px-8 py-12 text-center sm:px-12">
              <span className="font-['DM_Mono',monospace] text-[10px] font-bold uppercase tracking-[0.22em] text-[#ff8f32]">
                Your project next
              </span>
              <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                Ready for a website that looks as premium as your brand?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                Tell us your goals — we will design and build a custom experience with the same craft you see in this portfolio.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link to="/#contact" className="brand-btn-primary px-8 py-3.5 text-sm sm:text-base">
                  Start your project
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/services" className="brand-btn-secondary px-7 py-3.5 text-sm sm:text-base">
                  View services
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WorkShowcasePage;
