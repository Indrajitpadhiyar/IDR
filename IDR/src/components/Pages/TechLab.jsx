import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Database,
  GitBranch,
  Layers,
  Monitor,
  Server,
  Smartphone,
  Cpu,
  Flame,
  Globe,
  Lock,
  Settings,
  Zap,
} from 'lucide-react';

const TECH_DATA = [
  { id: 'react', name: 'React.js 19', category: 'frontend', description: 'Component-driven frontend with modern hooks, suspense, and server actions for ultra-fast clients.', icon: Code2, color: '#0b63f6', badge: 'Frontend', metrics: { Speed: 96, DX: 98, Scale: 95 } },
  { id: 'angular', name: 'Angular', category: 'frontend', description: 'Enterprise-grade, structured framework for large-scale apps with built-in type-safety.', icon: Layers, color: '#dd0031', badge: 'Frontend', metrics: { Speed: 92, DX: 90, Scale: 99 } },
  { id: 'react-native', name: 'React Native', category: 'mobile', description: 'Cross-platform native Android apps built with React syntax and native-feeling performance.', icon: Cpu, color: '#00a7d8', badge: 'Mobile', metrics: { Speed: 89, DX: 95, Scale: 90 } },
  { id: 'tailwind', name: 'Tailwind CSS 4', category: 'styling', description: 'Utility-first CSS with lightning builds, CSS variables, and scalable design tokens.', icon: Globe, color: '#0284c7', badge: 'Styling', metrics: { Speed: 100, DX: 97, Scale: 92 } },
  { id: 'framer', name: 'Framer Motion', category: 'styling', description: 'Spring physics animations, keyframe sequences, and polished micro-interactions.', icon: Flame, color: '#f43f5e', badge: 'Animation', metrics: { Speed: 95, DX: 94, Scale: 90 } },
  { id: 'gsap', name: 'GSAP 3', category: 'styling', description: 'ScrollTrigger timelines, parallax, and performance-optimized 60fps motion systems.', icon: Settings, color: '#5a9f00', badge: 'Animation', metrics: { Speed: 99, DX: 96, Scale: 98 } },
  { id: 'threejs', name: 'Three.js', category: 'styling', description: 'WebGL rendering, custom shaders, and interactive 3D scenes built for browsers.', icon: Globe, color: '#6366f1', badge: 'WebGL', metrics: { Speed: 94, DX: 88, Scale: 91 } },
  { id: 'node', name: 'Node.js & Express', category: 'backend', description: 'Event-driven, non-blocking API servers with RESTful and GraphQL routing patterns.', icon: Server, color: '#339933', badge: 'Backend', metrics: { Speed: 95, DX: 97, Scale: 96 } },
  { id: 'firebase', name: 'Firebase Suite', category: 'backend', description: 'Serverless auth, Firestore realtime sync, Cloud Functions, and CDN-backed storage.', icon: Lock, color: '#d97706', badge: 'Backend', metrics: { Speed: 97, DX: 91, Scale: 89 } },
  { id: 'mongodb', name: 'MongoDB', category: 'database', description: 'Document NoSQL for rapid schema iteration, large payloads, and horizontal scaling.', icon: Database, color: '#16a34a', badge: 'Database', metrics: { Speed: 97, DX: 95, Scale: 96 } },
  { id: 'mysql', name: 'MySQL', category: 'database', description: 'Relational SQL with ACID compliance, optimized joins, and transactional safety.', icon: Database, color: '#00758f', badge: 'Database', metrics: { Speed: 93, DX: 88, Scale: 92 } },
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', description: 'Object-relational DB with JSONB indexing, MVCC, and complex analytical queries.', icon: Database, color: '#336791', badge: 'Database', metrics: { Speed: 95, DX: 92, Scale: 98 } },
];

const CATEGORIES = [
  { id: 'frontend', label: 'Frontend', count: 7 },
  { id: 'backend', label: 'Backend', count: 2 },
  { id: 'database', label: 'Database', count: 3 },
  { id: 'mobile', label: 'Mobile', count: 1 },
];

const ARCH_LAYERS = [
  { label: 'Client Apps', icon: Monitor, items: ['React.js 19', 'Angular', 'Next.js'], accent: '#0b63f6' },
  { label: 'Mobile', icon: Smartphone, items: ['React Native', 'Android SDK', 'Expo'], accent: '#00a7d8' },
  { label: 'API Layer', icon: Server, items: ['Node.js', 'Express.js', 'Firebase Functions'], accent: '#339933' },
  { label: 'Databases', icon: Database, items: ['MongoDB', 'MySQL', 'PostgreSQL'], accent: '#ff8f32' },
];

