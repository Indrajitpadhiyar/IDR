import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock forgot password
    setSubmitted(true);
  };

  return (
    <div className="auth-root min-h-screen flex items-center justify-center p-6">
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-[var(--dash-blue)]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] bg-[var(--dash-orange)]/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px]"
      >
        <Link to="/" className="inline-flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
            <img src="/IDR.jpeg" alt="IDR Tech" className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--dash-blue)]">IDR Tech</span>
        </Link>

        <div className="auth-card p-7">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold text-[var(--dash-text)]">Check Your Email</h2>
              <p className="text-sm text-[var(--dash-text-muted)] mt-2 leading-relaxed">
                We&apos;ve sent a password reset link to <span className="font-semibold text-[var(--dash-text)]">{email}</span>.
                Please check your inbox.
              </p>
              <Link to="/login" className="dash-btn-primary ripple-btn mt-6 inline-flex">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[var(--dash-text)]">Forgot Password?</h2>
                <p className="text-sm text-[var(--dash-text-muted)] mt-1">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dash-text-muted)]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="dash-input pl-10"
                    />
                  </div>
                </div>

                <button type="submit" className="dash-btn-primary ripple-btn w-full py-3">
                  Send Reset Link
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-[var(--dash-text-muted)]">
                <Link
                  to="/login"
                  className="font-semibold text-[var(--dash-blue)] hover:text-blue-700 inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
