import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from '../firebase/config';

// Check if user has Admin privileges (rajkumarrajaco or rajkumarkiot)
export const isUserAdmin = (emailOrUser) => {
  if (!emailOrUser) return false;
  const email = (typeof emailOrUser === 'string' ? emailOrUser : emailOrUser.email || '')
    .trim()
    .toLowerCase();
  return email.includes('rajkumarkiot') || email.includes('rajkumarrajaco');
};

export const AUTHORIZED_ADMIN_EMAILS = [
  'rajkumarrajaco@gmail.com',
  'rajkumarkiot2@gmail.com',
  'rajkumarkiot@gmail.com',
  'rajkumarkiot2gmail.com',
];

const AUTH_STORAGE_KEY = 'rajkumar_portfolio_auth_user_v3';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalPrompt, setAuthModalPrompt] = useState('');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session from localStorage and subscribe to Firebase Auth state
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.warn('Error reading auth state from localStorage:', err);
    } finally {
      setIsLoading(false);
    }

    // Subscribe to Firebase real Auth changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const email = firebaseUser.email || '';
        const isAdmin = isUserAdmin(email);
        const userSession = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || (isAdmin ? 'Rajkumar Raja' : email.split('@')[0]),
          email: email.toLowerCase(),
          avatar: firebaseUser.photoURL || null,
          authProvider: 'firebase-google',
          isEmailVerified: firebaseUser.emailVerified ?? true,
          role: isAdmin ? 'admin' : 'user',
        };
        setCurrentUser(userSession);
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userSession));
        } catch (e) {}
      }
    });

    return () => unsubscribe();
  }, []);

  // --- Google Sign-In with Firebase ---
  const signInWithGoogleFirebase = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const email = user.email || '';
      const isAdmin = isUserAdmin(email);

      const userSession = {
        uid: user.uid,
        name: user.displayName || (isAdmin ? 'Rajkumar Raja' : email.split('@')[0]),
        email: email.toLowerCase(),
        avatar: user.photoURL || null,
        authProvider: 'firebase-google',
        isEmailVerified: true,
        role: isAdmin ? 'admin' : 'user',
      };

      setCurrentUser(userSession);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userSession));
      } catch (e) {}

      return { success: true, user: userSession, isAdmin };
    } catch (error) {
      console.warn('Firebase signInWithPopup error/fallback:', error.message);
      // Return error code to trigger the account chooser fallback
      return { success: false, error: error.message };
    }
  };

  // --- Direct/Custom Google Account Selection ---
  const loginWithGoogle = (email, name = '', avatar = '') => {
    const trimmedEmail = email.trim().toLowerCase();
    const isAdmin = isUserAdmin(trimmedEmail);

    let displayName = name;
    if (!displayName) {
      if (trimmedEmail.includes('rajkumarrajaco')) displayName = 'Rajkumar R';
      else if (trimmedEmail.includes('rajkumarkiot')) displayName = 'Rajkumar (KIOT)';
      else displayName = trimmedEmail.split('@')[0];
    }

    const userSession = {
      uid: `google-${Date.now()}`,
      name: displayName,
      email: trimmedEmail,
      avatar: avatar || null,
      authProvider: 'firebase-google',
      isEmailVerified: true,
      role: isAdmin ? 'admin' : 'user',
    };

    setCurrentUser(userSession);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userSession));
    } catch (e) {}

    return { success: true, user: userSession, isAdmin };
  };

  // --- Password Login ---
  const login = (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const isAdmin = isUserAdmin(trimmedEmail);

    const userSession = {
      uid: `user-${Date.now()}`,
      name: trimmedEmail.includes('rajkumarkiot')
        ? 'Rajkumar (KIOT)'
        : trimmedEmail.includes('rajkumarrajaco')
        ? 'Rajkumar R'
        : trimmedEmail.split('@')[0],
      email: trimmedEmail,
      authProvider: 'email',
      isEmailVerified: isAdmin,
      role: isAdmin ? 'admin' : 'user',
    };

    setCurrentUser(userSession);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userSession));
    } catch (e) {}
    return { success: true, user: userSession, isAdmin };
  };

  // --- Sign Up ---
  const signup = (name, email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    const isAdmin = isUserAdmin(trimmedEmail);

    const userSession = {
      uid: `user-${Date.now()}`,
      name: trimmedName,
      email: trimmedEmail,
      authProvider: 'email',
      isEmailVerified: isAdmin,
      role: isAdmin ? 'admin' : 'user',
    };

    setCurrentUser(userSession);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userSession));
    } catch (e) {}

    return { success: true, user: userSession, isAdmin };
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {}
    setCurrentUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {}
  };

  const openAuthModal = (prompt = '') => {
    setAuthModalPrompt(prompt);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalPrompt('');
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const isAdmin = currentUser ? isUserAdmin(currentUser.email) : false;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin,
        isAuthorized: isAdmin,
        isLoading,
        login,
        loginWithGoogle,
        signInWithGoogleFirebase,
        signup,
        logout,
        isAuthModalOpen,
        authModalPrompt,
        openAuthModal,
        closeAuthModal,
        isProfileModalOpen,
        openProfileModal,
        closeProfileModal,
        authorizedAdminEmails: AUTHORIZED_ADMIN_EMAILS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
