import { ArrowRight, ExternalLink, LayoutPanelTop, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const projects = [
  {
    title: 'Bagify Commerce',
    category: 'E-commerce Experience',
    description:
      'A shopping experience focused on clean product browsing, stronger hierarchy, and a smoother buying journey.',
    image: '/bagify.png',
    link: 'https://bagify-z9wj.onrender.com/',
    year: '2026',
    summary: ['Product storytelling', 'Responsive checkout', 'Brand-focused UI'],
    accent: 'blue',
  },
  {
    title: 'Prime Energy Launch',
    category: 'Campaign Landing Page',
    description:
      'A launch page designed for attention, bold visuals, and stronger communication around the product.',
    image: '/project2.png',
    link: 'https://prime-r05t.onrender.com',
    year: '2026',
    summary: ['Bold motion', 'Launch storytelling', 'Strong visual contrast'],
    accent: 'orange',
  },
  {
    title: 'GYM',
    category: 'GYM',
    description:
      'A modern gym website with a clean and energetic design. It features a prominent hero section, detailed service offerings, and a user-friendly interface to attract and engage visitors.',
    image: '/gym.png',
    link: 'https://gym-5hpo.onrender.com',
    year: '2026',
    summary: ['Bold motion', 'Launch storytelling', 'Strong visual contrast'],
    accent: 'orange',
  },
  {
    title: 'Personal Portfolio System',
    category: 'Designer Portfolio',
    description:
      'A portfolio layout with cleaner spacing, stronger visual flow, and a more polished first impression.',
    image: '/portfolio.png',
    link: '#contact',
    year: '2026',
    summary: ['Personal branding', 'Editorial layout', 'Smooth section flow'],
    accent: 'blue',
  },
  {
    title: 'IDR TECH Work Flow',
    category: 'work management',
    description:
      'This is a work management system for IDR TECH.',
    image: '/workflow.png',
    link: 'https://workmanage-33e9.onrender.com',
    year: '2026',
    summary: ['work management', 'work flow', 'work tracking'],
    accent: 'blue',
  },
];

const sectionStats = [
  { value: '05', label: 'Live showcase projects' },
  { value: 'UI', label: 'Design-first presentation' },
  { value: 'Web', label: 'Responsive builds' },
];

const WorkShow = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const activeProject = projects[activeIndex];
  const isExternal = activeProject.link.startsWith('http');

  // Disable scroll when modal is open
  useEffect(() => {
    if (showAllProjects) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAllProjects]);

  return (
    <section id="our-work" className="section-shell px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="section-eyebrow">
            <Sparkles className="h-4 w-4" />
            Our projects
          </span>
          <h2 className="section-title mt-6 text-[#12306d]">
            Explore our work in a clearer way and see how each project is designed for a different goal.
          </h2>
          <p className="section-copy mx-auto mt-6">
            Select any project to view its preview, purpose, and key highlights. This layout makes it easier for users to compare and understand the work quickly.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            key={activeProject.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-panel rounded-[38px] p-4 sm:p-5"
          >
            <div className="rounded-[32px] bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(238,244,255,0.95),rgba(255,245,236,0.95))] p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-[#0b63f6]/10 bg-white/92 px-4 py-3 shadow-[0_14px_36px_rgba(11,99,246,0.08)]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#0b63f6]" />
                  <span className="h-3 w-3 rounded-full bg-[#ff8f32]" />
                  <span className="h-3 w-3 rounded-full bg-white ring-2 ring-[#0b63f6]/18" />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#eef4ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0b63f6]">
                    {activeProject.category}
                  </span>
                  <span className="rounded-full border border-[#ff8f32]/16 bg-[#fff3ea] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff8f32]">
                    {activeProject.year}
                  </span>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_20px_50px_rgba(11,99,246,0.08)]">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  width={800}
                  height={380}
                  loading="lazy"
                  decoding="async"
                  className="h-[320px] w-full object-cover object-top sm:h-[380px]"
                />
              </div>

              <div className="mt-5 rounded-[28px] border border-white/75 bg-white/94 p-6 shadow-[0_18px_40px_rgba(11,99,246,0.06)] sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5e78ad]">Selected project</p>
                    <h3 className="mt-3 text-3xl font-semibold text-[#12306d]">{activeProject.title}</h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b63f6]/10 text-[#0b63f6]">
                    <LayoutPanelTop className="h-5 w-5" />
                  </div>
                </div>

                <p className="mt-4 max-w-3xl text-base leading-8 text-[#5e78ad]">{activeProject.description}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {activeProject.summary.map((item) => (
                    <span
                      key={item}
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${activeProject.accent === 'orange'
                        ? 'border border-[#ff8f32]/16 bg-[#fff3ea] text-[#d36e10]'
                        : 'border border-[#0b63f6]/14 bg-[#eef4ff] text-[#35538e]'
                        }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={activeProject.link}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                    className="brand-btn-primary"
                  >
                    Explore project
                    {isExternal ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </a>
                  <a href="#contact" data-scroll-to data-scroll-to-offset="-110" className="brand-btn-secondary">
                    Build something similar
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {projects.slice(0, 3).map((project, index) => {
              const selected = index === activeIndex;

              return (
                <motion.button
                  key={project.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.99 }}
                  className={`glass-panel rounded-[32px] p-4 text-left transition-all duration-300 ${selected ? 'shadow-[0_22px_54px_rgba(11,99,246,0.14)]' : ''
                    }`}
                >
                  <div
                    className={`rounded-[26px] border bg-white/94 p-4 shadow-[0_16px_36px_rgba(11,99,246,0.06)] ${selected
                      ? project.accent === 'orange'
                        ? 'border-[#ff8f32]/22'
                        : 'border-[#0b63f6]/22'
                      : 'border-white/75'
                      }`}
                  >
                    <div className="flex gap-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        width={128}
                        height={112}
                        loading="lazy"
                        decoding="async"
                        className="h-24 w-28 rounded-[18px] border border-white/70 object-cover object-top shadow-[0_10px_24px_rgba(11,99,246,0.08)] sm:h-28 sm:w-32"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${project.accent === 'orange'
                              ? 'bg-[#fff3ea] text-[#ff8f32]'
                              : 'bg-[#eef4ff] text-[#0b63f6]'
                              }`}
                          >
                            {project.category}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8ea3cf]">
                            {project.year}
                          </span>
                        </div>
                        <h3 className="mt-3 text-xl font-semibold text-[#12306d]">{project.title}</h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-7 text-[#5e78ad]">{project.description}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.summary.slice(0, 2).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#0b63f6]/12 bg-[#f6f9ff] px-3 py-1.5 text-xs font-semibold text-[#4d6aa5]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}

            {projects.length > 3 && (
              <motion.button
                onClick={() => setShowAllProjects(true)}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="glass-panel mx-auto flex w-full max-w-sm items-center justify-center gap-2 rounded-[28px] py-4 text-[15px] font-semibold text-[#0b63f6] shadow-[0_12px_24px_rgba(11,99,246,0.06)] hoverbg-[#eef4ff] transition-all bg-white/60 hover:bg-white border border-white/80"
              >
                See more projects <ArrowRight className="h-4 w-4" />
              </motion.button>
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              {sectionStats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
                  className="glass-panel rounded-[26px] px-5 py-5"
                >
                  <p className="text-2xl font-semibold text-[#12306d]">{item.value}</p>
                  <p className="mt-2 text-sm text-[#5e78ad]">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAllProjects && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#f8fbff] text-left"
          >
            <div className="flex items-center justify-between border-b border-[#0b63f6]/10 bg-white/80 px-6 py-4 backdrop-blur-md">
              <div>
                <h2 className="text-2xl font-bold text-[#12306d]">All Projects</h2>
                <p className="mt-0.5 text-sm font-medium text-[#5e78ad]">Explore all our proud creations.</p>
              </div>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b63f6]/10 text-[#0b63f6] transition-colors hover:bg-[#0b63f6]/20"
                onClick={() => setShowAllProjects(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <div className="grid gap-8 sm:grid-cols-2">
                  {projects.map((project, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      key={project.title}
                      className="glass-panel group relative overflow-hidden rounded-[32px] p-4 transition-all hover:shadow-[0_24px_54px_rgba(11,99,246,0.12)]"
                    >
                      <div className="overflow-hidden rounded-[24px]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-[240px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-5 px-3 pb-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${project.accent === 'orange' ? 'bg-[#fff3ea] text-[#ff8f32]' : 'bg-[#eef4ff] text-[#0b63f6]'}`}>
                            {project.category}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8ea3cf]">
                            {project.year}
                          </span>
                        </div>
                        <h3 className="mt-3 text-2xl font-semibold text-[#12306d]">{project.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#5e78ad]">{project.description}</p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.summary.map((item) => (
                            <span
                              key={item}
                              className={`rounded-full border border-black/5 bg-white/60 px-3 py-1.5 text-xs font-semibold ${project.accent === 'orange' ? 'text-[#ff8f32]' : 'text-[#0b63f6]'}`}
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        <a
                          href={project.link}
                          target={project.link.startsWith('http') ? '_blank' : undefined}
                          rel={project.link.startsWith('http') ? 'noreferrer' : undefined}
                          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0b63f6] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0950c6]"
                        >
                          View Project {project.link.startsWith('http') ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkShow;
