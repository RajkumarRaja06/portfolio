import React, { useState } from 'react';
import { ProjectSvgPreview } from './ProjectSvgPreviews';
import { ArchitectureModal } from './ArchitectureModal';
import { ExternalLink, Github, Code, ChevronDown, ChevronUp, Layers, Sparkles, PlusCircle, ShieldCheck } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { useAuth } from '../context/AuthContext';

const INITIAL_VISIBLE_COUNT = 6;

const DEFAULT_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'odoo', label: 'Odoo' },
  { id: 'react', label: 'React' },
  { id: 'html-css', label: 'HTML & CSS' },
];

export const Projects = ({ onNotify }) => {
  const { projects } = usePortfolioData();
  const { isAdmin } = useAuth();

  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  // Dynamically extract categories from all projects
  const uniqueCategories = [
    ...DEFAULT_CATEGORIES,
    ...projects
      .filter((p) => !DEFAULT_CATEGORIES.some((c) => c.id === p.categoryId))
      .reduce((acc, p) => {
        if (!acc.some((c) => c.id === p.categoryId)) {
          acc.push({ id: p.categoryId, label: p.category || p.categoryId });
        }
        return acc;
      }, []),
  ];

  // Filter projects according to category
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.categoryId === activeCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;
  const remainingCount = filteredProjects.length - visibleCount;

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleToggleShowMore = () => {
    if (hasMore) {
      setVisibleCount(filteredProjects.length);
    } else {
      setVisibleCount(INITIAL_VISIBLE_COUNT);
      const section = document.getElementById('projects');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projects"
      className="py-16 md:py-24 border-t border-slate-200 dark:border-obsidian-border/70 relative"
      aria-label="Projects Showcase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="flex flex-col items-start max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-gold/10 text-gold border border-gold/20 text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Curated Portfolio of {projects.length} Applications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured Projects &amp; ERP Implementations
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              From enterprise-scale Odoo backend modules and automated data pipelines to high-performance React web applications and interactive UI utilities.
            </p>
          </div>

          {/* Admin Quick Action Button */}
          {isAdmin && (
            <a
              href="#admin-section"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-gold text-obsidian shadow-md shadow-gold/20 hover:brightness-105 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add / Manage Projects</span>
            </a>
          )}
        </div>

        {/* Dynamic Category Filter Tabs */}
        <div 
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 pb-2 overflow-x-auto"
          role="tablist"
          aria-label="Project category filter tabs"
        >
          {uniqueCategories.map((cat) => {
            const count = cat.id === 'all' 
              ? projects.length 
              : projects.filter(p => p.categoryId === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                aria-controls="projects-grid"
                onClick={() => handleCategoryChange(cat.id)}
                className={`touch-target px-5 py-2.5 rounded-xl text-sm font-bold tracking-tight transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-gold to-gold-amber text-obsidian shadow-md shadow-gold/25'
                    : 'bg-slate-100 dark:bg-obsidian-card text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-obsidian-border hover:border-gold/50 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-obsidian/20 text-obsidian font-extrabold' 
                    : 'bg-slate-200 dark:bg-obsidian-surface text-slate-500 dark:text-obsidian-muted'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Responsive Project Grid */}
        <div
          id="projects-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {visibleProjects.map((project) => {
            const hasTechnicalModal = project.hasModal || !!project.architecture;

            return (
              <article
                key={project.id}
                className="group flex flex-col rounded-2xl bg-white dark:bg-obsidian-card border border-slate-200 dark:border-obsidian-border overflow-hidden shadow-sm hover:shadow-xl hover:border-gold/50 transition-all duration-300 relative"
              >
                {/* 16:9 Architectural Preview Banner */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950 border-b border-slate-200 dark:border-obsidian-border">
                  <ProjectSvgPreview projectId={project.id} title={project.title} />
                  
                  {/* Top Badge overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-obsidian/90 text-gold-light border border-gold/30 shadow-md backdrop-blur-sm">
                      {project.badge || 'Featured'}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-obsidian-muted">
                      <span>{project.category}</span>
                      <span>#{project.id.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 14)}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-gold transition-colors tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {(project.techStack || []).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-slate-100 dark:bg-obsidian-surface text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-obsidian-border/80 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons Footer */}
                    <div className="pt-3 border-t border-slate-100 dark:border-obsidian-border/80 flex items-center justify-between gap-2">
                      {hasTechnicalModal ? (
                        <button
                          onClick={() => setSelectedModalProject(project)}
                          className="touch-target w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gold/15 text-gold hover:bg-gold/25 border border-gold/30 hover:border-gold transition-all focus-visible:ring-2 focus-visible:ring-gold"
                        >
                          <Code className="w-4 h-4" />
                          <span>Architecture &amp; Code</span>
                        </button>
                      ) : (
                        <>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="touch-target flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-obsidian-surface text-slate-900 dark:text-slate-100 hover:text-gold dark:hover:text-gold border border-slate-200 dark:border-obsidian-border hover:border-gold/50 transition-colors"
                            >
                              <span>Live Demo</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="touch-target flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-obsidian-surface text-slate-900 dark:text-slate-100 hover:text-gold dark:hover:text-gold border border-slate-200 dark:border-obsidian-border hover:border-gold/50 transition-colors"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>Code Repo</span>
                            </a>
                          )}
                          {!project.liveUrl && !project.githubUrl && (
                            <span className="text-xs text-slate-400 italic">Production Enterprise Deployment</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Show More / Show Less Toggle Button */}
        {filteredProjects.length > INITIAL_VISIBLE_COUNT && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleToggleShowMore}
              className="touch-target inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-slate-100 dark:bg-obsidian-card text-slate-800 dark:text-slate-200 border-2 border-slate-300 dark:border-obsidian-border hover:border-gold hover:text-gold dark:hover:text-gold hover:shadow-lg hover:shadow-gold/10 transition-all focus-visible:ring-2 focus-visible:ring-gold"
            >
              {hasMore ? (
                <>
                  <span>Show More Projects ({remainingCount} more)</span>
                  <ChevronDown className="w-5 h-5" />
                </>
              ) : (
                <>
                  <span>Show Less Projects</span>
                  <ChevronUp className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}

      </div>

      {/* Interactive Architecture & Code Modal */}
      {selectedModalProject && (
        <ArchitectureModal
          project={selectedModalProject}
          onClose={() => setSelectedModalProject(null)}
          onNotify={onNotify}
        />
      )}
    </section>
  );
};
