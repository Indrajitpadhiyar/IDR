import { motion } from 'motion/react';
import { X, Shield, Phone, Mail, Building, MapPin, Calendar, Clock } from 'lucide-react';

const statusBadges = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Pending: 'bg-amber-50 text-amber-700 border-amber-100',
  Expired: 'bg-rose-50 text-rose-700 border-rose-100',
  Suspended: 'bg-slate-100 text-slate-700 border-slate-200',
};

export default function UserDetailDrawer({ user, onClose }) {
  if (!user) return null;

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <>
      {/* Backdrop */}
      <div className="dash-drawer-backdrop" onClick={onClose} />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="dash-drawer p-6 sm:p-8 flex flex-col justify-between"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <h3 className="text-base font-semibold text-[var(--dash-text)]">Client Parameters</h3>
            <button onClick={onClose} className="dash-btn-ghost p-1.5 rounded-lg">
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Profile Overview */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--dash-orange)] to-[var(--dash-blue)] flex items-center justify-center text-white text-xl font-bold shadow-md">
              {initials}
            </div>
            <div>
              <h4 className="text-lg font-bold text-[var(--dash-text)]">{user.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold ${statusBadges[user.status]}`}>
                  {user.status}
                </span>
                <span className="text-xs text-[var(--dash-text-muted)] font-semibold">{user.role}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4.5 h-4.5 text-[var(--dash-text-muted)] shrink-0" />
              <div>
                <p className="text-[10px] text-[var(--dash-text-muted)] uppercase tracking-wider font-semibold">Email</p>
                <p className="font-medium text-[var(--dash-text)]">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4.5 h-4.5 text-[var(--dash-text-muted)] shrink-0" />
              <div>
                <p className="text-[10px] text-[var(--dash-text-muted)] uppercase tracking-wider font-semibold">Phone</p>
                <p className="font-medium text-[var(--dash-text)]">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Building className="w-4.5 h-4.5 text-[var(--dash-text-muted)] shrink-0" />
              <div>
                <p className="text-[10px] text-[var(--dash-text-muted)] uppercase tracking-wider font-semibold">Company</p>
                <p className="font-medium text-[var(--dash-text)]">{user.company || 'Not Specified'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4.5 h-4.5 text-[var(--dash-text-muted)] shrink-0" />
              <div>
                <p className="text-[10px] text-[var(--dash-text-muted)] uppercase tracking-wider font-semibold">Address</p>
                <p className="font-medium text-[var(--dash-text)]">{user.address || 'Not Specified'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4.5 h-4.5 text-[var(--dash-text-muted)] shrink-0" />
              <div>
                <p className="text-[10px] text-[var(--dash-text-muted)] uppercase tracking-wider font-semibold">Expiry Date</p>
                <p className="font-medium text-[var(--dash-text)] font-numbers">{user.expiry}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-slate-100 flex gap-3">
          <button className="dash-btn-secondary py-2.5 px-4 text-xs flex-1 text-center justify-center">
            Extend Plan
          </button>
          <button className="dash-btn-primary bg-rose-600 hover:bg-rose-700 py-2.5 px-4 text-xs flex-1 text-center justify-center">
            Suspend
          </button>
        </div>
      </motion.div>
    </>
  );
}
