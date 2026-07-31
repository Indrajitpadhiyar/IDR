import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Clock3, Mail, MapPin, Phone, ShieldCheck, Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import toast from 'react-hot-toast';
import Navbar from '../layouts/Navbar';
const WhatsAppIcon = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={className}
    fill="currentColor"
    {...props}
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

const subjectOptions = [
  'Website Design',
  'Web Development',
  'Landing Page Refresh',
  'UI and UX Design',
  'E-commerce Experience',
  'Product Strategy',
  'Other',
];

const contactCards = [
  {
    label: 'Email us',
    value: 'idrtech23@gmail.com',
    href: 'mailto:idrtech23@gmail.com',
    icon: Mail,
  },
  {
    label: 'Phone call',
    value: '+91 9714833771',
    href: 'tel:+919714833771',
    icon: Phone,
  },
  {
    label: 'WhatsApp us',
    value: '+91 9714833771',
    href: 'https://wa.me/919714833771?text=Hello%20IDR%20Tech%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.',
    icon: WhatsAppIcon,
  },
  {
    label: 'Website',
    value: 'https://idrtech.in',
    href: 'https://idrtech.in',
    icon: Globe,
  },
  {
    label: 'Location',
    value: 'Bharuch, Gujarat',
    icon: MapPin,
  },
  {
    label: 'Reply window',
    value: 'Usually within 24 hours',
    icon: Clock3,
  },
];

