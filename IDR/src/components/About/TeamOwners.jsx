import React from 'react';
import { motion } from 'framer-motion';

const owners = [
    {
        id: 1,
        name: 'Indrajit Padhiyar',
        role: 'Founder & CEO',
        image: '/indrajit.png',
    },
    {
        id: 2,
        name: 'Drumil Thakor',
        role: 'Co-Founder & CTO',
        image: '/drumil.jpeg',
    },
    {
        id: 3,
        name: 'Rohit Patil',
        role: 'Co-Founder & COO',
        image: '/Rohit.jpeg',
    },
];

const TeamOwners = () => {
    return (
        <section id="team" className="py-24 bg-[#08080f]">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-violet-400 text-xs uppercase tracking-[0.4em] font-bold mb-4"
                    >
                        Meet Our Leadership
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black text-white"
                    >
                        The Minds Behind <span className="text-transparent bg-clip-text  from-violet-400 to-pink-500">IDR Tech</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {owners.map((owner, i) => (
                        <motion.div
                            key={owner.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="group relative flex flex-col items-center"
                        >
                            <div className="relative w-64 h-64 md:w-72 md:h-72 mb-6">
                                {/* Glow Ring */}
                                <div className="absolute inset-0 rounded-full  from-violet-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                                {/* Image Container */}
                                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 group-hover:border-violet-500/50 transition-colors duration-500 shadow-2xl">
                                    <motion.img
                                        src={owner.image}
                                        alt={owner.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 group-hover:scale-100"
                                    />
                                </div>

                                {/* Name Reveal Overlay */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full"
                                >
                                    <h3 className="text-xl font-bold text-white mb-1">{owner.name}</h3>
                                    <p className="text-violet-300 text-sm font-semibold">{owner.role}</p>
                                </motion.div>
                            </div>

                            {/* Bottom text for accessibility/design */}
                            <div className="text-center duration-500">
                                <h3 className="text-lg font-bold text-white/80">{owner.name}</h3>
                                <p className="text-gray-500 text-sm">{owner.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamOwners;
