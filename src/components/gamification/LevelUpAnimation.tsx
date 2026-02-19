'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, Sparkles } from 'lucide-react';
import { useStore } from '@/lib/store';
import { BUDDY_STAGES } from '@/config/gamification';
import { useEffect } from 'react';

export function LevelUpAnimation() {
  const { showLevelUpModal, levelUpData, setShowLevelUpModal } = useStore();

  useEffect(() => {
    if (showLevelUpModal) {
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        setShowLevelUpModal(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showLevelUpModal, setShowLevelUpModal]);

  if (!levelUpData) return null;

  const newStageInfo = BUDDY_STAGES[Object.keys(BUDDY_STAGES).find(
    key => BUDDY_STAGES[key as keyof typeof BUDDY_STAGES].minLevel <= levelUpData.newLevel
  ) as keyof typeof BUDDY_STAGES || 'spark'];

  return (
    <AnimatePresence>
      {showLevelUpModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setShowLevelUpModal(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 pointer-events-auto relative overflow-hidden"
            >
              {/* Confetti Background */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"
                    initial={{
                      x: '50%',
                      y: '50%',
                      scale: 0,
                    }}
                    animate={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      scale: [0, 1, 0],
                      rotate: Math.random() * 360,
                    }}
                    transition={{
                      duration: 2,
                      delay: Math.random() * 0.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                ))}
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowLevelUpModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="text-center space-y-4">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <Trophy className="w-20 h-20 mx-auto text-yellow-500" />
                </motion.div>

                <div>
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Level Up!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Your buddy reached level {levelUpData.newLevel}
                  </p>
                </div>

                {levelUpData.stageChanged && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border-2 border-purple-300 dark:border-purple-700"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-900 dark:text-purple-100">
                        Evolution!
                      </span>
                    </div>
                    <p className="text-sm">
                      Your buddy evolved into a <span className="font-bold">{newStageInfo.name}</span>!
                    </p>
                    <p className="text-4xl mt-2">{newStageInfo.emoji}</p>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLevelUpModal(false)}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium"
                >
                  Awesome!
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
