'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Award } from 'lucide-react';
import { useStore } from '@/lib/store';

export function AchievementModal() {
  const { showAchievementModal, newAchievements, setShowAchievementModal } = useStore();

  if (newAchievements.length === 0) return null;

  return (
    <AnimatePresence>
      {showAchievementModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setShowAchievementModal(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 50 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 pointer-events-auto relative"
            >
              {/* Close button */}
              <button
                onClick={() => setShowAchievementModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="text-center space-y-4">
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <Award className="w-16 h-16 mx-auto text-purple-600" />
                </motion.div>

                <h2 className="text-2xl font-bold">
                  Achievement{newAchievements.length > 1 ? 's' : ''} Unlocked!
                </h2>

                <div className="space-y-3">
                  {newAchievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-800"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{achievement.icon}</span>
                        <div className="text-left flex-1">
                          <h3 className="font-bold">{achievement.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {achievement.description}
                          </p>
                          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                            +{achievement.pointsReward} XP
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAchievementModal(false)}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium w-full"
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
