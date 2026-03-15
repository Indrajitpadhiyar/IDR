import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: 'Bagify E-Commerce',
        category: 'Web Development',
        description: 'Premium shopping experience with seamless checkout and inventory management.',
        image: '/bagify.png',
        link: 'https://bagify-z9wj.onrender.com/',
        color: 'blue'
    },
    {
        id: 2,
        title: 'Prime Energy',
        category: 'Landing Page',
        description: 'High-octane landing page for a leading beverage brand with 3D product showcase.',
        image: '/project2.png',
        link: 'https://prime-r05t.onrender.com',
        color: 'orange'
    },
    {
        id: 3,
        title: 'SaaS Dashboard',
        category: 'UI/UX Design',
        description: 'Modern enterprise analytics platform with advanced data visualization and insights.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        link: '#',
        color: 'orange'
    },
    {
        id: 4,
        title: 'CloudNexus',
        category: 'Infrastructure',
        description: 'Scalable cloud architecture and automated deployment pipelines for large-scale apps.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
        link: '#',
        color: 'orange'
    }
];

// Double the projects array for seamless infinite scroll
const scrollItems = [...projects, ...projects];

const Card = ({ item, isHovered, anyHovered, onHover, onLeave }) => {
    return (
        <motion.div
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className={`relative flex-shrink-0 w-[350px] md:w-[450px] h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 transition-all duration-500 cursor-pointer
                ${anyHovered && !isHovered ? 'blur-sm scale-95 opacity-50 grayscale' : 'scale-100 opacity-100 grayscale-0 shadow-xl'}
                ${isHovered ? 'border-blue-200' : ''}
            `}
            onClick={() => {
                if (item.link && item.link !== '#') {
                    window.open(item.link, '_blank', 'noopener,noreferrer');
                }
            }}
        >
            {/* Image Section */}
            <div className="h-2/3 relative overflow-hidden">
                <img 
                    src={item.image} 
                    alt={item.title} 
                    className={`w-full h-full object-cover transition-transform duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                {/* Category Badge */}
                <div className={`absolute top-6 left-6 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg
                    ${item.color === 'blue' ? 'bg-blue-600' : 'bg-orange-500'}
                `}>
                    {item.category}
                </div>
            </div>

            {/* Content Section */}
            <div className="h-1/3 p-8 flex flex-col justify-between bg-white relative z-10">
                <div>
                    <h3 className={`text-2xl font-bold text-gray-900 mb-3 transition-colors ${isHovered ? 'text-blue-600' : ''}`}>
                        {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {item.description}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div 
                        className={`inline-flex items-center gap-2 text-sm font-bold transition-all
                            ${item.color === 'blue' ? 'text-blue-600' : 'text-orange-500'}
                            ${isHovered ? 'translate-x-2' : ''}
                        `}
                    >
                        View Case Study 
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 transition-transform duration-500 origin-left
                ${item.color === 'blue' ? 'bg-blue-600' : 'bg-orange-500'}
                ${isHovered ? 'scale-x-100' : 'scale-x-0'}
            `} />
        </motion.div>
    );
};

const WorkShow = () => {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <section id="our-work" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <span className="text-blue-600 text-sm font-bold uppercase tracking-[0.4em] mb-4 block">Our Portfolio</span>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                        Crafting Digital <span className="text-orange-500">Excellence</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Explore our latest projects where innovation meets execution. Hover over a card to dive deeper.
                    </p>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="relative flex overflow-hidden group/marquee">
                <style>
                    {`
                        @keyframes marquee {
                            from { transform: translateX(0); }
                            to { transform: translateX(-50%); }
                        }
                        .animate-marquee {
                            animation: marquee 40s linear infinite;
                        }
                    `}
                </style>
                <div
                    className={`flex space-x-8 px-4 animate-marquee ${hoveredId ? '[animation-play-state:paused]' : ''}`}
                >
                    {scrollItems.map((item, index) => (
                        <Card 
                            key={`${item.id}-${index}`} 
                            item={item} 
                            isHovered={hoveredId === `${item.id}-${index}`}
                            anyHovered={hoveredId !== null}
                            onHover={() => setHoveredId(`${item.id}-${index}`)}
                            onLeave={() => setHoveredId(null)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkShow; 