const processSteps = [
  'We review your goals and project needs.',
  'We suggest the right direction for design and development.',
  'We move into planning, building, and launch support.',
];


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: subjectOptions[0],
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const subjectDropdownRef = useRef(null);
  const optionRefs = useRef({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubjectSelect = (subject) => {
    setFormData((current) => ({ ...current, subject }));
    setIsSubjectOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subjectDropdownRef.current && !subjectDropdownRef.current.contains(event.target)) {
        setIsSubjectOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsSubjectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (isSubjectOpen) {
      const selectedOption = optionRefs.current[formData.subject];
      selectedOption?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [formData.subject, isSubjectOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      let baseUrlRaw = import.meta.env.VITE_API_BASE;

      if (!baseUrlRaw) {
        baseUrlRaw =
          window.location.hostname === 'localhost' ? 'http://localhost:4000' : 'https://idr-backend-49rq.onrender.com';
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
        toast.success("Message sent. We'll get back to you soon.", {
          duration: 5000,
          style: {
            borderRadius: '20px',
            background: '#ffffff',
            color: '#12306d',
            border: '1px solid #0b63f620',
            boxShadow: '0 20px 50px rgba(11,99,246,0.12)'
          },
        });
        setFormData({
          name: '',
          email: '',
          mobile: '',
          subject: subjectOptions[0],
          message: '',
        });
      } else {
        setStatus('error');
        const err = data.message || 'Something went wrong while sending your message.';
        setErrorMessage(err);
        toast.error(err);
      }
    } catch (_error) {
      setStatus('error');
      const err = 'Connection failed. Please try again in a moment.';
      setErrorMessage(err);
      toast.error(err);
    }
  };

  const handleWhatsAppClick = (event) => {
    event.preventDefault();
    const phone = '919714833771';
    
    let text = '';
    if (formData.name || formData.email || formData.mobile || formData.message) {
      text = `Hello IDR Tech,\n\n`;
      if (formData.name) text += `*Name:* ${formData.name}\n`;
      if (formData.email) text += `*Email:* ${formData.email}\n`;
      if (formData.mobile) text += `*Mobile:* ${formData.mobile}\n`;
      if (formData.subject) text += `*Subject:* ${formData.subject}\n`;
      if (formData.message) text += `*Message:* ${formData.message}`;
    } else {
      text = `Hello IDR Tech, I would like to inquire about your services.`;
    }
    
    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${phone}?text=${encodedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen overflow-x-hidden text-[#12306d]">
      <Navbar />
      <section id="contact" className="section-shell px-4 pb-24 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="section-eyebrow">

              Contact us
            </span>
            <h2 className="section-title mt-6 text-[#12306d]">
              Let&apos;s talk about your website, design, or digital project.
            </h2>
            <p className="section-copy mx-auto mt-6">
              Share your goals, current issues, or the kind of redesign you want. We&apos;ll get back with the right next step.
            </p>
            <p className="text-xs font-bold text-[#5e78ad] mt-4 uppercase tracking-[0.24em]">
              IDR Tech is owned and operated by INDRAJITSINH RAJESHBHAI PADHIYAR (Legal Owner).
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-6">
              <div className="glass-panel rounded-[36px] p-4">
                <div className="rounded-[30px] bg-[linear-gradient(135deg,#0b63f6 0%,#2c72f3 55%,#ff8f32 100%)] p-8 text-black shadow-[0_26px_60px_rgba(11,99,246,0.18)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/75">Direct line</p>
                  <h3 className="mt-5 text-3xl font-semibold leading-tight">Clear communication helps every project move faster.</h3>
                  <p className="mt-5 text-sm leading-7 text-black/88">
                    We keep the process simple, collaborative, and focused on giving your business a better digital presence.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {contactCards.map((card, index) => {
                  const Icon = card.icon;
                  const isWhatsApp = card.label.toLowerCase().includes('whatsapp');

                  const panel = (
                    <motion.div
                      initial={{ opacity: 0, x: -24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
                      className="glass-panel rounded-[28px] p-4"
                    >
                      <div className="flex items-center gap-4 rounded-[24px] border border-white/75 bg-white/92 p-5 shadow-[0_16px_40px_rgba(11,99,246,0.08)]">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isWhatsApp ? 'bg-[#25D366]/10 text-[#25d366]' : 'bg-[#0b63f6]/10 text-[#0b63f6]'}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5e78ad]">{card.label}</p>
                          <p className="mt-2 text-sm font-semibold text-[#12306d]">{card.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  );

                  if (card.href) {
                    const isExternal = card.href.startsWith('http');
                    return (
                      <a 
                        key={card.label} 
                        href={card.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                      >
                        {panel}
                      </a>
                    );
                  }

                  return <div key={card.label}>{panel}</div>;
                })}
              </div>

              <div className="glass-panel rounded-[32px] p-4">
                <div className="rounded-[26px] border border-white/75 bg-white/92 p-6 shadow-[0_16px_40px_rgba(11,99,246,0.08)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0b63f6]">What happens next</p>
                  <div className="mt-5 space-y-4">
                    {processSteps.map((step, index) => (
                      <div key={step} className="flex items-start gap-4 rounded-[22px] border border-[#0b63f6]/10 bg-[#eef4ff] px-4 py-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b63f6] text-xs font-semibold text-white">
                          0{index + 1}
                        </div>
                        <p className="text-sm font-medium leading-7 text-[#35538e]">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="glass-panel rounded-[36px] p-4"
            >
              <div className="rounded-[30px] border border-white/75 bg-white/94 p-7 shadow-[0_22px_54px_rgba(11,99,246,0.08)] sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="ml-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#5e78ad]">Full name</span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="mt-3 w-full rounded-[22px] border border-[#0b63f6]/12 bg-[#eef4ff] px-5 py-4 text-sm text-[#12306d] outline-none transition-colors focus:border-[#0b63f6] focus:bg-white"
                      />
                    </label>

                    <label className="block">
                      <span className="ml-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#5e78ad]">Email address</span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="hello@example.com"
                        className="mt-3 w-full rounded-[22px] border border-[#0b63f6]/12 bg-[#eef4ff] px-5 py-4 text-sm text-[#12306d] outline-none transition-colors focus:border-[#0b63f6] focus:bg-white"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="ml-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#5e78ad]">
                      Mobile number <span className="normal-case tracking-normal font-normal text-[#5e78ad]/60">(optional)</span>
                    </span>
                    <div className="relative mt-3">
                      <Phone className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5e78ad]/50" />
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Number"
                        className="w-full rounded-[22px] border border-[#0b63f6]/12 bg-[#eef4ff] pl-12 pr-5 py-4 text-sm text-[#12306d] outline-none transition-colors focus:border-[#0b63f6] focus:bg-white"
                      />
                    </div>
                  </label>

                  <div className="block">
                    <span className="ml-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#5e78ad]">Subject</span>
                    <div ref={subjectDropdownRef} className="relative mt-3">
                      <motion.button
                        type="button"
                        onClick={() => setIsSubjectOpen((current) => !current)}
                        aria-haspopup="listbox"
                        aria-expanded={isSubjectOpen}
                        className="flex w-full items-center justify-between rounded-[22px] border border-[#0b63f6]/12 bg-[#eef4ff] px-5 py-4 text-sm font-semibold text-[#12306d] outline-none transition-colors focus:border-[#0b63f6] focus:bg-white"
                      >
                        <span className="truncate">{formData.subject}</span>
                        <motion.span animate={{ rotate: isSubjectOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
                          <ChevronDown className="h-5 w-5 text-[#12306d]" />
                        </motion.span>
                      </motion.button>

                      <AnimatePresence>
                        {isSubjectOpen && (
                          <motion.ul
                            role="listbox"
                            aria-label="Subject options"
                            onWheel={(event) => event.stopPropagation()}
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="absolute inset-x-0 top-full z-10 mt-2 max-h-[min(16rem,calc(100vh-260px))] list-none overflow-auto rounded-[22px] border border-[#0b63f6]/15 bg-white/95 shadow-[0_25px_60px_rgba(11,99,246,0.2)] backdrop-blur-md"
                          >
                            {subjectOptions.map((subject) => (
                              <motion.li
                                key={subject}
                                role="option"
                                tabIndex={0}
                                aria-selected={formData.subject === subject}
                                ref={(el) => {
                                  optionRefs.current[subject] = el;
                                }}
                                layout
                                onClick={() => handleSubjectSelect(subject)}
                                onKeyDown={(event) => {
                                  if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    handleSubjectSelect(subject);
                                  }
                                }}
                                whileHover={{ backgroundColor: 'rgba(11,99,246,0.08)' }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.18, ease: 'easeOut' }}
                                className={`cursor-pointer px-5 py-4 text-sm font-medium transition-colors duration-200 ${formData.subject === subject ? 'text-[#0b63f6]' : 'text-[#12306d]'
                                  }`}
                              >
                                {subject}
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <label className="block">
                    <span className="ml-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#5e78ad]">Project details</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Tell us about the redesign, style, or features you want."
                      className="mt-3 min-h-[170px] w-full rounded-[22px] border border-[#0b63f6]/12 bg-[#eef4ff] px-5 py-4 text-sm leading-7 text-[#12306d] outline-none transition-colors focus:border-[#0b63f6] focus:bg-white"
                    />
                  </label>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <motion.button
                      type="submit"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={status === 'loading'}
                      className="brand-btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending message
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={handleWhatsAppClick}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      style={{ paddingTop: '0.9rem', paddingBottom: '0.9rem' }}
                      className="inline-flex items-center justify-center gap-2 rounded-[999px] bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all duration-200 px-6 text-sm font-bold shadow-[0_14px_30px_rgba(37,211,102,0.22)] flex-1"
                    >
                      <WhatsAppIcon className="h-5 w-5 fill-white" />
                      Chat on WhatsApp
                    </motion.button>
                  </div>

                  {/* Inline error message so users see it even after toast fades */}
                  {status === 'error' && errorMessage && (
                    <p className="mt-2 rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                      {errorMessage}
                    </p>
                  )}

                </form>
                <p className="mt-6 text-center text-xs leading-6 text-[#5e78ad]/80">
                  By submitting this form, you agree that IDR Tech may contact you regarding your inquiry and related services.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;