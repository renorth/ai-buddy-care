export type BuddyStage =
  | 'spark'      // Level 1-2: Baby bot
  | 'scout'      // Level 3-4: Kid bot
  | 'sage'       // Level 5-7: Teen bot
  | 'genius'     // Level 8-10: Adult bot
  | 'oracle';    // Level 11+: Legendary bot

export type BuddyMood =
  | 'happy'      // Well cared for
  | 'content'    // Normal state
  | 'hungry'     // Needs care today
  | 'sad'        // Missed 1 day
  | 'neglected'  // Missed 2+ days
  | 'sleeping';  // Nighttime

export interface BuddyStats {
  happiness: number;    // 0-100
  health: number;       // 0-100
  energy: number;       // 0-100
  overall: number;      // Average of the three
}

export interface Buddy {
  id: string;
  name: string;
  stage: BuddyStage;
  level: number;
  experience: number;   // XP to next level
  mood: BuddyMood;
  stats: BuddyStats;

  // Customization
  accessories: string[];
  color?: string;

  // Care tracking
  lastFedDate: string;  // YYYY-MM-DD
  daysNeglected: number;

  // Stats
  totalCareSessions: number;
  currentCareStreak: number;
  longestCareStreak: number;

  createdAt: string;
}

export interface CareAction {
  id: string;
  buddyId: string;
  date: string;
  timestamp: string;
  aiTool: string;
  usageTypes: string[];
  impact: string;

  // Care benefits provided
  happinessGain: number;
  healthGain: number;
  energyGain: number;
  experienceGain: number;
}
