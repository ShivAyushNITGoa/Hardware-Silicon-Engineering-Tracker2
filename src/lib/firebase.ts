import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  onSnapshot,
  query,
  orderBy,
  Firestore
} from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';

export const ADMIN_EMAIL = 'shivshivamxyz@gmail.com';

// Support Vercel / production environment variables with fallback to bundled config
export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfigData?.apiKey || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigData?.authDomain || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfigData?.projectId || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigData?.storageBucket || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigData?.messagingSenderId || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfigData?.appId || '',
};

export const FIRESTORE_DATABASE_ID = import.meta.env.VITE_FIRESTORE_DATABASE_ID || firebaseConfigData?.firestoreDatabaseId || '';

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(FIREBASE_CONFIG);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with configured database ID
export const db: Firestore = FIRESTORE_DATABASE_ID && FIRESTORE_DATABASE_ID !== '(default)'
  ? getFirestore(app, FIRESTORE_DATABASE_ID)
  : getFirestore(app);

// Helper to provide clear guidance for Vercel deployment & Authorized Domains
export function getVercelAuthDomainInfo() {
  const currentHostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const isVercel = currentHostname.includes('vercel.app');
  return {
    currentHostname,
    isVercel,
    projectId: FIREBASE_CONFIG.projectId,
    authDomain: FIREBASE_CONFIG.authDomain,
    consoleAuthUrl: `https://console.firebase.google.com/project/${FIREBASE_CONFIG.projectId}/authentication/settings`
  };
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'student';
  lastActive: string;
  stats?: {
    totalCheckoffs?: number;
    eceProgressPercent?: number;
    activeField?: string;
    notesCount?: number;
    lastUpdated?: string;
  };
}

export interface UserProgressData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  lastActive: string;
  activeField?: string;
  studentProfile?: {
    collegeTierId?: string;
    collegeName?: string;
    department?: string;
    semester?: string;
    labAccessTier?: string;
    targetCareerGoal?: string;
    notes?: string;
  };
  eceEeeProgress?: Record<string, boolean>;
  eceEeeBookmarks?: Record<string, boolean>;
  eceEeeNotes?: Record<string, string>;
  curriculumSubs?: Record<string, boolean>;
  studiedDocs?: Record<string, boolean>;
  toolSkills?: Record<string, boolean>;
  nitGoaProgress?: Record<string, boolean>;
  nitGoaElectives?: Record<string, string>;
  interviewStatus?: Record<string, string>;
  weeklyMilestones?: Record<string, boolean>;
  habitsLog?: Record<string, boolean>;
  universalDataSnapshot?: string;
  statsSummary?: {
    totalCompleted: number;
    eceCompleted: number;
    ecePercent: number;
    curriculumDone: number;
    toolSkillsDone: number;
    nitGoaDone: number;
    notesTotal: number;
    lastSynced: string;
  };
}

// Sign in with Google (with automatic popup-blocked fallback to redirect)
export async function signInWithGoogle(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user) {
      await syncUserProfile(result.user);
      return result.user;
    }
    return null;
  } catch (error: any) {
    // If user voluntarily closed the popup or cancelled, handle cleanly without error
    if (
      error?.code === 'auth/popup-closed-by-user' ||
      error?.code === 'auth/cancelled-popup-request' ||
      error?.code === 'auth/user-cancelled'
    ) {
      return null;
    }

    // If popup is blocked by browser, or user is on mobile browser, fallback gracefully to redirect
    if (error?.code === 'auth/popup-blocked') {
      try {
        await signInWithRedirect(auth, googleProvider);
      } catch (redirectErr) {
        console.warn('Redirect sign-in error:', redirectErr);
      }
      return null;
    }

    console.warn('Google sign-in attempt did not complete:', error?.code || error?.message);
    throw error;
  }
}

// Check redirect auth result when returning from redirect sign-in
export async function handleRedirectAuthResult(): Promise<User | null> {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      await syncUserProfile(result.user);
      return result.user;
    }
    return null;
  } catch (error) {
    console.warn('Redirect auth result check:', error);
    return null;
  }
}

// Sign out
export async function logOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

