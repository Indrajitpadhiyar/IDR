import { ArrowRight, ExternalLink, Sparkles, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';

const WorkShow = () => {
  const mainProject = projects[0];
  const sideProjects = projects.slice(1, 4);

  return (
    <section id="our-work" className="section-shell px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 text-center lg:text-left"
        >
          <span className="section-eyebrow">
            <Sparkles className="h-4 w-4" />
            Our Best Work
          </span>
          <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="section-title text-[#12306d] lg:max-w-2xl">
              Showcasing 4 projects that define our excellence.
            </h2>
            <p className="section-copy lg:max-w-sm">
              We focus on building digital experiences that help businesses grow and stand out in the modern web.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Main Featured Project */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative flex h-full min-h-[400px] flex-col overflow-hidden rounded-xl bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-2 sm:min-h-[500px]"
          >
            <div className={`relative w-full h-full min-h-[300px] flex-1 overflow-hidden rounded-lg`}>
              <div className={`absolute inset-0 ${mainProject.color} mix-blend-multiply opacity-10 transition-opacity duration-500 group-hover:opacity-30`} />
              <img
                src={mainProject.image}
                alt={mainProject.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="w-fit rounded-full bg-white/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md border border-white/10 shadow-sm">
                  Featured {mainProject.category}
                </span>
                <h3 className="mt-4 text-4xl font-bold text-white">{mainProject.title}</h3>
                <p className="mt-3 max-w-md text-lg text-white/90">{mainProject.description}</p>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={mainProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-gray-900 shadow-xl transition-transform duration-300 hover:scale-105 hover:bg-gray-50"
                  >
                    View Case Study
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side Projects Grid */}
          <div className="grid gap-6">
            {sideProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-1 sm:flex-row"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-lg sm:h-auto sm:w-48 sm:min-h-[160px]">
                  <div className={`absolute inset-0 ${project.color} mix-blend-multiply opacity-10 transition-opacity duration-500 group-hover:opacity-20`} />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0b63f6]">
                      {project.category}
                    </span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                    >
                      <ArrowRight className="h-4 w-4 -rotate-45" />
                    </a>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#0b63f6]">{project.title}</h3>
                  <p className="mt-2 text-sm font-medium text-gray-500 line-clamp-2">{project.description}</p>
                </div>
              </motion.div>
            ))}

            {/* View More Placeholder */}
            <Link to="/projects" className="h-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex h-full min-h-[120px] items-center justify-center rounded-xl border-2 border-dashed border-[#0b63f6]/20 bg-transparent py-8 text-[#0b63f6] transition-all cursor-pointer hover:bg-[#0b63f6]/5 hover:border-[#0b63f6]/40"
              >
                <div className="flex items-center gap-3 font-bold">
                  <Plus className="h-5 w-5" />
                  <span>See more creations</span>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkShow;


