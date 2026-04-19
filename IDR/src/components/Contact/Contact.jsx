import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Clock3, Mail, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import toast from 'react-hot-toast';

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

  return (
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
            <Sparkles className="h-4 w-4" />
            Contact us
          </span>
          <h2 className="section-title mt-6 text-[#12306d]">
            Let&apos;s talk about your website, design, or digital project.
          </h2>
          <p className="section-copy mx-auto mt-6">
            Share your goals, current issues, or the kind of redesign you want. We&apos;ll get back with the right next step.
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

                const panel = (
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
                    className="glass-panel rounded-[28px] p-4"
                  >
                    <div className="flex items-center gap-4 rounded-[24px] border border-white/75 bg-white/92 p-5 shadow-[0_16px_40px_rgba(11,99,246,0.08)]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b63f6]/10 text-[#0b63f6]">
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
                  return (
                    <a key={card.label} href={card.href}>
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
                              className={`cursor-pointer px-5 py-4 text-sm font-medium transition-colors duration-200 ${
                                formData.subject === subject ? 'text-[#0b63f6]' : 'text-[#12306d]'
                              }`}
                            >
                              {subject}
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </label>

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

                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={status === 'loading'}
                  className="brand-btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
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
  );
};

export default Contact;
