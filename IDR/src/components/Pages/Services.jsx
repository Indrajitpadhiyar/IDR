import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { applyRouteSeo } from "../../utils/seo";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";

/* ─── CONSTANTS ─── */
const CONTACT_HASH = "/#contact";
const CONSULT_MAIL =
  "mailto:idrtech23@gmail.com?subject=Book%20a%20consultation%20%E2%80%93%20IDR%20Tech&body=Hi%20IDR%20Tech%2C%0A%0AI%27d%20like%20to%20schedule%20a%20consultation.%0A%0A";

/* ─── DATA ─── */
const services = [
  {
    title: "Custom Web Development",
    description:
      "Production-grade interfaces and backends for modern businesses — fast, accessible, and built to scale globally.",
    emoji: "⚡",
    color: "#0b63f6",
    lightBg: "#eff6ff",
    lightBorder: "#bfdbfe",
    technologies: ["React.js", "Next.js", "Node.js"],
    features: ["Component-driven architecture", "API-ready integrations", "Performance budgets & audits"],
    featured: true,
  },
  {
    title: "UI/UX Design",
    description:
      "Research-backed UX, polished UI systems, and prototypes that align stakeholders before a single line of production code ships.",
    emoji: "🎨",
    color: "#7c3aed",
    lightBg: "#f5f3ff",
    lightBorder: "#ddd6fe",
    technologies: ["Figma", "Wireframing", "Prototyping"],
    features: ["Design systems & tokens", "Responsive layout specs", "Micro-interaction planning"],
    featured: false,
  },
  {
    title: "E-commerce Solutions",
    description:
      "High-converting storefronts with secure checkout, catalog modeling, and integrations tuned for real operations — not demo pages.",
    emoji: "🛒",
    color: "#059669",
    lightBg: "#ecfdf5",
    lightBorder: "#a7f3d0",
    technologies: ["Shopify", "Custom Cart Systems", "Payment Integration"],
    features: ["Checkout & fulfillment flows", "Inventory & catalog patterns", "Analytics-ready events"],
    featured: false,
  },
  {
    title: "Website Maintenance & Hosting",
    description:
      "Uptime-minded hosting guidance, backups, security hardening, and proactive monitoring so your site stays fast and trustworthy.",
    emoji: "☁️",
    color: "#d97706",
    lightBg: "#fffbeb",
    lightBorder: "#fde68a",
    technologies: ["VPS Hosting", "Security", "Monitoring"],
    features: ["Deployments & rollbacks", "SSL & dependency hygiene", "Incident response playbooks"],
    featured: false,
  },
  {
    title: "SEO Optimization",
    description:
      "Technical SEO, Core Web Vitals work, structured data, and performance optimization — aligned with how people actually search.",
    emoji: "📈",
    color: "#dc2626",
    lightBg: "#fef2f2",
    lightBorder: "#fecaca",
    technologies: ["Technical SEO", "Speed Optimization", "Local SEO"],
    features: ["Schema & metadata strategy", "Crawl & index hygiene", "Local landing patterns"],
    featured: false,
  },
];

const processSteps = [
  { step: "01", title: "Discovery", description: "Goals, audience, competitors, and success metrics — captured in one focused working session.", icon: "💬", color: "#0b63f6" },
  { step: "02", title: "Planning", description: "Information architecture, milestones, and a delivery plan that keeps scope crisp and measurable.", icon: "🗂️", color: "#7c3aed" },
  { step: "03", title: "Design", description: "Wireframes to high-fidelity UI with reusable components and dev-ready specifications.", icon: "🎨", color: "#059669" },
  { step: "04", title: "Development", description: "Iterative builds with reviews, performance checks, and accessibility baked in — not bolted on.", icon: "💻", color: "#d97706" },
  { step: "05", title: "Launch", description: "Deployment, monitoring, handoff docs, and a clear path for iterations after go-live.", icon: "🚀", color: "#dc2626" },
];

