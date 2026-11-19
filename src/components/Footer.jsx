import React from 'react';
import { ArrowUp, Heart, Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-obsidian-border bg-slate-50 dark:bg-obsidian-surface py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Brand Monogram & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-gold-amber flex items-center justify-center shadow-md">
              <span className="font-mono font-black text-base text-obsidian">RR</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                Rajkumar Raja
              </span>
              <span className="text-xs text-slate-500 dark:text-obsidian-muted">
                Odoo Developer (v16–v19) &amp; Full-Stack Web Developer
              </span>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
            <a 
              href="#about" 
              onClick={(e) => handleLinkClick(e, '#about')}
              className="hover:text-gold dark:hover:text-gold transition-colors py-1"
            >
              About
            </a>
            <a 
              href="#projects" 
              onClick={(e) => handleLinkClick(e, '#projects')}
              className="hover:text-gold dark:hover:text-gold transition-colors py-1"
            >
              Projects
            </a>
            <a 
              href="#skills" 
              onClick={(e) => handleLinkClick(e, '#skills')}
              className="hover:text-gold dark:hover:text-gold transition-colors py-1"
            >
              Skills
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="hover:text-gold dark:hover:text-gold transition-colors py-1"
            >
              Contact
            </a>
          </div>

          {/* Right: Smooth Scroll Back To Top Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-obsidian-card text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-obsidian-border hover:border-gold hover:text-gold dark:hover:text-gold shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Scroll back to top of page"
            >
              <span>Back to top ↑</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-obsidian-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-obsidian-muted gap-4">
          <p>© {currentYear} Rajkumar Raja. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Architected in Coimbatore, Tamil Nadu, India
          </p>
        </div>

      </div>
    </footer>
  );
};
