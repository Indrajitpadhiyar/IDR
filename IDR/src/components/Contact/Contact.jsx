import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Premium Toast Component
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9, transition: { duration: 0.2 } }}
            className={`fixed top-8 right-8 z-[9999] px-6 py-4 rounded-2xl backdrop-blur-2xl border shadow-2xl flex items-center gap-4 min-w-[320px] max-w-[90vw] ${type === 'success'
                ? 'bg-blue-50 border-blue-100 text-blue-900'
                : 'bg-orange-50 border-orange-100 text-orange-900'
                }`}
        >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm ${type === 'success'
                ? 'bg-blue-600 text-white'
                : 'bg-orange-500 text-white'
                }`}>
                {type === 'success' ? '✓' : '!'}
            </div>
            <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-0.5">
                    {type === 'success' ? 'Success' : 'Message'}
                </p>
                <p className="font-semibold text-sm leading-tight">{message}</p>
            </div>
            <button
                onClick={onClose}
                className="hover:rotate-90 transition-transform duration-300 p-1 opacity-50 hover:opacity-100 text-gray-900"
            >
                ✕
            </button>
            <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
                className={`absolute bottom-0 left-0 h-1 rounded-full ${type === 'success' ? 'bg-blue-600' : 'bg-orange-500'}`}
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
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const subjects = [
        { id: "Web Development", label: "Web Development", icon: "" },
        { id: "UI/UX Design", label: "UI/UX Design", icon: "" },
        { id: "Mobile App", label: "Mobile App", icon: "" },
        { id: "Other", label: "Other", icon: "" }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            let baseUrlRaw = import.meta.env.VITE_API_BASE;
            if (!baseUrlRaw) {
                baseUrlRaw = window.location.hostname === 'localhost'
                    ? 'http://localhost:4000'
                    : 'https://idr-backend-49rq.onrender.com';
            }
            const baseUrl = baseUrlRaw.replace(/^"(.*)"$/, '$1').replace(/\/$/, '');

            const response = await fetch(`${baseUrl}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setErrorMessage(data.message || 'Error occurred');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Connection failed. Please try again.');
        }
    };

    return (
        <section id="contact" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
            <AnimatePresence>
                {status !== 'idle' && status !== 'loading' && (
                    <Toast
                        message={status === 'success' ? "Message sent! We'll reply soon." : errorMessage}
                        type={status}
                        onClose={() => setStatus('idle')}
                    />
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-600 text-sm font-bold uppercase tracking-[0.4em] mb-4 block"
                    >
                        Contact Us
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-gray-900"
                    >
                        Let's Start a <span className="text-orange-500">Conversation</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Column 1: Info & Process */}
                    <div className="lg:col-span-5 space-y-12">
                        {/* Contact Methods */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900">Direct Support</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <a href="mailto:idrtech23@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                        📧
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Us</p>
                                        <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">idrtech23@gmail.com</p>
                                    </div>
                                </a>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-lg">
                                        📍
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visit Us</p>
                                        <p className="text-sm font-bold text-gray-900">Bharuch, Gujarat</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Process Steps */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900">What Happens Next?</h3>
                            <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                                {[
                                    { step: '01', title: 'Consultation', desc: 'We discuss your goals and brand vision.' },
                                    { step: '02', title: 'Strategy', desc: 'Our experts craft a tailored digital roadmap.' },
                                    { step: '03', title: 'Execution', desc: 'We build, test, and launch your masterpiece.' }
                                ].map((item, i) => (
                                    <div key={i} className="relative pl-16">
                                        <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-xs font-black text-blue-600 shadow-sm z-10">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-2xl shadow-blue-900/5 relative"
                        >
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your name"
                                            className="w-full bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 text-gray-900 transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="hello@example.com"
                                            className="w-full bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 text-gray-900 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 relative" ref={dropdownRef}>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Subject</label>
                                    <div
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={`w-full bg-gray-50/50 backdrop-blur-sm border-2 ${isDropdownOpen ? 'border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.1)]' : 'border-transparent'} hover:border-blue-200 rounded-2xl px-6 py-4 text-gray-900 transition-all cursor-pointer flex items-center justify-between group relative overflow-hidden`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {subjects.find(s => s.id === formData.subject)?.icon && (
                                                <span className="text-xl">{subjects.find(s => s.id === formData.subject)?.icon}</span>
                                            )}
                                            <span className={formData.subject ? "text-gray-900 font-bold" : "text-gray-400 font-medium"}>
                                                {subjects.find(s => s.id === formData.subject)?.label || "Select a topic"}
                                            </span>
                                        </div>
                                        <motion.div
                                            animate={{
                                                rotate: isDropdownOpen ? 180 : 0,
                                                y: isDropdownOpen ? -2 : 0
                                            }}
                                            className="text-blue-600 bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
                                        >
                                            ↓
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial="closed"
                                                animate="open"
                                                exit="closed"
                                                variants={{
                                                    open: {
                                                        opacity: 1,
                                                        y: 0,
                                                        scale: 1,
                                                        transition: {
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 24,
                                                            staggerChildren: 0.05,
                                                            delayChildren: 0.1
                                                        }
                                                    },
                                                    closed: {
                                                        opacity: 0,
                                                        y: -10,
                                                        scale: 0.95,
                                                        transition: {
                                                            duration: 0.2
                                                        }
                                                    }
                                                }}
                                                className="absolute z-[100] left-0 right-0 top-full mt-3 bg-white/80 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden py-3"
                                            >
                                                <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                                    {subjects.map((subj) => (
                                                        <motion.div
                                                            key={subj.id}
                                                            variants={{
                                                                open: { opacity: 1, x: 0, scale: 1 },
                                                                closed: { opacity: 0, x: -20, scale: 0.95 }
                                                            }}
                                                            whileHover={{
                                                                x: 8,
                                                                backgroundColor: "rgba(37, 99, 235, 0.08)",
                                                                transition: { type: "spring", stiffness: 400, damping: 10 }
                                                            }}
                                                            whileTap={{ scale: 0.96 }}
                                                            onClick={() => {
                                                                setFormData(prev => ({ ...prev, subject: subj.id }));
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className={`px-8 py-4 cursor-pointer transition-all flex items-center justify-between group/item border-b border-gray-50/50 last:border-0 ${formData.subject === subj.id ? "bg-blue-50/50" : ""
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <span className="text-2xl group-hover/item:scale-125 transition-transform duration-300">{subj.icon}</span>
                                                                <span className={`text-sm font-bold tracking-tight ${formData.subject === subj.id ? "text-blue-600" : "text-gray-600 group-hover/item:text-gray-900"
                                                                    }`}>
                                                                    {subj.label}
                                                                </span>
                                                            </div>
                                                            {formData.subject === subj.id && (
                                                                <motion.div
                                                                    layoutId="active-selection"
                                                                    className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px]"
                                                                >
                                                                    ✓
                                                                </motion.div>
                                                            )}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Your Message</label>
                                    <textarea
                                        rows="5"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Briefly describe your project..."
                                        className="w-full bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-1 text-gray-900 transition-all outline-none resize-none"
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={status === 'loading'}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-3"
                                >
                                    {status === 'loading' ? (
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>Send Message <span className="text-xl">→</span></>
                                    )}
                                </motion.button>
                            </form>

                            {/* Decorative line */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-blue-600 to-orange-500 rounded-b-full" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
