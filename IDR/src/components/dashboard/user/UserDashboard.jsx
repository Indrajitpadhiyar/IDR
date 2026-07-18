import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { RefreshCw, Zap, Check, X } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

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

export default function UserDashboard() {
  const { user } = useAuth();
  
  const sub = user?.subscription;
  const hasActivePlan = sub && sub.status === 'Active';

  // Calculate remaining days
  let remainingDays = 0;
  if (hasActivePlan && sub.expiry) {
    const expiryDate = new Date(sub.expiry);
    const currentDate = new Date();
    const diff = expiryDate - currentDate;
    remainingDays = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  if (!hasActivePlan) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8 text-center border border-slate-800 shadow-2xl relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10 space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-2 border border-white/10 shadow-inner">
              <Zap className="w-7 h-7 text-[var(--dash-orange)]" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">No Active Plan Currently</h2>
              <p className="text-xs text-slate-400 mt-2">
                Your account is currently running on a guest tier. Unlock active support and monitoring.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/website-maintenance"
                className="dash-btn-primary bg-gradient-to-r from-[var(--dash-orange)] to-amber-500 hover:from-[var(--dash-orange)]/90 hover:to-amber-500/90 py-3 px-8 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg shadow-orange-500/10"
              >
                Upgrade Plan
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[55vh] p-4 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-8 border border-slate-800 shadow-2xl relative"
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--dash-orange)]/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-[var(--dash-blue)]/10 rounded-full blur-[50px] translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 text-center space-y-8">
          {/* Plan Header */}
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active Plan
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              {sub.plan} Plan
            </h2>
          </div>

          {/* Time Remaining display */}
          <div className="py-6 px-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1 max-w-xs mx-auto">
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold block">Time Remaining</span>
            <p className="text-4xl font-black text-[var(--dash-orange)] font-numbers tracking-tight">
              {remainingDays} <span className="text-lg font-medium text-white/80">Days</span>
            </p>
            <span className="text-[11px] text-white/40 block">to go before expiration</span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              to="/website-maintenance"
              className="dash-btn-primary bg-gradient-to-r from-[var(--dash-orange)] to-amber-500 hover:from-[var(--dash-orange)]/90 hover:to-amber-500/90 py-3 px-8 text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4.5 h-4.5 animate-spin-slow" /> Renew Plan
            </Link>
            <Link
              to="/website-maintenance"
              className="dash-btn-ghost text-white/80 hover:text-white border border-white/20 hover:bg-white/10 py-3 px-8 text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-[var(--dash-orange)]" /> Upgrade Plan
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Included Features list */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="w-full max-w-lg dash-card-static text-left"
      >
        <h3 className="text-xs font-bold text-[var(--dash-text)] uppercase tracking-wider mb-4">Included Features</h3>
        <div className="grid sm:grid-cols-2 gap-3">
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
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shadow-sm shrink-0 ${
                  feat.active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  {feat.active ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                </div>
                <span className={`text-xs font-semibold ${
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
