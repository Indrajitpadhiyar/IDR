import { ArrowRight, Cloud, Code2, Database, GitBranch, PenTool, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

const stackGroups = [
  {
    title: 'Frontend systems',
    description: 'Fast interfaces built with modern React structure, smooth animation support, and responsive Tailwind composition.',
    icon: Code2,
    tools: ['React 19', 'Tailwind CSS 4', 'Motion', 'Locomotive Scroll', 'Vite'],
  },
  {
    title: 'Design and UX',
    description: 'A process focused on visual clarity, content hierarchy, and clean user flow from the first section to the last.',
    icon: PenTool,
    tools: ['Figma', 'Design systems', 'Motion studies', 'Content rhythm', 'UI direction'],
  },
  {
    title: 'Backend and launch',
    description: 'Delivery stays practical with clear handoff, API-ready structure, and deployment-friendly code.',
    icon: Database,
    tools: ['Node.js', 'Express', 'MongoDB', 'Deployments', 'Integrations'],
  },
];

const workflowPillars = [
  { label: 'Version control', icon: GitBranch },
  { label: 'Design to code', icon: Code2 },
  { label: 'Launch support', icon: Cloud },
];

const launchChecklist = [
  'Responsive across desktop and mobile',
  'Clean section hierarchy for storytelling',
  'Smooth interactions that do not feel heavy',
  'Code structure ready for future edits and expansion',
];

const TechStack = () => {
  return (
    <section id="tech-stack" className="section-shell px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="section-eyebrow">

            Our stack
          </span>
          <h2 className="section-title mt-6 text-[#12306d]">
            We use modern tools to build websites that feel smooth, responsive, and ready to grow.
          </h2>
          <p className="section-copy mx-auto mt-6">
            Our stack is selected to keep the visual side clean and the development side fast enough for real project timelines.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.96fr]">
          <div className="grid gap-6">
            {stackGroups.map((group, index) => {
              const Icon = group.icon;

              return (
                <motion.article
                  key={group.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                  whileHover={{ y: -6 }}
                  className="glass-panel rounded-[34px] p-4"
                >
                  <div className="rounded-[28px] border border-white/75 bg-white/92 p-7 shadow-[0_18px_44px_rgba(11,99,246,0.08)]">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b63f6]/10 text-[#0b63f6] shadow-[0_16px_36px_rgba(11,99,246,0.12)]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="mt-6 text-2xl font-semibold text-[#12306d]">{group.title}</h3>
                      </div>
                      <span className="rounded-full border border-[#0b63f6]/16 bg-[#0b63f6]/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0b63f6]">
                        Core layer
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-[#5e78ad]">{group.description}</p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {group.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-[#0b63f6]/12 bg-[#eef4ff] px-4 py-2 text-sm font-semibold text-[#35538e]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="glass-panel rounded-[36px] p-4"
          >
            <div className="h-full rounded-[30px] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(238,244,255,0.95),rgba(255,244,234,0.92))] p-8 shadow-[0_22px_56px_rgba(11,99,246,0.08)] sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0b63f6]">Launch process</p>
              <h3 className="mt-5 text-3xl font-semibold leading-tight text-[#12306d]">
                Good design works better when the structure behind it is reliable.
              </h3>
              <p className="mt-5 text-sm leading-7 text-[#5e78ad]">
                We keep the visual layer clean while making sure the project stays easy to build, revise, and improve after launch.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {workflowPillars.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-[24px] border border-white/80 bg-white/88 p-5 text-center shadow-[0_16px_36px_rgba(11,99,246,0.06)]"
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b63f6]/10 text-[#0b63f6]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-[#12306d]">{item.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 space-y-3">
                {launchChecklist.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[24px] border border-[#0b63f6]/10 bg-white/88 px-4 py-4">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8f32]" />
                    <p className="text-sm font-medium leading-7 text-[#35538e]">{item}</p>
                  </div>
                ))}
              </div>

              <a href="#contact" data-scroll-to data-scroll-to-offset="-110" className="brand-btn-primary mt-8">
                Build with IDR Tech
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
