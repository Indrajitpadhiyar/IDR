import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Bell, Shield, CreditCard, Languages, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    billingAlerts: true,
    weeklyReports: false,
    securityAlerts: true,
  });

  const handleToggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success('Preferences updated!', {
      style: {
        borderRadius: '16px',
        background: '#0f172a',
        color: '#fff',
      },
    });
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'language', label: 'Language', icon: Languages },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--dash-text)]">Settings</h1>
        <p className="text-sm text-[var(--dash-text-muted)] mt-1">Configure your personal preferences and dashboard options</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 dash-card-static p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${activeTab === tab.id ? 'text-[var(--dash-orange)] bg-orange-50' : 'text-[var(--dash-text-muted)] hover:text-[var(--dash-text)] hover:bg-slate-50'}`}
            >
              <tab.icon className="w-[18px] h-[18px]" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-3 dash-card-static p-6 sm:p-8">
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-[var(--dash-text)]">Account Preferences</h3>
              <p className="text-xs text-[var(--dash-text-muted)]">Configure settings related to your profile representation and dashboard language settings.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Dashboard Theme
                  </label>
                  <select className="dash-input">
                    <option value="light">Light Mode (Default)</option>
                    <option value="dark" disabled>Dark Mode (Coming Soon)</option>
                    <option value="system">Follow System Settings</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Time Zone
                  </label>
                  <select className="dash-input">
                    <option value="IST">India Standard Time (GMT+5:30)</option>
                    <option value="EST">Eastern Standard Time (GMT-5:00)</option>
                    <option value="GMT">Greenwich Mean Time (GMT+0:00)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-[var(--dash-text)]">Notification Channels</h3>
              <p className="text-xs text-[var(--dash-text-muted)]">Control how we communicate alerts, invoicing, security bulletins, and maintenance updates.</p>

              <div className="space-y-4 divide-y divide-slate-100">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--dash-text)]">Email Alerts</h4>
                    <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">Receive warnings on critical server downtime or service disruptions.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailAlerts}
                    onChange={() => handleToggleNotification('emailAlerts')}
                    className="w-9 h-5 bg-slate-200 checked:bg-[var(--dash-orange)] rounded-full appearance-none relative cursor-pointer before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:translate-x-4 before:transition-transform"
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--dash-text)]">Billing Alerts</h4>
                    <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">Receive receipts, subscription updates, and auto-renewal alerts.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.billingAlerts}
                    onChange={() => handleToggleNotification('billingAlerts')}
                    className="w-9 h-5 bg-slate-200 checked:bg-[var(--dash-orange)] rounded-full appearance-none relative cursor-pointer before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:translate-x-4 before:transition-transform"
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--dash-text)]">Weekly Reports</h4>
                    <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">Get a weekly summary of website traffic and uptime reports.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.weeklyReports}
                    onChange={() => handleToggleNotification('weeklyReports')}
                    className="w-9 h-5 bg-slate-200 checked:bg-[var(--dash-orange)] rounded-full appearance-none relative cursor-pointer before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:translate-x-4 before:transition-transform"
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--dash-text)]">Security & Access Alerts</h4>
                    <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">Get notified instantly of unauthorized login attempts.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.securityAlerts}
                    onChange={() => handleToggleNotification('securityAlerts')}
                    className="w-9 h-5 bg-slate-200 checked:bg-[var(--dash-orange)] rounded-full appearance-none relative cursor-pointer before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:translate-x-4 before:transition-transform"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-[var(--dash-text)]">Security Credentials</h3>
              <p className="text-xs text-[var(--dash-text-muted)]">Ensure your IDRTech client dashboard is secure by updating your credentials regularly.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Current Password
                  </label>
                  <input type="password" placeholder="••••••••" className="dash-input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    New Password
                  </label>
                  <input type="password" placeholder="Min 8 characters" className="dash-input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Confirm New Password
                  </label>
                  <input type="password" placeholder="Confirm new password" className="dash-input" />
                </div>
                
                <button className="dash-btn-primary py-2.5 px-5 text-sm">
                  Change Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-[var(--dash-text)]">Billing & Subscriptions</h3>
              <p className="text-xs text-[var(--dash-text-muted)]">Manage tax info, registered payment structures, and primary currency indicators.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    GSTIN / Tax Registration Number
                  </label>
                  <input type="text" placeholder="24AAAAA0000A1Z5" className="dash-input" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Billing Currency
                  </label>
                  <select className="dash-input">
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'language' && (
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-[var(--dash-text)]">Language Settings</h3>
              <p className="text-xs text-[var(--dash-text-muted)]">Change the language of the client portal interface.</p>
              
              <div>
                <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                  Language
                </label>
                <select className="dash-input">
                  <option value="en">English (US)</option>
                  <option value="hi">Hindi (हिन्दी)</option>
                  <option value="gu">Gujarati (ગુજરાતી)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
