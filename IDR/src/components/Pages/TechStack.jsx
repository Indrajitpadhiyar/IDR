import React from 'react';
import { motion } from 'framer-motion';

const techStack = [
    {
        category: "Frontend",
        icon: "✨",
        description: "Crafting beautiful, responsive, and high-performance user interfaces.",
        tools: [
            { name: "React Js", logo: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" },
            { name: "Tailwind CSS", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
            { name: "Framer Motion", logo: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg" },
            { name: "Vite", logo: "https://imgs.search.brave.com/5GDGKJXEkAUCnFK3D3BAhMVF8ElHfyyAxBsa8HTc5Ms/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvMzVmYjVhZTdl/OThjMGQxNTFkZTBi/ZDcxYjY1OWEyMWQ5/NGY1NGJjODFiZmE2/ZmEwZjQzYmI3ZjI3/YmQzZDdjMi92aXRl/LmRldi8" }
        ],
        accent: "blue"
    },
    {
        category: "Backend",
        icon: "⚙️",
        description: "Building scalable, secure, and robust server-side architectures.",
        tools: [
            { name: "Node Js", logo: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" },
            { name: "Express Js", logo: "https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg" },
            { name: "Mongo DB", logo: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" },
            { name: "Render", logo: "https://imgs.search.brave.com/iUIiF_cAk0r_1kJIy86Pm60sPFTqbGRgFliHYBjXTUA/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvOTkyYjU4ODU5/NGVkMzFhYTA3Mzg3/N2UwZjZjNzQ3ZTc0/MjE2NmU3YjhlZWNi/MGFjNWRjYTJmNjA5/NjdhMzQ3Mi9yZW5k/ZXIuY29tLw" }
        ],
        accent: "orange"
    },
    {
        category: "Design & Tools",
        icon: "🎨",
        description: "Designing intuitive user experiences and efficient workflows.",
        tools: [
            { name: "Figma", logo: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg" },
            { name: "GitHub", logo: "https://www.vectorlogo.zone/logos/github/github-icon.svg" }
        ],
        accent: "blue"
    }
];

const TechStack = () => {
    return (
        <section id="tech-stack" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-40 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-40 translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-600 text-sm font-bold uppercase tracking-[0.4em] mb-4 block"
                    >
                        Our Arsenal
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-gray-900 mb-6"
                    >
                        Technologies We <span className="text-orange-500">Master</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 text-lg max-w-2xl mx-auto"
                    >
                        We use the latest industry-standard tools to deliver cutting-edge digital experiences.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {techStack.map((group, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-transform group-hover:scale-110
                                    ${group.accent === 'blue' ? 'bg-blue-600' : 'bg-orange-500'}
                                `}>
                                    {group.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{group.category}</h3>
                            </div>

                            <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                {group.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {group.tools.map((tool, tIdx) => (
                                    <div key={tIdx} className="flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-100 group/tool hover:shadow-md transition-all">
                                        <img
                                            src={tool.logo}
                                            alt={tool.name}
                                            className="w-10 h-10 object-contain mb-3 grayscale group-hover/tool:grayscale-0 transition-all duration-300"
                                        />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center group-hover/tool:text-gray-900 transition-colors">
                                            {tool.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
