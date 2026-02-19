export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;

  // Gamification
  totalPoints: number;
  level: number;
  currentLevelProgress: number; // 0-100%

  // Streaks
  currentStreak: number;
  longestStreak: number;
  lastCheckInDate: string; // YYYY-MM-DD

  // Stats
  totalActivities: number;
  unlockedAchievements: string[];
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  avatarUrl?: string;
  points: number;
  level: number;
  streak: number;
  achievementCount: number;
  rank: number;
}

export type LeaderboardType = 'overall' | 'weekly' | 'streak' | 'achievements';
