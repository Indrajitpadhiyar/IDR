import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-[#08080f] relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16 px-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-white/30 text-xs uppercase tracking-[0.4em] font-bold mb-4"
                    >
                        Get In Touch
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white"
                    >
                        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">Collaborate?</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                Have a project in mind or just want to say hi? We'd love to hear from you. Drop us a message and we'll get back to you within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: '📧', label: 'Email Us', value: 'idrtech23@gmail.com' },
                                { icon: '📍', label: 'Our Office', value: '123 Tech Avenue, Digital City' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:border-violet-500/50 transition-colors duration-300 backdrop-blur-md">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">{item.label}</p>
                                        <p className="text-white font-semibold text-lg">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links Placeholder */}
                        <div className="pt-6">
                            <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-4">Follow Our Journey</p>
                            <div className="flex gap-4">
                                {['LinkedIn', 'Twitter', 'Instagram'].map(social => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 text-sm font-semibold hover:text-white hover:border-violet-500/50 transition-all duration-300"
                                    >
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-gray-400 text-xs uppercase tracking-widest font-bold block ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors duration-300"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-gray-400 text-xs uppercase tracking-widest font-bold block ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors duration-300"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-400 text-xs uppercase tracking-widest font-bold block ml-1">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Project Inquiry"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors duration-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-400 text-xs uppercase tracking-widest font-bold block ml-1">Message</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Tell us about your project..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors duration-300 resize-none"
                                    ></textarea>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-violet-600 via-blue-500 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-[0_8px_30px_rgba(139,92,246,0.3)] hover:shadow-[0_8px_40px_rgba(139,92,246,0.5)] transition-all duration-300 mt-4"
                                >
                                    Send Message →
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
