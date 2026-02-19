'use client';

import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { getNextStreakMilestone } from '@/lib/gamification/streaks';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakCounter({ currentStreak, longestStreak }: StreakCounterProps) {
  const nextMilestone = getNextStreakMilestone(currentStreak);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              scale: currentStreak > 0 ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: currentStreak > 0 ? Infinity : 0,
              repeatDelay: 1,
            }}
          >
            <Flame className={`w-8 h-8 ${currentStreak > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
          </motion.div>
          <div>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {currentStreak} {currentStreak === 1 ? 'Day' : 'Days'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {longestStreak}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Best</p>
        </div>
      </div>

      {nextMilestone && (
        <div className="mt-3 pt-3 border-t border-orange-200 dark:border-orange-800">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            🎯 Next milestone: <span className="font-semibold">{nextMilestone} days</span>
          </p>
        </div>
      )}
    </div>
  );
}
