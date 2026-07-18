import { motion } from 'motion/react';
import { Globe, Shield, RefreshCw, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function WebsitePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--dash-text)]">My Website</h1>
        <p className="text-sm text-[var(--dash-text-muted)] mt-1">Monitor site status, SSL details, and active health checks</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="dash-card-static space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--dash-text-muted)] uppercase">Website Address</span>
            <Globe className="w-5 h-5 text-[var(--dash-blue)]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--dash-text)]">{user?.company ? `${user.company.toLowerCase()}.in` : 'mywebsite.in'}</h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> DNS Configured
            </p>
          </div>
        </div>

        <div className="dash-card-static space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--dash-text-muted)] uppercase">SSL Certificate</span>
            <Shield className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--dash-text)]">Cloudflare SSL</h3>
            <p className="text-xs text-[var(--dash-text-muted)] mt-1">Auto-renew active (Valid till Jan 2027)</p>
          </div>
        </div>

        <div className="dash-card-static space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--dash-text-muted)] uppercase">Uptime Monitoring</span>
            <RefreshCw className="w-5 h-5 text-[var(--dash-orange)]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--dash-text)]">99.9% Uptime</h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1">Uptime check running every 5 mins</p>
          </div>
        </div>
      </div>
    </div>
  );
}
