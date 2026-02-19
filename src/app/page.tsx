'use client';

import { useUser } from '@/lib/hooks/useUser';
import { BuddyDisplay } from '@/components/gamification/BuddyDisplay';
import { StatsDisplay } from '@/components/gamification/StatsDisplay';
import { LevelProgress } from '@/components/gamification/LevelProgress';
import { StreakCounter } from '@/components/gamification/StreakCounter';
import { DailyCheckInForm } from '@/components/checkin/DailyCheckInForm';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { ActivityHistory } from '@/components/dashboard/ActivityHistory';
import { LevelUpAnimation } from '@/components/gamification/LevelUpAnimation';
import { AchievementModal } from '@/components/gamification/AchievementModal';
import { BuddyNamingModal } from '@/components/gamification/BuddyNamingModal';
import { useUpdateBuddy } from '@/lib/hooks/useUser';
import { useStore } from '@/lib/store';
import { Loader2, Settings, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { user, buddy, initialized } = useUser();
  const { showNamingModal, setShowNamingModal } = useStore();
  const { updateBuddy } = useUpdateBuddy();

  const handleNameSubmit = async (name: string) => {
    if (buddy) {
      await updateBuddy({ name });
      setShowNamingModal(false);
    }
  };

  if (!initialized || !user || !buddy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading your buddy...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                AI Buddy Care
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Care for your buddy by using AI tools daily
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/achievements"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Achievements"
              >
                <Trophy className="w-5 h-5" />
              </Link>
              <button
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Buddy & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Buddy Display */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <BuddyDisplay buddy={buddy} size="lg" />
            </div>

            {/* Buddy Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Buddy Stats</h3>
              <StatsDisplay stats={buddy.stats} />
            </div>

            {/* Level Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Progress</h3>
              <LevelProgress buddy={buddy} />
            </div>
          </div>

          {/* Right Column - Check-in & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Streak Counter */}
            <StreakCounter
              currentStreak={buddy.currentCareStreak}
              longestStreak={buddy.longestCareStreak}
            />

            {/* Daily Check-in Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4">Daily Care</h2>
              <DailyCheckInForm />
            </div>

            {/* Stats Overview */}
            <StatsOverview />

            {/* Activity History */}
            <ActivityHistory />
          </div>
        </div>
      </div>

      {/* Modals */}
      <BuddyNamingModal show={showNamingModal} onNameSubmit={handleNameSubmit} />
      <LevelUpAnimation />
      <AchievementModal />
    </main>
  );
}
