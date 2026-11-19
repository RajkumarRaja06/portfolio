import React from 'react';
import { Briefcase, GraduationCap, MapPin, Globe, GitBranch, Layers, CheckCircle, Edit } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { useAuth } from '../context/AuthContext';

export const About = () => {
  const { aboutData } = usePortfolioData();
  const { isAdmin } = useAuth();

  return (
    <section
      id="about"
      className="py-16 md:py-24 border-t border-slate-200 dark:border-obsidian-border/70 relative"
      aria-label="About and Experience Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="flex flex-col items-start max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-gold/10 text-gold border border-gold/20 text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>{aboutData.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {aboutData.heading}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              {aboutData.subheading}
            </p>
          </div>

          {isAdmin && (
            <a
              href="#admin-section"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-obsidian-card text-gold border border-gold/30 hover:border-gold shrink-0 transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit About Section</span>
            </a>
          )}
        </div>

        {/* 2-Column Split: Narrative & Core Details Card (Left) | Experience & Education Timeline (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          
          {/* Left Column (6 cols): Narrative & 2x2 Details Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="prose prose-slate dark:prose-invert max-w-none text-base sm:text-lg text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
              {aboutData.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* 2x2 Details Card (<dl>) */}
            <div className="p-6 rounded-2xl bg-slate-100 dark:bg-obsidian-surface border border-slate-200 dark:border-obsidian-border shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gold mb-4 font-mono">
                Core Specifications
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Location */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-obsidian-card border border-slate-200/80 dark:border-obsidian-border/80">
                  <div className="p-2 rounded-lg bg-gold/10 text-gold shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-obsidian-muted font-medium">Location</dt>
                    <dd className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{aboutData.specifications.location}</dd>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-obsidian-card border border-slate-200/80 dark:border-obsidian-border/80">
                  <div className="p-2 rounded-lg bg-accent-cyan/10 text-accent-cyan shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-obsidian-muted font-medium">Languages</dt>
                    <dd className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{aboutData.specifications.languages}</dd>
                  </div>
                </div>

                {/* ERP Versions */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-obsidian-card border border-slate-200/80 dark:border-obsidian-border/80">
                  <div className="p-2 rounded-lg bg-accent-emerald/10 text-accent-emerald shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-obsidian-muted font-medium">ERP Versions</dt>
                    <dd className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{aboutData.specifications.erpVersions}</dd>
                  </div>
                </div>

                {/* Version Control */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-obsidian-card border border-slate-200/80 dark:border-obsidian-border/80">
                  <div className="p-2 rounded-lg bg-accent-magenta/10 text-accent-magenta shrink-0">
                    <GitBranch className="w-4 h-4" />
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-obsidian-muted font-medium">Version Control</dt>
                    <dd className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{aboutData.specifications.versionControl}</dd>
                  </div>
                </div>

              </dl>
            </div>

          </div>

          {/* Right Column (6 cols): Experience & Education Timeline */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Experience Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                <Briefcase className="w-4 h-4 text-gold" />
                <span>Work Experience</span>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-gold/40 space-y-6">
                
                {/* Timeline Item 1: Bambus Technologies */}
                <div className="relative group">
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-gold ring-4 ring-gold/20 shadow-md shadow-gold/30" />
                  
                  <div className="p-6 rounded-2xl bg-slate-100 dark:bg-obsidian-surface border border-slate-200 dark:border-obsidian-border hover:border-gold/50 transition-colors">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        Software Developer / Odoo Developer
                      </h4>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold/15 text-gold-amber border border-gold/30">
                        Jan 2024 – Present
                      </span>
                    </div>

                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4 flex items-center gap-1.5">
                      <span className="text-slate-900 dark:text-slate-200 font-bold">Bambus Technologies LLP</span>
                      <span>•</span>
                      <span>Coimbatore, TN</span>
                    </div>

                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-gold mt-1 shrink-0" />
                        <span>Architected and deployed tailored Odoo v16–v19 enterprise modules, including secure Helpdesk and Timesheet client portals with role-based access control and real-time Chatter integration.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-gold mt-1 shrink-0" />
                        <span>Engineered automated business workflows and robust REST API pipelines connecting Odoo ERP with external marketplace endpoints for real-time inventory and order synchronization.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-gold mt-1 shrink-0" />
                        <span>Conducted technical SEO and CRO audits for high-volume Shopify Liquid storefronts (Dawn and Dwell themes), optimizing Core Web Vitals to achieve 95+ performance scores and increased organic conversions.</span>
                      </li>
                    </ul>

                  </div>
                </div>

              </div>
            </div>

            {/* Education Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                <GraduationCap className="w-4 h-4 text-accent-cyan" />
                <span>Education</span>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-accent-cyan/40">
                
                {/* Timeline Item 2: Knowledge Institute of Technology */}
                <div className="relative group">
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-accent-cyan ring-4 ring-accent-cyan/20 shadow-md shadow-accent-cyan/30" />
                  
                  <div className="p-6 rounded-2xl bg-slate-100 dark:bg-obsidian-surface border border-slate-200 dark:border-obsidian-border hover:border-accent-cyan/50 transition-colors">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        Bachelor of Engineering (B.E.)
                      </h4>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                        Graduated: 2021
                      </span>
                    </div>

                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">
                      <span className="text-slate-900 dark:text-slate-200 font-bold">Knowledge Institute of Technology (KIOT)</span>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Comprehensive engineering curriculum emphasizing foundational software engineering, relational database design, algorithmic problem solving, structured debugging, and cross-team project collaboration.
                    </p>

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
