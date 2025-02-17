// src/hooks/useLevel.ts
import { useMemo } from 'react';
import { levelThresholds } from '../data/initialCategories';
import type { Level } from '../types/tasks';

interface LevelInfo {
  currentLevel: Level;
  progress: number;
  nextLevel: Level | null;
  xpToNextLevel: number | null;
}

export const useLevel = (currentXP: number): LevelInfo => {
  return useMemo(() => {
    // Find current level
    let currentLevel = levelThresholds[0];
    let currentLevelIndex = 0;

    for (let i = 0; i < levelThresholds.length; i++) {
      if (currentXP >= levelThresholds[i].xp) {
        currentLevel = levelThresholds[i];
        currentLevelIndex = i;
      } else {
        break;
      }
    }

    // Get next level
    const nextLevel = currentLevelIndex < levelThresholds.length - 1 
      ? levelThresholds[currentLevelIndex + 1]
      : null;

    // Calculate progress and XP needed
    let progress = 100;
    let xpToNextLevel = null;

    if (nextLevel) {
      const totalXPForLevel = nextLevel.xp - currentLevel.xp;
      const currentProgress = currentXP - currentLevel.xp;
      progress = (currentProgress / totalXPForLevel) * 100;
      xpToNextLevel = nextLevel.xp - currentXP;
    }

    return {
      currentLevel,
      progress,
      nextLevel,
      xpToNextLevel
    };
  }, [currentXP]);
};