// Sync user profile to Firestore
export async function syncUserProfile(user: User, currentStats?: UserProfile['stats']): Promise<void> {
  if (!user || !user.email) return;
  try {
    const userRef = doc(db, 'users', user.uid);
    const isAdmin = user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

    const profileData: Partial<UserProfile> = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email.split('@')[0],
      photoURL: user.photoURL || undefined,
      role: isAdmin ? 'admin' : 'student',
      lastActive: new Date().toISOString(),
    };

    if (currentStats) {
      profileData.stats = currentStats;
    }

    await setDoc(userRef, profileData, { merge: true });
  } catch (err) {
    console.warn('Failed to sync user profile:', err);
  }
}

// Sync full progress data for multi-user tracking
export async function syncUserProgressToCloud(user: User, progressData: Partial<UserProgressData>): Promise<void> {
  if (!user || !user.email) return;
  try {
    const docRef = doc(db, 'user_progress', user.uid);
    const isAdmin = user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

    const payload: UserProgressData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email.split('@')[0],
      photoURL: user.photoURL || undefined,
      lastActive: new Date().toISOString(),
      activeField: progressData.activeField || 'telecom-wireless',
      studentProfile: progressData.studentProfile,
      eceEeeProgress: progressData.eceEeeProgress || {},
      eceEeeBookmarks: progressData.eceEeeBookmarks || {},
      eceEeeNotes: progressData.eceEeeNotes || {},
      curriculumSubs: progressData.curriculumSubs || {},
      studiedDocs: progressData.studiedDocs || {},
      toolSkills: progressData.toolSkills || {},
      nitGoaProgress: progressData.nitGoaProgress || {},
      nitGoaElectives: progressData.nitGoaElectives || {},
      interviewStatus: progressData.interviewStatus || {},
      weeklyMilestones: progressData.weeklyMilestones || {},
      habitsLog: progressData.habitsLog || {},
      universalDataSnapshot: progressData.universalDataSnapshot,
      statsSummary: progressData.statsSummary || {
        totalCompleted: 0,
        eceCompleted: 0,
        ecePercent: 0,
        curriculumDone: 0,
        toolSkillsDone: 0,
        nitGoaDone: 0,
        notesTotal: 0,
        lastSynced: new Date().toISOString()
      }
    };

    await setDoc(docRef, payload, { merge: true });

    // Also update lightweight user profile
    await syncUserProfile(user, {
      totalCheckoffs: payload.statsSummary?.totalCompleted || 0,
      eceProgressPercent: payload.statsSummary?.ecePercent || 0,
      activeField: payload.activeField,
      notesCount: Object.keys(payload.eceEeeNotes || {}).length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Failed to sync progress to cloud:', err);
  }
}

// Pull progress from cloud (when user logs in on a new device)
export async function fetchUserProgressFromCloud(uid: string): Promise<UserProgressData | null> {
  try {
    const docRef = doc(db, 'user_progress', uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as UserProgressData;
    }
    return null;
  } catch (err) {
    console.warn('Failed to fetch user progress from cloud:', err);
    return null;
  }
}

// Admin: fetch all users & progress for multi-user tracking
export async function fetchAllUsersForAdmin(): Promise<UserProgressData[]> {
  try {
    const colRef = collection(db, 'user_progress');
    const snap = await getDocs(colRef);
    const users: UserProgressData[] = [];
    snap.forEach((doc) => {
      users.push(doc.data() as UserProgressData);
    });
    // Sort by last active descending
    users.sort((a, b) => new Date(b.lastActive || 0).getTime() - new Date(a.lastActive || 0).getTime());
    return users;
  } catch (err) {
    console.error('Error fetching users for admin:', err);
    return [];
  }
}

// Admin: Real-time listener for live tracking of all users across the cloud
export function subscribeToAllUsersForAdmin(callback: (users: UserProgressData[]) => void): () => void {
  try {
    const colRef = collection(db, 'user_progress');
    return onSnapshot(
      colRef, 
      (snapshot) => {
        const users: UserProgressData[] = [];
        snapshot.forEach((doc) => {
          users.push(doc.data() as UserProgressData);
        });
        users.sort((a, b) => new Date(b.lastActive || 0).getTime() - new Date(a.lastActive || 0).getTime());
        callback(users);
      },
      (error) => {
        console.warn('Admin live subscription warning:', error);
      }
    );
  } catch (err) {
    console.error('Failed to establish admin live subscription:', err);
    return () => {};
  }
}
