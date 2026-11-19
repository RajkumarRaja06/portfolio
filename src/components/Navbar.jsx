import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, Sparkles, LogIn, LogOut, ShieldCheck, User, Settings, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Official Google Logo SVG
const GoogleGLogo = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

export const Navbar = ({ darkMode, onToggleTheme, onNotify, onOpenGoogleAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileMenuRef = useRef(null);

  const { currentUser, isAuthenticated, isAdmin, logout, openAuthModal, openProfileModal } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setProfileDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    logout();
    if (onNotify) onNotify('Signed out from Google Firebase.');
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-alabaster/85 dark:bg-obsidian/85 backdrop-blur-md border-b border-alabaster-border dark:border-obsidian-border shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Monogram & Name */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl p-1"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold via-gold-amber to-gold-dark flex items-center justify-center shadow-lg shadow-gold/20 transform group-hover:scale-105 transition-transform duration-200">
              <span className="font-mono font-black text-xl text-obsidian tracking-wider">
                RR
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-gold transition-colors">
                Rajkumar Raja
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-obsidian-muted flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-ping" />
                Odoo &amp; Full-Stack Developer
              </span>
            </div>
          </a>

          {/* Right Desktop: Nav Links + Auth Dropdown + Theme Toggle + Hire Me CTA */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Desktop Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="touch-target px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-gold dark:hover:text-gold rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-gold"
              >
                {link.name}
              </a>
            ))}

            {/* Admin Studio Nav Link (if Admin) */}
            {isAdmin && (
              <a
                href="#admin-section"
                onClick={(e) => handleLinkClick(e, '#admin-section')}
                className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-gold/15 text-gold border border-gold/40 hover:bg-gold/25 transition-all shadow-sm"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Admin Studio</span>
              </a>
            )}

            <div className="h-6 w-px bg-slate-300 dark:bg-obsidian-border mx-1" aria-hidden="true" />

            {/* Profile Avatar with Dropdown matching Screenshot Image 2 */}
            {isAuthenticated ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="touch-target relative w-10 h-10 rounded-full p-0.5 border-2 border-gold hover:border-gold-light shadow-md overflow-hidden bg-white dark:bg-obsidian-surface flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold"
                  title={`${currentUser.name} (${currentUser.email})`}
                  aria-expanded={profileDropdownOpen}
                >
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-xl select-none">🤩</span>
                  )}
                </button>

                {/* Floating Dropdown matching Image 2 */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#cad3e0]/95 dark:bg-[#202534]/95 backdrop-blur-xl text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 shadow-2xl p-1.5 space-y-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* Add Item ⊕ (for Admin) */}
                    {isAdmin && (
                      <a
                        href="#admin-section"
                        onClick={(e) => {
                          setProfileDropdownOpen(false);
                          handleLinkClick(e, '#admin-section');
                        }}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-white/80 dark:hover:bg-slate-700/60 transition-colors group"
                      >
                        <span>Add Item</span>
                        <PlusCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                      </a>
                    )}

                    {/* Profile 👤 */}
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        openProfileModal();
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-700/60 transition-colors"
                    >
                      <span>Profile</span>
                      <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    </button>

                    <div className="border-t border-slate-300 dark:border-slate-700/60 my-1" />

                    {/* Logout ↪ */}
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                    >
                      <span>Logout</span>
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Google Sign In Trigger Button */
              <button
                onClick={() => {
                  if (onOpenGoogleAuth) onOpenGoogleAuth();
                  else openAuthModal();
                }}
                className="touch-target inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-white dark:bg-obsidian-surface text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-obsidian-border hover:border-gold transition-all shadow-sm"
                title="Sign in with Google Firebase"
              >
                <GoogleGLogo />
                <span>Sign In</span>
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="touch-target p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-gold dark:hover:text-gold hover:bg-slate-200/50 dark:hover:bg-obsidian-card border border-transparent hover:border-slate-300 dark:hover:border-obsidian-border transition-all focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-gold-light" />
              ) : (
                <Moon className="w-5 h-5 text-slate-800" />
              )}
            </button>

            {/* Hire Me CTA Button */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="touch-target inline-flex items-center gap-1.5 ml-1 px-4 py-2 rounded-xl font-bold text-sm bg-gradient-to-r from-gold to-gold-amber text-obsidian shadow-md shadow-gold/20 hover:shadow-lg hover:shadow-gold/30 hover:brightness-105 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-gold"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="touch-target p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-gold dark:hover:text-gold hover:bg-slate-200/60 dark:hover:bg-obsidian-card border border-slate-200 dark:border-obsidian-border transition-all"
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-gold-light" />
              ) : (
                <Moon className="w-5 h-5 text-slate-800" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="touch-target p-2.5 rounded-xl text-slate-800 dark:text-slate-200 hover:text-gold dark:hover:text-gold hover:bg-slate-200/60 dark:hover:bg-obsidian-card border border-slate-200 dark:border-obsidian-border transition-all focus-visible:ring-2 focus-visible:ring-gold"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-b border-alabaster-border dark:border-obsidian-border bg-alabaster/95 dark:bg-obsidian/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl"
        >
          {/* Mobile Auth Banner */}
          <div className="p-3 rounded-xl bg-slate-200/60 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-gold flex items-center justify-center bg-white dark:bg-obsidian-card text-base">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>🤩</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-obsidian-muted truncate max-w-[180px]">
                      {currentUser.email}
                    </p>
                    <span
                      className={`text-[10px] font-semibold flex items-center gap-1 mt-0.5 ${
                        isAdmin ? 'text-accent-emerald' : 'text-slate-500'
                      }`}
                    >
                      {isAdmin && <ShieldCheck className="w-3 h-3" />}
                      {isAdmin ? 'Admin • Full Access' : 'Standard User'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-rose-500/30"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Google Authentication
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-obsidian-muted">
                    Sign in to access admin studio
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (onOpenGoogleAuth) onOpenGoogleAuth();
                    else openAuthModal();
                    setMobileMenuOpen(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-obsidian-card text-slate-900 dark:text-white border border-slate-300 dark:border-obsidian-border hover:border-gold"
                >
                  <GoogleGLogo />
                  <span>Sign In</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="touch-target w-full justify-start px-4 py-3 rounded-xl text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-gold dark:hover:text-gold hover:bg-slate-200/50 dark:hover:bg-obsidian-card transition-colors"
              >
                {link.name}
              </a>
            ))}

            {isAdmin && (
              <a
                href="#admin-section"
                onClick={(e) => handleLinkClick(e, '#admin-section')}
                className="touch-target w-full justify-start px-4 py-3 rounded-xl text-base font-bold text-blue-500 hover:bg-blue-500/10 transition-colors flex items-center justify-between"
              >
                <span>Add Item (Projects)</span>
                <PlusCircle className="w-4 h-4 text-blue-500" />
              </a>
            )}
          </div>

          <div className="pt-2">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="touch-target w-full justify-center px-5 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-gold to-gold-amber text-obsidian shadow-md shadow-gold/20 hover:brightness-105 active:scale-95 transition-all text-center flex items-center gap-2"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
