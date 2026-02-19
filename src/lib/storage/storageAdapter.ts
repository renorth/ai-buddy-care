import { User, LeaderboardEntry, LeaderboardType } from '@/types/user';
import { Activity } from '@/types/activity';
import { Buddy, CareAction } from '@/types/buddy';

/**
 * Storage adapter interface
 * Allows switching between localStorage (Phase 1) and Supabase (Phase 2)
 */
export interface StorageAdapter {
  // User operations
  getUser(): Promise<User | null>;
  saveUser(user: User): Promise<void>;
  getUserById(userId: string): Promise<User | null>;

  // Buddy operations
  getBuddy(userId: string): Promise<Buddy | null>;
  saveBuddy(buddy: Buddy): Promise<void>;

  // Activity operations
  getActivities(userId: string): Promise<Activity[]>;
  saveActivity(activity: Activity): Promise<void>;
  getActivityCount(userId: string): Promise<number>;

  // Care action operations
  getCareActions(buddyId: string): Promise<CareAction[]>;
  saveCareAction(action: CareAction): Promise<void>;

  // Leaderboard operations
  getLeaderboard(type: LeaderboardType): Promise<LeaderboardEntry[]>;

  // Utility
  clear(): Promise<void>;
}

/**
 * Get the active storage adapter
 */
export function getStorageAdapter(): StorageAdapter {
  // For Phase 1, always use localStorage
  // For Phase 2, check environment variable to switch to Supabase
  const useBackend = process.env.NEXT_PUBLIC_USE_BACKEND === 'true';

  if (useBackend) {
    // Phase 2: Import and return Supabase adapter
    throw new Error('Supabase adapter not yet implemented');
  }

  // Phase 1: Return localStorage adapter
  // Import dynamically to avoid SSR issues
  if (typeof window !== 'undefined') {
    const { LocalStorageAdapter } = require('./localStorage');
    return new LocalStorageAdapter();
  }

  // Server-side fallback (shouldn't be used in Phase 1)
  throw new Error('Storage adapter not available on server side');
}
