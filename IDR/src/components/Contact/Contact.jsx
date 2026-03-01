import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react'; // Using motion/react as per package.json

// Premium Toast Component
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto close after 3 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9, transition: { duration: 0.2 } }}
            className={`fixed top-8 right-8 z-[9999] px-6 py-4 rounded-2xl backdrop-blur-2xl border shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 min-w-[320px] max-w-[90vw] ${type === 'success'
                ? 'bg-violet-900/20 border-violet-500/30 text-violet-200'
                : 'bg-pink-900/20 border-pink-500/30 text-pink-200'
                }`}
        >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner ${type === 'success'
                ? 'bg-gradient-to-br from-violet-500 to-blue-500 text-white'
                : 'bg-gradient-to-br from-pink-500 to-orange-500 text-white'
                }`}>
                {type === 'success' ? '✓' : '!'}
            </div>
            <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-0.5">
                    {type === 'success' ? 'Success' : 'Notification'}
                </p>
                <p className="font-semibold text-sm leading-tight">{message}</p>
            </div>
            <button
                onClick={onClose}
                className="hover:rotate-90 transition-transform duration-300 p-1 opacity-50 hover:opacity-100"
            >
                ✕
            </button>

            {/* Animated Progress Bar */}
            <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
                className={`absolute bottom-0 left-0 h-1 rounded-full ${type === 'success' ? 'bg-violet-500' : 'bg-pink-500'
                    }`}
            />
        </motion.div>
    );
};

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            // use Vite env variable or fallback to localhost during development
            const baseUrl = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api/contect';
            const response = await fetch(`${baseUrl}/api/contect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                // Reset success message after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setErrorMessage(data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage('Could not connect to the server. Please check your internet connection.');
        }
    };

    return (
        <section id="contact" className="py-24 bg-[#08080f] relative overflow-hidden">
            <AnimatePresence>
                {status === 'success' && (
                    <Toast
                        message="Message sent! We'll get back to you soon."
                        type="success"
                        onClose={() => setStatus('idle')}
                    />
                )}
                {status === 'error' && (
                    <Toast
                        message={errorMessage}
                        type="error"
                        onClose={() => setStatus('idle')}
                    />
                )}
            </AnimatePresence>

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
                                { icon: '📍', label: 'Our Office', value: 'Bharuch' }
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
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-gray-400 text-xs uppercase tracking-widest font-bold block ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors duration-300"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-gray-400 text-xs uppercase tracking-widest font-bold block ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors duration-300"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-400 text-xs uppercase tracking-widest font-bold block ml-1">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="Project Inquiry"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors duration-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-400 text-xs uppercase tracking-widest font-bold block ml-1">Message</label>
                                    <textarea
                                        rows="4"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Tell us about your project..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors duration-300 resize-none"
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                                    whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                                    disabled={status === 'loading'}
                                    className={`w-full bg-gradient-to-r from-violet-600 via-blue-500 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-[0_8px_30px_rgba(139,92,246,0.3)] hover:shadow-[0_8px_40px_rgba(139,92,246,0.5)] transition-all duration-300 mt-4 ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {status === 'loading' ? 'Sending...' : 'Send Message →'}
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
