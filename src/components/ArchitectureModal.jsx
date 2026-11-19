import React, { useEffect, useState } from 'react';
import { X, Copy, Check, Terminal, Layers, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ArchitectureModal = ({ project, onClose, onNotify }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const { title, badge, architecture, techStack } = project;

  const handleCopyCode = async () => {
    if (architecture?.codeSnippet) {
      try {
        await navigator.clipboard.writeText(architecture.codeSnippet);
        setCopied(true);
        if (onNotify) onNotify('Code snippet copied to clipboard!');
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = architecture.codeSnippet;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        if (onNotify) onNotify('Code snippet copied to clipboard!');
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-obsidian/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-obsidian-surface border border-obsidian-border rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-obsidian-border bg-obsidian/90">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-gold/10 text-gold border border-gold/20">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gold/20 text-gold-light border border-gold/30">
                  {badge}
                </span>
                <span className="text-xs text-obsidian-muted font-mono">Architecture &amp; Code</span>
              </div>
              <h3 id="modal-title" className="text-lg md:text-xl font-bold text-white tracking-tight">
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="touch-target p-2 rounded-lg text-obsidian-muted hover:text-white hover:bg-obsidian-card border border-transparent hover:border-obsidian-border transition-colors focus:ring-2 focus:ring-gold"
            aria-label="Close architecture modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Architecture Overview */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-light flex items-center gap-2">
              <Terminal className="w-4 h-4 text-gold" />
              Architectural Overview &amp; Data Flow
            </h4>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed bg-obsidian-card/80 p-4 rounded-xl border border-obsidian-border">
              {architecture?.overview}
            </p>
          </div>

          {/* Key Architecture Highlights */}
          {architecture?.keyHighlights && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-accent-cyan flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                Technical Implementation Highlights
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {architecture.keyHighlights.map((highlight, idx) => (
                  <li 
                    key={idx}
                    className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300 bg-obsidian-card/60 p-3 rounded-lg border border-obsidian-border/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-obsidian-muted uppercase tracking-wider">
              Component Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-obsidian-card text-slate-300 border border-obsidian-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Realistic Code Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Production-Ready Implementation Snippet
              </span>
              <button
                onClick={handleCopyCode}
                className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gold/15 text-gold hover:bg-gold/25 border border-gold/30 transition-all focus:ring-2 focus:ring-gold"
                aria-label="Copy code snippet to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="relative rounded-xl overflow-hidden border border-obsidian-border bg-black/80 font-mono text-xs leading-relaxed text-slate-200">
              <div className="flex items-center justify-between px-4 py-2 bg-obsidian-card/90 border-b border-obsidian-border text-xs text-obsidian-muted">
                <span>models/controllers snippet</span>
                <span>UTF-8 • python / liquid</span>
              </div>
              <pre className="p-4 overflow-x-auto text-[13px] leading-6 selection:bg-gold/30">
                <code>{architecture?.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-obsidian-border bg-obsidian/90">
          <button
            onClick={onClose}
            className="touch-target px-5 py-2 text-sm font-semibold rounded-xl bg-obsidian-card text-slate-200 hover:text-white hover:bg-obsidian-border border border-obsidian-border transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
