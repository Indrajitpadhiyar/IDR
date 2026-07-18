import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const strengthLevels = [
  { label: 'Weak', color: '#ef4444', min: 0 },
  { label: 'Fair', color: '#f59e0b', min: 25 },
  { label: 'Good', color: '#3b82f6', min: 50 },
  { label: 'Strong', color: '#22c55e', min: 75 },
];

function getPasswordStrength(pwd) {
  let score = 0;
  if (pwd.length >= 6) score += 20;
  if (pwd.length >= 10) score += 15;
  if (/[A-Z]/.test(pwd)) score += 20;
  if (/[0-9]/.test(pwd)) score += 20;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 25;
  return Math.min(100, score);
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, isAuthenticated } = useAuth();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  if (isAuthenticated) {
    const redirectPath = location.state?.from || '/dashboard';
    navigate(redirectPath, { replace: true });
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  };

  const goToStep2 = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError('Please fill all required fields.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.acceptTerms) {
      setError('Please accept the terms and conditions.');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const result = register(formData);
    if (result.success) {
      const redirectPath = location.state?.from || '/dashboard';
      navigate(redirectPath);
    } else {
      setError('Registration failed. Please try again.');
    }
    setLoading(false);
  };

  const strength = getPasswordStrength(formData.password);
  const strengthLevel = [...strengthLevels].reverse().find((l) => strength >= l.min) || strengthLevels[0];

  return (
    <div className="auth-root min-h-screen flex items-center justify-center p-6">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[var(--dash-orange)]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[var(--dash-blue)]/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[480px]"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
              <img src="/IDR.jpeg" alt="IDR Tech" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--dash-blue)]">
              IDR Tech
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-[var(--dash-text)]">Create Your Account</h1>
          <p className="mt-1.5 text-sm text-[var(--dash-text-muted)]">
            Get started with your IDRTech dashboard
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1">
            <div className="h-1.5 rounded-full bg-[var(--dash-orange)]" />
            <p className="text-[10px] font-semibold text-[var(--dash-orange)] mt-1.5 text-center">
              Step 1: Details
            </p>
          </div>
          <div className="flex-1">
            <div className={`h-1.5 rounded-full transition-colors duration-300 ${step === 2 ? 'bg-[var(--dash-orange)]' : 'bg-slate-200'}`} />
            <p className={`text-[10px] font-semibold mt-1.5 text-center transition-colors ${step === 2 ? 'text-[var(--dash-orange)]' : 'text-slate-400'}`}>
              Step 2: Security
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="auth-card p-7">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={goToStep2}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                      First Name *
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Indrajit"
                      required
                      className="dash-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                      Last Name *
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Padhiyar"
                      required
                      className="dash-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Company Name
                  </label>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="IDRTECH (Optional)"
                    className="dash-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    className="dash-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 97148 33771"
                    required
                    className="dash-input"
                  />
                </div>

                {error && (
                  <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 px-3 py-2 rounded-xl">
                    {error}
                  </p>
                )}

                <button type="submit" className="dash-btn-primary ripple-btn w-full py-3 mt-2">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 6 characters"
                      required
                      className="dash-input pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--dash-text-muted)]"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${strength}%` }}
                          className="h-full rounded-full"
                          style={{ background: strengthLevel.color }}
                        />
                      </div>
                      <p className="text-[10px] font-semibold mt-1" style={{ color: strengthLevel.color }}>
                        {strengthLevel.label}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      required
                      className="dash-input pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--dash-text-muted)]"
                      tabIndex={-1}
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Passwords match
                    </p>
                  )}
                </div>

                {/* Accept Terms */}
                <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[var(--dash-orange)] focus:ring-[var(--dash-orange)]"
                  />
                  <span className="text-xs text-[var(--dash-text-muted)] leading-relaxed">
                    I accept the{' '}
                    <Link to="/terms" className="text-[var(--dash-blue)] hover:underline">Terms & Conditions</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-[var(--dash-blue)] hover:underline">Privacy Policy</Link>
                  </span>
                </label>

                {error && (
                  <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 px-3 py-2 rounded-xl">
                    {error}
                  </p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => { setStep(1); setError(''); }}
                    className="dash-btn-secondary flex-1 py-3"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="dash-btn-primary ripple-btn flex-[2] py-3"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating...
                      </span>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-[var(--dash-text-muted)]">
          Already have an account?{' '}
          <Link
            to="/login"
            state={{ from: location.state?.from }}
            className="font-semibold text-[var(--dash-blue)] hover:text-blue-700 transition-colors inline-flex items-center gap-1"
          >
            Login <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
