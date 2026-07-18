import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CreditCard, AlertCircle, Trash2, Edit2, RotateCw } from 'lucide-react';
import { useSocket } from '../../../context/SocketContext';
import toast from 'react-hot-toast';

const statusBadges = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Pending: 'bg-amber-50 text-amber-700 border-amber-100',
  Expired: 'bg-rose-50 text-rose-700 border-rose-100',
  Suspended: 'bg-slate-100 text-slate-700 border-slate-200',
};

export default function SubscriptionManager() {
  const socket = useSocket();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('users_updated', (updatedUsers) => {
      setUsers(updatedUsers);
    });

    socket.emit('request_refresh');

    return () => {
      socket.off('users_updated');
    };
  }, [socket]);

  const handleExtend = async (userId) => {
    try {
      let baseUrlRaw = import.meta.env.VITE_API_BASE;
      if (!baseUrlRaw) {
        baseUrlRaw = window.location.hostname === 'localhost'
          ? 'http://localhost:4000'
          : 'https://idr-backend-49rq.onrender.com';
      }
      const baseUrl = baseUrlRaw.replace(/^"(.*)"$/, '$1').replace(/\/$/, '');

      const stored = localStorage.getItem('idrtech_auth');
      const auth = stored ? JSON.parse(stored) : null;
      const token = auth?.user?.token;

      const response = await fetch(`${baseUrl}/api/admin/subscriptions/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Subscription extended! New expiry: ${data.expiry}`, {
          style: {
            borderRadius: '16px',
            background: '#0f172a',
            color: '#fff',
          },
        });
      } else {
        toast.error(data.message || 'Failed to extend subscription');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--dash-text)]">Subscription Parameters</h1>
        <p className="text-sm text-[var(--dash-text-muted)] mt-1">Configure active client subscription models, flat prices, and renewal limits</p>
      </div>

      <div className="dash-card-static p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Plan Detail</th>
                <th>Price Rate</th>
                <th>Expiry Schedule</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div>
                      <p className="font-semibold text-[var(--dash-text)]">{u.name}</p>
                      <p className="text-[10px] text-[var(--dash-text-muted)] mt-0.5">{u.company || 'Personal'}</p>
                    </div>
                  </td>
                  <td>{u.plan} Subscription</td>
                  <td className="font-bold text-[var(--dash-text)] font-numbers">{u.planPrice}/yr</td>
                  <td className="font-numbers text-[var(--dash-text-muted)]">{u.expiry}</td>
                  <td>
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${statusBadges[u.status] || ''}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleExtend(u.id)}
                        className="dash-btn-ghost p-1.5 rounded-lg text-slate-600 flex items-center gap-1 text-xs"
                      >
                        <RotateCw className="w-3.5 h-3.5" /> Extend
                      </button>
                      <button className="dash-btn-ghost p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 text-xs">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
