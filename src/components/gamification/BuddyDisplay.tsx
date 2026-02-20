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
          y: [0, -15, 0],
          rotate: [0, 8, -8, 0],
          scale: [1, 1.05, 1],
          transition: { duration: 1.5, repeat: Infinity },
        };
      case 'content':
        return {
          y: [0, -8, 0],
          rotate: [0, 2, -2, 0],
          transition: { duration: 3, repeat: Infinity },
        };
      case 'hungry':
        return {
          x: [-5, 5, -5],
          rotate: [-2, 2, -2],
          transition: { duration: 0.4, repeat: Infinity },
        };
      case 'sad':
        return {
          y: [0, 8, 0],
          opacity: [1, 0.6, 1],
          rotate: [0, -5, 5, 0],
          transition: { duration: 2.5, repeat: Infinity },
        };
      case 'neglected':
        return {
          opacity: [0.4, 0.2, 0.4],
          scale: [1, 0.95, 1],
          transition: { duration: 2, repeat: Infinity },
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
      {/* Digital Pet Habitat */}
      <div className="relative">
        {/* Neopet-style frame with organic curves */}
        <div className="p-6 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-[2.5rem] shadow-2xl border-4 border-white dark:border-purple-300">
          {/* Pet environment */}
          <div className="bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100 dark:from-purple-900/40 dark:via-blue-900/40 dark:to-pink-900/40 rounded-[2rem] p-8 border-4 border-purple-200 dark:border-purple-700 relative overflow-hidden">
            {/* Floating sparkles background */}
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Creature buddy container */}
            <motion.div
              className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-gradient-to-br from-white/80 to-purple-100/80 dark:from-purple-800/50 dark:to-pink-800/50 shadow-2xl border-4 border-purple-300 dark:border-purple-500 mx-auto relative backdrop-blur-sm`}
              animate={getMoodAnimation()}
              style={{ filter: getMoodFilter() }}
            >
              {/* Creature glow aura */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              {/* Pet emoji with enhanced size and glow */}
              <span className="select-none text-8xl drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] relative z-10">
                {stageInfo.emoji}
              </span>

              {/* Cute floating hearts when happy */}
              {buddy.mood === 'happy' && (
                <>
                  <motion.span
                    className="absolute -top-4 -left-4 text-2xl"
                    animate={{
                      y: [-10, -30],
                      opacity: [1, 0],
                      rotate: [-10, 10],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    💖
                  </motion.span>
                  <motion.span
                    className="absolute -top-4 -right-4 text-2xl"
                    animate={{
                      y: [-10, -30],
                      opacity: [1, 0],
                      rotate: [10, -10],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      delay: 1,
                    }}
                  >
                    ✨
                  </motion.span>
                </>
              )}
            </motion.div>

            {/* Pawprint indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`text-xl ${
                    i < Math.ceil((buddy.stats.overall / 100) * 5)
                      ? 'opacity-100'
                      : 'opacity-20'
                  }`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                    filter: i < Math.ceil((buddy.stats.overall / 100) * 5)
                      ? ['drop-shadow(0_0_5px_rgba(168,85,247,0.6))', 'drop-shadow(0_0_10px_rgba(168,85,247,0.8))', 'drop-shadow(0_0_5px_rgba(168,85,247,0.6))']
                      : 'none'
                  }}
                  transition={{
                    scale: { delay: i * 0.1, type: 'spring' },
                    rotate: { delay: i * 0.1, type: 'spring' },
                    filter: { duration: 1.5, repeat: Infinity }
                  }}
                >
                  🐾
                </motion.div>
              ))}
            </div>

            {/* Grass/ground decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-300/30 to-transparent dark:from-green-700/30" />
          </div>

          {/* Neopet-style action buttons */}
          <div className="flex justify-center gap-3 mt-4">
            <motion.div
              className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold text-xs shadow-lg border-2 border-pink-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              FEED
            </motion.div>
            <motion.div
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold text-xs shadow-lg border-2 border-blue-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              PLAY
            </motion.div>
            <motion.div
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 text-white font-bold text-xs shadow-lg border-2 border-purple-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CARE
            </motion.div>
          </div>
        </div>

        {/* Energy status indicator */}
        <motion.div
          className="absolute -top-3 -right-3 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 border-2 border-white shadow-lg"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <span className="text-sm">⚡</span>
        </motion.div>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold">{buddy.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {stageInfo.name} • Level {buddy.level}
        </p>
      </div>

      {/* Pet mood display */}
      <motion.div
        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/80 dark:to-pink-900/80 rounded-full border-3 border-purple-300 dark:border-purple-500 shadow-lg"
        animate={{
          boxShadow: ['0_4px_15px_rgba(168,85,247,0.3)', '0_4px_25px_rgba(236,72,153,0.4)', '0_4px_15px_rgba(168,85,247,0.3)']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <span className="text-xs font-bold text-purple-600 dark:text-purple-300">MOOD:</span>
        <span className="text-sm font-bold text-purple-900 dark:text-pink-200">
          {buddy.mood === 'happy' && '💖 PLAYFUL'}
          {buddy.mood === 'content' && '😊 HAPPY'}
          {buddy.mood === 'hungry' && '🍖 HUNGRY'}
          {buddy.mood === 'sad' && '😢 LONELY'}
          {buddy.mood === 'neglected' && '💔 NEGLECTED'}
          {buddy.mood === 'sleeping' && '😴 SLEEPY'}
        </span>
      </motion.div>
    </div>
  );
}
