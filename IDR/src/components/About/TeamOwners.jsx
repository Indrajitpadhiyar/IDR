import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const owners = [
    {
        id: 1,
        name: 'Indrajit Padhiyar',
        role: 'Founder & CEO',
        image: '/indrajit.png',
        link: 'https://myportfolio-78uy.onrender.com/',
    },
    {
        id: 2,
        name: 'Drumil Thakor',
        role: 'Co-Founder & CTO',
        image: '/drumil.jpeg',
        link: 'https://www.linkedin.com/in/drumil-thakor-9b1a4b1a7/',
    },
    {
        id: 3,
        name: 'Rohit Patil',
        role: 'Co-Founder & COO',
        image: '/Rohit.jpeg',
        link: 'https://roohitportfolio.onrender.com/',
    },
];

/*
  NOTE: The outer <section id="team"> in Main.jsx is already
  sticky (position: sticky; top: 0; z-index: 10).
  This component is just the visual content — no sticky here.
*/
const TeamOwners = () => {
    const [activeId, setActiveId] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleActive = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <div className="min-h-[50vh] md:min-h-screen flex flex-col justify-start md:justify-center bg-[#08080f]">
            <div className="max-w-6xl mx-auto px-4 py-20">
                {/* Heading */}
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
                        The Minds Behind{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">
                            IDR Tech
                        </span>
                    </motion.h2>
                </div>

                {/* Team grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {owners.map((owner, i) => (
                        <motion.div
                            key={owner.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className={`group relative flex flex-col items-center cursor-pointer ${activeId === owner.id ? 'is-active' : ''
                                }`}
                            onClick={() => {
                                toggleActive(owner.id);
                                if (owner.link) {
                                    window.open(owner.link, '_blank', 'noopener,noreferrer');
                                }
                            }}
                        >
                            <div className="relative w-64 h-64 md:w-72 md:h-72 mb-6">
                                {/* Glow ring */}
                                <div
                                    className={`absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600 to-pink-600 ${isMobile ? 'blur-md' : 'blur-xl'} transition-opacity duration-500 ${activeId === owner.id
                                        ? 'opacity-100'
                                        : 'opacity-0 group-hover:opacity-100'
                                        }`}
                                    style={{ willChange: 'opacity' }}
                                />

                                {/* Photo */}
                                <div
                                    className={`relative w-full h-full rounded-full overflow-hidden border-4 transition-colors duration-500 shadow-2xl ${activeId === owner.id
                                        ? 'border-violet-500/50'
                                        : 'border-white/10 group-hover:border-violet-500/50'
                                        }`}
                                >
                                    <motion.img
                                        src={owner.image}
                                        alt={owner.name}
                                        className={`w-full h-full object-cover transition-all duration-700 ease-in-out scale-110 ${activeId === owner.id
                                            ? 'grayscale-0 scale-100'
                                            : 'grayscale group-hover:grayscale-0 group-hover:scale-100'
                                            }`}
                                    />
                                </div>

                                {/* Hover overlay */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={activeId === owner.id ? { opacity: 1, y: 0 } : {}}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    className={`absolute inset-0 flex flex-col items-center justify-center bg-black/40 transition-opacity duration-500 pointer-events-none rounded-full ${activeId === owner.id
                                        ? 'opacity-100'
                                        : 'opacity-0 group-hover:opacity-100'
                                        }`}
                                >
                                    <h3 className="text-xl font-bold text-white mb-1">{owner.name}</h3>
                                    <p className="text-violet-300 text-sm font-semibold">{owner.role}</p>
                                </motion.div>
                            </div>

                            {/* Name below photo */}
                            <div
                                className={`text-center duration-500 md:block ${activeId === owner.id ? 'hidden' : 'block'
                                    }`}
                            >
                                <h3
                                    className={`text-lg font-bold transition-colors duration-500 ${activeId === owner.id ? 'text-violet-400' : 'text-white/80'
                                        }`}
                                >
                                    {owner.name}
                                </h3>
                                <p className="text-gray-500 text-sm">{owner.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamOwners;