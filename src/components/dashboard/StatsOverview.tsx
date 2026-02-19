'use client';

import { useStore } from '@/lib/store';
import { useActivityStats } from '@/lib/hooks/useActivities';
import { TrendingUp, Calendar, Award, Flame } from 'lucide-react';

export function StatsOverview() {
  const { user } = useStore();
  const stats = useActivityStats();

  const cards = [
    {
      label: 'Total Care Sessions',
      value: stats.total,
      icon: Calendar,
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
    },
    {
      label: 'This Week',
      value: stats.thisWeek,
      icon: TrendingUp,
      color: 'text-green-600 bg-green-100 dark:bg-green-900/20',
    },
    {
      label: 'Current Streak',
      value: `${stats.streak} days`,
      icon: Flame,
      color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20',
    },
    {
      label: 'Achievements',
      value: user?.unlockedAchievements.length || 0,
      icon: Award,
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between mb-2">
            <div className={`p-2 rounded-lg ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold mb-1">{card.value}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
