import { ArrowRight, Globe2, Layers3, PenTool, Rocket, ShieldCheck, Workflow } from 'lucide-react';
import { motion } from 'motion/react';

const servicePillars = [
  {
    title: 'Web development',
    description: 'We build modern, responsive, and business-focused websites that look clean and work smoothly on every device.',
    icon: Globe2,
    bullets: ['Company websites', 'Landing pages', 'Responsive frontend systems'],
  },
  {
    title: 'UI/UX design',
    description: 'We design seamless user experiences with better structure, clear hierarchy, and stronger visual flow.',
    icon: PenTool,
    bullets: ['Clean layouts', 'Better usability', 'Brand-focused interfaces'],
  },
  {
    title: 'Web services and solutions',
    description: 'From scalable web services to digital workflows, we help businesses move faster with the right technical support.',
    icon: Layers3,
    bullets: ['Web services', 'Digital solutions', 'Launch-ready delivery'],
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Understand the goal',
    description: 'We start by understanding your business, brand, users, and what the website needs to achieve.',
    icon: Globe2,
  },
  {
    step: '02',
    title: 'Design the experience',
    description: 'Layout, content flow, and interaction details are planned so the site feels clear and engaging.',
    icon: Workflow,
  },
  {
    step: '03',
    title: 'Build and launch',
    description: 'We develop, refine, and ship the final product with responsive behavior and a smoother user experience.',
    icon: Rocket,
  },
];

const proofItems = [
  'Initiate, Digital, Revolution',
  'Design and development in one team',
  'Fast communication and clean execution',
];

const WhatWeAreAbout = () => {
  return (
    <section id="about" className="section-shell px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="section-eyebrow">

            What we do
          </span>
          <h2 className="section-title mt-6 text-[#12306d]">
            IDR Tech helps businesses with websites, UI/UX design, web services, and digital solutions.
          </h2>
          <p className="section-copy mx-auto mt-6">
            We focus on creating digital experiences that look professional, feel smooth, and support the growth of your business online.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {servicePillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -8 }}
                className="glass-panel rounded-[34px] p-4"
              >
                <div className="h-full rounded-[28px] border border-white/75 bg-white/92 p-7 shadow-[0_18px_44px_rgba(11,99,246,0.08)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b63f6]/10 text-[#0b63f6] shadow-[0_16px_36px_rgba(11,99,246,0.12)]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold text-[#12306d]">{pillar.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#5e78ad]">{pillar.description}</p>

                  <div className="mt-6 space-y-3">
                    {pillar.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="flex items-start gap-3 rounded-2xl border border-[#0b63f6]/10 bg-[#eef4ff] px-4 py-3"
                      >
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8f32]" />
                        <p className="text-sm font-medium text-[#35538e]">{bullet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="glass-panel rounded-[36px] p-4"
          >
            <div className="h-full rounded-[30px] bg-[linear-gradient(135deg,#0b63f6 0%,#2c72f3 55%,#ff8f32 100%)] p-8 text-black shadow-[0_26px_60px_rgba(11,99,246,0.18)] sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/75">Why IDR Tech</p>
              <h3 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
                We combine design thinking, development, and smooth execution in one workflow.
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-8 text-black/84">
                That means your project stays visually strong, technically clean, and easier to launch without moving between different teams.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {proofItems.map((item) => (
                  <div key={item} className="rounded-[24px] border border-white/30 bg-white/12 px-4 py-4 backdrop-blur-md">
                    <p className="text-sm font-semibold leading-7 text-black">{item}</p>
                  </div>
                ))}
              </div>

              <a href="#contact" data-scroll-to data-scroll-to-offset="-110" className="brand-btn-secondary mt-8 !text-[#12306d]">
                Talk about your project
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {workflowSteps.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                  className="glass-panel rounded-[30px] p-4"
                >
                  <div className="flex h-full gap-4 rounded-[24px] border border-white/75 bg-white/92 p-6 shadow-[0_16px_40px_rgba(11,99,246,0.08)]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0b63f6]/10 text-[#0b63f6]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5e78ad]">{item.step}</p>
                      <h4 className="mt-2 text-xl font-semibold text-[#12306d]">{item.title}</h4>
                      <p className="mt-3 text-sm leading-7 text-[#5e78ad]">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeAreAbout;
