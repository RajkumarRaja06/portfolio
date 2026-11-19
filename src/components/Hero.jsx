import React, { useState } from 'react';
import { ArrowRight, Mail, CheckCircle2 } from 'lucide-react';

// Code-wise Profile Portrait Photo Configuration
// To change the profile image, simply update the image path below:
export const PROFILE_IMAGE_URL = '/me1.jpg';

export const Hero = () => {
  const [imageError, setImageError] = useState(false);

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
              <span>Available for Odoo ERP &amp; Full-Stack Projects</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-amber to-gold-light">
                Rajkumar Raja
              </span>
            </h1>

            {/* Sub-headline: Dual Specialization */}
            <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              <strong className="text-gold font-bold">Odoo Developer (v16–v19)</strong> &amp;{' '}
              <strong className="text-slate-900 dark:text-white font-bold">Full-Stack Web Architect</strong> based in Coimbatore, India.
              Crafting scalable ERP modules, custom Python business logic, and lightning-fast React applications.
            </p>

            {/* Quick Proof Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0" />
                <span>Odoo v16, v17, v18 &amp; v19 OWL Ready</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0" />
                <span>React, Node.js &amp; Modern Architecture</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0" />
                <span>Automated Timesheet &amp; Helpdesk Portals</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0" />
                <span>Shopify Liquid &amp; E-Commerce Integration</span>
              </div>
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
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-alabaster-border dark:border-obsidian-border w-full grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-gold font-mono">15+</p>
                <p className="text-xs text-slate-500 dark:text-obsidian-muted font-medium">Delivered Projects</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-gold font-mono">v16-v19</p>
                <p className="text-xs text-slate-500 dark:text-obsidian-muted font-medium">Odoo Ecosystem</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-gold font-mono">100%</p>
                <p className="text-xs text-slate-500 dark:text-obsidian-muted font-medium">Clean Code Quality</p>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Portrait with Luxury Bezel */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Circular Portrait Frame Container */}
            <div className="relative group flex items-center justify-center">
              
              {/* Outer Pulsing Aura Glow */}
              <div 
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold/30 via-accent-cyan/20 to-gold-amber/30 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 -z-10 transform scale-105" 
                aria-hidden="true"
              />

              {/* Dark Outer Track */}
              <div className="relative p-2.5 sm:p-3 rounded-full bg-[#110e1b] shadow-2xl shadow-black/80">
                
                {/* Warm Gold Inner Bezel */}
                <div className="p-1.5 rounded-full bg-gradient-to-tr from-gold via-gold-amber to-gold-dark shadow-inner">
                  
                  {/* Circular Portrait Canvas: clamp(240px, 28vw, 330px) */}
                  <div className="relative w-[clamp(240px,28vw,330px)] h-[clamp(240px,28vw,330px)] rounded-full overflow-hidden bg-obsidian-surface select-none shadow-inner">
                    {!imageError && PROFILE_IMAGE_URL ? (
                      <img
                        src={PROFILE_IMAGE_URL}
                        alt="Rajkumar Raja portrait"
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      /* Monogram Silhouette Fallback Avatar */
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
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
