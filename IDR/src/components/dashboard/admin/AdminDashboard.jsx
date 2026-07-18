import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, CreditCard, Wallet, AlertCircle, RefreshCw, BarChart3 } from 'lucide-react';
import { useSocket } from '../../../context/SocketContext';
import { revenueChartData } from '../../../data/dashboardData';

export default function AdminDashboard() {
  const socket = useSocket();
  const [stats, setStats] = useState({
    totalUsers: 0,
    yearlyPlans: 0,
    monthlyPlans: 0,
    revenue: '₹0',
    pendingRenewals: 0,
    expiredPlans: 0,
  });

  useEffect(() => {
    if (!socket) return;

    socket.on('stats_updated', (updatedStats) => {
      setStats(updatedStats);
    });

    socket.emit('request_refresh');

    return () => {
      socket.off('stats_updated');
    };
  }, [socket]);

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-600 bg-blue-50', change: 'Registered clients' },
    { label: 'Revenue', value: stats.revenue, icon: Wallet, color: 'text-emerald-600 bg-emerald-50', change: 'All time earnings' },
    { label: 'Active Plans', value: stats.yearlyPlans + stats.monthlyPlans, icon: CreditCard, color: 'text-[var(--dash-orange)] bg-orange-50', change: `${stats.yearlyPlans} Yearly / ${stats.monthlyPlans} Monthly` },
    { label: 'Expired Plans', value: stats.expiredPlans, icon: AlertCircle, color: 'text-rose-600 bg-rose-50', change: 'Action required' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--dash-text)]">Admin Console</h1>
        <p className="text-sm text-[var(--dash-text-muted)] mt-1">Global operations audit, revenue charts, and portal parameters</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="dash-card"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[var(--dash-text-muted)] uppercase tracking-wider">
                {card.label}
              </span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--dash-text)] font-numbers">{card.value}</p>
            <p className="text-[10px] text-[var(--dash-text-muted)] mt-1">{card.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 dash-card-static">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-[var(--dash-text)] uppercase tracking-wider">Revenue Trend</h3>
            <span className="text-xs text-[var(--dash-text-muted)] flex items-center gap-1">
              <BarChart3 className="w-3.5 h-3.5" /> Yearly Growth
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} style={{ fontSize: '11px', fill: '#94a3b8' }} />
                <YAxis tickLine={false} axisLine={false} style={{ fontSize: '11px', fill: '#94a3b8' }} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 dash-card-static">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-[var(--dash-text)] uppercase tracking-wider">Plan Distribution</h3>
          </div>
          
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[var(--dash-text)]">Yearly Plan (Active)</p>
                <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">₹9,999 pricing setup</p>
              </div>
              <span className="text-lg font-extrabold text-[var(--dash-blue)] font-numbers">98</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[var(--dash-text)]">Monthly Plan (Active)</p>
                <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">₹999 pricing setup</p>
              </div>
              <span className="text-lg font-extrabold text-[var(--dash-orange)] font-numbers">58</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
