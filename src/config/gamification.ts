import { AITool, UsageType, ImpactLevel } from '@/types/activity';

// AI Tool Care Benefits
export const TOOL_BENEFITS: Record<AITool, { happiness: number; health: number; energy: number; xp: number }> = {
  'claude-code': { happiness: 15, health: 20, energy: 25, xp: 30 },
  'claude': { happiness: 12, health: 15, energy: 20, xp: 25 },
  'github-copilot': { happiness: 12, health: 15, energy: 20, xp: 25 },
  'copilot': { happiness: 12, health: 15, energy: 20, xp: 25 },
  'agency': { happiness: 14, health: 18, energy: 22, xp: 28 },
  'agency-ado': { happiness: 14, health: 18, energy: 22, xp: 28 },
  'chatgpt': { happiness: 10, health: 12, energy: 15, xp: 20 },
  'other': { happiness: 8, health: 10, energy: 12, xp: 15 },
};

// Usage Type Bonuses
export const USAGE_TYPE_BONUSES: Record<UsageType, { happiness: number; health: number; energy: number; xp: number }> = {
  'debugging': { happiness: 3, health: 5, energy: 3, xp: 10 },
  'code-review': { happiness: 3, health: 4, energy: 3, xp: 8 },
  'code-generation': { happiness: 2, health: 3, energy: 4, xp: 5 },
  'documentation': { happiness: 2, health: 2, energy: 2, xp: 5 },
  'refactoring': { happiness: 2, health: 3, energy: 3, xp: 7 },
  'learning': { happiness: 4, health: 2, energy: 2, xp: 8 },
  'brainstorming': { happiness: 5, health: 2, energy: 3, xp: 6 },
  'other': { happiness: 1, health: 1, energy: 1, xp: 3 },
};

// Impact Multipliers
export const IMPACT_MULTIPLIERS: Record<ImpactLevel, number> = {
  low: 1.0,
  medium: 1.5,
  high: 2.0,
  critical: 3.0,
};

// Streak Bonuses
export const STREAK_BONUSES: Record<number, { happiness: number; health: number; xp: number }> = {
  3: { happiness: 10, health: 10, xp: 50 },
  7: { happiness: 20, health: 20, xp: 150 },
  14: { happiness: 30, health: 30, xp: 300 },
  30: { happiness: 50, health: 50, xp: 750 },
  100: { happiness: 100, health: 100, xp: 3000 },
};

// Multi-tool bonus (using multiple AI tools in one day)
export const MULTI_TOOL_BONUSES: Record<number, { happiness: number; energy: number; xp: number }> = {
  2: { happiness: 5, energy: 10, xp: 20 },
  3: { happiness: 10, energy: 20, xp: 50 },
  4: { happiness: 15, energy: 30, xp: 100 },
};

// Weekend bonus
export const WEEKEND_BONUS = {
  happiness: 10,
  health: 10,
  energy: 15,
  xp: 50,
};

// Stat decay per missed day
export const DAILY_DECAY = {
  happiness: 15,
  health: 10,
  energy: 20,
};

// Buddy Stages (Robot Pet Evolution)
export const BUDDY_STAGES = {
  spark: { name: 'Byte', minLevel: 1, emoji: '🔩', description: 'A tiny robot sprout' },
  scout: { name: 'Chip', minLevel: 3, emoji: '🤖', description: 'A curious young bot' },
  sage: { name: 'Cyborg', minLevel: 6, emoji: '🦾', description: 'A wise mechanized bot' },
  genius: { name: 'Android', minLevel: 9, emoji: '🦿', description: 'An advanced AI robot' },
  oracle: { name: 'Mecha', minLevel: 12, emoji: '🚀', description: 'A legendary robot master' },
};

// Experience needed per level (cumulative)
export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  1000,   // Level 5
  2000,   // Level 6
  3500,   // Level 7
  5500,   // Level 8
  8000,   // Level 9
  12000,  // Level 10
  18000,  // Level 11
  25000,  // Level 12
  35000,  // Level 13
  50000,  // Level 14
  75000,  // Level 15
];

// Maximum stats
export const MAX_STAT_VALUE = 100;

// Mood thresholds based on overall stat (average of happiness, health, energy)
export function calculateMood(overall: number, daysNeglected: number): string {
  if (daysNeglected >= 2) return 'neglected';
  if (daysNeglected === 1) return 'sad';
  if (overall >= 80) return 'happy';
  if (overall >= 50) return 'content';
  return 'hungry';
}

// Tool display names
export const TOOL_NAMES: Record<AITool, string> = {
  'claude-code': 'Claude Code',
  'claude': 'Claude',
  'github-copilot': 'GitHub Copilot',
  'copilot': 'Copilot',
  'agency': 'Agency',
  'agency-ado': 'Agency ADO',
  'chatgpt': 'ChatGPT',
  'other': 'Other AI Tool',
};

// Usage type display names
export const USAGE_TYPE_NAMES: Record<UsageType, string> = {
  'code-generation': 'Code Generation',
  'debugging': 'Debugging',
  'code-review': 'Code Review',
  'documentation': 'Documentation',
  'refactoring': 'Refactoring',
  'learning': 'Learning',
  'brainstorming': 'Brainstorming',
  'other': 'Other',
};

// Impact level display
export const IMPACT_NAMES: Record<ImpactLevel, string> = {
  low: 'Low Impact',
  medium: 'Medium Impact',
  high: 'High Impact',
  critical: 'Critical Impact',
};
