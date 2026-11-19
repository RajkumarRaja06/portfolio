import React, { useRef, useState, useEffect } from 'react';
import { Camera, RotateCcw, ArrowRight, Mail, Sparkles, CheckCircle2, Lock, ShieldCheck, AlertCircle, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

const STORAGE_KEY = 'rajkumar_avatar_data_v2';
const DEFAULT_AVATAR_URL = '/me1.jpg';

export const Hero = ({ onNotify }) => {
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR_URL);
  const [hasCustomAvatar, setHasCustomAvatar] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { currentUser, isAuthenticated, isAdmin, openAuthModal } = useAuth();
  const { heroData } = usePortfolioData();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setAvatar(saved);
        setHasCustomAvatar(true);
      }
    } catch (e) {
      console.warn('LocalStorage error reading avatar', e);
    }
  }, []);

  const handleAvatarClick = () => {
    // 1. Check if user is authenticated
    if (!isAuthenticated) {
      if (onNotify) {
        onNotify('Authentication required: Please sign in with an Admin account (rajkumarrajaco or rajkumarkiot) to change the profile photo.', 'error');
      }
      openAuthModal('Please sign in with Admin Google credentials to change the profile picture.');
      return;
    }

    // 2. Check if user is an Admin
    if (!isAdmin) {
      if (onNotify) {
        onNotify(
          'Access Denied: Only rajkumarrajaco and rajkumarkiot have Admin privileges to change the profile image.',
          'error'
        );
      }
      return;
    }

    // 3. Admin authorized, open file picker
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isAuthenticated || !isAdmin) {
      if (onNotify) {
        onNotify('Access Denied: You do not have permission to upload photos.', 'error');
      }
      return;
    }

    if (!file.type.startsWith('image/')) {
      if (onNotify) onNotify('Please select a valid image file (PNG, JPG, WEBP).', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      if (onNotify) onNotify('Image size exceeds 5MB limit. Please pick a smaller image.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        try {
          localStorage.setItem(STORAGE_KEY, dataUrl);
          setAvatar(dataUrl);
          setHasCustomAvatar(true);
          setImageError(false);
          if (onNotify) onNotify('Profile portrait updated and saved successfully!');
        } catch (err) {
          console.error('Error saving image to localStorage', err);
          if (onNotify) onNotify('Image too large for browser storage quota.', 'error');
        }
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleResetAvatar = (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      if (onNotify) {
        onNotify('Authentication required: Please sign in to reset the profile photo.', 'error');
      }
      openAuthModal('Please sign in with an Admin account to reset the portrait.');
      return;
    }

    if (!isAdmin) {
      if (onNotify) {
        onNotify(
          'Access Denied: Only rajkumarrajaco and rajkumarkiot can reset the profile photo.',
          'error'
        );
      }
      return;
    }

    try {
      localStorage.removeItem(STORAGE_KEY);
      setAvatar(DEFAULT_AVATAR_URL);
      setHasCustomAvatar(false);
      setImageError(false);
      if (onNotify) onNotify('Restored default profile portrait avatar.');
    } catch (err) {
      console.error('Error resetting avatar', err);
    }
  };

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden"
      aria-label="Introduction &amp; Hero Section"
    >
      {/* Background Ambient Radial Glows */}
      <div 
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-gold/15 via-accent-cyan/10 to-transparent blur-3xl opacity-70 -z-10" 
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute top-40 right-10 w-[350px] h-[350px] bg-gold/10 blur-[100px] rounded-full -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (7 cols): Bio, Value Prop, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gold/10 dark:bg-gold/15 border border-gold/30 text-gold-dark dark:text-gold-light text-xs sm:text-sm font-semibold tracking-wide shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-emerald" />
              </span>
              <span>{heroData.statusBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-amber to-gold-light">
                {heroData.name}
              </span>
            </h1>

            {/* Sub-headline: Dual Specialization */}
            <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              <strong className="text-gold font-bold">{heroData.titleRole}</strong> &amp;{' '}
              <strong className="text-slate-900 dark:text-white font-bold">{heroData.titleSecondary}</strong> based in {heroData.location}.{' '}
              {heroData.bio}
            </p>

            {/* Quick Proof Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl pt-2">
              {heroData.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTAs: Primary & Secondary */}
            <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('#projects')}
                className="touch-target inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base bg-gradient-to-r from-gold to-gold-amber text-obsidian shadow-xl shadow-gold/25 hover:shadow-gold/40 hover:brightness-105 active:scale-95 transition-all group"
              >
                <span>View Selected Work</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('#contact')}
                className="touch-target inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base bg-slate-200/80 dark:bg-obsidian-card text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-obsidian-border hover:border-gold hover:text-gold dark:hover:text-gold active:scale-95 transition-all"
              >
                <Mail className="w-5 h-5" />
                <span>Contact Me</span>
              </button>

              {isAdmin && (
                <a
                  href="#admin-section"
                  className="touch-target inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-obsidian text-gold border border-gold/40 hover:border-gold shadow-md hover:brightness-110 active:scale-95 transition-all"
                >
                  <Settings className="w-4 h-4 text-gold" />
                  <span>Edit Sections</span>
                </a>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-alabaster-border dark:border-obsidian-border w-full grid grid-cols-3 gap-4 text-left">
              {heroData.metrics.map((metric, idx) => (
                <div key={idx}>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gold font-mono">{metric.value}</p>
                  <p className="text-xs text-slate-500 dark:text-obsidian-muted font-medium">{metric.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column (5 cols): Portrait with Luxury Bezel & RBAC Photo Editing */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Circular Portrait Frame Container */}
            <div className="relative group flex items-center justify-center">
              
              {/* Outer Pulsing Aura Glow */}
              <div 
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold/30 via-accent-cyan/20 to-gold-amber/30 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 -z-10 transform scale-105" 
                aria-hidden="true"
              />

              {/* Dark Outer Track (#110e1b) */}
              <div className="relative p-2.5 sm:p-3 rounded-full bg-[#110e1b] shadow-2xl shadow-black/80">
                
                {/* Warm Gold Inner Bezel (#e5a93c) */}
                <div className="p-1.5 rounded-full bg-gradient-to-tr from-gold via-gold-amber to-gold-dark shadow-inner">
                  
                  {/* Circular Portrait Canvas: clamp(240px, 28vw, 330px) */}
                  <div
                    onClick={handleAvatarClick}
                    tabIndex={0}
                    role="button"
                    aria-label={
                      isAdmin
                        ? "Profile photo of Rajkumar Raja. Click to change photo"
                        : "Profile photo of Rajkumar Raja. Admin authentication required to edit"
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleAvatarClick();
                      }
                    }}
                    className="relative w-[clamp(240px,28vw,330px)] h-[clamp(240px,28vw,330px)] rounded-full overflow-hidden bg-obsidian-surface cursor-pointer select-none focus:outline-none focus:ring-4 focus:ring-gold"
                  >
                    {!imageError && avatar ? (
                      <img
                        src={avatar}
                        alt="Rajkumar Raja portrait"
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      /* Custom SVG Fallback Avatar (RR Monogram Silhouette) */
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#181f33] to-[#0c101c] text-gold">
                        <svg viewBox="0 0 100 100" className="w-3/5 h-3/5 fill-current opacity-85">
                          <circle cx="50" cy="38" r="22" />
                          <path d="M 20 88 C 20 65, 35 58, 50 58 C 65 58, 80 65, 80 88 Z" />
                        </svg>
                        <span className="font-mono font-black text-2xl tracking-widest text-gold -mt-2">
                          RR
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay Hint based on Auth & Authorization */}
                    <div className="absolute inset-0 bg-obsidian/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300 px-4 text-center">
                      {!isAuthenticated ? (
                        <>
                          <Lock className="w-8 h-8 text-gold mb-1.5" />
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-100">
                            Sign In to Edit
                          </span>
                          <span className="text-[10px] text-slate-300 mt-1">
                            Admin accounts only
                          </span>
                        </>
                      ) : !isAdmin ? (
                        <>
                          <Lock className="w-8 h-8 text-rose-400 mb-1.5" />
                          <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                            Admin Only
                          </span>
                          <span className="text-[10px] text-slate-300 mt-1">
                            rajkumarkiot &amp; rajkumarrajaco
                          </span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-8 h-8 text-gold mb-1" />
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-100">
                            {hasCustomAvatar ? 'Change Photo' : 'Upload Your Photo'}
                          </span>
                          <span className="text-[10px] text-accent-emerald mt-1 font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Admin Privileges Active
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                </div>

              </div>

              {/* Floating Action Badge on Portrait */}
              <button
                onClick={handleAvatarClick}
                className={`touch-target absolute bottom-2 right-2 p-3 rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold z-10 ${
                  isAdmin
                    ? 'bg-gold text-obsidian shadow-gold/30'
                    : isAuthenticated
                    ? 'bg-slate-700 text-slate-300 border border-slate-600'
                    : 'bg-gold/90 text-obsidian shadow-gold/30'
                }`}
                aria-label={isAdmin ? "Upload portrait photo" : "Sign in to change photo"}
                title={
                  isAdmin
                    ? "Upload or change photo (Admin Access)"
                    : !isAuthenticated
                    ? "Sign in to change photo"
                    : "Photo editing locked to admins"
                }
              >
                {isAdmin ? (
                  <Camera className="w-5 h-5 font-bold" />
                ) : (
                  <Lock className="w-5 h-5 font-bold" />
                )}
              </button>
            </div>

            {/* Hidden Input for FileReader */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              aria-hidden="true"
            />

            {/* Photo Action Controls (Upload / Change & Reset) */}
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handleAvatarClick}
                className={`touch-target inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors ${
                  isAdmin
                    ? 'bg-slate-200 dark:bg-obsidian-card text-slate-800 dark:text-slate-200 border-slate-300 dark:border-obsidian-border hover:border-gold hover:text-gold dark:hover:text-gold'
                    : 'bg-slate-200/60 dark:bg-obsidian-card/60 text-slate-600 dark:text-slate-400 border-dashed border-slate-300 dark:border-obsidian-border hover:border-gold hover:text-gold'
                }`}
              >
                {isAdmin ? (
                  <>
                    <Camera className="w-3.5 h-3.5 text-gold" />
                    <span>{hasCustomAvatar ? 'Change Photo' : 'Upload Photo'}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-gold" />
                    <span>{isAuthenticated ? 'Photo Locked' : 'Sign In to Edit'}</span>
                  </>
                )}
              </button>

              {hasCustomAvatar && isAdmin && (
                <button
                  onClick={handleResetAvatar}
                  className="touch-target inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg text-rose-500 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors"
                  title="Reset to default portrait photo"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* RBAC Security Info Pill */}
            <div className="mt-3 text-center">
              {isAdmin ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald text-[11px] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Access: <strong>{currentUser?.email}</strong></span>
                </div>
              ) : isAuthenticated ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-[11px]">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>Signed in as <strong>{currentUser?.email}</strong> • Read-only access</span>
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 dark:text-obsidian-muted flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3 text-gold" />
                  <span>Admin privileges reserved for <strong>rajkumarrajaco</strong> &amp; <strong>rajkumarkiot</strong></span>
                </p>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
