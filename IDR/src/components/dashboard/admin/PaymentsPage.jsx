import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Wallet, CheckCircle, Clock, XCircle, Search, FileText } from 'lucide-react';
import { useSocket } from '../../../context/SocketContext';

const statusBadges = {
  Successful: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Paid: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Pending: 'bg-amber-50 text-amber-700 border-amber-100',
  Refunded: 'bg-rose-50 text-rose-700 border-rose-100',
};

export default function PaymentsPage() {
  const socket = useSocket();
  const [payments, setPayments] = useState([]);

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

  const getSum = (statusName) => {
    const sum = payments
      .filter((p) => {
        if (statusName === 'Successful') {
          return p.status === 'Successful' || p.status === 'Paid';
        }
        return p.status === statusName;
      })
      .reduce((acc, p) => {
        const val = Number(p.amount.replace(/[^0-9]/g, '')) || 0;
        return acc + val;
      }, 0);
    return `₹${sum.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--dash-text)]">Transaction Auditing</h1>
        <p className="text-sm text-[var(--dash-text-muted)] mt-1">Audit billing payments, invoices, refunds, and logs</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="dash-card-static flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-[var(--dash-text-muted)] uppercase">Successful Payments</span>
            <h3 className="text-2xl font-bold text-[var(--dash-text)] mt-1 font-numbers">{getSum('Successful')}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="dash-card-static flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-[var(--dash-text-muted)] uppercase">Pending Payments</span>
            <h3 className="text-2xl font-bold text-[var(--dash-text)] mt-1 font-numbers">{getSum('Pending')}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="dash-card-static flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-[var(--dash-text-muted)] uppercase">Refunds Audit</span>
            <h3 className="text-2xl font-bold text-[var(--dash-text)] mt-1 font-numbers">{getSum('Refunded')}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>


      {/* Transaction Log Table */}
      <div className="dash-card-static p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Client User</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Billing Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="font-semibold">{p.id}</td>
                  <td>{p.user}</td>
                  <td>{p.method}</td>
                  <td className="font-bold text-[var(--dash-text)] font-numbers">{p.amount}</td>
                  <td className="font-numbers text-[var(--dash-text-muted)]">{p.date}</td>
                  <td>
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${statusBadges[p.status] || ''}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button className="dash-btn-ghost p-1 rounded-lg text-slate-500 ml-auto flex items-center gap-1 text-xs">
                      <FileText className="w-3.5 h-3.5" /> Receipt
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
