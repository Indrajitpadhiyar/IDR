import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, CheckCircle, AlertTriangle, XCircle, Search } from 'lucide-react';
import { useSocket } from '../../../context/SocketContext';
import { useAuth } from '../../../context/AuthContext';

const statusBadges = {
  Paid: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Successful: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Pending: 'bg-amber-50 text-amber-700 border-amber-100',
  Refunded: 'bg-rose-50 text-rose-700 border-rose-100',
};

export default function InvoicesPage() {
  const socket = useSocket();
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    if (!socket) return;

    socket.on('payments_updated', (updatedPayments) => {
      setPayments(updatedPayments);
    });

    socket.emit('request_refresh');

    return () => {
      socket.off('payments_updated');
    };
  }, [socket]);

  // Filter payments belonging to this user
  const clientInvoices = payments.filter((inv) => {
    const isUserInvoice = inv.userId === user?.id || inv.user?.toLowerCase() === user?.name?.toLowerCase();
    if (!isUserInvoice) return false;

    const matchesSearch = inv.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          inv.plan.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || inv.status === statusFilter || 
                          (statusFilter === 'Paid' && inv.status === 'Successful');

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--dash-text)]">Invoices</h1>
        <p className="text-sm text-[var(--dash-text-muted)] mt-1">Review, search, and download your billing history</p>
      </div>

      {/* Invoice Table Container */}
      <div className="dash-card-static p-0 overflow-hidden">
        {/* Search / Filter header */}
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dash-text-muted)]" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dash-input pl-10 py-1.5 text-xs bg-slate-50 border-transparent focus:bg-white focus:border-[var(--dash-blue)]"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="dash-input py-1.5 px-3 text-xs w-32"
            >
              <option value="">All statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Description</th>
                <th>Billing Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clientInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="font-semibold text-[var(--dash-text)]">{inv.id}</td>
                  <td>{inv.plan}</td>
                  <td className="font-numbers text-[var(--dash-text-muted)]">{inv.date}</td>
                  <td className="font-bold text-[var(--dash-text)] font-numbers">{inv.amount}</td>
                  <td>
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${statusBadges[inv.status] || ''}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button className="dash-btn-ghost hover:text-[var(--dash-orange)] px-2 py-1 flex items-center gap-1 ml-auto text-xs">
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </button>
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