const STACK_STATS = [
  { value: '12+', label: 'Technologies' },
  { value: '4', label: 'Core layers' },
  { value: '60fps', label: 'Motion target' },
  { value: 'Full', label: 'Stack coverage' },
];

const filterByCategory = (category) => TECH_DATA.filter((tech) => (
  category === 'frontend'
    ? tech.category === 'frontend' || tech.category === 'styling'
    : tech.category === category
));

function TechSpotlight({ tech, isPage }) {
  const Icon = tech.icon;

  return (
    <motion.div
      key={tech.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/85 shadow-[0_24px_60px_rgba(11,99,246,0.1)] backdrop-blur-md ${isPage ? 'p-6 sm:p-8' : 'p-5 sm:p-6'}`}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: `${tech.color}18` }}
      />

      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border shadow-sm"
            style={{ backgroundColor: `${tech.color}10`, borderColor: `${tech.color}28`, color: tech.color }}
          >
            <Icon className="h-8 w-8" />
          </div>

          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className="rounded-full border px-2.5 py-1 font-['DM_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.18em]"
                style={{ color: tech.color, backgroundColor: `${tech.color}0c`, borderColor: `${tech.color}25` }}
              >
                {tech.badge}
              </span>
              <span className="font-['DM_Mono',monospace] text-[10px] font-bold uppercase tracking-[0.2em] text-[#5e78ad]">
                Active selection
              </span>
            </div>
            <h3 className={`font-extrabold tracking-tight text-[#12306d] ${isPage ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
              {tech.name}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5e78ad] sm:text-base">
              {tech.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:min-w-[280px]">
          {Object.entries(tech.metrics).map(([key, val]) => (
            <div
              key={key}
              className="rounded-2xl border px-3 py-4 text-center"
              style={{ borderColor: `${tech.color}20`, backgroundColor: `${tech.color}08` }}
            >
              <div className="font-['DM_Mono',monospace] text-2xl font-black" style={{ color: tech.color }}>
                {val}
              </div>
              <div className="mt-1 font-['DM_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.16em] text-[#5e78ad]">
                {key}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function TechLab({ variant = 'section' }) {
  const isPage = variant === 'page';
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [selectedTech, setSelectedTech] = useState(TECH_DATA[0]);
  const [showMobileMetrics, setShowMobileMetrics] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 640px)');
    const syncMobileMetrics = () => setShowMobileMetrics(media.matches);

    syncMobileMetrics();
    media.addEventListener('change', syncMobileMetrics);

    return () => media.removeEventListener('change', syncMobileMetrics);
  }, []);

  const filteredTech = filterByCategory(activeCategory);

  const handleCategoryChange = useCallback((catId) => {
    setActiveCategory(catId);
    const next = filterByCategory(catId);
    if (next[0]) setSelectedTech(next[0]);
  }, []);

  return (
    <section
      id="tech-stack"
      className={`relative overflow-hidden text-[#12306d] ${isPage ? 'min-h-screen' : 'section-shell px-4 sm:px-6 lg:px-8'}`}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[15%] left-1/2 h-[55vh] w-[110vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(11,99,246,0.12)_0%,transparent_68%)]" />
        <div className="absolute bottom-0 left-0 h-[40vh] w-[50vw] bg-[radial-gradient(circle_at_0%_100%,rgba(255,143,50,0.1)_0%,transparent_62%)]" />
        <div className="hero-diagonal-band absolute inset-0 opacity-70" />
        <div className="tech-dot-grid absolute inset-0 opacity-40" />
        {isPage && (
          <div className="absolute inset-0 flex items-start justify-center pt-32">
            <span className="select-none font-black tracking-[-0.06em] text-[clamp(6rem,22vw,16rem)] text-[#0b63f6]/[0.03]">
              STACK
            </span>
          </div>
        )}
      </div>

      <div className={`relative z-10 mx-auto max-w-7xl ${isPage ? 'px-4 sm:px-6 lg:px-8' : ''}`}>
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className={`${isPage ? 'pt-36 pb-12 text-center' : 'mx-auto mb-14 max-w-3xl text-center'}`}
        >
          {isPage ? (
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[rgba(11,99,246,0.16)] bg-white/75 px-4 py-2 shadow-[0_8px_30px_rgba(11,99,246,0.08)] backdrop-blur-md">
              <Zap className="h-3.5 w-3.5 text-[#ff8f32]" />
              <span className="font-['DM_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.22em] text-[#5e78ad]">
                Technology Stack · IDR Tech
              </span>
            </div>
          ) : (
            <span className="section-eyebrow">
              <Zap className="h-3.5 w-3.5" />
              Technology Stack
            </span>
          )}

          <h1 className={`font-extrabold leading-[0.98] tracking-[-0.04em] text-[#12306d] ${isPage ? 'text-[clamp(2.2rem,6.5vw,4.75rem)]' : 'section-title mt-6'}`}>
            {isPage ? (
              <>
                <span className="block">Tools we</span>
                <span className="mt-1 block">
                  <span className="hero-outline-text">engineer</span>
                  {' '}
                  <span className="bg-gradient-to-r from-[#ff8f32] via-[#faa967] to-[#e54a10] bg-clip-text text-transparent">
                    with precision.
                  </span>
                </span>
              </>
            ) : (
              <>
                The stack behind
                <span className="mt-2 block bg-gradient-to-r from-[#0b63f6] via-[#1542a8] to-[#ff8f32] bg-clip-text text-transparent">
                  every IDR build
                </span>
              </>
            )}
          </h1>

          <p className={`mx-auto leading-relaxed text-[#5e78ad] ${isPage ? 'mt-7 max-w-2xl text-base sm:text-lg' : 'section-copy mt-6'}`}>
            {isPage
              ? 'From interface to database — explore the modern frameworks, motion systems, and infrastructure we use to ship fast, scalable digital products.'
              : 'Modern frameworks, motion systems, and full-stack infrastructure chosen for speed, clarity, and long-term scalability.'}
          </p>

          {isPage && (
            <>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <a href="#contact" className="brand-btn-primary px-8 py-3.5 text-sm sm:text-base">
                  Start your project
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/projects" className="brand-btn-secondary px-7 py-3.5 text-sm sm:text-base">
                  View our work
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-[rgba(11,99,246,0.12)] bg-[rgba(11,99,246,0.08)] sm:grid-cols-4">
                {STACK_STATS.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center justify-center bg-white/80 px-4 py-5 backdrop-blur-sm">
                    <span className="text-2xl font-extrabold tracking-tight text-[#12306d] sm:text-3xl">{stat.value}</span>
                    <span className="mt-1 font-['DM_Mono',monospace] text-[10px] font-bold uppercase tracking-[0.2em] text-[#5e78ad]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Category segmented control */}
        <div className={`${isPage ? 'mb-10' : 'mb-8'} ${isPage ? 'sticky top-28 z-20' : ''}`}>
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-1.5 rounded-[1.25rem] border border-[rgba(11,99,246,0.12)] bg-white/80 p-1.5 shadow-[0_12px_40px_rgba(11,99,246,0.08)] backdrop-blur-md sm:gap-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-300 sm:min-w-[120px] sm:text-sm ${
                  activeCategory === cat.id
                    ? 'bg-[#12306d] text-white shadow-md shadow-[#12306d]/20'
                    : 'text-[#5e78ad] hover:bg-[#eef4ff] hover:text-[#0b63f6]'
                }`}
              >
                {cat.label}
                <span
                  className={`rounded-md px-1.5 py-0.5 font-['DM_Mono',monospace] text-[10px] ${
                    activeCategory === cat.id ? 'bg-white/15 text-white/90' : 'bg-[#eef4ff] text-[#0b63f6]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight */}
        <div className={`${isPage ? 'mb-8' : 'mb-6'}`}>
          <AnimatePresence mode="wait">
            <TechSpotlight tech={selectedTech} isPage={isPage} />
          </AnimatePresence>
        </div>

        {/* Tech grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech, idx) => {
              const Icon = tech.icon;
              const isSelected = selectedTech.id === tech.id;
              const showMetrics = isSelected || showMobileMetrics;

              return (
                <motion.button
                  key={tech.id}
                  type="button"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  onClick={() => setSelectedTech(tech)}
                  onMouseEnter={() => setSelectedTech(tech)}
                  className={`group relative w-full cursor-pointer overflow-hidden rounded-[1.5rem] border bg-white/85 p-5 text-left shadow-[0_16px_44px_rgba(11,99,246,0.07)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                    isSelected
                      ? 'border-[rgba(11,99,246,0.28)] ring-2 ring-[#0b63f6]/10'
                      : 'border-white/90 hover:border-[rgba(11,99,246,0.18)]'
                  }`}
                >
                  <div
                    className="absolute left-0 top-0 h-full w-1 rounded-l-[1.5rem] transition-all duration-300 group-hover:w-1.5"
                    style={{ backgroundColor: isSelected ? tech.color : `${tech.color}55` }}
                  />

                  <div className="flex items-start gap-4 pl-2">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                      style={{ backgroundColor: `${tech.color}10`, borderColor: `${tech.color}25`, color: tech.color }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-extrabold text-[#12306d]">{tech.name}</p>
                        <span
                          className="shrink-0 rounded-full border px-2 py-0.5 font-['DM_Mono',monospace] text-[8px] font-bold uppercase tracking-wider"
                          style={{ color: tech.color, backgroundColor: `${tech.color}0a`, borderColor: `${tech.color}22` }}
                        >
                          {tech.badge}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-xs leading-relaxed text-[#5e78ad]">{tech.description}</p>

                      <div className="mt-3 space-y-1.5">
                        {Object.entries(tech.metrics).map(([key, val]) => (
                          <div key={key} className="flex items-center gap-2">
                            <span className="w-8 font-['DM_Mono',monospace] text-[8px] font-bold uppercase text-[#5e78ad]/70">
                              {key}
                            </span>
                            <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#eef4ff]">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: showMetrics ? `${val}%` : '0%' }}
                                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: tech.color }}
                              />
                            </div>
                            <span className="w-6 text-right font-['DM_Mono',monospace] text-[9px] text-[#5e78ad]">
                              {val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={`absolute right-4 top-4 h-3.5 w-3.5 transition-colors ${
                      isSelected ? 'text-[#0b63f6]' : 'text-[#5e78ad]/40 group-hover:text-[#0b63f6]'
                    }`}
                  />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Architecture pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`${isPage ? 'py-20' : 'mt-20 pt-16'} border-t border-[rgba(11,99,246,0.1)]`}
        >
          <div className={`mb-12 ${isPage ? 'text-center' : ''}`}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,143,50,0.25)] bg-white/80 px-4 py-1.5 font-['DM_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.22em] text-[#e54a10] shadow-sm">
              <GitBranch className="h-3.5 w-3.5" />
              System architecture
            </span>
            <h2 className={`font-extrabold tracking-tight text-[#12306d] ${isPage ? 'mt-5 text-3xl sm:text-4xl' : 'mt-5 text-2xl sm:text-3xl'}`}>
              Full-stack delivery pipeline
            </h2>
            <p className={`mt-3 text-sm text-[#5e78ad] sm:text-base ${isPage ? 'mx-auto max-w-xl' : 'max-w-xl'}`}>
              How each layer connects — from user interface through APIs to persistent storage.
            </p>
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="absolute bottom-4 left-[1.35rem] top-4 w-px bg-gradient-to-b from-[#0b63f6]/30 via-[#ff8f32]/30 to-transparent sm:left-[1.6rem]" />

            <div className="space-y-5">
              {ARCH_LAYERS.map((layer, idx) => {
                const Icon = layer.icon;

                return (
                  <motion.div
                    key={layer.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.1 }}
                    className="relative pl-12 sm:pl-14"
                  >
                    <div
                      className="absolute left-0 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border bg-white shadow-[0_10px_30px_rgba(11,99,246,0.1)] sm:h-12 sm:w-12"
                      style={{ borderColor: `${layer.accent}30`, color: layer.accent }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="rounded-[1.5rem] border border-white/90 bg-white/85 p-5 shadow-[0_14px_40px_rgba(11,99,246,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(11,99,246,0.15)]">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <h4 className="text-base font-extrabold text-[#12306d]">{layer.label}</h4>
                        <span className="font-['DM_Mono',monospace] text-[10px] font-bold uppercase tracking-[0.2em] text-[#5e78ad]">
                          Layer {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {layer.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-lg border px-3 py-1.5 text-xs font-semibold text-[#12306d]"
                            style={{ borderColor: `${layer.accent}22`, backgroundColor: `${layer.accent}08` }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Ops strip */}
          <div className="mt-10 flex flex-col gap-5 rounded-[1.75rem] border border-[rgba(11,99,246,0.12)] bg-white/85 p-5 shadow-[0_16px_44px_rgba(11,99,246,0.07)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#20a464] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#20a464]" />
              </span>
              <span className="text-sm font-bold text-[#12306d]">Production-ready stack</span>
            </div>

            <div className="flex flex-wrap gap-5">
              {[
                { label: 'Uptime', val: '99.9%' },
                { label: 'Latency', val: '< 80ms' },
                { label: 'Deploy', val: 'Daily' },
                { label: 'Coverage', val: '94%' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="font-['DM_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.16em] text-[#5e78ad]">
                    {stat.label}
                  </span>
                  <span className="font-['DM_Mono',monospace] text-xs font-extrabold text-[#0b63f6]">{stat.val}</span>
                </div>
              ))}
            </div>

            {!isPage && (
              <Link
                to="/tech-showcase"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0b63f6] transition-colors hover:text-[#ff8f32]"
              >
                Explore full stack
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {isPage && (
            <div className="mt-10 text-center">
              <a href="#contact" className="brand-btn-primary px-8 py-3.5 text-sm sm:text-base">
                Build with this stack
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
