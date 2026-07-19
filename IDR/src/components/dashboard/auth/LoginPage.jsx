import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Cloud,
  Activity,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle, isAuthenticated, isAdmin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "271296612829-bvbk7toe78jntbmshkn49p35on12vimv.apps.googleusercontent.com";
    if (!clientId) {
      console.warn("VITE_GOOGLE_CLIENT_ID env variable is not set.");
      return;
    }

    const handleGoogleCallback = async (response) => {
      setLoading(true);
      setError('');
      try {
        const result = await loginWithGoogle(response.credential);
        if (result.success) {
          const redirectPath = location.state?.from || '/dashboard';
          navigate(redirectPath);
        } else {
          setError(result.error || 'Google login failed');
        }
      } catch (err) {
        setError('An unexpected error occurred during Google sign-in.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const initGoogleAuth = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        const btnElement = document.getElementById("google-signin-btn");
        if (btnElement) {
          window.google.accounts.id.renderButton(btnElement, {
            theme: "outline",
            size: "large",
            width: btnElement.offsetWidth || 372,
            shape: "rectangular",
            text: "continue_with",
            logo_alignment: "center",
          });
        }
      }
    };

    if (!document.getElementById("google-gsi-script")) {
      const script = document.createElement("script");
      script.id = "google-gsi-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initGoogleAuth;
      document.body.appendChild(script);
    } else {
      initGoogleAuth();
    }
  }, [loginWithGoogle, navigate, location.state]);

  // Redirect if already logged in
  if (isAuthenticated) {
    const redirectPath = location.state?.from || (isAdmin ? '/admin' : '/dashboard');
    navigate(redirectPath, { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Small delay to simulate API call
    await new Promise((r) => setTimeout(r, 600));

    const result = await login(email, password);
    if (result.success) {
      const isAdminLogin = password === 'admin';
      const redirectPath = location.state?.from || (isAdminLogin ? '/admin' : '/dashboard');
      navigate(redirectPath);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-root min-h-screen flex">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[var(--dash-orange)]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[var(--dash-blue)]/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-purple-400/5 rounded-full blur-[80px]" />
      </div>

      {/* Left: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px]"
        >
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
              <img src="/IDR.jpeg" alt="IDR Tech" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--dash-blue)]">
              IDR Tech
            </span>
          </Link>

          {/* Welcome Text */}
          <h1 className="text-3xl font-bold text-[var(--dash-text)]">
            Welcome Back 👋
          </h1>
          <p className="mt-2 text-sm text-[var(--dash-text-muted)] leading-relaxed">
            Manage your subscription, projects and hosting securely.
          </p>

          {/* Demo Hint */}
          <div className="mt-5 p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-700">
            <span className="font-semibold">Demo:</span> Use any email + password to login. Use password <code className="bg-blue-100 px-1 py-0.5 rounded font-mono text-[11px]">admin</code> for admin access.
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="dash-input"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[var(--dash-text)] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="dash-input pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--dash-text-muted)] hover:text-[var(--dash-text)] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[var(--dash-orange)] focus:ring-[var(--dash-orange)]"
                />
                <span className="text-sm text-[var(--dash-text-muted)]">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-[var(--dash-blue)] hover:text-blue-700 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-rose-600 bg-rose-50 border border-rose-100 px-3 py-2 rounded-xl"
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="dash-btn-primary ripple-btn w-full py-3.5 text-base"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 text-xs text-[var(--dash-text-muted)]">
              <div className="flex-1 h-px bg-slate-200" />
              OR
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Google Sign-In */}
            <div id="google-signin-btn" className="w-full flex justify-center py-0.5" />
          </form>

          {/* Register Link */}
          <p className="mt-8 text-center text-sm text-[var(--dash-text-muted)]">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              state={{ from: location.state?.from }}
              className="font-semibold text-[var(--dash-orange)] hover:text-orange-600 transition-colors inline-flex items-center gap-1"
            >
              Create Account <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right: Premium Light Theme Panel (Desktop) */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center p-12 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-orange-50/20 border-l border-slate-100">
        {/* Decorative subtle light background shapes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-100/40 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-100/30 rounded-full blur-[100px]" />

        {/* Centered Glassmorphic Welcome Card (Light Theme) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 p-10 rounded-3xl border border-slate-200/50 bg-white/75 backdrop-blur-xl shadow-xl max-w-[420px] text-left"
        >
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-200/80 bg-white flex items-center justify-center shadow-sm">
              <img src="/IDR.jpeg" alt="IDR Tech" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-wider uppercase text-[var(--dash-blue)]">IDRTECH</h2>
              <p className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase">Digital Agency</p>
            </div>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug tracking-tight text-[#12306d] mb-4">
            Unified Client Console
          </h3>
          
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Access your secure portal to monitor live site health, track server resource utilization, review custom updates, and coordinate with our developer team.
          </p>

          <div className="flex flex-wrap gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100/60 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-blue-500" /> Secure SSL
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100/60 shadow-sm">
              <Cloud className="w-3.5 h-3.5 text-orange-500" /> Cloud Nodes
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100/60 shadow-sm">
              <Activity className="w-3.5 h-3.5 text-emerald-500" /> Live Health
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
