'use client';

import { BuddyStats } from '@/types/buddy';
import { Heart, Smile, Zap } from 'lucide-react';

interface StatsDisplayProps {
  stats: BuddyStats;
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div className="space-y-4">
      <StatBar
        label="Happiness"
        value={stats.happiness}
        icon={<Smile className="w-5 h-5" />}
        color="bg-yellow-500"
      />
      <StatBar
        label="Health"
        value={stats.health}
        icon={<Heart className="w-5 h-5" />}
        color="bg-red-500"
      />
      <StatBar
        label="Energy"
        value={stats.energy}
        icon={<Zap className="w-5 h-5" />}
        color="bg-blue-500"
      />
    </div>
  );
}

function StatBar({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-sm font-bold">{value}/100</span>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
