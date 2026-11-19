import React from 'react';
import { CheckCircle, Info } from 'lucide-react';

export const NotificationToast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-short shadow-2xl"
      aria-live="polite"
      role="status"
    >
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-obsidian-card border border-gold/40 text-slate-100 shadow-xl backdrop-blur-md">
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-gold shrink-0" />
        ) : (
          <Info className="w-5 h-5 text-accent-cyan shrink-0" />
        )}
        <span className="text-sm font-medium">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-slate-400 hover:text-white text-xs p-1"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
