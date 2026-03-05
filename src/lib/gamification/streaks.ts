import { differenceInDays, parseISO, format, getDay, addDays } from 'date-fns';
import { STREAK_BONUSES } from '@/config/gamification';

/**
 * Check if a date is a weekday (Monday-Friday)
 */
function isWeekday(date: Date): boolean {
  const day = getDay(date);
  return day >= 1 && day <= 5; // Monday = 1, Friday = 5
}

/**
 * Calculate number of workdays between two dates (excluding start, including end)
 * Weekends don't count as missed days for work-focused tool
 */
function countWorkdaysBetween(startDate: Date, endDate: Date): number {
  let count = 0;
  let current = addDays(startDate, 1);

  while (current <= endDate) {
    if (isWeekday(current)) {
      count++;
    }
    current = addDays(current, 1);
  }

  return count;
}

/**
 * Get the next workday from a given date
 */
function getNextWorkday(date: Date): Date {
  let next = addDays(date, 1);
  while (!isWeekday(next)) {
    next = addDays(next, 1);
  }
  return next;
}

/**
 * Calculate streak based on last check-in date (workdays only)
 * Weekends are ignored - they don't break streaks or count as neglect
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

  // Calculate workdays between last check-in and today
  const workdaysBetween = countWorkdaysBetween(lastDate, today);

  // If today is a weekend, check against the previous Friday
  if (!isWeekday(today)) {
    // Weekend check-in is optional and keeps streak alive
    return {
      newStreak: currentStreak,
      streakBroken: false,
      daysNeglected: 0,
    };
  }

  // Today is a workday - check if we checked in on the last workday
  const expectedLastWorkday = getNextWorkday(lastDate);
  const workdaysSkipped = countWorkdaysBetween(lastDate, today) - 1;

  // If we checked in on the last workday (or it's the next workday)
  if (workdaysSkipped === 0) {
    return {
      newStreak: currentStreak + 1,
      streakBroken: false,
      daysNeglected: 0,
    };
  }

  // Streak broken - missed one or more workdays
  return {
    newStreak: 1,
    streakBroken: true,
    daysNeglected: workdaysSkipped,
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
