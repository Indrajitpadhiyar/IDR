import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LifeBuoy, FileText, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useSocket } from '../../../context/SocketContext';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

const priorityColors = {
  Low: 'bg-slate-100 text-slate-700',
  Medium: 'bg-blue-50 text-blue-700 border-blue-100',
  High: 'bg-orange-50 text-orange-700 border-orange-100',
  Critical: 'bg-rose-50 text-rose-700 border-rose-100',
};

const statusIcons = {
  Open: Clock,
  Pending: AlertCircle,
  Resolved: CheckCircle,
};

const statusColors = {
  Open: 'text-amber-500 bg-amber-50',
  Pending: 'text-blue-500 bg-blue-50',
  Resolved: 'text-emerald-500 bg-emerald-50',
};

export default function SupportPage() {
  const socket = useSocket();
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !message) return;

    setIsSubmitting(true);
    try {
      let baseUrlRaw = import.meta.env.VITE_API_BASE;
      if (!baseUrlRaw) {
        baseUrlRaw = window.location.hostname === 'localhost'
          ? 'http://localhost:4000'
          : 'https://idr-backend-49rq.onrender.com';
      }
      const baseUrl = baseUrlRaw.replace(/^"(.*)"$/, '$1').replace(/\/$/, '');

      const response = await fetch(`${baseUrl}/api/user/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ subject, priority, message }),
      });

      const data = await response.json();
      if (data.success) {
        setSubject('');
        setMessage('');
        toast.success('Support ticket created successfully!', {
          style: {
            borderRadius: '16px',
            background: '#0f172a',
            color: '#fff',
          },
        });
      } else {
        toast.error(data.message || 'Failed to create ticket');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const userTickets = tickets.filter(
    (tkt) => tkt.user?.toLowerCase() === user?.name?.toLowerCase()
  );


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--dash-text)]">Support Center</h1>
        <p className="text-sm text-[var(--dash-text-muted)] mt-1">Submit support requests, report bugs, and view previous ticket logs</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Create Ticket Card */}
        <div className="lg:col-span-1">
          <div className="dash-card-static p-6 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[var(--dash-orange)]">
                <LifeBuoy className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-semibold text-[var(--dash-text)]">Raise a Ticket</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                  Subject *
                </label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Website performance issue"
                  required
                  className="dash-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="dash-input"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Critical">Critical Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                  Message / Details *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide precise details of the error..."
                  required
                  rows="4"
                  className="dash-input"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="dash-btn-primary w-full py-2.5 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </form>
          </div>
        </div>

        {/* Previous Ticket Logs */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-semibold text-[var(--dash-text)]">Active & Previous Tickets</h3>

          <div className="space-y-3">
            {userTickets.map((tkt) => {
              const Icon = statusIcons[tkt.status] || Clock;
              const colorClass = statusColors[tkt.status] || statusColors.Open;

              return (
                <div key={tkt.id} className="dash-card-static p-5 flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono text-[var(--dash-text-muted)] font-semibold">{tkt.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${priorityColors[tkt.priority]}`}>
                        {tkt.priority}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-[var(--dash-text)]">{tkt.subject}</h4>
                    <p className="text-[10px] text-[var(--dash-text-muted)]">Created on {tkt.createdAt}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full ${colorClass}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase">{tkt.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
