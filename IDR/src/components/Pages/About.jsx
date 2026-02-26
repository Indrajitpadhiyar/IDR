import React from 'react';
import Navbar from '../layouts/Navbar';
import WhatWeAreAbout from '../About/WhatWeAreAbout';
import TeamOwners from '../About/TeamOwners';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="w-full flex flex-col min-h-screen bg-[#08080f] text-white">
            <Navbar />

            {/* Small Hero section for About Page */}
            <section className="relative pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-violet-900/20 via-transparent to-transparent" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-4"
                >
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        About <span className="bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">IDR Tech</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        We are more than just a tech company. We are a team of dreamers and builders dedicated to digital excellence.
                    </p>
                </motion.div>
            </section>

            <main>
                <WhatWeAreAbout />
                <TeamOwners />
            </main>

            {/* Footer-like section or additional content */}
            <section className="py-20 text-center border-t border-white/5">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="px-4"
                >
                    <h2 className="text-2xl font-bold mb-4">Ready to start your journey?</h2>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 text-white font-bold hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300"
                    >
                        Get In Touch
                    </a>
                </motion.div>
            </section>
        </div>
    );
};

export default About;
