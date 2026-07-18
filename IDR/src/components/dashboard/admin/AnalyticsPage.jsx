import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { revenueChartData, subscriptionChartData } from '../../../data/dashboardData';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--dash-text)]">System Analytics</h1>
        <p className="text-sm text-[var(--dash-text-muted)] mt-1">Detailed statistical insights, user growth metrics, and revenue trends</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="dash-card-static">
          <h3 className="text-sm font-bold text-[var(--dash-text)] uppercase tracking-wider mb-5">Monthly Revenue Growth</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff8f32" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ff8f32" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} style={{ fontSize: '11px', fill: '#94a3b8' }} />
                <YAxis tickLine={false} axisLine={false} style={{ fontSize: '11px', fill: '#94a3b8' }} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#ff8f32" strokeWidth={2} fillOpacity={1} fill="url(#revenueGrad2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscription Conversion Chart */}
        <div className="dash-card-static">
          <h3 className="text-sm font-bold text-[var(--dash-text)] uppercase tracking-wider mb-5">Subscription Tiers (Yearly vs Monthly)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subscriptionChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} style={{ fontSize: '11px', fill: '#94a3b8' }} />
                <YAxis tickLine={false} axisLine={false} style={{ fontSize: '11px', fill: '#94a3b8' }} />
                <Tooltip />
                <Legend style={{ fontSize: '11px' }} />
                <Bar dataKey="yearly" name="Yearly Plans" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="monthly" name="Monthly Plans" fill="#FF6B35" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
