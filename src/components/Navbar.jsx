import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar = ({ darkMode, onToggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
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

          {/* Right Desktop: Nav Links + Theme Toggle + Hire Me CTA */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Desktop Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="touch-target px-3.5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-gold dark:hover:text-gold rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-gold"
              >
                {link.name}
              </a>
            ))}

            <div className="h-6 w-px bg-slate-300 dark:bg-obsidian-border mx-1.5" aria-hidden="true" />

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

          {/* Mobile Right Controls: Theme Toggle & Hamburger Drawer Button */}
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
