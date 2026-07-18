import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LifeBuoy, Clock, CheckCircle, AlertTriangle, Send } from 'lucide-react';
import { useSocket } from '../../../context/SocketContext';
import toast from 'react-hot-toast';

const priorityColors = {
  Low: 'bg-slate-100 text-slate-700',
  Medium: 'bg-blue-50 text-blue-700 border-blue-100',
  High: 'bg-orange-50 text-orange-700 border-orange-100',
  Critical: 'bg-rose-50 text-rose-700 border-rose-100',
};

const statusColors = {
  Open: 'text-amber-500 bg-amber-50',
  Pending: 'text-blue-500 bg-blue-50',
  Resolved: 'text-emerald-500 bg-emerald-50',
};

export default function SupportAdmin() {
  const [tickets, setTickets] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('tickets_updated', (updatedTickets) => {
      setTickets(updatedTickets);
    });

    socket.emit('request_refresh');

    return () => {
      socket.off('tickets_updated');
    };
  }, [socket]);

  const handleResolve = async (id) => {
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

      const response = await fetch(`${baseUrl}/api/admin/tickets/${id}/resolve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Ticket marked as resolved!', {
          style: {
            borderRadius: '16px',
            background: '#0f172a',
            color: '#fff',
          },
        });
      } else {
        toast.error(data.message || 'Failed to resolve ticket');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--dash-text)]">Support Desk</h1>
        <p className="text-sm text-[var(--dash-text-muted)] mt-1">Audit active client support tickets, priorities, and assignments</p>
      </div>

      <div className="dash-card-static p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Client User</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Date Created</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td className="font-semibold">{t.id}</td>
                  <td>{t.user}</td>
                  <td className="font-medium text-[var(--dash-text)] max-w-xs truncate">{t.subject}</td>
                  <td>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${priorityColors[t.priority]}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="font-numbers text-[var(--dash-text-muted)]">{t.createdAt}</td>
                  <td>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusColors[t.status] || ''}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="text-right">
                    {t.status !== 'Resolved' ? (
                      <button
                        onClick={() => handleResolve(t.id)}
                        className="dash-btn-ghost hover:text-emerald-600 px-2 py-1 text-xs ml-auto flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Resolve
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 justify-end">
                        <CheckCircle className="w-3.5 h-3.5" /> Closed
                      </span>
                    )}
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
