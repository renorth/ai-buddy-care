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
      {/* Robot Pet Housing */}
      <div className="relative">
        {/* Metallic robot frame */}
        <div className="p-4 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-3xl shadow-2xl border-4 border-slate-500">
          {/* Robot screen display */}
          <div className="bg-gradient-to-br from-cyan-900/90 to-blue-900/90 rounded-2xl p-6 border-4 border-slate-400 relative overflow-hidden">
            {/* Circuit board pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                {[...Array(64)].map((_, i) => (
                  <div key={i} className="border border-cyan-400" />
                ))}
              </div>
            </div>

            {/* Robot buddy container */}
            <motion.div
              className={`${sizeClasses[size]} flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl border-4 border-cyan-500 mx-auto relative`}
              animate={getMoodAnimation()}
              style={{ filter: getMoodFilter() }}
            >
              {/* Robot glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 animate-pulse" />
              <span className="select-none text-8xl drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">{stageInfo.emoji}</span>
            </motion.div>

            {/* LED status indicators */}
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < Math.ceil((buddy.stats.overall / 100) * 5)
                      ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                      : 'bg-slate-600'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    opacity: i < Math.ceil((buddy.stats.overall / 100) * 5) ? [1, 0.5, 1] : 1
                  }}
                  transition={{
                    scale: { delay: i * 0.1 },
                    opacity: { duration: 1.5, repeat: Infinity }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Robot control panel buttons */}
          <div className="flex justify-center gap-4 mt-3">
            <motion.div
              className="w-8 h-8 rounded-full bg-red-600 border-2 border-red-400 shadow-inner shadow-red-800"
              animate={{ boxShadow: ['0_0_5px_rgba(220,38,38,0.5)', '0_0_15px_rgba(220,38,38,0.8)', '0_0_5px_rgba(220,38,38,0.5)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-yellow-300 shadow-inner shadow-yellow-700"
              animate={{ boxShadow: ['0_0_5px_rgba(234,179,8,0.5)', '0_0_15px_rgba(234,179,8,0.8)', '0_0_5px_rgba(234,179,8,0.5)'] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.66 }}
            />
            <motion.div
              className="w-8 h-8 rounded-full bg-green-500 border-2 border-green-300 shadow-inner shadow-green-700"
              animate={{ boxShadow: ['0_0_5px_rgba(34,197,94,0.5)', '0_0_15px_rgba(34,197,94,0.8)', '0_0_5px_rgba(34,197,94,0.5)'] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.33 }}
            />
          </div>
        </div>

        {/* Power status indicator */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyan-400 border-2 border-slate-300 shadow-lg shadow-cyan-500/50"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: ['0_0_10px_rgba(34,211,238,0.5)', '0_0_20px_rgba(34,211,238,0.8)', '0_0_10px_rgba(34,211,238,0.5)']
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

      {/* Robot status display */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border-2 border-cyan-500 shadow-lg shadow-cyan-500/20">
        <span className="text-xs font-bold text-cyan-400">STATUS:</span>
        <span className="text-sm font-bold text-cyan-100">
          {buddy.mood === 'happy' && '🟢 OPTIMAL'}
          {buddy.mood === 'content' && '🟡 STABLE'}
          {buddy.mood === 'hungry' && '🟠 LOW POWER'}
          {buddy.mood === 'sad' && '🔴 MALFUNCTION'}
          {buddy.mood === 'neglected' && '⚫ SHUTDOWN'}
          {buddy.mood === 'sleeping' && '💤 SLEEP MODE'}
        </span>
      </div>
    </div>
  );
}
