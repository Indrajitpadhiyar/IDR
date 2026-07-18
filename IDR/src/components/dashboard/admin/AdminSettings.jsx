import { motion } from 'motion/react';
import { Shield, Key, Eye } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--dash-text)]">Admin Settings</h1>
        <p className="text-sm text-[var(--dash-text-muted)] mt-1">Configure global portal parameters and security overrides</p>
      </div>

      <div className="dash-card-static p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-semibold text-[var(--dash-text)]">Global Portal Policy</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
              Portal Mode
            </label>
            <select className="dash-input">
              <option value="public">Public Registrations Enabled</option>
              <option value="invite">Invite-Only Registrations</option>
              <option value="maintenance">Maintenance Lockout</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
              Default Plan for New Users
            </label>
            <select className="dash-input">
              <option value="Yearly">Yearly (₹9,999/yr)</option>
              <option value="Monthly">Monthly (₹999/mo)</option>
              <option value="Free">Free Demo Plan</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
