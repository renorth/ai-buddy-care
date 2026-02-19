export type AITool =
  | 'claude-code'
  | 'claude'
  | 'github-copilot'
  | 'copilot'
  | 'agency'
  | 'agency-ado'
  | 'chatgpt'
  | 'other';

export type UsageType =
  | 'code-generation'
  | 'debugging'
  | 'code-review'
  | 'documentation'
  | 'refactoring'
  | 'learning'
  | 'brainstorming'
  | 'other';

export type ImpactLevel =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical';

export interface ToolUsage {
  tool: AITool;
  usageTypes: UsageType[];
  impact: ImpactLevel;
}

export interface Activity {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  timestamp: string; // ISO 8601
  tools: ToolUsage[];
  notes?: string;
  pointsEarned: number;
}

export interface DailyCheckIn {
  date: string;
  tools: ToolUsage[];
  notes?: string;
}
