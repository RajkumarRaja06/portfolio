import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projectsData';
import { SKILL_CATEGORIES as DEFAULT_SKILLS } from '../data/skillsData';
import {
  saveProjectToFirestore,
  updateProjectInFirestore,
  deleteProjectFromFirestore,
  fetchProjectsFromFirestore,
  saveSectionToFirestore,
  fetchSectionFromFirestore,
} from '../firebase/db';

export const DEFAULT_HERO_DATA = {
  statusBadge: 'Available for Odoo ERP & Full-Stack Projects',
  name: 'Rajkumar Raja',
  titleRole: 'Odoo Developer (v16–v19)',
  titleSecondary: 'Full-Stack Web Architect',
  location: 'Coimbatore, India',
  bio: 'Crafting scalable ERP modules, custom Python business logic, and lightning-fast React applications.',
  metrics: [
    { label: 'Delivered Projects', value: '15+' },
    { label: 'Odoo Ecosystem', value: 'v16-v19' },
    { label: 'Clean Code Quality', value: '100%' },
  ],
  highlights: [
    'Odoo v16, v17, v18 & v19 OWL Ready',
    'React, Node.js & Modern Architecture',
    'Automated Timesheet & Helpdesk Portals',
    'Shopify Liquid & E-Commerce Integration',
  ],
};

export const DEFAULT_ABOUT_DATA = {
  badge: 'Professional Profile & Background',
  heading: 'Engineering ERP Solutions & Web Architectures',
  subheading: 'A comprehensive background in enterprise Odoo customization, scalable full-stack web applications, and precision technical audits.',
  paragraphs: [
    'Based in Coimbatore, Tamil Nadu, I operate at the intersection of enterprise ERP automation and modern web technologies. With specialized hands-on engineering across Odoo v16 through v19, I develop robust backend business architectures, extend core ORM models, and implement custom Python controllers tailored to real-world industrial demands.',
    'My projects frequently involve building responsive client-facing Helpdesk and Timesheet portals, structuring custom QWeb/XML views, and creating high-throughput REST API integration pipelines connecting Odoo ERP with third-party marketplaces.',
    'Beyond backend ERP engineering, I create modern frontends with OWL JS and React JS, and perform technical SEO, Core Web Vitals, and CRO audits for high-growth Shopify Liquid storefronts.',
  ],
  specifications: {
    location: 'Coimbatore, TN, India',
    languages: 'English, Tamil',
    erpVersions: 'Odoo v16, v17, v18, v19',
    versionControl: 'Git, GitLab & GitHub',
  },
};

export const DEFAULT_CONTACT_DATA = {
  email: 'rajkumarrajaco@gmail.com',
  secondaryEmail: 'rajkumarkiot2@gmail.com',
  phone: '+91 98765 43210',
  location: 'Coimbatore, Tamil Nadu, India',
  githubUrl: 'https://github.com/rajkumar-raja',
  linkedinUrl: 'https://linkedin.com/in/rajkumar-raja',
  status: 'Available for Immediate Contract & Full-time Roles',
};

const STORAGE_KEYS = {
  PROJECTS: 'rajkumar_custom_projects_v2',
  HERO: 'rajkumar_custom_hero_v2',
  ABOUT: 'rajkumar_custom_about_v2',
  SKILLS: 'rajkumar_custom_skills_v2',
  CONTACT: 'rajkumar_custom_contact_v2',
};

const PortfolioDataContext = createContext(null);

