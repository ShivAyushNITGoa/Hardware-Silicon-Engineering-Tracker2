import { useState, useEffect, useCallback, useRef } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { 
  auth, 
  signInWithGoogle, 
  handleRedirectAuthResult,
  logOut as firebaseLogOut, 
  ADMIN_EMAIL, 
  syncUserProgressToCloud, 
  fetchUserProgressFromCloud,
  UserProgressData 
} from '../lib/firebase';
import { 
  getEceEeePrepProgress, 
  getEceEeePrepBookmarks, 
  getEceEeePrepNotes, 
  saveEceEeePrepProgress,
  saveEceEeePrepBookmarks,
  saveEceEeePrepNotes,
  saveEceEeeSelectedField,
  getCheckedSubtopics,
  saveCheckedSubtopics,
  getCheckedToolSkills,
  saveCheckedToolSkills,
  getStudiedEncyclopediaDocs,
  saveStudiedEncyclopediaDocs,
  getNitGoaProgress,
  saveNitGoaProgress,
  getNitGoaElectives,
  saveNitGoaElectives,
  getInterviewQuestionsStatus,
  saveInterviewQuestionsStatus,
  getWeeklyMilestoneChecks,
  saveWeeklyMilestoneChecks,
  getDailyHabitsLog,
  saveDailyHabitsLog,
  getStudentCollegeProfile,
  saveStudentCollegeProfile,
  getAllUserDataForCloud
} from '../utils/storage';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [authError, setAuthError] = useState<{ code?: string; message: string; domain?: string } | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  // Helper to collect current local data across all modules
  const collectLocalProgress = useCallback((): Partial<UserProgressData> => {
    return getAllUserDataForCloud();
  }, []);

  // Sync current local state to cloud
  const syncToCloud = useCallback(async (userToSync = currentUser) => {
    if (!userToSync) return;
    try {
      setIsSyncing(true);
      const localData = collectLocalProgress();
      await syncUserProgressToCloud(userToSync, localData);
      setLastSyncedAt(new Date());
    } catch (err) {
      console.warn('Sync failed:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [currentUser, collectLocalProgress]);

  // Debounced auto-sync trigger for live tracking
  const triggerDebouncedSync = useCallback(() => {
    if (!currentUser) return;
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      syncToCloud(currentUser);
    }, 1200);
  }, [currentUser, syncToCloud]);

  // Check for returning from redirect login flow
  useEffect(() => {
    handleRedirectAuthResult().then(async (user) => {
      if (user) {
        setCurrentUser(user);
        await syncToCloud(user);
      }
    }).catch(err => {
      console.warn('Redirect auth warning:', err);
    });
  }, [syncToCloud]);

  // Automatically listen to local changes across any tab/component
  useEffect(() => {
    const handleStorageUpdate = () => {
      triggerDebouncedSync();
    };

    window.addEventListener('tracker_storage_updated', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener('tracker_storage_updated', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [triggerDebouncedSync]);

  // Auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        // Fetch cloud progress and merge with local
        try {
          const cloudData = await fetchUserProgressFromCloud(user.uid);
          if (cloudData) {
            // Merge progress
            const localProgress = getEceEeePrepProgress();
            const mergedProgress = { ...(cloudData.eceEeeProgress || {}), ...localProgress };
            saveEceEeePrepProgress(mergedProgress);

            const localBookmarks = getEceEeePrepBookmarks();
            const mergedBookmarks = { ...(cloudData.eceEeeBookmarks || {}), ...localBookmarks };
            saveEceEeePrepBookmarks(mergedBookmarks);

            const localNotes = getEceEeePrepNotes();
            const mergedNotes = { ...(cloudData.eceEeeNotes || {}), ...localNotes };
            saveEceEeePrepNotes(mergedNotes);

            if (cloudData.activeField) {
              saveEceEeeSelectedField(cloudData.activeField);
            }

            if (cloudData.curriculumSubs) {
              const localSubs = getCheckedSubtopics();
              saveCheckedSubtopics({ ...cloudData.curriculumSubs, ...localSubs });
            }

            if (cloudData.toolSkills) {
              const localTools = getCheckedToolSkills();
              saveCheckedToolSkills({ ...cloudData.toolSkills, ...localTools });
            }

            if (cloudData.studiedDocs) {
              const localDocs = getStudiedEncyclopediaDocs();
              saveStudiedEncyclopediaDocs({ ...cloudData.studiedDocs, ...localDocs });
            }

            if (cloudData.nitGoaProgress) {
              const localNit = getNitGoaProgress();
              saveNitGoaProgress({ ...cloudData.nitGoaProgress, ...localNit });
            }

            if (cloudData.nitGoaElectives) {
              const localElectives = getNitGoaElectives();
              saveNitGoaElectives({ ...cloudData.nitGoaElectives, ...localElectives } as Record<string, 'selected' | 'completed' | 'planned'>);
            }

            if (cloudData.interviewStatus) {
              const localInterviews = getInterviewQuestionsStatus();
              saveInterviewQuestionsStatus({ ...cloudData.interviewStatus, ...localInterviews } as Record<string, 'Mastered' | 'Review' | 'Untested'>);
            }

            if (cloudData.weeklyMilestones) {
              const localMilestones = getWeeklyMilestoneChecks();
              saveWeeklyMilestoneChecks({ ...cloudData.weeklyMilestones, ...localMilestones });
            }

            if (cloudData.habitsLog) {
              const localHabits = getDailyHabitsLog();
              saveDailyHabitsLog({ ...cloudData.habitsLog, ...localHabits });
            }

            if (cloudData.studentProfile) {
              saveStudentCollegeProfile(cloudData.studentProfile as any);
            }
          }
          // Now sync back merged copy to cloud
          const updated = collectLocalProgress();
          await syncUserProgressToCloud(user, updated);
          setLastSyncedAt(new Date());
        } catch (err) {
          console.warn('Initial cloud sync error:', err);
        }
      }
    });

    return () => unsubscribe();
  }, [collectLocalProgress]);

  const login = async () => {
    setAuthError(null);
    try {
      const user = await signInWithGoogle();
      if (user) {
        await syncToCloud(user);
      }
      return user;
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        // User voluntarily closed popup
        return null;
      }

      const domain = typeof window !== 'undefined' ? window.location.hostname : '';
      let message = err?.message || 'Failed to sign in with Google.';

      if (err?.code === 'auth/unauthorized-domain') {
        message = `Domain "${domain}" is not authorized for Google Sign-In in Firebase Console. Add this domain in Firebase Console > Authentication > Settings > Authorized domains.`;
      }

      setAuthError({
        code: err?.code,
        message,
        domain
      });
      throw err;
    }
  };

  const logout = async () => {
    try {
      await firebaseLogOut();
      setCurrentUser(null);
      setAuthError(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  return {
    currentUser,
    loading,
    isAdmin,
    adminEmail: ADMIN_EMAIL,
    isSyncing,
    lastSyncedAt,
    authError,
    login,
    logout,
    clearAuthError,
    syncToCloud
  };
}
