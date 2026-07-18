import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, Building, MapPin, Shield, Edit, Save, Lock } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    address: user?.address || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!', {
      style: {
        borderRadius: '16px',
        background: '#0f172a',
        color: '#fff',
      },
    });
  };

  const initials = formData.name
    ? formData.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--dash-text)]">My Profile</h1>
        <p className="text-sm text-[var(--dash-text-muted)] mt-1">Manage your account information and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="dash-card-static text-center p-6 flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--dash-orange)] to-[var(--dash-blue)] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {initials}
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center" title="Online" />
            </div>
            
            <h2 className="text-lg font-bold text-[var(--dash-text)]">{user?.name}</h2>
            <p className="text-xs font-semibold text-[var(--dash-orange)] bg-orange-50 px-3 py-1 rounded-full mt-1.5 inline-block">
              {user?.role === 'admin' ? 'Administrator' : 'Premium Client'}
            </p>
            <p className="text-xs text-[var(--dash-text-muted)] mt-3">Member since: {user?.joinedAt || '2025-01-15'}</p>
          </div>

          {/* Quick Stats */}
          <div className="dash-card-static p-5 space-y-4">
            <h3 className="text-sm font-bold text-[var(--dash-text)] uppercase tracking-wider mb-2">Account Security</h3>
            <div className="flex items-center gap-3 text-xs text-[var(--dash-text-muted)]">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Two-Factor Authentication: <strong className="text-[var(--dash-text)]">Disabled</strong></span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[var(--dash-text-muted)]">
              <Lock className="w-4 h-4 text-[var(--dash-blue)]" />
              <span>Password last changed: <strong className="text-[var(--dash-text)]">3 months ago</strong></span>
            </div>
          </div>
        </div>

        {/* Profile Details Form */}
        <div className="lg:col-span-2">
          <div className="dash-card-static p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-semibold text-[var(--dash-text)]">Personal Details</h3>
              <button
                onClick={() => {
                  if (isEditing) {
                    handleSave();
                  } else {
                    setIsEditing(true);
                  }
                }}
                className={`dash-btn-secondary py-2 px-4 text-xs flex items-center gap-1.5 ${isEditing ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100' : ''}`}
              >
                {isEditing ? (
                  <>
                    <Save className="w-3.5 h-3.5" /> Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="w-3.5 h-3.5" /> Edit Profile
                  </>
                )}
              </button>
            </div>

            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dash-text-muted)]" />
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="dash-input pl-10 disabled:bg-slate-50 disabled:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Company
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dash-text-muted)]" />
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="dash-input pl-10 disabled:bg-slate-50 disabled:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dash-text-muted)]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="dash-input pl-10 disabled:bg-slate-50 disabled:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dash-text-muted)]" />
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="dash-input pl-10 disabled:bg-slate-50 disabled:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                  Billing Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-[var(--dash-text-muted)]" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="3"
                    className="dash-input pl-10 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