export const PortfolioDataProvider = ({ children }) => {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [heroData, setHeroData] = useState(DEFAULT_HERO_DATA);
  const [aboutData, setAboutData] = useState(DEFAULT_ABOUT_DATA);
  const [skillsData, setSkillsData] = useState(DEFAULT_SKILLS);
  const [contactData, setContactData] = useState(DEFAULT_CONTACT_DATA);
  const [isFirebaseSynced, setIsFirebaseSynced] = useState(false);

  // Initialize from localStorage and sync with Firebase Firestore
  useEffect(() => {
    // 1. Load local cache immediately for zero latency
    try {
      const storedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (storedProjects) setProjects(JSON.parse(storedProjects));

      const storedHero = localStorage.getItem(STORAGE_KEYS.HERO);
      if (storedHero) setHeroData(JSON.parse(storedHero));

      const storedAbout = localStorage.getItem(STORAGE_KEYS.ABOUT);
      if (storedAbout) setAboutData(JSON.parse(storedAbout));

      const storedSkills = localStorage.getItem(STORAGE_KEYS.SKILLS);
      if (storedSkills) setSkillsData(JSON.parse(storedSkills));

      const storedContact = localStorage.getItem(STORAGE_KEYS.CONTACT);
      if (storedContact) setContactData(JSON.parse(storedContact));
    } catch (err) {
      console.warn('LocalStorage error reading data:', err);
    }

    // 2. Fetch from Firestore if available
    const syncFromFirestore = async () => {
      try {
        const firestoreProjects = await fetchProjectsFromFirestore();
        if (firestoreProjects.success && firestoreProjects.data?.length) {
          // Merge with default projects ensuring no loss
          const merged = [...firestoreProjects.data];
          setProjects(merged);
          localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(merged));
        }

        const heroSnap = await fetchSectionFromFirestore('hero');
        if (heroSnap.success && heroSnap.data) {
          setHeroData(heroSnap.data);
          localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(heroSnap.data));
        }

        const aboutSnap = await fetchSectionFromFirestore('about');
        if (aboutSnap.success && aboutSnap.data) {
          setAboutData(aboutSnap.data);
          localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(aboutSnap.data));
        }

        const contactSnap = await fetchSectionFromFirestore('contact');
        if (contactSnap.success && contactSnap.data) {
          setContactData(contactSnap.data);
          localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(contactSnap.data));
        }

        setIsFirebaseSynced(true);
      } catch (e) {
        // Safe fallback
      }
    };

    syncFromFirestore();
  }, []);

  // --- Project Management with Firebase ---
  const addProject = async (newProject) => {
    const projectWithId = {
      ...newProject,
      id: newProject.id || `proj-${Date.now()}`,
      categoryId: newProject.categoryId || (newProject.category ? newProject.category.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'custom'),
    };
    const updated = [projectWithId, ...projects];
    setProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    } catch (e) {}

    // Save to Firebase Firestore Database
    await saveProjectToFirestore(projectWithId);
    return projectWithId;
  };

  const updateProject = async (id, updatedFields) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    } catch (e) {}

    // Update in Firebase Firestore
    await updateProjectInFirestore(id, updatedFields);
  };

  const deleteProject = async (id) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    } catch (e) {}

    // Delete from Firebase Firestore
    await deleteProjectFromFirestore(id);
  };

  const resetProjects = () => {
    setProjects(DEFAULT_PROJECTS);
    try {
      localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    } catch (e) {}
  };

  // --- Hero Section Management with Firebase ---
  const updateHeroData = async (newData) => {
    setHeroData(newData);
    try {
      localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(newData));
    } catch (e) {}
    await saveSectionToFirestore('hero', newData);
  };

  const resetHeroData = () => {
    setHeroData(DEFAULT_HERO_DATA);
    try {
      localStorage.removeItem(STORAGE_KEYS.HERO);
    } catch (e) {}
  };

  // --- About Section Management with Firebase ---
  const updateAboutData = async (newData) => {
    setAboutData(newData);
    try {
      localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(newData));
    } catch (e) {}
    await saveSectionToFirestore('about', newData);
  };

  const resetAboutData = () => {
    setAboutData(DEFAULT_ABOUT_DATA);
    try {
      localStorage.removeItem(STORAGE_KEYS.ABOUT);
    } catch (e) {}
  };

  // --- Skills Section Management with Firebase ---
  const updateSkillsData = async (newData) => {
    setSkillsData(newData);
    try {
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(newData));
    } catch (e) {}
    await saveSectionToFirestore('skills', newData);
  };

  const resetSkillsData = () => {
    setSkillsData(DEFAULT_SKILLS);
    try {
      localStorage.removeItem(STORAGE_KEYS.SKILLS);
    } catch (e) {}
  };

  // --- Contact Section Management with Firebase ---
  const updateContactData = async (newData) => {
    setContactData(newData);
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(newData));
    } catch (e) {}
    await saveSectionToFirestore('contact', newData);
  };

  const resetContactData = () => {
    setContactData(DEFAULT_CONTACT_DATA);
    try {
      localStorage.removeItem(STORAGE_KEYS.CONTACT);
    } catch (e) {}
  };

  // --- Reset All Sections ---
  const resetAllContent = () => {
    resetProjects();
    resetHeroData();
    resetAboutData();
    resetSkillsData();
    resetContactData();
  };

  return (
    <PortfolioDataContext.Provider
      value={{
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
        isFirebaseSynced,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
};
