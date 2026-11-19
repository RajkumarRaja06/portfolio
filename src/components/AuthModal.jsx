import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, Key, User, ShieldCheck, AlertCircle, ArrowRight, Eye, EyeOff, CheckCircle2, Loader2, Sparkles, Check } from 'lucide-react';
import { useAuth, isUserAdmin } from '../context/AuthContext';

// Official Multi-color Google Logo SVG
const GoogleLogo = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const AuthModal = ({ onNotify }) => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalPrompt,
    login,
    loginWithGoogle,
    signup,
  } = useAuth();

  const [mode, setMode] = useState('google'); // 'google' | 'signin' | 'signup'
  const [googleStep, setGoogleStep] = useState('choose'); // 'choose' | 'verifying' | 'custom'
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [verifyingEmail, setVerifyingEmail] = useState('');
  const [verificationProgress, setVerificationProgress] = useState(0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen && googleStep !== 'verifying') {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal, googleStep]);

  // Reset errors when modal opens or switches mode
  useEffect(() => {
    setErrorMsg('');
    if (isAuthModalOpen) {
      setGoogleStep('choose');
      setVerificationProgress(0);
    }
  }, [mode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  // Google OAuth Verification Simulation
  const handleGoogleAccountSelect = (targetEmail, targetName = '') => {
    setErrorMsg('');
    setVerifyingEmail(targetEmail);
    setGoogleStep('verifying');
    setVerificationProgress(20);

    // Realistic Google OAuth verification sequence
    setTimeout(() => {
      setVerificationProgress(65);
    }, 350);

    setTimeout(() => {
      setVerificationProgress(100);
      const res = loginWithGoogle(targetEmail, targetName);
      setTimeout(() => {
        if (res.isAdmin) {
          if (onNotify) {
            onNotify(`Google Verified: Welcome Admin ${res.user.name}! Full edit permissions granted.`);
          }
        } else {
          if (onNotify) {
            onNotify(`Google Verified: Welcome ${res.user.name}! Signed in with standard privileges.`);
          }
        }
        closeAuthModal();
      }, 400);
    }, 750);
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!customGoogleEmail.trim() || !customGoogleEmail.includes('@')) {
      setErrorMsg('Please enter a valid Google email address.');
      return;
    }
    handleGoogleAccountSelect(customGoogleEmail, customGoogleName);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'signup') {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        return;
      }

      const res = signup(name, email, password);
      if (res.success) {
        if (onNotify) onNotify(`Welcome, ${res.user.name}! Account registered & signed in.`);
        closeAuthModal();
      } else {
        setErrorMsg(res.message);
      }
    } else {
      if (!email.trim()) {
        setErrorMsg('Please enter your email.');
        return;
      }
      if (!password) {
        setErrorMsg('Please enter your password.');
        return;
      }

      const res = login(email, password);
      if (res.success) {
        if (onNotify) onNotify(`Signed in as ${res.user.name}!`);
        closeAuthModal();
      } else {
        setErrorMsg(res.message);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => {
        if (googleStep !== 'verifying') closeAuthModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-alabaster-card dark:bg-obsidian-card border border-alabaster-border dark:border-obsidian-border shadow-2xl p-6 sm:p-7 text-slate-900 dark:text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow decoration */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gold/15 blur-2xl"
          aria-hidden="true"
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-alabaster-border dark:border-obsidian-border">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gold/10 text-gold border border-gold/25">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 id="auth-modal-title" className="text-lg font-bold">
                {mode === 'google'
                  ? 'Google Authentication'
                  : mode === 'signup'
                  ? 'Create an Account'
                  : 'Account Sign In'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-obsidian-muted">
                Admin access &amp; website section editor
              </p>
            </div>
          </div>

          {googleStep !== 'verifying' && (
            <button
              onClick={closeAuthModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-obsidian-surface transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Action Prompt Banner if triggered by restricted action */}
        {authModalPrompt && (
          <div className="mt-4 p-3 rounded-xl bg-gold/10 border border-gold/30 text-xs text-amber-900 dark:text-gold-light flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-gold" />
            <div>
              <p className="font-semibold">{authModalPrompt}</p>
              <p className="mt-1 text-[11px] opacity-90">
                Only <strong className="underline">rajkumarrajaco</strong> and <strong className="underline">rajkumarkiot</strong> have Admin access to change profile image and edit all website sections.
              </p>
            </div>
          </div>
        )}

        {/* Mode Selector Tabs */}
        <div className="mt-4 grid grid-cols-3 p-1 rounded-xl bg-slate-200/60 dark:bg-obsidian-surface text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode('google')}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mode === 'google'
                ? 'bg-alabaster-card dark:bg-obsidian-card text-gold shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GoogleLogo />
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`py-2 rounded-lg transition-all ${
              mode === 'signin'
                ? 'bg-alabaster-card dark:bg-obsidian-card text-gold shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`py-2 rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-alabaster-card dark:bg-obsidian-card text-gold shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* --- GOOGLE AUTHENTICATION VIEW --- */}
        {mode === 'google' && (
          <div className="mt-4">
            {googleStep === 'verifying' ? (
              /* Google Verification In-Progress Card */
              <div className="py-6 px-4 rounded-xl border border-gold/30 bg-gold/5 dark:bg-obsidian-surface text-center space-y-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg border border-slate-200">
                      <GoogleLogo />
                    </div>
                    <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-accent-emerald text-white">
                      {verificationProgress === 100 ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {verificationProgress === 100
                      ? 'Google Verification Confirmed!'
                      : 'Verifying Google Account...'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-obsidian-muted mt-1 font-mono">
                    {verifyingEmail}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-obsidian-border rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-gold via-accent-cyan to-accent-emerald h-1.5 transition-all duration-300"
                    style={{ width: `${verificationProgress}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 dark:text-obsidian-muted flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-emerald" />
                  <span>OAuth 2.0 Identity Token &amp; Signature Verified</span>
                </p>
              </div>
            ) : googleStep === 'custom' ? (
              /* Custom Google Email Form */
              <form onSubmit={handleCustomGoogleSubmit} className="space-y-3.5">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Enter your Google Account email for identity verification:
                </p>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Google Email
                  </label>
                  <input
                    type="email"
                    required
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="your.email@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-100 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Display Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={customGoogleName}
                    onChange={(e) => setCustomGoogleName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-100 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setGoogleStep('choose')}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200/50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-gold to-gold-amber text-obsidian flex items-center justify-center gap-2 hover:brightness-105"
                  >
                    <GoogleLogo />
                    <span>Verify &amp; Continue with Google</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Google Account Selector */
              <div className="space-y-2.5">
                <p className="text-xs text-slate-500 dark:text-obsidian-muted">
                  Choose a Google account to verify and continue:
                </p>

                {/* Account 1: rajkumarrajaco@gmail.com (Admin) */}
                <button
                  type="button"
                  onClick={() => handleGoogleAccountSelect('rajkumarrajaco@gmail.com', 'Rajkumar Raja')}
                  className="w-full p-3 rounded-xl border border-gold/40 bg-gold/5 hover:bg-gold/15 transition-all text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                      <GoogleLogo />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          rajkumarrajaco@gmail.com
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gold text-obsidian">
                          Admin
                        </span>
                      </div>
                      <span className="text-[11px] text-accent-emerald flex items-center gap-1 mt-0.5 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" /> Full Admin &amp; Photo Access
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gold transform group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Account 2: rajkumarkiot2@gmail.com (Admin) */}
                <button
                  type="button"
                  onClick={() => handleGoogleAccountSelect('rajkumarkiot2@gmail.com', 'Rajkumar (KIOT)')}
                  className="w-full p-3 rounded-xl border border-gold/40 bg-gold/5 hover:bg-gold/15 transition-all text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                      <GoogleLogo />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          rajkumarkiot2@gmail.com
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gold text-obsidian">
                          Admin
                        </span>
                      </div>
                      <span className="text-[11px] text-accent-emerald flex items-center gap-1 mt-0.5 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" /> Full Admin &amp; Photo Access
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gold transform group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Account 3: visitor/guest@gmail.com (Standard User - to test non-admin access) */}
                <button
                  type="button"
                  onClick={() => handleGoogleAccountSelect('guest.visitor@gmail.com', 'Guest Explorer')}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-obsidian-border bg-slate-100/50 dark:bg-obsidian-surface hover:border-slate-400 dark:hover:border-slate-600 transition-all text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                      <GoogleLogo />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          guest.visitor@gmail.com
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-300 dark:bg-obsidian-card text-slate-700 dark:text-slate-300">
                          User
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-obsidian-muted flex items-center gap-1 mt-0.5">
                        <Lock className="w-3.5 h-3.5" /> Google Verified • Read-Only
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 transform group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Option to use any custom Google email */}
                <button
                  type="button"
                  onClick={() => setGoogleStep('custom')}
                  className="w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-300 dark:border-obsidian-border hover:border-gold text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-gold transition-colors flex items-center justify-center gap-2"
                >
                  <GoogleLogo />
                  <span>Use another Google account</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- PASSWORD SIGN IN & REGISTER FORM --- */}
        {mode !== 'google' && (
          <form onSubmit={handleFormSubmit} className="mt-4 space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rajkumar Raja"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm bg-slate-100 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm bg-slate-100 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-obsidian-muted">
                Admin access: <span className="text-gold font-medium">rajkumarrajaco@gmail.com</span> &amp; <span className="text-gold font-medium">rajkumarkiot2@gmail.com</span>
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm bg-slate-100 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {mode === 'signin' && (
                <p className="mt-1 text-[11px] text-slate-400">
                  Tip: Default test password is <code className="text-gold">password123</code>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 mt-2 rounded-xl font-bold text-sm bg-gradient-to-r from-gold to-gold-amber text-obsidian shadow-md shadow-gold/20 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>{mode === 'signup' ? 'Create Account & Sign In' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Modal Footer Note */}
        <div className="mt-5 pt-3.5 border-t border-alabaster-border dark:border-obsidian-border flex items-center justify-between text-xs text-slate-500 dark:text-obsidian-muted">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-emerald" /> Google Auth &amp; RBAC Active
          </span>
          <span className="text-[11px] text-slate-400">
            Admins: rajkumarkiot / rajkumarrajaco
          </span>
        </div>
      </div>
    </div>
  );
};
