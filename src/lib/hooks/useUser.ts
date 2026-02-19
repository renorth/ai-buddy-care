import { useEffect } from 'react';
import { useStore } from '../store';
import { getStorageAdapter } from '../storage/storageAdapter';
import { User } from '@/types/user';
import { Buddy } from '@/types/buddy';
import { v4 as uuidv4 } from 'uuid';

function generateId(): string {
  return uuidv4();
}

/**
 * Hook to initialize and manage user data
 */
export function useUser() {
  const { user, buddy, setUser, setBuddy, setActivities, initialized, setInitialized, setShowNamingModal } = useStore();

  useEffect(() => {
    if (initialized) return;

    const initializeUser = async () => {
      const storage = getStorageAdapter();

      try {
        // Load user
        let loadedUser = await storage.getUser();

        if (!loadedUser) {
          // Create new user on first visit
          const userId = generateId();
          loadedUser = createNewUser(userId);
          await storage.saveUser(loadedUser);

          // Create new buddy with default name
          const newBuddy = createNewBuddy(userId);
          await storage.saveBuddy(newBuddy);
          setBuddy(newBuddy);

          // Show naming modal for new users
          setShowNamingModal(true);
        } else {
          // Load existing buddy
          const loadedBuddy = await storage.getBuddy(loadedUser.id);
          setBuddy(loadedBuddy);
        }

        // Load activities
        const activities = await storage.getActivities(loadedUser.id);
        setActivities(activities);

        setUser(loadedUser);
        setInitialized(true);
      } catch (error) {
        console.error('Error initializing user:', error);
      }
    };

    initializeUser();
  }, [initialized, setUser, setBuddy, setActivities, setInitialized, setShowNamingModal]);

  return { user, buddy, initialized };
}

/**
 * Create a new user object
 */
function createNewUser(userId: string): User {
  return {
    id: userId,
    name: 'AI Enthusiast',
    email: '',
    createdAt: new Date().toISOString(),
    totalPoints: 0,
    level: 1,
    currentLevelProgress: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastCheckInDate: '',
    totalActivities: 0,
    unlockedAchievements: [],
  };
}

/**
 * Create a new buddy object
 */
function createNewBuddy(userId: string): Buddy {
  return {
    id: userId,
    name: 'Buddy',
    stage: 'spark',
    level: 1,
    experience: 0,
    mood: 'content',
    stats: {
      happiness: 50,
      health: 50,
      energy: 50,
      overall: 50,
    },
    accessories: [],
    lastFedDate: '',
    daysNeglected: 0,
    totalCareSessions: 0,
    currentCareStreak: 0,
    longestCareStreak: 0,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Hook to update user profile
 */
export function useUpdateUser() {
  const { setUser } = useStore();

  const updateUser = async (updates: Partial<User>) => {
    const storage = getStorageAdapter();
    const currentUser = await storage.getUser();

    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      await storage.saveUser(updatedUser);
      setUser(updatedUser);
    }
  };

  return { updateUser };
}

/**
 * Hook to update buddy
 */
export function useUpdateBuddy() {
  const { setBuddy } = useStore();

  const updateBuddy = async (updates: Partial<Buddy>) => {
    const storage = getStorageAdapter();
    const currentUser = await storage.getUser();

    if (currentUser) {
      const currentBuddy = await storage.getBuddy(currentUser.id);
      if (currentBuddy) {
        const updatedBuddy = { ...currentBuddy, ...updates };
        await storage.saveBuddy(updatedBuddy);
        setBuddy(updatedBuddy);
      }
    }
  };

  return { updateBuddy };
}
