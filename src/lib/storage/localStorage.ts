import { User, LeaderboardEntry, LeaderboardType } from '@/types/user';
import { Activity } from '@/types/activity';
import { Buddy, CareAction } from '@/types/buddy';
import { StorageAdapter } from './storageAdapter';

const STORAGE_KEYS = {
  USER: 'ai-buddy-user',
  BUDDY: 'ai-buddy-buddy',
  ACTIVITIES: 'ai-buddy-activities',
  CARE_ACTIONS: 'ai-buddy-care-actions',
};

/**
 * LocalStorage implementation of StorageAdapter
 */
export class LocalStorageAdapter implements StorageAdapter {
  private getFromStorage<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  }

  private saveToStorage<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
    }
  }

  // User operations
  async getUser(): Promise<User | null> {
    return this.getFromStorage<User>(STORAGE_KEYS.USER);
  }

  async saveUser(user: User): Promise<void> {
    this.saveToStorage(STORAGE_KEYS.USER, user);
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = await this.getUser();
    return user?.id === userId ? user : null;
  }

  // Buddy operations
  async getBuddy(userId: string): Promise<Buddy | null> {
    const buddy = this.getFromStorage<Buddy>(STORAGE_KEYS.BUDDY);
    return buddy?.id === userId ? buddy : null;
  }

  async saveBuddy(buddy: Buddy): Promise<void> {
    this.saveToStorage(STORAGE_KEYS.BUDDY, buddy);
  }

  // Activity operations
  async getActivities(userId: string): Promise<Activity[]> {
    const activities = this.getFromStorage<Activity[]>(STORAGE_KEYS.ACTIVITIES) || [];
    return activities.filter(a => a.userId === userId);
  }

  async saveActivity(activity: Activity): Promise<void> {
    const activities = this.getFromStorage<Activity[]>(STORAGE_KEYS.ACTIVITIES) || [];
    activities.push(activity);
    this.saveToStorage(STORAGE_KEYS.ACTIVITIES, activities);
  }

  async getActivityCount(userId: string): Promise<number> {
    const activities = await this.getActivities(userId);
    return activities.length;
  }

  // Care action operations
  async getCareActions(buddyId: string): Promise<CareAction[]> {
    const actions = this.getFromStorage<CareAction[]>(STORAGE_KEYS.CARE_ACTIONS) || [];
    return actions.filter(a => a.buddyId === buddyId);
  }

  async saveCareAction(action: CareAction): Promise<void> {
    const actions = this.getFromStorage<CareAction[]>(STORAGE_KEYS.CARE_ACTIONS) || [];
    actions.push(action);
    this.saveToStorage(STORAGE_KEYS.CARE_ACTIONS, actions);
  }

  // Leaderboard operations (Phase 1: solo mode, no real leaderboard)
  async getLeaderboard(type: LeaderboardType): Promise<LeaderboardEntry[]> {
    const user = await this.getUser();
    const buddy = user ? await this.getBuddy(user.id) : null;

    if (!user || !buddy) return [];

    // Return current user as a single-entry leaderboard
    return [
      {
        userId: user.id,
        userName: user.name,
        avatarUrl: user.avatarUrl,
        points: user.totalPoints,
        level: buddy.level,
        streak: buddy.currentCareStreak,
        achievementCount: user.unlockedAchievements.length,
        rank: 1,
      },
    ];
  }

  // Utility
  async clear(): Promise<void> {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}
