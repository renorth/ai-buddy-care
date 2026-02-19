'use client';

import { useState } from 'react';
import { AITool, UsageType, ImpactLevel, ToolUsage } from '@/types/activity';
import { useCheckIn } from '@/lib/hooks/useActivities';
import { useStore } from '@/lib/store';
import { hasCheckedInToday } from '@/lib/gamification/streaks';
import { TOOL_NAMES, USAGE_TYPE_NAMES, IMPACT_NAMES } from '@/config/gamification';
import { Check, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function DailyCheckInForm() {
  const { buddy } = useStore();
  const { submitCheckIn } = useCheckIn();

  const [selectedTool, setSelectedTool] = useState<AITool>('claude');
  const [selectedUsageTypes, setSelectedUsageTypes] = useState<UsageType[]>([]);
  const [selectedImpact, setSelectedImpact] = useState<ImpactLevel>('medium');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const alreadyCheckedIn = buddy ? hasCheckedInToday(buddy.lastFedDate) : false;

  const toggleUsageType = (type: UsageType) => {
    setSelectedUsageTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedUsageTypes.length === 0 || alreadyCheckedIn) return;

    setIsSubmitting(true);

    const toolUsage: ToolUsage = {
      tool: selectedTool,
      usageTypes: selectedUsageTypes,
      impact: selectedImpact,
    };

    try {
      await submitCheckIn([toolUsage], notes || undefined);
      setShowSuccess(true);

      // Reset form
      setTimeout(() => {
        setSelectedUsageTypes([]);
        setNotes('');
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting check-in:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (alreadyCheckedIn) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full mb-4">
          <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
          All Done for Today!
        </h3>
        <p className="text-green-700 dark:text-green-300">
          You&apos;ve already cared for your buddy today. Come back tomorrow!
        </p>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-8 text-center"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-16 h-16 mx-auto text-purple-600 mb-4" />
        </motion.div>
        <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">
          Great Job!
        </h3>
        <p className="text-purple-700 dark:text-purple-300">
          Your buddy is happy and healthy!
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* AI Tool Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Which AI tool did you use?</label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(TOOL_NAMES) as AITool[]).map(tool => (
            <button
              key={tool}
              type="button"
              onClick={() => setSelectedTool(tool)}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                selectedTool === tool
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {TOOL_NAMES[tool]}
            </button>
          ))}
        </div>
      </div>

      {/* Usage Type Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">What did you use it for? (select all that apply)</label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(USAGE_TYPE_NAMES) as UsageType[]).map(type => (
            <button
              key={type}
              type="button"
              onClick={() => toggleUsageType(type)}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                selectedUsageTypes.includes(type)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {USAGE_TYPE_NAMES[type]}
            </button>
          ))}
        </div>
      </div>

      {/* Impact Level Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">What was the impact?</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(IMPACT_NAMES) as ImpactLevel[]).map(impact => (
            <button
              key={impact}
              type="button"
              onClick={() => setSelectedImpact(impact)}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                selectedImpact === impact
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {IMPACT_NAMES[impact].replace(' Impact', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label htmlFor="notes" className="block text-sm font-medium">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any interesting insights or learnings?"
          className="w-full p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 dark:focus:border-purple-500 outline-none resize-none"
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={selectedUsageTypes.length === 0 || isSubmitting}
        whileHover={{ scale: selectedUsageTypes.length > 0 && !isSubmitting ? 1.02 : 1 }}
        whileTap={{ scale: selectedUsageTypes.length > 0 && !isSubmitting ? 0.98 : 1 }}
        className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
          selectedUsageTypes.length === 0 || isSubmitting
            ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Caring for Buddy...
          </span>
        ) : (
          'Care for Buddy 💝'
        )}
      </motion.button>
    </form>
  );
}
