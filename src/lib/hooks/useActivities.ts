import { useStore } from '../store';
import { getStorageAdapter } from '../storage/storageAdapter';
import { Activity, ToolUsage } from '@/types/activity';
import { calculateCareBenefits, applyCareBenefits } from '../gamification/care';
import { calculateStreak, getStreakBonus, getTodayDateString } from '../gamification/streaks';
import { checkLevelUp, getLevelProgress } from '../gamification/levels';
import { checkNewAchievements } from '../gamification/achievements';
import { calculateMood } from '@/config/gamification';
import { v4 as uuidv4 } from 'uuid';

/**
 * Hook to submit a daily check-in
 */
export function useCheckIn() {
  const {
    user,
    buddy,
    activities,
    setUser,
    setBuddy,
    addActivity,
    setShowLevelUpModal,
    setShowAchievementModal,
    setNewAchievements,
    setLevelUpData,
  } = useStore();

  const submitCheckIn = async (tools: ToolUsage[], notes?: string) => {
    if (!user || !buddy) return;

    const storage = getStorageAdapter();
    const today = getTodayDateString();

    // Calculate care benefits
    const benefits = calculateCareBenefits(tools, new Date());

    // Update buddy stats
    let newStats = applyCareBenefits(buddy.stats, benefits);

    // Calculate streak
    const streakResult = calculateStreak(buddy.lastFedDate || null, buddy.currentCareStreak);
    const streakBonus = getStreakBonus(streakResult.newStreak);

    // Apply streak bonus if any
    if (streakBonus) {
      newStats = {
        happiness: Math.min(100, newStats.happiness + streakBonus.happiness),
        health: Math.min(100, newStats.health + streakBonus.health),
        energy: newStats.energy,
      };
    }

    // Calculate overall stat
    const overall = Math.round((newStats.happiness + newStats.health + newStats.energy) / 3);

    // Update buddy XP and check for level up
    const oldExperience = buddy.experience;
    let newExperience = oldExperience + benefits.experience;
    if (streakBonus) {
      newExperience += streakBonus.xp;
    }

    const levelUpResult = checkLevelUp(oldExperience, newExperience);

    // Calculate mood
    const newMood = calculateMood(overall, 0);

    // Update buddy
    const updatedBuddy = {
      ...buddy,
      experience: newExperience,
      level: levelUpResult.newLevel,
      stage: levelUpResult.newStage,
      stats: { ...newStats, overall },
      mood: newMood as any,
      lastFedDate: today,
      daysNeglected: 0,
      totalCareSessions: buddy.totalCareSessions + 1,
      currentCareStreak: streakResult.newStreak,
      longestCareStreak: Math.max(buddy.longestCareStreak, streakResult.newStreak),
    };

    await storage.saveBuddy(updatedBuddy);
    setBuddy(updatedBuddy);

    // Create activity record
    const activity: Activity = {
      id: uuidv4(),
      userId: user.id,
      date: today,
      timestamp: new Date().toISOString(),
      tools,
      notes,
      pointsEarned: benefits.experience, // Using XP as points
    };

    await storage.saveActivity(activity);
    addActivity(activity);

    // Update user stats
    const updatedActivities = [...activities, activity];
    const totalPoints = updatedActivities.reduce((sum, a) => sum + a.pointsEarned, 0);
    const levelProgress = getLevelProgress(newExperience, levelUpResult.newLevel);

    // Check for new achievements
    const newAchievementsList = checkNewAchievements(
      updatedActivities,
      streakResult.newStreak,
      updatedBuddy.longestCareStreak,
      levelUpResult.newLevel,
      newStats,
      user.unlockedAchievements
    );

    const updatedUser = {
      ...user,
      totalPoints,
      level: levelUpResult.newLevel,
      currentLevelProgress: levelProgress,
      currentStreak: streakResult.newStreak,
      longestStreak: updatedBuddy.longestCareStreak,
      lastCheckInDate: today,
      totalActivities: updatedActivities.length,
      unlockedAchievements: [
        ...user.unlockedAchievements,
        ...newAchievementsList.map(a => a.id),
      ],
    };

    await storage.saveUser(updatedUser);
    setUser(updatedUser);

    // Show level up modal if leveled up
    if (levelUpResult.leveledUp) {
      setLevelUpData({
        oldLevel: levelUpResult.oldLevel,
        newLevel: levelUpResult.newLevel,
        stageChanged: levelUpResult.stageChanged,
      });
      setShowLevelUpModal(true);
    }

    // Show achievement modal if new achievements
    if (newAchievementsList.length > 0) {
      setNewAchievements(newAchievementsList);
      setShowAchievementModal(true);
    }

    return {
      success: true,
      benefits,
      levelUp: levelUpResult.leveledUp,
      achievements: newAchievementsList,
      streakBonus,
    };
  };

  return { submitCheckIn };
}

/**
 * Hook to get activity stats
 */
export function useActivityStats() {
  const { activities, buddy } = useStore();

  const stats = {
    total: activities.length,
    thisWeek: 0,
    thisMonth: 0,
    streak: buddy?.currentCareStreak || 0,
    longestStreak: buddy?.longestCareStreak || 0,
  };

  // Calculate this week and this month
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  activities.forEach(activity => {
    const activityDate = new Date(activity.date);
    if (activityDate >= weekAgo) stats.thisWeek++;
    if (activityDate >= monthAgo) stats.thisMonth++;
  });

  return stats;
}
