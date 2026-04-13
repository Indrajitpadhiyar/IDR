import { motion } from 'motion/react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

const LegalLayout = ({ title, effectiveDate, children }) => {
  return (
    <div className="min-h-screen bg-[#f9fbff] text-[#12306d]">
      <Navbar />
      
      <main className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-panel overflow-hidden rounded-[40px] p-8 sm:p-12"
          >
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-[#12306d] sm:text-5xl">{title}</h1>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#0b63f6]/20"></span>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#5e78ad]">
                  Effective Date: <span className="text-[#0b63f6]">{effectiveDate}</span>
                </p>
              </div>
            </div>

            <div className="prose prose-blue max-w-none text-[#5e78ad]">
              {children}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalLayout;
