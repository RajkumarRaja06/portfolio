import React from 'react';
import { X, ShieldCheck, Mail, User, Database, CheckCircle2, LogOut, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfileModal = ({ isOpen, onClose, onNotify }) => {
  const { currentUser, isAdmin, logout } = useAuth();

  if (!isOpen || !currentUser) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-obsidian-card border border-slate-200 dark:border-obsidian-border shadow-2xl p-6 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-obsidian-border">
          <h3 className="text-base font-bold flex items-center gap-2">
            <User className="w-4 h-4 text-gold" />
            <span>User Profile</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Card */}
        <div className="pt-4 flex flex-col items-center text-center space-y-3">
          <div className="relative">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gold shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gold to-gold-amber text-obsidian font-black text-2xl flex items-center justify-center shadow-md">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            {currentUser.isEmailVerified && (
              <span
                className="absolute bottom-0 right-0 p-1 rounded-full bg-accent-emerald text-white shadow-sm"
                title="Google Verified Account"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {currentUser.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-obsidian-muted font-mono mt-0.5">
              {currentUser.email}
            </p>
          </div>

          {/* Role Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold/15 text-gold-dark dark:text-gold border border-gold/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAdmin ? 'Administrator (Full Access)' : 'Standard User'}</span>
          </div>

          {/* Details list */}
          <div className="w-full pt-3 space-y-2 text-xs text-left">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-surface border border-slate-200 dark:border-obsidian-border flex items-center justify-between">
              <span className="text-slate-500 dark:text-obsidian-muted">Auth Provider</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <span>Google Firebase</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-surface border border-slate-200 dark:border-obsidian-border flex items-center justify-between">
              <span className="text-slate-500 dark:text-obsidian-muted">Database Engine</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Database className="w-3 h-3 text-gold" />
                <span>Cloud Firestore</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-surface border border-slate-200 dark:border-obsidian-border flex items-center justify-between">
              <span className="text-slate-500 dark:text-obsidian-muted">Photo Edit Access</span>
              <span className={`font-semibold ${isAdmin ? 'text-accent-emerald' : 'text-slate-400'}`}>
                {isAdmin ? 'Allowed' : 'Locked'}
              </span>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={() => {
              logout();
              onClose();
              if (onNotify) onNotify('Signed out successfully.');
            }}
            className="w-full mt-2 py-2 px-4 rounded-xl text-xs font-bold text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
