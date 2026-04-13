import { ArrowRight, Gem, Sparkles, Users } from 'lucide-react';
import { motion } from 'motion/react';
import TeamOwners from '../About/TeamOwners';
import Contact from '../Contact/Contact';
import Navbar from '../layouts/Navbar';
import WhatWeAreAbout from '../About/WhatWeAreAbout';
import Footer from '../layouts/Footer';

const focusPoints = [
  {
    title: 'Brand-first execution',
    description: 'Every project starts with understanding the company, the audience, and the message the website needs to carry.',
    icon: Gem,
  },
  {
    title: 'Small team, direct work',
    description: 'You work closely with the people handling strategy, design, and development from start to finish.',
    icon: Users,
  },
];

const About = () => {
  return (
    <div className="min-h-screen overflow-x-hidden text-[#12306d]">
      <Navbar />

      <section className="section-shell overflow-hidden px-4 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className="section-eyebrow">
                <Sparkles className="h-4 w-4" />
                About IDR Tech
              </span>
              <h1 className="section-title mt-6 max-w-3xl text-[#12306d]">
                A focused studio creating websites, interfaces, and digital systems for growing brands.
              </h1>
              <p className="section-copy mt-6">
                IDR Tech blends interface design, product thinking, and full-stack delivery so businesses can launch faster and look better online.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="/#contact" className="brand-btn-primary">
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/#our-work" className="brand-btn-secondary">
                  See our work
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
              className="glass-panel rounded-[36px] p-4 sm:p-5"
            >
              <div className="rounded-[30px] bg-[linear-gradient(135deg,rgba(11,99,246,0.15),rgba(255,143,50,0.12),rgba(255,255,255,0.95))] p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  {focusPoints.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.18 + index * 0.1 }}
                        className="rounded-[28px] border border-white/70 bg-white/88 p-6 shadow-[0_16px_40px_rgba(11,99,246,0.08)]"
                      >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b63f6]/10 text-[#0b63f6]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-[#12306d]">{item.title}</h2>
                        <p className="mt-3 text-sm leading-7 text-[#5e78ad]">{item.description}</p>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-[28px] bg-[linear-gradient(135deg,#0b63f6 0%,#2c72f3 45%,#ff8f32 100%)] px-6 py-5 text-white shadow-[0_20px_45px_rgba(11,99,246,0.16)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/72">Studio promise</p>
                  <p className="mt-3 max-w-xl text-base leading-7 text-white/90">
                    Fast communication, thoughtful design, clean development, and launch-ready delivery from one connected team.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <WhatWeAreAbout />
      <TeamOwners />
      <Contact />
      <Footer />
    </div>
  );
};

export default About;
