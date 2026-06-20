import { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, BarChart3, Gem, LayoutTemplate, MousePointerClick, PenTool, Rocket, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WhatWeAreAbout from '../About/WhatWeAreAbout';
import Contact from '../Contact/Contact';
import TechStack from '../Pages/TechStack';
import WorkShow from '../Pages/WorkShow';

gsap.registerPlugin(ScrollTrigger);

const heroMetrics = [
  { value: '98+', label: 'Performance score' },
  { value: '<2s', label: 'Load time' },
  { value: '100%', label: 'Custom built' },
  { value: '24/7', label: 'Support ready' },
];

const bentoCards = [
  {
    id: 'design',
    span: 'md:col-span-2 md:row-span-2',
    icon: PenTool,
    title: 'UI/UX Design',
    text: 'Figma-first systems with clear hierarchy, refined typography, and conversion-focused layouts.',
    accent: 'from-[#0b63f6]/12 via-[#eef4ff] to-white',
    stat: 'Pixel-perfect',
  },
  {
    id: 'dev',
    span: 'md:col-span-1',
    icon: LayoutTemplate,
    title: 'Development',
    text: 'React, Vite, and modern stacks engineered for speed.',
    accent: 'from-[#ff8f32]/10 to-white',
    stat: 'No templates',
  },
  {
    id: 'growth',
    span: 'md:col-span-1',
    icon: TrendingUp,
    title: 'Growth',
    text: 'SEO-ready structure built to attract and convert.',
    accent: 'from-[#1542a8]/8 to-white',
    stat: 'SEO-first',
  },
  {
    id: 'launch',
    span: 'md:col-span-2',
    icon: Rocket,
    title: 'Launch pipeline',
    text: 'From wireframe to production — strategy, design, build, and ship in one focused team.',
    accent: 'from-[#0b63f6]/6 via-white to-[#ff8f32]/8',
    stat: 'End-to-end',
  },
];

const Main = () => {
  const containerRef = useRef(null);
  const heroContentRef = useRef(null);
  const bentoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroContentRef.current?.children ?? [],
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        bentoRef.current?.children ?? [],
        { opacity: 0, y: 48, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.35,
        }
      );

      gsap.fromTo(
        '.gsap-scroll-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gsap-scroll-card-trigger',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative overflow-hidden text-[#12306d]">
      {/* ══════════ HERO: Editorial Center + Bento Mosaic ══════════ */}
      <section id="home" className="relative min-h-[100svh] flex flex-col justify-center pt-28 pb-12 lg:pt-32 lg:pb-16">
        {/* Ambient layers */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[20%] left-1/2 h-[70vh] w-[120vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(11,99,246,0.14)_0%,transparent_68%)]" />
          <div className="absolute bottom-0 right-0 h-[45vh] w-[55vw] bg-[radial-gradient(circle_at_80%_80%,rgba(255,143,50,0.12)_0%,transparent_62%)]" />
          <div className="hero-diagonal-band absolute inset-0 opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="select-none font-black tracking-[-0.06em] text-[clamp(8rem,28vw,22rem)] text-[#0b63f6]/[0.035]">
              IDR
            </span>
          </div>
          <div className="hero-orbital-ring absolute left-[8%] top-[22%] hidden h-32 w-32 rounded-full border border-[#0b63f6]/15 lg:block" />
          <div className="hero-orbital-ring hero-orbital-ring--delayed absolute right-[10%] bottom-[28%] hidden h-24 w-24 rounded-full border border-[#ff8f32]/20 lg:block" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Centered editorial copy */}
          <div ref={heroContentRef} className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[rgba(11,99,246,0.16)] bg-white/75 px-4 py-2 shadow-[0_8px_30px_rgba(11,99,246,0.08)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff8f32] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff8f32]" />
              </span>
              <span className="font-['DM_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.22em] text-[#5e78ad]">
                IDR Tech · Web Studio
              </span>
              <span className="hidden h-3 w-px bg-[rgba(11,99,246,0.2)] sm:block" />
              <span className="hidden font-['DM_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.18em] text-[#0b63f6] sm:inline">
                Accepting projects
              </span>
            </div>

            <h1 className="text-[clamp(2.4rem,7.5vw,5.25rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#12306d]">
              <span className="block">Digital experiences</span>
              <span className="mt-1 block">
                <span className="hero-outline-text">engineered</span>
                {' '}
                <span className="bg-gradient-to-r from-[#ff8f32] via-[#faa967] to-[#e54a10] bg-clip-text text-transparent">
                  to convert.
                </span>
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[#5e78ad] sm:text-lg">
              IDR Tech builds premium websites and product interfaces — custom UI, sharp engineering,
              and growth-ready systems that make your brand look world-class online.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href="#contact" className="brand-btn-primary px-8 py-3.5 text-sm sm:text-base">
                Start your project
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#our-work" className="brand-btn-secondary group px-7 py-3.5 text-sm sm:text-base">
                <MousePointerClick className="h-4 w-4 text-[#ff8f32] transition-transform duration-300 group-hover:scale-110" />
                View our work
                <ArrowUpRight className="h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100" />
              </a>
            </div>

            {/* Inline metrics ribbon */}
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-[rgba(11,99,246,0.12)] bg-[rgba(11,99,246,0.08)] sm:grid-cols-4">
              {heroMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col items-center justify-center bg-white/80 px-4 py-5 backdrop-blur-sm"
                >
                  <span className="text-2xl font-extrabold tracking-tight text-[#12306d] sm:text-3xl">
                    {metric.value}
                  </span>
                  <span className="mt-1 font-['DM_Mono',monospace] text-[10px] font-bold uppercase tracking-[0.2em] text-[#5e78ad]">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bento capability mosaic */}
          <div
            ref={bentoRef}
            className="relative z-10 mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2"
          >
            {bentoCards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.article
                  key={card.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`group relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-gradient-to-br ${card.accent} p-5 shadow-[0_20px_50px_rgba(11,99,246,0.07)] backdrop-blur-md ${card.span}`}
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#0b63f6]/5 blur-2xl transition-all duration-500 group-hover:bg-[#0b63f6]/10" />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(11,99,246,0.12)] bg-white/90 text-[#0b63f6] shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-[rgba(255,143,50,0.25)] bg-[rgba(255,143,50,0.08)] px-2.5 py-1 font-['DM_Mono',monospace] text-[9px] font-bold uppercase tracking-[0.16em] text-[#e54a10]">
                        {card.stat}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold tracking-tight text-[#12306d]">{card.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5e78ad]">{card.text}</p>

                    {card.id === 'design' && (
                      <div className="mt-5 space-y-2.5">
                        {['Layout systems', 'Motion & micro-interactions', 'Brand-aligned UI'].map((item) => (
                          <div key={item} className="flex items-center gap-2.5 text-xs font-semibold text-[#12306d]/80">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0b63f6]" />
                            {item}
                          </div>
                        ))}
                      </div>
                    )}

                    {card.id === 'launch' && (
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        {['Strategy', 'Design', 'Build', 'Launch'].map((step, idx) => (
                          <span key={step} className="inline-flex items-center gap-2">
                            <span className="rounded-lg bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0b63f6] shadow-sm">
                              {step}
                            </span>
                            {idx < 3 && <span className="text-[#5e78ad]/50">→</span>}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Floating accent chips */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute left-[4%] top-[38%] hidden items-center gap-2 rounded-2xl border border-white/90 bg-white/90 px-4 py-3 shadow-[0_16px_40px_rgba(11,99,246,0.1)] backdrop-blur-md lg:flex"
          >
            <Gem className="h-4 w-4 text-[#ff8f32]" />
            <div className="text-left">
              <p className="text-xs font-bold text-[#12306d]">Premium craft</p>
              <p className="text-[10px] text-[#5e78ad]">No cookie-cutter builds</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute right-[5%] top-[52%] hidden items-center gap-2 rounded-2xl border border-white/90 bg-white/90 px-4 py-3 shadow-[0_16px_40px_rgba(255,143,50,0.12)] backdrop-blur-md lg:flex"
          >
            <BarChart3 className="h-4 w-4 text-[#0b63f6]" />
            <div className="text-left">
              <p className="text-xs font-bold text-[#12306d]">Built to perform</p>
              <p className="text-[10px] text-[#5e78ad]">Speed + SEO optimized</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Light editorial marquee ── */}
      <section className="relative overflow-hidden border-y border-[rgba(11,99,246,0.1)] bg-white/55 py-5 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,99,246,0.04),transparent_42%,rgba(255,143,50,0.05),transparent_78%)]" />
        <div className="flex w-full select-none gap-12 overflow-hidden">
          <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-12 whitespace-nowrap font-['DM_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.28em] text-[#5e78ad]">
            {['Custom UI Systems', 'React & Vite', 'Figma to Code', 'Conversion Design', 'SEO Architecture', 'Launch Support'].map((item, idx) => (
              <span key={`marquee-1-${idx}`} className="flex items-center gap-3">
                <span className="h-1 w-1 shrink-0 rounded-full bg-[#0b63f6]" />
                {item}
              </span>
            ))}
          </div>
          <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-12 whitespace-nowrap font-['DM_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.28em] text-[#5e78ad]" aria-hidden="true">
            {['Custom UI Systems', 'React & Vite', 'Figma to Code', 'Conversion Design', 'SEO Architecture', 'Launch Support'].map((item, idx) => (
              <span key={`marquee-2-${idx}`} className="flex items-center gap-3">
                <span className="h-1 w-1 shrink-0 rounded-full bg-[#ff8f32]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section anchor layout wrapper */}
      <div className="gsap-scroll-card-trigger">
        <WhatWeAreAbout />
        <WorkShow />
        <TechStack />
      </div>

      {/* ── Conversion Spotlight / CTA Panel ── */}
      <section className="px-4 pb-4 pt-2 sm:px-6 lg:px-8 gsap-scroll-card">
        <div className="mx-auto max-w-7xl">
          <div className="glass-panel overflow-hidden rounded-[3rem] p-5 border border-white bg-white/50 backdrop-blur-xl shadow-xl shadow-slate-100">
            <div className="grid gap-8 rounded-[2.5rem] bg-gradient-to-r from-slate-900 to-slate-950 px-8 py-12 text-white items-center lg:grid-cols-12">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400">Collaborate with IDR</span>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                  Let&apos;s engineer a high-fidelity digital presence that helps your business look stronger and gain more clients.
                </h2>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end text-orange-400">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full text-shadow-2xs bg-white px-8 py-4 text-sm font-bold text-ore hover:bg-slate-50 shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  Talk with IDR Tech
                  <ArrowRight className="h-4 w-4 text-orange-500" />
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
