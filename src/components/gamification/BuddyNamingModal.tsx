'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

interface BuddyNamingModalProps {
  show: boolean;
  onNameSubmit: (name: string) => void;
}

const SUGGESTED_NAMES = [
  '✨ Spark',
  '🤖 Pixel',
  '⚡ Bolt',
  '💫 Nova',
  '🌟 Byte',
  '🔮 Cipher',
  '💡 Edison',
  '🚀 Cosmo',
];

export function BuddyNamingModal({ show, onNameSubmit }: BuddyNamingModalProps) {
  const [customName, setCustomName] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = customName.trim() || selectedSuggestion || 'Buddy';
    onNameSubmit(finalName);
  };

  const handleSuggestionClick = (name: string) => {
    setSelectedSuggestion(name);
    setCustomName('');
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-lg w-full pointer-events-auto relative"
            >
              {/* Sparkles decoration */}
              <div className="absolute -top-4 -right-4">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="text-center space-y-6">
                {/* Buddy preview */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="inline-block"
                >
                  <div className="w-32 h-32 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 shadow-lg border-4 border-white dark:border-gray-700">
                    <span className="text-7xl">✨</span>
                  </div>
                </motion.div>

                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-2">
                    Meet Your AI Buddy!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    A digital companion that grows with your AI usage
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Custom name input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-left">
                      Give your buddy a name
                    </label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => {
                        setCustomName(e.target.value);
                        setSelectedSuggestion('');
                      }}
                      placeholder="Enter a custom name..."
                      maxLength={20}
                      className="w-full p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-purple-500 dark:focus:border-purple-500 outline-none text-center text-lg font-medium"
                    />
                  </div>

                  {/* Suggested names */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 text-left">Or choose a suggested name:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {SUGGESTED_NAMES.map((name) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => handleSuggestionClick(name)}
                          className={`p-2 rounded-lg border-2 text-sm font-medium transition-all ${
                            selectedSuggestion === name
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
                  >
                    Start Journey 🚀
                  </motion.button>
                </form>

                <p className="text-xs text-gray-500">
                  You can change the name later in settings
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
