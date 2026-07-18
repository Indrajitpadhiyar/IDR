import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Eye, Edit2, Trash2, ShieldAlert } from 'lucide-react';
import { useSocket } from '../../../context/SocketContext';
import UserDetailDrawer from './UserDetailDrawer';

const statusBadges = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Pending: 'bg-amber-50 text-amber-700 border-amber-100',
  Expired: 'bg-rose-50 text-rose-700 border-rose-100',
  Suspended: 'bg-slate-100 text-slate-700 border-slate-200',
};

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const socket = useSocket();

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

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--dash-text)]">Client Records</h1>
        <p className="text-sm text-[var(--dash-text-muted)] mt-1">Manage, search, edit, and filter client accounts and parameters</p>
      </div>

      <div className="dash-card-static p-0 overflow-hidden">
        {/* Search header */}
        <div className="p-5 border-b border-slate-100">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dash-text-muted)]" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dash-input pl-10 py-1.5 text-xs bg-slate-50 border-transparent focus:bg-white focus:border-[var(--dash-blue)]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Plan</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => {
                const initials = u.name
                  ? u.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)
                  : 'U';

                return (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--dash-orange)] to-[var(--dash-blue)] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--dash-text)]">{u.name}</p>
                          <p className="text-[10px] text-[var(--dash-text-muted)] mt-0.5">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>{u.company || 'Not Specified'}</td>
                    <td className="font-semibold">{u.plan}</td>
                    <td className="font-numbers text-[var(--dash-text-muted)]">{u.expiry}</td>
                    <td>
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${statusBadges[u.status] || ''}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="dash-btn-ghost p-1.5 rounded-lg text-[var(--dash-blue)] hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="dash-btn-ghost p-1.5 rounded-lg text-slate-500" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="dash-btn-ghost p-1.5 rounded-lg text-rose-500 hover:bg-rose-50" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Drawer */}
      <AnimatePresence>
        {selectedUser && (
          <UserDetailDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
