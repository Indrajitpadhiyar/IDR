import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const contexts = [
    {
        id: 1,
        tag: 'Who We Are',
        headline: 'IDR Tech — Built to Innovate',
        body: 'We are IDR Tech, a forward-thinking technology company on a mission to reshape how businesses experience the digital world. From startups to enterprises, we craft solutions that move at the speed of ideas.',
        accent: 'from-violet-500 to-blue-500',
        glow: 'rgba(139,92,246,0.25)',
        icon: '✦',
    },
    {
        id: 2,
        tag: 'Web Development',
        headline: 'Websites That Speak for Your Brand',
        body: 'We design and develop stunning, high-performance websites that captivate your audience and convert visitors into customers. Pixel-perfect UI, blazing-fast load times, and cross-device experiences — we deliver all three.',
        accent: 'from-blue-500 to-cyan-400',
        glow: 'rgba(59,130,246,0.25)',
        icon: '◈',
    },
    {
        id: 3,
        tag: 'Web Services',
        headline: 'Scalable Web Services & APIs',
        body: 'Our robust backend web services and API solutions power apps that scale effortlessly. From RESTful APIs to real-time data pipelines, we architect systems engineered for reliability, security, and peak performance.',
        accent: 'from-cyan-400 to-teal-500',
        glow: 'rgba(6,182,212,0.25)',
        icon: '⬡',
    },
    {
        id: 4,
        tag: 'Digital Solutions',
        headline: 'End-to-End Digital Solutions',
        body: "Beyond development, we deliver complete digital transformation. Whether it's CRM integrations, cloud migrations, SaaS platforms, or automation workflows — IDR Tech is your one-stop partner for every digital challenge.",
        accent: 'from-pink-500 to-rose-500',
        glow: 'rgba(236,72,153,0.25)',
        icon: '⬢',
    },
    {
        id: 5,
        tag: 'Why IDR',
        headline: 'Innovation. Dedication. Results.',
        body: "IDR is more than a name — it's our promise. Innovation that pushes boundaries, Dedication that fuels every project, and Results that speak for themselves. Partner with us and experience technology that transforms.",
        accent: 'from-orange-500 to-yellow-400',
        glow: 'rgba(249,115,22,0.25)',
        icon: '★',
    },
];

const WhatWeAreAbout = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Slide left and right
    const xLeft = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const xRight = useTransform(scrollYProgress, [0, 1], [-150, 150]);

    return (
        <section id="about" ref={containerRef} className="py-20 overflow-hidden bg-[#08080f]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16 px-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-white/30 text-xs uppercase tracking-[0.35em] mb-3"
                    >
                        Our Story
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white"
                    >
                        What <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">IDR Tech</span> Is All About
                    </motion.h2>
                </div>

                <div className="flex flex-col gap-12 md:gap-20">
                    {contexts.map((ctx, i) => (
                        <motion.div
                            key={ctx.id}
                            style={{ x: i % 2 === 0 ? xLeft : xRight }}
                            className="relative w-full max-w-3xl mx-auto group"
                        >
                            {/* Glow blob */}
                            <div
                                className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
                                style={{ background: ctx.glow }}
                            />

                            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-1">
                                {/* Corner accent */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${ctx.accent} opacity-10 rounded-bl-[80px]`} />

                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-gradient-to-r ${ctx.accent} text-white shadow-lg mb-6`}
                                >
                                    <span className="text-sm">{ctx.icon}</span>
                                    {ctx.tag}
                                </motion.span>

                                <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight">{ctx.headline}</h3>
                                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">{ctx.body}</p>

                                <div className="absolute bottom-4 right-8 text-7xl font-black text-white/5 select-none">
                                    {String(ctx.id).padStart(2, '0')}
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
