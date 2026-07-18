import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CreditCard,
  LifeBuoy,
  User,
  Shield,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const userItems = [
  { label: 'Current Package', to: '/dashboard', icon: CreditCard },
  { label: 'Upgrade AMC Plan', to: '/website-maintenance', icon: Zap },
];

const adminItems = [
  { label: 'Home', to: '/admin', icon: LayoutDashboard },
  { label: 'Users', to: '/admin/users', icon: User },
  { label: 'Support', to: '/admin/support', icon: LifeBuoy },
  { label: 'Admin', to: '/admin/analytics', icon: Shield },
];

export default function BottomNav() {
  const location = useLocation();
  const { isAdmin } = useAuth();
  const items = isAdmin ? adminItems : userItems;

  return (
    <nav className="dash-bottomnav lg:hidden">
      {items.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`dash-bottomnav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
