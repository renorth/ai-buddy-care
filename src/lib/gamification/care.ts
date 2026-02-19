import { ToolUsage } from '@/types/activity';
import {
  TOOL_BENEFITS,
  USAGE_TYPE_BONUSES,
  IMPACT_MULTIPLIERS,
  MULTI_TOOL_BONUSES,
  WEEKEND_BONUS,
  MAX_STAT_VALUE,
} from '@/config/gamification';
import { isWeekend } from 'date-fns';

export interface CareBenefits {
  happiness: number;
  health: number;
  energy: number;
  experience: number;
  breakdown: {
    base: { happiness: number; health: number; energy: number; xp: number };
    usageBonus: { happiness: number; health: number; energy: number; xp: number };
    impactMultiplier: number;
    multiToolBonus?: { happiness: number; energy: number; xp: number };
    weekendBonus?: { happiness: number; health: number; energy: number; xp: number };
    total: { happiness: number; health: number; energy: number; xp: number };
  };
}

/**
 * Calculate care benefits from a daily check-in
 */
export function calculateCareBenefits(
  tools: ToolUsage[],
  date: Date = new Date()
): CareBenefits {
  const breakdown: CareBenefits['breakdown'] = {
    base: { happiness: 0, health: 0, energy: 0, xp: 0 },
    usageBonus: { happiness: 0, health: 0, energy: 0, xp: 0 },
    impactMultiplier: 1,
    total: { happiness: 0, health: 0, energy: 0, xp: 0 },
  };

  // Calculate base benefits and usage bonuses for each tool
  for (const toolUsage of tools) {
    const toolBenefit = TOOL_BENEFITS[toolUsage.tool];
    const impactMultiplier = IMPACT_MULTIPLIERS[toolUsage.impact];

    // Add base tool benefits
    breakdown.base.happiness += toolBenefit.happiness;
    breakdown.base.health += toolBenefit.health;
    breakdown.base.energy += toolBenefit.energy;
    breakdown.base.xp += toolBenefit.xp;

    // Add usage type bonuses
    for (const usageType of toolUsage.usageTypes) {
      const usageBonus = USAGE_TYPE_BONUSES[usageType];
      breakdown.usageBonus.happiness += usageBonus.happiness;
      breakdown.usageBonus.health += usageBonus.health;
      breakdown.usageBonus.energy += usageBonus.energy;
      breakdown.usageBonus.xp += usageBonus.xp;
    }

    // Track highest impact multiplier
    breakdown.impactMultiplier = Math.max(breakdown.impactMultiplier, impactMultiplier);
  }

  // Apply impact multiplier to base + usage bonuses
  let happiness = (breakdown.base.happiness + breakdown.usageBonus.happiness) * breakdown.impactMultiplier;
  let health = (breakdown.base.health + breakdown.usageBonus.health) * breakdown.impactMultiplier;
  let energy = (breakdown.base.energy + breakdown.usageBonus.energy) * breakdown.impactMultiplier;
  let xp = (breakdown.base.xp + breakdown.usageBonus.xp) * breakdown.impactMultiplier;

  // Multi-tool bonus
  const uniqueTools = new Set(tools.map(t => t.tool)).size;
  if (uniqueTools >= 2 && MULTI_TOOL_BONUSES[uniqueTools]) {
    const bonus = MULTI_TOOL_BONUSES[uniqueTools];
    breakdown.multiToolBonus = bonus;
    happiness += bonus.happiness;
    energy += bonus.energy;
    xp += bonus.xp;
  }

  // Weekend bonus
  if (isWeekend(date)) {
    breakdown.weekendBonus = WEEKEND_BONUS;
    happiness += WEEKEND_BONUS.happiness;
    health += WEEKEND_BONUS.health;
    energy += WEEKEND_BONUS.energy;
    xp += WEEKEND_BONUS.xp;
  }

  breakdown.total = {
    happiness: Math.round(happiness),
    health: Math.round(health),
    energy: Math.round(energy),
    xp: Math.round(xp),
  };

  return {
    happiness: breakdown.total.happiness,
    health: breakdown.total.health,
    energy: breakdown.total.energy,
    experience: breakdown.total.xp,
    breakdown,
  };
}

/**
 * Apply care benefits to buddy stats
 */
export function applyCareBenefits(
  currentStats: { happiness: number; health: number; energy: number },
  benefits: CareBenefits
): { happiness: number; health: number; energy: number } {
  return {
    happiness: Math.min(currentStats.happiness + benefits.happiness, MAX_STAT_VALUE),
    health: Math.min(currentStats.health + benefits.health, MAX_STAT_VALUE),
    energy: Math.min(currentStats.energy + benefits.energy, MAX_STAT_VALUE),
  };
}

/**
 * Calculate stat decay for missed days
 */
export function calculateStatDecay(
  currentStats: { happiness: number; health: number; energy: number },
  daysNeglected: number
): { happiness: number; health: number; energy: number } {
  if (daysNeglected === 0) return currentStats;

  const DECAY_PER_DAY = {
    happiness: 15,
    health: 10,
    energy: 20,
  };

  return {
    happiness: Math.max(0, currentStats.happiness - (DECAY_PER_DAY.happiness * daysNeglected)),
    health: Math.max(0, currentStats.health - (DECAY_PER_DAY.health * daysNeglected)),
    energy: Math.max(0, currentStats.energy - (DECAY_PER_DAY.energy * daysNeglected)),
  };
}
