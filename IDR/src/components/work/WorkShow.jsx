import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const projects = [
  {
    badge: 'WORK',
    title: 'Data Science & Analytics with Gen AI',
    description: 'Gain hands-on experience in data analysis, visualization, and AI integration.',
    img: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=800',
    hours: '115+',
    certified: 'Yes Certified',
    price: 'Rs.6999',
    oldPrice: 'Rs.14891',
    bgColor: '#ffffff',
    textColor: 'text-gray-900',
    descColor: 'text-gray-500',
    badgeColor: 'border-orange-200 text-orange-500',
    buttonStyle: 'bg-[#e45927] text-white',
    priceColor: 'text-[#e45927]',
    id: 'course-1',
  },
  {
    badge: 'WORK',
    title: 'Java and DSA Domination',
    description: 'Ace your coding interviews. Master Java and DSA with our expert-led course, packed with interactive modules and projects.',
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    hours: '200+',
    certified: 'Yes Certified',
    price: 'Rs.4999',
    oldPrice: 'Rs.9998',
    bgColor: '#e45927',
    textColor: 'text-white',
    descColor: 'text-white/80',
    badgeColor: 'border-white/30 text-white',
    buttonStyle: 'bg-white text-gray-900',
    priceColor: 'text-white',
    id: 'course-2',
  },
  {
    badge: 'WORK',
    title: 'Full Stack Web Development',
    description: 'Build modern responsive web applications using the latest technologies and frameworks.',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    hours: '150+',
    certified: 'Yes Certified',
    price: 'Rs.5999',
    oldPrice: 'Rs.12999',
    bgColor: '#0a0a0a',
    textColor: 'text-white',
    descColor: 'text-white/70',
    badgeColor: 'border-white/20 text-white',
    buttonStyle: 'bg-white text-gray-900',
    priceColor: 'text-white',
    id: 'course-3',
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
    index === 0 ? ['0%', '0%'] : ['115%', '0%']
  )

  // When the NEXT card comes in, this one scales back
  const nextStart = (index + 1) * sliceSize - 0.02
  const nextEnd = (index + 1) * sliceSize + sliceSize * 0.3

  const scale = useTransform(
    scrollYProgress,
    index < total - 1 ? [nextStart, nextEnd] : [0, 1],
    index < total - 1 ? [1, 0.92] : [1, 1]
  )

  const opacity = useTransform(
    scrollYProgress,
    index < total - 1 ? [nextStart, nextEnd] : [0, 1],
    index < total - 1 ? [1, 0.45] : [1, 1]
  )

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: index + 1,
        transformOrigin: 'top center',
        backgroundColor: proj.bgColor,
        position: 'absolute',
        inset: 0,
      }}
      className="rounded-[2rem] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row border border-black/5 group"
    >
      {/* Image side */}
      <div className="w-full md:w-[42%] relative min-h-[180px] md:min-h-full overflow-hidden flex-shrink-0">
        <img
          src={proj.img}
          alt={proj.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />
        <div className="absolute top-5 left-5">
          <span
            className={`text-[9px] font-black tracking-[0.25em] px-3 py-1.5 rounded-full border backdrop-blur-sm bg-white/10 ${proj.badgeColor}`}
          >
            {proj.badge}
          </span>
        </div>
      </div>

      {/* Content side */}
      <div className={`w-full md:w-[58%] p-6 md:p-10 flex flex-col justify-center ${proj.textColor}`}>
        <h3 className="text-xl md:text-[1.75rem] font-bold mb-2 leading-tight tracking-tight">
          {proj.title}
        </h3>
        <p className={`text-sm md:text-base mb-4 leading-relaxed ${proj.descColor}`}>
          {proj.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {[
            {
              icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
              label: `${proj.hours} Hours`,
            },
            {
              icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
              label: proj.certified,
            },
            {
              icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
              label: 'Mentor Support',
            },
          ].map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-2 bg-black/5 rounded-xl px-3 py-2 backdrop-blur-sm"
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
              <span className="text-xs font-bold tracking-tight">{b.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-[10px] font-black tracking-widest uppercase opacity-40">
              Price
            </span>
            <span className={`text-2xl md:text-3xl font-black ${proj.priceColor}`}>
              {proj.price}
            </span>
            <span className="text-sm line-through opacity-25 font-medium">{proj.oldPrice}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`${proj.buttonStyle} px-6 py-3 rounded-2xl font-black text-sm tracking-tight shadow-lg hover:shadow-2xl transition-all flex items-center gap-2`}
          >
            Check Project <span className="text-lg">→</span>
          </motion.button>
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
      className="relative w-full"
    >
      {/* ── Sticky panel: fills viewport, never scrolls internally ── */}
      <div
        className="sticky top-0 flex flex-col"
        style={{
          height: '100vh',
          background: '#fdf6f0',
          borderRadius: '2.5rem 2.5rem 0 0',
          overflow: 'hidden',    // clips card edges only — NOT a scroll container
        }}
      >
        {/* Header */}
        <div className="flex-shrink-0 max-w-7xl mx-auto w-full text-center pt-8 pb-4 px-4 md:px-8">
          <div className="inline-block px-4 py-1.5 border border-orange-200 text-[#e45927] text-[10px] font-bold tracking-[0.2em] rounded-md mb-3 bg-white/50 backdrop-blur-sm">
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
        <div className="flex-1 relative px-4 md:px-10 pb-8 min-h-0">
          <div className="h-full flex items-center justify-center">
            <div
              className="relative w-full max-w-5xl mx-auto"
              style={{ height: 'min(420px, 60vh)' }}
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