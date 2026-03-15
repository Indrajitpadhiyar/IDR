import React from 'react';
import { motion } from 'framer-motion';

const contexts = [
    {
        id: 1,
        tag: 'Who We Are',
        headline: 'IDR Tech — Built to Innovate',
        body: 'We are IDR Tech, a forward-thinking technology company on a mission to reshape how businesses experience the digital world. From startups to enterprises, we craft solutions that move at the speed of ideas.',
        accent: 'from-blue-600 to-blue-400',
        glow: 'rgba(37, 99, 235, 0.1)',
        icon: '✦',
    },
    {
        id: 2,
        tag: 'Web Development',
        headline: 'Websites That Speak for Your Brand',
        body: 'We design and develop stunning, high-performance websites that captivate your audience and convert visitors into customers. Pixel-perfect UI, blazing-fast load times, and cross-device experiences — we deliver all three.',
        accent: 'from-orange-500 to-orange-400',
        glow: 'rgba(249, 115, 22, 0.1)',
        icon: '◈',
    },
    {
        id: 3,
        tag: 'Web Services',
        headline: 'Scalable Web Services & APIs',
        body: 'Our robust backend web services and API solutions power apps that scale effortlessly. From RESTful APIs to real-time data pipelines, we architect systems engineered for reliability, security, and peak performance.',
        accent: 'from-blue-500 to-cyan-400',
        glow: 'rgba(59, 130, 246, 0.1)',
        icon: '⬡',
    },
    {
        id: 4,
        tag: 'Digital Solutions',
        headline: 'End-to-End Digital Solutions',
        body: "Beyond development, we deliver complete digital transformation. Whether it's CRM integrations, cloud migrations, SaaS platforms, or automation workflows — IDR Tech is your one-stop partner for every digital challenge.",
        accent: 'from-orange-600 to-red-500',
        glow: 'rgba(234, 88, 12, 0.1)',
        icon: '⬢',
    },
    {
        id: 5,
        tag: 'Why IDR',
        headline: 'Initiate, Digital, and Revolution.',
        body: "IDR is more than a name — it's our promise. Innovation that pushes boundaries, Digital excellence in every line of code, and Revolutionizing the way you do business.",
        accent: 'from-blue-700 to-blue-500',
        glow: 'rgba(29, 78, 216, 0.1)',
        icon: '★',
    },
];

const WhatWeAreAbout = () => {
    return (
        <section id="about" className="py-24 overflow-hidden bg-white scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-blue-600 text-sm font-bold uppercase tracking-[0.3em] mb-4"
                    >
                        Our Story
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-gray-900"
                    >
                        What <span className="text-orange-500">IDR Tech</span> Is All About
                    </motion.h2>
                </div>

                <div className="space-y-12 md:space-y-24">
                    {contexts.map((ctx, i) => (
                        <motion.div
                            key={ctx.id}
                            initial={{
                                opacity: 0,
                                x: i % 2 === 0 ? -100 : 100
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0
                            }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                type: "spring",
                                stiffness: 50,
                                damping: 20,
                                delay: 0.1
                            }}
                            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-20`}
                        >
                            <div className="w-full md:w-1/2">
                                <div className="relative group p-1">
                                    {/* Decorator */}
                                    <div
                                        className={`absolute -inset-2 rounded-[2rem] opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-2xl`}
                                        style={{ background: ctx.glow }}
                                    />

                                    <div className="relative bg-gray-50 border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500">
                                        <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-gradient-to-r ${ctx.accent} text-white mb-8 shadow-md`}>
                                            <span>{ctx.icon}</span>
                                            {ctx.tag}
                                        </div>

                                        <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                            {ctx.headline}
                                        </h3>
                                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                                            {ctx.body}
                                        </p>

                                        <div className="absolute bottom-6 right-10 text-6xl md:text-7xl font-black text-gray-200/40 select-none pointer-events-none">
                                            {String(ctx.id).padStart(2, '0')}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:block w-full md:w-1/2">
                                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${ctx.accent} opacity-10 animate-pulse`} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-8xl">{ctx.icon}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatWeAreAbout;