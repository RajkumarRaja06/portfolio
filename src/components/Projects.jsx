import React, { useState } from 'react';
import { ProjectSvgPreview } from './ProjectSvgPreviews';
import { ArchitectureModal } from './ArchitectureModal';
import { ExternalLink, Github, Code, ChevronDown, ChevronUp, Layers, Sparkles } from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projectsData';

const INITIAL_VISIBLE_COUNT = 6;

export const Projects = ({ onNotify }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  // Filter projects according to category
  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.categoryId === activeCategory);

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
              <span>Curated Portfolio of {PROJECTS.length} Applications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured Projects &amp; ERP Implementations
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              From enterprise-scale Odoo backend modules and automated data pipelines to high-performance React web applications and interactive UI utilities.
            </p>
          </div>
        </div>

        {/* Dynamic Category Filter Tabs */}
        <div 
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 pb-2 overflow-x-auto"
          role="tablist"
          aria-label="Project category filter"
        >
          {PROJECT_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = cat.id === 'all' 
              ? PROJECTS.length 
              : PROJECTS.filter((p) => p.categoryId === cat.id).length;

            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(cat.id)}
                className={`touch-target px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-gold to-gold-amber text-obsidian shadow-md shadow-gold/25'
                    : 'bg-white dark:bg-obsidian-card text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-obsidian-border hover:border-gold/50'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-black ${
                  isActive
                    ? 'bg-obsidian/20 text-obsidian'
                    : 'bg-slate-100 dark:bg-obsidian-surface text-slate-500 dark:text-obsidian-muted'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Responsive Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-obsidian-card border border-slate-200 dark:border-obsidian-border hover:border-gold/50 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div>
                {/* Visual Preview SVG Header Banner */}
                <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden border-b border-slate-200 dark:border-obsidian-border">
                  <ProjectSvgPreview projectId={project.id} title={project.title} />
                  
                  {/* Category Pill Tag Overlay */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-obsidian/85 text-gold-amber border border-gold/40 shadow-sm backdrop-blur-md">
                      {project.badge || project.category}
                    </span>
                  </div>

                  {/* Architecture Modal Trigger Hint */}
                  {project.hasModal && (
                    <button
                      onClick={() => setSelectedModalProject(project)}
                      className="touch-target absolute top-3.5 right-3.5 p-2 rounded-xl bg-obsidian/85 text-gold hover:text-white border border-gold/40 shadow-sm backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
                      title="Inspect Technical Architecture"
                      aria-label={`Inspect Technical Architecture for ${project.title}`}
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-gold transition-colors tracking-tight">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-obsidian-surface text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-obsidian-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer CTAs */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-obsidian-border/50">
                {project.hasModal ? (
                  <button
                    onClick={() => setSelectedModalProject(project)}
                    className="touch-target inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-light active:scale-95 transition-all"
                  >
                    <Code className="w-4 h-4" />
                    <span>Technical Architecture</span>
                  </button>
                ) : (
                  <span className="text-xs text-slate-400 font-mono">Module Ready</span>
                )}

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target p-2 rounded-xl bg-slate-100 dark:bg-obsidian-surface hover:bg-gold/20 text-slate-700 dark:text-slate-300 hover:text-gold border border-slate-200 dark:border-obsidian-border transition-all"
                      aria-label={`View GitHub repository for ${project.title}`}
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gold/15 hover:bg-gold/25 text-gold-dark dark:text-gold-light border border-gold/30 transition-all"
                      aria-label={`Open live demo for ${project.title}`}
                      title="Live Demo"
                    >
                      <span>Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* Show More / Show Less Accordion Expansion */}
        {filteredProjects.length > INITIAL_VISIBLE_COUNT && (
          <div className="mt-12 sm:mt-16 text-center">
            <button
              onClick={handleToggleShowMore}
              className="touch-target inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm bg-white dark:bg-obsidian-card text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-obsidian-border hover:border-gold hover:text-gold dark:hover:text-gold shadow-md hover:shadow-xl active:scale-95 transition-all"
            >
              {hasMore ? (
                <>
                  <span>Show More Projects ({remainingCount} more)</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Show Less Projects</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

      </div>

      {/* Technical Architecture Deep-Dive Modal */}
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
