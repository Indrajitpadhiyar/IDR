import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatWeAreAbout from '../About/WhatWeAreAbout';
import TeamOwners from '../About/TeamOwners';
import WorkShow from '../Pages/WorkShow';
import TechStack from '../Pages/TechStack';
import Contact from '../Contact/Contact';

const visionImages = [
  {
    url: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=1200",
    title: "Modern UI/UX"
  },
  {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
    title: "Web Development"
  },
  {
    url: "https://imgs.search.brave.com/m-vDw00jTe-p_Njbdl9_i_Rz6O835ssm6P7d-92xyYU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjcv/MTc4LzQ1NC9zbWFs/bC9oYW5kcy1vbi11/eC11aS1kZXNpZ24t/d29ya3Nob3AtcGFy/dGljaXBhbnRzLWVu/Z2FnaW5nLXdpdGgt/ZGVzaWduLWVsZW1l/bnRzLXBob3RvLmpw/Zw",
    title: "Creative Design"
  },
  {
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    title: "Digital Revolution"
  },
  {
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
    title: "IT Solutions"
  }
];

const Main = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [visionIndex, setVisionIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const interval = setInterval(() => {
      setVisionIndex((prev) => (prev + 1) % visionImages.length);
    }, 10000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-white">
      <section
        id="home"
        className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 pt-28 pb-10 overflow-hidden"
      >
        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="flex flex-col items-start text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.1]"
            >
              Building the <span className="text-blue-600">future</span> with <span className="text-orange-500">IDR Tech</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-gray-500 mb-8 max-w-xl leading-relaxed"
            >
              Initiate, Digital, and Revolution. We specialize in crafting state-of-the-art web applications, seamless designs, and digital solutions tailored to scale your business.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
              >
                Let's work together
              </a>
              <a
                href="#our-work"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-50 transition-colors border border-gray-200"
              >
                View our work
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full relative hidden lg:block lg:ml-12"
          >
            <div className="aspect-[4/3] relative flex items-center justify-center">
              <div className="absolute inset-x-[-20%] inset-y-[-10%] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
              <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

              <div className="relative z-10 w-full h-full bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 border border-gray-100 overflow-hidden flex flex-col group">
                <div className="h-12 bg-gray-50 border-b border-gray-100 flex items-center px-6 gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-400"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-orange-400"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-green-400"></div>
                  <div className="ml-4 bg-white px-4 py-1 rounded-md border border-gray-200 text-[10px] text-gray-400 font-medium tracking-wide">
                    IDR TECH — OUR VISION
                  </div>
                </div>

                <div className="flex-1 relative overflow-hidden bg-gray-50">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={visionIndex}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={visionImages[visionIndex].url}
                        alt={visionImages[visionIndex].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-10 left-10"
                      >
                        <h3 className="text-3xl font-bold text-white mb-2">{visionImages[visionIndex].title}</h3>
                        <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="relative bg-white border-t border-gray-100 py-20">
        <WhatWeAreAbout />
      </section>

      <section id="our-work" className="relative bg-white border-t border-gray-100 py-20">
        <WorkShow />
      </section>

      <section id="tech-stack" className="relative bg-white border-t border-gray-100 py-20">
        <TechStack />
      </section>

      <section id="team" className="relative bg-[#f8fafc] border-t border-gray-100 py-20">
        <TeamOwners />
      </section>

      <div className="relative bg-[#08080f]">
        <Contact />
      </div>
    </main>
  );
};

export default Main;