const whyUs = [
  { title: "Fast Delivery", description: "Lean workflows and direct communication keep momentum high from kickoff to launch.", icon: "⚡", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  { title: "Modern Tech Stack", description: "React-first engineering with patterns that stay maintainable as your product grows.", icon: "🧱", color: "#0b63f6", bg: "#eff6ff", border: "#bfdbfe" },
  { title: "SEO Friendly", description: "Semantic structure, metadata discipline, and performance budgets that support rankings.", icon: "📊", color: "#059669", bg: "#ecfdf5", border: "#a7f3d0" },
  { title: "Mobile Responsive", description: "Layouts tested across breakpoints so your brand looks intentional on every device.", icon: "📱", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
  { title: "Scalable Architecture", description: "Modular components and clear boundaries so new features do not become rewrites.", icon: "🏗️", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  { title: "Ongoing Support", description: "Post-launch help for updates, monitoring, and improvements as your business evolves.", icon: "🎧", color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc" },
];

const faqs = [
  { q: "How long does a website take to build?", a: "Most marketing sites land between 2–6 weeks depending on content readiness, integrations, and approvals. Larger builds are phased so you can launch incrementally." },
  { q: "What technologies do you use?", a: "We primarily build with React (and Next.js when SSR/SEO complexity demands it), modern CSS systems, and Node.js where a backend is required — always matched to your goals, not trends." },
  { q: "Do you provide hosting?", a: "Yes — we help you choose the right hosting model (including VPS setups), configure deployments, SSL, backups, and monitoring so launches stay stable." },
  { q: "Can you redesign existing websites?", a: "Absolutely. We can modernize UI/UX, improve performance, refactor codebases, and migrate content without losing SEO equity when planned carefully." },
  { q: "How much does web development cost?", a: "Scope drives pricing — share your pages, integrations, and timeline. We will propose a clear milestone plan with transparent deliverables for all our clients globally." },
];

const stats = [
  { value: 24, suffix: "h", label: "Response Window", sub: "Typical turnaround" },
  { value: 100, suffix: "%", label: "Custom UI", sub: "Zero templates" },
  { value: 360, suffix: "°", label: "Full Coverage", sub: "Design → deploy" },
];

const heroStats = [
  { v: "07+", l: "Core team" },
  { v: "24h", l: "Support window" },
  { v: "100%", l: "Custom UI" },
];

/* ─── HOOKS ─── */
function useCountUp(target, active, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(target * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

/* ─── ANIMATION VARIANTS ─── */
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

/* ─── SUB-COMPONENTS ─── */

function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-[1.5px] border-indigo-100 bg-indigo-50 text-indigo-700 text-[10px] font-extrabold tracking-[0.28em] uppercase">
      {children}
    </span>
  );
}

function StatCounter({ stat, active, index }) {
  const v = useCountUp(stat.value, active);

  const textColors = ["text-[#0b63f6]", "text-violet-600", "text-emerald-600"];
  const bgClasses = [
    "bg-blue-50 border-blue-200",
    "bg-violet-50 border-violet-200",
    "bg-emerald-50 border-emerald-200"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "backOut" }}
      className={`px-6 py-7 rounded-[20px] border-[1.5px] text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] ${bgClasses[index]}`}
    >
      <div className={`text-[52px] font-black leading-none font-['DM_Mono',monospace] ${textColors[index]}`}>
        {v}{stat.suffix}
      </div>
      <div className="mt-2.5 text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
        {stat.label}
      </div>
      <div className="mt-1 text-[13px] text-gray-400">{stat.sub}</div>
    </motion.div>
  );
}

function ServiceCard({ service, index }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.article
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: index * 0.06 }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className={`relative p-7 rounded-[24px] overflow-hidden cursor-default transition-all duration-300`}
      style={{
        border: `1.5px solid ${hov ? service.color + "55" : service.lightBorder}`,
        background: hov ? service.lightBg : "#fff",
        boxShadow: hov
          ? `0 20px 60px ${service.color}18, 0 4px 16px rgba(0,0,0,0.06)`
          : "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* Subtle accent stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${service.color}, ${service.color}55)`,
          opacity: hov ? 1 : 0,
        }}
      />

      <div className="flex items-start justify-between gap-3">
        <motion.div
          animate={hov ? { scale: 1.1, rotate: 6 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-[52px] h-[52px] rounded-2xl text-2xl flex items-center justify-center border-[1.5px]"
          style={{ background: service.lightBg, borderColor: service.lightBorder }}
        >{service.emoji}</motion.div>

        <span
          className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase border"
          style={{ color: service.color, background: service.lightBg, borderColor: service.lightBorder }}
        >{service.featured ? "Flagship" : "Service"}</span>
      </div>

      <h3 className="mt-[18px] text-[19px] font-bold text-gray-900">{service.title}</h3>
      <p className="mt-2.5 text-[13.5px] leading-[1.8] text-gray-500">{service.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {service.technologies.map((t) => (
          <span key={t} className="px-3 py-1 rounded-full text-[11px] font-semibold border" style={{
            background: service.lightBg, borderColor: service.lightBorder, color: service.color
          }}>{t}</span>
        ))}
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-[13px] text-gray-700">
            <span className="w-5 h-5 rounded-md shrink-0 text-[11px] flex items-center justify-center font-bold border" style={{
              background: service.lightBg, borderColor: service.lightBorder, color: service.color
            }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-[22px]">
        <Link to={CONTACT_HASH} className="inline-flex items-center gap-1.5 text-[13px] font-bold no-underline px-4 py-2 rounded-full border transition-transform duration-200 hover:-translate-y-0.5" style={{
          color: service.color, background: service.lightBg, borderColor: service.lightBorder
        }}>
          Learn more →
        </Link>
      </div>
    </motion.article>
  );
}

function ProcessStep({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-5"
    >
      {/* Step indicator */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          whileInView={{ scale: [0.6, 1.1, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: index * 0.1 }}
          className="w-11 h-11 rounded-[14px] z-10 flex items-center justify-center text-xs font-extrabold font-['DM_Mono',monospace] border-[1.5px]"
          style={{
            borderColor: `${step.color}33`,
            background: `linear-gradient(135deg, ${step.color}18, ${step.color}08)`,
            color: step.color,
            boxShadow: `0 4px 16px ${step.color}22`,
          }}
        >{step.step}</motion.div>
      </div>

      <motion.div
        whileHover={{ y: -4, boxShadow: `0 16px 48px ${step.color}14` }}
        transition={{ duration: 0.25 }}
        className="flex-1 p-5 sm:px-6 rounded-[18px] border-[1.5px] border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-300"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <div
            className="w-10 h-10 rounded-xl text-xl flex items-center justify-center border"
            style={{ background: `${step.color}10`, borderColor: `${step.color}25` }}
          >{step.icon}</div>
          <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
        </div>
        <p className="mt-2.5 text-[13.5px] leading-[1.8] text-gray-500">{step.description}</p>
      </motion.div>
    </motion.div>
  );
}

function WhyCard({ item, index }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: index * 0.05 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="p-6 rounded-[20px] transition-all duration-300"
      style={{
        border: `1.5px solid ${hov ? item.border : "#f1f5f9"}`,
        background: hov ? item.bg : "#fff",
        boxShadow: hov ? `0 16px 40px ${item.color}14` : "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="w-11 h-11 rounded-[13px] text-xl flex items-center justify-center border-[1.5px]"
        style={{ background: item.bg, borderColor: item.border }}
      >{item.icon}</div>
      <h3 className="mt-4 text-[15px] font-bold text-gray-900">{item.title}</h3>
      <p className="mt-2 text-[13px] leading-[1.8] text-gray-500">{item.description}</p>
    </motion.div>
  );
}

function FaqItem({ item, index, openIndex, setOpenIndex }) {
  const open = openIndex === index;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className={`rounded-2xl border-[1.5px] overflow-hidden transition-all duration-300 ${open ? "border-blue-200 bg-blue-50 shadow-[0_8px_30px_rgba(11,99,246,0.08)]" : "border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.03)]"}`}
    >
      <button
        onClick={() => setOpenIndex(open ? null : index)}
        className="w-full flex items-center justify-between gap-4 py-[18px] px-[22px] bg-transparent border-none cursor-pointer text-gray-900 text-left"
      >
        <span className="font-semibold text-sm leading-[1.5]">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28 }}
          className={`shrink-0 w-8 h-8 rounded-[10px] border-[1.5px] flex items-center justify-center text-sm transition-all duration-300 ${open ? "border-blue-200 bg-blue-100 text-blue-600" : "border-gray-200 bg-gray-50 text-gray-500"}`}
        >▾</motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t-[1.5px] border-blue-200"
          >
            <div className="px-[22px] pt-3.5 pb-5 text-[13.5px] leading-[1.85] text-gray-600">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─── */
const Services = () => {
  const [faqOpen, setFaqOpen] = useState(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-15% 0px" });
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -50]);

  useEffect(() => {
    applyRouteSeo("/services");
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-['Syne','DM_Sans',system-ui,sans-serif] overflow-x-hidden selection:bg-blue-200">



      {/* ─── BACKGROUND DOTS ─── */}
      <div className="dot-bg fixed inset-0 -z-10 opacity-50 bg-slate-50">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 10% 0%, rgba(11,99,246,0.07) 0%, transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(124,58,237,0.06) 0%, transparent 50%)" }} />
        <div className="dot-bg absolute inset-0 opacity-60" />
      </div>

      <Navbar />

      <main>
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden pt-[130px] pb-[80px]">
          {/* Soft blobs */}
          <div className="absolute -top-[100px] -left-[150px] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(11,99,246,0.1), transparent 70%)" }} />
          <div className="absolute top-0 -right-[100px] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07), transparent 70%)" }} />

          <div className="max-w-[1180px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
              {/* Left col */}
              <motion.div style={{ y: heroY }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-wrap gap-2.5 mb-6"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] border-gray-200 bg-white text-xs font-semibold text-gray-500 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
                    📍 Local delivery + remote-friendly
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.1 }}
                  className="text-[clamp(30px,4.5vw,52px)] font-extrabold leading-[1.15] text-slate-900"
                >
                  Premium Web Development Services —{" "}
                  <span className="gradient-text">premium UI, engineering & growth systems.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-5 text-base leading-[1.85] text-gray-600 max-w-[520px]"
                >
                  For clients worldwide, IDR Tech ships modern websites, UI/UX, e-commerce, SEO, and long-term maintenance — with the polish of a high-end SaaS team and the clarity of a boutique studio.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-[30px] flex flex-wrap gap-3"
                >
                  <Link to={CONTACT_HASH} className="btn-primary">Start Your Project →</Link>
                  <a href={CONSULT_MAIL} className="btn-ghost">📅 Book Consultation</a>
                </motion.div>

                {/* Hero stats */}
                <div className="flex flex-wrap gap-2.5 mt-8">
                  {heroStats.map((s, i) => (
                    <motion.div
                      key={s.l}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 200 }}
                      className="px-[18px] py-3 rounded-[14px] border-[1.5px] border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
                    >
                      <div className="text-lg font-extrabold text-blue-600 font-['DM_Mono',monospace]">{s.v}</div>
                      <div className="mt-0.5 text-[10px] text-gray-400 font-semibold tracking-[0.2em] uppercase">{s.l}</div>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.68, type: "spring" }}
                    className="px-[18px] py-3 rounded-[14px] border-[1.5px] border-blue-200 bg-blue-50 shadow-[0_2px_8px_rgba(11,99,246,0.08)]"
                  >
                    <div className="text-[10px] font-bold text-blue-500 tracking-[0.22em] uppercase">Trusted stack</div>
                    <div className="mt-1 text-[13px] font-bold text-blue-800">React · Next · Node · Figma</div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.15 }}
                className="animate-float relative"
              >
                {/* Glow behind card */}
                <div className="absolute -inset-6 rounded-[48px] blur-[32px] -z-10" style={{
                  background: "radial-gradient(circle, rgba(11,99,246,0.12), rgba(124,58,237,0.07), transparent)",
                }} />

                <div className="rounded-[28px] border-[1.5px] border-gray-200 bg-white p-1 shadow-[0_24px_80px_rgba(0,0,0,0.1),_0_4px_16px_rgba(0,0,0,0.05)]">
                  <div className="rounded-[24px] p-7" style={{ background: "linear-gradient(160deg, #f8fafc, #fff)" }}>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 tracking-[0.26em] uppercase">Engagement model</div>
                        <div className="mt-1.5 text-lg font-bold text-slate-900">Sprint-based delivery</div>
                      </div>
                      <motion.span
                        animate={{ opacity: [1, 0.55, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase text-emerald-800 bg-emerald-100 border border-emerald-200"
                      >
                        <span className="dot-live w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                        Accepting projects
                      </motion.span>
                    </div>

                    {/* Rows */}
                    <div className="mt-5 flex flex-col gap-2.5">
                      {["Technical discovery", "UI system + build", "Launch + measurement"].map((row, i) => (
                        <motion.div
                          key={row}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-center gap-3 py-3 px-3.5 rounded-xl border-[1.5px] border-slate-100 bg-slate-50"
                        >
                          <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-[13px] text-white shadow-[0_4px_12px_rgba(11,99,246,0.3)] bg-gradient-to-br from-blue-600 to-blue-500">✓</div>
                          <span className="text-[13px] font-semibold text-gray-700 flex-1">{row}</span>
                          <span className="text-gray-400 text-xs">↗</span>
                        </motion.div>
                      ))}
                    </div>


                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── SERVICES ─── */}
        <section className="py-24 bg-white">
          <div className="max-w-[1180px] mx-auto px-6">
            <motion.div {...fadeUp}>
              <SectionLabel>Capabilities</SectionLabel>
              <h2 className="mt-3.5 text-[clamp(24px,3.5vw,38px)] font-extrabold text-slate-900 leading-[1.2]">
                A premium service suite —<br />engineered like a product team.
              </h2>
              <p className="mt-3 text-[15px] leading-[1.85] text-gray-500 max-w-[580px]">
                Each engagement combines design taste, software discipline, and SEO-aware delivery — tuned for competitive categories and growing brands globally.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
              {services.map((s, i) => (
                <ServiceCard key={s.title} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-[1180px] mx-auto px-6">
            <motion.div {...fadeUp}>
              <SectionLabel>Process</SectionLabel>
              <h2 className="mt-3.5 text-[clamp(24px,3.5vw,38px)] font-extrabold text-slate-900 leading-[1.2]">
                A calm, modern delivery timeline —<br />from discovery to launch.
              </h2>
            </motion.div>

            <div className="mt-12 relative">
              {/* Connector line */}
              <div className="absolute left-[21px] top-11 bottom-11 w-px bg-gradient-to-b from-blue-200 via-violet-200 to-red-200" />

              <div className="flex flex-col gap-4">
                {processSteps.map((step, i) => (
                  <ProcessStep key={step.title} step={step} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHY US ─── */}
        <section className="py-24 bg-white">
          <div className="max-w-[1180px] mx-auto px-6">
            <motion.div {...fadeUp}>
              <SectionLabel>Why IDR Tech</SectionLabel>
              <h2 className="mt-3.5 text-[clamp(24px,3.5vw,38px)] font-extrabold text-slate-900 leading-[1.2]">
                Built for founders who want speed —<br />without sacrificing standards.
              </h2>
            </motion.div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {stats.map((s, i) => <StatCounter key={s.label} stat={s} active={statsInView} index={i} />)}
            </div>

            {/* Why cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[14px] mt-8">
              {whyUs.map((item, i) => <WhyCard key={item.title} item={item} index={i} />)}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-[1180px] mx-auto px-6">
            <motion.div {...fadeUp}>
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="mt-3.5 text-[clamp(24px,3.5vw,38px)] font-extrabold text-slate-900 leading-[1.2]">
                Answers to the questions teams ask before starting.
              </h2>
              <p className="mt-3 text-[15px] leading-[1.85] text-gray-500 max-w-[540px]">
                Straight talk on timelines, tech choices, hosting, redesigns, and pricing — for growing businesses and startups worldwide.
              </p>
            </motion.div>

            <motion.div {...fadeUp} className="mt-10 max-w-[740px] flex flex-col gap-2.5">
              {faqs.map((item, i) => (
                <FaqItem key={item.q} item={item} index={i} openIndex={faqOpen} setOpenIndex={setFaqOpen} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="pt-20 pb-[100px] bg-white">
          <div className="max-w-[1180px] mx-auto px-6">
            <motion.div
              {...fadeUp}
              className="relative overflow-hidden rounded-[32px] border-[1.5px] border-blue-200 py-15 px-12 shadow-[0_8px_40px_rgba(11,99,246,0.08)] bg-gradient-to-br from-blue-50 via-violet-50 to-emerald-50"
            >
              {/* Decorative circles */}
              <div className="absolute -top-[60px] -right-[60px] w-[220px] h-[220px] rounded-full bg-violet-500/10 pointer-events-none" />
              <div className="absolute -bottom-[40px] -left-[40px] w-[180px] h-[180px] rounded-full bg-blue-500/10 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
                <div className="relative">
                  <div className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase">Next step</div>
                  <h2 className="mt-2.5 text-[clamp(24px,3vw,36px)] font-extrabold text-slate-900 leading-[1.2]">
                    Let's Build Something Amazing Together
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.85] text-gray-600 max-w-[440px]">
                    Tell us about your product, timeline, and market — we'll respond with a focused plan for web development, UI/UX, e-commerce, SEO, and ongoing support for your business.
                  </p>
                </div>
                <div className="flex flex-col gap-3 items-end relative sm:items-start">
                  <Link to={CONTACT_HASH} className="btn-primary w-full max-w-[220px] justify-center">
                    Start Project →
                  </Link>
                  <Link to={CONTACT_HASH} className="btn-ghost w-full max-w-[220px] justify-center">
                    Contact Us ↗
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ─── STICKY FAB ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-7 right-7 z-50"
      >
        <motion.div whileHover={{ y: -4, scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Link
            to={CONTACT_HASH}
            className="btn-primary px-[22px] py-3 text-[13px] shadow-[0_12px_36px_rgba(11,99,246,0.35)]"
          >
            ✦ Start a project →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Services;