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
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "6px 14px", borderRadius: 999,
      border: "1.5px solid #e0e7ff",
      background: "#f0f4ff",
      color: "#3b5bdb",
      fontSize: 10, fontWeight: 800,
      letterSpacing: "0.28em", textTransform: "uppercase",
    }}>
      {children}
    </span>
  );
}

function StatCounter({ stat, active, index }) {
  const v = useCountUp(stat.value, active);
  const colors = ["#0b63f6", "#7c3aed", "#059669"];
  const bgs = ["#eff6ff", "#f5f3ff", "#ecfdf5"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "backOut" }}
      style={{
        padding: "28px 24px", borderRadius: 20,
        border: `1.5px solid ${bgs[index] === "#eff6ff" ? "#bfdbfe" : bgs[index] === "#f5f3ff" ? "#ddd6fe" : "#a7f3d0"}`,
        background: bgs[index],
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ fontSize: 52, fontWeight: 900, color: colors[index], lineHeight: 1, fontFamily: "'DM Mono', monospace" }}>
        {v}{stat.suffix}
      </div>
      <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", color: "#6b7280", textTransform: "uppercase" }}>
        {stat.label}
      </div>
      <div style={{ marginTop: 4, fontSize: 13, color: "#9ca3af" }}>{stat.sub}</div>
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
      style={{
        position: "relative", padding: 28, borderRadius: 24,
        border: `1.5px solid ${hov ? service.color + "55" : service.lightBorder}`,
        background: hov ? service.lightBg : "#fff",
        boxShadow: hov
          ? `0 20px 60px ${service.color}18, 0 4px 16px rgba(0,0,0,0.06)`
          : "0 2px 12px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.35s, border-color 0.35s, background 0.35s",
        overflow: "hidden",
        gridColumn: service.featured ? "span 2" : "span 1",
        cursor: "default",
      }}
    >
      {/* Subtle accent stripe */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${service.color}, ${service.color}55)`,
        borderRadius: "24px 24px 0 0",
        opacity: hov ? 1 : 0, transition: "opacity 0.35s",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <motion.div
          animate={hov ? { scale: 1.1, rotate: 6 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: 52, height: 52, borderRadius: 16, fontSize: 24,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: service.lightBg, border: `1.5px solid ${service.lightBorder}`,
          }}
        >{service.emoji}</motion.div>

        <span style={{
          padding: "4px 12px", borderRadius: 999, fontSize: 10, fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: service.color, background: service.lightBg,
          border: `1px solid ${service.lightBorder}`,
        }}>{service.featured ? "Flagship" : "Service"}</span>
      </div>

      <h3 style={{ marginTop: 18, fontSize: 19, fontWeight: 700, color: "#111827" }}>{service.title}</h3>
      <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.8, color: "#6b7280" }}>{service.description}</p>

      <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
        {service.technologies.map((t) => (
          <span key={t} style={{
            padding: "4px 12px", borderRadius: 999,
            background: service.lightBg, border: `1px solid ${service.lightBorder}`,
            color: service.color, fontSize: 11, fontWeight: 600,
          }}>{t}</span>
        ))}
      </div>

      <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        {service.features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#374151" }}>
            <span style={{
              width: 20, height: 20, borderRadius: 6, flexShrink: 0, fontSize: 11,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: service.lightBg, border: `1px solid ${service.lightBorder}`,
              color: service.color, fontWeight: 700,
            }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 22 }}>
        <Link to={CONTACT_HASH} style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 13, fontWeight: 700, color: service.color,
          textDecoration: "none", padding: "8px 16px",
          borderRadius: 999, background: service.lightBg,
          border: `1px solid ${service.lightBorder}`,
          transition: "transform 0.2s",
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
      style={{ display: "flex", gap: 20 }}
    >
      {/* Step indicator */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <motion.div
          whileInView={{ scale: [0.6, 1.1, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: index * 0.1 }}
          style={{
            width: 44, height: 44, borderRadius: 14, zIndex: 1,
            border: `1.5px solid ${step.color}33`,
            background: `linear-gradient(135deg, ${step.color}18, ${step.color}08)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 800, color: step.color,
            fontFamily: "'DM Mono', monospace",
            boxShadow: `0 4px 16px ${step.color}22`,
          }}
        >{step.step}</motion.div>
      </div>

      <motion.div
        whileHover={{ y: -4, boxShadow: `0 16px 48px ${step.color}14` }}
        transition={{ duration: 0.25 }}
        style={{
          flex: 1, padding: "20px 24px", borderRadius: 18,
          border: "1.5px solid #f1f5f9",
          background: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.3s, border-color 0.3s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12, fontSize: 20,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: `${step.color}10`, border: `1px solid ${step.color}25`,
          }}>{step.icon}</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{step.title}</h3>
        </div>
        <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.8, color: "#6b7280" }}>{step.description}</p>
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
      style={{
        padding: 24, borderRadius: 20,
        border: `1.5px solid ${hov ? item.border : "#f1f5f9"}`,
        background: hov ? item.bg : "#fff",
        boxShadow: hov ? `0 16px 40px ${item.color}14` : "0 2px 10px rgba(0,0,0,0.04)",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 13, fontSize: 20,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: item.bg, border: `1.5px solid ${item.border}`,
      }}>{item.icon}</div>
      <h3 style={{ marginTop: 16, fontSize: 15, fontWeight: 700, color: "#111827" }}>{item.title}</h3>
      <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.8, color: "#6b7280" }}>{item.description}</p>
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
      style={{
        borderRadius: 16,
        border: `1.5px solid ${open ? "#bfdbfe" : "#e5e7eb"}`,
        background: open ? "#eff6ff" : "#fff",
        overflow: "hidden",
        transition: "border-color 0.3s, background 0.3s",
        boxShadow: open ? "0 8px 30px rgba(11,99,246,0.08)" : "0 2px 8px rgba(0,0,0,0.03)",
      }}
    >
      <button
        onClick={() => setOpenIndex(open ? null : index)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16,
          padding: "18px 22px", background: "none", border: "none",
          cursor: "pointer", color: "#111827", textAlign: "left",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.5 }}>{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28 }}
          style={{
            flexShrink: 0, width: 32, height: 32, borderRadius: 10,
            border: `1.5px solid ${open ? "#bfdbfe" : "#e5e7eb"}`,
            background: open ? "#dbeafe" : "#f9fafb",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, color: open ? "#0b63f6" : "#6b7280",
            transition: "background 0.3s, border-color 0.3s, color 0.3s",
          }}
        >▾</motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden", borderTop: "1.5px solid #bfdbfe" }}
          >
            <div style={{ padding: "14px 22px 20px", fontSize: 13.5, lineHeight: 1.85, color: "#4b5563" }}>
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
    <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#111827", fontFamily: "'Syne', 'DM Sans', system-ui, sans-serif", overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@500;700&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #bfdbfe; }
        ::-webkit-scrollbar { width: 6px; background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #bfdbfe; border-radius: 3px; }

        .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
        .section { padding: 96px 0; }
        .section-alt { background: #fff; }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 48px;
        }
        @media (max-width: 960px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .featured-span { grid-column: span 2 !important; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; }
          .featured-span { grid-column: span 1 !important; }
        }

        .why-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 32px;
        }
        @media (max-width: 900px) { .why-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px) { .why-grid { grid-template-columns: 1fr; } }

        .stats-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 40px;
        }
        @media (max-width: 640px) { .stats-grid { grid-template-columns: 1fr; } }

        .hero-grid {
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 64px; align-items: center;
        }
        @media (max-width: 860px) { .hero-grid { grid-template-columns: 1fr; } }

        .hero-stats { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }

        .cta-grid {
          display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 48px; align-items: center;
        }
        @media (max-width: 700px) { .cta-grid { grid-template-columns: 1fr; } }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .float { animation: float 5s ease-in-out infinite; }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gradient-text {
          background: linear-gradient(120deg, #0b63f6 0%, #7c3aed 45%, #0b63f6 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
        }
        .dot-live { animation: dot-pulse 2s ease-in-out infinite; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px; border-radius: 999px;
          background: linear-gradient(135deg, #0b63f6, #3b82f6);
          color: #fff; font-weight: 700; font-size: 14px;
          border: none; cursor: pointer; text-decoration: none;
          box-shadow: 0 8px 30px rgba(11,99,246,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: inherit;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(11,99,246,0.4); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px; border-radius: 999px;
          border: 1.5px solid #e5e7eb; background: #fff;
          color: #374151; font-weight: 700; font-size: 14px;
          cursor: pointer; text-decoration: none;
          transition: transform 0.2s, border-color 0.2s, color 0.2s;
          font-family: inherit;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .btn-ghost:hover { transform: translateY(-2px); border-color: #0b63f6; color: #0b63f6; }

        /* Dot grid background */
        .dot-bg {
          background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      {/* ─── BACKGROUND DOTS ─── */}
      <div className="dot-bg" style={{
        position: "fixed", inset: 0, zIndex: -1, opacity: 0.5,
        background: "#f8fafc",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 10% 0%, rgba(11,99,246,0.07) 0%, transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(124,58,237,0.06) 0%, transparent 50%)",
        }} />
        <div className="dot-bg" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
      </div>

      <Navbar />

      <main>
        {/* ─── HERO ─── */}
        <section style={{ padding: "130px 0 80px", position: "relative", overflow: "hidden" }}>
          {/* Soft blobs */}
          <div style={{ position: "absolute", top: -100, left: -150, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(11,99,246,0.1), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.07), transparent 70%)", pointerEvents: "none" }} />

          <div className="container">
            <div className="hero-grid">
              {/* Left col */}
              <motion.div style={{ y: heroY }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}
                >

                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "6px 12px", borderRadius: 999,
                    border: "1.5px solid #e5e7eb", background: "#fff",
                    fontSize: 12, fontWeight: 600, color: "#6b7280",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  }}>📍 Local delivery + remote-friendly</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.1 }}
                  style={{ fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 800, lineHeight: 1.15, color: "#0f172a" }}
                >
                  Premium Web Development Services —{" "}
                  <span className="gradient-text">premium UI, engineering & growth systems.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ marginTop: 20, fontSize: 16, lineHeight: 1.85, color: "#4b5563", maxWidth: 520 }}
                >
                  For clients worldwide, IDR Tech ships modern websites, UI/UX, e-commerce, SEO, and long-term maintenance — with the polish of a high-end SaaS team and the clarity of a boutique studio.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: 12 }}
                >
                  <Link to={CONTACT_HASH} className="btn-primary">Start Your Project →</Link>
                  <a href={CONSULT_MAIL} className="btn-ghost">📅 Book Consultation</a>
                </motion.div>

                {/* Hero stats */}
                <div className="hero-stats">
                  {heroStats.map((s, i) => (
                    <motion.div
                      key={s.l}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 200 }}
                      style={{
                        padding: "12px 18px", borderRadius: 14,
                        border: "1.5px solid #e5e7eb", background: "#fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div style={{ fontSize: 18, fontWeight: 800, color: "#0b63f6", fontFamily: "'DM Mono', monospace" }}>{s.v}</div>
                      <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2 }}>{s.l}</div>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.68, type: "spring" }}
                    style={{
                      padding: "12px 18px", borderRadius: 14,
                      border: "1.5px solid #bfdbfe", background: "#eff6ff",
                      boxShadow: "0 2px 8px rgba(11,99,246,0.08)",
                    }}
                  >
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#3b82f6", letterSpacing: "0.22em", textTransform: "uppercase" }}>Trusted stack</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1e40af", marginTop: 4 }}>React · Next · Node · Figma</div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.15 }}
                className="float"
                style={{ position: "relative" }}
              >
                {/* Glow behind card */}
                <div style={{
                  position: "absolute", inset: -24, borderRadius: 48,
                  background: "radial-gradient(circle, rgba(11,99,246,0.12), rgba(124,58,237,0.07), transparent)",
                  filter: "blur(32px)", zIndex: -1,
                }} />

                <div style={{
                  borderRadius: 28, border: "1.5px solid #e5e7eb",
                  background: "#fff", padding: 4,
                  boxShadow: "0 24px 80px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.05)",
                }}>
                  <div style={{ borderRadius: 24, background: "linear-gradient(160deg, #f8fafc, #fff)", padding: 28 }}>
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.26em", textTransform: "uppercase" }}>Engagement model</div>
                        <div style={{ marginTop: 6, fontSize: 18, fontWeight: 700, color: "#0f172a" }}>Sprint-based delivery</div>
                      </div>
                      <motion.span
                        animate={{ opacity: [1, 0.55, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                          display: "flex", alignItems: "center", gap: 6,
                          padding: "5px 12px", borderRadius: 999, fontSize: 10,
                          fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                          color: "#065f46", background: "#d1fae5", border: "1px solid #a7f3d0",
                        }}
                      >
                        <span className="dot-live" style={{ width: 6, height: 6, borderRadius: "50%", background: "#059669", display: "inline-block" }} />
                        Accepting projects
                      </motion.span>
                    </div>

                    {/* Rows */}
                    <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                      {["Technical discovery", "UI system + build", "Launch + measurement"].map((row, i) => (
                        <motion.div
                          key={row}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          style={{
                            display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                            borderRadius: 12, border: "1.5px solid #f1f5f9", background: "#f8fafc",
                          }}
                        >
                          <div style={{
                            width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                            background: "linear-gradient(135deg, #0b63f6, #3b82f6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 13, color: "#fff",
                            boxShadow: "0 4px 12px rgba(11,99,246,0.3)",
                          }}>✓</div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", flex: 1 }}>{row}</span>
                          <span style={{ color: "#9ca3af", fontSize: 12 }}>↗</span>
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
        <section className="section section-alt">
          <div className="container">
            <motion.div {...fadeUp}>
              <SectionLabel>Capabilities</SectionLabel>
              <h2 style={{ marginTop: 14, fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>
                A premium service suite —<br />engineered like a product team.
              </h2>
              <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.85, color: "#6b7280", maxWidth: 580 }}>
                Each engagement combines design taste, software discipline, and SEO-aware delivery — tuned for competitive categories and growing brands globally.
              </p>
            </motion.div>

            <div className="services-grid">
              {services.map((s, i) => (
                <div key={s.title} className={s.featured ? "featured-span" : ""} style={{ gridColumn: s.featured ? "span 2" : "span 1" }}>
                  <ServiceCard service={s} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="section" style={{ background: "#f8fafc" }}>
          <div className="container">
            <motion.div {...fadeUp}>
              <SectionLabel>Process</SectionLabel>
              <h2 style={{ marginTop: 14, fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>
                A calm, modern delivery timeline —<br />from discovery to launch.
              </h2>
            </motion.div>

            <div style={{ marginTop: 48, position: "relative" }}>
              {/* Connector line */}
              <div style={{
                position: "absolute", left: 21, top: 44, bottom: 44, width: 1,
                background: "linear-gradient(to bottom, #bfdbfe, #ddd6fe, #a7f3d0, #fde68a, #fecaca)",
              }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {processSteps.map((step, i) => (
                  <ProcessStep key={step.title} step={step} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHY US ─── */}
        <section className="section section-alt">
          <div className="container">
            <motion.div {...fadeUp}>
              <SectionLabel>Why IDR Tech</SectionLabel>
              <h2 style={{ marginTop: 14, fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>
                Built for founders who want speed —<br />without sacrificing standards.
              </h2>
            </motion.div>

            {/* Stats */}
            <div ref={statsRef} className="stats-grid">
              {stats.map((s, i) => <StatCounter key={s.label} stat={s} active={statsInView} index={i} />)}
            </div>

            {/* Why cards */}
            <div className="why-grid">
              {whyUs.map((item, i) => <WhyCard key={item.title} item={item} index={i} />)}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="section" style={{ background: "#f8fafc" }}>
          <div className="container">
            <motion.div {...fadeUp}>
              <SectionLabel>FAQ</SectionLabel>
              <h2 style={{ marginTop: 14, fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>
                Answers to the questions teams ask before starting.
              </h2>
              <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.85, color: "#6b7280", maxWidth: 540 }}>
                Straight talk on timelines, tech choices, hosting, redesigns, and pricing — for growing businesses and startups worldwide.
              </p>
            </motion.div>

            <motion.div {...fadeUp} style={{ marginTop: 40, maxWidth: 740, display: "flex", flexDirection: "column", gap: 10 }}>
              {faqs.map((item, i) => (
                <FaqItem key={item.q} item={item} index={i} openIndex={faqOpen} setOpenIndex={setFaqOpen} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section style={{ padding: "80px 0 100px", background: "#fff" }}>
          <div className="container">
            <motion.div
              {...fadeUp}
              style={{
                position: "relative", overflow: "hidden", borderRadius: 32,
                border: "1.5px solid #bfdbfe",
                background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 50%, #ecfdf5 100%)",
                padding: "60px 48px",
                boxShadow: "0 8px 40px rgba(11,99,246,0.08)",
              }}
            >
              {/* Decorative circles */}
              <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(124,58,237,0.08)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(11,99,246,0.07)", pointerEvents: "none" }} />

              <div className="cta-grid">
                <div style={{ position: "relative" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.3em", textTransform: "uppercase" }}>Next step</div>
                  <h2 style={{ marginTop: 10, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>
                    Let's Build Something Amazing Together
                  </h2>
                  <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.85, color: "#4b5563", maxWidth: 440 }}>
                    Tell us about your product, timeline, and market — we'll respond with a focused plan for web development, UI/UX, e-commerce, SEO, and ongoing support for your business.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end", position: "relative" }}>
                  <Link to={CONTACT_HASH} className="btn-primary" style={{ width: "100%", maxWidth: 220, justifyContent: "center" }}>
                    Start Project →
                  </Link>
                  <Link to={CONTACT_HASH} className="btn-ghost" style={{ width: "100%", maxWidth: 220, justifyContent: "center" }}>
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
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 200 }}
      >
        <motion.div whileHover={{ y: -4, scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Link
            to={CONTACT_HASH}
            className="btn-primary"
            style={{
              padding: "12px 22px", fontSize: 13,
              boxShadow: "0 12px 36px rgba(11,99,246,0.35)",
            }}
          >
            ✦ Start a project →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Services;