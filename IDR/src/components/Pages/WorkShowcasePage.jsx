import { ArrowLeft, ExternalLink, Sparkles, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

const WorkShowcasePage = () => {
  return (
    <div className="min-h-screen bg-[#f8fbff]">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0b63f6] hover:gap-3 transition-all mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              BACK TO HOME
            </Link>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <span className="section-eyebrow">
                  <Sparkles className="h-4 w-4" />
                  Full Portfolio
                </span>
                <h1 className="section-title mt-6 text-[#12306d]">
                  Every creation, <br />
                  <span className="text-[#0b63f6]">built with passion.</span>
                </h1>
              </div>
              <p className="section-copy lg:max-w-md">
                Explore our complete gallery of digital solutions. From minimalist designs to complex systems, we bring every vision to life with precision.
              </p>
            </div>
          </motion.div>

          {/* Masonry Grid */}
          <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {projects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <div className="group relative overflow-hidden rounded-[32px] border border-white/40 bg-white/50 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                  <div className={`relative w-full ${project.height} overflow-hidden`}>
                    <div className={`absolute inset-0 ${project.color} opacity-20`} />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Interaction Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <a
                        href={project.link}
                        target={project.link.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110"
                      >
                        {project.link.startsWith('http') ? <ExternalLink className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
                      </a>
                    </div>

                    <div className="absolute left-6 top-6">
                      <span className="rounded-full bg-white/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md border border-white/10">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 bg-white/80 backdrop-blur-md">
                    <h3 className="text-xl font-semibold text-[#12306d]">{project.title}</h3>
                    <p className="mt-2 text-sm text-[#5e78ad] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WorkShowcasePage;
