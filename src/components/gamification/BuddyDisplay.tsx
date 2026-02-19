'use client';

import { Buddy } from '@/types/buddy';
import { BUDDY_STAGES } from '@/config/gamification';
import { motion } from 'framer-motion';

interface BuddyDisplayProps {
  buddy: Buddy;
  size?: 'sm' | 'md' | 'lg';
}

export function BuddyDisplay({ buddy, size = 'lg' }: BuddyDisplayProps) {
  const stageInfo = BUDDY_STAGES[buddy.stage];

  const sizeClasses = {
    sm: 'w-16 h-16 text-4xl',
    md: 'w-32 h-32 text-7xl',
    lg: 'w-48 h-48 text-9xl',
  };

  const getMoodAnimation = () => {
    switch (buddy.mood) {
      case 'happy':
        return {
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
          transition: { duration: 2, repeat: Infinity },
        };
      case 'content':
        return {
          y: [0, -5, 0],
          transition: { duration: 3, repeat: Infinity },
        };
      case 'hungry':
        return {
          x: [-3, 3, -3],
          transition: { duration: 0.5, repeat: Infinity },
        };
      case 'sad':
        return {
          y: [0, 5, 0],
          opacity: [1, 0.7, 1],
          transition: { duration: 2, repeat: Infinity },
        };
      case 'neglected':
        return {
          opacity: [0.5, 0.3, 0.5],
          transition: { duration: 1.5, repeat: Infinity },
        };
      default:
        return {};
    }
  };

  const getMoodFilter = () => {
    switch (buddy.mood) {
      case 'sad':
      case 'neglected':
        return 'grayscale(0.5) brightness(0.8)';
      case 'hungry':
        return 'brightness(0.9)';
      default:
        return 'none';
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Tamagotchi-style screen */}
      <div className="relative">
        {/* Screen border */}
        <div className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border-4 border-gray-700">
          {/* Inner screen */}
          <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-2xl p-6 border-4 border-gray-600">
            {/* Buddy container */}
            <motion.div
              className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 shadow-lg border-4 border-white dark:border-gray-700 mx-auto`}
              animate={getMoodAnimation()}
              style={{ filter: getMoodFilter() }}
            >
              <span className="select-none">{stageInfo.emoji}</span>
            </motion.div>

            {/* Pixel-style decorations */}
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-sm ${
                    i < Math.ceil((buddy.stats.overall / 100) * 5)
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Tamagotchi buttons */}
          <div className="flex justify-center gap-4 mt-3">
            <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-500 shadow-inner" />
            <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-500 shadow-inner" />
            <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-500 shadow-inner" />
          </div>
        </div>

        {/* Status indicator */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 border-2 border-white dark:border-gray-700 shadow-lg"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold">{buddy.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {stageInfo.name} • Level {buddy.level}
        </p>
      </div>

      {/* Mood indicator with pixel style */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full border-2 border-gray-300 dark:border-gray-700">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">MOOD:</span>
        <span className="text-sm font-bold">
          {buddy.mood === 'happy' && '😊 HAPPY'}
          {buddy.mood === 'content' && '😌 CONTENT'}
          {buddy.mood === 'hungry' && '😋 HUNGRY'}
          {buddy.mood === 'sad' && '😢 SAD'}
          {buddy.mood === 'neglected' && '😞 NEGLECTED'}
          {buddy.mood === 'sleeping' && '😴 SLEEPING'}
        </span>
      </div>
    </div>
  );
}
