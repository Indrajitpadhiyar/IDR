import React, { useState } from 'react';
import { motion } from 'framer-motion';

const owners = [
    {
        id: 1,
        name: 'Indrajit Padhiyar',
        role: 'Fullstack Developer',
        image: '/indrajit.png',
        link: 'https://myportfolio-78uy.onrender.com/',
        bio: 'Expertise in building end-to-end digital solutions with a focus on scalable architectures.'
    },
    {
        id: 2,
        name: 'Drumil Thakor',
        role: 'Frontend Developer',
        image: '/drumil.jpeg',
        link: 'https://drumilthakor33.github.io/Portfolio/',
        bio: 'Crafting stunning, responsive, and performance-optimized user interfaces with modern tech.'
    },
    {
        id: 3,
        name: 'Rohit Patil',
        role: 'Designer',
        image: '/Rohit.jpeg',
        link: 'https://roohitportfolio.onrender.com/',
        bio: 'Conceptualizing and designing intuitive, brand-focused experiences that captivate and convert.'
    },
];

const TeamOwners = () => {
    return (
        <div className="bg-gray-50 py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-orange-500 text-sm uppercase tracking-[0.4em] font-bold mb-4"
                    >
                        Meet Our Leadership
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-gray-900"
                    >
                        The Minds Behind <span className="text-blue-600">IDR Tech</span>
                    </motion.h2>
                </div>

                {/* Team grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {owners.map((owner, i) => (
                        <motion.div
                            key={owner.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 50,
                                damping: 15,
                                delay: i * 0.15
                            }}
                            className="group relative flex flex-col bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500 overflow-hidden"
                        >
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[5rem] translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 opacity-50" />

                            <div className="relative z-10 flex flex-col items-center">
                                {/* Photo Container */}
                                <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-orange-500/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-lg">
                                        <img
                                            src={owner.image}
                                            alt={owner.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Small floating badge - Redirection link icon */}
                                    <motion.a 
                                        href={owner.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, rotate: 15 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="absolute -bottom-2 -right-2 bg-white p-3 rounded-full shadow-lg border border-gray-100 z-20 cursor-pointer text-blue-600 hover:text-orange-500 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                        </svg>
                                    </motion.a>
                                </div>

                                {/* Text Content */}
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                        {owner.name}
                                    </h3>
                                    <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-4">
                                        {owner.role}
                                    </p>
                                    <p className="text-gray-500 text-sm leading-relaxed max-w-[200px] mx-auto">
                                        {owner.bio}
                                    </p>
                                </div>
                            </div>

                            {/* Hover accent bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamOwners;