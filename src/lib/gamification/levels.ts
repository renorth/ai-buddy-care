import { LEVEL_THRESHOLDS, BUDDY_STAGES } from '@/config/gamification';
import { BuddyStage } from '@/types/buddy';

/**
 * Get level from total experience
 */
export function getLevelFromExperience(experience: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (experience >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}

/**
 * Get experience needed for next level
 */
export function getExperienceForNextLevel(currentLevel: number): number {
  if (currentLevel >= LEVEL_THRESHOLDS.length) {
    return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  }
  return LEVEL_THRESHOLDS[currentLevel];
}

/**
 * Get experience at current level
 */
export function getExperienceAtCurrentLevel(currentLevel: number): number {
  if (currentLevel <= 1) return 0;
  return LEVEL_THRESHOLDS[currentLevel - 2];
}

/**
 * Calculate progress percentage to next level
 */
export function getLevelProgress(experience: number, currentLevel: number): number {
  const currentLevelXP = getExperienceAtCurrentLevel(currentLevel);
  const nextLevelXP = getExperienceForNextLevel(currentLevel);
  const xpIntoLevel = experience - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;

  if (xpNeededForLevel === 0) return 100;
  return Math.min(100, Math.max(0, (xpIntoLevel / xpNeededForLevel) * 100));
}

/**
 * Get buddy stage from level
 */
export function getBuddyStage(level: number): BuddyStage {
  if (level >= BUDDY_STAGES.oracle.minLevel) return 'oracle';
  if (level >= BUDDY_STAGES.genius.minLevel) return 'genius';
  if (level >= BUDDY_STAGES.sage.minLevel) return 'sage';
  if (level >= BUDDY_STAGES.scout.minLevel) return 'scout';
  return 'spark';
}

/**
 * Check if level up occurred
 */
export function checkLevelUp(oldExperience: number, newExperience: number): {
  leveledUp: boolean;
  oldLevel: number;
  newLevel: number;
  stageChanged: boolean;
  oldStage: BuddyStage;
  newStage: BuddyStage;
} {
  const oldLevel = getLevelFromExperience(oldExperience);
  const newLevel = getLevelFromExperience(newExperience);
  const oldStage = getBuddyStage(oldLevel);
  const newStage = getBuddyStage(newLevel);

  return {
    leveledUp: newLevel > oldLevel,
    oldLevel,
    newLevel,
    stageChanged: oldStage !== newStage,
    oldStage,
    newStage,
  };
}
