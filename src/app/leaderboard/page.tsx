'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { getStorageAdapter } from '@/lib/storage/storageAdapter';
import { LeaderboardEntry } from '@/types/user';
import { ArrowLeft, Crown, Loader2, Trophy, Flame, Award } from 'lucide-react';
import Link from 'next/link';

export default function LeaderboardPage() {
  const { user, initialized } = useUser();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      if (!initialized) return;

      try {
        const storage = getStorageAdapter();
        const data = await storage.getLeaderboard('overall');
        setLeaderboard(data);
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [initialized]);

  if (!initialized || loading) {
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
              <h1 className="text-2xl font-bold">Leaderboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                See how your buddy compares
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {leaderboard.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
            <Trophy className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No leaderboard data yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Compete with your team when Phase 2 launches!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((entry, index) => {
              const isCurrentUser = entry.userId === user?.id;
              const isTop3 = index < 3;

              return (
                <div
                  key={entry.userId}
                  className={`bg-white dark:bg-gray-800 rounded-xl p-4 border-2 ${
                    isCurrentUser
                      ? 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/10'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      {index === 0 && <Crown className="w-8 h-8 text-yellow-500" />}
                      {index === 1 && <Crown className="w-7 h-7 text-gray-400" />}
                      {index === 2 && <Crown className="w-6 h-6 text-orange-600" />}
                      {!isTop3 && (
                        <span className="text-xl font-bold text-gray-400">#{entry.rank}</span>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold truncate">{entry.userName}</h3>
                        {isCurrentUser && (
                          <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Level {entry.level}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4 text-purple-600" />
                          <span className="font-bold">{entry.points}</span>
                        </div>
                        <p className="text-xs text-gray-500">XP</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="font-bold">{entry.streak}</span>
                        </div>
                        <p className="text-xs text-gray-500">Streak</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-yellow-600" />
                          <span className="font-bold">{entry.achievementCount}</span>
                        </div>
                        <p className="text-xs text-gray-500">Badges</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Phase 2 Notice */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Coming in Phase 2:</strong> Team leaderboards, weekly competitions, and real-time rankings!
          </p>
        </div>
      </div>
    </main>
  );
}
