import { useStore } from '../store';
import { getAllAchievementProgress, AchievementProgress } from '../gamification/achievements';

/**
 * Hook to get achievement progress
 */
export function useAchievements(): {
  allProgress: AchievementProgress[];
  unlocked: AchievementProgress[];
  locked: AchievementProgress[];
  totalUnlocked: number;
  totalAchievements: number;
} {
  const { user, buddy, activities } = useStore();

  if (!user || !buddy) {
    return {
      allProgress: [],
      unlocked: [],
      locked: [],
      totalUnlocked: 0,
      totalAchievements: 0,
    };
  }

  const allProgress = getAllAchievementProgress(
    activities,
    buddy.currentCareStreak,
    buddy.longestCareStreak,
    buddy.level,
    buddy.stats,
    user.unlockedAchievements
  );

  const unlocked = allProgress.filter(p => p.unlocked);
  const locked = allProgress.filter(p => !p.unlocked);

  return {
    allProgress,
    unlocked,
    locked,
    totalUnlocked: unlocked.length,
    totalAchievements: allProgress.length,
  };
}
