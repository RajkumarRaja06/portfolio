import React from 'react';
import { Layers, Boxes, Code2, TrendingUp, Database, Wrench, Edit } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { useAuth } from '../context/AuthContext';

export const Skills = () => {
  const { skillsData } = usePortfolioData();
  const { isAdmin } = useAuth();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Boxes':
        return <Boxes className="w-5 h-5" />;
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'Database':
        return <Database className="w-5 h-5" />;
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="skills"
      className="py-16 md:py-24 border-t border-slate-200 dark:border-obsidian-border/70 relative"
      aria-label="Categorized Technical Skills Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="flex flex-col items-start max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-gold/10 text-gold border border-gold/20 text-xs font-bold uppercase tracking-wider mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Categorized Technical Skills
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              Specialized toolsets, enterprise ERP proficiencies, full-stack web libraries, and performance optimization practices.
            </p>
          </div>

          {isAdmin && (
            <a
              href="#admin-section"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-obsidian-card text-gold border border-gold/30 hover:border-gold shrink-0 transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Add / Manage Skills</span>
            </a>
          )}
        </div>

        {/* Responsive Grid of Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillsData.map((cat) => {
            const accent = cat.accentColor || '#e5a93c';

            return (
              <div
                key={cat.id}
                className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-obsidian-card border border-slate-200 dark:border-obsidian-border hover:border-gold/50 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle Top Accent Border */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5"
                  style={{ backgroundColor: accent }}
                />

                <div className="space-y-4">
                  {/* Card Header & Icon */}
                  <div className="flex items-center gap-3.5">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm shrink-0"
                      style={{ 
                        backgroundColor: `${accent}18`, 
                        borderColor: `${accent}40`,
                        color: accent 
                      }}
                    >
                      {getIcon(cat.icon)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        {cat.title}
                      </h3>
                      <span className="text-xs font-medium text-slate-500 dark:text-obsidian-muted">
                        {cat.skills.length} Capabilities
                      </span>
                    </div>
                  </div>

                  {/* Summary Narrative */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cat.summary}
                  </p>

                  {/* Chips Grid */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-obsidian-surface text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-obsidian-border/80 font-mono transition-colors group-hover:border-gold/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Accent Subtle Bar */}
                <div className="mt-6 pt-3 border-t border-slate-100 dark:border-obsidian-border/60 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Specialization Core</span>
                  <span className="text-gold font-bold">100% Practical</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
