import React, { useState } from 'react';
import {
  Layers, PlusCircle, Trash2, Edit3, Save, RotateCcw, Check, Sparkles,
  ShieldCheck, AlertCircle, ExternalLink, Github, Eye, Code, FileText,
  User, Mail, Phone, MapPin, Briefcase, ChevronRight, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const AdminSection = ({ onNotify }) => {
  const { currentUser, isAdmin, isAdminSectionOpen, toggleAdminSection } = useAuth();
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    resetProjects,

    heroData,
    updateHeroData,
    resetHeroData,

    aboutData,
    updateAboutData,
    resetAboutData,

    skillsData,
    updateSkillsData,
    resetSkillsData,

    contactData,
    updateContactData,
    resetContactData,

    resetAllContent,
  } = usePortfolioData();

  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'hero' | 'about' | 'skills' | 'contact'

  // --- Project Form State ---
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Odoo',
    categoryId: 'odoo',
    badge: 'Enterprise',
    description: '',
    techStackInput: 'Python, Odoo v19, PostgreSQL, Docker',
    liveUrl: '',
    githubUrl: '',
    architectureOverview: '',
    codeSnippet: '',
  });

  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectSearch, setProjectSearch] = useState('');

  // --- Hero Form State ---
  const [heroForm, setHeroForm] = useState(heroData);

  // --- About Form State ---
  const [aboutForm, setAboutForm] = useState(aboutData);

  // --- Skills Form State ---
  const [newSkillCategory, setNewSkillCategory] = useState({
    title: '',
    summary: '',
    skillsInput: '',
  });

  // --- Contact Form State ---
  const [contactForm, setContactForm] = useState(contactData);

  // Only render if user has Admin privileges
  if (!isAdmin) return null;

  // --- Projects Handlers ---
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim() || !projectForm.description.trim()) {
      if (onNotify) onNotify('Please enter a project title and description.', 'error');
      return;
    }

    const techStackArray = projectForm.techStackInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    let catId = projectForm.categoryId;
    if (projectForm.category === 'Odoo') catId = 'odoo';
    else if (projectForm.category === 'React') catId = 'react';
    else if (projectForm.category === 'HTML & CSS') catId = 'html-css';
    else catId = projectForm.category.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const projectPayload = {
      title: projectForm.title.trim(),
      category: projectForm.category,
      categoryId: catId,
      badge: projectForm.badge.trim() || 'Featured',
      description: projectForm.description.trim(),
      techStack: techStackArray.length ? techStackArray : ['Full-Stack', 'Modern Architecture'],
      liveUrl: projectForm.liveUrl.trim() || undefined,
      githubUrl: projectForm.githubUrl.trim() || undefined,
      hasModal: !!projectForm.architectureOverview.trim() || !!projectForm.codeSnippet.trim(),
      architecture:
        projectForm.architectureOverview.trim() || projectForm.codeSnippet.trim()
          ? {
              overview: projectForm.architectureOverview.trim() || 'Custom Enterprise Module Architecture',
              keyHighlights: [
                'Engineered with automated business logic and role-based permissions',
                'Comprehensive unit testing and continuous integration',
                'Optimized query performance and clean separation of concerns',
              ],
              codeSnippet: projectForm.codeSnippet.trim() || undefined,
            }
          : undefined,
    };

    if (editingProjectId) {
      updateProject(editingProjectId, projectPayload);
      if (onNotify) onNotify(`Project "${projectPayload.title}" updated successfully!`);
      setEditingProjectId(null);
    } else {
      addProject(projectPayload);
      if (onNotify) onNotify(`Project "${projectPayload.title}" published! It is now live in the Projects Showcase.`);
    }

    // Reset Form
    setProjectForm({
      title: '',
      category: 'Odoo',
      categoryId: 'odoo',
      badge: 'Enterprise',
      description: '',
      techStackInput: 'Python, Odoo v19, PostgreSQL, Docker',
      liveUrl: '',
      githubUrl: '',
      architectureOverview: '',
      codeSnippet: '',
    });

    // Smooth scroll down to view in projects section
    const projSection = document.getElementById('projects');
    if (projSection) {
      projSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEditProjectClick = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      category: proj.category || 'Odoo',
      categoryId: proj.categoryId || 'odoo',
      badge: proj.badge || 'Featured',
      description: proj.description,
      techStackInput: (proj.techStack || []).join(', '),
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      architectureOverview: proj.architecture?.overview || '',
      codeSnippet: proj.architecture?.codeSnippet || '',
    });
    // Scroll up to form
    const adminEl = document.getElementById('admin-section');
    if (adminEl) adminEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteProjectClick = (projId, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(projId);
      if (onNotify) onNotify(`Project "${title}" deleted.`);
    }
  };

  // --- Hero Section Handler ---
  const handleHeroSubmit = (e) => {
    e.preventDefault();
    updateHeroData(heroForm);
    if (onNotify) onNotify('Hero Section updated successfully!');
  };

  // --- About Section Handler ---
  const handleAboutSubmit = (e) => {
    e.preventDefault();
    updateAboutData(aboutForm);
    if (onNotify) onNotify('About Section updated successfully!');
  };

  // --- Skills Section Handler ---
  const handleAddSkillCategory = (e) => {
    e.preventDefault();
    if (!newSkillCategory.title.trim()) return;

    const skillsArr = newSkillCategory.skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newCat = {
      id: newSkillCategory.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      title: newSkillCategory.title.trim(),
      icon: 'Layers',
      summary: newSkillCategory.summary.trim() || 'Enterprise proficiency & modern implementation.',
      skills: skillsArr.length ? skillsArr : ['Proficiency Level 1', 'Proficiency Level 2'],
      accentColor: '#e5a93c',
    };

    const updated = [...skillsData, newCat];
    updateSkillsData(updated);
    setNewSkillCategory({ title: '', summary: '', skillsInput: '' });
    if (onNotify) onNotify(`Skill Category "${newCat.title}" added to Skills section!`);
  };

  // --- Contact Section Handler ---
  const handleContactSubmit = (e) => {
    e.preventDefault();
    updateContactData(contactForm);
    if (onNotify) onNotify('Contact information and social links updated!');
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.category?.toLowerCase().includes(projectSearch.toLowerCase())
  );

  return (
    <section
      id="admin-section"
      className="py-14 bg-gradient-to-b from-slate-100 via-amber-500/5 to-slate-100 dark:from-obsidian-surface dark:via-gold/5 dark:to-obsidian border-y-2 border-gold/40 relative selection:bg-gold selection:text-obsidian"
      aria-label="Admin Management Control Studio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header Bar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-obsidian-card border border-gold/30 shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-amber flex items-center justify-center text-obsidian shadow-lg shadow-gold/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Admin Control Studio
                </h2>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-gold text-obsidian">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-obsidian-muted mt-0.5 flex items-center gap-1.5">
                <span>Signed in as <strong className="text-gold">{currentUser?.email}</strong></span>
                <span>•</span>
                <span className="text-accent-emerald flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3 h-3" /> Full Website Edit Permission
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                if (window.confirm('Reset ALL website sections (projects, hero, about, contact) back to original defaults?')) {
                  resetAllContent();
                  setHeroForm(heroData);
                  setAboutForm(aboutData);
                  setContactForm(contactData);
                  if (onNotify) onNotify('Restored all website sections to original defaults.');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Sections</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200 dark:border-obsidian-border pb-3">
          {[
            { id: 'projects', label: 'Projects Manager', count: projects.length },
            { id: 'hero', label: 'Hero / Bio' },
            { id: 'about', label: 'About & Background' },
            { id: 'skills', label: 'Skills' },
            { id: 'contact', label: 'Contact & Socials' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gold text-obsidian shadow-md shadow-gold/25'
                  : 'bg-white dark:bg-obsidian-card text-slate-700 dark:text-slate-300 hover:text-gold border border-slate-200 dark:border-obsidian-border'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    activeTab === tab.id
                      ? 'bg-obsidian text-gold'
                      : 'bg-slate-200 dark:bg-obsidian-surface text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* --- TAB 1: PROJECTS MANAGEMENT --- */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form: Add or Edit Project (7 cols) */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-obsidian-card border border-slate-200 dark:border-obsidian-border shadow-md">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-obsidian-border">
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-gold" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {editingProjectId ? 'Edit Project Details' : 'Add New Project to Showcase'}
                  </h3>
                </div>
                {editingProjectId && (
                  <button
                    onClick={() => {
                      setEditingProjectId(null);
                      setProjectForm({
                        title: '',
                        category: 'Odoo',
                        categoryId: 'odoo',
                        badge: 'Enterprise',
                        description: '',
                        techStackInput: 'Python, Odoo v19, PostgreSQL, Docker',
                        liveUrl: '',
                        githubUrl: '',
                        architectureOverview: '',
                        codeSnippet: '',
                      });
                    }}
                    className="text-xs text-rose-500 hover:underline font-semibold"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. Helpdesk &amp; Timesheet Portal v19"
                      className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                      Category *
                    </label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                    >
                      <option value="Odoo">Odoo</option>
                      <option value="React">React</option>
                      <option value="HTML & CSS">HTML &amp; CSS</option>
                      <option value="Full-Stack">Full-Stack</option>
                      <option value="Python">Python</option>
                      <option value="Mobile / Shopify">Mobile / Shopify</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                      Badge / Tagline
                    </label>
                    <input
                      type="text"
                      value={projectForm.badge}
                      onChange={(e) => setProjectForm({ ...projectForm, badge: e.target.value })}
                      placeholder="e.g. Odoo Enterprise or Full-Stack"
                      className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={projectForm.techStackInput}
                      onChange={(e) => setProjectForm({ ...projectForm, techStackInput: e.target.value })}
                      placeholder="Python, Odoo v19, React, PostgreSQL"
                      className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Project Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Comprehensive description of the module or app, key business problem solved, and architecture..."
                    className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                      Live Demo URL (optional)
                    </label>
                    <input
                      type="url"
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                      GitHub URL (optional)
                    </label>
                    <input
                      type="url"
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                {/* Architecture & Code Snippet (Optional Modal details) */}
                <div className="pt-2 border-t border-slate-200 dark:border-obsidian-border">
                  <label className="block text-xs font-bold text-gold mb-1">
                    Architecture &amp; Code Modal Details (Optional)
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={projectForm.architectureOverview}
                      onChange={(e) => setProjectForm({ ...projectForm, architectureOverview: e.target.value })}
                      placeholder="Architecture overview summary for technical modal..."
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                    />
                    <textarea
                      rows={3}
                      value={projectForm.codeSnippet}
                      onChange={(e) => setProjectForm({ ...projectForm, codeSnippet: e.target.value })}
                      placeholder="# Python or JavaScript code snippet to showcase in modal..."
                      className="w-full px-3 py-2 rounded-xl text-xs font-mono bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-gold to-gold-amber text-obsidian shadow-lg shadow-gold/25 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProjectId ? 'Save & Update Project' : 'Submit & Publish Project'}</span>
                </button>
              </form>
            </div>

            {/* List: Existing Projects with Quick Actions (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-obsidian-card border border-slate-200 dark:border-obsidian-border shadow-md">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200 dark:border-obsidian-border">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Existing Projects ({projects.length})
                </h3>
                <button
                  onClick={() => {
                    if (window.confirm('Reset projects list back to the 21 default projects?')) {
                      resetProjects();
                      if (onNotify) onNotify('Projects reset to defaults.');
                    }
                  }}
                  className="text-xs text-rose-500 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Projects
                </button>
              </div>

              <input
                type="text"
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-full mb-3 px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
              />

              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {filteredProjects.map((p, idx) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl border border-slate-200 dark:border-obsidian-border hover:border-gold/50 bg-slate-50/50 dark:bg-obsidian-surface flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {p.title}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-gold/15 text-gold-dark dark:text-gold-light shrink-0">
                          {p.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-obsidian-muted truncate mt-0.5">
                        {p.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleEditProjectClick(p)}
                        className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-gold hover:bg-gold/10 transition-colors"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProjectClick(p.id, p.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* --- TAB 2: HERO SECTION EDITOR --- */}
        {activeTab === 'hero' && (
          <form onSubmit={handleHeroSubmit} className="p-6 rounded-2xl bg-white dark:bg-obsidian-card border border-slate-200 dark:border-obsidian-border shadow-md max-w-3xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-obsidian-border">
              Edit Hero &amp; Headline Section
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  value={heroForm.name}
                  onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Availability Status Badge
                </label>
                <input
                  type="text"
                  value={heroForm.statusBadge}
                  onChange={(e) => setHeroForm({ ...heroForm, statusBadge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Primary Title / Role
                </label>
                <input
                  type="text"
                  value={heroForm.titleRole}
                  onChange={(e) => setHeroForm({ ...heroForm, titleRole: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Secondary Specialization
                </label>
                <input
                  type="text"
                  value={heroForm.titleSecondary}
                  onChange={(e) => setHeroForm({ ...heroForm, titleSecondary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Bio Summary Text
              </label>
              <textarea
                rows={3}
                value={heroForm.bio}
                onChange={(e) => setHeroForm({ ...heroForm, bio: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gold text-obsidian hover:brightness-105"
              >
                Save Hero Section Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  resetHeroData();
                  setHeroForm(heroData);
                  if (onNotify) onNotify('Restored Hero section defaults.');
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-500"
              >
                Reset to Defaults
              </button>
            </div>
          </form>
        )}

        {/* --- TAB 3: ABOUT SECTION EDITOR --- */}
        {activeTab === 'about' && (
          <form onSubmit={handleAboutSubmit} className="p-6 rounded-2xl bg-white dark:bg-obsidian-card border border-slate-200 dark:border-obsidian-border shadow-md max-w-3xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-obsidian-border">
              Edit About &amp; Background Narrative
            </h3>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Section Heading
              </label>
              <input
                type="text"
                value={aboutForm.heading}
                onChange={(e) => setAboutForm({ ...aboutForm, heading: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Subheading
              </label>
              <input
                type="text"
                value={aboutForm.subheading}
                onChange={(e) => setAboutForm({ ...aboutForm, subheading: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Bio Paragraph 1
              </label>
              <textarea
                rows={3}
                value={aboutForm.paragraphs[0] || ''}
                onChange={(e) => {
                  const p = [...aboutForm.paragraphs];
                  p[0] = e.target.value;
                  setAboutForm({ ...aboutForm, paragraphs: p });
                }}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Bio Paragraph 2
              </label>
              <textarea
                rows={3}
                value={aboutForm.paragraphs[1] || ''}
                onChange={(e) => {
                  const p = [...aboutForm.paragraphs];
                  p[1] = e.target.value;
                  setAboutForm({ ...aboutForm, paragraphs: p });
                }}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gold text-obsidian hover:brightness-105"
              >
                Save About Section Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  resetAboutData();
                  setAboutForm(aboutData);
                  if (onNotify) onNotify('Restored About section defaults.');
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-500"
              >
                Reset to Defaults
              </button>
            </div>
          </form>
        )}

        {/* --- TAB 4: SKILLS SECTION --- */}
        {activeTab === 'skills' && (
          <div className="p-6 rounded-2xl bg-white dark:bg-obsidian-card border border-slate-200 dark:border-obsidian-border shadow-md max-w-3xl space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-obsidian-border">
              Add New Skill Category
            </h3>

            <form onSubmit={handleAddSkillCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Category Title
                </label>
                <input
                  type="text"
                  required
                  value={newSkillCategory.title}
                  onChange={(e) => setNewSkillCategory({ ...newSkillCategory, title: e.target.value })}
                  placeholder="e.g. Cloud &amp; DevOps"
                  className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Category Summary
                </label>
                <input
                  type="text"
                  value={newSkillCategory.summary}
                  onChange={(e) => setNewSkillCategory({ ...newSkillCategory, summary: e.target.value })}
                  placeholder="Summary of skills and practical experience..."
                  className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  required
                  value={newSkillCategory.skillsInput}
                  onChange={(e) => setNewSkillCategory({ ...newSkillCategory, skillsInput: e.target.value })}
                  placeholder="Docker, CI/CD, AWS, Nginx, PostgreSQL"
                  className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gold text-obsidian hover:brightness-105"
                >
                  Add Skill Category to Showcase
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetSkillsData();
                    if (onNotify) onNotify('Restored Skills section defaults.');
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-500"
                >
                  Reset Skills to Defaults
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- TAB 5: CONTACT & SOCIALS --- */}
        {activeTab === 'contact' && (
          <form onSubmit={handleContactSubmit} className="p-6 rounded-2xl bg-white dark:bg-obsidian-card border border-slate-200 dark:border-obsidian-border shadow-md max-w-3xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-obsidian-border">
              Edit Contact Information &amp; Social Links
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Primary Email
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Secondary / Admin Email
                </label>
                <input
                  type="email"
                  value={contactForm.secondaryEmail}
                  onChange={(e) => setContactForm({ ...contactForm, secondaryEmail: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Location
                </label>
                <input
                  type="text"
                  value={contactForm.location}
                  onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={contactForm.githubUrl}
                  onChange={(e) => setContactForm({ ...contactForm, githubUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={contactForm.linkedinUrl}
                onChange={(e) => setContactForm({ ...contactForm, linkedinUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-surface border border-slate-300 dark:border-obsidian-border focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gold text-obsidian hover:brightness-105"
              >
                Save Contact Information
              </button>
              <button
                type="button"
                onClick={() => {
                  resetContactData();
                  setContactForm(contactData);
                  if (onNotify) onNotify('Restored Contact defaults.');
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-500"
              >
                Reset to Defaults
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
