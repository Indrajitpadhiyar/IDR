import { ArrowRight, ArrowUpRight, CirclePlay, Code2, Layers3, MonitorSmartphone, Sparkles, Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
// import TeamOwners from '../About/TeamOwners';
import WhatWeAreAbout from '../About/WhatWeAreAbout';
import Contact from '../Contact/Contact';
import TechStack from '../Pages/TechStack';
import WorkShow from '../Pages/WorkShow';

const serviceTags = ['Web Development', 'UI/UX Design', 'Web Services', 'Digital Solutions'];

const quickStats = [
  { value: '07+', label: 'Core creative and dev team' },
  { value: '24h', label: 'Fast response and support' },
  { value: '100%', label: 'Custom-built UI sections' },
  { value: '360', label: 'Design to deployment flow' },
];

const studioDeckRows = [
  { title: 'Web development', blurb: 'Ship fast, stay accessible, keep performance tight.', icon: Code2 },
  { title: 'UI/UX design', blurb: 'Layouts that feel obvious the first time someone lands.', icon: MonitorSmartphone },
  { title: 'Digital solutions', blurb: 'From hero sections to full journeys that convert.', icon: Layers3 },
];

const heroHighlights = [
  {
    title: 'Web development',
    text: 'Clean, modern, and responsive websites built to represent your brand properly.',
    icon: Code2,
  },
  {
    title: 'UI/UX design',
    text: 'Layouts and interactions designed to feel smooth, clear, and easy to use.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Digital solutions',
    text: 'From landing pages to brand-focused systems, we create experiences that support growth.',
    icon: Layers3,
  },
];

const marqueeItems = [
  'Web Development',
  'UI/UX Design',
  'Web Services',
  'Digital Solutions',
  'Responsive Websites',
  'Brand-focused Interfaces',
  'Smooth Interactions',
  'Modern Frontend Systems',
];

const Main = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const leftGlow = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const rightGlow = useTransform(scrollYProgress, [0, 1], [0, -110]);

  return (
    <main className="relative overflow-hidden">
      {/* ══════════ HERO — Split studio layout + feature band ══════════ */}
      <section ref={heroRef} id="home" className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36">

        {/* Layered backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(165deg,#f4f8ff_0%,#eef4ff_38%,#fff9f4_100%)]" />
          <div
            className="absolute -right-[20%] top-[-10%] h-[min(90vh,720px)] w-[min(90vw,640px)] rounded-[48%] border border-[#0b63f6]/10 bg-[radial-gradient(circle_at_30%_30%,rgba(11,99,246,0.14),transparent_55%)]"
            aria-hidden="true"
          />
          <div
            className="absolute -left-32 bottom-0 h-72 w-72 rounded-full border border-[#ff8f32]/20 bg-[radial-gradient(circle,rgba(255,143,50,0.2),transparent_68%)]"
            aria-hidden="true"
          />
          <motion.div
            style={{ y: leftGlow }}
            className="absolute -left-48 top-10 h-[520px] w-[520px] rounded-full bg-[#0b63f6]/12 blur-[140px]"
          />
          <motion.div
            style={{ y: rightGlow }}
            className="absolute -right-36 top-32 h-[480px] w-[480px] rounded-full bg-[#ff8f32]/14 blur-[120px]"
          />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">
            {/* Copy column */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -left-3 top-2 hidden h-[calc(100%-0.5rem)] w-1 rounded-full bg-gradient-to-b from-[#0b63f6] via-[#3d7ef7] to-[#ff8f32] lg:block" aria-hidden="true" />

              <div className="flex flex-wrap items-center gap-3 lg:pl-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#0b63f6]/18 bg-white/90 px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.32em] text-[#0b63f6] shadow-[0_10px_30px_rgba(11,99,246,0.08)]">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Initiate · Digital · Revolution
                </span>
                <span className="hidden items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#5e78ad] sm:inline-flex">
                  <Zap className="h-3.5 w-3.5 text-[#ff8f32]" aria-hidden="true" />
                  Studio-ready delivery
                </span>
              </div>

              <h1 className="section-title mt-8 max-w-xl text-balance text-[#0c1f45] lg:pl-5 lg:max-w-none">
                <span className="block">Helping businesses grow with</span>
                <span className="mt-1 block bg-gradient-to-r from-[#0b63f6] via-[#2563eb] to-[#ff8f32] bg-clip-text text-transparent">
                  clean websites, smart design,
                </span>
                <span className="mt-1 block text-[#12306d]">and digital solutions.</span>
              </h1>

              <p className="section-copy mt-6 max-w-xl text-pretty text-[#4a6294] lg:pl-5 lg:max-w-lg">
                Our vision stays simple: craft modern experiences that make every company feel clear, trusted, and ready to scale online.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 lg:pl-5">
                {serviceTags.map((item) => (
                  <span
                    key={item}
                    className="rounded-2xl border border-slate-200/90 bg-white/80 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#1542a8] shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 hover:border-[#0b63f6]/25 hover:shadow-[0_14px_34px_rgba(11,99,246,0.12)]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4 lg:pl-5">
                <a href="#contact" data-scroll-to data-scroll-to-offset="-110" className="brand-btn-primary">
                  Start your project
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#our-work"
                  data-scroll-to
                  data-scroll-to-offset="-110"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#0b63f6]/22 bg-white/90 px-5 py-3 text-sm font-bold text-[#0b63f6] shadow-[0_12px_28px_rgba(11,99,246,0.08)] transition-all duration-300 hover:border-[#ff8f32]/35 hover:text-[#c45f0a]"
                >
                  <CirclePlay className="h-4 w-4 text-[#ff8f32] transition-transform duration-300 group-hover:scale-110" />
                  View our work
                  <ArrowUpRight className="h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            {/* Visual column — stacked “studio deck” */}
            <motion.div
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none"
            >
              <div className="absolute -inset-4 -z-10 rounded-[40px] bg-[linear-gradient(135deg,rgba(11,99,246,0.12),rgba(255,143,50,0.1))] blur-2xl" aria-hidden="true" />

              <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/75 p-1 shadow-[0_40px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
                <div className="flex items-center justify-between rounded-[28px] bg-[linear-gradient(180deg,#0f2744,#0a1628)] px-5 py-4 text-white">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-white/55">idr.tech / launch</span>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-200">
                    Live
                  </span>
                </div>

                <div className="space-y-4 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#5e78ad]">This week</p>
                      <p className="mt-2 text-lg font-semibold text-[#0c1f45]">Ship the next version of your brand site.</p>
                    </div>
                    <div className="hidden shrink-0 rounded-2xl border border-[#0b63f6]/12 bg-[#f3f7ff] px-3 py-2 text-center sm:block">
                      <p className="text-2xl font-bold leading-none text-[#0b63f6]">07+</p>
                      <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-wider text-[#5e78ad]">People</p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {studioDeckRows.map((row) => {
                      const Icon = row.icon;
                      return (
                        <div
                          key={row.title}
                          className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3.5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#0b63f6,#2563eb)] text-white shadow-[0_10px_22px_rgba(11,99,246,0.35)]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-[#0c1f45]">{row.title}</p>
                            <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-[#5e78ad]">{row.blurb}</p>
                          </div>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-[#0b63f6]/22 bg-[#f6f9ff] px-4 py-3">
                    <p className="text-xs font-semibold text-[#1542a8]">
                      <span className="text-[#ff8f32]">●</span> Roadmap synced — design, build, deploy in one flow.
                    </p>
                    <span className="rounded-full bg-white px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#5e78ad] shadow-sm">
                      360° coverage
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating stat chips */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="absolute -left-2 top-[42%] hidden rounded-2xl border border-white/90 bg-white/95 px-4 py-3 text-left shadow-[0_18px_40px_rgba(15,23,42,0.12)] sm:block lg:-left-8"
              >
                <p className="text-xl font-bold text-[#0b63f6]">24h</p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#5e78ad]">Support</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="absolute -right-3 bottom-[18%] hidden rounded-2xl border border-white/90 bg-gradient-to-br from-[#0b63f6] to-[#1542a8] px-4 py-3 text-left text-white shadow-[0_22px_48px_rgba(11,99,246,0.35)] sm:block lg:-right-6"
              >
                <p className="text-xl font-bold">100%</p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/75">Custom UI</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Metrics rail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-14 overflow-hidden rounded-[28px] border border-[#0f2744]/10 bg-[#0a1628] p-1 shadow-[0_28px_70px_rgba(10,22,40,0.35)]"
          >
            <div className="grid gap-px rounded-[24px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {quickStats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.28 + 0.06 * index }}
                  className="flex flex-col justify-center bg-[#0a1628] px-6 py-6 text-left sm:px-8"
                >
                  <p className="text-3xl font-bold tracking-tight text-white sm:text-[2rem]">{item.value}</p>
                  <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-slate-400">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vision + service spotlight — horizontal emphasis */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="mt-6 grid gap-4 lg:grid-cols-12"
          >
            <div
              className="relative overflow-hidden rounded-[28px] border border-white/25 text-white shadow-[0_30px_70px_rgba(255,143,50,0.22)] lg:col-span-5"
              style={{
                backgroundImage: 'linear-gradient(125deg,rgba(15,39,68,0.92),rgba(15,39,68,0.55)), linear-gradient(180deg,#ff9f52,#ff8f32), url(/background1.jpg)',
                backgroundBlendMode: 'normal, screen, normal',
                backgroundSize: 'cover',
                minHeight: '280px',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" aria-hidden="true" />
              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-white/90 backdrop-blur-md">
                    IDR Vision
                  </span>
                  <span className="hidden text-sm font-semibold text-white/80 sm:inline">Since day one</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/65">Why we build</p>
                  <p className="mt-4 max-w-sm text-lg font-semibold leading-snug text-white sm:text-xl">
                    Structure, polish, and momentum — so every launch feels inevitable, not improvised.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {heroHighlights.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.32 + i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)] backdrop-blur-md"
                  >
                    <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#0b63f6]/08 transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#fff4ea,#ffe2cc)] text-[#ea6b12] shadow-inner">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="relative mt-4 text-lg font-semibold text-[#0c1f45]">{card.title}</h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-[#5e78ad]">{card.text}</p>
                    <span className="relative mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0b63f6] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Explore
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-full border border-white/80 bg-white/76 py-3 shadow-[0_18px_44px_rgba(11,99,246,0.08)] backdrop-blur-md">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
              className="flex w-max gap-10 px-6"
            >
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <div key={`${item}-${index}`} className="inline-flex items-center gap-3 text-sm font-semibold text-[#5e78ad]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff8f32]" />
                  {item}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <WhatWeAreAbout />
      <WorkShow />
      <TechStack />
      {/* <TeamOwners /> */}

      <section className="px-4 pb-4 pt-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="glass-panel overflow-hidden rounded-[40px] p-4 sm:p-5">
            <div className="grid gap-8 rounded-[32px] bg-[linear-gradient(135deg,#ff9f52 0%,#ff8f32 100%)] px-6 py-10 text-black sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/78">Let&apos;s build together</p>
                <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">
                  We create websites and digital experiences that make your company look stronger online.
                </h2>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a
                  href="#contact"
                  data-scroll-to
                  data-scroll-to-offset="-110"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#ff8f32] transition-transform duration-300 hover:-translate-y-1"
                >
                  Talk with IDR Tech
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
};

export default Main;
