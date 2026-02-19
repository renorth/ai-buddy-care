'use client';

import { useStore } from '@/lib/store';
import { TOOL_NAMES, USAGE_TYPE_NAMES, IMPACT_NAMES } from '@/config/gamification';
import { format, parseISO } from 'date-fns';
import { Calendar } from 'lucide-react';

export function ActivityHistory() {
  const { activities } = useStore();

  // Sort by date descending
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Take last 10
  const recentActivities = sortedActivities.slice(0, 10);

  if (recentActivities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 text-center">
        <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-600 dark:text-gray-400">No care sessions yet</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          Start caring for your buddy to see your history!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold mb-4">Recent Care Sessions</h3>
      <div className="space-y-3">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium">
                  {format(parseISO(activity.date), 'MMM d, yyyy')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {format(parseISO(activity.timestamp), 'h:mm a')}
                </p>
              </div>
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded">
                +{activity.pointsEarned} XP
              </span>
            </div>

            <div className="space-y-1">
              {activity.tools.map((tool, idx) => (
                <div key={idx} className="text-sm">
                  <span className="font-medium">{TOOL_NAMES[tool.tool]}</span>
                  <span className="text-gray-500 dark:text-gray-400"> • </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {tool.usageTypes.map(t => USAGE_TYPE_NAMES[t]).join(', ')}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400"> • </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {IMPACT_NAMES[tool.impact]}
                  </span>
                </div>
              ))}
            </div>

            {activity.notes && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                &quot;{activity.notes}&quot;
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
