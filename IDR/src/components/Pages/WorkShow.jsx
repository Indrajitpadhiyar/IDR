import { ArrowRight, ArrowUpRight, ExternalLink, Sparkles, Star, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';

const getProjectLinkProps = (link) => ({
  href: link,
  target: link.startsWith('http') ? '_blank' : undefined,
  rel: link.startsWith('http') ? 'noreferrer' : undefined,
});

/* ── Category badge colour map ── */
const categoryColors = {
  'Full Stack E-Commerce': { bg: 'rgba(11,99,246,0.10)', text: '#0b63f6', dot: '#0b63f6' },
  'Frontend Development':  { bg: 'rgba(99,102,241,0.10)', text: '#6366f1', dot: '#6366f1' },
  'Luxury Brand Showcase': { bg: 'rgba(180,130,60,0.12)', text: '#b4823c', dot: '#b4823c' },
  Fitness:                 { bg: 'rgba(34,197,94,0.10)',  text: '#16a34a', dot: '#16a34a' },
  Campaign:                { bg: 'rgba(239,68,68,0.10)',  text: '#dc2626', dot: '#dc2626' },
  'E-Commerce':            { bg: 'rgba(255,143,50,0.12)', text: '#ff8f32', dot: '#ff8f32' },
  Management:              { bg: 'rgba(168,85,247,0.10)', text: '#9333ea', dot: '#9333ea' },
  Design:                  { bg: 'rgba(20,210,200,0.10)', text: '#0d9488', dot: '#0d9488' },
};

const getCatStyle = (cat) =>
  categoryColors[cat] ?? { bg: 'rgba(11,99,246,0.08)', text: '#0b63f6', dot: '#0b63f6' };

const WorkShow = () => {
  const mainProject  = projects[0];
  const sideProjects = projects.slice(1, 4);

  return (
    <section id="our-work" className="section-shell relative overflow-hidden px-4 sm:px-6 lg:px-8">

      {/* ── Ambient background ── */}
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
            A curated selection of websites and interfaces — each custom-built for performance, clarity, and brand impact.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════
            FEATURED PROJECT — magazine hero card
        ══════════════════════════════════════════ */}
        <motion.article
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group mb-8 overflow-hidden rounded-[2rem] border border-white/80 shadow-[0_32px_80px_rgba(11,99,246,0.12)] backdrop-blur-sm"
          style={{ background: 'rgba(255,255,255,0.92)' }}
        >
          <div className="grid lg:grid-cols-[1.15fr_1fr]">

            {/* Image — full left column, no text overlay */}
            <div className="relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:min-h-[500px]">
              <img
                src={mainProject.image}
                alt={mainProject.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Very subtle vignette only on edges, NOT text overlay */}
              <div className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.08) 100%)',
                }} />

              {/* Featured badge — bottom-left of image, not covering content */}
              <div className="absolute top-5 left-5">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md"
                  style={{ background: 'rgba(11,99,246,0.80)', border: '1px solid rgba(255,255,255,0.25)' }}
                >
                  <Star className="h-2.5 w-2.5 fill-white" />
                  Featured
                </span>
              </div>
            </div>

            {/* Content — separate column, clean white background */}
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              {/* Category */}
              <div className="mb-5 flex items-center gap-3">
                {(() => {
                  const cs = getCatStyle(mainProject.category);
                  return (
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{ background: cs.bg, color: cs.text }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: cs.dot }} />
                      {mainProject.category}
                    </span>
                  );
                })()}
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ background: 'rgba(255,143,50,0.1)', color: '#ff8f32' }}
                >
                  <Zap className="h-2.5 w-2.5" />
                  Live
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-[2.1rem]"
                style={{ color: '#12306d' }}>
                {mainProject.title}
              </h3>

              {/* Divider */}
              <div className="my-6 h-px w-16 rounded-full"
                style={{ background: 'linear-gradient(90deg, #0b63f6, #ff8f32)' }} />

              {/* Description */}
              <p className="text-[0.95rem] leading-relaxed" style={{ color: '#5e78ad' }}>
                {mainProject.description}
              </p>

              {/* CTA Buttons */}
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

        {/* ══════════════════════════════════════════
            SIDE PROJECTS — clean card grid
        ══════════════════════════════════════════ */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sideProjects.map((project, index) => {
            const cs = getCatStyle(project.category);
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/90 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  boxShadow: '0 16px 44px rgba(11,99,246,0.08)',
                }}
              >
                {/* Image — full width top, NO text overlap */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Accent top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[1.75rem]"
                    style={{ background: `linear-gradient(90deg, ${cs.dot}, ${cs.dot}88)` }} />

                  {/* Category pill — over image top-right corner, subtle */}
                  <div className="absolute top-3 right-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] backdrop-blur-sm"
                      style={{ background: 'rgba(255,255,255,0.92)', color: cs.text }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Text content — below image, completely separate */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className="text-base font-extrabold leading-tight tracking-tight transition-colors duration-200 group-hover:text-[#0b63f6] sm:text-[1.05rem]"
                      style={{ color: '#12306d' }}
                    >
                      {project.title}
                    </h3>
                    <a
                      {...getProjectLinkProps(project.link)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200"
                      style={{ background: '#eef4ff', color: '#0b63f6' }}
                      aria-label={`Open ${project.title}`}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#0b63f6';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#eef4ff';
                        e.currentTarget.style.color = '#0b63f6';
                      }}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <p className="mt-2.5 text-xs leading-relaxed line-clamp-2 sm:text-sm"
                    style={{ color: '#5e78ad' }}>
                    {project.description}
                  </p>
                </div>
              </motion.article>
            );
          })}

          {/* Explore all CTA card */}
          <Link to="/projects" className="block">
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.22 }}
              className="flex min-h-[310px] flex-col items-center justify-center gap-4 rounded-[1.75rem] border-2 border-dashed border-[rgba(11,99,246,0.2)] bg-white/55 px-6 py-10 text-center backdrop-blur-sm transition-all duration-300 hover:border-[rgba(255,143,50,0.4)] hover:bg-white/80 cursor-pointer"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
                style={{ background: 'linear-gradient(135deg, #0b63f6, #1542a8)' }}>
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-base font-extrabold" style={{ color: '#12306d' }}>
                  Explore all {projects.length} projects
                </p>
                <p className="mt-1 text-sm" style={{ color: '#5e78ad' }}>
                  View our complete portfolio
                </p>
              </div>
            </motion.div>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WorkShow;
