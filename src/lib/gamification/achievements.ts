import { Achievement } from '@/types/achievement';
import { Activity } from '@/types/activity';
import { ACHIEVEMENTS } from '@/config/achievements';
import { isWeekend, parseISO } from 'date-fns';

export interface AchievementProgress {
  achievement: Achievement;
  unlocked: boolean;
  progress: number;
  target: number;
}

/**
 * Check which achievements were just unlocked
 */
export function checkNewAchievements(
  activities: Activity[],
  currentStreak: number,
  longestStreak: number,
  buddyLevel: number,
  buddyStats: { happiness: number; health: number; energy: number },
  unlockedAchievements: string[]
): Achievement[] {
  const newlyUnlocked: Achievement[] = [];

  for (const achievement of ACHIEVEMENTS) {
    // Skip if already unlocked
    if (unlockedAchievements.includes(achievement.id)) continue;

    const unlocked = checkAchievementCriteria(
      achievement,
      activities,
      currentStreak,
      longestStreak,
      buddyLevel,
      buddyStats
    );

    if (unlocked) {
      newlyUnlocked.push(achievement);
    }
  }

  return newlyUnlocked;
}

/**
 * Check if achievement criteria is met
 */
function checkAchievementCriteria(
  achievement: Achievement,
  activities: Activity[],
  currentStreak: number,
  longestStreak: number,
  buddyLevel: number,
  buddyStats: { happiness: number; health: number; energy: number }
): boolean {
  const { criteria } = achievement;

  switch (criteria.type) {
    case 'activity-count':
      return activities.length >= (criteria.target || 0);

    case 'streak':
      return currentStreak >= (criteria.target || 0) || longestStreak >= (criteria.target || 0);

    case 'tool-variety': {
      const uniqueTools = new Set<string>();
      activities.forEach(activity => {
        activity.tools.forEach(tool => uniqueTools.add(tool.tool));
      });
      return uniqueTools.size >= (criteria.target || 0);
    }

    case 'impact': {
      const criticalActivities = activities.filter(activity =>
        activity.tools.some(tool => tool.impact === criteria.impactLevel)
      );
      return criticalActivities.length >= (criteria.target || 0);
    }

    case 'weekend': {
      const weekendActivities = activities.filter(activity =>
        isWeekend(parseISO(activity.date))
      );
      return weekendActivities.length >= (criteria.target || 0);
    }

    case 'special': {
      // Special achievements need custom logic
      if (achievement.id === 'founding-member') {
        // This would be checked at user creation time
        return false;
      }
      if (achievement.id === 'level-5') {
        return buddyLevel >= 5;
      }
      if (achievement.id === 'level-10') {
        return buddyLevel >= 10;
      }
      if (achievement.id === 'level-15') {
        return buddyLevel >= 15;
      }
      if (achievement.id === 'max-stats') {
        return buddyStats.happiness === 100 &&
               buddyStats.health === 100 &&
               buddyStats.energy === 100;
      }
      return false;
    }

    default:
      return false;
  }
}

/**
 * Get achievement progress for display
 */
export function getAchievementProgress(
  achievement: Achievement,
  activities: Activity[],
  currentStreak: number,
  longestStreak: number,
  buddyLevel: number,
  buddyStats: { happiness: number; health: number; energy: number },
  unlocked: boolean
): AchievementProgress {
  const { criteria } = achievement;
  let progress = 0;
  let target = criteria.target || 1;

  if (unlocked) {
    return { achievement, unlocked: true, progress: target, target };
  }

  switch (criteria.type) {
    case 'activity-count':
      progress = activities.length;
      break;

    case 'streak':
      progress = Math.max(currentStreak, longestStreak);
      break;

    case 'tool-variety': {
      const uniqueTools = new Set<string>();
      activities.forEach(activity => {
        activity.tools.forEach(tool => uniqueTools.add(tool.tool));
      });
      progress = uniqueTools.size;
      break;
    }

    case 'impact': {
      const criticalActivities = activities.filter(activity =>
        activity.tools.some(tool => tool.impact === criteria.impactLevel)
      );
      progress = criticalActivities.length;
      break;
    }

    case 'weekend': {
      const weekendActivities = activities.filter(activity =>
        isWeekend(parseISO(activity.date))
      );
      progress = weekendActivities.length;
      break;
    }

    case 'special': {
      if (achievement.id === 'level-5' || achievement.id === 'level-10' || achievement.id === 'level-15') {
        progress = buddyLevel;
        target = parseInt(achievement.id.split('-')[1]);
      }
      break;
    }
  }

  return {
    achievement,
    unlocked: false,
    progress: Math.min(progress, target),
    target,
  };
}

/**
 * Get all achievements with progress
 */
export function getAllAchievementProgress(
  activities: Activity[],
  currentStreak: number,
  longestStreak: number,
  buddyLevel: number,
  buddyStats: { happiness: number; health: number; energy: number },
  unlockedAchievements: string[]
): AchievementProgress[] {
  return ACHIEVEMENTS.map(achievement =>
    getAchievementProgress(
      achievement,
      activities,
      currentStreak,
      longestStreak,
      buddyLevel,
      buddyStats,
      unlockedAchievements.includes(achievement.id)
    )
  );
}
