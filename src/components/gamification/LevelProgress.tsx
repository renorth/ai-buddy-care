'use client';

import { Buddy } from '@/types/buddy';
import { getExperienceForNextLevel, getExperienceAtCurrentLevel } from '@/lib/gamification/levels';
import { Trophy } from 'lucide-react';

interface LevelProgressProps {
  buddy: Buddy;
}

export function LevelProgress({ buddy }: LevelProgressProps) {
  const currentLevelXP = getExperienceAtCurrentLevel(buddy.level);
  const nextLevelXP = getExperienceForNextLevel(buddy.level);
  const xpIntoLevel = buddy.experience - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  const progress = (xpIntoLevel / xpNeededForLevel) * 100;

  const isMaxLevel = buddy.level >= 15;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium">Level {buddy.level}</span>
        </div>
        {!isMaxLevel && (
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {xpIntoLevel} / {xpNeededForLevel} XP
          </span>
        )}
      </div>
      {!isMaxLevel && (
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {isMaxLevel && (
        <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
          Max Level Reached! 🎉
        </p>
      )}
    </div>
  );
}
