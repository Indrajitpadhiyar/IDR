import { motion } from 'motion/react';
import { CreditCard, Calendar, HardDrive, Wifi, RefreshCw, Shield, Zap, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { initiatePayment } from '../../../utils/payment';

const planFeatures = {
  Basic: [
    { label: "Website Health Monitoring", active: true },
    { label: "Routine Bug Fixing", active: true },
    { label: "Monthly Security Updates", active: true },
    { label: "Monthly Backups", active: true },
    { label: "2 Content Updates / month", active: true },
    { label: "Email Support (24h Response)", active: true },
    { label: "CMS/Plugin Updates", active: false },
    { label: "Database Optimization", active: false },
  ],
  Professional: [
    { label: "Website Health Monitoring", active: true },
    { label: "Routine Bug Fixing", active: true },
    { label: "Monthly Security Updates", active: true },
    { label: "Weekly Backups", active: true },
    { label: "CMS/Plugin Updates", active: true },
    { label: "Monthly Database Optimization", active: true },
    { label: "5 Content Updates / month", active: true },
    { label: "WhatsApp + Email (8h Response)", active: true },
    { label: "Monthly Maintenance Report", active: true },
  ],
  Enterprise: [
    { label: "24x7 Health Monitoring", active: true },
    { label: "Priority Bug Fixing", active: true },
    { label: "Weekly Security Patches", active: true },
    { label: "Daily Cloud Backups", active: true },
    { label: "CMS/Plugin Updates", active: true },
    { label: "Weekly Database Optimization", active: true },
    { label: "Unlimited Content Updates", active: true },
    { label: "Priority Call + WhatsApp (2h Response)", active: true },
    { label: "Detailed Analytics Report", active: true },
  ],
};

export default function SubscriptionPage() {
  const { user, refreshProfile } = useAuth();
  
  const sub = user?.subscription;
  const hasActivePlan = sub && sub.status === 'Active';

  // Calculate progress dynamically
  let remainingDays = 0;
  let progress = 0;
  if (hasActivePlan && sub.expiry) {
    const expiryDate = new Date(sub.expiry);
    const currentDate = new Date();
    const diff = expiryDate - currentDate;
    remainingDays = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    const totalDays = 365;
    progress = Math.min(100, Math.max(0, ((totalDays - remainingDays) / totalDays) * 100));
  }

  const formatExpiryDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleRenewPlan = () => {
    if (!sub || !sub.plan) return;
    initiatePayment({
      planName: sub.plan,
      user,
      onSuccess: async () => {
        await refreshProfile();
      }
    });
  };

  if (!hasActivePlan) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--dash-text)]">My Subscription</h1>
          <p className="text-sm text-[var(--dash-text-muted)] mt-1">Manage your active plan and billing</p>
        </div>

        {/* Call to Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8 text-center border border-slate-800"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10 max-w-lg mx-auto py-8 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-2 border border-white/10 shadow-inner">
              <Zap className="w-8 h-8 text-[var(--dash-orange)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">No Active Plan Currently</h2>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Your account is currently running on a guest tier. Unlock high-performance server bandwidth, secure daily backups, SSL protection, and 24/7 developer monitoring.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/website-maintenance"
                className="dash-btn-primary bg-gradient-to-r from-[var(--dash-orange)] to-amber-500 hover:from-[var(--dash-orange)]/90 hover:to-amber-500/90 py-3 px-8 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg shadow-orange-500/10"
              >
                Browse & Upgrade Plan
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--dash-text)]">My Subscription</h1>
        <p className="text-sm text-[var(--dash-text-muted)] mt-1">Manage your active plan and billing</p>
      </div>

      {/* Premium Plan Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-8"
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--dash-orange)]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--dash-blue)]/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[var(--dash-orange)]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{sub.plan} Plan</h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold font-numbers">₹{sub.price?.toLocaleString('en-IN') || '9,999'}<span className="text-sm font-normal text-white/50">/year</span></p>
            </div>
          </div>

          {/* Plan Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <Calendar className="w-4 h-4 text-[var(--dash-blue)] mb-2" />
              <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Expires</p>
              <p className="text-sm font-bold mt-0.5">{formatExpiryDate(sub.expiry)}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <HardDrive className="w-4 h-4 text-emerald-400 mb-2" />
              <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Storage</p>
              <p className="text-sm font-bold mt-0.5">{sub.storageLimit || '100'} GB</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <Wifi className="w-4 h-4 text-amber-400 mb-2" />
              <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Bandwidth</p>
              <p className="text-sm font-bold mt-0.5">{sub.bandwidthLimit || 'Unlimited'}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <Shield className="w-4 h-4 text-[var(--dash-orange)] mb-2" />
              <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">SSL</p>
              <p className="text-sm font-bold mt-0.5">Included</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-white/60 font-semibold">Remaining: {remainingDays} days</p>
              <p className="text-xs text-white/60 font-semibold">{Math.round(progress)}% elapsed</p>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${100 - progress}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-[var(--dash-orange)] to-amber-400"
              />
            </div>
          </div>

          {/* Renew Button */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button 
              onClick={handleRenewPlan}
              className="dash-btn-primary ripple-btn bg-gradient-to-r from-[var(--dash-orange)] to-amber-500 py-3 px-6"
            >
              <RefreshCw className="w-4 h-4" /> Renew Plan
            </button>
            <Link to="/website-maintenance" className="dash-btn-ghost text-white/60 hover:text-white hover:bg-white/10 py-3 px-6 text-center inline-flex items-center">
              View All Plans
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Plan Features */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="dash-card-static"
      >
        <h3 className="text-base font-semibold text-[var(--dash-text)] mb-4">What&apos;s Included</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(() => {
            const planName = sub?.plan === 'Business' ? 'Professional' : (sub?.plan || 'Basic');
            const features = planFeatures[planName] || planFeatures.Basic;
            return features.map((feat, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  feat.active 
                    ? 'bg-slate-50 border-slate-100/80' 
                    : 'bg-slate-50/40 border-dashed border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm shrink-0 ${
                  feat.active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  {feat.active ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </div>
                <span className={`text-sm font-medium ${
                  feat.active ? 'text-[var(--dash-text)]' : 'text-[var(--dash-text-muted)] line-through'
                }`}>{feat.label}</span>
              </div>
            ));
          })()}
        </div>
      </motion.div>
    </div>
  );
}
