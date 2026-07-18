import { motion } from 'motion/react';
import { ClipboardList, Download, FileText } from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--dash-text)]">Reports</h1>
        <p className="text-sm text-[var(--dash-text-muted)] mt-1">Audit logs, system reports, and downloads</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Monthly Billing Summary', date: 'June 2026', size: '1.2 MB' },
          { title: 'User Conversion Analytics', date: 'Q2 2026', size: '2.4 MB' },
          { title: 'Website Uptime Audit Log', date: 'Last 30 Days', size: '840 KB' },
        ].map((rep, idx) => (
          <div key={idx} className="dash-card-static space-y-4">
            <div className="flex items-center justify-between">
              <FileText className="w-6 h-6 text-[var(--dash-blue)]" />
              <button className="dash-btn-ghost p-1.5 rounded-lg text-slate-500">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--dash-text)]">{rep.title}</h3>
              <p className="text-xs text-[var(--dash-text-muted)] mt-1">{rep.date} • {rep.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
