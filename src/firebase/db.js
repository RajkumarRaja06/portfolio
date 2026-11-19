import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

const PROJECTS_COLLECTION = 'portfolio_projects';
const SECTIONS_COLLECTION = 'portfolio_sections';

/**
 * Save or Add a project to Firebase Firestore
 */
export const saveProjectToFirestore = async (project) => {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, project.id);
    await setDoc(
      docRef,
      {
        ...project,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return { success: true };
  } catch (err) {
    console.warn('Firestore write warning (using local fallback):', err.message);
    return { success: false, error: err.message };
  }
};

/**
 * Update an existing project in Firestore
 */
export const updateProjectInFirestore = async (projectId, updatedData) => {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (err) {
    console.warn('Firestore update warning:', err.message);
    return { success: false, error: err.message };
  }
};

/**
 * Delete a project from Firestore
 */
export const deleteProjectFromFirestore = async (projectId) => {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, projectId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (err) {
    console.warn('Firestore delete warning:', err.message);
    return { success: false, error: err.message };
  }
};

/**
 * Fetch all projects from Firestore
 */
export const fetchProjectsFromFirestore = async () => {
  try {
    const snapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
    if (!snapshot.empty) {
      const items = [];
      snapshot.forEach((d) => items.push({ id: d.id, ...d.data() }));
      return { success: true, data: items };
    }
    return { success: false, message: 'Collection empty' };
  } catch (err) {
    console.warn('Firestore read warning (using local store):', err.message);
    return { success: false, error: err.message };
  }
};

/**
 * Save section data (hero, about, skills, contact) to Firestore
 */
export const saveSectionToFirestore = async (sectionName, sectionData) => {
  try {
    const docRef = doc(db, SECTIONS_COLLECTION, sectionName);
    await setDoc(docRef, { ...sectionData, updatedAt: serverTimestamp() }, { merge: true });
    return { success: true };
  } catch (err) {
    console.warn(`Firestore save ${sectionName} warning:`, err.message);
    return { success: false, error: err.message };
  }
};

/**
 * Fetch section data from Firestore
 */
export const fetchSectionFromFirestore = async (sectionName) => {
  try {
    const docRef = doc(db, SECTIONS_COLLECTION, sectionName);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { success: true, data: snap.data() };
    }
    return { success: false };
  } catch (err) {
    console.warn(`Firestore fetch ${sectionName} warning:`, err.message);
    return { success: false, error: err.message };
  }
};

/**
 * Save Profile Avatar to Firestore
 */
export const saveAvatarToFirestore = async (avatarDataUrl) => {
  try {
    const docRef = doc(db, SECTIONS_COLLECTION, 'profile_avatar');
    await setDoc(docRef, { avatar: avatarDataUrl, updatedAt: serverTimestamp() }, { merge: true });
    return { success: true };
  } catch (err) {
    console.warn('Firestore save avatar warning:', err.message);
    return { success: false, error: err.message };
  }
};
