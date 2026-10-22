import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ShieldCheck,
  RefreshCw,
  Star,
  MapPin,
  Clock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AuthPage = ({ initialMode = 'login' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    login,
    quickDemoLogin,
    signup,
    sendResetOtp,
    verifyResetOtp,
    resetPassword,
  } = useAuth();
  const { addToast } = useToast();

  // Mode: 'login' | 'signup' | 'forgot-password' | 'verify-otp' | 'new-password' | 'reset-success'
  const [mode, setMode] = useState(() => {
    if (location.pathname.includes('signup')) return 'signup';
    if (location.pathname.includes('forgot')) return 'forgot-password';
    return initialMode;
  });

  useEffect(() => {
    if (location.pathname.includes('signup')) setMode('signup');
    else if (location.pathname.includes('forgot')) setMode('forgot-password');
    else if (location.pathname.includes('login')) setMode('login');
  }, [location.pathname]);

  // If already authenticated, redirect to home or previous page
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Form states
  const [loginEmail, setLoginEmail] = useState('aarav.sharma@example.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [forgotEmail, setForgotEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(30);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
  }, [mode]);

  useEffect(() => {
    let timer;
    if (mode === 'verify-otp' && otpCountdown > 0) {
      timer = setInterval(() => setOtpCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [mode, otpCountdown]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const result = await login({
      email: loginEmail,
      password: loginPassword,
      rememberMe,
    });
    setLoading(false);

    if (result.success) {
      addToast(`Welcome back, ${result.user.name}! 🍛`, 'success');
      navigate('/');
    } else {
      setErrorMessage(result.error);
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const result = quickDemoLogin();
      setLoading(false);
      addToast(`Logged in as demo gourmet: ${result.user.name} 🎉`, 'success');
      navigate('/');
    }, 350);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms & Conditions.');
      return;
    }

    setLoading(true);
    const result = await signup({
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      password: signupPassword,
    });
    setLoading(false);

    if (result.success) {
      addToast(`Welcome to CraveBite, ${result.user.name}! 🚀`, 'success');
      navigate('/');
    } else {
      setErrorMessage(result.error);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const result = await sendResetOtp(forgotEmail);
    setLoading(false);

    if (result.success) {
      setSimulatedOtp(result.otp);
      setOtpCountdown(30);
      setMode('verify-otp');
      addToast(`OTP sent to ${forgotEmail}`, 'success');
    } else {
      setErrorMessage(result.error);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const result = verifyResetOtp(otpCode);
    if (result.success) {
      setMode('new-password');
      addToast('Verification successful! Set your new password.', 'success');
    } else {
      setErrorMessage(result.error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    const result = await resetPassword(newPassword);
    setLoading(false);

    if (result.success) {
      setMode('reset-success');
      addToast('Password successfully updated!', 'success');
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        {/* Left Side: Brand & Visual Showcase */}
        <div className="relative hidden md:flex flex-col justify-between p-10 bg-slate-900 text-white overflow-hidden">
          {/* Background Image with Deep Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay scale-105"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />

          {/* Top Brand Info */}
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-glow">
                <span className="text-xl">🍛</span>
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                Crave<span className="text-brand-500">Bite</span>
              </span>
            </Link>
            <p className="text-xs text-brand-400 font-bold tracking-widest uppercase mt-1">
              Desi Gourmet Delivery
            </p>
          </div>

          {/* Testimonial & Value Props */}
          <div className="relative z-10 space-y-6 my-auto">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
              <span className="text-xs font-bold text-white ml-2">4.92 / 5.0 Rating</span>
            </div>

            <blockquote className="text-lg font-medium text-slate-200 leading-snug">
              "The finest dum biryanis, melt-in-mouth kebabs, and authentic street flavors delivered at lightning speed with royal hygiene standards."
            </blockquote>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-brand-400">
                  <Clock className="w-4 h-4" />
                </div>
                <span>Average delivery time under 28 minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Tamper-proof sanitized food packaging</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Live GPS driver tracking to your doorstep</span>
              </div>
            </div>
          </div>

          {/* Bottom Social Proof */}
          <div className="relative z-10 pt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Trusted by 100,000+ foodies</span>
            <span className="text-brand-400 font-bold">Bangalore • Mumbai • Delhi</span>
          </div>
        </div>

        {/* Right Side: Form View */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          {/* Header Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white font-display">
              {mode === 'login' && 'Sign in to CraveBite'}
              {mode === 'signup' && 'Create your account'}
              {mode === 'forgot-password' && 'Reset your password'}
              {mode === 'verify-otp' && 'Enter Verification Code'}
              {mode === 'new-password' && 'Set New Password'}
              {mode === 'reset-success' && 'Password Changed!'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {mode === 'login' && 'Access saved addresses, repeat past orders & earn rewards'}
              {mode === 'signup' && 'Sign up in seconds and get 25% off your first order'}
              {mode === 'forgot-password' && "We'll send an OTP code to your registered email"}
              {mode === 'verify-otp' && `Check your email for the 6-digit code`}
              {mode === 'new-password' && 'Pick a strong new password for your account'}
              {mode === 'reset-success' && 'Your credentials have been securely updated'}
            </p>
          </div>

          {/* Tab buttons for Login / Signup */}
          {(mode === 'login' || mode === 'signup') && (
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                  mode === 'login'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                  mode === 'signup'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2 text-xs text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. aarav.sharma@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(loginEmail);
                      setMode('forgot-password');
                    }}
                    className="text-[11px] font-semibold text-brand-500 hover:text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMePage"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-500 focus:ring-brand-400 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                />
                <label
                  htmlFor="rememberMePage"
                  className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none"
                >
                  Remember me on this browser
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-500 hover:to-amber-400 text-white font-bold text-xs shadow-glow hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Sign In to CraveBite</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Instant 1-Click Demo Login (Aarav Sharma)</span>
              </button>
            </form>
          )}

          {/* SIGNUP FORM */}
          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="e.g. priya@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Number (India)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 pr-2">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="98765 43210"
                    className="w-full pl-20 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeTermsPage"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-brand-500 focus:ring-brand-400 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                />
                <label
                  htmlFor="agreeTermsPage"
                  className="text-[11px] text-slate-500 dark:text-slate-400 cursor-pointer"
                >
                  I agree to CraveBite's Terms & Conditions and Privacy Policy.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-500 hover:to-amber-400 text-white font-bold text-xs shadow-glow hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Create CraveBite Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {mode === 'forgot-password' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Enter Your Registered Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="e.g. aarav.sharma@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  />
                </div>
              </div>

              <div className="p-3 bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-900/40 rounded-xl text-[11px] text-brand-800 dark:text-brand-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                <span>Tip: Test with <strong>aarav.sharma@example.com</strong></span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-glow transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>
            </form>
          )}

          {/* VERIFY OTP */}
          {mode === 'verify-otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {simulatedOtp && (
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-center">
                  <p className="text-[11px] font-bold text-amber-800 dark:text-amber-300">
                    Simulation SMS / Email Code
                  </p>
                  <p className="font-mono text-2xl font-black tracking-widest text-brand-600 dark:text-brand-400 mt-1">
                    {simulatedOtp}
                  </p>
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">
                    (Auto-generated demo OTP)
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Enter 6-Digit OTP Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter code"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-base tracking-widest font-mono text-center focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Didn't receive code?</span>
                {otpCountdown > 0 ? (
                  <span>Resend in {otpCountdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-brand-500 font-bold hover:underline"
                  >
                    Resend Code
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-glow transition flex items-center justify-center gap-2"
              >
                <span>Verify Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setMode('forgot-password')}
                className="w-full py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Email</span>
              </button>
            </form>
          )}

          {/* NEW PASSWORD */}
          {mode === 'new-password' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-500 hover:to-amber-400 text-white font-bold text-xs shadow-glow transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Update Password & Save</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* RESET SUCCESS */}
          {mode === 'reset-success' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Password Reset Complete
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  You can now sign in to CraveBite with your new password.
                </p>
              </div>
              <button
                onClick={() => setMode('login')}
                className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-glow transition"
              >
                Sign In Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
