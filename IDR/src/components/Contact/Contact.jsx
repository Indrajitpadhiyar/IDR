import { useEffect, useState } from 'react';
import { ArrowRight, Clock3, Mail, MapPin, ShieldCheck, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const subjectOptions = ['Website Design', 'Web Development', 'Landing Page Refresh', 'UI and UX Design', 'Other'];

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

const Toast = ({ message, success, onClose }) => {
  useEffect(() => {
    const timeoutId = window.setTimeout(onClose, 3500);

    return () => window.clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 20, y: -10 }}
      className="fixed right-4 top-24 z-[70] w-full max-w-sm rounded-[28px] border border-white/85 bg-white/92 p-4 shadow-[0_26px_60px_rgba(11,99,246,0.14)] backdrop-blur-xl sm:right-6"
    >
      <div className="flex items-start gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${success ? 'bg-[#0b63f6] text-black' : 'bg-[#ff8f32] text-black '}`}>
          {success ? <ShieldCheck className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#5e78ad]">{success ? 'Success' : 'Update'}</p>
          <p className="mt-2 text-sm font-medium leading-7 text-[#35538e]">{message}</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-full p-1 text-[#5e78ad] transition-colors hover:text-[#12306d]" aria-label="Close notification">
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: subjectOptions[0],
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

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
        setFormData({
          name: '',
          email: '',
          subject: subjectOptions[0],
          message: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong while sending your message.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Connection failed. Please try again in a moment.');
    }
  };

  return (
    <section id="contact" className="section-shell px-4 pb-24 sm:px-6 lg:px-8">
      <AnimatePresence>
        {status !== 'idle' && status !== 'loading' && (
          <Toast
            message={status === 'success' ? "Message sent. We'll get back to you soon." : errorMessage}
            success={status === 'success'}
            onClose={() => setStatus('idle')}
          />
        )}
      </AnimatePresence>

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
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-3 w-full rounded-[22px] border border-[#0b63f6]/12 bg-[#eef4ff] px-5 py-4 text-sm text-[#12306d] outline-none transition-colors focus:border-[#0b63f6] focus:bg-white"
                  >
                    {subjectOptions.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
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
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
