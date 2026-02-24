import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   HOOK — triggers animation when element enters viewport
───────────────────────────────────────────────────────────── */
const useReveal = (threshold = 0.3) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
};

/* ─────────────────────────────────────────────────────────────
   IDR LOGO ANIMATION COMPONENT
   - "I" flies in from left
   - "D" flies in from bottom
   - "R" flies in from right
   - Each letter has animated color motion (gradient shift)
───────────────────────────────────────────────────────────── */
const IDRAnimation = ({ delay = 0, loop = false }) => {
  const letters = [
    {
      char: 'I',
      initial: { x: -200, opacity: 0, rotate: -15 },
      animate: { x: 0, opacity: 1, rotate: 0 },
      colors: ['#a855f7', '#6366f1', '#3b82f6', '#a855f7'],
    },
    {
      char: 'D',
      initial: { y: 200, opacity: 0, scale: 0.5 },
      animate: { y: 0, opacity: 1, scale: 1 },
      colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#06b6d4'],
    },
    {
      char: 'R',
      initial: { x: 200, opacity: 0, rotate: 15 },
      animate: { x: 0, opacity: 1, rotate: 0 },
      colors: ['#ec4899', '#f43f5e', '#f97316', '#ec4899'],
    },
  ];

  return (
    <div className="flex items-end justify-center gap-1 md:gap-3">
      {letters.map((l, i) => (
        <LetterBlock
          key={l.char}
          letter={l}
          delay={delay + i * 0.18}
          loop={loop}
          index={i}
        />
      ))}
    </div>
  );
};

const LetterBlock = ({ letter, delay, loop, index }) => {
  const [colorIdx, setColorIdx] = useState(0);

  /* colour cycling */
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIdx((prev) => (prev + 1) % letter.colors.length);
    }, 700 + index * 150);
    return () => clearInterval(interval);
  }, [letter.colors, index]);

  const color = letter.colors[colorIdx];

  return (
    <motion.span
      initial={letter.initial}
      animate={loop ? {
        ...letter.animate,
        // subtle float when looping
        y: letter.initial.y !== undefined ? [0, -10, 0] : undefined,
        x: letter.initial.x !== undefined ? [0, 0] : undefined,
      } : letter.animate}
      transition={loop ? {
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
        y: { repeat: Infinity, duration: 2.4, ease: 'easeInOut', delay: delay + 0.9 },
      } : {
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ color, textShadow: `0 0 40px ${color}88, 0 0 80px ${color}44` }}
      className="text-[clamp(80px,15vw,180px)] font-black leading-none select-none tracking-tighter transition-[color,text-shadow] duration-700"
    >
      {letter.char}
    </motion.span>
  );
};

