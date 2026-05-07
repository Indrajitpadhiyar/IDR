import { ArrowRight, CirclePlay, Code2, Layers3, MonitorSmartphone, Sparkles } from 'lucide-react';
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
      {/* ══════════ HERO — Centered Header + Bento Grid ══════════ */}
      <section ref={heroRef} id="home" className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">

        {/* bg glows */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div style={{ y: leftGlow }}
            className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-[#0b63f6]/15 blur-[160px]" />
          <motion.div style={{ y: rightGlow }}
            className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#ff8f32]/18 blur-[140px]" />
          <div className="absolute bottom-0 left-1/2 h-64 w-[60%] -translate-x-1/2 rounded-full bg-[#0b63f6]/06 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl">

          {/* ── Centered text block ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="section-eyebrow mx-auto">
              <Sparkles className="h-4 w-4" />
              Initiate. Digital. Revolution.
            </span>

            <h1 className="section-title mt-7 text-[#12306d]">
              Helping businesses grow with clean websites, smart design, and digital solutions.
            </h1>

            <p className="section-copy mx-auto mt-6">
              Our vision is simple: create modern digital experiences that make every company look clear, trusted, and ready to grow online.
            </p>

            {/* Service pills */}
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {serviceTags.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#0b63f6]/16 bg-white/86 px-4 py-2 text-sm font-semibold text-[#0b63f6] shadow-[0_12px_28px_rgba(11,99,246,0.08)]"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#contact" data-scroll-to data-scroll-to-offset="-110" className="brand-btn-primary">
                Start your project
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#our-work" data-scroll-to data-scroll-to-offset="-110" className="brand-btn-secondary">
                <CirclePlay className="h-4 w-4" />
                View our work
              </a>
            </div>
          </motion.div>

          {/* ── Stats strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {quickStats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.22 + 0.07 * index }}
                className="glass-panel rounded-2xl px-5 py-5 text-center"
              >
                <p className="text-2xl font-bold text-[#12306d]">{item.value}</p>
                <p className="mt-1.5 text-sm text-[#5e78ad]">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Bento grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28 }}
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2"
          >
            {/* Vision card — spans 2 rows on lg */}
            <div
              className="relative overflow-hidden rounded-[32px] border border-white/24 text-white shadow-[0_30px_70px_rgba(255,143,50,0.24)] sm:col-span-2 lg:col-span-1 lg:row-span-2"
              style={{
                backgroundImage: 'linear-gradient(180deg,#ff9f52,#ff8f32), url(/background1.jpg)',
                backgroundBlendMode: 'screen',
                minHeight: '320px',
              }}
            >
              <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

              {/* IDR Vision label top */}
              <div className="relative flex items-center justify-between px-5 pt-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>
                <div className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                  IDR Vision
                </div>
              </div>

              {/* Bottom glass text */}
              <div className="absolute inset-x-4 bottom-4 rounded-[22px] border border-white/18 bg-white/14 p-5 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/78">Company vision</p>
                <p className="mt-3 text-lg font-semibold leading-8">
                  Building clear structure and smooth interactions so every touchpoint keeps IDR Tech ahead of the curve.
                </p>
              </div>
            </div>

            {/* Service highlight cards */}
            {heroHighlights.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.34 + i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-panel rounded-[28px] p-3"
                >
                  <div className="h-full rounded-[22px] border border-[#ff8f32]/10 bg-white/96 p-6 shadow-[0_16px_36px_rgba(255,143,50,0.06)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff3ea] text-[#ff8f32]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-[#d36e10]">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#d88941]">{card.text}</p>
                  </div>
                </motion.div>
              );
            })}
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
