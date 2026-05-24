import { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, CirclePlay, Code, Sparkles, Layers, Cpu, CheckCircle2, Paintbrush, Shield, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WhatWeAreAbout from '../About/WhatWeAreAbout';
import Contact from '../Contact/Contact';
import TechStack from '../Pages/TechStack';
import WorkShow from '../Pages/WorkShow';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const containerRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // GSAP Scroll Animations for premium high-fidelity look and optimized performance
    const ctx = gsap.context(() => {
      // Fade in & slide elements on scroll with GSAP
      gsap.fromTo(
        leftSideRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        rightSideRef.current,
        { opacity: 0, scale: 0.95, x: 40 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // Scroll trigger for a smooth parallax or scroll action on stats/cards
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
    <main ref={containerRef} className="relative overflow-hidden bg-[#fafcff] text-[#12306d]">
      {/* Premium subtle background accents - optimized for 60fps rendering */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(11,99,246,0.07)_0%,transparent_60%)] blur-3xl" />
        <div className="absolute top-[20%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle,rgba(255,143,50,0.05)_0%,transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.05)_0%,transparent_60%)] blur-3xl" />
      </div>

      {/* ══════════ HERO SECTION: Modern Left-Right Split ══════════ */}
      <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* ──── LEFT SIDE: Impactful Copy & Conversion Elements ──── */}
            <div ref={leftSideRef} className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left z-10">

              {/* Premium Eyebrow */}
              <div className="inline-flex flex-wrap gap-2.5 items-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-50/70 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-600 shadow-sm backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
                  Next-Gen Digital Studio
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-50/70 px-4 py-1.5 text-xs font-bold text-orange-600 shadow-sm backdrop-blur-md">
                  <Zap className="h-3.5 w-3.5 text-orange-500" />
                  Vite &amp; Tailwind Powered
                </span>
              </div>

              {/* Bold Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                We craft premium websites that
                <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 bg-clip-text text-transparent">
                  grow your business
                </span>
              </h1>

              {/* Sophisticated Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                IDR Tech designs and builds clean, modern, and high-fidelity web experiences.
                Every pixel is optimized for visual brilliance, ultra-performance, and natural lead generation.
              </p>

              {/* Micro Features / Selling Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  { icon: CheckCircle2, text: 'Custom Engineered UI (No Templates)' },
                  { icon: Shield, text: 'Blazing Fast Speed & 100% SEO Ready' },
                  { icon: Cpu, text: 'Interactive Elements & Smooth Flows' },
                  { icon: Paintbrush, text: 'Ultra-Premium Minimalist Design' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-slate-700">
                    <item.icon className="h-5 w-5 text-blue-600 shrink-0" />
                    <span className="text-sm font-semibold">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Elegant Interactive CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-sm sm:text-base font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#our-work"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-sm sm:text-base font-bold text-slate-700 hover:text-blue-600 hover:border-blue-500/30 hover:bg-blue-50/20 shadow-sm transition-all duration-200"
                >
                  <CirclePlay className="h-5 w-5 text-orange-500 transition-transform duration-300 group-hover:scale-110" />
                  View Portfolio
                  <ArrowUpRight className="h-4 w-4 opacity-50 transition-opacity group-hover:opacity-100" />
                </a>
              </div>

              {/* Skill Tag Pills */}
              <div className="flex flex-wrap gap-2 pt-4">
                {['React & NextJS', 'Figma to Code', 'Fluid Animations', 'High Conversion UI'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm cursor-default transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ──── RIGHT SIDE: Stunning High-Fidelity UI Showcase ──── */}
            <div ref={rightSideRef} className="lg:col-span-5 relative w-full flex justify-center items-center">

              {/* Premium glowing background behind the showcase card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-[3rem] blur-2xl -z-10" />

              {/* Master Dashboard Showcase Container */}
              <div className="w-full max-w-md rounded-[2.5rem] border border-white bg-white/70 p-1.5 shadow-[0_30px_70px_rgba(15,23,42,0.1)] backdrop-blur-xl">
                <div className="overflow-hidden rounded-[2.2rem] bg-slate-950 text-white shadow-2xl">

                  {/* Dashboard Header Bar */}
                  <div className="flex items-center justify-between bg-slate-900 px-6 py-4 border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">idr.studio / interactive</span>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      Optimal
                    </span>
                  </div>

                  {/* Active Visual Space */}
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Service Suite</span>
                        <h3 className="mt-1 text-lg font-bold tracking-tight text-white">High Performance Code</h3>
                      </div>
                      <span className="rounded-xl bg-blue-500/10 p-2 text-blue-400 border border-blue-500/20">
                        <Code className="h-5 w-5" />
                      </span>
                    </div>

                    {/* Interactive workflow blocks */}
                    <div className="space-y-3">
                      {[
                        { title: 'Interactive Web Apps', text: 'Tailored for fluid user journeys & high speed.', icon: Cpu, color: 'text-blue-400' },
                        { title: 'Modern UI/UX Design', text: 'Designed in Figma, engineered to perfection.', icon: Layers, color: 'text-indigo-400' },
                        { title: 'Scalable Systems', text: 'Clean architecture structured to grow.', icon: Sparkles, color: 'text-orange-400' },
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.02, x: 4 }}
                          className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 hover:bg-slate-900 hover:border-slate-700/60 cursor-pointer transition-all duration-200"
                        >
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 ${item.color}`}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-white">{item.title}</p>
                            <p className="mt-0.5 text-[11px] text-slate-400 leading-normal line-clamp-1">{item.text}</p>
                          </div>
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-600" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom Status bar */}
                    <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-3.5 text-center">
                      <p className="text-[11px] font-semibold text-slate-400">
                        Ready to elevate your online experience?
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fluid Decorative Floating Tags */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-6 top-[30%] hidden sm:flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-[0_15px_35px_rgba(0,0,0,0.05)] backdrop-blur-md"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <p className="text-xs font-extrabold text-slate-800">Clean Architecture</p>
                  <p className="text-[10px] text-slate-500 font-medium">Engineered for growth</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-4 bottom-[20%] hidden sm:flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-[0_15px_35px_rgba(0,0,0,0.05)] backdrop-blur-md"
              >
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-xs font-extrabold text-slate-800">Highly Performance</p>
                  <p className="text-[10px] text-slate-500 font-medium">Optimized structure</p>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* ── Visual Division Marquee ── */}
      <section className="py-6 bg-slate-900 text-white/90 overflow-hidden relative border-y border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,99,246,0.1),transparent_50%,rgba(11,99,246,0.1))]" />
        <div className="flex w-full overflow-hidden select-none gap-16">
          {/* First track */}
          <div className="flex shrink-0 justify-around min-w-full gap-16 animate-marquee whitespace-nowrap text-xs sm:text-sm font-bold uppercase tracking-widest">
            {['Web Development', 'UI/UX Design', 'Digital Agency', 'Fast Loading', 'SEO Supremacy', 'Conversion Engine'].map((item, idx) => (
              <span key={`marquee-1-${idx}`} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0" />
                {item}
              </span>
            ))}
          </div>
          {/* Second identical track to complete seamless infinite loop */}
          <div className="flex shrink-0 justify-around min-w-full gap-16 animate-marquee whitespace-nowrap text-xs sm:text-sm font-bold uppercase tracking-widest" aria-hidden="true">
            {['Web Development', 'UI/UX Design', 'Digital Agency', 'Fast Loading', 'SEO Supremacy', 'Conversion Engine'].map((item, idx) => (
              <span key={`marquee-2-${idx}`} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0" />
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
