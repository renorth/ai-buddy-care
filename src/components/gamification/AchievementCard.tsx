'use client';

import { AchievementProgress } from '@/lib/gamification/achievements';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface AchievementCardProps {
  progress: AchievementProgress;
  onClick?: () => void;
}

export function AchievementCard({ progress, onClick }: AchievementCardProps) {
  const { achievement, unlocked, progress: current, target } = progress;

  const rarityColors = {
    common: 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800',
    rare: 'border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20',
    epic: 'border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20',
    legendary: 'border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-900/20',
  };

  const rarityText = {
    common: 'text-gray-600 dark:text-gray-400',
    rare: 'text-blue-600 dark:text-blue-400',
    epic: 'text-purple-600 dark:text-purple-400',
    legendary: 'text-yellow-600 dark:text-yellow-400',
  };

  const progressPercent = (current / target) * 100;

  return (
    <motion.div
      className={`rounded-lg p-4 border-2 ${rarityColors[achievement.rarity]} ${
        unlocked ? 'cursor-pointer hover:shadow-lg' : 'opacity-60'
      } transition-all`}
      onClick={onClick}
      whileHover={unlocked ? { scale: 1.02 } : {}}
      whileTap={unlocked ? { scale: 0.98 } : {}}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl flex-shrink-0">
          {unlocked ? achievement.icon : <Lock className="w-8 h-8 text-gray-400" />}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1 truncate">{achievement.name}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
            {achievement.description}
          </p>

          {!unlocked && target > 1 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">
                  {current} / {target}
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs font-medium uppercase ${rarityText[achievement.rarity]}`}>
              {achievement.rarity}
            </span>
            <span className="text-xs text-gray-500">+{achievement.pointsReward} XP</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
