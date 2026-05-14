import { ArrowLeft, ExternalLink, Plus, ArrowRight } from 'lucide-react';
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

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative flex flex-col sm:flex-row overflow-hidden rounded-xl bg-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-56 w-full sm:h-auto sm:w-2/5 overflow-hidden rounded-lg flex-shrink-0">
                  <div className={`absolute inset-0 ${project.color} mix-blend-multiply opacity-10 transition-opacity duration-500 group-hover:opacity-20`} />
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Top Overlay Elements */}
                  <div className="absolute left-3 top-3 z-10">
                    <span className="inline-flex items-center rounded-md bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-900 shadow-sm backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex flex-1 flex-col justify-center px-5 py-6 sm:px-6 sm:py-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#0b63f6]">
                      {project.title}
                    </h3>
                    <a
                      href={project.link}
                      target={project.link.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 group-hover:bg-[#0b63f6] group-hover:text-white"
                    >
                      {project.link.startsWith('http') ? <ArrowRight className="h-4 w-4 -rotate-45" /> : <Plus className="h-4 w-4" />}
                    </a>
                  </div>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-gray-500 line-clamp-3">
                    {project.description}
                  </p>
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
