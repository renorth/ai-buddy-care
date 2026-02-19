import { create } from 'zustand';
import { User } from '@/types/user';
import { Buddy } from '@/types/buddy';
import { Activity } from '@/types/activity';
import { Achievement } from '@/types/achievement';

interface AppState {
  // User state
  user: User | null;
  buddy: Buddy | null;
  activities: Activity[];
  initialized: boolean;

  // UI state
  showLevelUpModal: boolean;
  showAchievementModal: boolean;
  showNamingModal: boolean;
  newAchievements: Achievement[];
  levelUpData: {
    oldLevel: number;
    newLevel: number;
    stageChanged: boolean;
  } | null;

  // Actions
  setUser: (user: User | null) => void;
  setBuddy: (buddy: Buddy | null) => void;
  setActivities: (activities: Activity[]) => void;
  addActivity: (activity: Activity) => void;
  setInitialized: (initialized: boolean) => void;

  // Modal actions
  setShowLevelUpModal: (show: boolean) => void;
  setShowAchievementModal: (show: boolean) => void;
  setShowNamingModal: (show: boolean) => void;
  setNewAchievements: (achievements: Achievement[]) => void;
  setLevelUpData: (data: { oldLevel: number; newLevel: number; stageChanged: boolean } | null) => void;

  // Reset
  reset: () => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  user: null,
  buddy: null,
  activities: [],
  initialized: false,

  showLevelUpModal: false,
  showAchievementModal: false,
  showNamingModal: false,
  newAchievements: [],
  levelUpData: null,

  // Actions
  setUser: (user) => set({ user }),
  setBuddy: (buddy) => set({ buddy }),
  setActivities: (activities) => set({ activities }),
  addActivity: (activity) => set((state) => ({ activities: [...state.activities, activity] })),
  setInitialized: (initialized) => set({ initialized }),

  // Modal actions
  setShowLevelUpModal: (show) => set({ showLevelUpModal: show }),
  setShowAchievementModal: (show) => set({ showAchievementModal: show }),
  setShowNamingModal: (show) => set({ showNamingModal: show }),
  setNewAchievements: (achievements) => set({ newAchievements: achievements }),
  setLevelUpData: (data) => set({ levelUpData: data }),

  // Reset
  reset: () => set({
    user: null,
    buddy: null,
    activities: [],
    initialized: false,
    showLevelUpModal: false,
    showAchievementModal: false,
    showNamingModal: false,
    newAchievements: [],
    levelUpData: null,
  }),
}));
