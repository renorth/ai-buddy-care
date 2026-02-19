export type AchievementRarity =
  | 'common'
  | 'rare'
  | 'epic'
  | 'legendary';

export type AchievementCategory =
  | 'streak'
  | 'variety'
  | 'milestone'
  | 'special';

export interface AchievementCriteria {
  type: 'streak' | 'activity-count' | 'tool-variety' | 'impact' | 'weekend' | 'special';
  target?: number;
  tools?: string[];
  impactLevel?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
  category: AchievementCategory;
  criteria: AchievementCriteria;
  pointsReward: number;
}

export interface UnlockedAchievement {
  achievementId: string;
  unlockedAt: string; // ISO 8601
  achievement: Achievement;
}
