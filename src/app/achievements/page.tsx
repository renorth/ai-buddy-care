'use client';

import { useUser } from '@/lib/hooks/useUser';
import { useAchievements } from '@/lib/hooks/useAchievements';
import { AchievementCard } from '@/components/gamification/AchievementCard';
import { ArrowLeft, Award, Loader2, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AchievementsPage() {
  const { initialized } = useUser();
  const { unlocked, locked, totalUnlocked, totalAchievements } = useAchievements();

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Achievements</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {totalUnlocked} of {totalAchievements} unlocked
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Card */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-full">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {totalUnlocked} / {totalAchievements}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Achievements Unlocked</p>
              <div className="mt-2 h-3 bg-white dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                  style={{ width: `${(totalUnlocked / totalAchievements) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Unlocked Achievements */}
        {unlocked.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Unlocked ({unlocked.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unlocked.map((progress) => (
                <AchievementCard key={progress.achievement.id} progress={progress} />
              ))}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {locked.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gray-400" />
              Locked ({locked.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {locked.map((progress) => (
                <AchievementCard key={progress.achievement.id} progress={progress} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
