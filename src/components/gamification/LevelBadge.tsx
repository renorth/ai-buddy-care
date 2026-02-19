'use client';

import { motion } from 'framer-motion';
import { BUDDY_STAGES } from '@/config/gamification';
import { BuddyStage } from '@/types/buddy';

interface LevelBadgeProps {
  level: number;
  stage: BuddyStage;
  experience: number;
  showProgress?: boolean;
}

export function LevelBadge({ level, stage, experience, showProgress = true }: LevelBadgeProps) {
  const stageInfo = BUDDY_STAGES[stage];

  // Calculate progress to next level
  const LEVEL_THRESHOLDS = [
    0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 18000, 25000, 35000, 50000, 75000,
  ];

  const currentLevelXP = level > 1 ? LEVEL_THRESHOLDS[level - 2] : 0;
  const nextLevelXP = level < LEVEL_THRESHOLDS.length ? LEVEL_THRESHOLDS[level - 1] : LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const xpIntoLevel = experience - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  const progress = xpNeededForLevel > 0 ? (xpIntoLevel / xpNeededForLevel) * 100 : 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-6">
        {/* Level Badge */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <div className="text-center">
              <p className="text-xs text-white opacity-80">LEVEL</p>
              <p className="text-3xl font-bold text-white">{level}</p>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">{stageInfo.emoji}</span>
          </div>
        </motion.div>

        {/* Level Info */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-1">{stageInfo.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {stageInfo.description}
          </p>

          {showProgress && level < LEVEL_THRESHOLDS.length && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">
                  {xpIntoLevel} / {xpNeededForLevel} XP
                </span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}

          {level >= LEVEL_THRESHOLDS.length && (
            <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
              🎉 Maximum level reached!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
