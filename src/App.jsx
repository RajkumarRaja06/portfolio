import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import { AuthModal } from './components/AuthModal';
import { GoogleAuthPopup } from './components/GoogleAuthPopup';
import { ProfileModal } from './components/ProfileModal';
import { AdminSection } from './components/AdminSection';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';

const THEME_STORAGE_KEY = 'rajkumar_portfolio_theme';

function AppContent() {
  const [darkMode, setDarkMode] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [isGooglePopupOpen, setIsGooglePopupOpen] = useState(false);

  const { isProfileModalOpen, closeProfileModal } = useAuth();

  // Initialize theme from localStorage or default to Dark mode
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setDarkMode(savedTheme === 'dark');
      } else {
        setDarkMode(true);
      }
    } catch (e) {
      console.warn('LocalStorage error reading theme', e);
    }
  }, []);

  // Sync dark class on documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      try {
        localStorage.setItem(THEME_STORAGE_KEY, 'dark');
      } catch (e) {}
    } else {
      root.classList.remove('dark');
      try {
        localStorage.setItem(THEME_STORAGE_KEY, 'light');
      } catch (e) {}
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: 'success' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-alabaster dark:bg-obsidian text-slate-900 dark:text-slate-100 transition-colors duration-200 relative selection:bg-gold selection:text-obsidian overflow-x-hidden">
      
      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-5 py-3 rounded-xl bg-gold text-obsidian font-bold shadow-2xl ring-4 ring-gold/40 transition-transform"
      >
        Skip to main content
      </a>

      {/* Architectural 44px x 44px Grid Background Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 bg-grid-architectural -z-20 opacity-70"
        aria-hidden="true" 
      />

      {/* Ambient Radial Gradients */}
      <div
        className="pointer-events-none fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[140px] -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed bottom-1/4 right-10 w-[500px] h-[500px] rounded-full bg-accent-cyan/5 blur-[140px] -z-10"
        aria-hidden="true"
      />

      {/* Sticky Glassmorphic Header */}
      <Navbar
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        onNotify={showNotification}
        onOpenGoogleAuth={() => setIsGooglePopupOpen(true)}
      />

      {/* Semantic Main Landmark */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Hero Section */}
        <Hero onNotify={showNotification} />

        {/* Admin Control Studio (Rendered exclusively for Admin) */}
        <AdminSection onNotify={showNotification} />

        {/* About & Experience Section */}
        <About />

        {/* Projects Showcase */}
        <Projects onNotify={showNotification} />

        {/* Categorized Skills Section */}
        <Skills />

        {/* Contact Section */}
        <Contact onNotify={showNotification} />
      </main>

      {/* Footer Landmark */}
      <Footer />

      {/* Google Authentication Account Chooser Popup (Matching User Screenshot) */}
      <GoogleAuthPopup
        isOpen={isGooglePopupOpen}
        onClose={() => setIsGooglePopupOpen(false)}
        onNotify={showNotification}
      />

      {/* User Profile Modal (From Dropdown Item) */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
        onNotify={showNotification}
      />

      {/* Fallback Auth Modal */}
      <AuthModal onNotify={showNotification} />

      {/* Accessible Floating Notification Toast */}
      {notification.message && (
        <NotificationToast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: 'success' })}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioDataProvider>
        <AppContent />
      </PortfolioDataProvider>
    </AuthProvider>
  );
}
