import { differenceInDays, parseISO, format } from 'date-fns';
import { STREAK_BONUSES } from '@/config/gamification';

/**
 * Calculate streak based on last check-in date
 */
export function calculateStreak(
  lastCheckInDate: string | null,
  currentStreak: number
): {
  newStreak: number;
  streakBroken: boolean;
  daysNeglected: number;
} {
  if (!lastCheckInDate) {
    return {
      newStreak: 1,
      streakBroken: false,
      daysNeglected: 0,
    };
  }

  const today = new Date();
  const lastDate = parseISO(lastCheckInDate);
  const daysDiff = differenceInDays(today, lastDate);

  // Same day check-in (shouldn't happen with proper UI)
  if (daysDiff === 0) {
    return {
      newStreak: currentStreak,
      streakBroken: false,
      daysNeglected: 0,
    };
  }

  // Consecutive day
  if (daysDiff === 1) {
    return {
      newStreak: currentStreak + 1,
      streakBroken: false,
      daysNeglected: 0,
    };
  }

  // Streak broken
  return {
    newStreak: 1,
    streakBroken: true,
    daysNeglected: daysDiff - 1,
  };
}

/**
 * Get streak bonus for a given streak count
 */
export function getStreakBonus(streak: number): {
  happiness: number;
  health: number;
  xp: number;
} | null {
  // Check if we just hit a streak milestone
  if (STREAK_BONUSES[streak]) {
    return STREAK_BONUSES[streak];
  }
  return null;
}

/**
 * Get next streak milestone
 */
export function getNextStreakMilestone(currentStreak: number): number | null {
  const milestones = Object.keys(STREAK_BONUSES)
    .map(Number)
    .sort((a, b) => a - b);

  for (const milestone of milestones) {
    if (milestone > currentStreak) {
      return milestone;
    }
  }

  return null;
}

/**
 * Format today's date as YYYY-MM-DD
 */
export function getTodayDateString(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

/**
 * Check if already checked in today
 */
export function hasCheckedInToday(lastCheckInDate: string | null): boolean {
  if (!lastCheckInDate) return false;
  return lastCheckInDate === getTodayDateString();
}
