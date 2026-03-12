import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const projects = [
  {
    badge: 'WORK',
    title: 'E-Commerce Website',
    description: "A full-featured online store with product browsing, cart and checkout flows, wishlist support, and an admin portal for inventory, orders, and customer management.",
    img: '/bagify.png',
    stats: [
      { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', value: '120+', label: 'Products' },
      { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', value: '24/7', label: 'Support' },
      { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', value: 'Admin', label: 'Dashboard' },
    ],
    bgColor: '#ffffff',
    textColor: 'text-gray-900',
    descColor: 'text-gray-500',
    badgeColor: 'border-orange-200 text-orange-500',
    buttonStyle: 'bg-[#e45927] text-white',
    priceColor: 'text-[#e45927]',
    id: 'project-1',
    link: 'https://bagify-z9wj.onrender.com/',
  },
  {
    badge: 'WORK',
    title: 'Prime Drink Landing Page',
    description: 'A vibrant landing page for Prime Drink showcasing flavors, key benefits, and a clear call-to-action for ordering online.',
    img: '/project2.png',
    stats: [
      { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', value: '3', label: 'Flavors' },
      { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', value: '100%', label: 'Natural' },
      { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', value: 'Ready', label: 'To Order' },
    ],
    bgColor: '#e45927',
    textColor: 'text-white',
    descColor: 'text-white/80',
    badgeColor: 'border-white/30 text-white',
    buttonStyle: 'bg-white text-gray-900',
    priceColor: 'text-white',
    id: 'project-2',
    link: 'https://prime-r05t.onrender.com', // Added link
  },
  {
    badge: 'WORK',
    title: 'Custom Dashboard App',
    description: 'A sleek admin dashboard with customizable analytics panels, real-time data feeds, and drag-and-drop widget configuration for building reports on the fly.',
    img: '/portfolio.png',
    stats: [
      { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', value: '25+', label: 'Charts' },
      { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', value: 'Real-Time', label: 'Updates' },
      { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', value: 'Custom', label: 'Widgets' },
    ],
    price: 'Rs.7499',
    oldPrice: 'Rs.14999',
    bgColor: '#0a0a0a',
    textColor: 'text-white',
    descColor: 'text-white/70',
    badgeColor: 'border-white/20 text-white',
    buttonStyle: 'bg-white text-gray-900',
    priceColor: 'text-white',
    id: 'project-3',
    link: 'https://myportfolio-78uy.onrender.com/', // Added link
  },
]

const Card = ({ proj, index, total, sectionRef }) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const sliceSize = 1 / total

  // When this card slides in
  const enterStart = index === 0 ? 0 : index * sliceSize - 0.02
  const enterEnd = index === 0 ? 0 : index * sliceSize + sliceSize * 0.3

  const y = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1] : [enterStart, enterEnd],
    index === 0 ? ['0%', '0%'] : ['100%', '0%']
  )

  // When the NEXT card comes in, this one scales back
  const nextStart = (index + 1) * sliceSize - 0.02
  const nextEnd = (index + 1) * sliceSize + sliceSize * 0.3

  const scale = useTransform(
    scrollYProgress,
    index < total - 1 ? [nextStart, nextEnd] : [0, 1],
    index < total - 1 ? [1, 0.92] : [1, 1]
  )

  // Keep cards fully opaque so the previous card never shows through.
  const opacity = 1

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        willChange: 'transform, scale',
        transformOrigin: 'top center',
        backgroundColor: proj.bgColor,
        position: 'absolute',
        inset: 0,
        borderRadius: '2rem',
      }}
      className="shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] md:shadow-[0_32px_80px_-16px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row border border-black/5 group"
    >
      {/* Image side */}
      <div className="w-full md:w-[60%] relative min-h-[180px] md:min-h-full overflow-hidden flex-shrink-0">
        <img
          src={`${proj.img}${window.innerWidth < 768 ? '&w=600&q=75' : ''}`}
          alt={proj.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />
        <div className="absolute top-5 left-5">
          <span
            className={`text-[9px] font-black tracking-[0.25em] px-3 py-1.5 rounded-full border ${window.innerWidth < 768 ? 'bg-white/10' : 'backdrop-blur-sm bg-white/10'} ${proj.badgeColor}`}
          >
            {proj.badge}
          </span>
        </div>
      </div>

      {/* Content side */}
      <div className={`w-full md:w-[40%] p-6 md:p-10 flex flex-col justify-center ${proj.textColor}`}>
        <h3 className="text-xl md:text-[1.75rem] font-bold mb-2 leading-tight tracking-tight">
          {proj.title}
        </h3>
        <p className={`text-sm md:text-base mb-4 leading-relaxed ${proj.descColor}`}>
          {proj.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {proj.stats.map((b) => (
            <div
              key={b.label}
              className={`flex items-center gap-2 bg-black/5 rounded-xl px-3 py-2 ${window.innerWidth < 768 ? '' : 'backdrop-blur-sm'}`}
            >
              <svg
                className="w-4 h-4 opacity-60 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d={b.icon}
                />
              </svg>
              <span className="text-xs font-bold tracking-tight">
                <span className="font-black">{b.value}</span> {b.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <motion.a
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`${proj.buttonStyle} px-6 py-3 rounded-2xl font-black text-sm tracking-tight shadow-lg hover:shadow-2xl transition-all flex items-center gap-2 inline-flex`}
          >
            View Project <span className="text-lg">→</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

/* Scroll-progress dots — driven by the same sectionRef */
const Dots = ({ total, sectionRef }) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const sliceSize = 1 / total

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-50">
      {Array.from({ length: total }).map((_, i) => {
        const start = i === 0 ? 0 : i * sliceSize - 0.05
        const end = i === total - 1 ? 1 : (i + 1) * sliceSize - 0.05
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dotScale = useTransform(scrollYProgress, [start, end], [0.8, 1.5])
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dotOpacity = useTransform(scrollYProgress, [start, end], [0.25, 1])
        return (
          <motion.div
            key={i}
            style={{ scale: dotScale, opacity: dotOpacity }}
            className="w-2 h-2 rounded-full bg-[#e45927]"
          />
        )
      })}
    </div>
  )
}

const WorkShow = () => {
  /*
    sectionRef wraps the ENTIRE tall outer div.
    useScroll targets it so progress goes 0→1 across the full runway.
  */
  const sectionRef = useRef(null)
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => { });
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /*
    Height breakdown:
      1.0 vh  — first card already visible (no scroll needed)
      1.0 vh  — scroll range for card 2 to slide in
      1.0 vh  — scroll range for card 3 to slide in
      0.8 vh  — buffer so the last card fully settles before unsticking
    Total = 3.8 viewports for 3 cards.
    Formula: (projects.length - 1) + 1.8
  */
  const totalVh = (projects.length - 1) + 1.8

  return (
    <div
      ref={sectionRef}
      style={{ height: `${totalVh * 100}vh` }}
      className="relative w-full "
    >
      {/* ── Sticky panel: fills viewport, never scrolls internally ── */}
      <div
        className="sticky top-0 flex flex-col"
        style={{
          height: '100vh',
          background: isMobile ? '#fff' : '#fdf6f0',
          borderRadius: isMobile ? '1.5rem 1.5rem 0 0' : '2.5rem 2.5rem 0 0',
          overflow: 'hidden',    // clips card edges only — NOT a scroll container
          willChange: 'transform'
        }}
      >
        {/* Decorative Video Element */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-orange-200/30 shadow-2xl z-20 hidden sm:block pointer-events-none">
          <video
            ref={videoRef}
            src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-abstract-line-background-30472-large.mp4"
            muted
            loop
            playsInline
            className="w-full h-full object-cover grayscale brightness-110"
          />
        </div>

        {/* Header */}
        <div className="flex-shrink-0 w-full text-center pt-8 pb-4 px-4 md:px-8">
          <div className={`inline-block px-4 py-1.5 border border-orange-200 text-[#e45927] text-[10px] font-bold tracking-[0.2em] rounded-md mb-3 bg-white/50 ${isMobile ? '' : 'backdrop-blur-sm'}`}>
            WORK
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-[1.1] tracking-tight">
            Not Sure Which{' '}
            <span className="text-[#e45927]">Website If You Wont</span>
            <br className="hidden md:block" /> Don't Worry, We're Here To Help.
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#e45927] text-white px-8 py-2.5 rounded-full font-bold flex items-center gap-3 mx-auto shadow-xl shadow-orange-900/10 hover:bg-[#d04a1e] transition-colors text-sm"
          >
            Explore Projects <span className="text-lg">→</span>
          </motion.button>
        </div>

        {/* Card stack */}
        <div className="flex-1 relative w-full overflow-hidden">
          <div className="h-full flex items-center justify-center">
            <div
              className="relative w-[92%] md:w-[98%] max-w-none overflow-hidden"
              style={{ height: isMobile ? '65vh' : '72vh' }}
            >
              {projects.map((proj, idx) => (
                <Card
                  key={proj.id}
                  proj={proj}
                  index={idx}
                  total={projects.length}
                  sectionRef={sectionRef}
                />
              ))}
            </div>
          </div>

          <Dots total={projects.length} sectionRef={sectionRef} />
        </div>
      </div>
    </div>
  )
}

export default WorkShow