/* ─────────────────────────────────────────────────────────────
   PARTICLE DOTS  — floating background decoration
───────────────────────────────────────────────────────────── */
const FloatingParticles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 6,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 4,
    color: ['#a855f7', '#3b82f6', '#06b6d4', '#ec4899', '#f97316'][i % 5],
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full opacity-40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{ y: [-12, 12, -12], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CONTEXT CARD — each of the 5 animated text sections
───────────────────────────────────────────────────────────── */
const contexts = [
  {
    id: 1,
    tag: 'Who We Are',
    headline: 'IDR Tech — Built to Innovate',
    body: 'We are IDR Tech, a forward-thinking technology company on a mission to reshape how businesses experience the digital world. From startups to enterprises, we craft solutions that move at the speed of ideas.',
    accent: 'from-violet-500 to-blue-500',
    glow: 'rgba(139,92,246,0.25)',
    icon: '✦',
  },
  {
    id: 2,
    tag: 'Web Development',
    headline: 'Websites That Speak for Your Brand',
    body: 'We design and develop stunning, high-performance websites that captivate your audience and convert visitors into customers. Pixel-perfect UI, blazing-fast load times, and cross-device experiences — we deliver all three.',
    accent: 'from-blue-500 to-cyan-400',
    glow: 'rgba(59,130,246,0.25)',
    icon: '◈',
  },
  {
    id: 3,
    tag: 'Web Services',
    headline: 'Scalable Web Services & APIs',
    body: 'Our robust backend web services and API solutions power apps that scale effortlessly. From RESTful APIs to real-time data pipelines, we architect systems engineered for reliability, security, and peak performance.',
    accent: 'from-cyan-400 to-teal-500',
    glow: 'rgba(6,182,212,0.25)',
    icon: '⬡',
  },
  {
    id: 4,
    tag: 'Digital Solutions',
    headline: 'End-to-End Digital Solutions',
    body: 'Beyond development, we deliver complete digital transformation. Whether it\'s CRM integrations, cloud migrations, SaaS platforms, or automation workflows — IDR Tech is your one-stop partner for every digital challenge.',
    accent: 'from-pink-500 to-rose-500',
    glow: 'rgba(236,72,153,0.25)',
    icon: '⬢',
  },
  {
    id: 5,
    tag: 'Why IDR',
    headline: 'Innovation. Dedication. Results.',
    body: 'IDR is more than a name — it\'s our promise. Innovation that pushes boundaries, Dedication that fuels every project, and Results that speak for themselves. Partner with us and experience technology that transforms.',
    accent: 'from-orange-500 to-yellow-400',
    glow: 'rgba(249,115,22,0.25)',
    icon: '★',
  },
];

const ContextCard = ({ ctx, index }) => {
  const { ref, inView } = useReveal(0.25);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -80 : 80, y: 30 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      {/* Glow blob behind card */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
        style={{ background: ctx.glow }}
      />

      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-1">
        {/* Corner accent */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${ctx.accent} opacity-10 rounded-bl-[80px]`} />

        {/* Tag pill */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-gradient-to-r ${ctx.accent} text-white shadow-lg mb-5`}
        >
          <span className="text-sm">{ctx.icon}</span>
          {ctx.tag}
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight"
        >
          {ctx.headline}
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-gray-400 text-base md:text-lg leading-relaxed"
        >
          {ctx.body}
        </motion.p>

        {/* Decorative number */}
        <div className="absolute bottom-4 right-6 text-6xl font-black text-white/5 select-none">
          {String(ctx.id).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   SECTION DIVIDER — animated line
───────────────────────────────────────────────────────────── */
const Divider = ({ delay = 0 }) => {
  const { ref, inView } = useReveal(0.5);
  return (
    <div ref={ref} className="flex items-center gap-4 my-8">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left"
      />
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: delay + 0.3 }}
        className="text-white/30 text-xs"
      >
        ✦
      </motion.span>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-right"
      />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   SCROLL CUE
───────────────────────────────────────────────────────────── */
const ScrollCue = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2.5 }}
    className="flex flex-col items-center gap-2 mt-14"
  >
    <span className="text-white/40 text-xs tracking-widest uppercase">Scroll to explore</span>
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center pt-1.5"
    >
      <div className="w-1 h-2 rounded-full bg-white/50" />
    </motion.div>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────
   LOOP IDR OUTRO
───────────────────────────────────────────────────────────── */
const OutroIDR = () => {
  const { ref, inView } = useReveal(0.3);

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex flex-col items-center justify-center py-20 overflow-hidden"
    >
      <FloatingParticles />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-gradient-radial from-violet-700/20 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <AnimatePresence>
        {inView && (
          <>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/50 text-sm uppercase tracking-[0.35em] mb-8 font-semibold"
            >
              That&apos;s who we are
            </motion.p>

            <IDRAnimation delay={0.4} loop={true} />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 text-white/40 text-base md:text-lg text-center max-w-md"
            >
              Innovation · Dedication · Results
            </motion.p>

            <motion.a
              href="/contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              whileHover={{ scale: 1.07, boxShadow: '0 0 40px rgba(168,85,247,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-blue-500 to-pink-500 text-white font-bold text-base tracking-wide shadow-[0_4px_24px_rgba(139,92,246,0.4)] no-underline"
            >
              Work With Us →
            </motion.a>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN — the full home page body
───────────────────────────────────────────────────────────── */
const Main = () => {
  return (
    <main className="relative w-full min-h-screen bg-[#08080f] overflow-x-hidden">

      {/* ══ HERO SECTION ══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-10 overflow-hidden">
        <FloatingParticles />

        {/* Big blurred background orbs */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-700 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-700 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute top-1/2 right-1/3 w-[350px] h-[350px] bg-pink-700 rounded-full blur-[120px]"
          />
        </div>

        {/* ── IDR Entry Animation ── */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Pre-title */}
          <motion.p
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/40 text-xs md:text-sm uppercase tracking-[0.4em] mb-6 font-semibold"
          >
            Welcome to
          </motion.p>

          {/* IDR letters — each flies from different direction */}
          <IDRAnimation delay={0.6} loop={false} />

          {/* Company full name */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-2xl md:text-4xl font-extrabold text-center"
          >
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              IDR Tech
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-gray-400 text-base md:text-lg text-center max-w-lg leading-relaxed"
          >
            Crafting websites · Building web services · Delivering digital solutions
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-4 justify-center"
          >
            <motion.a
              href="/services"
              whileHover={{ scale: 1.06, boxShadow: '0 0 32px rgba(139,92,246,0.5)' }}
              whileTap={{ scale: 0.96 }}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(139,92,246,0.45)] no-underline"
            >
              Explore Services
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.06, borderColor: 'rgba(139,92,246,0.6)' }}
              whileTap={{ scale: 0.96 }}
              className="px-7 py-3 rounded-full border border-white/20 text-white/80 font-semibold text-sm tracking-wide hover:bg-white/5 transition-colors no-underline"
            >
              Contact Us
            </motion.a>
          </motion.div>

          {/* Scroll cue */}
          <ScrollCue />
        </div>
      </section>

      {/* ══ 5 CONTEXT SECTIONS ══ */}
      <section className="relative px-4 pb-10">
        <div className="max-w-4xl mx-auto">

          {/* Section intro */}
          <div className="text-center mb-16">
            {(() => {
              const { ref, inView } = useReveal(0.4);
              return (
                <div ref={ref}>
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-white/30 text-xs uppercase tracking-[0.35em] mb-3"
                  >
                    Our Story
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="text-3xl md:text-5xl font-black text-white"
                  >
                    What{' '}
                    <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                      IDR Tech
                    </span>{' '}
                    is all about
                  </motion.h2>
                </div>
              );
            })()}
          </div>

          {/* Cards grid */}
          <div className="flex flex-col gap-6">
            {contexts.map((ctx, i) => (
              <React.Fragment key={ctx.id}>
                <ContextCard ctx={ctx} index={i} />
                {i < contexts.length - 1 && <Divider delay={0.1} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LOOPING IDR OUTRO ══ */}
      <OutroIDR />

      {/* Bottom gradient fade */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </main>
  );
};

export default Main;