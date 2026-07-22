import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Activity,
  Database,
  Zap,
  Wrench,
  Search,
  Check,
  AlertTriangle,
  ChevronDown,
  Users,
  Clock,
  Lock,
  Settings,
  Layers,
  ArrowRight,
  X,
  Phone,
  Mail,
  Loader2,
  CheckCircle,
  Server,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  FileText,
  TrendingUp,
  Cpu,
  Globe,
  Terminal,
  Palette,
  Download,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { initiatePayment } from "../../utils/payment";

// Subject options for contact
const subjectOptions = [
  "Website Maintenance AMC",
  "Basic AMC Plan (₹2,999/yr)",
  "Professional AMC Plan (₹7,999/yr)",
  "Enterprise AMC Plan (₹19,999/yr)",
  "Custom AMC Requirements",
  "Additional Support Services",
];

export default function WebsiteMaintenance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "Website Maintenance AMC",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);

  const navigate = useNavigate();
  const { isAuthenticated, user, refreshProfile } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const pendingPlan = sessionStorage.getItem("pending_claim_plan");
      if (pendingPlan) {
        sessionStorage.removeItem("pending_claim_plan");
        handleClaimPlan(pendingPlan);
      }
    }
  }, [isAuthenticated, user]);

  const handleClaimPlan = (planName, price) => {
    if (isAuthenticated) {
      initiatePayment({
        planName,
        user,
        onSuccess: async () => {
          await refreshProfile();
          window.location.href = "/dashboard/subscription";
        },
      });
    } else {
      sessionStorage.setItem("pending_claim_plan", planName);
      toast.error(`Please login or register to claim the ${planName}.`, {
        duration: 4000,
        style: {
          borderRadius: "20px",
          background: "#ffffff",
          color: "#ef4444",
          border: "1px solid #ef444420",
          boxShadow: "0 20px 50px rgba(239,68,68,0.12)",
        },
      });
      navigate("/login", { state: { from: "/website-maintenance" } });
    }
  };

  // Interactive Brochure State
  const [brochurePage, setBrochurePage] = useState(1);

  const handleDownloadPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Popup blocked! Please allow popups to download the PDF.");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>IDRTECH - Website AMC Plan</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #1e293b;
              margin: 0;
              padding: 0;
              background-color: #ffffff;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
              padding: 40px 20px;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #f1f5f9;
              padding-bottom: 20px;
              margin-bottom: 40px;
            }
            .logo-section {
              display: flex;
              align-items: center;
              gap: 15px;
            }
            .logo {
              width: 50px;
              height: 50px;
              border-radius: 12px;
              object-fit: cover;
            }
            .company-name {
              font-size: 20px;
              font-weight: 800;
              color: #12306d;
              margin: 0;
            }
            .company-tag {
              font-size: 11px;
              color: #0b63f6;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              margin: 2px 0 0 0;
            }
            .doc-title {
              text-align: right;
            }
            .doc-title h1 {
              font-size: 22px;
              font-weight: 700;
              color: #12306d;
              margin: 0;
            }
            .doc-title p {
              font-size: 12px;
              color: #64748b;
              margin: 5px 0 0 0;
            }
            .section-title {
              font-size: 16px;
              font-weight: 700;
              color: #12306d;
              border-left: 4px solid #0b63f6;
              padding-left: 10px;
              margin-top: 30px;
              margin-bottom: 15px;
            }
            .plan-grid {
              display: grid;
              grid-template-cols: repeat(3, 1fr);
              gap: 15px;
              margin-bottom: 30px;
            }
            .plan-card {
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              padding: 20px;
              background-color: #f8fafc;
            }
            .plan-card.popular {
              border-color: #2563eb;
              background-color: #eff6ff;
            }
            .plan-name {
              font-size: 16px;
              font-weight: 700;
              color: #12306d;
              margin: 0;
            }
            .plan-price {
              font-size: 22px;
              font-weight: 800;
              color: #0b63f6;
              margin: 10px 0;
            }
            .plan-desc {
              font-size: 11px;
              color: #64748b;
              line-height: 1.5;
            }
            .table-container {
              margin-bottom: 35px;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              overflow: hidden;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              text-align: left;
              font-size: 12px;
            }
            th {
              background-color: #f1f5f9;
              color: #475569;
              font-weight: 700;
              padding: 12px 15px;
            }
            td {
              padding: 10px 15px;
              border-bottom: 1px solid #e2e8f0;
              color: #334155;
            }
            tr:last-child td {
              border-bottom: none;
            }
            .font-bold {
              font-weight: 700;
            }
            .text-emerald {
              color: #16a34a;
            }
            .text-blue {
              color: #2563eb;
            }
            .badge-active {
              background-color: #dcfce7;
              color: #16a54a;
              padding: 2px 6px;
              border-radius: 4px;
              font-weight: 600;
            }
            .alert-box {
              background-color: #fffbeb;
              border: 1px solid #fde68a;
              border-radius: 12px;
              padding: 15px;
              margin-bottom: 30px;
              font-size: 11px;
              color: #92400e;
              line-height: 1.5;
            }
            .alert-box strong {
              color: #78350f;
            }
            .footer-contact {
              display: grid;
              grid-template-cols: 1fr 1fr;
              gap: 20px;
              border-top: 2px solid #f1f5f9;
              padding-top: 20px;
              margin-top: 40px;
              font-size: 12px;
              color: #64748b;
            }
            .contact-info {
              font-weight: 600;
              color: #1e293b;
              margin-top: 5px;
            }
            .no-print-btn {
              position: fixed;
              bottom: 20px;
              right: 20px;
              background-color: #0b63f6;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 30px;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              box-shadow: 0 4px 12px rgba(11, 99, 246, 0.3);
              transition: all 0.2s;
            }
            .no-print-btn:hover {
              background-color: #0256d9;
              transform: translateY(-2px);
            }
            @media print {
              .no-print-btn {
                display: none;
              }
              body {
                background-color: #ffffff;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              .container {
                padding: 20px 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-section">
                <img src="/IDR.jpeg" class="logo" alt="IDR Tech logo">
                <div>
                  <h2 class="company-name">IDRTECH</h2>
                  <p class="company-tag">Web Development & Maintenance</p>
                </div>
              </div>
              <div class="doc-title">
                <h1>Annual Maintenance Contract</h1>
                <p>Official Outline & Pricing Plans</p>
              </div>
            </div>

            <div class="alert-box">
              <strong>Important Scope Alert:</strong> Payment excludes core development of new features, payment configurations, redesigns, hosting fees, and domains. All plans are paid 100% in advance.
            </div>

            <div class="section-title">Maintenance Plans Overview</div>
            <div class="plan-grid">
              <div class="plan-card">
                <h3 class="plan-name">Basic Plan</h3>
                <div class="plan-price">₹2,999<span style="font-size: 11px; font-weight: normal; color: #64748b;"> / year</span></div>
                <p class="plan-desc">Best suited for static website requiring basic updates, security, and regular backups.</p>
              </div>
              <div class="plan-card popular" style="border: 2px solid #2563eb;">
                <div style="background-color: #2563eb; color: white; font-size: 8px; font-weight: bold; text-align: center; text-transform: uppercase; padding: 2px 0; border-radius: 4px; margin-bottom: 5px; letter-spacing: 0.05em;">Most Popular</div>
                <h3 class="plan-name">Professional Plan</h3>
                <div class="plan-price">₹7,999<span style="font-size: 11px; font-weight: normal; color: #64748b;"> / year</span></div>
                <p class="plan-desc">Designed for WordPress/CMS website requiring frequent backups, plugin updates, and database optimization.</p>
              </div>
              <div class="plan-card">
                <h3 class="plan-name">Enterprise Plan</h3>
                <div class="plan-price">₹19,999<span style="font-size: 11px; font-weight: normal; color: #64748b;"> / year</span></div>
                <p class="plan-desc">For e-commerce portals and custom website needing 24x7 monitoring, priority support, and unlimited content updates.</p>
              </div>
            </div>

            <div class="section-title">Detailed Features Comparison</div>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Features</th>
                    <th>Basic Plan</th>
                    <th>Professional Plan</th>
                    <th>Enterprise Plan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="font-bold">Suitable For</td>
                    <td>Static Website</td>
                    <td>WordPress/CMS Website</td>
                    <td>E-commerce & Custom Website</td>
                  </tr>
                  <tr>
                    <td class="font-bold">Health Monitoring</td>
                    <td>Active</td>
                    <td>Active</td>
                    <td>24×7 Monitoring</td>
                  </tr>
                  <tr>
                    <td class="font-bold">Bug Fixing Support</td>
                    <td>Standard Support</td>
                    <td>Standard Support</td>
                    <td>Priority Resolution</td>
                  </tr>
                  <tr>
                    <td class="font-bold">Security Updates</td>
                    <td>Monthly</td>
                    <td>Monthly</td>
                    <td>Weekly</td>
                  </tr>
                  <tr>
                    <td class="font-bold">Website Backup</td>
                    <td>Monthly</td>
                    <td>Weekly</td>
                    <td>Daily</td>
                  </tr>
                  <tr>
                    <td class="font-bold">CMS/Plugin Updates</td>
                    <td>-</td>
                    <td>Included</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td class="font-bold">Database Optimization</td>
                    <td>-</td>
                    <td>Monthly</td>
                    <td>Weekly</td>
                  </tr>
                  <tr>
                    <td class="font-bold">Content Updates</td>
                    <td>2 Updates / month</td>
                    <td>5 Updates / month</td>
                    <td>Unlimited Updates*</td>
                  </tr>
                  <tr>
                    <td class="font-bold">Support Channels</td>
                    <td>Email (24h response)</td>
                    <td>WhatsApp + Email (8h response)</td>
                    <td>Priority Call + WhatsApp (2h response)</td>
                  </tr>
                  <tr>
                    <td class="font-bold">Reporting</td>
                    <td>-</td>
                    <td>Monthly Report</td>
                    <td>Detailed Analytics Report</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="section-title">Terms & Conditions</div>
            <ul style="font-size: 11px; color: #475569; line-height: 1.6; padding-left: 20px;">
              <li>Contract is valid for exactly 12 months from the start date.</li>
              <li>100% advance payment is required for contract activation.</li>
              <li>Any tasks outside the defined plan scope will be billed separately at custom project rates.</li>
              <li>Service response times are based on operational business hours.</li>
            </ul>

            <div class="footer-contact">
              <div>
                <strong>IDRTECH Contact Information:</strong>
                <div class="contact-info">Email: idrtech23@gmail.com</div>
                <div class="contact-info">Phone: +91 97148 33771</div>
              </div>
              <div style="text-align: right;">
                <br>
                <div style="font-size: 11px; color: #94a3b8;">Document Generated: ${new Date().toLocaleDateString()}</div>
                <div style="font-weight: 700; color: #12306d; margin-top: 5px;">IDRTECH</div>
              </div>
            </div>
          </div>
          
          <button class="no-print-btn" onclick="window.print()">Print / Save as PDF</button>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Handle plan CTA click
  const openQuoteModal = (planName = "", price = "") => {
    setSelectedPlan(planName);
    setFormData((prev) => ({
      ...prev,
      subject: planName ? `${planName} AMC Inquiry` : "Website Maintenance AMC",
      message: planName
        ? `Hi IDRTech team,\n\nI am interested in your ${planName} Plan (${price}). Please share a detailed quote and onboarding details for our website.`
        : "",
    }));
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      let baseUrlRaw = import.meta.env.VITE_API_BASE;
      if (!baseUrlRaw) {
        baseUrlRaw =
          window.location.hostname === "localhost"
            ? "http://localhost:4000"
            : "https://www.idrtech.in";
      }
      const baseUrl = baseUrlRaw.replace(/^"(.*)"$/, "$1").replace(/\/$/, "");

      const response = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        toast.success(
          "Quote request sent successfully! We'll get back to you soon.",
          {
            duration: 5000,
            style: {
              borderRadius: "20px",
              background: "#ffffff",
              color: "#12306d",
              border: "1px solid #0b63f620",
              boxShadow: "0 20px 50px rgba(11,99,246,0.12)",
            },
          },
        );
        setTimeout(() => {
          setIsModalOpen(false);
          setStatus("idle");
          setFormData({
            name: "",
            email: "",
            mobile: "",
            subject: "Website Maintenance AMC",
            message: "",
          });
        }, 1500);
      } else {
        setStatus("error");
        const err =
          data.message || "Failed to submit quote request. Please try again.";
        setErrorMessage(err);
        toast.error(err);
      }
    } catch (err) {
      setStatus("error");
      const msg = "Connection failed. Please check your network and try again.";
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-canvas overflow-x-hidden text-slate-900 font-sans selection:bg-blue-500/10 selection:text-blue-600">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#eff6ff] via-white to-white" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-orange-300/15 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="md:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 font-semibold text-xs tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Annual Maintenance Contracts (AMC)
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#12306d] leading-none">
                IDRTech Website Annual{" "}
                <span className="text-gradient-shimmer">
                  Maintenance Contract (AMC)
                </span>
              </h1>

              <h2 className="text-xl md:text-2xl font-bold text-blue-600">
                Reliable Website Maintenance & Support – Development Charges
                Separate
              </h2>

              <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
                At IDRTech, we believe your website should remain secure,
                updated, and high-performing throughout the year. Our AMC keeps
                your system running smoothly after launch.
              </p>

              {/* Highlight Exclusions clearly */}
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-amber-800 text-sm max-w-xl">
                <span className="font-bold flex items-center gap-1.5 text-amber-700">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Service Scope Definition:
                </span>
                Please note that website design, development, redesign, and new
                feature development are not included in AMC and are quoted
                separately.
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => openQuoteModal()}
                  className="brand-btn-primary group"
                >
                  Get AMC Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#amc-pricing-plans"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("amc-pricing-plans")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="brand-btn-secondary"
                >
                  View Plans
                </a>
              </div>
            </div>

            {/* Right Dashboard Visual Column */}
            <div className="md:col-span-5 relative mt-8 md:mt-0">
              <div className="relative mx-auto max-w-[450px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-orange-400 rounded-3xl opacity-20 blur-xl transform rotate-6 scale-105" />

                {/* Main Interactive Glassmorphism Dashboard Layout */}
                <div className="relative glass-panel rounded-3xl p-6 border border-white/60 shadow-2xl backdrop-blur-xl">
                  {/* Dashboard Header Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400 block" />
                      <span className="w-3 h-3 rounded-full bg-amber-400 block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-400 block" />
                      <span className="text-[11px] font-mono text-slate-400 ml-2">
                        idrtech-monitor.config
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping mr-1 inline-block" />
                      Uptime Monitor
                    </div>
                  </div>

                  {/* Graphic Display: Circular Uptime Indicator */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="p-4 rounded-2xl bg-white/70 border border-white/40 shadow-sm flex flex-col justify-between">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-semibold">
                          Uptime Status
                        </span>
                        <Activity className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="mt-3 text-left">
                        <span className="text-2xl font-bold text-[#12306d]">
                          99.9%
                        </span>
                        <p className="text-[10px] text-emerald-600 font-bold mt-1">
                          Excellent (Active)
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/70 border border-white/40 shadow-sm flex flex-col justify-between">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-semibold">
                          Security Shield
                        </span>
                        <Shield className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="mt-3 text-left">
                        <span className="text-2xl font-bold text-[#12306d]">
                          Active
                        </span>
                        <p className="text-[10px] text-orange-500 font-bold mt-1">
                          Protected
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Core Metrics: Performance Score */}
                  <div className="p-4 rounded-2xl bg-white/80 border border-white/40 shadow-sm mb-5 text-left">
                    <div className="flex items-center justify-between text-slate-400 mb-3">
                      <span className="text-xs font-semibold">
                        Performance Score
                      </span>
                      <Zap className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="28"
                            cy="28"
                            r="24"
                            stroke="#f1f5f9"
                            strokeWidth="4"
                            fill="transparent"
                          />
                          <circle
                            cx="28"
                            cy="28"
                            r="24"
                            stroke="#2563eb"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray="150"
                            strokeDashoffset="10"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute text-xs font-bold text-[#12306d]">
                          99%
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-bold text-[#12306d]">
                          Load Time: 0.7s
                        </span>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Optimized with server caching.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating visual items */}
                  {/* Security Shield */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-6 -left-6 bg-white border border-blue-100 rounded-2xl p-3 shadow-lg flex items-center gap-2.5 z-10 text-left"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-100/80 flex items-center justify-center text-blue-600">
                      <Shield className="w-4.5 h-4.5 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold leading-none">
                        Security Core
                      </p>
                      <p className="text-xs font-bold text-[#12306d] mt-1">
                        Updates Regular
                      </p>
                    </div>
                  </motion.div>

                  {/* Floating Sync Backup */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute -bottom-6 -right-6 bg-white border border-orange-100 rounded-2xl p-3 shadow-lg flex items-center gap-2.5 z-10 text-left"
                  >
                    <div className="w-8 h-8 rounded-xl bg-orange-100/80 flex items-center justify-center text-orange-600">
                      <Database
                        className="w-4.5 h-4.5 animate-spin"
                        style={{ animationDuration: "10s" }}
                      />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold leading-none">
                        Backup Safe
                      </p>
                      <p className="text-xs font-bold text-[#12306d] mt-1">
                        Multi-server Sync
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics Section */}
      <section className="py-12 bg-slate-50 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center justify-center">
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-extrabold text-[#12306d] tracking-tight">
                100+
              </p>
              <p className="text-sm font-semibold text-slate-500">
                Websites Maintained
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-extrabold text-[#12306d] tracking-tight">
                99.9%
              </p>
              <p className="text-sm font-semibold text-slate-500">
                Uptime Record
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-extrabold text-[#12306d] tracking-tight">
                24/7
              </p>
              <p className="text-sm font-semibold text-slate-500">
                Uptime Monitoring
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-extrabold text-[#12306d] tracking-tight">
                Fast
              </p>
              <p className="text-sm font-semibold text-slate-500">
                SLA Response Times
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/40">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-40">
              <span className="text-sm font-bold tracking-wider text-slate-500 font-mono">
                REACT
              </span>
              <span className="text-sm font-bold tracking-wider text-slate-500 font-mono">
                NEXT.JS
              </span>
              <span className="text-sm font-bold tracking-wider text-slate-500 font-mono">
                WORDPRESS
              </span>
              <span className="text-sm font-bold tracking-wider text-slate-500 font-mono">
                SHOPIFY
              </span>
              <span className="text-sm font-bold tracking-wider text-slate-500 font-mono">
                PHP
              </span>
              <span className="text-sm font-bold tracking-wider text-slate-500 font-mono">
                NODE.JS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Website Maintenance Matters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <span className="section-eyebrow">Prevent Disasters</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#12306d]">
              Why Website Maintenance?
            </h2>
            <p className="text-slate-600">
              Unmaintained code and configurations degrade performance and
              create security risks. Professional care maintains continuous
              uptime.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Website Security",
                desc: "Prevent core vulnerabilities, injection risks, and malware payloads with proactive patching.",
                icon: Shield,
                bg: "bg-blue-50 text-blue-600",
              },
              {
                title: "Regular Backups",
                desc: "Scheduled automated database and assets backup runs with rapid restoration paths.",
                icon: Database,
                bg: "bg-orange-50 text-orange-600",
              },
              {
                title: "Faster Performance",
                desc: "Compiling assets, reducing code bloat, and server tweaks for fast loading speeds.",
                icon: Zap,
                bg: "bg-amber-50 text-amber-600",
              },
              {
                title: "Technical Support",
                desc: "Direct developer access to solve DNS updates, hosting failures, and configuration questions.",
                icon: Wrench,
                bg: "bg-indigo-50 text-indigo-600",
              },
              {
                title: "High Uptime",
                desc: "Uptime checks running constantly to identify server failures before users experience them.",
                icon: Activity,
                bg: "bg-emerald-50 text-emerald-600",
              },
              {
                title: "Bug Fixes",
                desc: "Fixing layout shifts, broken links, script clashes, and forms failures as they emerge.",
                icon: Search,
                bg: "bg-rose-50 text-rose-600",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl bg-slate-50 border border-slate-100 text-left hover:bg-white hover:shadow-xl hover:border-blue-500/20 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#12306d] mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMC Pricing Section */}
      <section
        id="amc-pricing-plans"
        className="py-20 bg-slate-50 border-y border-slate-200/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <span className="section-eyebrow">Select a Plan</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#12306d]">
              Website Maintenance Plans
            </h2>
            <p className="text-slate-600">
              Choose the standard Annual Contract tier suited for your system
              scale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Basic Maintenance */}
            <div className="flex flex-col p-8 rounded-3xl bg-white border border-slate-200/80 text-left relative shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#12306d]">
                  Basic Maintenance
                </h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                  Suitable for: Static Website
                </p>
              </div>

              <div className="mb-6 border-y border-slate-100 py-4">
                <p className="text-slate-400 text-xs">Annual Charges</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-[#12306d]">
                    ₹2,999
                  </span>
                  <span className="text-slate-400 text-xs">/ year</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Paid in Advance
                </p>
              </div>

              <div className="space-y-4 flex-1 mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Core Features
                </p>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Website Health Monitoring</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Routine Bug Fixing</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Monthly Security Updates</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Monthly Backups</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>2 Content Updates / month</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Email Support (24h Response)</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-slate-400">
                    <X className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                    <span className="line-through">CMS/Plugin Updates</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-slate-400">
                    <X className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                    <span className="line-through">Database Optimization</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() =>
                  handleClaimPlan("Basic Maintenance", "₹2,999/yr")
                }
                className="brand-btn-secondary w-full text-center"
              >
                Claim Plan
              </button>
            </div>

            {/* Professional Maintenance */}
            <div className="flex flex-col p-8 rounded-3xl bg-white border-2 border-blue-600 text-left relative shadow-lg hover:shadow-xl transition-all scale-100 md:scale-105 z-10">
              <span className="absolute -top-3.5 right-6 bg-blue-600 text-white text-[10px] uppercase font-bold tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                Most Popular
              </span>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#12306d]">
                  Professional Maintenance
                </h3>
                <p className="text-xs text-blue-600 mt-1 uppercase tracking-wider font-semibold">
                  Suitable for: WordPress/CMS Website
                </p>
              </div>

              <div className="mb-6 border-y border-slate-100 py-4">
                <p className="text-slate-400 text-xs">Annual Charges</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-[#12306d]">
                    ₹7,999
                  </span>
                  <span className="text-slate-400 text-xs">/ year</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Paid in Advance
                </p>
              </div>

              <div className="space-y-4 flex-1 mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Core Features
                </p>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Website Health Monitoring</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Routine Bug Fixing</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Monthly Security Updates</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-700">
                      Weekly Backups
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-700">
                      CMS/Plugin Updates
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Monthly Database Optimization</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-700">
                      5 Content Updates / month
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>WhatsApp + Email (8h Response)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Monthly Maintenance Report</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() =>
                  handleClaimPlan("Professional Maintenance", "₹7,999/yr")
                }
                className="brand-btn-primary w-full text-center"
              >
                Claim Plan
              </button>
            </div>

            {/* Enterprise Maintenance */}
            <div className="flex flex-col p-8 rounded-3xl bg-white border border-slate-200/80 text-left relative shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#12306d]">
                  Enterprise Maintenance
                </h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                  Suitable for: E-commerce & Custom Website
                </p>
              </div>

              <div className="mb-6 border-y border-slate-100 py-4">
                <p className="text-slate-400 text-xs">Annual Charges</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-[#12306d]">
                    ₹19,999
                  </span>
                  <span className="text-slate-400 text-xs">/ year</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Paid in Advance
                </p>
              </div>

              <div className="space-y-4 flex-1 mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Core Features
                </p>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-700">
                      24x7 Health Monitoring
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-700">
                      Priority Bug Fixing
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Weekly Security Patches</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-700">
                      Daily Cloud Backups
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>CMS/Plugin Updates</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Weekly Database Optimization</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-700">
                      Unlimited Content Updates*
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Priority Call + WhatsApp (2h Response)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Detailed Analytics Report</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() =>
                  handleClaimPlan("Enterprise Maintenance", "₹19,999/yr")
                }
                className="brand-btn-secondary w-full text-center"
              >
                Claim Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="section-eyebrow">Comparison Table</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#12306d]">
              Plan Features Breakdown
            </h2>
            <p className="text-slate-600">
              Review a side-by-side technical feature breakdown to decide which
              package aligns with your website.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm max-w-5xl mx-auto">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-5 font-bold text-slate-600 text-sm">
                    Features
                  </th>
                  <th className="p-5 font-bold text-slate-700 text-sm">
                    Basic Plan
                  </th>
                  <th className="p-5 font-bold text-blue-600 text-sm bg-blue-50/40">
                    Professional Plan
                  </th>
                  <th className="p-5 font-bold text-slate-700 text-sm">
                    Enterprise Plan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {/* Annual Charges */}
                <tr className="hover:bg-slate-50/50 transition-colors font-bold text-slate-900 bg-slate-50/10">
                  <td className="p-5">Annual Charges</td>
                  <td className="p-5">₹2,999</td>
                  <td className="p-5 text-blue-600 bg-blue-50/20">₹7,999</td>
                  <td className="p-5">₹19,999</td>
                </tr>

                {/* Suitable For */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700">
                    Suitable For
                  </td>
                  <td className="p-5 text-slate-500">Static Website</td>
                  <td className="p-5 font-semibold text-blue-600 bg-blue-50/20">
                    WordPress/CMS Website
                  </td>
                  <td className="p-5 text-slate-500">
                    E-commerce & Custom Website
                  </td>
                </tr>

                {/* Website Health Monitoring */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700">
                    Health Monitoring
                  </td>
                  <td className="p-5 text-emerald-600">✅ Active</td>
                  <td className="p-5 font-semibold text-emerald-600 bg-blue-50/20">
                    ✅ Active
                  </td>
                  <td className="p-5 text-emerald-600 font-bold">
                    24×7 Monitoring
                  </td>
                </tr>

                {/* Bug Fixes */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700">
                    Bug Fixing Support
                  </td>
                  <td className="p-5 text-emerald-600">✅ Standard</td>
                  <td className="p-5 font-semibold text-emerald-600 bg-blue-50/20">
                    ✅ Standard
                  </td>
                  <td className="p-5 text-blue-600 font-bold">
                    Priority Resolution
                  </td>
                </tr>

                {/* Security updates */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700">
                    Security Updates
                  </td>
                  <td className="p-5 text-slate-500">Monthly</td>
                  <td className="p-5 font-semibold text-blue-600 bg-blue-50/20">
                    Monthly
                  </td>
                  <td className="p-5 text-slate-500">Weekly</td>
                </tr>

                {/* Backup */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700">
                    Website Backup
                  </td>
                  <td className="p-5 text-slate-500">Monthly</td>
                  <td className="p-5 font-semibold text-blue-600 bg-blue-50/20">
                    Weekly
                  </td>
                  <td className="p-5 text-slate-500">Daily</td>
                </tr>

                {/* CMS/Plugin Updates */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700">
                    CMS/Plugin Updates
                  </td>
                  <td className="p-5 text-rose-500">❌ Not Included</td>
                  <td className="p-5 font-semibold text-emerald-600 bg-blue-50/20">
                    ✅ Included
                  </td>
                  <td className="p-5 text-emerald-600 font-bold">
                    ✅ Included
                  </td>
                </tr>

                {/* Database Optimization */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700">
                    Database Optimization
                  </td>
                  <td className="p-5 text-rose-500">❌ Not Included</td>
                  <td className="p-5 font-semibold text-blue-600 bg-blue-50/20">
                    Monthly
                  </td>
                  <td className="p-5 text-slate-500">Weekly</td>
                </tr>

                {/* Minor Content Updates */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700">
                    Minor Content Updates
                  </td>
                  <td className="p-5 text-slate-500">2 / month</td>
                  <td className="p-5 font-semibold text-blue-600 bg-blue-50/20">
                    5 / month
                  </td>
                  <td className="p-5 text-slate-800 font-bold">Unlimited*</td>
                </tr>

                {/* Performance Optimization */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700">
                    Performance Optimization
                  </td>
                  <td className="p-5 text-slate-500">Basic</td>
                  <td className="p-5 font-semibold text-blue-600 bg-blue-50/20">
                    Advanced
                  </td>
                  <td className="p-5 text-slate-500">Premium</td>
                </tr>

                {/* Support Channel */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700">
                    Support Channels
                  </td>
                  <td className="p-5 text-slate-500">Email</td>
                  <td className="p-5 font-semibold text-blue-600 bg-blue-50/20">
                    WhatsApp + Email
                  </td>
                  <td className="p-5 text-slate-500">
                    Priority Phone + WhatsApp
                  </td>
                </tr>

                {/* Response SLA */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700">
                    Response Time SLA
                  </td>
                  <td className="p-5 text-slate-500">24 Hours</td>
                  <td className="p-5 font-semibold text-blue-600 bg-blue-50/20">
                    8 Hours
                  </td>
                  <td className="p-5 text-slate-500 font-bold">2 Hours</td>
                </tr>

                {/* Monthly Report */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-semibold text-slate-700">
                    Monthly Report
                  </td>
                  <td className="p-5 text-rose-500">❌ Not Included</td>
                  <td className="p-5 font-semibold text-emerald-600 bg-blue-50/20">
                    ✅ Included
                  </td>
                  <td className="p-5 text-slate-500">Detailed Report</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Scope Grid: What's Included vs. What's NOT Included */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Checklist - Included */}
            <div className="glass-panel p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm text-left space-y-6">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                  Scope of Coverage
                </span>
                <h3 className="text-2xl font-bold text-[#12306d] mt-1">
                  What is Included in AMC
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Covered under your standard annual contract
                </p>
              </div>

              <div className="grid sm:grid-cols-1 gap-4 text-slate-700 font-semibold text-sm">
                {[
                  "Website health monitoring",
                  "Bug fixing & script troubleshooting",
                  "Security updates & patch integrations",
                  "Backup & Restoration support",
                  "Website speed and runtime optimization",
                  "Plugin/CMS updates (for Dynamic plans)",
                  "Broken link checking & cleanup",
                  "Minor text and image configuration changes",
                  "Technical email or chat query support",
                  "Website uptime monitoring check runs",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Warning - Excluded */}
            <div className="glass-panel p-8 rounded-3xl bg-white border border-rose-100 shadow-sm text-left space-y-6">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                  Exclusions
                </span>
                <h3 className="text-2xl font-bold text-[#12306d] mt-1">
                  What is NOT Included
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Development tasks handled as separate projects
                </p>
              </div>

              <div className="grid sm:grid-cols-1 gap-4 text-slate-700 font-semibold text-sm">
                {[
                  "New Website Development",
                  "Full-scale Website Redesign",
                  "Designing or adding New Pages",
                  "Programming New Features or Modules",
                  "Payment Gateway Integrations",
                  "Third-party API Integrations",
                  "Custom Software/Backend Programming",
                  "Web Hosting Charges",
                  "Domain Registration or Renewal Charges",
                  "SSL Certificate Charges",
                  "Third-party Plugin or License Fees",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                      <X className="w-3.5 h-3.5 text-rose-600" />
                    </div>
                    <span className="text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Add-on Services (Charged Separately)
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <span className="section-eyebrow">Extra Operations</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#12306d]">
              Additional Services
            </h2>
            <p className="text-slate-600">
              We offer custom-project support for tasks outside the AMC contract
              bounds.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                title: "New Page Design",
                price: "₹2,000",
                label: "Starting Price",
                icon: Layers,
              },
              {
                title: "New Features",
                price: "As Per Scope",
                label: "Requirement-driven",
                icon: Cpu,
              },
              {
                title: "UI/UX Redesign",
                price: "Custom Quote",
                label: "Tailored Scope",
                icon: Palette,
              },
              {
                title: "Website Migration",
                price: "₹5,000",
                label: "Flat Migration Rate",
                icon: Globe,
              },
              {
                title: "Hosting Setup",
                price: "₹3,000",
                label: "Configuration & DNS",
                icon: Server,
              },
              {
                title: "Server Configuration",
                price: "₹5,000",
                label: "Apache/Nginx/Docker Tuning",
                icon: Terminal,
              },
              {
                title: "SEO Services",
                price: "Custom Package",
                label: "Auditing & Optimizations",
                icon: TrendingUp,
              },
            ].map((srv, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    <srv.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#12306d]">
                    {srv.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {srv.label}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/50">
                  <span className="text-lg font-extrabold text-[#12306d]">
                    {srv.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Interactive Brochure Flip-Previewer Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/40 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-12 space-y-5">
            <span className="section-eyebrow">Brochure Guide</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#12306d]">
              Digital AMC Brochure Preview
            </h2>
            <p className="text-slate-600">
              Flip through the official contract outline pages right on your
              screen.
            </p>
            <div className="pt-2">
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold shadow-md transition-all cursor-pointer hover:shadow-lg"
              >
                <Download className="w-4.5 h-4.5" /> Download Full Plan (PDF)
              </button>
            </div>
          </div>

          {/* Brochure Binder Box */}
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl relative min-h-[460px] flex flex-col justify-between">
            {/* Pagination Tabs */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setBrochurePage(page)}
                  className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                    brochurePage === page
                      ? "bg-[#12306d] text-white shadow-sm"
                      : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  Page {page}
                </button>
              ))}
            </div>

            {/* Slides Panel */}
            <div className="flex-1 flex flex-col justify-center items-center py-4">
              <AnimatePresence mode="wait">
                {brochurePage === 1 && (
                  <motion.div
                    key="p1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6 text-center max-w-lg"
                  >
                    <div className="flex justify-center">
                      <div className="h-16 w-16 overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white p-1">
                        <img
                          src="/IDR.jpeg"
                          alt="IDR Tech Logo"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0b63f6]">
                        IDRTech Studio
                      </p>
                      <h3 className="text-3xl font-extrabold text-[#12306d]">
                        Website Annual Maintenance Contract (AMC)
                      </h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Your premium post-development guide to website health,
                      security checking, data safety, and optimizations.
                    </p>
                    <div className="inline-block p-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full w-32 h-1 mx-auto" />
                  </motion.div>
                )}

                {brochurePage === 2 && (
                  <motion.div
                    key="p2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6 text-left max-w-xl"
                  >
                    <h4 className="text-xl font-bold text-[#12306d] border-b pb-2">
                      Why Website Maintenance Matters?
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <h5 className="font-bold text-sm text-[#12306d] flex items-center gap-1.5">
                          <Shield className="w-4 h-4 text-blue-500" /> Website
                          Security
                        </h5>
                        <p className="text-xs text-slate-500">
                          Regular firewall checks and patch configurations keep
                          malicious injections blocked.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-bold text-sm text-[#12306d] flex items-center gap-1.5">
                          <Database className="w-4 h-4 text-orange-500" />{" "}
                          Regular Backups
                        </h5>
                        <p className="text-xs text-slate-500">
                          Scheduled asset archives synced directly to secondary
                          host backups.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-bold text-sm text-[#12306d] flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-amber-500" /> Speed
                          Performance
                        </h5>
                        <p className="text-xs text-slate-500">
                          Asset compression keeps pages loading under standard
                          1.5s benchmarks.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-bold text-sm text-[#12306d] flex items-center gap-1.5">
                          <Activity className="w-4 h-4 text-emerald-500" /> Bug
                          Fixes
                        </h5>
                        <p className="text-xs text-slate-500">
                          Clean resolve paths for script clashes, form
                          submission issues, or server leaks.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {brochurePage === 3 && (
                  <motion.div
                    key="p3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 text-left w-full max-w-xl"
                  >
                    <h4 className="text-xl font-bold text-[#12306d] border-b pb-2">
                      Plan Pricing & Exclusions
                    </h4>

                    <div className="grid grid-cols-3 gap-2.5 text-center">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-xs font-semibold text-slate-500">
                          Basic
                        </span>
                        <p className="text-base font-extrabold text-[#12306d] mt-1">
                          ₹2,999/yr
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 relative">
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[7px] font-bold uppercase px-1 rounded">
                          POPULAR
                        </span>
                        <span className="text-xs font-semibold text-blue-700">
                          Professional
                        </span>
                        <p className="text-base font-extrabold text-blue-600 mt-1">
                          ₹7,999/yr
                        </p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-xs font-semibold text-slate-500">
                          Enterprise
                        </span>
                        <p className="text-base font-extrabold text-[#12306d] mt-1">
                          ₹19,999/yr
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-800">
                      <span className="font-bold block">
                        Important Scope Alert:
                      </span>
                      Payment excludes core development of new features, payment
                      configurations, redesigns, hosting fees, and domains.
                    </div>
                  </motion.div>
                )}

                {brochurePage === 4 && (
                  <motion.div
                    key="p4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 text-left max-w-lg w-full"
                  >
                    <h4 className="text-xl font-bold text-[#12306d] border-b pb-2">
                      Contact & Onboarding Terms
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-500 font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#12306d] rounded-full shrink-0" />{" "}
                        Contract valid for 12 months.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#12306d] rounded-full shrink-0" />{" "}
                        100% advance payments required.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#12306d] rounded-full shrink-0" />{" "}
                        Outside scope tasks billed separately.
                      </li>
                    </ul>

                    <div className="p-4 rounded-2xl bg-[#12306d] text-white flex items-center justify-between gap-4 mt-2">
                      <div className="space-y-1">
                        <p className="text-xs text-blue-300 font-semibold leading-none">
                          Let&apos;s keep it running smoothly
                        </p>
                        <p className="text-sm font-bold mt-1">
                          Email: idrtech23@gmail.com
                        </p>
                        <p className="text-sm font-bold">
                          Call: +91 97148 33771
                        </p>
                      </div>
                      <div className="w-14 h-14 bg-white rounded-xl p-1 flex items-center justify-center shrink-0 shadow-inner">
                        {/* Mock QR Code block */}
                        <div className="grid grid-cols-4 gap-0.5 w-full h-full opacity-80">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div
                              key={i}
                              className={`rounded-sm ${i % 3 === 0 || i % 5 === 1 ? "bg-slate-900" : "bg-transparent"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
              <button
                disabled={brochurePage === 1}
                onClick={() => setBrochurePage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-500"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Page
              </button>
              <button
                disabled={brochurePage === 4}
                onClick={() => setBrochurePage((p) => Math.min(4, p + 1))}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12306d] hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-500"
              >
                Next Page
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AMC Terms Section */}
      <section className="py-20 bg-white border-t border-slate-200/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="section-eyebrow">Terms & Policy</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#12306d]">
              AMC Contract Terms
            </h2>
            <p className="text-slate-600">
              Please review our standard operational conditions for all annual
              maintenance tasks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            {[
              {
                num: "01",
                title: "Validity Duration",
                desc: "Each AMC contract remains valid for exactly 12 months starting from the activation date.",
              },
              {
                num: "02",
                title: "Payment Terms",
                desc: "100% advance payment is required for plan activation and resource allocations.",
              },
              {
                num: "03",
                title: "Activation Period",
                desc: "The contract starts from the activation date following database and credentials audits.",
              },
              {
                num: "04",
                title: "Scope Boundary",
                desc: "Any technical support work outside the AMC contract bounds will be quoted separately.",
              },
              {
                num: "05",
                title: "Major Requests",
                desc: "Major website development and programming requests are handled as separate projects.",
              },
              {
                num: "06",
                title: "Fair Use Policy",
                desc: "Unlimited minor text & image updates under the Enterprise tier are subject to standard fair use guidelines.",
              },
            ].map((term, idx) => (
              <div
                key={idx}
                className="flex gap-4 items-start p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-sm transition-shadow"
              >
                <span className="text-2xl font-extrabold text-blue-500/30 font-mono leading-none">
                  {term.num}
                </span>
                <div>
                  <h4 className="font-bold text-[#12306d] text-base mb-1">
                    {term.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {term.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-white border-t border-slate-200/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16 space-y-4">
            <span className="section-eyebrow">Got Questions?</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#12306d]">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600">
              Clear, transparent answers about our AMC plans and support
              parameters.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {[
              {
                q: "Is website development included in the AMC plans?",
                a: "No, website development is NOT included. The AMC covers routine technical upkeep, security updates, backups, monitoring, and minor bug fixing. Any coding for new templates, pages, payment setups, or modifications is billed separately.",
              },
              {
                q: 'What counts as a "Minor Content Change"?',
                a: "Minor content changes include updating text, replacing an image, updating contact details, or changing an alert banner. It does not include building new landing pages, custom web designs, or database integrations.",
              },
              {
                q: "How does the backup recovery system work?",
                a: "We automate backups and verify archive data on secure, secondary cloud servers. If your website crashes or is compromised, our support engineers can restore the latest working version instantly.",
              },
              {
                q: "What happens if our website encounters downtime?",
                a: "Our automated 24/7 monitors trigger instant alert codes. Emergency support technicians immediately investigate server errors or DNS routing conflicts to restore availability.",
              },
              {
                q: "Are plug-in and software licenses included in the contract?",
                a: "No. The client is responsible for purchasing and renewing premium third-party software, plug-in, and theme licenses. We assist with configuration updates.",
              },
              {
                q: "Do you offer a custom AMC plan?",
                a: "Yes! If you have multiple websites or a complex enterprise app requiring custom SLA response timelines, please request a custom quote.",
              },
              {
                q: "How do you handle security breaches or malware?",
                a: "Our firewalls actively deflect security exploits. In the rare event of a malware payload, we quarantine infected files, clean code pathways, and restore stable backup data.",
              },
              {
                q: "Can I cancel my website maintenance contract?",
                a: "Yes, you can cancel your AMC. We request a 30-day formal cancellation notification. Remaining months on paid terms will be adjusted per refund terms.",
              },
              {
                q: "Do you manage website hosting and domain names?",
                a: "No, hosting fees and domain registry are separate. However, our team provides full hosting setup assistance, DNS routing help, and SSL configuration.",
              },
              {
                q: "Will I get monthly maintenance reports?",
                a: "Yes, for Business and Enterprise plans, we email detailed monthly PDF reports covering uptime logs, security scans, applied system updates, and backups.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-[#12306d] hover:bg-slate-50 transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transform transition-transform duration-300 ${activeFaq === idx ? "rotate-180 text-blue-600" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-5 border-t border-slate-100 text-slate-500 text-sm leading-relaxed bg-slate-50/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden bg-[#12306d] text-white animate-fade-in">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(37,99,235,0.4),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-20%,rgba(249,115,22,0.15),transparent_50%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Keep Your Website Running Smoothly?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Secure your Annual Maintenance Contract (AMC) today. Prevent server
            downtime, protect data assets, and optimize user experience.
          </p>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs max-w-xl mx-auto">
            Reminder: Pricing does not include new feature development.
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => openQuoteModal()}
              className="brand-btn-primary bg-gradient-to-r from-orange-500 to-orange-600 border-none shadow-[0_12px_30px_rgba(249,115,22,0.35)]"
            >
              Get Started
            </button>
            <a
              href="https://wa.me/919714833771?text=Hello%20IDR%20Tech%2C%20I%20would%20like%20to%20consult%20about%20Website%20Maintenance%20AMC%20Plans."
              target="_blank"
              rel="noopener noreferrer"
              className="brand-btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/10"
            >
              Talk to Expert
            </a>
          </div>
        </div>
      </section>

      {/* Reach Us / Contact details */}
      <section
        id="contact-us-details"
        className="py-12 bg-slate-50 border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                Email Us
              </h4>
              <a
                href="mailto:idrtech23@gmail.com"
                className="text-blue-600 font-semibold text-sm mt-2 hover:underline"
              >
                idrtech23@gmail.com
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                Call / WhatsApp
              </h4>
              <a
                href="tel:+919714833771"
                className="text-slate-700 font-semibold text-sm mt-2 hover:underline"
              >
                +91 97148 33771
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                Support Address
              </h4>
              <p className="text-slate-600 text-sm mt-2 font-semibold">
                Bharuch, Gujarat, India
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Quote Request Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-150 p-6 md:p-8 z-10 text-left overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                  Lead Inquiry
                </span>
                <h3 className="text-2xl font-bold text-[#12306d]">
                  Request Maintenance Quote
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Get custom pricing details and SLA agreements for your
                  website.
                </p>
              </div>

              {status === "success" ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-[#12306d]">
                    Request Submitted!
                  </h4>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto">
                    We have successfully captured your details. Our senior
                    engineers will review your site and email you a custom
                    proposal.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Indrajit Padhiyar"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm bg-slate-50/50"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm bg-slate-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        required
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Inquiry Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm bg-slate-50/50"
                    >
                      {subjectOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Message / Details *
                    </label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Provide details about your website type, page count, hosting details, and maintenance requirements..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm bg-slate-50/50 font-sans"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs font-medium rounded-xl border border-red-100">
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full brand-btn-primary flex items-center justify-center gap-2 py-3.5 border-none shadow-[0_12px_28px_rgba(37,99,235,0.25)] cursor-pointer"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting Request...
                        </>
                      ) : (
                        "Submit Quote Request"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
